---
id: uploading
title: Uploading Files & Access Keys
sidebar_label: Uploading & Access Keys
---

# Uploading Files & Access Keys

## Sync a local folder

The fastest way to get files into a bucket is the CLI's sync command, which uploads a whole folder and only transfers changes on repeat runs:

```bash
rumpty sync ~/sales-reports my-backups --watch
```

See [Sync a Local Folder](/cli/sync) for filtering, restore, and background daemon mode.

## Upload via the dashboard

From the bucket detail page, drag and drop files into the upload area, or click **Upload files**. Supported types: images (PNG, JPEG, WebP, GIF, SVG), documents (PDF, TXT, HTML, Markdown, CSV, DOCX), and video (MP4, WebM, MOV, MKV, AVI, HLS playlists and segments).

Uploaded files appear in the **Assets** tab with name, type, size, status, and creation date. Select a file to preview it, copy its URL, open it, or delete it.

## Access via public URL

Public buckets serve files at a permanent public URL:

`https://assets.rumptycloud.com/projects/<project-id>/<bucket-name>/<filename>`

You can also copy a file's URL from the **Assets** tab: select the file, then click **Copy URL**.

## Access keys and SDK access

Go to the **Access keys** tab on the bucket detail page. Enter a name (e.g. `production-uploader`) and click **Create**. The secret access key is shown only once, so copy it right away. You can revoke a key at any time; apps using a revoked key lose access to the bucket.

The tab also shows connection details (endpoint, region, bucket name, and access key ID) and ready-made upload snippets for JavaScript, TypeScript, PHP, Go, Java, Ruby, and Rust.

Use the credentials with any S3 SDK or the AWS CLI against the S3-compatible endpoint `https://s3.rumptycloud.com`. Configure your SDK for path-style addressing (e.g. `forcePathStyle: true`).

```bash
export AWS_ACCESS_KEY_ID=<your-key>
export AWS_SECRET_ACCESS_KEY=<your-secret>

aws s3 cp ./photo.jpg s3://<bucket-name>/photo.jpg \
  --endpoint-url https://s3.rumptycloud.com
```

## Signed URLs (Private buckets)

For private buckets, generate a signed URL server-side before serving a file to a client. Signed URLs expire after a set duration; objects are never directly public-read.

The dashboard generates signed read URLs for you: selecting a file in the **Assets** tab creates one for the preview, and the file inspector shows when the URL expires.