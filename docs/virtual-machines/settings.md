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
2. Click **Add domain**
3. Expand the domain row, copy the DNS records shown, and add them at your DNS provider
4. Once the records propagate, click **Verify**

Verification issues a TLS certificate for the domain; this can take a minute. When the domain shows **Verified** or **Active**, it serves your VM's app over HTTPS.

:::note
Use a subdomain such as `www.example.com`. Root domains are not supported yet.
:::

## Exposed ports

Expose internal services running on the VM to the public web over secure HTTPS:

| Field | Example |
|-------|---------|
| **Port** | `3000` |
| **Service name** | `api` (optional) |
| **Protocol** | HTTP or gRPC |

Click **Expose Port**. The service inside the VM must listen on `0.0.0.0:<port>`, not only `127.0.0.1`. Each exposed port gets its own URL, listed in the table with a status (**Pending**, **Ready**, **Failed**); URLs can be shared directly once **Ready**. Use **Unexpose** to remove one.

Two ports are pre-configured on every VM:

| Port | Service | Value |
|------|---------|-------|
| 22 | SSH (DEFAULT) | `rumpty ssh <vm-name>` |
| 8080 | HTTP App (DEFAULT) | The VM's app URL |

You can also expose ports from the CLI with `rumpty expose <vm> --port <port>` and remove them with `rumpty unexpose <vm> --name <name>`.

## Destroy VM

:::danger
Permanently destroys the VM and all its data. This cannot be undone.
:::

Click **Destroy VM** at the bottom of the Settings tab, then type the VM's exact name in the confirmation dialog to enable deletion. Attached volumes are detached but not deleted; they remain in **Storage → Volumes** and can be reattached to another VM.
