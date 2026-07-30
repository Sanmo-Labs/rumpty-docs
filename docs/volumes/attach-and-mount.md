---
id: attach-and-mount
title: Attach and Mount
sidebar_label: Attach & Mount
---

# Attach and Mount a Volume

## Attach to a VM

From the volume detail page, click **Attach to VM** and select a target VM in the same zone.

Or from the VM's create form: select an existing volume under **Select or Create Volumes**.

## Automatic mounting

Attached volumes are mounted automatically inside the VM; no manual steps are needed in the default flow:

- The disk appears as a SCSI device, e.g. `/dev/sdb`.
- If the disk is blank and **Format volume on creation** was checked, it is formatted with ext4 on first attach. A disk that already has a filesystem is never reformatted, so re-attaching a volume preserves its data.
- The volume is mounted at `/mnt/rumpty/<volume-id>` and an `/etc/fstab` entry is added so the mount persists across reboots.

The exact device name and mount path are shown on the volume detail page under **Attachment**.

## Mount manually

If you created the volume with **Format volume on creation** unchecked, a blank disk is attached raw: it is not formatted or mounted automatically. SSH into the VM and set it up yourself:

```bash
# Confirm the device name
lsblk

# Format the blank disk
mkfs.ext4 /dev/sdb

# Create a mount point and mount
mkdir -p /mnt/data
mount /dev/sdb /mnt/data

# Persist across reboots
echo '/dev/sdb /mnt/data ext4 defaults 0 0' >> /etc/fstab
```

## Detach

Make sure no process is writing to the volume, then unmount it:

```bash
umount /mnt/rumpty/<volume-id>
```

Then click **Detach** on the volume detail page. The volume returns to `available` status and can be attached to a different VM.

A volume cannot be deleted while it is attached; detach it first.