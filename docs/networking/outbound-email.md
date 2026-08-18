---
id: outbound-email
title: Sending Email (SMTP)
sidebar_label: Sending Email (SMTP)
---

# Sending Email (SMTP)

Outbound connections to the standard SMTP ports — **25**, **465**, and **587** — are blocked for all workloads on Rumpty Cloud, including virtual machines and deployments. Connections to these ports are rejected immediately, so your app sees a "Connection refused" error rather than a timeout.

## Why we block SMTP

All workload traffic leaves the platform through shared egress IPs. A single compromised or misconfigured app sending spam would get those IPs onto email blocklists within hours, breaking email delivery for every customer at once. Blocking direct SMTP is the industry-standard protection — AWS, Google Cloud, and DigitalOcean all restrict these ports in the same way.

## How to send email

You have two options, both of which work without any changes on our side:

### Option 1: SMTP relay on an alternate port (works with any SMTP client)

Most transactional email providers accept SMTP submission on alternate ports specifically for platforms like ours. Ports such as **2525**, **2465**, and **2587** are **not blocked** on Rumpty Cloud.

For example, with [Resend](https://resend.com):

- **Host**: `smtp.resend.com`
- **Port**: `2587` (STARTTLS) or `2465` (SSL)
- **Username**: `resend`
- **Password**: your Resend API key

SMTP2GO, Mailgun, SendGrid, Brevo, and Mailjet offer the same on port `2525` — sign up, then use your provider's SMTP host, port `2525`, TLS enabled, and the credentials they give you.

This is the easiest path for off-the-shelf software (WordPress, OpenCart, Magento, etc.) that only speaks SMTP — no plugins or code changes needed. Remember to verify your sending domain with the provider first.

### Option 2: Email API over HTTPS

Transactional email services such as Resend, SES, Mailgun, Postmark, and SendGrid all offer HTTPS APIs (port 443, never blocked). If you control the application code, this is the more reliable option: better deliverability feedback, no SMTP connection handling, and API keys instead of passwords.

Many platforms also have ready-made plugins for these services — for example, OpenCart and WordPress both have marketplace extensions for Mailgun and SendGrid that send over HTTPS.

## A note on Gmail SMTP

Even without our port blocking, using `smtp.gmail.com` with a Google account password no longer works — Google has deprecated plain password authentication for SMTP. Personal Gmail accounts are also rate-limited and not designed for application email. Use a transactional email provider instead.

## Verifying connectivity

From a VM, you can confirm which ports are reachable with:

```bash
nc -v portquiz.net 2587   # succeeds — use alternate ports for SMTP relays
nc -v portquiz.net 587    # refused — blocked platform-wide
```
