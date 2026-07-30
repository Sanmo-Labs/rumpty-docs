---
id: introduction
title: Audit Logs
sidebar_label: Audit Logs
slug: /audit-logs/introduction
---

# Audit Logs

A complete record of every action taken across your account. Go to **Others → Audit Logs**.

Logs are retained for **60 days** and show up to 50 entries per page.

## Log table columns

| Column | Meaning |
|--------|---------|
| **Time** | Relative time (e.g. `2h ago`) and exact timestamp |
| **Actor / Action** | Who performed the action and what action was taken, with a resource type badge |
| **Resource** | Resource type and name affected |
| **Status** | `SUCCESSFUL` or `FAILED` |

## Filtering and refreshing

- Click **Filters** to narrow logs by resource type, action, status, or date range
- Click **Refresh** to pull the latest entries

## Log entry detail

Click any row to open the full detail panel:

| Field | Description |
|-------|-------------|
| **Status** | `SUCCESSFUL` or `FAILED` with timestamp in UTC |
| **Actor** | Username, session ID, and IP address of who triggered the action |
| **Description** | Human-readable summary (e.g. `Failed to created database –`) |
| **Action** | The action performed (e.g. `Created database`) |
| **Event code** | Machine-readable code (e.g. `database.create.failed`) |
| **Resource type** | The type of resource affected (e.g. `Database`, `VM`, `Volume`, `Firewall policy`) |
| **Resource name** | Name of the specific resource, or `–` if creation failed before one was assigned |
| **User UID** | The unique ID of the user account that triggered the event |
| **Category** | Resource category (e.g. `database`, `vm`, `volume`) |
| **Severity** | `info` for successful actions, `error` for failures |
| **Request context** | Raw request details: IP address, action, and user-agent of the browser or CLI client |

## Event codes

Event codes follow the pattern `<resource>.<action>.<result>`:

| Example code | Meaning |
|--------------|---------|
| `database.create.failed` | Database creation failed |
| `vm.create.succeeded` | VM created successfully |
| `volume.create.succeeded` | Volume created successfully |
| `firewall_policy.create.succeeded` | Firewall policy created successfully |

## What gets logged

Every create, update, delete, and attach action on any resource in your workspace is logged, including failed attempts. Auth events (login, session creation) are also captured with their session ID and IP.