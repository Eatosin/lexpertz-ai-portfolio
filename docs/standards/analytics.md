# Analytics

How interaction tracking works on this site, what events exist, and how to add
one. The dispatcher is deliberately small: no vendor SDK wraps the app, and
every call site goes through one function.

---

## Current status — read this first

**A sink is installed: Vercel Analytics.** `@vercel/analytics` is a dependency,
`<Analytics />` is rendered in `src/app/layout.tsx`, and `src/lib/analytics/index.ts`
forwards custom events through the injected `window.va('event', ...)` client.
GTM/`dataLayer` forwarding is still wired, so adding a container later needs no
code change.

Why Vercel first and not GA4:

- No cookie banner, no consent-mode work, and no third-party script for a site
  with global traffic.
- Page views, referrers, countries and devices are enough for a baseline.
- Campaign attribution is handled **in the lead**, not in analytics: the contact
  form stores the first-touch UTM set and includes it in the email
  (`src/components/sections/contact-form.tsx`, `src/lib/analytics`).
- GA4 becomes worth the consent work when you run paid ads or need multi-step
  funnels. Add GTM then; the dispatcher already pushes to `dataLayer`.

Options if you outgrow the default:

### Option A — Vercel Analytics (current default)

```bash
npm i @vercel/analytics
```

```tsx
// src/app/layout.tsx
import { Analytics } from "@vercel/analytics/next";

// inside <body>, after the providers:
<Analytics />
```

Then enable Web Analytics for the project in the Vercel dashboard. Custom
events show up under the project's Events tab. This is the flattest path
because the dispatcher already checks for `window.va`.

### Option B — Google Tag Manager (more flexible)

Add the container to `layout.tsx` via `next/script`, then create a GA4 tag
triggered by the custom event `cta_click`. The dispatcher already pushes:

```js
window.dataLayer.push({
  event: "cta_click",
  category: "conversion",
  label: "<event label>",
  value: 1,
});
```

The event name in GA4 is always `cta_click`; the label distinguishes the
action. Create a GA4 custom dimension for `label` if you want per-action
reporting.

> Whichever you choose, set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` in the
> environment if you want events in local development. Production is enabled
> by `NODE_ENV` automatically.

---

## Architecture

```
call site (component)
      │
      ▼
trackCTA(label, destination?)        src/lib/analytics/index.ts
      │
      ▼
track({ name: "cta_click", category: "conversion", label, value })
      │
      ├──► window.va(event)          Vercel Analytics, if present
      └──► window.dataLayer.push()   GTM / PostHog / Plausible, if present
```

Design rules:

- **One dispatcher.** No component imports a vendor SDK. Swapping sinks is a
  change in one file.
- **Never throw.** Both branches are wrapped in `try/catch`. Analytics must not
  break a page.
- **No-op in development** unless `NEXT_PUBLIC_ANALYTICS_ENABLED=true`, so
  local clicks do not pollute production data.
- **No PII.** Labels are static strings, destinations are internal paths, and
  no user identifiers are sent.

---

## Event catalogue

Every event is emitted as `name: "cta_click"`, `category: "conversion"`, with
the label below. `value` is `1` when a destination is supplied, `0` otherwise.

| Label | Fired from | Meaning |
|---|---|---|
| `hero_primary` | `sections/hero-cinematic.tsx`, `ui/cinematic-hero.tsx` | Hero primary CTA (→ contact) |
| `hero_secondary` | same | Hero secondary CTA (→ case studies) |
| `navbar_cta` | `layout/navbar.tsx` | "Book a free call" in the header |
| `logo` | `layout/navbar.tsx` | Header logo (→ home) |
| `footer_logo` | `layout/footer.tsx` | Footer logo (→ home) |
| `footer_nav` | `layout/footer.tsx` | Any footer navigation link |
| `mobile_nav` | `layout/mobile-menu.tsx` | Mobile menu navigation link |
| `mobile_service` | `layout/mobile-menu.tsx` | Mobile menu service link |
| `mobile_cta` | `layout/mobile-menu.tsx` | Mobile menu CTA |
| `insight_card` | `sections/insights-preview.tsx` | Blog card on the homepage |
| `case_study_card` | `sections/case-study-card.tsx` | Case study card |
| `team_about_link` | `sections/team-section.tsx` | Team section → about |
| `closing_cta_primary` | `sections/cta-section.tsx` | Closing CTA primary |
| `closing_cta_secondary` | `sections/cta-section.tsx` | Closing CTA secondary |
| `share_x` | `blog/share-row.tsx` | Post shared to X |
| `share_linkedin` | `blog/share-row.tsx` | Post shared to LinkedIn |
| `share_copy_link` | `blog/share-row.tsx` | Post link copied |
| `share_native` | `blog/share-row.tsx` | OS share sheet used |

### Reading the share events

These four are the feedback loop for distribution. After a few posts, compare
`share_x` against `share_linkedin` and `share_copy_link`. Copy-link usually
dominates on technical content because readers paste into Slack or
newsletters — a channel you cannot see in referrer data, which makes the event
more valuable than a typical social click.

---

## Adding an event

```tsx
import { trackCTA } from "@/lib/analytics";

<Link href="/contact" onClick={() => trackCTA("pricing_cta", "/contact")}>
  Talk to us
</Link>;
```

Rules:

1. **Label is stable and lowercase snake_case.** It becomes a dimension; do not
   rename it later without updating the dashboard.
2. **Pass the destination** for navigation events so the value field is `1`.
3. **Do not fire on render.** Only on a user action; otherwise a page view
   inflates the count.
4. **Do not put user data in the label.** No emails, no free-text search terms.

Add the label to the table above in the same commit.

---

## Testing

In development, force the dispatcher on and inspect the network/console:

```bash
NEXT_PUBLIC_ANALYTICS_ENABLED=true npm run dev
```

With GTM, use Tag Assistant. With Vercel Analytics, custom events appear in
the project dashboard within a few minutes; they are batched, so a single
click is not instant proof.

The share row can be verified without any sink using Playwright: click
`button[aria-label="Copy link"]` and assert the clipboard contains the post
URL. That exercises the UI path even when analytics is unwired.
