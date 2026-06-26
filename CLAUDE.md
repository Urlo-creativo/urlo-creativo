# Urlo Creativo — Agent Working Rules

Project rules for any agent (Claude Code, GPT, etc.) working in this repo.
Read this before writing or changing UI / content code.

## 1. Reuse before you reinvent (highest priority)

Before writing a **new** component, hook, utility, type, or token, check whether
one already exists and use it. Do **not** build a parallel version of something
the codebase already provides. If an existing module is close but not quite
right, extend it — don't fork it.

Where to look first:
- UI primitives & section components: `apps/web/src/components/ui/`,
  `apps/web/src/components/sections/`
- Design tokens & utilities: `apps/web/src/styles/tokens.css`,
  `apps/web/src/app/globals.css`, documented in `apps/web/DESIGN_SYSTEM.md`
- Sanity data / queries / types / images: `apps/web/src/lib/sanity/`, `SANITY.md`
- Localized UI copy: `apps/web/src/content/dictionaries/`

### Canonical reusable modules — use these, don't re-implement them
- **Highlighted / decorated dictionary copy** → `StructuredRichText` +
  `RichTextToken` (`components/ui/rich-text.tsx`). A token already carries
  `text`, `highlight` (colour), `bold`, `italic`, `trigger`. Do **not** invent a
  parallel `{ label, color, trigger }` shape and do **not** call `HighlightText`
  directly from a page for dictionary copy — render through `StructuredRichText`.
- **Sanity images** → `<SanityImage>` (`components/ui/sanity-image.tsx`) backed by
  `sanityImageProps` / `hasImageAsset` (`lib/sanity/image.ts`). Don't hand-roll
  `next/image` + URL building or LQIP/hotspot logic.
- **Project media (image *or* video)** → `ProjectMediaItemView`
  (`components/sections/project-media.tsx`). Don't re-branch image-vs-video at a
  call site — it already handles both and the hero reuses it.
- **Project category values / labels** → single source `lib/sanity/categories.ts`.
  Don't hardcode category labels anywhere else.
- **Local Sanity fallbacks / placeholders** →
  `apps/web/src/content/placeholders.ts`. Any content that should be maintained
  in Sanity must fall back to short, obvious `Placeholder ...` text and the
  shared `/placeholder-image.png` image. Do not add realistic mock copy, section-
  specific fake images, or large repeated fallback arrays. Keep repeated fallback
  content to one item unless a component genuinely requires more to render.
- **Buttons** → `.pill-button` + variants. **Footer** → `<SiteFooter>`.

### Why this rule exists
We repeatedly shipped parallel implementations — a custom highlight wrapper
instead of `StructuredRichText`, an inline hero image/video branch instead of
`ProjectMediaItemView`. Each duplicate causes drift, inconsistent behaviour, and
extra maintenance. One implementation, reused everywhere.

## 2. Keep changes concise

Prefer the smallest change that fits existing patterns. Don't add a helper or
abstraction for a single use, and don't restate a value that a token or
dictionary already owns. But don't over-abstract either: per `DESIGN_SYSTEM.md`,
do not abstract two things just because they look similar.

## 3. Decoration lives with the copy, in the dictionary

Text styling that decorates dictionary copy (bold, italic, highlight colour,
reveal trigger) belongs in the dictionary as `RichTextToken` data, not hardcoded
in page components. Pages stay structural.

## 4. Before finishing

Run and report: `npm run typecheck:web`, `npm run build:web`,
`npm run build:studio`. Don't add real project content — the client uploads it
manually in Sanity Studio.
