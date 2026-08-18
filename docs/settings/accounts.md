---
id: account
title: Account
sidebar_label: Account
---

# Account

The **Account** tab on your profile (**Manage Profile → My profile** in the top-right navbar) shows your profile, active policies, billing and tax details, billing cycle, free usage, and password settings.

## Profile

| Field | Details |
|-------|---------|
| **Username** | Your `@handle` on the platform |
| **Email** | The address used to sign in |
| **Sign-in method** | Password or OAuth |
| **Joined** | Account creation date |
| **Email status** | Verified or unverified |

If your email is unverified, a banner lets you resend the verification email.

## Account policies

Two required policies apply to your account:

- **Privacy and Data Policy**: how account, workspace, and platform safety data is handled
- **Fair Use Policy**: what belongs on RumptyCloud, what gets stopped, and why

The date you accepted them is shown. Both must be accepted before you can create virtual machines or deployments.

## Billing and tax

Set your **Billing country** and an optional **Tax ID** (VAT / TIN for business invoices). These determine the tax treatment on your invoices. Click **Save billing details** to apply the change to future invoices.

## Billing cycle

Shows usage for the current billing period:

| Field | Meaning |
|-------|---------|
| **Current due** | Amount owed so far this cycle, charged at cycle end |
| **Resources** | Number of active billable resources |
| **Cycle ends** | End date of the current billing period |

**Usage breakdown** lists charges by resource type, e.g. `VM Runtime · 10.69 hour · 1 resource · $0.14`.

Plan free allowances are also shown here as `used / included` counts. The Tiny deployment plan includes 3 free deployments; larger plans have no free allowance.

## Free usage

Shared across all workspaces. Tracks your free storage quota:

| Allowance | Limit |
|-----------|-------|
| **Buckets** | 10 GB free |
| **Build artifacts** | 5 GB free |

The progress bar shows percentage of free quota used. Usage updates as storage changes.

## Change password

Enter your current password, then a new password (minimum 12 characters) and confirm it. Click **Update password**.