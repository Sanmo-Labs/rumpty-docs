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
| **Connection string** | `postgresql://<username>:<password>@<host>:5432/main_db?sslmode=require` |
| **Host** | The database's connection host |
| **Port** | `5432` |
| **Database** | `main_db` |
| **Username** | Generated when the database is provisioned |
| **Password** | Hidden until you click **Reveal** |

All populated fields have a copy button. Use the full connection string for most clients and ORMs. Copy it as-is: the `?sslmode=require` at the end is required for public connections (see [TLS](#tls-and-certificate-verification)).

## Reveal credentials

The password and full connection string are not shown by default. Click **Reveal** next to the password field to fetch them; you can then copy the password or the complete connection string. Passwords are set when the database is provisioned and cannot currently be rotated from the console.

## Connect from your app

Set the connection string as an environment variable:

```bash
export DATABASE_URL="postgresql://<username>:<password>@<host>:5432/main_db?sslmode=require"
```

In a deployment, add it under the deployment's **Environment variables** before the first build. Apps deployed on Rumpty Cloud in the same workspace should use the **internal connection string** instead; it stays on the private network.

## Connect locally

The database exposes a public connection endpoint by default. Connect directly from your local machine using any Postgres client:

```bash
psql "postgresql://<username>:<password>@<host>:5432/main_db?sslmode=require"
```

Or with a GUI client (TablePlus, DBeaver, pgAdmin) using the individual host, port, database, username, and password fields. In the client's SSL settings, set SSL mode to **require**, and enter the **host name** shown in the console, not an IP address: the endpoint routes on the host name, so connecting by IP fails.

## TLS and certificate verification

Public Postgres connections must use TLS. A client that connects without it gets the error `Rumpty public Postgres connections require sslmode=require`.

`sslmode=require` encrypts the connection without checking the server's certificate, which works with every client. To also verify that you're talking to your database:

1. On the **Connection** tab, click **Download certificate** under **Server certificate**. This saves `<database>-ca.crt`.
2. Point your client at it and turn on full verification:

```bash
psql "postgresql://<username>:<password>@<host>:5432/main_db?sslmode=verify-full&sslrootcert=./main_db-ca.crt"
```

Recent versions of Node `pg` (and tools built on it) treat `sslmode=require` as full verification, so the plain connection string fails with `self-signed certificate`. Add the certificate to the connection string:

```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:5432/main_db?sslmode=verify-full&sslrootcert=./main_db-ca.crt"
```

If you can't ship the certificate file, use `sslmode=no-verify` to encrypt without verifying. Put these options in the connection string rather than in an `ssl` object: `pg` lets the connection string's `sslmode` override the `ssl` option.

Each database has its own self-signed certificate, which is why it isn't trusted by default.

## Client examples

The **Connect with** section on the Connection tab has these ready to copy, with your host and credentials filled in.

**Python (psycopg)** uses libpq, so `sslmode=require` behaves like `psql`:

```python
import psycopg

with psycopg.connect("postgresql://<username>:<password>@<host>:5432/main_db?sslmode=require") as conn:
    print(conn.execute("select version()").fetchone())
```

**Go (pgx)** accepts the connection string as-is:

```go
conn, err := pgx.Connect(context.Background(), "postgresql://<username>:<password>@<host>:5432/main_db?sslmode=require")
```

**ORMs and tools built on Node `pg`** (Drizzle, Knex, Sequelize, Prisma with `@prisma/adapter-pg`) follow the Node `pg` rules above: use `sslmode=verify-full&sslrootcert=...` or `sslmode=no-verify` in the connection string.

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Rumpty public Postgres connections require sslmode=require` | The client connected without TLS. | Add `?sslmode=require` to the connection string, or turn SSL on in your GUI client. |
| `self-signed certificate`, `unable to verify the first certificate`, `certificate verify failed` | The client verifies certificates and doesn't trust the database's certificate. | Download the certificate and use `sslmode=verify-full&sslrootcert=...`, or `sslmode=no-verify` to skip verification. |
| `unrecognized name` | The host name isn't a Rumpty database: a typo, a deleted database, or a connection by IP address. | Copy the host from the Connection tab and connect by host name. |
| `access denied` (TLS alert) | A firewall policy attached to the database doesn't allow your IP on port 5432. | Add a rule for your IP on the database's **Firewall** tab. |
| `internal error` (TLS alert) | The database is starting, restarting, or not ready. | Wait a minute and retry. If it persists, check the database status in the console. |
| Connection times out | Outbound port 5432 is blocked by your network, or the host is wrong. | Try another network, or check with your network admin. |
| `connection reset` after opening many connections quickly | The public endpoint limits how many connections one IP can open at once and in a short time. | Use a connection pool and reuse connections instead of opening one per request. |

## Metrics

The **Metrics** tab charts CPU, memory, disk usage, and network bandwidth for the instance, with ranges from 15 minutes to 7 days. Metrics are collected while the database is running.

## Firewall

The **Firewall** tab lets you attach or detach workspace firewall policies to control which clients can reach the database. Policies are managed under **Firewall Policies** in the console.

## Settings

The **Settings** tab shows the instance details: engine, version, plan, storage size, whether the public endpoint is enabled, and the internal host for clients inside your workspace network.
