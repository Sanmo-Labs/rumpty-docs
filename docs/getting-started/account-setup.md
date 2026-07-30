---
id: account-setup
title: Account Setup
sidebar_label: Account Setup
---

# Account Setup

Everything you need to go from zero to a working account: sign up, create a workspace, set up billing, and add an SSH key.

## Create an account

1. Go to [console.rumptycloud.com/n](https://console.rumptycloud.com/n)
2. Choose a **username**, enter your **email**, and set a **password** (at least 10 characters)
3. Accept the terms and click **Create account**
4. A verification link is sent to your email. Click it to activate your account, then log in

## Create your first workspace

The first time you log in, you'll be prompted to create a workspace. A workspace is the top-level container for everything you build: VMs, deployments, databases, volumes, and more.

1. Enter a **Workspace name** (e.g. `Makulu Production`)
2. Add an optional **Description**
3. Click **Create workspace →**

You'll land on that workspace's dashboard. See [Workspaces](./workspaces) for switching, slug IDs, and multi-workspace setups.

## Set up billing

Resources are billed hourly, so set up billing before you start creating things. Go to **Others → Billing**:

- Click **+ Fund cloud credit** to top up your prepaid balance with a card. You can save the card during checkout for faster top-ups later
- Have a promo code? Open the **Wallet** tab, enter it under **Promo code**, and click **Apply code**

Usage draws down from your credit as resources run. See [Billing](/billing/introduction) for how usage, credit, and invoices fit together.

## Add an SSH key

SSH keys are injected into new virtual machines so you can open a shell without passwords.

1. Go to **Settings → SSH keys** in your workspace sidebar
2. Enter a **Key name** (e.g. `MacBook Pro`)
3. Paste your **Public key** and click **Add key**

Generate a key first if you don't have one:

```bash
ssh-keygen -t ed25519 -C "rumpty"
```

Then paste the contents of `~/.ssh/id_ed25519.pub` into the Public key field. See [SSH Keys](/settings/ssh-keys) for fingerprints and key management.

## Next steps

You're set up. Head to the [Quick Start](./quick-start) to launch your first VM or deployment.
