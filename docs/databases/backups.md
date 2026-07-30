---
id: backups
title: Backups
sidebar_label: Backups
---

# Database Backups

Automatic backups are not available yet. There is no Backups tab in the console, and no scheduled snapshots, point-in-time recovery, or managed restore flow. Until managed backups ship, you are responsible for backing up your data.

:::warning
Deleting a database removes the instance and its data. There is no platform-side backup to restore from.
:::

## Back up manually

Use your database's connection string (from the **Connection** tab) with standard client tools. For Postgres:

```bash
pg_dump "postgresql://<username>:<password>@<host>:5432/<database>" > backup.sql
```

To restore into a new database:

```bash
psql "postgresql://<username>:<password>@<host>:5432/<database>" < backup.sql
```

Run dumps on a schedule from your own infrastructure or CI if you need regular backups.
