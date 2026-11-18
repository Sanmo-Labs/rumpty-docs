---
id: copy
title: Copy Files to or from a VM
sidebar_label: Copy files
---

# Copy Files to or from a VM

`rumpty copy` (alias `cp`) moves files between your machine and a VM. One of the two paths must be remote, written with the `vm:path` syntax. The CLI uses `rsync` when it is available on both ends and falls back to `scp` when it is not.

## Quick start

Upload a file:

```bash
rumpty copy ./app.tar.gz my-vm:/tmp/
```

Download a file:

```bash
rumpty cp my-vm:/var/log/app.log ./logs/
```

Upload a folder (recursive automatically):

```bash
rumpty cp ./dist my-vm:/srv/app/
```

Download a folder (add `-r` when the transfer runs over scp):

```bash
rumpty cp -r my-vm:/var/log ./logs/
```

## Requirements

- A signed-in session (`rumpty login`) or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).
- A workspace: the `--ws` flag or `$RUMPTY_WORKSPACE`. The examples without `--ws` assume `RUMPTY_WORKSPACE` is set.

## Flags

| Flag | Description |
|------|-------------|
| `-i`, `--identity` | Private key for VM login |
| `-r`, `--recursive` | Copy directories recursively (required for remote directories when using scp) |
| `--user` | Guest username on the VM |
| `--ssh-debug` | Enable verbose OpenSSH debugging |

## How the transfer runs

- `rsync` is used when it is available locally and on the VM; otherwise the CLI falls back to `scp`.
- Uploading a local directory always copies it recursively.
- Downloading a remote directory needs `-r` when the transfer runs over scp.

If a transfer fails, run it again with `--ssh-debug` to see the underlying OpenSSH output.
