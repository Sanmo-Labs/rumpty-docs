---
id: introduction
title: Databases
sidebar_label: Introduction
slug: /databases/introduction
---

# Databases

Managed Postgres, Redis, and MySQL databases for apps, demos, and internal tools. Go to **Data → Databases**.

## Dashboard stats

| Stat | Meaning |
|------|---------|
| **Total databases** | All database instances in the workspace |
| **Ready** | Databases that are live and accepting connections |
| **Provisioning** | Databases currently being created |

## Database table columns

| Column | Meaning |
|--------|---------|
| **Database** | Name of the instance |
| **Engine** | Postgres, Redis, or MySQL |
| **Status** | `Ready`, `Provisioning`, or `Failed` |
| **Connection** | Connection host (shown once ready) |
| **Plan** | The size tier selected |
| **Created** | Creation date |
| **Actions** | Delete or manage |

## What's next

- [Create a database](./create-a-database)
- [Connecting](./connecting)