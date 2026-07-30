---
id: workspaces
title: Workspaces
sidebar_label: Workspaces
---

# Workspaces

A workspace is the top-level container for all your resources: VMs, deployments, Kubernetes clusters, volumes, buckets, databases, and firewall policies all live inside a workspace.

Use workspaces to separate products, environments, client projects, or experiments without mixing resources and access.

**Examples:**
- `Makulu Production`: live infrastructure
- `QA | Testing`: staging and test environments
- `Client X`: isolated resources for a specific client

## Create your first workspace

When you log in for the first time with no workspace yet, you'll be prompted to create one:

1. Enter a **Workspace name** (e.g. `Makulu Production`)
2. Add an optional **Description** (e.g. `What will live in this workspace?`)
3. Click **Create workspace**

You'll land on the dashboard for that workspace. Everything you create from here belongs to it.

## Switch workspaces

Click the workspace name in the top-left of the navbar (e.g. `QA | Testing`) to open the workspace switcher. It shows:

| Column | Meaning |
|--------|---------|
| **Name** | Workspace display name |
| **Description** | Your optional description |
| **Role** | Your role in that workspace |
| **Slug ID** | The unique identifier used in CLI commands (e.g. `qa-testing-019ef102`) |

Click a workspace to switch into it. All sidebar resources update to show that workspace's content.

## Create another workspace

From the workspace switcher, click **+ New Workspace** to create an additional one. There's no hard limit on the number of workspaces.

## Workspace slug ID

Every workspace has a slug ID (e.g. `qa-testing-019ef102`). This is used in CLI commands:

```bash
rumpty ssh <vm-name> --ws qa-testing-019ef102
rumpty vm ls --ws qa-testing-019ef102
```

You can find your workspace slug ID in the workspace switcher.

:::info
Resources are not shared between workspaces. A VM in `QA | Testing` is completely separate from one in `Makulu Production`, even if they have the same name.
:::