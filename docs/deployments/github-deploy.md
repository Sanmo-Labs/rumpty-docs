---
id: github-deploy
title: GitHub Deployment
sidebar_label: GitHub Deploy
---

# GitHub Deployment

Connect your GitHub account to create deployments from your repositories and get automatic deploys on every push.

## Connect GitHub

1. Go to **Settings → GitHub**
2. Click **Connect GitHub App**
3. You'll be redirected to GitHub to authorise the app. You can grant access to all repositories or only selected ones

Repositories exposed to the app are visible to every workspace member who can create deployments, so prefer **Only select repositories** when installing.

If you haven't connected yet, the **New deployment** form also offers the connect flow inline via **Install GitHub App**.

## Create a GitHub deployment

1. Go to **Compute → Deployments → New deployment**
2. Choose your repository and branch. The platform inspects the repo and pre-selects an application type and build method for you
3. Review the settings: application type, build method (Auto or Dockerfile), readiness path, [port](./ports), and environment variables
4. **Auto deploy** is enabled by default. Every push to the selected branch will trigger a new deployment
5. Click **Create deployment**

See [Create a Deployment](./create-a-deployment) for what each field means.

## Auto-deploy on push

With auto-deploy enabled, every push to the selected branch builds and deploys automatically. Each deployment run records what triggered it, so you can tell push-triggered runs from manual ones.

To turn it off later: open the deployment → **Settings** tab → toggle **Auto deploy** off and save.

## Environment variables

Manage variables under the deployment's **Env** tab. Values are stored encrypted and treated as secrets; the API never echoes them back. Variables you add are injected at **runtime**; they are deliberately kept out of the build so secret values can't leak into the built image.

## Build logs

Open the deployment → **Runs** tab and select a run to see its full build log. Logs stream live while a build is in progress.

## Rollback

Successful builds keep their image artifact (listed under the **Artifacts** tab), which makes rollback instant, with no rebuild:

- A **Rollback** button appears on the deployment page whenever a previous build's artifact is available. It redeploys that image as-is.
- You can also open the **Artifacts** tab and deploy any stored build directly. A run that is already serving the current version can't be deployed again.

## Runtime logs

The **Runtime Logs** tab streams live logs from your running app. Use it to see your app's startup output and errors after a deployment goes live.

## Custom domains

Open the deployment's **Settings** tab to manage **Custom domains**:

1. Add your domain. Use a subdomain such as `www.example.com`; root domains are not supported yet
2. Add the CNAME and TXT records shown to your DNS provider
3. Click **Verify**. The domain goes live once routing is ready

## Security scans

Every successful build is scanned automatically. The **Security** tab shows the latest report with findings grouped by severity, and each run's detail page links to its scan result.
