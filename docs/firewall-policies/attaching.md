---
id: attaching
title: Attaching a Policy
sidebar_label: Attaching
---

# Attaching a Policy

Firewall policies are enforced only when attached to a resource. Policies can be attached to VMs and databases.

## Attach from a VM

1. Open the VM detail page
2. Go to the **Firewall** tab
3. Select a policy from the **Attach policy** dropdown
4. Click **Attach**

The policy's allow rules are enforced on that VM. The **Attached resources** count on the policy increments.

## Attach from a database

1. Open the database detail page
2. Go to the **Firewall** tab
3. Select a policy from the **Attach policy** dropdown
4. Click **Attach**

:::note
A resource can have more than one policy attached. The allow rules from all attached policies apply together.
:::

:::warning
Attaching a policy replaces all previously open ports with only what the policy allows. Make sure port 22 is included in your allow rules before attaching, or you will lose SSH (`rumpty ssh`) access.
:::

## Detach a policy

From the resource's **Firewall** tab, click **Detach** on the attached policy's card. When no policies remain attached, the resource reverts to its built-in network behavior.
