---
id: backups
title: Backups
sidebar_label: Backups
---

# Database Backups

All databases are backed up automatically. Backups are stored in a separate region for durability.

## Backup schedule

| Backup type | Frequency | Retention |
|-------------|-----------|-----------|
| Daily snapshot | Every 24 hours | 7 days |
| Weekly snapshot | Every Sunday | 4 weeks |
| Point-in-time recovery (PITR) | Continuous | 7 days |

## View backups

1. Open the database detail page
2. Click the **Backups** tab

You'll see a list of available snapshots with timestamps.

## Restore from a backup

### Restore to a new database

1. Click **Restore** next to a backup
2. Choose a plan and region for the new database
3. Click **Restore**

This creates a new database from the backup. Your original database is unaffected.

### Point-in-time restore

1. Click **Restore to a point in time**
2. Enter a timestamp (within the last 7 days)
3. Click **Restore**

## Manual backups

Trigger an on-demand backup at any time:

1. Open the database → **Backups → Take Backup Now**

Manual backups do not count toward the automatic backup retention limits.

## Download a backup

1. Go to **Backups**
2. Click **Download** next to a snapshot
3. The backup is provided as a compressed dump file (`.sql.gz`)
