---
id: introduction
title: Billing
sidebar_label: Billing
slug: /billing/introduction
---

# Billing

Track current cycle usage, credits, invoices, and payment settings from one place. Go to **Others → Billing**.

RumptyCloud runs on prepaid credit: usage draws down from your cloud credit balance as resources run.

## Summary cards

| Card | Meaning |
|------|---------|
| **Current usage** | Prorated usage accrued in this billing cycle, with your current hourly rate |
| **Cloud credit** | Available credit balance. Usage is applied against credit first |
| **Wallet** | Add cloud credit to your account |

### Fund or redeem credit

- Click **+ Fund cloud credit**, choose an amount, and click **Continue to payment** to complete a secure checkout. You can save the card during checkout for faster top-ups later
- To redeem a promo, go to the **Wallet** tab, enter a **Promo code**, and click **Apply code**. You can hold one promo at a time; opting out forfeits any unspent promo credit

## Billing tabs

| Tab | What it covers |
|-----|----------------|
| **Overview** | Current cycle, running resources, usage breakdown, and free allowances |
| **Wallet** | Credit balance, saved cards, and promo credit |
| **History** | Past invoices (with PDF download) and payment history |
| **Settings** | Spend alerts and AI inference overage |

## Overview tab

### Current billing cycle

Shows when the cycle started, when it ends, and how many resources have usage recorded this cycle.

### What is running now

Lists active billable resources grouped by type and plan, with their hourly and monthly rates and how long they have run this cycle.

### Resource usage

Charges by resource type for the current billing period (e.g. `1 Jul 2026 - 6 Jul 2026`). Each row shows the usage quantity, unit, resource count, and amount (e.g. `11.34 hour across 1 resource`), and expands into per-resource lines. Resources deleted mid-cycle keep their accrued usage and are marked **removed**.

### Included usage

Free allowances active for this cycle, with used and remaining amounts. Resources covered by a free allowance are tagged **free tier** and accrue no charges.

## Wallet tab

- **Cloud credit** shows your available balance
- **Saved cards** lists cards stored for top-ups. Click **Add card** to save one; a small verification charge is made and refunded to your wallet. Cards are stored as a secure token, never the full card number. Your default card is marked, and cards can be removed at any time
- **Promo credit** shows your active promo with its remaining balance and expiry

## History tab

- **Invoices and payments** lists closed invoices with their billing period, amount, tax breakdown, and status. Click an invoice to download its PDF
- **Top-ups and charges** lists individual payments (wallet top-ups, card verifications, usage charges) with their amount and status

## How billing works

- Plan prices are set per resource. Usage accrues continuously: the amount due is prorated from how long each resource has existed in the cycle, and your current hourly rate is always visible
- Cloud credit is always applied first. When a cycle closes, an invoice is issued and charged against your credit balance
- If credit does not cover what you owe, an **Outstanding balance** banner appears on the Billing page. Add funds to your wallet, then click **Settle from wallet** to mark the invoices paid and clear your account
- Stopped VMs and idle databases are still billed. Delete resources you no longer need to stop charges
- The billing cycle end date is also shown in your profile under **Account → Billing cycle**
- Everything is billed in USD. Depending on your region, amounts may be displayed in your local currency; this is display only

## AI inference tokens

Every account includes a pool of free inference tokens per billing cycle. From the **Settings** tab, you can enable **Token overage** to keep using inference after the free pool is exhausted; overage is billed per million tokens and requires wallet credit. You can turn it off at any time.

:::note
Spend alerts are not available yet. When enabled, the Settings tab is where you will set wallet and usage notices.
:::
