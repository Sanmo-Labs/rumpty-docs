---
id: notifications
title: Notifications
sidebar_label: Notifications
---

# Notifications

RumptyCloud mails the workspace owner when something important happens to an app. You can also paste one webhook so the same alerts show up in Discord or any HTTPS endpoint.

Open **Settings → Notifications**. Only workspace owners and administrators can change the webhook.

## What we mail

- **Deploy failed** — a deploy run did not finish
- **App crash** — the app kept crashing and we rolled it back or stopped it
- **Credit low** — your wallet is at or below about $5 after a billing cycle
- **Past due** — a cycle could not be settled from the wallet

These alerts are included. There is no extra charge.

## Webhook

Paste a Discord webhook (`https://discord.com/api/webhooks/…`) or any other `https` URL.

- Discord receives a short message
- Other URLs receive JSON: `type`, `app_name`, `workspace`, `url`, `message`

Email still goes out when a webhook is set. Clear the field to remove the webhook. The stored URL is never shown again after you save it.

## What’s next

- [GitHub](./integrations)
- [Scale to zero](../deployments/scale-to-zero)
- [Billing](../billing/introduction)
