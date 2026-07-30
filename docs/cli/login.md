---
id: login
title: Login & Logout
sidebar_label: Login & Logout
---

# Login & Logout

## Login

Authenticate the CLI with your RumptyCloud account:

```bash
rumpty login
```

The CLI generates a one-time code and prompts you to open a browser:

Authenticate Rumpty in your browser.

Your one-time code is PYJN-GPJY.

Open this URL in your browser:

https://auth.app.rumptycloud.com/device?user_code=PYJN-GPJY

Press Enter to open the browser, or sign in using the URL above:

Waiting for authorization...

Press **Enter** to open the browser automatically, or manually visit the URL and enter your one-time code.

The browser shows a confirmation page

Once you click **Approved**, the page confirms:

> **Sign-in approved.**  
> Your terminal should complete in a moment. You can close this tab.

Your terminal completes automatically:

Logged in as `<your-username>`.

:::tip
For non-interactive environments like CI pipelines, skip `rumpty login` entirely. Pass your API key via the `--token` flag or `RUMPTY_API_KEY` environment variable instead. Generate one from [Settings → API Keys](/settings/api-keys).
:::

## Logout

Remove the local session from your machine:

```bash
rumpty logout
```

Logged out.

Your API key remains active in [Settings → API Keys](/settings/api-keys) until you explicitly revoke it there.