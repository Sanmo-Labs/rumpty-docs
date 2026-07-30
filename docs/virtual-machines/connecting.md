---
id: connecting
title: Connecting to Your VM
sidebar_label: Connecting
---

# Connecting to Your VM

VMs don't have a public IP by default. You can open a terminal in the browser, or connect through the **Rumpty CLI** rather than a plain `ssh` command.

## Browser console

The fastest way in: on the VM detail page, open the **Connect** tab and click **Launch console**. A terminal to the VM opens in a new browser tab; no keys or CLI needed. The VM must be running.

:::note
Browser console sessions are logged and disconnect after 15 minutes of inactivity. Use **Reconnect** to start a new session.
:::

## Install the Rumpty CLI

The **Connect** tab shows the install command:

<div className="rumpty-shell">
  <div className="rumpty-shell__bar" aria-hidden="true">
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__title">Rumpty CLI</span>
  </div>
  <pre><code>curl -fsSL https://get.rumptycloud.com | sh</code></pre>
</div>

Follow the **Other install options** link on the same tab for alternative install methods.

## Connect to a VM

<div className="rumpty-shell">
  <div className="rumpty-shell__bar" aria-hidden="true">
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__title">Rumpty CLI</span>
  </div>
  <pre><code>rumpty ssh &lt;vm-name&gt; --ws &lt;workspace-slug&gt;</code></pre>
</div>

The VM detail page shows this command with your VM name and workspace slug already filled in.

This opens a secure SSH session tunneled through the platform. No public IP or manual port-forwarding required.

Useful flags: `--user` to log in as a different guest user, and `-i`/`--identity` to point at a specific private key. You can also set the workspace once with `$RUMPTY_WORKSPACE` instead of passing `--ws` each time.

## Run commands and copy files

Besides interactive SSH, the CLI can run one-off commands and transfer files:

<div className="rumpty-shell">
  <div className="rumpty-shell__bar" aria-hidden="true">
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__title">Rumpty CLI</span>
  </div>
  <pre><code>rumpty exec &lt;vm-name&gt; -- uptime
rumpty copy ./app.tar.gz &lt;vm-name&gt;:/tmp/</code></pre>
</div>

`rumpty exec` runs a non-interactive command on the VM; always put the remote command after `--`. `rumpty copy` (alias `cp`) copies files to or from the VM using `vm:path` syntax; it uses rsync when available and falls back to scp.

## Finding your workspace slug and VM name

Both are shown on the VM detail page:

- The **VM name** is the title at the top of the page
- The **workspace slug** appears in the sample command shown under **Connect**. It is also visible in the browser URL as the `workspace` query parameter and in the workspace picker in the top navigation bar.

## Private IP access

If you need to reach the VM from another resource inside the same workspace (e.g. another VM), use its **private IP** shown on the VM detail page rather than going through the CLI tunnel.
