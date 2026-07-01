---
id: firewall
title: Firewall
sidebar_label: Firewall
---

# Firewall

The Firewall tab on a VM lets you attach or detach a firewall policy to control what inbound traffic is allowed.

## Attach a policy

1. Open the VM detail page → **Firewall** tab
2. Select a policy from the **Attach policy** dropdown
3. Click **Attach**

The policy's allow rules are enforced immediately. If no policy is attached, the message "No firewall policies are attached to this VM" is shown.

:::warning
Attaching a policy activates default inbound deny — only traffic matching allow rules gets through. Confirm port 22 is included in the policy before attaching or you will lose `rumpty ssh` access.
:::

## Detach a policy

Click **Detach** next to the active policy. Traffic reverts to the workspace default behaviour.

## Manage policies

Click **View policies** to go to the Firewall Policies section where you can create policies and manage rules.

For full details see [Firewall Policies](/firewall-policies/introduction).