# Organic growth playbook: enterprise RAG and the proof gap

Research date: 2026-11-22. Status: in progress. First sprint shipped 2026-11-22: resource page, PDF, supporting article, inline capture, and internal links.

The goal is not more impressions. It is qualified conversations from people who are
already looking for what Lexpertz sells: AI systems that can prove what they did.

This playbook starts from the Search Console export, then sets out the 2026 search
and AI-citation tactics worth implementing across the site over the next two
quarters.

## 1. What the data actually says

The export is filtered (see `Filters.csv`) to one query and one page for one week:

| Query | Page | Clicks | Impressions | CTR | Position |
|---|---|---:|---:|---:|---:|
| best rag solutions for enterprise knowledge management | `/insights/enterprise-rag-solutions` | 0 | 16 | 0% | 1.94 |

The week before, the same query and page recorded zero impressions.

Three things follow.

**This is a spot check, not a demand map.** The export has a query filter and a page
filter, one week of data, and Web search only. Sixteen impressions cannot tell you
whether the topic is large, whether the page is winning, or which queries to build
next.

**Ranking is not the constraint.** Position 1.94 is already top-of-page. Zero clicks
at that position is consistent with three things: an AI Overview answering the query,
a very low-volume query, or a title/snippet that does not earn the click. The export
cannot distinguish them.

**The timing is noisy.** Google's [Search Status Dashboard](https://status.search.google.com/)
shows an active ranking incident that began on 10 November 2026. The export window,
14-20 November, is inside that rollout. Do not rewrite the page in response to this
week's position or CTR. Wait for the rollout to finish, then wait a full week before a
comparison, as Google's [core-update guidance](https://developers.google.com/search/docs/appearance/core-updates)
recommends.

The page itself is strong: roughly 4,000 words, a current vendor shortlist, a
four-persona permission test, a freshness/deletion test, a 60-question pilot scorecard,
pricing shapes, and FAQs. The problem is distribution and conversion, not substance.

### The on-page gaps

| Gap | Evidence | Why it matters |
|---|---|---|
| Thin internal linking | The page has two real body links: `/services/evidence-gated-rag` and `/services`. Its diagrams account for the rest. | The page does not pass authority to the cluster, and the cluster does not pass authority back. |
| No service-page backlink | `/services/evidence-gated-rag` does not link to the RAG article. | The highest-intent commercial page and the highest-depth editorial page are disconnected. |
| No inline lead capture | The only email capture is the Substack embed in the footer. | A reader convinced by a 4,000-word guide has no low-friction next step except a sales call. |
| No topic hub | `/insights` is a reverse-chronological feed, not a topic index. | Readers and crawlers cannot see the shape of the RAG cluster. |
| No original data asset | The page compares vendors but publishes no benchmark or test results of its own. | The strongest link-earning and AI-citation asset is missing. |
| No visible freshness field | The article schema uses `publishedAt` for both `datePublished` and `dateModified`. | A material update cannot be represented accurately. |
| No AI-report baseline | The export is standard Web search; no generative-AI report data is included. | You cannot separate AI impressions from web impressions or measure AI visibility. |

**Shipped 2026-11-22:** the [RAG Permission Test Kit](/resources/rag-permission-test-kit), its six-page PDF, [the supporting article](/insights/rag-permission-test), inline article capture, and the pillar/service backlinks. The remaining gaps are still open.

## 2. What the 2026 playbook actually says

### Google's official position: AI search is still SEO

Google's [AI features optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide),
published 15 May 2026, is explicit:

- AI Overviews and AI Mode are rooted in core Search ranking and quality systems.
- The highest-leverage work is unique, non-commodity content with first-hand
  experience, clear structure, and high-quality images or video.
- Google does not need `llms.txt`, AI-specific markup, content chunking, or separate
  "AI versions" of pages.
- Structured data remains part of overall SEO, but there is no special AI schema.
- Use Search Console's generative-AI performance reports where available.

The same guide names the anti-patterns: scaled fan-out pages, fake mentions, and
writing for an algorithm instead of a reader.

### Zero-click is the default for broad informational queries

AI Overviews and AI Mode answer more of the query before the click. Ranking first can
produce impressions without sessions. The practical response is not to chase more
informational definitions. It is to:

- own the **commercial and technical** questions where the buyer still needs detail;
- build **brand and entity** presence so the assistant names Lexpertz, not only cites
  a page;
- measure **pipeline influence** and branded search, not only organic sessions.

### Query fan-out rewards topic depth

Google's AI features generate related queries and retrieve passages across the index.
One page per keyword is fragile. One owning page per fact family, supported by a
cluster, is more retrievable. The RAG page should be the pillar; permission fidelity,
freshness, evaluation, pricing, build-vs-buy, and vendor comparisons should be spokes.

### Information gain beats another "best of" list

The current page already has a differentiated angle: permission fidelity and a pilot
scorecard. The next step is to publish the evidence behind it. A tested permission
matrix across five platforms, a 60-question pilot dataset, or a deletion-latency
benchmark is more citable than another list of vendors. It earns links, gets quoted in
AI answers, and gives sales a concrete artifact.

### E-E-A-T is an editorial system, not a badge

The site already has a named founder, case studies, and a consistent Organization
entity. Strengthen it with:

- a real author page with credentials and a list of work;
- methodology and limitations on every benchmark or data page;
- visible `dateModified` only when facts, prices, product names, or recommendations
  materially change;
- third-party profiles that describe the same positioning (LinkedIn, Substack,
  GitHub, Crunchbase), without inventing reviews or customers.

### The formats that earn links are not the formats that earn rankings

A 2026 B2B backlink study (vendor data, directional) found statistics roundups earned
about 4.25x their page share of backlinks, glossaries 1.47x, interactive tools 1.38x,
and how-tos 1.36x. Original research earned fewer links directly but is highly citable
when paired with a stats page.

That suggests a three-part asset strategy:

1. **Stats page** for the category, updated quarterly, with one-line sourced claims.
2. **Glossary** for RAG, permissions, freshness, evaluation, and audit terms.
3. **Tool or checklist** that solves a real pilot problem and captures email.

### AI citation structure helps non-Google engines

For ChatGPT, Perplexity, Claude, and Copilot, make passages extractable:

- a direct answer in the first paragraph of each section;
- comparison tables with clear headers;
- sourced statistics with dates and methodology;
- self-contained answer blocks that work without surrounding context;
- an author and organization entity that is consistent across the web.

Google does not require any of this, but it does not hurt. Write for readers first.

## 3. The topic map

**Core entity:** enterprise AI knowledge systems that can prove what they did.

Four pillars, with the existing pages as the first spokes:

| Pillar | Existing page | Job |
|---|---|---|
| Enterprise RAG | `/insights/enterprise-rag-solutions` | Own the platform and buyer questions |
| The proof gap | `/insights/enterprise-ai-benefits` | Connect AI benefits to evidence and audit readiness |
| Agent authority and security | `/insights/google-ai-agent-security-threats`, `/insights/ai-agent-identity-security` | Own the control and threat questions |
| Customer-service AI | `/insights/enterprise-ai-customer-service` | Own the resolution and containment questions |

### Cluster map

| Cluster | Buyer question | Content that should exist | Primary conversion |
|---|---|---|---|
| Buy | Which platform, at what price, for our stack? | RAG pricing, build vs buy, vendor comparisons, RFP questions | Evidence-Gated RAG, AI Proof Audit |
| Operate | Will it respect permissions, freshness, and quality? | Permission test kit, deletion/freshness guide, evaluation scorecard, observability guide | Audit, newsletter, checklist |
| Prove | Can we defend it to an auditor or regulator? | Audit readiness checklist, EU AI Act for RAG, evidence trail guide, incident rehearsal | AI Proof Audit |
| Apply | What does this look like in insurance, asset management, legal ops? | Industry-specific RAG guides, case studies, benchmark reports | AI Proof Audit, build |

## 4. Priority content queue

### P0: next 30 days

| # | Working title | Intent | Format | Links to | Lead asset |
|---|---|---|---|---|---|
| 1 | The RAG Permission Test Kit: Four Personas, One Leak | Commercial investigation | Checklist + template | Pillar, identity post | Email-gated kit |
| 2 | Enterprise RAG Pricing: What You Are Actually Buying | Commercial | Guide + table | Pillar, Evidence-Gated RAG | Audit CTA |
| 3 | RAG Freshness and Deletion: The Index That Will Not Forget | Technical | Guide + test protocol | Pillar, case study | Newsletter |
| 4 | The 60-Question RAG Pilot Scorecard | Technical / decision | Template | Pillar, audit | Email-gated scorecard |
| 5 | Build vs Buy Enterprise RAG in 2026 | Consideration | Decision guide | Pillar, service | Audit CTA |
| 6 | AI Proof Audit: What an Independent Review Actually Checks | Decision | Explainer | Service, benefits post | Audit CTA |

### P1: days 30-90

| # | Working title | Intent | Format |
|---|---|---|---|
| 7 | Glean vs Microsoft Copilot vs Gemini Enterprise | Comparison | Tested comparison |
| 8 | Vectara vs Azure AI Search vs Onyx | Comparison | Tested comparison |
| 9 | RAG for Insurance Claims: The Permission and Freshness Tests | Industry | Use-case guide |
| 10 | RAG for Asset Management and Compliance | Industry | Use-case guide |
| 11 | Enterprise RAG Glossary | Awareness | Glossary |
| 12 | Enterprise RAG Statistics 2026 | Awareness / links | Stats roundup |
| 13 | RAG RFP Questions Buyers Should Ask | Commercial | Checklist |
| 14 | RAG Observability: What to Log After Go-Live | Technical | Guide |

### P2: quarter two

| # | Working title | Intent | Format |
|---|---|---|---|
| 15 | The Permission Fidelity Benchmark: Five Platforms, One Corpus | Original data | Benchmark report |
| 16 | RAG Migration Checklist: From Pilot to Production | Implementation | Checklist |
| 17 | RAG Security: Prompt Injection Through Retrieved Content | Technical | Threat guide |
| 18 | EU AI Act for RAG: What Changes, What Does Not | Regulatory | Explainer |
| 19 | RAG Readiness Assessment | Commercial | Interactive tool |
| 20 | What a Failed RAG Audit Looks Like | Proof | Case study |

The queue is deliberately weighted to commercial and technical questions. Broad
"what is RAG" content is already answered by AI Overviews and does not produce
qualified leads.

## 5. The 90-day roadmap

### Week 0: measurement and restraint

- Export the **unfiltered** Search Console data for 16 months: queries, pages,
  countries, devices, and Discover separately.
- Check whether the property has the generative-AI Search and Discover reports. If it
  does, baseline them; if not, note the limitation.
- Record the 10 November ranking rollout and wait for Google to mark it complete, then
  wait one full week before comparing.
- Audit index coverage and Core Web Vitals in Search Console. Do not change content in
  response to a single week during a rollout.

### Weeks 1-2: on-page fixes

- Add five to seven contextual internal links to the RAG pillar: identity, agent
  security, benefits, case studies, audit service, and the relevant comparison pages.
- Add a "Field notes" block to the four service pages, linking each service to two or
  three relevant articles.
- Add a visible author block and an author page with credentials, work, and sameAs
  links.
- Add `updatedAt` to the content contract and use it for `dateModified` when a page is
  materially updated.
- Add an inline newsletter or checklist CTA to article pages, not only the footer.
- Test one title/meta variant on the RAG page **after** the rollout, with a 28-day
  window. Change one variable at a time.

### Weeks 2-4: first lead asset

- Write and design the **RAG Permission Test Kit**: four personas, a test corpus, a
  scoring sheet, the five failure modes, and a one-page executive summary.
- Publish a supporting article that explains the method and links to the kit.
- Gate the kit with email; add a `resource_download` event and a follow-up email.
- Link the kit from the pillar, the service page, and the audit page.

### Weeks 4-8: cluster build

- Publish P0 items 2-6 at a cadence of one per week.
- Each piece links up to the pillar and across to one sibling.
- Update the pillar's "shortlist" and "what to measure" sections with links to the
  new spokes.
- Add `ItemList` or comparison-table markup where the visible page supports it; do not
  add FAQ schema expecting a Google rich result.

### Weeks 8-12: proof and distribution

- Run the permission-fidelity benchmark or the 60-question pilot study. Publish the
  method, the corpus, the limitations, and the one-line stats.
- Create the stats page and glossary from the research.
- Pitch the benchmark to two industry publications and three podcasts. Use the
  LinkedIn founder profile to distribute the one-line findings.
- Refresh the pillar with the new data and a visible `dateModified`.

### Quarter two: compound

- Add the industry spokes (insurance, asset management, legal ops) and link them to
  the relevant case studies.
- Refresh the top three pages quarterly; do not churn dates without material change.
- Double down on the pages that produce email signups and audit requests, not the
  pages with the most impressions.

## 6. The lead engine

SEO only produces leads when the page gives the reader a next step that matches their
stage. The current content mostly offers a sales conversation; add lower-friction
steps.

| Stage | Asset | Ask | Destination |
|---|---|---|---|
| Problem-aware | RAG permission test kit | Email | Nurture sequence |
| Solution-aware | 60-question pilot scorecard | Email | Nurture + audit CTA |
| Vendor-aware | Comparison and pricing guides | Read | Evidence-Gated RAG |
| Decision-ready | AI Proof Audit explainer | Book a call | `/services/ai-proof-audit` |
| Existing client | Assurance Retainer | Check-in | `/services/assurance-retainer` |

### CTA placements

- **Mid-article:** after the permission test and after the pilot scorecard.
- **End of article:** one focused CTA. For the RAG pillar, the AI Proof Audit is the
  right wedge; Evidence-Gated RAG is the build option.
- **Service pages:** a "Field notes" block with two or three relevant articles.
- **Footer:** keep the Substack embed, but do not rely on it as the only capture.
- **Exit:** do not add a popup until the inline CTA is measured; popups can damage
  trust with a technical audience.

### Tracking

The contact form already captures the page and UTM values. Add:

- `cta_click` on every content CTA;
- `resource_download` on gated assets;
- `newsletter_signup` on the Substack embed if the provider fires an event;
- `contact_submit` with the source page (already present);
- an optional "How did you find us?" field on the contact form;
- GA4 exploration for AI referrers: `chatgpt.com`, `perplexity.ai`,
  `gemini.google.com`, `copilot.microsoft.com`, `claude.ai`.

Do not expect Search Console to isolate AI Overview clicks. Google's guide says there
is no AI-specific click report; use the generative-AI impressions reports where
available and treat sessions and pipeline as the outcome.

## 7. Measurement

### Weekly

| Metric | Source | Why |
|---|---|---|
| Non-brand impressions and clicks | Search Console | Demand capture |
| Brand impressions and clicks | Search Console | Entity and demand creation |
| CTR by page and query | Search Console | Snippet and title fit |
| Average position, segmented | Search Console | Ranking is a leading indicator, not the goal |
| AI referral sessions | GA4 | Assistants sending traffic |
| Email signups | Substack / form | Owned audience growth |
| CTA clicks | Vercel Analytics / GA4 | Content-to-conversion path |

### Monthly

| Metric | Source | Why |
|---|---|---|
| Qualified conversations | CRM / contact form | The actual goal |
| Audit requests | Contact form | Wedge conversion |
| Pipeline influenced | CRM | The metric the business cares about |
| Pages with 3+ internal links | Crawl / manual | Cluster health |
| Indexed pages | Search Console | Coverage |
| AI citations (sample) | Manual prompt checks | Visibility beyond Google |

Use 28-day comparisons, annotate core updates, and segment brand from non-brand.
A single week during a rollout is not a trend.

### Planning targets for the first 90 days

These are planning targets, not forecasts:

- 10-14 published cluster pages, each with a clear owning query and two internal links.
- 2x non-brand impressions on the RAG cluster, measured over a stable 28-day window.
- 25-50 email signups from the first lead asset.
- 3-5 qualified conversations per month attributable to content.
- At least one original data asset published and cited by a third party.

## 8. What not to do

- **Do not mass-generate "best RAG tools" pages.** Google's scaled-content-abuse
  policy covers AI-generated variations that add no value.
- **Do not buy mentions, reviews, or "independent" listicles.** Google explicitly
  names fake mentions, and the FTC reviews rule is a separate risk.
- **Do not add FAQ schema expecting a rich result.** Google retired FAQ rich results
  on 7 May 2026.
- **Do not spend the quarter on `llms.txt` or chunking.** Google does not need either
  for AI Overviews or AI Mode. Treat them as optional experiments for non-Google
  engines.
- **Do not change dates without material changes.** A new date on unchanged content
  is noise, and the page loses the audit-trail credibility the brand is selling.
- **Do not overfit the November core update.** Wait for completion plus one week.
- **Do not judge the page on one query.** Sixteen impressions is a sample, not a
  strategy.

## 9. First seven days

- [ ] Export 16 months of unfiltered Search Console data, plus Discover and any
      generative-AI reports.
- [ ] Record the 10 November ranking rollout and set a reminder for one week after it
      completes.
- [ ] Add the RAG pillar's missing internal links and the service-page backlinks.
- [ ] Add an inline newsletter or checklist CTA to article pages.
- [ ] Write the one-page spec for the RAG Permission Test Kit.
- [ ] Add `resource_download`, `newsletter_signup`, and content CTA events.
- [ ] Baseline the contact form's source pages and the AI referrers in GA4.
- [ ] Put a quarterly refresh date on the RAG pillar for February 2027.

## Sources

- Google, [Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), 15 May 2026.
- Google, [Search Status Dashboard](https://status.search.google.com/), accessed 22 November 2026.
- Google, [Core updates](https://developers.google.com/search/docs/appearance/core-updates).
- Google, [Search Central documentation updates](https://developers.google.com/search/updates).
- Google, [Search Console generative-AI reports](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports), June 2026.
- Google, [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
- Google, [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
- Aggarwal et al., [GEO: Generative Engine Optimization](https://arxiv.org/abs/2311.09735), KDD 2024.
- Foundation Inc., B2B Backlink Intelligence Report, March 2026 (vendor study; directional).
