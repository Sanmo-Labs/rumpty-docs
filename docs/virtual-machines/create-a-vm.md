---
id: create-a-vm
title: Create a VM
sidebar_label: Create a VM
eyebrow: Guide · 10 steps · about 5 min
---

<p className="eyebrow">Guide · 10 steps · about 5 min</p>

# Create a VM

Create a VM from the console in a few minutes. You’ll name it, pick a region and an OS image, add your SSH key and choose a compute plan.

:::note Note
The first time you create a VM you are asked to accept the Acceptable Use Policy.
:::

## Steps

<ol className="dsteps">
  <li><div><h3>Open Create VM</h3><p>Go to Compute → Virtual Machines, then click Create VM.</p><span className="ui">Compute → Virtual Machines → Create VM</span></div></li>
  <li><div><h3>Name your VM</h3><p>Give it a short name you’ll recognise in the list and in the CLI.</p><span className="ui">web-1</span></div></li>
  <li><div><h3>Select a region</h3><p>Choose the data center nearest to you or your users to minimize latency.</p></div></li>
  <li><div><h3>Pick an OS</h3><p>Choose an image and a specific version.</p><span className="ui">Ubuntu 24.04</span></div></li>
  <li><div><h3>Networking</h3><p>Nothing to set. Your VM automatically joins the workspace’s default private network.</p></div></li>
  <li><div><h3>SSH keys</h3><p>Select an existing key, or click Add New Key to upload one.</p><span className="ui">Add New Key</span></div></li>
  <li><div><h3>Storage <span className="opt">Optional</span></h3><p>Select or create volumes to attach to the VM.</p></div></li>
  <li><div><h3>Startup script <span className="opt">Optional</span></h3><p>Add packages or a script to run when the VM first boots.</p></div></li>
  <li><div><h3>Select compute</h3><p>Choose a plan for the CPU and memory you need. See <a href="/virtual-machines/plans">Compute plans</a>.</p></div></li>
  <li><div><h3>Review and create</h3><p>Check the payment summary, then click Create VM.</p><span className="ui">Create VM</span></div></li>
</ol>

## Provisioning

Once you click Create VM, a live progress panel shows each step until your VM is ready.

<figure className="panel panel--prov" aria-label="Example: provisioning progress">
  <div className="panel__head"><span className="panel__title panel__title--mono">web-1 · provisioning</span><span className="panel__meta">5 / 8</span></div>
  <div className="panel__bar" role="progressbar" aria-label="Provisioning progress" aria-valuemin={0} aria-valuemax={8} aria-valuenow={4}><span style={{width: '56%'}}></span></div>
  <ol className="prov">
    <li className="is-done"><span className="dot"></span><span>Preparing your VM</span><span>done</span></li>
    <li className="is-done"><span className="dot"></span><span>Preparing your workspace environment</span><span>done</span></li>
    <li className="is-done"><span className="dot"></span><span>Preparing the VM disk</span><span>done</span></li>
    <li className="is-done"><span className="dot"></span><span>Configuring secure access</span><span>done</span></li>
    <li className="is-now"><span className="dot"></span><span>Starting the VM</span><span>in progress</span></li>
    <li className="is-wait"><span className="dot"></span><span>Waiting for network readiness</span><span>waiting</span></li>
    <li className="is-wait"><span className="dot"></span><span>Waiting for VM access</span><span>waiting</span></li>
    <li className="is-wait"><span className="dot"></span><span>Virtual machine is ready</span><span>waiting</span></li>
  </ol>
</figure>

The VM’s status badge switches to `running` once provisioning finishes.

## After creation

The VM detail page shows everything about your new VM:

- Status and specs: CPU, memory, disk, image and private IP
- Tabs for [Connect](/virtual-machines/connecting), [Metrics](/virtual-machines/metrics), [Snapshots](/virtual-machines/snapshots), [Firewall](/virtual-machines/firewall), [Deploy](/virtual-machines/deploy) and [Settings](/virtual-machines/settings)
- Start, Stop and Reboot in the header. Destroying a VM is in the Settings tab

:::warning Free trial: Ephemeral plan
Runs for up to 3 days, then automatically expires. On expiry, the VM and its root disk are permanently deleted. You can have one active Ephemeral VM at a time.
:::
