---
id: introduction
title: Audit Logs
sidebar_label: Audit Logs
slug: /audit-logs/introduction
---

# Audit Logs

A complete record of every action taken across your account. Go to **Others → Audit Logs**.

Logs are retained for **60 days**. The table shows 50 entries per page by default; you can switch to 25, 100, or 200 per page and move through pages with **Prev** and **Next**.

## Log table columns

| Column | Meaning |
|--------|---------|
| **Time** | Relative time (e.g. `2h ago`); hover for the exact timestamp |
| **Event** | Human-readable summary of what happened and who did it |
| **Resource** | Name and type of the resource affected |
| **Status** | `SUCCESSFUL` or `FAILED` |

## Filtering and refreshing

- Click **Filters** to narrow logs by action or resource type, then click **Apply**. Click **Clear** to reset
- Click **Refresh** to pull the latest entries

## Log entry detail

Click any row to open the full detail panel:

| Field | Description |
|-------|-------------|
| **Status** | `SUCCESSFUL` or `FAILED` with the timestamp in UTC |
| **Description** | Human-readable summary (e.g. `Failed to create database`) |
| **Actor** | Who triggered the action (email address, or API key prefix), whether it came from a console session or an API key, the user's unique ID, and the IP address |
| **Action** | The action performed (e.g. `Created database`) |
| **Event code** | Machine-readable code (e.g. `database.create`) |
| **Resource type** | The type of resource affected (e.g. `Database`, `VM`, `Volume`, `Firewall policy`) |
| **Resource** | Name of the specific resource, or its ID if no name was assigned |
| **Category** | Resource category |
| **Request context** | Raw request details: IP address and user-agent of the browser or CLI client |

## Event codes

Event codes follow the pattern `<resource>.<action>`. Whether the action succeeded is recorded separately in the entry's status:

| Example code | Meaning |
|--------------|---------|
| `database.create` | Database created |
| `vm.start` | VM started |
| `volume.attach` | Volume attached to a VM |
| `firewall_policy.attach` | Firewall policy attached to a resource |
| `auth.login` | User signed in |

## What gets logged

Create, update, delete, and lifecycle actions (start, stop, reboot, attach, detach, scale) across your resources: VMs, snapshots, databases, volumes, SSH keys, API keys, firewall policies and rules, deployments, clusters, buckets, Git connections, workspaces, and team members. Failed attempts are logged with a `FAILED` status. Auth events (sign-in and sign-out) are captured with the actor's IP address. Actions performed with an API key show the key prefix as the actor.
