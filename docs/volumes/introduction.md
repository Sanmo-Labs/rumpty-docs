---
id: introduction
title: Volumes
sidebar_label: Introduction
slug: /volumes/introduction
---

# Volumes

Persistent block storage volumes you can attach to a virtual machine, format, mount, and keep across rebuilds. Volumes live independently of VMs; they survive VM deletion and can be moved between machines.

## Dashboard stats

The Volumes overview shows:

| Stat | Meaning |
|------|---------|
| **Total Storage** | Combined size of all volumes in the workspace |
| **Used** | Storage actively in use (requires rumpty agent reporting) |
| **Available** | Total minus used |
| **Total Used %** | Usage as a percentage |

The table lists each volume with its name, status, size, filesystem, attached VM, mount path, zone, and creation time.

## Volume statuses

| Status | Meaning |
|--------|---------|
| `creating` | The volume is being provisioned |
| `available` | Volume is ready to attach |
| `attaching` / `detaching` | An attach or detach operation is in progress |
| `formatting` | The volume is being formatted |
| `attached` / `in-use` | Volume is attached to a VM |
| `failed` | Volume creation failed. Check Last Failure on the detail page |

## What's next

- [Create a volume](./create-a-volume)
- [Attach and mount](./attach-and-mount)