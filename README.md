# Urlo Creativo

Next.js + Tailwind + Sanity project for the Urlo Creativo website.

## Structure

- `apps/web` - Next.js App Router frontend
- `apps/studio` - standalone Sanity Studio
- `Urlo Creativo Design System` - reference-only design export from Claude Design

The Figma file remains the source of truth for visual implementation. The local design
system folder is used only as a starting reference for tokens, assets, and brand rules.

## Design System Rules

Before making UI changes in `apps/web`, read
[`apps/web/DESIGN_SYSTEM.md`](apps/web/DESIGN_SYSTEM.md).

Future agents should follow the existing design-system tokens and utilities:

- typography: `type-*`
- spacing: `page-top`, `section-y`, `section-y-lg`, `stack-*`, `grid-gap-*`
- layout: `page-shell`, `text-measure`, `text-measure-narrow`, `media-portrait`
- colors: semantic `--color-*` tokens and raw `--uc-*` palette tokens
- rich text: use structured dictionary tokens for `bold`, `italic`, `highlight`, and highlight `trigger`

Do not introduce arbitrary Tailwind values unless the design requires a true
Figma one-off. Preserve intentional one-offs such as precise image positioning,
bespoke section padding, animation overlay offsets, and unique media ratios.

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev:web
```

Run Sanity Studio separately when the Sanity project details are ready:

```bash
npm run dev:studio
```

## Environment

Set these values in `.env.local`:

```bash
# Canonical origin for metadata, sitemap.xml, robots.txt (defaults to localhost in dev)
NEXT_PUBLIC_SITE_URL=https://www.urlocreativo.com
NEXT_PUBLIC_SANITY_PROJECT_ID=gerfjp7t
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-18
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=gerfjp7t
SANITY_STUDIO_DATASET=production
```
