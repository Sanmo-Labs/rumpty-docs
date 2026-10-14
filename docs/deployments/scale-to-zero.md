---
id: scale-to-zero
title: Scale to Zero
sidebar_label: Scale to Zero
---

# Scale to Zero

The **Free** plan (first 3 apps) always scales an idle app down to **zero replicas**. Paid plans can opt into the same behavior. When nobody is hitting the URL, RumptyCloud stops the container to save resources. The next request wakes it again.

## What browsers see

Opening the app URL while it is asleep shows a short **RumptyCloud wake page** (“Waking your app…”) that refreshes automatically. When the container is ready, the real app loads.

Cold starts usually take a few seconds, depending on image size and startup time.

## API clients and scripts

During wake, HTTP clients may receive a **`503`** response with an HTML body (the same wake page). Retry the request until you get a normal app response. There is no separate Accept-based API path for cold starts in this version.

## What’s next

- [Create a deployment](./create-a-deployment)
- [Ports & health checks](./ports)
