---
type: object
cluster: content-and-insights
universe: live
status: verified
verified: 2026-10-31
commit: bdb621c
entity: src/content
---

# Content modules

Typed arrays in `src/content/*.ts` that supply every page's copy, cards, and slugs. No CMS.

## Why this shape

Content that ships with the code should be typechecked with the code. A `ServiceSurface` entry cannot be missing a `slug`, and the detail route's `generateStaticParams` cannot disagree with the list, because both read the same array. The cost is that copy changes are deploys; the benefit is that a broken link or a missing field fails the build.

## Shape

| Module | Export | Consumed by |
|---|---|---|
| `services.ts` | `services` (`:8`), `getServiceBySlug` (`:111`) | `/services`, `/services/[slug]`, sitemap |
| `case-studies.ts` | `caseStudies` | `/case-studies`, `[slug]`, sitemap |
| `team.ts` | team members | `sections/team-section.tsx` |
| `featured-stats.ts` | stat series | `sections/featured-stats-section.tsx`, `GrowthChart` |
| `process.ts` | process steps | `sections/process-section.tsx` |
| `roadmap.ts` | roadmap nodes + map backdrop | `ui/animated-roadmap.tsx` |
| `insights.ts` | metadata projection | pages + sitemap (see [insight-posts](insight-posts.md)) |
| `types.ts` | `ServiceSurface`, `CaseStudySurface`, `InsightSurface`, `TeamMemberSurface` | all of the above |

Citations: `src/content/types.ts:20-91`

## Connected to

- **owns:** the site's static copy and slugs
- **owned-by:** nothing — this is the source
- **joins:** [routes](../app-shell/routes.md) enumerates these slugs; [page-sections](../component-library/page-sections.md) renders them
- **looks-like-but-is-not:** `src/content/insights.ts` holds no posts — it projects the disk loader, so edits there do not change content

## If you change this

- **Hits:** adding a service/case study changes the route list and the sitemap automatically; renaming a `slug` breaks inbound links and any markdown post that links to it; changing a type in `types.ts` breaks every module and page that uses it.
- **Does not hit:** markdown posts, the markdown renderer, design tokens.

## Surfaces

| Surface | Role |
|---|---|
| pages and sections | read the arrays |
| `src/app/sitemap.ts` | reads services, case studies, insights |
| humans | edit the files directly |

## See

- Source: `src/content/`
- Types: `src/content/types.ts`
