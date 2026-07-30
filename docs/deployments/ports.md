---
id: ports
title: Ports & Health Checks
sidebar_label: Ports & Health Checks
---

# Ports & Health Checks

Every deployment listens on **one port**. RumptyCloud routes public traffic to that port and polls it to decide whether your app is healthy. If your app listens on a different port than the one configured, the deployment never becomes active — this is the most common reason a build succeeds but the app stays stuck in a deploying state.

## How it works

You never manage TLS, domains, or load balancing — the platform terminates HTTPS at the edge and forwards requests to your container on the configured port. The same port is used for three things:

1. **Routing** — public traffic to your app's URL is sent to this port.
2. **Health checks** — the platform polls your readiness path (default `/`) on this port before marking the deployment active.
3. **The `PORT` environment variable** — injected into your container automatically, set to the configured value.

The default port is **8080**.

## The `$PORT` convention (recommended)

The simplest setup: make your app read the `PORT` environment variable and listen on it. The platform always injects `PORT` with the correct value, so your app binds the exact port that is routed and health-checked — no configuration needed.

```js
// Node / Express
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0");
```

```python
# Python / FastAPI with uvicorn
import os
uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
```

```go
// Go
port := os.Getenv("PORT")
if port == "" {
    port = "8080"
}
http.ListenAndServe(":"+port, nil)
```

:::note
You cannot override `PORT` yourself. If you add a `PORT` variable in your deployment's environment variables, the platform's injected value wins — this is intentional, so the port your app binds always matches the port being routed and health-checked.
:::

## Apps with a hardcoded port

If your app listens on a fixed port you can't easily change (for example an image that always binds `3000`), set the deployment's **Port** setting to match instead:

- **When creating** — the Port field is editable when the application type is **Web Service/Backend** (it's locked to 8080 for static sites).
- **After creating** — open the deployment, go to the **Settings** tab, and change **Port**. Saving stores the new value; it takes effect on the **next deploy**, so trigger a new deployment run after saving.

Everything follows the setting: routing, the health check, and the injected `PORT` value all move to the port you set.

## Static sites

For the **Static Site/SPA** type the port is not configurable. The platform serves your built assets from its own web server on a fixed port — there is nothing to set.

## Troubleshooting

Symptoms of a port mismatch: the build succeeds, but the deployment never becomes **Active**, or the app URL returns an error page.

| Mistake | Fix |
|---------|-----|
| App listens on `3000` (or any port), Port setting says `8080` | Read `$PORT` in your app, or set the Port setting to `3000` |
| App binds `127.0.0.1` / `localhost` | Bind `0.0.0.0` — health checks and traffic reach the container over the network, so a localhost-only listener is invisible to them |
| `EXPOSE 3000` in the Dockerfile | `EXPOSE` is documentation only; it does not configure routing. Set the Port setting or read `$PORT` |
| `PORT` added as an environment variable | Has no effect — the platform's injected `PORT` always wins. Use the Port setting instead |
| Health check path returns 404 or requires auth | The readiness path (default `/`) must return a successful response unauthenticated. Point **Readiness/health check path** at a route that does, e.g. `/healthz` |

Runtime logs (deployment → **Logs**) usually show which port the app actually bound — compare it against the Port setting when a deployment won't go active.
