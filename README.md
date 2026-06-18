# Urlo Creativo

Next.js + Tailwind + Sanity project for the Urlo Creativo website.

## Structure

- `apps/web` - Next.js App Router frontend
- `apps/studio` - standalone Sanity Studio
- `Urlo Creativo Design System` - reference-only design export from Claude Design

The Figma file remains the source of truth for visual implementation. The local design
system folder is used only as a starting reference for tokens, assets, and brand rules.

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
NEXT_PUBLIC_SANITY_PROJECT_ID=gerfjp7t
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-06-18
SANITY_API_READ_TOKEN=
SANITY_STUDIO_PROJECT_ID=gerfjp7t
SANITY_STUDIO_DATASET=production
```
