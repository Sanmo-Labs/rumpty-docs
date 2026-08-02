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
4. **Select Image**: pick an OS family, then a specific **Version** (e.g. Ubuntu 24.04). The available images are listed on the form.
5. **Networking**: your VM automatically joins the workspace's default private network (e.g. `10.16.0.0/16`) so resources can talk to each other securely. Custom Virtual Isolated Networks (VINs) are coming soon.
6. **SSH Keys**: select an existing key, or click **Add New Key** to upload one
7. **Select or Create Volumes** *(optional)*: attach existing volumes or create new ones for additional storage
8. **Startup Configuration** *(optional)*: choose packages to install under **Install Packages**, or use **Add Script** to run a custom script on first boot (runs with root privileges)
9. **Select Compute**: choose a plan (see [Compute plans](./plans))
10. Review the **Total Payment** estimate at the top, then click **Create VM**

:::note
The first time you create a VM you are asked to accept the Acceptable Use Policy before the creation is submitted.
:::

## Provisioning

Once you click **Create VM**, you're taken to the VM detail page with a live progress panel showing the percentage complete, elapsed time, and step-by-step updates:

```
Preparing your VM.
Preparing your workspace environment.
Preparing the VM disk.
Configuring secure access.
Starting the VM.
Waiting for network readiness.
Waiting for VM access.
Virtual machine is ready.
```

The VM's status badge switches to `running` once provisioning finishes.

## After creation

Your VM detail page shows:

- **Status** (e.g. `RUNNING`)
- **Spec summary**: vCPU, RAM, disk, region, OS image
- **Private IP**, **guest username** (`root` on new VMs), and, once an app is exposed, the app **port** and URL
- Tabs for **Connect**, **Metrics**, **Snapshots**, **Firewall**, **Deploy**, and **Settings**
- **Start VM**, **Stop VM**, and **Reboot VM** actions in the header. Stopping interrupts running apps and SSH sessions; rebooting causes a short interruption while the VM comes back online.

## Free trial: Ephemeral plan

If you select the **Ephemeral Trial** compute plan, note the terms shown at the bottom of the create form:

- Runs for up to **3 days**, then automatically expires
- On expiry, the VM and its root disk are **permanently deleted**, so back up anything you need
- You can run **one active ephemeral VM at a time**
