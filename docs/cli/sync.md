---
id: sync
title: Sync a Local Folder
sidebar_label: Sync
---

# Sync a Local Folder

`rumpty sync` keeps a folder on your computer backed up to a [bucket](/buckets/introduction) in Rumpty object storage. It is one-way (local to cloud) and incremental: only new and changed files are uploaded, so repeat runs take seconds.

## Quick start

```bash
rumpty sync ~/sales-reports my-backups
```

That's it. On the first run the CLI:

1. Signs you in if you aren't already (see [Login](./login)).
2. Creates the `my-backups` bucket if it doesn't exist — private by default.
3. Creates and caches an access key for the bucket.
4. Uploads your files and prints a summary.

Run it again after editing files and only the changes are transferred:

```
Synced 3 files (1.2 MiB) to my-backups, 214 unchanged
```

If you omit the bucket, one named after the folder is used:

```bash
cd ~/sales-reports
rumpty sync .        # syncs to a bucket named "sales-reports"
```

## Flags

| Flag | Description |
|------|-------------|
| `--watch` | Keep running and sync new changes as they happen |
| `--daemon` | Run `--watch` as a detached background process |
| `--restore` | Copy files from the bucket back to the local folder |
| `--delete` | Delete remote files that no longer exist locally |
| `--dry-run` | Show what would be transferred without doing it |
| `--public` | Create the bucket with publicly readable files (default is private) |
| `--include` | Only sync files matching these globs (repeatable or comma-separated) |
| `--exclude` | Skip files matching these globs (repeatable or comma-separated) |

## Choose what syncs

Sync a single file by passing its path:

```bash
rumpty sync ~/Desktop/report.pdf my-backups
```

Filter by file type or pattern with `--include` and `--exclude`. Patterns without a slash match file names at any depth, and a trailing `/**` matches a whole directory:

```bash
# Only images
rumpty sync ~/photos my-backups --include "*.jpg,*.png"

# Everything except dependencies and logs
rumpty sync ~/projects/app my-backups --exclude "node_modules/**" --exclude "*.log"

# Markdown files directly inside docs/
rumpty sync . my-backups --include "docs/*.md"
```

Organize multiple folders in one bucket with a prefix:

```bash
rumpty sync /var/log/app my-backups/logs
rumpty sync ~/photos my-backups/photos
```

## Mirror deletions

By default nothing is ever deleted remotely. Pass `--delete` to make the bucket mirror the folder exactly:

```bash
rumpty sync ~/photos my-backups --delete
```

:::warning
`--delete` removes remote files that no longer exist locally. Preview the plan first with `--dry-run`:

```bash
rumpty sync ~/photos my-backups --delete --dry-run
```
:::

## Restore files

Pull the bucket's contents back down to any machine — new computer, teammate's laptop, or a server:

```bash
rumpty sync ~/restored-photos my-backups --restore
```

The folder is created if it doesn't exist, and only missing or differing files are downloaded.

## Continuous sync

### Watch mode

`--watch` runs the initial sync, then stays in the foreground and pushes changes as they happen until you press Ctrl-C:

```bash
rumpty sync ~/sales-reports my-backups --watch
```

### Daemon mode

`--daemon` does the same in a detached background process, so it keeps syncing after you close the terminal:

```bash
rumpty sync ~/sales-reports my-backups --daemon
```

```
› Sync daemon started (pid 48231), watching ~/sales-reports
› Logs: ~/.config/rumpty/sync-daemons/a1b2c3d4e5f6.log
› Check with "rumpty sync status", stop with "rumpty sync stop ~/sales-reports"
```

The daemon is self-healing: transient failures (network drops, expired credentials) are retried automatically with backoff. You can run one daemon per folder.

Check on your daemons:

```bash
rumpty sync status
```

```
PATH                     BUCKET       STATUS   PID    LAST SYNC  LAST ERROR
/Users/you/sales-reports my-backups   running  48231  12s ago    —
```

Stop one by path or bucket name, or stop everything:

```bash
rumpty sync stop ~/sales-reports
rumpty sync stop --all
```

:::tip
Daemons do not survive a reboot. To restart syncing automatically at login, run the same `--daemon` command from your OS startup mechanism (Login Items on macOS, a systemd user unit on Linux, Task Scheduler on Windows).
:::

## How changes are detected

A file is uploaded when it is missing remotely, its size differs, or it was modified after the remote copy was written. Symbolic links are skipped. File paths are stored slash-separated, so folders synced from Windows restore correctly on macOS and Linux (and vice versa).

## Where credentials live

Bucket access keys minted by `sync` are cached in the CLI config directory and reused across runs. If a cached key is revoked, the CLI detects the failure, mints a new key, and retries automatically. Revoking keys is managed from the bucket's **Access keys** tab in the console.
