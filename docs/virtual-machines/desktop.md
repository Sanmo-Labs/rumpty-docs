---
id: desktop
title: Cloud Desktops
sidebar_label: Cloud Desktops
eyebrow: Guide · Virtual Machines
---

<p className="eyebrow">Guide · Virtual Machines</p>

# Cloud Desktops

A Cloud Desktop is a VM running a full Linux desktop that you use straight from your browser. Nothing to install: create the VM, open the desktop, and get to work.

<div className="tiles tiles--2">
  <a className="tile" href="#create-a-desktop"><span className="tile__label">Create a desktop</span><span className="tile__value">Pick the desktop image and a Scale plan or bigger.</span></a>
  <a className="tile" href="#copy-and-paste"><span className="tile__label">Copy and paste</span><span className="tile__value">Paste from your computer and use Mac shortcuts.</span></a>
</div>

## What you get

- Ubuntu 26.04 LTS with the XFCE desktop
- Firefox, a terminal and a text editor, ready to use
- Logged in as root, so you can install anything with `apt install <package>`
- Everything a normal VM has: SSH through the [Rumpty CLI](/virtual-machines/connecting), snapshots, firewall, metrics and private networking

## Create a desktop

<ol className="dsteps">
  <li><div><h3>Open Create VM</h3><p>Go to Compute → Virtual Machines, then click Create VM.</p><span className="ui">Compute → Virtual Machines → Create VM</span></div></li>
  <li><div><h3>Pick the desktop image</h3><p>Choose Ubuntu, then the desktop version.</p><span className="ui">Ubuntu 26.04 Desktop</span></div></li>
  <li><div><h3>Choose a plan</h3><p>A desktop needs at least 2 vCPU and 2 GB of memory, so only Scale and bigger plans are shown. See <a href="/virtual-machines/plans">Compute plans</a>.</p><span className="ui">Scale</span></div></li>
  <li><div><h3>Create the VM</h3><p>Fill in the rest as for any VM, then click Create VM. It’s ready in about a minute.</p><span className="ui">Create VM</span></div></li>
  <li><div><h3>Open the desktop</h3><p>On the VM detail page, open the Connect tab and click Open desktop. The desktop opens in a new browser tab. The VM must be running.</p><span className="ui">Connect → Open desktop</span></div></li>
</ol>

Click Fullscreen in the toolbar above the desktop for the most room. Press Esc to leave fullscreen.

## Copy and paste

<div className="table table--key">

| To | Do this |
| --- | --- |
| Paste text from your computer into the desktop | Click where the text should go, then click Paste in the toolbar |
| Copy and paste inside the desktop | Ctrl+C / Ctrl+V. On a Mac, Cmd+C / Cmd+V work too |
| Copy and paste in the desktop’s terminal | Ctrl+Shift+C / Ctrl+Shift+V |

</div>

Paste works by typing the text into the desktop, so very long text takes a few seconds and only plain text is supported. If your browser blocks clipboard access, a box opens where you can paste the text instead.

:::note Note
Copying text from the desktop back to your own computer isn’t supported yet.
:::

## Sessions

- Desktop sessions are logged and disconnect after 30 minutes without keyboard or mouse input. Use Reconnect to start a new session; your apps keep running
- You can have up to 2 desktop sessions open at a time
- Closing the browser tab only closes the session. The VM keeps running and is billed until you stop or destroy it

## Good to know

- There’s no sound, and video plays at a low frame rate. Cloud Desktops are best for development, testing, browsing and running tools
- The desktop runs on the VM’s own CPU and memory. For heavier apps or several browser tabs, pick a bigger plan
- A desktop VM is a normal VM, so you can also [connect over SSH](/virtual-machines/connecting) or run commands with `rumpty exec`
