---
id: introduction
title: CLI
sidebar_label: Introduction
slug: /cli/introduction
---

# Rumpty CLI

Manage workspaces, VMs, and resources on the RumptyCloud platform from your terminal.

## Install

Install the latest release with the install script:

```bash
curl -fsSL https://get.rumptycloud.com | sh
```

The script downloads the release for your OS and architecture, verifies its checksum, and installs the `rumpty` binary to `/usr/local/bin` (falling back to `~/.local/bin` when that directory is not writable). It warns if the install directory is not on your PATH.

Optional overrides:

```bash
# Install a specific version
curl -fsSL https://get.rumptycloud.com | RUMPTY_VERSION=v0.0.3 sh

# Install to a custom directory
curl -fsSL https://get.rumptycloud.com | RUMPTY_INSTALL_DIR="$HOME/.local/bin" sh
```

Verify the install:

```bash
rumpty --version
```

## Authenticate

Sign in through your browser, which stores a session for later commands:

```bash
rumpty login
```

For CI and scripts, use an API key instead. Get one from [Personal API keys](/settings/api-keys) on your profile, then pass it with `rumpty login --token`, the `--token` flag on any command, or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).

## Environment variables

Every setting can also come from the environment, which is useful in CI:

```bash
export RUMPTY_API_KEY="your-api-key"
export RUMPTY_WORKSPACE="your-workspace-slug"
```

Add these to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.) to persist across sessions.

## Global flags

These flags work with any command:

| Flag | Env variable | Description |
|------|-------------|-------------|
| `--token` | `RUMPTY_API_KEY` | Your Rumpty API key |
| `--api-url` | `RUMPTY_API_URL` | Rumpty API base URL |
| `--ws` / `--workspace` | `RUMPTY_WORKSPACE` | Workspace slug |
| `--log-level` | `RUMPTY_LOG_LEVEL` | Log level: `error`, `warn`, `info`, `debug` |
| `-v`, `--verbose` |  | Enable debug logging (same as `--log-level=debug`) |

## Available commands

| Command | Description |
|---------|-------------|
| [`login`](./login) | Authenticate with Rumpty |
| [`logout`](./login#logout) | Remove the local Rumpty session |
| `ssh` | Open an SSH session to a workspace VM |
| `copy` (alias `cp`) | Copy files between your machine and a VM |
| `exec` | Run a non-interactive command on a VM |
| `expose` | Expose a VM service with a public URL |
| `unexpose` | Remove a VM service public URL |
| `vm` | Manage workspace VMs: `ls`, `start`, `stop`, `reboot`, `delete`, `expose ls` |
| `workspaces` | List workspaces you can access |
| `completion` | Generate shell autocompletion script |

Use `rumpty [command] --help` for details on any command.

## Shell completion

Generate and install the completion script for your shell:

```bash
rumpty completion zsh > "${fpath[1]}/_rumpty"
rumpty completion bash | sudo tee /etc/bash_completion.d/rumpty > /dev/null
rumpty completion fish > ~/.config/fish/completions/rumpty.fish
```

Completion also suggests live VM names and workspace slugs (e.g. `rumpty ssh <TAB>`, `rumpty --ws <TAB>`). Dynamic suggestions call the API, so they require authentication; if the API is unreachable, completion fails quietly instead of blocking the prompt.