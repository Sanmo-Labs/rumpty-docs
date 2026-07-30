---
id: deploy
title: Deploy
sidebar_label: Deploy
---

# Deploy

The Deploy tab gives you everything needed to ship build artifacts to this VM, either automatically via GitHub Actions or manually via the Rumpty CLI.

## How it works

Your build runs in GitHub Actions (or locally). The Rumpty action uploads the compiled artifact to the VM and runs your after-deploy command. Your source code never leaves GitHub; only the build output is transferred.

## GitHub Actions setup

### Step 1: Add secrets

Add these two secrets to your GitHub repository under **Settings → Secrets → Actions**:

| Secret | Value |
|--------|-------|
| `RUMPTY_TOKEN` | Your platform API token (shown on the Deploy tab) |
| `RUMPTY_VM_ID` | The VM's unique ID (shown on the Deploy tab) |

### Step 2: Configure a reverse proxy

Set up a reverse proxy on the VM once to route traffic to your app. Rumpty only needs a deploy target directory and an after-deploy command.

| Proxy | Config path | Best for |
|-------|-------------|---------|
| **nginx** | `/etc/nginx/sites-available/<vm-name>` | Static builds served from `/var/www` |
| **HAProxy** | `/etc/haproxy/haproxy.cfg` | Forwarding traffic to a local app port |
| **Caddy** | `/etc/caddy/Caddyfile` | Automatic HTTPS with minimal config |

### Step 3: Add the workflow file

The Deploy tab generates a ready-to-use workflow. Copy it to `.github/workflows/rumpty-deploy.yml` in your repository:

```yaml
name: Deploy to RumptyCloud
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Build
        run: npm ci && npm run build
      # Rumpty action uploads artifact and runs after-deploy hook
```

### Step 4: Push to deploy

Every push to `main` triggers the workflow. GitHub runs the build; Rumpty uploads the artifact and runs your after-deploy command on the VM.

Click **View app** on the Deploy tab to open the live URL.

## CLI deploy (local builds)

For quick testing without GitHub Actions, build locally and deploy directly:

```bash
rumpty deploy <vm-name> --ws <workspace-id> --source ./dist --target /var/www
```

The sample command with your VM name and workspace ID pre-filled is shown on the Deploy tab under **Sample CLI Command**.