---
id: account-setup
title: Account Setup
sidebar_label: Account Setup
---

# Account Setup

## Create an account

1. Go to [yourplatform.com/signup](https://yourplatform.com/signup)
2. Enter your email and choose a password
3. Verify your email via the confirmation link
4. Complete your profile (name, organisation)

## Add a payment method

A payment method is required before creating any resources.

1. Navigate to **Billing → Payment Methods**
2. Click **Add Card** and enter your details
3. Click **Save**

:::info
We support Visa, Mastercard, and American Express. Invoices are generated monthly.
:::

## Set up SSH keys

SSH keys are used to securely access your virtual machines.

1. Go to **Settings → SSH Keys → Add SSH Key**
2. Paste your public key (e.g. contents of `~/.ssh/id_rsa.pub`)
3. Give it a label and save

Generate a key if you don't have one:

```bash
ssh-keygen -t ed25519 -C "your@email.com"
```

## Create a project

Projects organise your resources (VMs, databases, deployments, etc.).

1. From the dashboard, click **New Project**
2. Enter a name and optional description
3. Click **Create**
