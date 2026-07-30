---
id: create-a-bucket
title: Create a Bucket
sidebar_label: Create a Bucket
---

# Create a Bucket

Go to **Storage → Buckets → Create bucket**.

## Fields

**Bucket name**: a unique name within your workspace, e.g. `stage-images`. Use 2 to 63 characters, starting with a letter or number.

**Visibility**: choose how files in this bucket are read by browsers and apps:

| Option | Best for |
|--------|----------|
| **Public images** | App images, website media, avatars, logos, and assets you want to serve directly. Permanent public read URLs. Uploads use public-read ACL. Good default for static content. |
| **Private images** | When your app should request a signed read URL before showing or downloading a file. Objects are not uploaded public-read. Useful for restricted content. |

After creating the bucket, RumptyCloud prepares browser uploads and enables S3-compatible SDK access for your files.

Click **Create bucket**.

## Bucket detail page

Once ready, the bucket detail page shows:

- **Status** badge (`READY`) and **visibility** badge (`PUBLIC` or `PRIVATE`)
- **Public base URL**: e.g. `https://assets.rumptycloud.com/projects/<id>/<bucket-name>`
- **Drag and drop upload** area: supports images, documents, HTML, and video
- **Assets tab**: lists all uploaded files with name, type, size, status, and created date
- **Access keys tab**: S3-compatible credentials for SDK access

Uploads and SDK access unlock once the bucket reaches `Ready`. Deleting a bucket removes the bucket, its files, and its access keys.

## What's next

- [Upload files and use access keys](uploading.md)