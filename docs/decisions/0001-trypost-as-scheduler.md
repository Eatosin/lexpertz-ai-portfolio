---
status: proposed
date: 2026-11-01
owner: Owadokun Tosin Tobi
revisit: when the X developer tier and LinkedIn app approval are known, or 2026-11-15
---

# 0001 — Scheduler for the first social campaign

## Context

The November campaign has 6 LinkedIn posts and 8 X posts across two weeks. There is no scheduler connected, so publishing is manual copy-paste from `marketing/campaigns/2026-11-authority-not-autonomy.md`.

TryPost (`trypostit/trypost`, AGPL-3.0) is an open-source scheduler with native LinkedIn and X publishing plus an MCP server. Self-hosting it is feasible on the Spaceship Standard 1 VPS already under consideration ($4.90/mo, 1 core, 2 GB RAM, 25 GB NVMe, 1 TB transfer). Official requirements: 1 core / 1 GB minimum, 2 cores / 2 GB recommended, 10 GB disk.

Two constraints are outside our control and decide the outcome.

## Options

| Option | Cost | Setup | Control | Notes |
|---|---|---|---|---|
| **A. Self-host TryPost** | $4.90/mo VPS | 1–2 hours + API approvals | Full; data on our VPS | MCP server lets the agent schedule drafts directly |
| **B. TryPost Cloud** | Their plan price | Minutes | Their infrastructure | Same product, no MCP self-hosting work |
| **C. Existing SaaS** (Buffer, Typefully) | $6–$20+/mo | Minutes | Their infrastructure | No native MCP for our agent; may not support X threading well |
| **D. Manual posting** | $0 | None | — | 14 posts × 2 platforms, no queue, no bookmarks |

## Criteria

1. **Can it actually publish to LinkedIn and X?** Decided by platform API access, not by the tool.
2. **Does it close the agent loop?** The campaign is generated and maintained in this repo; an MCP or REST path means the agent queues posts instead of handing over copy.
3. **Total cost of ownership.** VPS plus the time to run it, not just the sticker price.
4. **Reliability during a two-week campaign.** A scheduler that breaks mid-campaign is worse than manual posting.
5. **Data exposure.** Post drafts and analytics stay on infrastructure we control.

## Evidence

- **TryPost stack:** Docker image `ghcr.io/trypostit/trypost` + Postgres 16 + Redis 7 + optional Caddy. On 2 GB RAM it fits one workspace, with no headroom; a 2 GB swapfile is required.
- **Custom domain costs a rebuild.** `VITE_REVERB_*` is baked at build time (`localhost:8080`). Serving `https://post.<domain>` requires `docker build` with `VITE_REVERB_HOST`, port 443, scheme https. Runtime env does not fix it.
- **LinkedIn:** profile posting needs the "Share on LinkedIn" product; company-page posting needs **Marketing Developer Platform** approval, which is a review process. Until approved, page posting is unavailable.
- **X:** every read is billed and TryPost polls once a day; link posts bill at a higher rate. TryPost's `X_DEFUSE_LINKS` exists for that reason. Whether our tier allows write access must be confirmed.
- **AGPL-3.0:** self-hosting for our own brand is fine. Modifying it and offering it as a network service to others requires publishing the changes.
- **Maintenance:** single maintainer, 788 stars, 1,242 commits, active. Acceptable risk for internal tooling; it is not a vendor SLA.
- **No managed database.** Backups are our job (`pg_dump` on a schedule, copied off the VPS).

## Decision

**Not decided yet.** Two facts decide it:

1. Does our X developer account allow OAuth2 write access at a cost we accept?
2. Is LinkedIn company-page approval (Marketing Developer Platform) already in place, or do we start with the founder profile only?

**Recommended path if both answers are workable:** self-host Option A on Standard 1, with a 2 GB swapfile, a nightly Postgres dump, and the Reverb rebuild. The MCP server is the differentiator: it lets `/social` push drafts into a queue instead of producing copy for a human to paste.

**Recommended path if X write access is expensive or LinkedIn approval is pending:** Option D for week one (manual, from the campaign file), and deploy TryPost in parallel. The campaign must not wait for infrastructure.

## Consequences

- Choosing A means owning OS updates, database backups, and major-version upgrades, plus one rebuild per domain change.
- Choosing A adds a second production surface to maintain, next to the site. It should not share the Vercel deploy or CI.
- Choosing B or C leaves the agent loop open: the campaign stays a document that a person publishes.
- The decision does not block the campaign. Week one is manual in every option.

## Open questions

- Subdomain: `post.lexpertzai.cc`?
- X developer tier: free, Basic, or Pro, and what the monthly post/read caps are.
- LinkedIn app: created? Products requested? Approval status?
- Is the VPS only for TryPost, or does it host other tooling? (Mixed use changes the RAM math.)
