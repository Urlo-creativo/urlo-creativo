# Urlo Creativo

Marketing/portfolio website for Urlo Creativo, a Milan-based creative studio.
Next.js App Router frontend + Sanity CMS, deployed on Vercel.

## Repository structure

| Path | What it is |
| --- | --- |
| `apps/web` | Next.js 16 frontend (App Router, Tailwind CSS v3, React 19) |
| `apps/studio` | Sanity Studio v6 — content editing UI |
| `shared/` | Code shared by both apps (locale list & types) |
| `SANITY.md` | Full content model & integration reference (schemas, GROQ, rendering) |
| `apps/web/DESIGN_SYSTEM.md` | Design tokens & utility classes — read before any UI change |
| `CLAUDE.md` | Working rules for AI agents (reuse-before-reinvent, canonical modules) |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in SANITY_API_READ_TOKEN
npm run dev:web              # frontend on http://localhost:3000
npm run dev:studio           # Sanity Studio (separate terminal)
```

## Environment variables

Set in `.env.local` for local dev and in Vercel project settings for production:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, canonical/hreflang, `sitemap.xml`, `robots.txt`. Must match the **primary** domain configured in Vercel (www vs apex). Falls back to `localhost:3000` in dev. |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET` / `NEXT_PUBLIC_SANITY_API_VERSION` | Sanity project coordinates used by the web app. |
| `SANITY_API_READ_TOKEN` | Server-only read token. Only referenced from server components — never shipped to the browser bundle. |
| `SANITY_REVALIDATE_SECRET` | Shared secret that authenticates the Sanity webhook calling `/api/revalidate`. Must match the Secret field of the webhook in Sanity manage. |
| `SANITY_STUDIO_*` | Same coordinates for the Studio app. |

`NEXT_PUBLIC_*` values are inlined at build time — changing them in Vercel
requires a redeploy.

## Architecture

### Routing & i18n

All pages live under `app/[locale]/` (`it` default, `en`). The locale list is
the single source of truth in [`shared/locales.ts`](shared/locales.ts).
[`apps/web/src/proxy.ts`](apps/web/src/proxy.ts) (Next 16's renamed
`middleware.ts`) redirects locale-less paths: `/` → `/it`, `/about` →
`/it/about`. UI copy lives in `apps/web/src/content/dictionaries/` per locale;
editorial content comes from Sanity with `it`-fallback handled inside the GROQ
queries.

### Content & caching

Pages are statically generated (SSG/ISR) and read published Sanity content
server-side only. Freshness is handled two ways:

1. **Webhook (instant):** a Sanity webhook (manage → API → Webhooks) POSTs to
   `/api/revalidate` on create/update/delete of published documents. The route
   verifies the signature with `SANITY_REVALIDATE_SECRET`, then calls
   `revalidateTag(_type, { expire: 0 })` — blocking revalidation, so the first
   request after publishing already gets fresh content. Fetches are tagged with
   their document type (`project`, `homePage`, …).
2. **Time fallback:** every Sanity-backed page also sets `revalidate = 3600`,
   so content self-heals within an hour even if a webhook is missed.

> ⚠️ The webhook URL currently points at the temporary
> `urlo-creativo-web-three.vercel.app` address. When the production domain is
> attached, update the webhook URL in Sanity manage **and** set
> `NEXT_PUBLIC_SITE_URL` to the primary domain, then redeploy.

### SEO

Per-page canonical + hreflang via `localizedAlternates()` in
[`apps/web/src/lib/site.ts`](apps/web/src/lib/site.ts) (deliberately not in the
locale layout — layout metadata cascades and would mis-canonicalize subpages).
`sitemap.xml` includes all static routes and project detail pages fetched from
Sanity; `robots.txt` advertises it, so search engines discover it without
manual submission (Search Console submission still recommended once the real
domain is live).

## Design system

Before making UI changes in `apps/web`, read
[`apps/web/DESIGN_SYSTEM.md`](apps/web/DESIGN_SYSTEM.md). In short:

- typography: `type-*`
- spacing: `page-top`, `section-y`, `section-y-lg`, `stack-*`, `grid-gap-*`
- layout: `page-shell`, `text-measure`, `text-measure-narrow`, `media-portrait`
- colors: semantic `--color-*` tokens and raw `--uc-*` palette tokens
- rich text: structured dictionary tokens for `bold`, `italic`, `highlight`,
  and highlight `trigger`

Do not introduce arbitrary Tailwind values unless the design requires a true
Figma one-off. Preserve intentional one-offs such as precise image positioning,
bespoke section padding, animation overlay offsets, and unique media ratios.

## Content editing

Editors work in Sanity Studio: three singleton pages (Home, Servizi, About),
plus repeatable **Progetti**, **Persone**, and **Clienti** collections. Field
labels and descriptions are in Italian; a language-filter toolbar toggles
IT/EN inputs. The full content model is documented in [`SANITY.md`](SANITY.md).

Local fallbacks in the frontend are deliberately obvious placeholders
(`apps/web/src/content/placeholders.ts`) — real content is only ever entered
in Sanity, never committed to this repo.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev:web` / `dev:studio` | Local dev servers |
| `npm run typecheck:web` | TypeScript check |
| `npm run build:web` / `build:studio` | Production builds — run both before merging |
| `npm run migrate:*` / `seed:*` | One-off Sanity data migrations/seeds. Dry-run by default; the `:write` variants actually write (gated by env flags). Most are historical and should not need re-running. |
| `npm run audit:stale-sanity-fields` | Report Sanity fields no longer read by the frontend |

## Deployment

Pushing to `main` deploys via Vercel (monorepo root; web app builds from
`apps/web`). The Studio is deployed separately with `npx sanity deploy` from
`apps/studio` — required whenever schema or field descriptions change, or
editors won't see the update.

Go-live checklist when attaching the production domain:

1. Add the domain in Vercel and pick the primary (www or apex).
2. Set `NEXT_PUBLIC_SITE_URL` to that exact origin and redeploy.
3. Update the Sanity webhook URL to `https://<domain>/api/revalidate`.
4. Verify the domain in Google Search Console and submit `sitemap.xml`.
