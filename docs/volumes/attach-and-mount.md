---
id: attach-and-mount
title: Attach and Mount
sidebar_label: Attach & Mount
---

# Attach and Mount a Volume

## Attach to a VM

From the volume detail page, click **Attach to VM** and select a running VM in the same zone.

Or from the VM's create form — select an existing volume under **Select or Create Volumes**.

## Mount on the VM

After attaching, SSH into the VM and mount the volume:

```bash
# Confirm the device name
lsblk

# If not already formatted (skip if you checked "Format on creation")
mkfs.ext4 /dev/vdb

# Create a mount point and mount
mkdir -p /mnt/data
mount /dev/vdb /mnt/data

# Persist across reboots
echo '/dev/vdb /mnt/data ext4 defaults 0 0' >> /etc/fstab
```

## Detach

Unmount first, then detach from the UI:

```bash
umount /mnt/data
```

Then click **Detach** on the volume detail page. The volume returns to **Ready** status and can be attached to a different VM.