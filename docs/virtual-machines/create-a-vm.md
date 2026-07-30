---
id: create-a-vm
title: Create a VM
sidebar_label: Create a VM
---

# Create a VM

## Steps

1. Go to **Compute → Virtual Machines → Create VM**
2. **Name** your VM
3. **Select Region**: choose the data center nearest to you or your users to minimize latency
4. **Select Image**: currently Ubuntu is supported, with version selection (e.g. Ubuntu 24.04)
5. **Networking**: your VM automatically joins the workspace's default private network (e.g. `10.16.0.0/16`) so resources can talk to each other securely. Custom Virtual Isolated Networks (VINs) are coming soon.
6. **SSH Keys**: select an existing key, or click **Add New Key** to upload one
7. **Select or Create Volumes** *(optional)*: attach existing volumes or create new ones for additional storage
8. **Startup Configuration** *(optional)*: choose packages to install, or add a custom script to run on first boot (runs with root privileges)
9. **Select Compute**: choose a plan (see [Compute plans](./plans))
10. Review the **Total Payment** estimate at the top, then click **Create VM**

## Provisioning

Once you click **Create VM**, you'll see a live progress panel showing each step:

```
VM request started.
Preparing your VM.
Applying your SSH keys and configuration.
Waiting for SSH access.
Your VM is ready.
```

This typically completes in under a second once queued.

## After creation

Your VM detail page shows:

- **Status** (e.g. `RUNNING`)
- **Spec summary**: vCPU, RAM, disk, region, OS
- **Private IP**, **guest hostname**, and any exposed **port**
- Tabs for **Connect**, **Metrics**, **Snapshots**, **Firewall**, **Settings**, and **Deploy**

## Free trial: Ephemeral plan

If you select the **Ephemeral Trial** compute plan, note the terms shown at the bottom of the create form:

- Runs for up to **3 days**, then automatically expires
- On expiry, the VM is **permanently deleted**, so back up anything you need
- You can run **one active ephemeral VM at a time**
