---
id: introduction
title: Virtual Machines
sidebar_label: Introduction
slug: /virtual-machines/introduction
eyebrow: Compute
---

<p className="eyebrow">Compute</p>

# Virtual Machines

Virtual machines (VMs) give you an isolated Linux instance to run anything, from a quick test environment to a long-running service. Every VM joins your workspace’s private network and is reachable over SSH with the Rumpty CLI.

<div className="tiles tiles--4">
  <div className="tile"><span className="tile__label">Network</span><span className="tile__value">Private IP on your workspace network</span></div>
  <div className="tile"><span className="tile__label">Access</span><span className="tile__value">SSH as root through the Rumpty CLI</span></div>
  <div className="tile"><span className="tile__label">Public IP</span><span className="tile__value">Off by default</span></div>
  <div className="tile"><span className="tile__label">Find them</span><span className="tile__value">Compute → Virtual Machines</span></div>
</div>

## How it works

Each workspace is a logical grouping for your resources. When you create a VM, it:

- Gets a private IP on the workspace network, for example `10.16.0.0/16`
- Is assigned a guest hostname derived from the VM name
- Is provisioned with your OS image, SSH keys and compute plan
- Becomes ready for SSH access as root

<figure className="panel" aria-label="Example: three VMs on one workspace network">
  <div className="panel__head"><span className="panel__title">Workspace · acme</span><span className="panel__meta">10.16.0.0/16 · private</span></div>
  <div className="panel__row panel__row--live"><span className="dot"></span><span className="panel__name">web-1</span><span className="panel__ip">10.16.0.4</span><span className="panel__state">running</span></div>
  <div className="panel__row panel__row--live"><span className="dot"></span><span className="panel__name">worker-1</span><span className="panel__ip">10.16.0.5</span><span className="panel__state">running</span></div>
  <div className="panel__row panel__row--live"><span className="dot"></span><span className="panel__name">db-tools</span><span className="panel__ip">10.16.0.9</span><span className="panel__state">running</span></div>
  <div className="panel__foot"><span>$ rumpty ssh web-1 --ws acme</span><span>no public IP needed</span></div>
</figure>

:::note Note
VMs are not exposed over a public IP by default. Use `rumpty expose` when you want to share a service on a public URL.
:::

## Where to find your VMs

Go to Compute → Virtual Machines to see every VM in your workspace with its status, plan, image, network and creation date.

<div className="table table--mono">

| Name | Status | Plan | Image | Created |
| --- | --- | --- | --- | --- |
| web-1 | Running | 2 vCPU · 4 GB | Ubuntu 24.04 | 12 Sep 2026 |
| worker-1 | Running | 1 vCPU · 2 GB | Ubuntu 24.04 | 03 Sep 2026 |
| scratch | Stopped | Ephemeral | Debian 12 | 21 Sep 2026 |

</div>

## What's next?

<div className="cards">
  <a className="card" href="/virtual-machines/create-a-vm">
    <span className="card__title">Create a VM →</span>
    <span className="card__desc">Name, region, image, SSH key and a plan.</span>
  </a>
  <a className="card" href="/virtual-machines/connecting">
    <span className="card__title">Connect via SSH →</span>
    <span className="card__desc">Browser console or rumpty ssh from your terminal.</span>
  </a>
  <a className="card" href="/virtual-machines/plans">
    <span className="card__title">Compute plans →</span>
    <span className="card__desc">Pick the CPU and memory your workload needs.</span>
  </a>
  <a className="card" href="/virtual-machines/snapshots">
    <span className="card__title">Snapshots &amp; rebuilding →</span>
    <span className="card__desc">Save a point in time and rebuild from it.</span>
  </a>
</div>
