---
id: connecting
title: Connecting
sidebar_label: Connecting
---

# Connecting to Your Database

Once provisioned, open the database detail page. It shows the engine, version, creation date, and status at the top. The detail page has four tabs: **Connection**, **Metrics**, **Firewall**, and **Settings**.

## Connection tab

The Connection tab provides everything you need to connect:

| Field | Example |
|-------|---------|
| **Connection string** | `postgresql://<username>:<password>@<host>:5432/main_db` |
| **Host** | The database's connection host |
| **Port** | `5432` |
| **Database** | `main_db` |
| **Username** | Generated when the database is provisioned |
| **Password** | Hidden until you click **Reveal** |

All populated fields have a copy button. Use the full connection string for most clients and ORMs.

## Reveal credentials

The password and full connection string are not shown by default. Click **Reveal** next to the password field to fetch them; you can then copy the password or the complete connection string. Passwords are set when the database is provisioned and cannot currently be rotated from the console.

## Connect from your app

Set the connection string as an environment variable:

```bash
export DATABASE_URL="postgresql://<username>:<password>@<host>:5432/main_db"
```

In a deployment, add it under the deployment's **Environment variables** before the first build.

## Connect locally

The database exposes a public connection endpoint by default. Connect directly from your local machine using any Postgres client:

```bash
psql "postgresql://<username>:<password>@<host>:5432/main_db"
```

Or with a GUI client (TablePlus, DBeaver, pgAdmin) using the individual host, port, database, username, and password fields.

## Metrics

The **Metrics** tab charts CPU, memory, disk usage, and network bandwidth for the instance, with ranges from 15 minutes to 7 days. Metrics are collected while the database is running.

## Firewall

The **Firewall** tab lets you attach or detach workspace firewall policies to control which clients can reach the database. Policies are managed under **Firewall Policies** in the console.

## Settings

The **Settings** tab shows the instance details: engine, version, plan, storage size, whether the public endpoint is enabled, and the internal host for clients inside your workspace network.
