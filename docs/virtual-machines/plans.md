---
id: plans
title: Compute Plans
sidebar_label: Compute Plans
---

# Compute Plans

Choose a compute plan when creating a VM. Prices are per month; usage accrues prorated for the time the VM exists within the billing cycle.

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
- The VM and its root disk are **permanently deleted** on expiry; there is no recovery
- Only **one active ephemeral VM** is allowed per account at a time

## Changing plans

Plans cannot be changed in place. To move a workload to a different plan, take a [snapshot](./snapshots) of the VM, then create a new VM from that snapshot and select the new plan during creation.

## Choosing a plan

- **Launch / Micro**: light workloads, small services, dev/test environments
- **Core / Scale**: apps with steadier traffic or memory-heavier workloads

If you're unsure, start with **Micro**; it's inexpensive, and you can move to a larger plan later via a snapshot.
