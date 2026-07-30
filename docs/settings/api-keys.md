---
id: api-keys
title: API Keys
sidebar_label: API Keys
---

# API Keys

API keys are tokens for CLI tools and automation, used with the Rumpty CLI and GitHub Actions workflows. Manage them under **Settings → API Keys**.

:::warning
The token is only shown once immediately after creation. Copy it before leaving the page; it cannot be viewed again.
:::

## Create an API key

1. Enter a **Key name** (e.g. `Laptop CLI`, `CI deploy`, `staging bot`)
2. Set an **Expiration** (default: 1 year)
3. Click **+ Create key**
4. Copy the token immediately

## Existing keys

The **Existing Keys** panel lists all active tokens:

| Field | Details |
|-------|---------|
| **Name** | The label you gave the key |
| **Prefix** | First few characters of the token for identification |
| **Created** | Creation date and time |
| **Expires** | Expiry date and time |
| **Last used** | When the key was last used in a request |

## Revoke a key

Click **Revoke** next to a key to immediately invalidate it. Any CLI or automation using that token will stop working.

## Using an API key

API keys are used by the Rumpty CLI for authentication:

```bash
rumpty auth login --token <your-api-key>
```

They are also used as the `RUMPTY_TOKEN` secret in GitHub Actions deploy workflows. See [Deploy](/virtual-machines/deploy) for the full GitHub Actions setup.