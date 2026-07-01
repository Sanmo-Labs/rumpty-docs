---
id: attaching
title: Attaching a Policy
sidebar_label: Attaching
---

# Attaching a Policy to a VM

Firewall policies are enforced only when attached to a resource.

## Attach from a VM

1. Open the VM detail page
2. Go to the **Firewall** tab
3. Select a policy from the **Attach policy** dropdown
4. Click **Attach**

The policy's allow rules are immediately enforced on that VM. The **Attached resources** count on the policy increments.

:::warning
Attaching a policy replaces all previously open ports with only what the policy allows. Make sure port 22 is included in your allow rules before attaching, or you will lose SSH (`rumpty ssh`) access.
:::

## Detach a policy

From the VM's **Firewall** tab, click **Detach** next to the active policy. Traffic reverts to the workspace default.