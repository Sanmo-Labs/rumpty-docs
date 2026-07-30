---
id: snapshots
title: Snapshots
sidebar_label: Snapshots
---

# Snapshots

Snapshots capture the state of your VM's boot disk at a point in time. Use them to back up before a risky change, clone a working environment, or restore a VM that broke after an update.

## Take a snapshot

1. Open the VM detail page → **Snapshots** tab
2. Click **Take Snapshot**
3. Give it a name (e.g. `before-upgrade`); a timestamped name is suggested for you
4. Leave **Shut down VM during snapshot** checked (recommended) and click **Create snapshot**

With the shutdown option checked, the VM powers down before the snapshot is taken and comes back online automatically afterwards. This gives databases and filesystems a cleaner restore point. Uncheck it to snapshot the VM while it keeps running.

Each snapshot shows a status: **Creating**, **Available**, **Restoring**, **Deleting**, or **Failed**. Restore and other actions become available once the snapshot is **Available**.

## Restore from a snapshot

1. Open the **Snapshots** tab
2. Find the snapshot you want to restore
3. Click **Restore** and confirm

:::danger
Restoring shuts down the VM, reverts its storage to the snapshot's point in time, and restarts it. Any changes made after the snapshot was taken will be lost.
:::

## Create a new VM from a snapshot

You can launch a new VM pre-loaded with a snapshot's disk state, useful for cloning a working environment, moving to a different plan, or testing a change without touching the original VM.

1. Go to **Storage → Snapshots**
2. Open the actions menu for an **Available** snapshot and click **Create VM**
3. Configure the new VM (name, region, plan) and confirm

The operating system image is inherited from the snapshot, so there is no image selection. VMs created from a snapshot are always persistent, even if the snapshot came from an ephemeral VM.

:::note
Snapshots survive their source VM. If the source VM is deleted, the snapshot is marked **Detached** in **Storage → Snapshots** and can still be used to create a new VM.
:::

## Delete a snapshot

Snapshots consume storage and are billed for the storage they use (shown as **Billed storage** in **Storage → Snapshots**). Delete ones you no longer need:

1. Open the **Snapshots** tab
2. Click **Delete** next to the snapshot and confirm

Deletion permanently removes the snapshot and its stored data; you will no longer be able to restore from it.

## When to use snapshots

| Situation | Recommendation |
|-----------|----------------|
| Before a major package upgrade | Take a snapshot first |
| Before editing system config | Take a snapshot first |
| Setting up a reusable base environment | Snapshot once, clone as needed |
| Routine backups of stateful data | Use a [Volume](/volumes/introduction) instead; volumes are better suited for persistent data backups |
