---
id: access-keys-and-s3
title: Access Keys & S3 Compatibility
sidebar_label: Access keys & S3 tools
---

# Access Keys & S3 Compatibility

Buckets speak the S3 API, so the AWS CLI, AWS SDKs (including Boto3), and S3 tools such as rclone, s3cmd, and MinIO `mc` work with them. This page covers what each access key permission allows, which operations are supported, and how large uploads behave.

To create a key, see [Access keys and SDK access](uploading.md#access-keys-and-sdk-access).

## Connection settings

| Setting | Value |
|---------|-------|
| **Endpoint** | `https://s3.rumptycloud.com` |
| **Region** | `olas-closet` |
| **Addressing** | Path-style (`forcePathStyle: true`, `addressing_style: "path"`) |
| **Bucket** | The S3 bucket name shown on the bucket's **Access keys** tab |

Each access key works with one bucket: the bucket it was created on.

## Permissions

When you create a key you choose any combination of four permissions. All four are selected by default; untick the ones your app doesn't need.

| Permission | What it allows |
|------------|----------------|
| **list** | List objects (`ListObjects`, `ListObjectsV2`), check the bucket exists (`HeadBucket`), read the bucket's region and versioning status, and list in-progress multipart uploads. |
| **read** | Download objects (`GetObject`, including range requests), read object metadata (`HeadObject`), read object ACLs and tags. |
| **write** | Upload objects (`PutObject`), copy objects within the bucket, set object ACLs and tags, and run [multipart uploads](#multipart-uploads) from start to finish, including aborting them. |
| **delete** | Delete objects, one at a time (`DeleteObject`) or in batches of up to 1,000 (`DeleteObjects`). |

Common combinations:

- **Uploader** (an app that only stores files): `write`
- **Reader** (serving private files, generating signed URLs): `read`
- **Sync or backup tool** (`aws s3 sync`, rclone): `list`, `read`, `write`, and `delete` if it should remove files that were deleted locally
- **Full app access**: all four

A key's permissions can't be edited after it's created. To change them, create a new key with the permissions you want, switch your app over, then revoke the old key.

Signed (presigned) URLs carry the permissions of the key that signed them: a URL signed by a key without `read` can't download anything.

### What keys can't do

Access keys work with the objects in a bucket, not the bucket's settings. Keys can't:

- create or delete buckets
- change the bucket policy, CORS rules, lifecycle rules, or versioning

Requests for these return `AccessDenied`. Create and delete buckets, and choose which websites can use the bucket from the browser ([Browser uploads](#browser-uploads-cors)), from the dashboard.

## Multipart uploads

Large files are uploaded in parts. The AWS CLI and SDKs switch to multipart automatically above a size threshold (8 MB by default in the AWS CLI and Boto3), so you usually don't call the multipart operations yourself.

Multipart uploads need the **write** permission only. That covers every step: starting the upload, uploading and copying parts, completing it, listing its parts, and aborting it. Add **list** if your tool lists in-progress uploads (for example, to clean them up).

Limits are the standard S3 ones:

| Limit | Value |
|-------|-------|
| Largest single `PutObject` | 5 GB |
| Smallest part (except the last) | 5 MB |
| Most parts per upload | 10,000 |

Boto3 example with an explicit threshold and part size:

```python
import boto3
from boto3.s3.transfer import TransferConfig
from botocore.config import Config

s3 = boto3.client(
    "s3",
    endpoint_url="https://s3.rumptycloud.com",
    region_name="olas-closet",
    aws_access_key_id="<your-key>",
    aws_secret_access_key="<your-secret>",
    config=Config(s3={"addressing_style": "path"}),
)

config = TransferConfig(multipart_threshold=16 * 1024 * 1024, multipart_chunksize=16 * 1024 * 1024)
s3.upload_file("backup.tar.gz", "<bucket-name>", "backups/backup.tar.gz", Config=config)
```

### Incomplete uploads are cleaned up after 7 days

A multipart upload that's started but never completed or aborted (for example, because the process crashed) leaves its uploaded parts in the bucket. Those parts count toward your storage usage but don't appear in object listings.

Every bucket has a cleanup rule that deletes incomplete multipart uploads **7 days after they were started**. You don't need to set anything up. An upload that's still in progress isn't affected unless it's been running for more than 7 days.

To clean up sooner, abort the upload yourself; SDKs do this when an upload fails and you call the abort method. To find leftover uploads:

```bash
aws s3api list-multipart-uploads --bucket <bucket-name> \
  --endpoint-url https://s3.rumptycloud.com

aws s3api abort-multipart-upload --bucket <bucket-name> \
  --key <key> --upload-id <upload-id> \
  --endpoint-url https://s3.rumptycloud.com
```

## Browser uploads (CORS)

Your web app can let visitors upload files straight to your bucket, without the file passing through your server. Your server signs a short-lived upload URL with its access key, and the visitor's browser sends the file to that URL.

Browsers only allow this if the bucket lists your site as an **allowed origin**. Otherwise the browser blocks the request before it's sent, and you see a CORS error in the console.

You don't need allowed origins for:

- server-side code, scripts, the AWS CLI, or other tools: CORS only applies to browsers
- showing public files with `<img>`, `<video>`, or a plain link
- uploads from the RumptyCloud dashboard, which is always allowed

### Add your site

1. Open the bucket in the dashboard and go to the **Allowed origins** tab.
2. Enter your site's address, for example `https://app.example.com`, and click **Add**.
3. Click **Save**. The change takes effect within a minute.

An origin is the scheme, host, and port your site runs on, with no path: browsers send exactly that and match it exactly.

| You enter | Allows |
|-----------|--------|
| `https://app.example.com` | only `https://app.example.com` |
| `http://localhost:3000` | your local development server on port 3000 |
| `https://*.example.com` | any subdomain, such as `https://preview.example.com` |
| `*` | every website (you'll be asked to confirm) |

`https://example.com` and `https://www.example.com` are different origins, as are the same host on different ports, so add each one your site uses. A bucket can have up to 20 allowed origins.

Avoid `*` unless you're building something meant to be used from any site. Your keys stay private either way, but with `*` a leaked upload URL works from any website.

### Example: presigned upload from the browser

The server creates the upload URL; the secret key never reaches the browser.

```js
// Server (Node.js)
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: "olas-closet",
  endpoint: "https://s3.rumptycloud.com",
  credentials: {
    accessKeyId: process.env.RUMPTY_ACCESS_KEY_ID,
    secretAccessKey: process.env.RUMPTY_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

app.post("/upload-url", async (req, res) => {
  const key = `uploads/${crypto.randomUUID()}-${req.body.filename}`;
  const url = await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: "<bucket-name>",
      Key: key,
      ContentType: req.body.contentType,
    }),
    { expiresIn: 300 },
  );
  res.json({ url, key });
});
```

```js
// Browser
async function upload(file) {
  const { url, key } = await fetch("/upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename: file.name, contentType: file.type }),
  }).then((r) => r.json());

  const res = await fetch(url, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type },
  });
  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  return key;
}
```

The key that signs the URL needs the **write** permission. In a public bucket the uploaded file is publicly readable right away; you don't need to set an ACL. Send the same `Content-Type` from the browser that the server signed, or the upload fails with `SignatureDoesNotMatch`. The **Allowed origins** tab in the dashboard shows this example filled in with your bucket's details.

Large files work the same way with multipart uploads: browsers may send `PUT`, `POST`, `GET`, `HEAD`, and `DELETE` requests, and can read the `ETag` response header each part returns.

## Tool setup

### AWS CLI

```bash
export AWS_ACCESS_KEY_ID=<your-key>
export AWS_SECRET_ACCESS_KEY=<your-secret>
export AWS_DEFAULT_REGION=olas-closet

aws s3 sync ./site s3://<bucket-name>/site --endpoint-url https://s3.rumptycloud.com
```

### rclone

```ini
[rumpty]
type = s3
provider = Other
access_key_id = <your-key>
secret_access_key = <your-secret>
endpoint = https://s3.rumptycloud.com
region = olas-closet
```

```bash
rclone copy ./photos rumpty:<bucket-name>/photos
```

### MinIO client (`mc`)

```bash
mc alias set rumpty https://s3.rumptycloud.com <your-key> <your-secret>
mc cp ./report.pdf rumpty/<bucket-name>/reports/
```

## Rate limits

Each access key can make up to **600 write requests per minute** (uploads, part uploads, copies, deletes). Requests above the limit are rejected with a `503 SlowDown` error; AWS SDKs and the CLI retry these automatically. Reads aren't rate limited per key.

If a bulk import needs more, split it across several keys or contact support.

## Not supported yet

- **Versioning and object lock**: keys can read the versioning status (it's always off), but versioning can't be turned on, so deleted or overwritten objects can't be recovered.
- **Keys limited to a folder**: a key's permissions apply to the whole bucket.

## Troubleshooting

**`AccessDenied`**: the key is missing the permission for that operation (see [Permissions](#permissions)), the key was revoked, or the request targets a different bucket from the one the key belongs to. A newly created key can take a few seconds before it works.

**`SignatureDoesNotMatch`**: usually a mistyped secret, or a region other than `olas-closet`.

**CORS error in the browser** (`No 'Access-Control-Allow-Origin' header is present`, or a failed `OPTIONS` request): the page's origin isn't in the bucket's [allowed origins](#browser-uploads-cors). Compare the `Origin` request header in your browser's network tab with the list, including `www`, `http` vs `https`, and the port. Changes take up to a minute to apply.

**Bucket name treated as a hostname** (DNS errors such as `<bucket-name>.s3.rumptycloud.com`): enable path-style addressing.

**Storage usage higher than your files add up to**: check for incomplete multipart uploads with `list-multipart-uploads` above. They're removed automatically after 7 days, or you can abort them now.
