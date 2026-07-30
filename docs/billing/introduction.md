---
id: introduction
title: Billing
sidebar_label: Billing
slug: /billing/introduction
---

# Billing

Track current cycle usage, credits, invoices, and payment settings from one place. Go to **Others → Billing**.

## Summary cards

| Card | Meaning |
|------|---------|
| **Current cycle due** | Usage for this billing cycle before credits are applied |
| **Cloud credit** | Available credit balance. Credits are applied first before charging your card |
| **Wallet** | Fund your account with cloud credit or apply a credit code |

### Fund or redeem credit

- Click **+ Fund cloud credit** to add credit to your account via card
- Enter a **credit code** and click **Apply code** to redeem a promo or referral credit

## Billing tabs

| Tab | What it covers |
|-----|----------------|
| **Overview** | Resource usage breakdown and payment coverage for the current cycle |
| **Cards** | Manage payment cards |
| **History** | Past invoices and billing history |
| **Settings** | Billing notifications and preferences |

## Overview tab

### Resource usage breakdown

Lists charges by resource type for the current billing period (e.g. `1 Jul 2026 – 6 Jul 2026`):

| Resource | Example |
|----------|---------|
| **VM Runtime** | `11.34 hour across 1 resource · $0.15` |
| **Deployments** | Per compute unit per hour |
| **Volumes** | Per GB per month, prorated hourly |
| **Databases** | Per hour based on plan |

### Payment coverage

Shows how the current amount due will be settled:

| Line | Meaning |
|------|---------|
| **Usage due** | Total usage charges this cycle |
| **Cloud credit** | Credit applied (reduces the card charge) |
| **Card charge** | Amount that will be charged to your default card |

Cloud credit is always applied first. Any remainder is charged to the default card at the end of the billing cycle.

## How billing works

- All resources are billed **hourly** and invoiced at the end of each cycle
- Stopped VMs and idle databases are still billed. Delete resources you no longer need to stop charges
- The billing cycle end date is shown in your profile under **Account → Billing cycle**
- Estimates shown when creating a resource reflect the monthly equivalent of the hourly rate