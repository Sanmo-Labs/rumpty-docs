---
id: metrics
title: Metrics
sidebar_label: Metrics
---

# Metrics

The Metrics tab shows live resource usage charts for your VM. Select a time window using the controls in the top right: **15M**, **1H**, **6H**, **24H**, or **7D**.

## Charts

**CPU**
Percentage of vCPU utilisation over the selected period. Sustained high CPU may indicate your workload needs a larger plan.

**Memory**
RAM usage as a percentage of the plan's total. For example, 28.3% on a 512 MB plan means roughly 145 MB in use.

**Disk Usage**
Root disk utilisation percentage. This reflects the VM's root disk only; attached volumes report separately once the rumpty agent is running.

**Bandwidth**
Inbound and outbound network throughput in B/s, shown as two separate series (In / Out). Useful for spotting traffic spikes or unexpected egress.

:::info
Metrics require the rumpty agent to be running on the VM. If charts appear empty, confirm the agent is active.
:::