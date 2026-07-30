---
id: firewall
title: Firewall
sidebar_label: Firewall
---

# Firewall

The Firewall tab on a VM lets you attach or detach firewall policies to control what traffic is allowed. A VM can have multiple policies attached at once.

## Attach a policy

1. Open the VM detail page → **Firewall** tab
2. Select a policy from the **Attach policy** dropdown
3. Click **Attach**

The policy's allow rules are enforced once the policy is applied. If no policy is attached, the message "No firewall policies are attached to this VM." is shown.

:::warning
Attaching a policy with inbound rules activates default inbound deny: only traffic matching allow rules gets through. Confirm port 22 is included in the policy before attaching or you will lose `rumpty ssh` access.
:::

## Detach a policy

Click **Detach** on a policy's card. Once no policies remain attached, the VM's traffic is no longer filtered.

## Manage policies

Click a policy card to open it in the Firewall Policies section, or use **View policies** to browse all policies, create new ones, and manage rules.

For full details see [Firewall Policies](/firewall-policies/introduction).
