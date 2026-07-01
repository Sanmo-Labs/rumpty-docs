---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

# Quick Start

Get your first app running in under 5 minutes.

## Deploy from GitHub

1. Go to **Deployments → New Deployment**
2. Choose **GitHub** as the source
3. Authorise the platform to access your GitHub account
4. Select your repository and branch
5. Configure build settings (or let us auto-detect them)
6. Click **Deploy**

Future pushes to your selected branch will trigger deployments automatically.

## Deploy a packaged project

1. Go to **Deployments → New Deployment → Manual Upload**
2. Upload your package or provide a Docker image URL
3. Set any environment variables
4. Click **Deploy**

## Launch a virtual machine

1. Go to **Compute → Virtual Machines → Create VM**
2. Choose an OS image, plan, and region
3. Attach your SSH key
4. Click **Create VM**

Connect using the [Rumpty CLI](/virtual-machines/connecting) once it's ready:

```bash
rumpty ssh <vm-name> --ws <workspace-id>
```

## What's next?

- [Set up a database](/databases/introduction)
- [Attach persistent storage](/volumes/introduction)
- [Configure your firewall](/firewall-policies/introduction)
- [Monitor usage and billing](/billing/introduction)
