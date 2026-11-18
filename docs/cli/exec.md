---
id: exec
title: Run a Command on a VM
sidebar_label: Exec
---

# Run a Command on a VM

`rumpty exec` runs a single non-interactive command on a VM and prints its output. Always put the remote command after `--`, so local shell parsing does not eat it:

```bash
rumpty exec my-vm -- uptime
```

## Quick start

Chain a longer remote command by handing it to a shell on the VM:

```bash
rumpty exec my-vm --ws acme -- bash -lc 'cd /app && git pull'
```

Run a command that needs a terminal (for example `sudo`):

```bash
rumpty exec my-vm --ws acme -t -- sudo systemctl reload nginx
```

## Requirements

- A signed-in session (`rumpty login`) or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).
- A workspace: the `--ws` flag or `$RUMPTY_WORKSPACE`. The examples without `--ws` assume `RUMPTY_WORKSPACE` is set.

## Flags

| Flag | Description |
|------|-------------|
| `-t`, `--tty` | Allocate a pseudo-TTY for the remote command |
| `-i`, `--identity` | Private key for VM login |
| `--user` | Guest username on the VM |
| `--ssh-debug` | Enable verbose OpenSSH debugging |

## Exec vs SSH

`exec` runs one command and returns; use it in scripts and CI. For an interactive session, use [SSH](./ssh).
