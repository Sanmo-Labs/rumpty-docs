---
id: introduction
title: Databases
sidebar_label: Introduction
slug: /databases/introduction
---

# Databases

Managed databases for apps, demos, and internal tools. Postgres is available today; Redis and MySQL are marked coming soon in the console. Go to **Data → Databases**.

## Dashboard stats

| Stat | Meaning |
|------|---------|
| **Total Databases** | All database instances in the workspace |
| **Ready** | Databases that are live and accepting connections |
| **Provisioning** | Databases currently being created |

## Database table columns

| Column | Meaning |
|--------|---------|
| **Database** | Name of the instance |
| **Engine** | The database engine and version |
| **Status** | Current state, for example `running`, `provisioning`, or `failed` |
| **Connection** | Connection string or host, with a copy button (shown once ready) |
| **Plan** | The size tier selected and its storage |
| **Created** | Creation date |
| **Actions** | View or delete |

## What's next

- [Create a database](./create-a-database)
- [Connecting](./connecting)
