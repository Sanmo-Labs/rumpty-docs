---
id: persistent-storage
title: Persistent Storage
sidebar_label: Persistent Storage
---

# Persistent Storage

By default, a deployment's filesystem is **ephemeral**: every deploy starts from a fresh container image, and anything your app wrote to disk since the last deploy is gone. That's intentional — it's what makes zero-downtime deploys, instant rollbacks, and clean rebuilds possible.

If your app needs files that survive deploys and restarts, you can attach a **persistent volume**: one directory, backed by replicated network storage, that is mounted into your container at a path you choose and reused across every deploy.

## Where should my data live?

Before reaching for a volume, check whether your data fits one of these better homes:

| Data | Best place |
|------|-----------|
| Structured records (users, orders, ...) | A [managed database](/databases/introduction) |
| User uploads, media, exports | An [object storage bucket](/buckets/introduction) |
| Cache, sessions | A managed Redis database |
| SQLite files, search indexes, app-managed state | A **persistent volume** |

Databases and buckets are replicated, backed up, and shared across instances. A volume is the right choice when a tool insists on a local filesystem — SQLite-based apps, search indexes, or software that manages its own data directory.

## Adding a volume

When creating a deployment, tick **Add persistent storage** and set:

- **Mount path** — an absolute path like `/data`. Your app should read and write everything it wants to keep under this directory. Mounting over system directories (`/`, `/etc`, `/usr`, ...) is rejected because the empty volume would hide the files your container needs to run.
- **Size (GiB)** — from 1 to 512 GiB.

For an existing deployment, go to **Settings → Persistent storage**. Changes are staged like environment variables: they take effect on the **next deploy** (a manual redeploy or a git push).

## Pricing

Volumes bill at **$0.05 per GiB per month** on provisioned size — the same rate as standalone block storage volumes. Billing is prorated to the second and starts with the first deploy that creates the volume. Because the volume keeps holding your data even when the app is stopped or failed, it bills for as long as it exists; deleting the deployment deletes the volume and stops the charge.

The console shows the monthly storage cost next to the size field when you configure a volume.

## Trade-offs

Attaching a volume changes how your deployment behaves:

- **Deploys briefly stop the app.** A volume can only be attached to one container at a time, so the platform stops the old version before starting the new one. Stateless deployments start the new version first and switch traffic over with zero downtime.
- **Single instance.** A deployment with a volume always runs exactly one instance.
- **Size only grows.** You can increase the size at any time (applied on the next deploy), but volumes can never shrink.
- **The volume can't be removed** once created — it holds your data. Deleting the deployment deletes its volume along with it.
- **Only the mount path persists.** Files written anywhere else on the filesystem still disappear on every deploy.

## Example

A deployment running a SQLite-backed app with the volume mounted at `/data`:

```js
// The database file lives on the volume and survives every deploy.
const db = new Database("/data/app.db");
```

Anything under `/data` persists. The app's code, temp files, and everything else are replaced fresh on each deploy — which is exactly what you want.
