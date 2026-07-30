---
id: plans
title: Compute Plans
sidebar_label: Compute Plans
---

# Compute Plans

Choose a compute plan when creating a VM. Pricing is per month, billed hourly and prorated.

| Plan | Price | vCPU | Memory | Storage | Bandwidth |
|------|-------|------|--------|---------|-----------|
| **Ephemeral Trial** | Free | 1 vCPU | 512 MB | 5 GB SSD | Down 50 Mbps / Up 50 Mbps |
| **Launch** | $1.55/mo | 1 vCPU | 512 MB | 10 GB SSD | Down 100 Mbps / Up 100 Mbps |
| **Micro** | $2.70/mo | 1 vCPU | 1 GB | 20 GB SSD | Down 100 Mbps / Up 100 Mbps |
| **Core** | $4.60/mo | 1 vCPU | 2 GB | 30 GB SSD | Down 250 Mbps / Up 250 Mbps |
| **Scale** | $6.15/mo | 2 vCPU | 2 GB | 50 GB SSD | Down 500 Mbps / Up 500 Mbps |

## Ephemeral Trial details

The **Ephemeral Trial** plan is meant for quick testing, not production workloads:

- Free, but time-limited to **3 days**
- VM is **permanently deleted** on expiry; there is no recovery
- Only **one active ephemeral VM** is allowed per account at a time

## Resizing

You can move to a larger plan later from the VM's **Settings** tab. Resizing requires a restart.

## Choosing a plan

- **Launch / Micro**: light workloads, small services, dev/test environments
- **Core / Scale**: apps with steadier traffic or memory-heavier workloads

If you're unsure, start with **Micro**; it's inexpensive and easy to resize up later.
