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

- Click **+ Fund cloud credit** to top up your prepaid balance with a card
- Or add a card under the **Cards** tab; any usage not covered by credit is charged to your default card at the end of the cycle
- Have a promo or referral code? Enter it in the **Wallet** card and click **Apply code**

Cloud credit is always applied first. See [Billing](/billing/introduction) for how usage, credit, and card charges fit together.

## Add an SSH key

SSH keys are injected into new virtual machines so you can open a shell without passwords.

1. Go to **Settings → SSH Keys**
2. Enter a **Key name** (e.g. `MacBook Pro`)
3. Paste your **Public key** and click **+ Add key**

Generate a key first if you don't have one:

```bash
ssh-keygen -t ed25519 -C "rumpty"
```

Then paste the contents of `~/.ssh/id_ed25519.pub` into the Public key field. See [SSH Keys](/settings/ssh-keys) for fingerprints and key management.

## Next steps

You're set up. Head to the [Quick Start](./quick-start) to launch your first VM or deployment.
