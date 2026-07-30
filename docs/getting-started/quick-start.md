---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

# Quick Start

Get your first app running in under 5 minutes.

## Launch a virtual machine

1. Go to **Compute → Virtual Machines → Create VM**
2. Name the VM and select a region
3. Choose an OS image and version, then a plan
4. Attach your SSH key
5. Click **Create VM**

Connect using the [Rumpty CLI](/virtual-machines/connecting) once it's ready:

<div className="rumpty-shell">
  <div className="rumpty-shell__bar" aria-hidden="true">
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__dot"></span>
    <span className="rumpty-shell__title">Rumpty CLI</span>
  </div>
  <pre><code>rumpty ssh &lt;vm-name&gt; --ws &lt;workspace-id&gt;</code></pre>
</div>

## Deploy from GitHub

1. Go to **Compute → Deployments → New deployment**
2. If GitHub isn't connected yet, click **Install GitHub App** and choose which repositories to share; you return to the form afterwards
3. Select your repository and branch
4. Build settings are auto-detected; adjust the port and environment variables if needed
5. Choose a plan and click **Create deployment**

Future pushes to your selected branch will trigger deployments automatically.

## Launch a one-click app

1. Go to **Compute → One-Click Apps**
2. Pick a template (e.g. WordPress)
3. Fill in the deploy form and click **Deploy**

## What's next?

- [Set up a database](/databases/introduction)
- [Attach persistent storage](/volumes/introduction)
- [Configure your firewall](/firewall-policies/introduction)
- [Monitor usage and billing](/billing/introduction)
