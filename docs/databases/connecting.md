---
id: connecting
title: Connecting to Your Database
sidebar_label: Connecting
---

# Connecting to Your Database

## Find your connection details

1. Open the database detail page
2. Click **Connection** tab

You'll see the host, port, database name, username, and a generated password.

## Connection string formats

**PostgreSQL:**
```
postgresql://username:password@host:5432/dbname?sslmode=require
```

**MySQL:**
```
mysql://username:password@host:3306/dbname
```

**Redis:**
```
rediss://username:password@host:6379
```

:::info
Always use SSL (`sslmode=require` / `rediss://`) for connections. Plain-text connections are disabled.
:::

## Connect from a VM or deployment

Store your connection string as an environment variable:

```bash
export DATABASE_URL="postgresql://..."
```

In a deployment, add it under **Settings → Environment**.

## Connect from your local machine

By default, databases are not publicly accessible. To connect locally:

### Option 1 — Trusted IP

1. Open the database → **Settings → Trusted Sources**
2. Add your IP address
3. Connect directly using any database client

### Option 2 — SSH tunnel (recommended)

Use a VM in the same region as a jump host:

```bash
ssh -L 5432:db-host:5432 root@your-vm-ip -N
```

Then connect to `localhost:5432` with your local client.

## Connection pooling

Connection pooling is built-in via PgBouncer (PostgreSQL) or ProxySQL (MySQL). Use the **pooled connection string** shown in the Connection tab to reduce connection overhead for high-traffic apps.
