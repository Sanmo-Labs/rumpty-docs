---
id: connecting
title: Connecting to Your VM
sidebar_label: Connecting
---

# Connecting to Your VM

VMs don't have a public IP by default, so you connect through the **Rumpty CLI** rather than a plain `ssh` command.

## Install the Rumpty CLI

From the VM detail page, click **Get the Rumpty CLI** under the **Connect** tab, and follow the install instructions for your OS.

## Connect to a VM

<div className="rumpty-shell">
  <div className="rumpty-shell__bar" aria-hidden="true">
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__title">Rumpty CLI</span>
  </div>
  <pre><code>rumpty ssh &lt;vm-name&gt; --ws &lt;workspace-id&gt;</code></pre>
</div>

For example:

```bash
rumpty ssh created --ws qa-testing-019ef102
```

This opens a secure SSH session tunneled through the platform — no public IP or manual port-forwarding required.

## Finding your workspace ID and VM name

Both are shown on the VM detail page:

- The **VM name** is the title at the top of the page
- The **workspace ID** appears in the sample command shown under **Connect**, and can also be copied from the workspace switcher in the top navigation bar

## Private IP access

If you need to reach the VM from another resource inside the same workspace (e.g. another VM or a Kubernetes pod), use its **private IP** shown on the VM detail page rather than going through the CLI tunnel.
