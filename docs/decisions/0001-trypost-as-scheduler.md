---
status: deferred
date: 2026-11-01
owner: Owadokun Tosin Tobi
revisit: after the November campaign has results, or when scheduling volume exceeds ~10 posts/week
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

**Deferred on 2026-11-01. The first campaign is manual.**

The trigger was not a technical failure; it was sequencing. Two facts still gate self-hosting (X write access, LinkedIn page approval), and the campaign starts before either is resolved. Twenty-eight posts across two weeks do not justify a new production service, a database to back up, and two platform app reviews.

**Interim path:** post manually from the founder profile, using `marketing/campaigns/2026-11-authority-not-autonomy.md` as the queue. Company page reshares follow. Links go in the first comment, not the body.

**Revisit when one of these is true:**
- the posting volume passes roughly 10 posts/week, or more than one channel is active;
- a second campaign needs the same posts on three or more networks;
- LinkedIn page approval and X write access are both in place, so the tool is not blocked on someone else.

**If it is revisited,** the recommendation stands: self-host Option A on Standard 1 with a swapfile, nightly Postgres dump, and the Reverb rebuild. The MCP server remains the differentiator.

## Consequences

- Deferring means no VPS, no database backups, no OS updates, and no second production surface this cycle. The cost is 15–20 minutes of manual posting per LinkedIn post and a few minutes per X post.
- Manual posting is also a useful constraint: it forces the copy to be good enough to paste, and it produces real timing data before any scheduler is configured.
- The campaign file is now the system of record. If a post is edited at publish time, edit it there too, or the next cycle repeats the wrong version.
- Choosing B or C later still leaves the agent loop open: the campaign stays a document that a person publishes.

## Open questions

- Subdomain, if it is revisited: `post.lexpertzai.cc`?
- X developer tier: free, Basic, or Pro, and what the monthly post/read caps are.
- LinkedIn app: created? Products requested? Approval status?
- Is the VPS only for TryPost, or does it host other tooling? (Mixed use changes the RAM math.)
- Does manual posting actually cost what we think? Time it for the first week.
