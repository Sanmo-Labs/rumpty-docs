---
id: introduction
title: One-Click Apps
sidebar_label: One-Click Apps
---

# One-Click Apps

One-click apps launch popular open-source software with a single form. Each app runs in its own isolated environment with durable storage, on your choice of compute plan.

Go to **Compute → One-Click Apps**.

## Catalog

| App | Version | Category | From |
|-----|---------|----------|------|
| Authelia | 4.39.26 | Identity | NGN 3,172.50/mo |
| Authentik | 2026.8.2 | Identity | NGN 14,445.00/mo |
| Forgejo | 15.0.5 | Development | NGN 3,645.00/mo |
| Ghost | 6.53.0 | CMS | NGN 14,445.00/mo |
| Jellyfin | 12.0 | Media | NGN 12,217.50/mo |
| Kaneo | 2.24.0 | Productivity | NGN 5,872.50/mo |
| Keycloak | 26.5.0 | Identity | NGN 14,445.00/mo |
| Odoo | 19 | Business | NGN 14,917.50/mo |
| Outline | 1.10.0 | Knowledge | NGN 9,612.00/mo |
| Plausible | 3.2.1 | Analytics | NGN 20,317.50/mo |
| RabbitMQ | 4.2.3 | Developer tools | NGN 5,872.50/mo |
| Umami | 2.15.1 | Analytics | NGN 5,872.50/mo |
| Uptime Kuma | 2.4.0 | Monitoring | NGN 3,172.50/mo |
| Vaultwarden | 1.36.0 | Security | NGN 3,172.50/mo |
| WordPress | 7.1 | CMS | NGN 14,445.00/mo |
| n8n | 2.31.5 | Automation | NGN 5,872.50/mo |

The "from" price is the monthly total for the app's default setup: the default plan for each part of the app (for example the web app and its database) plus its storage. Apps tagged **Database** run a dedicated database alongside the app; apps tagged **Web** run standalone.

## Deploy an app

1. Open the app's card and select its **Deploy** button.
2. Enter an **App name**. It becomes the app's address on a `rumptycloud.com` subdomain, served over HTTPS. You can attach a custom domain later.
3. Choose a **Compute plan**. Each app card recommends a plan (for example, Uptime Kuma recommends Tiny).
4. Review the **Estimated cost**. Apps are billed by the hour, only while running; the figure shown is the full-month estimate for the selected plan.
5. Select **Deploy**.

## What you get

- Your own app, live on a `rumptycloud.com` address with HTTPS, ready in minutes
- **Durable storage** — content, settings, and data survive every restart and update
- **Managed and isolated** — the app runs in its own sandbox; deleting the app removes everything, at any time

