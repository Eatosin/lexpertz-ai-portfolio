# app-shell

The frame every page inherits: URL surface, root layout, metadata, sitemap.

## What holds this cluster together

Routes are files under `src/app/`; the marketing pages share one `(marketing)` route group so their chrome comes from the root layout rather than a duplicated per-page wrapper. Detail pages read `src/content/*`; only insights are prerendered (`generateStaticParams`), services and case studies render on demand. The sitemap re-lists the static routes by hand — that duplication is deliberate (it claims no `lastModified` where none is defensible) and is the one place a new top-level route must be added twice.

## Cards

| Card | Open it when |
|---|---|
| [routes](routes.md) | adding, renaming, or removing a URL |
| [layout-and-seo](layout-and-seo.md) | fonts, providers, metadata, canonical URLs, sitemap |

## Check

`npm run build` prerenders every route; a broken content slug fails the build, not production. Then confirm the new URL appears in `/sitemap.xml`.
