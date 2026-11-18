---
id: ssh
title: SSH into a VM
sidebar_label: SSH
---

# SSH into a VM

`rumpty ssh` opens an interactive shell in a virtual machine in your workspace. Authentication is handled by your Rumpty session, so there are no SSH keys to manage for the default path.

## Quick start

```bash
rumpty ssh my-vm
```

Name the workspace with `--ws` (or set `RUMPTY_WORKSPACE` once and leave the flag off):

```bash
rumpty ssh my-vm --ws acme-dev
```

You land in a shell on the VM. Leave it with `exit` or Ctrl-D.

## Requirements

- A signed-in session (`rumpty login`) or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).
- A workspace: the `--ws` flag or `$RUMPTY_WORKSPACE`. The examples without `--ws` assume `RUMPTY_WORKSPACE` is set.

## Flags

| Flag | Description |
|------|-------------|
| `-i`, `--identity` | Private key for VM login |
| `--user` | Guest username on the VM |
| `--ssh-debug` | Enable verbose OpenSSH debugging |

## Troubleshooting

If a connection fails, run the same command with `--ssh-debug` to see the underlying OpenSSH output. To check that the VM exists in the workspace you are targeting, list it first:

```bash
rumpty vm ls
```
