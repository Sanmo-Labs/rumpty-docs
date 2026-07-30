---
id: workspaces
title: Workspaces
sidebar_label: Workspaces
---

# Workspaces

The **Workspaces** tab on your profile (**Manage Profile → My profile**) lists all workspaces under your account, with search and pagination.

## Workspace table

| Column | Meaning |
|--------|---------|
| **Workspace** | Name and description; your default workspace carries a **Default** badge |
| **Slug** | The unique slug ID used in CLI commands (e.g. `qa-testing-019ef102`) |
| **Created** | Creation date |
| **Actions** | Delete the workspace |

## Delete a workspace

Click **Delete** next to a workspace, then type its slug to confirm. The default workspace cannot be deleted.

:::danger
A workspace can only be deleted after every resource inside it has been manually deleted: virtual machines, deployments, volumes, buckets, databases, keys, logs, and related settings. Once the workspace is empty, deleting it cannot be undone.
:::

## Create a new workspace

Use the workspace switcher in the top-left navbar: click your current workspace name and select **+ New Workspace**. See [Workspaces](/getting-started/workspaces) in Getting Started for the full flow.