---
id: vm
title: Manage VMs
sidebar_label: VM
---

# Manage VMs

`rumpty vm` (alias `vms`) lists and manages the virtual machines in your workspace from the terminal.

## List VMs

```bash
rumpty vm ls
rumpty vm ls --ws production-team-019e2b95
```

## Lifecycle commands

| Command | What it does |
|---------|--------------|
| `rumpty vm start <vm>` | Start a stopped VM |
| `rumpty vm stop <vm>` | Stop a running VM |
| `rumpty vm reboot <vm>` | Reboot a VM |
| `rumpty vm delete <vm>` | Delete a VM |

```bash
rumpty vm stop test-vm7 --ws production-team-019e2b95
rumpty vm start test-vm7
rumpty vm reboot test-vm7
```

:::warning
`vm delete` removes the VM. Deleted VMs cannot be brought back.
:::

## Exposed services

List the public URLs a VM has from [Expose a VM Service](./expose):

```bash
rumpty vm expose ls test-vm8 --ws production-team-019e2b95
```

## Requirements

- A signed-in session (`rumpty login`) or the `RUMPTY_API_KEY` environment variable. See [Login & Logout](./login).
- A workspace: the `--ws` flag or `$RUMPTY_WORKSPACE`. The examples without `--ws` assume `RUMPTY_WORKSPACE` is set.
