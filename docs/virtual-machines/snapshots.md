---
id: snapshots
title: Snapshots
sidebar_label: Snapshots
---

# Snapshots

Snapshots capture the current state of your VM's disk at a point in time. Use them to back up before a risky change, clone a working environment, or restore a VM that broke after an update.

## Take a snapshot

1. Open the VM detail page → **Snapshots** tab
2. Click **Take Snapshot**
3. Give it a name (e.g. `before-nginx-upgrade`)

The snapshot is created while the VM keeps running. No downtime required.

## Restore from a snapshot

1. Open the **Snapshots** tab
2. Find the snapshot you want to restore
3. Click **Restore**

:::danger
Restoring overwrites the current disk state with the snapshot. Any changes made after the snapshot was taken will be lost.
:::

## Create a new VM from a snapshot

You can spin up a new VM pre-loaded with a snapshot's disk state — useful for cloning a working environment or testing a change without touching the original VM.

1. Open the **Snapshots** tab
2. Click **Create VM from snapshot** next to the snapshot
3. Configure the new VM (name, plan, region) and confirm

## Delete a snapshot

Snapshots consume storage and are billed accordingly. Delete ones you no longer need:

1. Open the **Snapshots** tab
2. Click **Delete** next to the snapshot and confirm

## When to use snapshots

| Situation | Recommendation |
|-----------|----------------|
| Before a major package upgrade | Take a snapshot first |
| Before editing nginx / system config | Take a snapshot first |
| Setting up a reusable base environment | Snapshot once, clone as needed |
| Routine backups of stateful data | Use a [Volume](/volumes/introduction) instead — volumes are better suited for persistent data backups |