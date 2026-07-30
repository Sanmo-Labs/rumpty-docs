---
id: uploading
title: Uploading Files & Access Keys
sidebar_label: Uploading & Access Keys
---

# Uploading Files & Access Keys

## Upload via the dashboard

From the bucket detail page, drag and drop files into the upload area, or click **Upload file**. Supported types: images, documents, HTML, and video.

Uploaded files appear in the **Assets** tab with name, type, size, status, and creation date.

## Access via CDN URL

Public buckets serve files at a permanent CDN URL:

`https://assets.rumptycloud.com/projects/<project-id>/<bucket-name>/<filename>`

## SDK access

Go to the **Access Keys** tab on the bucket detail page to get your S3-compatible credentials. Use them with any S3 SDK or the AWS CLI:

```bash
aws s3 cp ./photo.jpg s3://<bucket-name>/ \
  --endpoint-url https://assets.rumptycloud.com \
  --access-key-id <your-key> \
  --secret-access-key <your-secret>
```

## Signed URLs (Private buckets)

For private buckets, generate a signed URL server-side before serving a file to a client. Signed URLs expire after a set duration; objects are never directly public-read.