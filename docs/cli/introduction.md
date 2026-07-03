---
id: introduction
title: CLI
sidebar_label: Introduction
slug: /cli/introduction
---

# Rumpty CLI

Manage workspaces, VMs, and resources on the RumptyCloud platform from your terminal.

RumptyCloud

Sanmọ̀Labs™ - Surpass your limits!

rumpty 0.0.3

## Install

[Download the CLI →](#) *(tar.gz)*

Extract and move to a directory of your choice:

```bash
tar -xzf rumpty-*.tar.gz -C /usr/local/bin/rumpty-cli
```

## Configure environment variables

The CLI requires two environment variables to connect to the platform:

```bash
export RUMPTY_API_KEY="your-api-key"
export RUMPTY_API_URL="https://api.rumptycloud.com"
```

Get your API key from [Settings → API Keys](/settings/api-keys).

Add these to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.) to persist across sessions.

## Add to PATH

Add the CLI directory to your PATH:

```bash
export PATH="$PATH:/usr/local/bin/rumpty-cli"
```

Reload your shell or run `source ~/.bashrc` (or `~/.zshrc`) for the change to take effect.

Verify the install:

```bash
rumpty --version
```

## Global flags

These flags work with any command:

| Flag | Env variable | Description |
|------|-------------|-------------|
| `--token` | `RUMPTY_API_KEY` | Your Rumpty API key |
| `--api-url` | `RUMPTY_API_URL` | Rumpty API base URL |
| `--ws` / `--workspace` | `RUMPTY_WORKSPACE` | Workspace slug |
| `--log-level` | `RUMPTY_LOG_LEVEL` | Log level: `error`, `warn`, `info`, `debug` |
| `-v`, `--verbose` | — | Enable debug logging (same as `--log-level=debug`) |

## Available commands

| Command | Description |
|---------|-------------|
| [`login`](./login) | Authenticate with Rumpty |
| [`logout`](./login#logout) | Remove the local Rumpty session |
| `ssh` | Open an SSH session to a workspace VM |
| `copy` | Copy files between your machine and a VM |
| `exec` | Run a non-interactive command on a VM |
| `expose` | Expose a VM service with a public URL |
| `unexpose` | Remove a VM service public URL |
| `vm` | Manage workspace VMs |
| `workspaces` | List workspaces you can access |
| `completion` | Generate shell autocompletion script |

Use `rumpty [command] --help` for details on any command.