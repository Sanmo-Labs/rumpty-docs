---
id: introduction
title: Firewall Policies
sidebar_label: Introduction
slug: /firewall-policies/introduction
---

# Firewall Policies

Workspace-scoped network access rules. Create a policy, add allow rules to it, then attach it to VMs or databases to enforce those rules.

## How it works

- All inbound traffic is **blocked by default** (default inbound deny)
- You add **allow rules** to a policy to permit specific traffic
- A policy must be **attached to a resource** (VM or database) to take effect
- Outbound filtering is not enforced yet

## Dashboard stats

| Stat | Meaning |
|------|---------|
| **Policies** | Total policies in the workspace |
| **Rules** | Total allow rules across all policies |
| **Attached** | Number of resources with a policy attached |

## Policy table columns

| Column | Meaning |
|--------|---------|
| **Policy** | Name and description |
| **Rules** | Number of allow rules on the policy |
| **Attached** | Number of resources using this policy |
| **Default** | Whether this is the workspace default policy |

## What's next

- [Create a policy](./create-a-policy)
- [Add allow rules](./allow-rules)
- [Attach to a VM or database](./attaching)