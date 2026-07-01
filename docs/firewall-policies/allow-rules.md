---
id: allow-rules
title: Allow Rules
sidebar_label: Allow Rules
---

# Allow Rules

Open a policy by clicking its name in the table. The policy detail page has two panels: **Add allow rule** on the left and **Allow rules** on the right.

## Enforcement

Every policy enforces **Default Inbound deny** — traffic that doesn't match an allow rule is blocked. Outbound filtering is not enforced yet.

## Default rules

New policies include two default allow rules:

| Direction | Protocol | Port | Source | Description |
|-----------|----------|------|--------|-------------|
| INBOUND | TCP | 22 | 0.0.0.0/0 | Allow SSH access. Required for `rumpty ssh` and CLI connectivity. |
| INBOUND | TCP | 8080 | 0.0.0.0/0 | Allow HTTP traffic on the default app port used by all RumptyCloud VMs. |

## Add an allow rule

Fill in the **Add allow rule** form:

| Field | Details |
|-------|---------|
| **Direction** | Inbound (outbound not yet enforced) |
| **Protocol** | TCP, UDP, or ICMP |
| **Port start** | Starting port, e.g. `22` |
| **Port end** | Ending port for a range — leave blank for single port |
| **CIDR** | Source IP range, e.g. `0.0.0.0/0` for any, or `192.168.1.0/24` for a subnet |
| **Description** | Optional label for the rule |

Click **+ Add allow rule**.

## Edit or delete a rule

Each rule in the Allow rules table has **Edit** and **Delete** actions on the right.

## Attached resources

The **Attached resources** panel shows which VMs or databases this policy is currently enforcing rules on. If empty, the policy exists but is not active anywhere — attach it from the VM's Firewall tab.