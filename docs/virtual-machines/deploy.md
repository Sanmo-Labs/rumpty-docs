---
id: deploy
title: Deploy
sidebar_label: Deploy
---

# Deploy

The Deploy tab gives you everything needed to ship build artifacts to this VM, either automatically via GitHub Actions or manually via the Rumpty CLI.

## How it works

Your build runs in GitHub Actions. The Rumpty action uploads the build output to the VM and runs your after-deploy command. Your build stays in GitHub; only the artifact is transferred.

## GitHub Actions setup

### Step 1: Add secrets

Add these two secrets to your GitHub repository under **Settings → Secrets → Actions**:

| Secret | Value |
|--------|-------|
| `RUMPTY_TOKEN` | Your platform API token (shown on the Deploy tab) |
| `RUMPTY_VM_ID` | The VM's unique ID (shown on the Deploy tab) |

### Step 2: Configure a reverse proxy

Set up a reverse proxy on the VM once to route traffic to your app. Rumpty only needs a deploy target directory and an after-deploy command. The Deploy tab includes example configs for nginx and HAProxy; Caddy or any other proxy works too.

| Proxy | Config path | Best for |
|-------|-------------|---------|
| **nginx** | `/etc/nginx/sites-available/<vm-name>` | Static builds served from `/var/www` |
| **HAProxy** | `/etc/haproxy/haproxy.cfg` | Forwarding traffic to a local app port |

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
        run: |
          npm ci
          npm run build

      - name: Deploy to RumptyCloud
        uses: rumptycloud/deploy-action@v1
        with:
          token: ${{ secrets.RUMPTY_TOKEN }}
          vm-id: ${{ secrets.RUMPTY_VM_ID }}
          source: ./dist
          target: /var/www/<vm-name>
          after-deploy: sudo systemctl reload nginx
```

### Step 4: Push to deploy

Every push to `main` triggers the workflow. GitHub runs the build; Rumpty uploads the artifact and runs your after-deploy command on the VM.

Click **View app** on the Deploy tab to open the live URL.

## CLI deploy (local builds)

For quick testing without GitHub Actions, build locally, copy the output to the VM, and run your after-deploy command:

```bash
rumpty copy ./dist <vm-name>:/var/www/<vm-name> --ws <workspace-slug>
rumpty exec <vm-name> --ws <workspace-slug> -- sudo systemctl reload nginx
```

`rumpty copy` transfers files to the VM (rsync when available, scp otherwise); `rumpty exec` runs the remote command after `--`.
