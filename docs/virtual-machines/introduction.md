---
id: introduction
title: Virtual Machines
sidebar_label: Introduction
slug: /virtual-machines/introduction
---

# Virtual Machines

Virtual machines (VMs) give you an isolated Linux instance to run anything, from a quick test environment to a long-running service. Every VM is provisioned inside a **workspace**, joins your workspace's private network automatically, and is reachable over SSH using the **Rumpty CLI**.

## How it works

Each workspace (e.g. `QA | Testing`) acts as a rack: a logical grouping for your VMs, volumes, and networking. When you create a VM, it's:

- assigned a **private IP** on the workspace's default network (e.g. `10.16.0.0/16`)
- given a **guest hostname**
- provisioned with the OS image, SSH key, and compute plan you select
- ready for SSH access within seconds

:::info
VMs are **not exposed over a public IP** by default. To connect, you use the Rumpty CLI, which tunnels your SSH session through the platform securely.
:::

## Where to find your VMs

Go to **Compute → Virtual Machines** to see all VMs in the current workspace, with status, plan, image, network, and creation date. Use **Create VM** to launch a new one.

## What's next?

- [Create a VM](./create-a-vm)
- [Connect via SSH](./connecting)
- [Compute plans](./plans)
- [Snapshots & rebuilding](./snapshots)
