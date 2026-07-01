---
id: ssh-keys
title: SSH Keys
sidebar_label: SSH Keys
---

# SSH Keys

SSH keys are injected into new virtual machines so you can open a shell without passwords. Manage them under **Settings → SSH Keys**.

## Add an SSH key

1. Enter a **Key name** (e.g. `MacBook Pro`, `Framework laptop`, `CI deploy key`)
2. Paste your **Public key** (e.g. `ssh-ed25519 AAAA...`)
3. Click **+ Add key**

The key is saved and available to select when creating a VM.

## Generate a key

If you don't have one yet, the platform shows the recommended command:

```bash
ssh-keygen -t ed25519 -C "rumpty"
```

Run this locally, then paste the contents of `~/.ssh/id_ed25519.pub` into the Public key field.

## Saved keys

The **Saved SSH Keys** panel lists all keys on your account:

| Field | Details |
|-------|---------|
| **Name** | The label you gave the key |
| **Fingerprint** | SHA256 fingerprint for verification |
| **Created** | Date and time the key was added |

## Delete a key

Click **Delete** next to a key. Deleting a key does not affect VMs that were already created with it — the key remains on those VMs. It only prevents the key from being injected into future VMs.