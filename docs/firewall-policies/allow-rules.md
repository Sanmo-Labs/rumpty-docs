---
id: allow-rules
title: Allow Rules
sidebar_label: Allow Rules
---

# Allow Rules

Open a policy by clicking its name in the table. The policy detail page has two panels: **Add allow rule** on the left and **Allow rules** on the right.

## Enforcement

While a policy is attached to a resource, it enforces **default inbound deny**: traffic that doesn't match an allow rule is blocked. This includes a policy whose rules have all been deleted — an attached policy with zero allow rules blocks **all** inbound traffic. Enforcement stops only when the policy is detached. Outbound filtering is not enforced yet.

## Default rules

New policies include two default allow rules:

| Direction | Protocol | Port | Source | Description |
|-----------|----------|------|--------|-------------|
| INBOUND | TCP | 22 | 0.0.0.0/0 | Allow SSH access. Required for `rumpty ssh` and CLI connectivity. |
| INBOUND | TCP | 8080 | 0.0.0.0/0 | Allow HTTP traffic on the default app port used by RumptyCloud VMs. |

Default rules are marked with a **Default** badge and cannot be edited. They can be deleted; the confirmation dialog warns you what traffic will be blocked. Deleting the port 22 default blocks SSH access to attached VMs.

## Add an allow rule

Fill in the **Add allow rule** form:

| Field | Details |
|-------|---------|
| **Direction** | Inbound (outbound not yet enforced) |
| **Protocol** | TCP, UDP, or All. Selecting All matches every port, so the port field is hidden |
| **Port(s)** | A single port like `22`, or a range like `8000-9000`. Leave blank to match all ports. Preset buttons below the field fill in common services (SSH, HTTP, HTTPS, Postgres, MySQL, Redis) |
| **Source (CIDR)** | Which IPs are allowed to connect, e.g. `0.0.0.0/0` for anywhere, or `192.168.1.0/24` for a subnet. Shown in the **Source** column of the rules table |
| **Description** | Optional label for the rule |

Click **+ Add allow rule**.

:::tip Allowing another RumptyCloud resource
If the client is another resource in your workspace — for example a VM that should be the only thing allowed to reach your database — use that resource's **private IP** with a `/32` suffix as the source, e.g. `10.42.0.7/32`. Traffic between workspace resources travels over the private network with its real source address, so narrow CIDRs work exactly as expected.
:::

:::info Where source CIDRs are enforced
Source CIDRs are enforced against the client's real IP address for **SSH** and **database** connections from the internet, and for all traffic between resources inside your workspace. So a rule like `TCP 22 from 203.0.113.9/32` allows SSH only from that address — connections from anywhere else are dropped at the edge.

**HTTP(S) app traffic does not honor source CIDRs yet.** For web apps and deployments, use `0.0.0.0/0` on HTTP ports; per-IP restrictions for HTTP are coming.
:::

## Edit or delete a rule

Each rule in the Allow rules table has **Edit** and **Delete** actions on the right. **Edit** loads the rule into the form on the left; click **Save rule** to apply your changes. **Delete** asks for confirmation and shows the rule's protocol, port, and source. Default rules cannot be edited.

## Attached resources

The **Attached resources** panel shows which VMs or databases this policy is currently enforcing rules on, with each resource's type and status. If empty, the policy exists but is not active anywhere. Click **Attach resource** to pick a VM or database from your workspace, or attach from the resource's Firewall tab — both do the same thing. Each attached row has a **Detach** action, which stops enforcement on that resource after confirmation.