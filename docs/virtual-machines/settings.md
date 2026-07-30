---
id: settings
title: Settings
sidebar_label: Settings
---

# Settings

The Settings tab covers custom domains, exposed ports, and destructive VM actions.

## Custom domains

Point your own domain at the web app running on this VM:

1. Enter your domain (e.g. `app.example.com`) under **Custom Domains**
2. Click **+ Add domain**
3. Copy the DNS records shown and add them at your DNS provider
4. The platform verifies the records once they propagate

Once verified, your domain routes to the VM's app over HTTPS automatically.

## Exposed ports

Expose internal services running on the VM to the public web over secure HTTPS:

| Field | Example |
|-------|---------|
| **Port** | `3000` |
| **Service name** | `api` (optional) |
| **Protocol** | HTTP or TCP |

Click **+ Expose Port**. Two ports are pre-configured on every VM:

| Port | Service | Value |
|------|---------|-------|
| 22 | SSH (DEFAULT) | `rumpty vm ssh <name>` |
| 8080 | HTTP App (DEFAULT) | `https://<slug>.app.rumptycloud.com` |

Exposed port URLs are listed in the table and can be shared directly.

## Destroy VM

:::danger
Permanently destroys the VM and all its data. This cannot be undone.
:::

Click **Destroy VM** at the bottom of the Settings tab. Attached volumes are detached but not deleted; they remain in **Storage → Volumes** and can be reattached to another VM.