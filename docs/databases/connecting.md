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
| **Connection string** | `postgresql://postgres:password@pg-4b4151.ws-qa-testing-019ef102.stg.db.rumptycloud.com:5432/main_db` |
| **Host** | `pg-4b4151.ws-qa-testing-019ef102.stg.db.rumptycloud.com` |
| **Port** | `5432` |
| **Database** | `main_db` |
| **Username** | `postgres` |
| **Password** | Shown masked. Click **Refresh** to rotate, copy icon to copy |

All fields have a copy button. Use the full connection string for most clients and ORMs.

## Connect from your app

Set the connection string as an environment variable:

```bash
export DATABASE_URL="postgresql://postgres:<password>@<host>:5432/main_db"
```

In a deployment, add it under the deployment's **Environment variables** before the first build.

## Connect locally

The database exposes a public connection endpoint by default. Connect directly from your local machine using any Postgres client:

```bash
psql "postgresql://postgres:<password>@<host>:5432/main_db"
```

Or with a GUI client (TablePlus, DBeaver, pgAdmin) using the individual host, port, database, username, and password fields.

## Rotate the password

Click **Refresh** next to the password field to generate a new password. Update your app's environment variables immediately after rotating.

:::warning
Rotating the password invalidates the old one immediately. Any running apps using the old connection string will lose database access until updated.
:::