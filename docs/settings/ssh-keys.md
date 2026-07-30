---
id: ssh-keys
title: SSH Keys
sidebar_label: SSH Keys
---

# SSH Keys

SSH keys are injected into new virtual machines so you can open a shell without passwords. Keys are scoped to a workspace: manage them under **Settings → SSH keys** in the sidebar of the workspace they belong to. Adding and deleting keys requires a workspace role that can manage secrets.

## Add an SSH key

1. Enter a **Key name** (e.g. `MacBook Pro`, `Framework laptop`, `CI deploy key`)
2. Paste your **Public key** (e.g. `ssh-ed25519 AAAA...`)
3. Click **Add key**

The key is saved and available to select when creating a VM.

## Generate a key

If you don't have one yet, the platform shows the recommended command:

```bash
ssh-keygen -t ed25519 -C "rumpty"
```

Run this locally, then paste the contents of `~/.ssh/id_ed25519.pub` into the Public key field.

## Saved keys

The **Saved SSH keys** panel lists all keys in the workspace:

| Field | Details |
|-------|---------|
| **Name** | The label you gave the key |
| **Fingerprint** | Fingerprint of the public key, for verification |
| **Created** | Date and time the key was added |

## Delete a key

Click **Delete** next to a key. Deleting a key does not affect VMs that were already created with it; the key remains on those VMs. It only prevents the key from being injected into future VMs.