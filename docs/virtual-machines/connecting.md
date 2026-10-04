---
id: connecting
title: Connecting to your VM
sidebar_label: Connecting
eyebrow: Guide · Virtual Machines
---

<p className="eyebrow">Guide · Virtual Machines</p>

# Connecting to your VM

VMs don’t have a public IP by default. Open a terminal in the browser, or connect through the Rumpty CLI instead of a plain ssh command.

<div className="tiles tiles--2">
  <a className="tile" href="#browser-console"><span className="tile__label">Browser console</span><span className="tile__value">Fastest way in. No keys or CLI needed.</span></a>
  <a className="tile" href="#install-the-rumpty-cli"><span className="tile__label">Rumpty CLI</span><span className="tile__value">For everyday use, scripts and copying files.</span></a>
</div>

## Browser console

On the VM detail page, open the Connect tab and click Launch console. A terminal to the VM opens in a new browser tab. The VM must be running.

:::note Note
Browser console sessions are logged and disconnect after 15 minutes of inactivity. Use Reconnect to start a new session.
:::

## Install the Rumpty CLI

The Connect tab shows the install command:

```bash title="Terminal"
curl -fsSL https://get.rumptycloud.com | sh
```

Follow Other install options on the same tab for other ways to install. Sign-in and every other command are in the [Rumpty CLI](/cli/introduction) docs.

## Connect to a VM

```bash title="Terminal"
rumpty ssh <vm-name> --ws <workspace-slug>
```

This opens a secure SSH session tunnelled through the platform as root. No public IP or manual port-forwarding needed. The VM detail page shows this command with your VM name and workspace slug filled in.

<div className="table table--key table--mono">

| Option | Use it to |
| --- | --- |
| `--user` | Log in as a different guest user you’ve created |
| `-i, --identity` | Point at a specific private key |
| `$RUMPTY_WORKSPACE` | Set the workspace once instead of passing `--ws` |

</div>

## Run commands and copy files

```bash title="Terminal"
rumpty exec <vm-name> -- uptime
rumpty copy ./app.tar.gz <vm-name>:/tmp/
```

`rumpty exec` runs a non-interactive command, so always put the remote command after `--`. `rumpty copy` (alias `cp`) uses `vm:path` syntax, with rsync when it’s available and scp as a fallback.

## Finding your workspace slug

- The VM name is the title at the top of the VM detail page
- The workspace slug is in the sample command under Connect, in the URL as the `workspace` query parameter, and in the workspace picker

:::tip Private IP access
To reach the VM from another resource in the same workspace, like another VM, use its private IP from the VM detail page instead of the CLI tunnel.
:::
