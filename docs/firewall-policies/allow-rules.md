---
id: allow-rules
title: Allow Rules
sidebar_label: Allow Rules
---

# Allow Rules

Open a policy by clicking its name in the table. The policy detail page has two panels: **Add allow rule** on the left and **Allow rules** on the right.

## Enforcement

Every policy enforces **Default inbound deny**: traffic that doesn't match an allow rule is blocked. Outbound filtering is not enforced yet.

## Default rules

New policies include two default allow rules:

| Direction | Protocol | Port | Source | Description |
|-----------|----------|------|--------|-------------|
| INBOUND | TCP | 22 | 0.0.0.0/0 | Allow SSH access. Required for `rumpty vm ssh` and CLI connectivity. |
| INBOUND | TCP | 8080 | 0.0.0.0/0 | Allow HTTP traffic on the default app port used by RumptyCloud VMs. |

Default rules are marked with a **Default** badge and cannot be edited. They can be deleted; the confirmation dialog warns you what traffic will be blocked. Deleting the port 22 default blocks SSH access to attached VMs.

## Add an allow rule

Fill in the **Add allow rule** form:

| Field | Details |
|-------|---------|
| **Direction** | Inbound (outbound not yet enforced) |
| **Protocol** | TCP, UDP, or All |
| **Port start** | Starting port, e.g. `22`. Leave blank to match all ports |
| **Port end** | Ending port for a range; leave blank for single port |
| **CIDR** | Source IP range, e.g. `0.0.0.0/0` for any, or `192.168.1.0/24` for a subnet. Shown in the **Source** column of the rules table |
| **Description** | Optional label for the rule |

Click **+ Add allow rule**.

## Edit or delete a rule

Each rule in the Allow rules table has **Edit** and **Delete** actions on the right. **Edit** loads the rule into the form on the left; click **Save rule** to apply your changes. **Delete** asks for confirmation and shows the rule's protocol, port, and source. Default rules cannot be edited.

## Attached resources

The **Attached resources** panel shows which VMs or databases this policy is currently enforcing rules on, with each resource's type and status. If empty, the policy exists but is not active anywhere. Attach it from the resource's Firewall tab.