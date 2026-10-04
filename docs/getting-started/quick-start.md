---
id: quick-start
title: Quick start
sidebar_label: Quick start
eyebrow: Guide · about 5 min
---

<p className="eyebrow">Guide · about 5 min</p>

# Quick start

Get your first app running in under 5 minutes. Pick one of the three paths below.

## Launch a virtual machine

1. Go to Compute → Virtual Machines → Create VM
2. Name the VM and select a region
3. Choose an OS image and version, then a plan
4. Attach your SSH key
5. Click Create VM

Connect using the Rumpty CLI once it’s ready:

```bash title="Terminal"
rumpty ssh <vm-name> --ws <workspace-id>
```

The full walkthrough is in [Create a VM](/virtual-machines/create-a-vm).

## Deploy from GitHub

1. Go to Compute → Deployments → New deployment
2. If GitHub isn’t connected yet, click Install GitHub App and choose which repositories to share. You come back to the form afterwards.
3. Select your repository and branch
4. Build settings are auto-detected. Adjust the port and environment variables if needed.
5. Choose a plan and click Create deployment

:::tip Auto deploy
Future pushes to your selected branch trigger deployments automatically.
:::

## Launch a one-click app

1. Go to Compute → One-Click Apps
2. Pick a template, for example WordPress
3. Fill in the deploy form and click Deploy

## What’s next?

<div className="cards">
  <a className="card" href="/databases/create-a-database">
    <span className="card__title">Set up a database →</span>
    <span className="card__desc">Create a managed Postgres database.</span>
  </a>
  <a className="card" href="/volumes/attach-and-mount">
    <span className="card__title">Attach persistent storage →</span>
    <span className="card__desc">Add a volume to a VM and mount it.</span>
  </a>
  <a className="card" href="/firewall-policies/allow-rules">
    <span className="card__title">Configure your firewall →</span>
    <span className="card__desc">Allow only the ports you need.</span>
  </a>
  <a className="card" href="/billing/introduction">
    <span className="card__title">Monitor usage and billing →</span>
    <span className="card__desc">See what you’re using and what it costs.</span>
  </a>
</div>
