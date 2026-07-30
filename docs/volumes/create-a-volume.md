---
id: create-a-volume
title: Create a Volume
sidebar_label: Create a Volume
---

# Create a Volume

Go to **Storage → Volumes → Add Volume**.

## Fields

| Field | Details |
|-------|---------|
| **Volume name** | A label for the volume, e.g. `data-volume`. Letters, numbers, hyphens, and underscores only |
| **Volume size** | Slider from 1 GB to 500 GB. Defaults to 20 GB |
| **Region (Zone)** | Must match the zone of the VM you plan to attach it to |
| **Description** | Optional note on what the volume is for |
| **Format volume on creation** | Checked by default. A blank volume is automatically formatted with ext4 when first attached. Uncheck only if you want to format manually after attaching. |

The form shows an estimated monthly storage cost that updates as you change the size.

Click **Create Volume**.

## Volume detail page

Once created, the detail page shows:

- **Capacity**, **Filesystem**, **Zone**, **Formatted** status, and **Created** timestamp
- **Storage Usage**: usage metrics appear once the volume is attached and mounted on a running VM with the rumpty agent reporting
- **Attachment**: shows which VM the volume is attached to, or prompts you to attach it
- **Last Failure**: shown in red if creation failed, with an error message

## What's next

- [Attach and mount the volume](./attach-and-mount)