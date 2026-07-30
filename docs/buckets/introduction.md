---
id: introduction
title: Buckets
sidebar_label: Introduction
slug: /buckets/introduction
---

# Buckets

S3-compatible image buckets for uploads, SDK access, and public or signed image delivery. Create a bucket to start uploading images, documents, HTML, and video, then serve them via a permanent CDN URL or signed read URLs.

## Dashboard stats

| Stat | Meaning |
|------|---------|
| **Buckets** | Total buckets in the workspace |
| **Ready** | Buckets that are live and serving |
| **Creating** | Buckets currently being provisioned |
| **Visible usage** | Total storage used across all buckets |

## Bucket table columns

| Column | Meaning |
|--------|---------|
| **Bucket** | Name |
| **Status** | `Ready`, `Creating`, or `Failed` |
| **Used** | Storage consumed |
| **S3 bucket** | The S3 bucket name used with SDKs and the CLI |
| **Visibility** | Public or Private |
| **Created** | Creation date |

Bucket status refreshes automatically while a bucket is being created.

## What's next

- [Create a bucket](./create-a-bucket)
- [Upload files and access keys](uploading.md)