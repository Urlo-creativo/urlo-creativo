# Urlo Creativo — Sanity Content Model & Integration

Reference for the Sanity CMS setup in this monorepo. Covers the schema (Studio),
the GROQ queries + TypeScript types (web), and how the frontend renders the data.

This document is the source of truth for the **Project** content system. If you
update the schema or queries, update this file too.

---

## 1. Overview

- **Monorepo:** `apps/studio` (Sanity Studio) + `apps/web` (Next.js 16 App Router).
- **Sanity project:** id `rj63sc4z`, dataset `production`.
- **Locales:** `it` (default) + `en`. Routing is `/[locale]/...`.
- **Locale configuration is shared.** Both Studio and the web app import locale
  IDs, labels, and fallback settings from `shared/locales.ts`.
- **Content is uploaded manually in Studio.** Nothing is seeded, hardcoded, or
  migrated by code. The frontend renders whatever exists in Sanity, and degrades
  gracefully to empty states when there is none.
- **Project documents are shared across locales.** There is one project document,
  not one document per language.
- **Project text uses field-level localization.** Editable copy is stored as
  `{ it, en }` objects and resolved by GROQ using the current route locale, with
  Italian as the fallback locale.
- **Fixed UI labels stay in the app dictionary.** Page title, filter labels,
  empty states, category display labels, and fixed section labels come from
  `apps/web/src/content/dictionaries/projects.ts`.

### Files

Studio schema (`apps/studio/schemaTypes/`):
- `index.ts` — registers all types
- `client.ts` — `client` document
- `project.ts` — `project` document
- `objects/localizedString.ts` — short `{ it, en }` text object
- `objects/localizedText.ts` — long `{ it, en }` text object
- `objects/projectMediaSection.ts` — `projectMediaSection` object
- `objects/projectMediaItem.ts` — `projectMediaItem` object
- `objects/projectCredit.ts` — `projectCredit` object

Web integration (`apps/web/src/`):
- `lib/sanity/client.ts` — configured `@sanity/client`
- `lib/sanity/env.ts` — projectId / dataset / apiVersion
- `lib/sanity/queries.ts` — all GROQ queries + TS types + category helpers
- `lib/sanity/image.ts` — `urlForImage`, `sanityImageProps`, `hasImageAsset`
- `components/ui/sanity-image.tsx` — `<SanityImage>` (next/image wrapper)
- `components/sections/project-media.tsx` — media section/item renderers
- `components/sections/projects-listing.tsx` — list + category filter (client)
- `components/sections/project-filter-buttons.tsx` — controlled filter buttons
- `app/[locale]/projects/page.tsx` — projects list page
- `app/[locale]/projects/[slug]/page.tsx` — project detail page
- `app/[locale]/page.tsx` — homepage (featured projects grid)

Shared code:
- `shared/locales.ts` — single source of truth for supported locales,
  default locale, and short language labels.

---

## 2. Schema types

### 2.1 `project` (document)

Fields, in the order they appear in Studio (which mirrors the detail page flow):

| Field | Type | Notes |
|---|---|---|
| `title` | `localizedString` | **Required.** Localized `{ it, en }`. |
| `subtitle` | `localizedString` | Optional. Italic line under the title (e.g. "A bigger splash"). |
| `titleGraphic` | image (`+ localized alt`) | Optional. Small badge / logo / illustration shown beside the title. **Image only** — not the hero, not a media section, no video. Hotspot enabled. |
| `slug` | slug | **Required.** Source = `title`. Used in the URL. |
| `year` | string | e.g. `2025`. Used for ordering and the listing. |
| `season` | string | e.g. `FW 23/24`, `SS 25`. Collection period. |
| `categories` | array of string | **Multi-select** from a fixed list (see 2.5). Drives the list-page filter. |
| `roles` | array of `localizedString` | e.g. Creative Direction, Visual Identity, Product Development. |
| `excerpt` | `localizedText` | Short summary for the listing page. |
| `coverImage` | image (`+ localized alt`) | **Required.** Used on the listing + homepage grid, and as hero fallback. Hotspot enabled. |
| `heroMedia` | `projectMediaItem` | Optional. Large image **or** video at the top of the detail page. |
| `challenge` | `localizedText` | Fixed text section. |
| `concept` | `localizedText` | Fixed text section. |
| `process` | `localizedText` | Fixed text section. |
| `responsibilities` | array of `localizedString` | e.g. Material Research, Prototype Development. |
| `outcome` | `localizedText` | Fixed text section. |
| `credits` | array of `projectCredit` | Repeatable credit rows. |
| `projectContentSections` | array of `projectMediaSection` | **The single media list.** Each section picks its own `placement` (see 2.2). |
| `featured` | boolean | If true, shows in the homepage projects grid. Default false. |
| `order` | number | Lower = first in the listing. |

Orderings: Manual order (`order asc`), Year newest first (`year desc`).
Preview: title + `season · year` + cover image.

### 2.2 `projectMediaSection` (object)

A repeatable, reorderable visual block. A project holds **one** array of these
(`projectContentSections`); each section decides where it renders via
`placement`. The frontend splits the single array by placement.

| Field | Type | Notes |
|---|---|---|
| `placement` | string (radio) | **Required.** Where on the page this block renders. One of: `afterConcept`, `afterResponsibilities`, `afterOutcome`, `behindTheScenes`. Default `afterConcept`. |
| `internalLabel` | string | Optional backend-only label for editors, e.g. "Concept layout 01". Not rendered on the website. |
| `layout` | string (radio) | **Required.** Grid variant (see 2.6). Default `twoColumnGrid`. |
| `mediaItems` | array of `projectMediaItem` | At least 1 required. Grid layout in Studio. |

Media sections have no visible heading — they render only their media items.
Per-item `caption` (below each image/video) is the only on-page text.
Preview: `placement · layout · N items`, with `internalLabel` in the subtitle
and the first item's image as the thumbnail.

**Ordering rule:** sections sharing the same `placement` render in the order they
appear in the `projectContentSections` array. Reorder the array in Studio to
control their sequence.

### 2.3 `projectMediaItem` (object)

A single image or video. Also reused as the project `heroMedia`.

| Field | Type | Notes |
|---|---|---|
| `mediaType` | string (radio) | **Required.** `image` or `video`. Default `image`. Controls which fields below are visible. |
| `image` | image (`+ localized alt`) | Shown when `mediaType = image`. Hotspot enabled. Required in that case. |
| `videoFile` | file (`video/*`) | Shown when `mediaType = video`. Upload a video file. |
| `videoUrl` | url | Shown when `mediaType = video`. External URL (hosted mp4/webm, or YouTube/Vimeo). |
| `poster` | image (`+ localized alt`) | Shown when `mediaType = video`. Optional still before playback. |
| `caption` | `localizedString` | Optional caption under the media. |

Validation: video items require either `videoFile` or `videoUrl`.
Preview: distinguishes 🖼 Image vs 🎬 Video.

### 2.4 `projectCredit` (object)

One credit row.

| Field | Type | Notes |
|---|---|---|
| `role` | `localizedString` | **Required.** e.g. Photographer, Art Director. |
| `name` | string | Optional. |
| `handle` | string | Optional. e.g. `@username`. |
| `url` | url | Optional. Link for the handle/name. |

### 2.5 Category values

`categories` is a multi-select from fixed stable values. Stored values do not
change by locale.

**Single source of truth (frontend):** `apps/web/src/lib/sanity/categories.ts`
holds the ordered `CATEGORIES` list with per-locale (`it`/`en`) labels. The
dictionary (`categoryLabels`), the filter options, the chips, and
`CATEGORY_ORDER` all derive from it — do not hand-write category labels
anywhere else on the web side.

| Stored value | EN label |
|---|---|
| `brand-identity` | Brand Identity & Communication |
| `design-product` | Design & Product Development |
| `styling-art-direction` | Styling / Shooting & Art Direction |

The Studio dropdown (`CATEGORY_OPTIONS` in `project.ts`) is a separate package
and only needs the `value` strings. **To add a category:** add it to
`categories.ts` (web) and add the same `value` to `CATEGORY_OPTIONS` (studio).

### 2.6 Media layout variants

`layout` on each media section is one of:

| Value | Rendering |
|---|---|
| `oneColumnCollage` | Single centered column, items at ~78% width, alternating alignment for an editorial collage feel. |
| `twoColumnGrid` | 1 col mobile → 2 cols at `md`. |
| `masonry` | CSS columns: 1 → 2 (`md`) → 3 (`lg`), `break-inside-avoid`. |
| `compactThreeColumnGrid` | 2 cols mobile → 3 cols at `md`. Tight grid (e.g. behind-the-scenes). |

### 2.7 `client` (document)

Pre-existing, for the homepage "Selected Clients" marquee (logos currently still
use a local placeholder; not yet wired to the marquee component).

| Field | Type | Notes |
|---|---|---|
| `name` | string | **Required.** |
| `logo` | image | **Required.** |
| `url` | url | Optional. |
| `order` | number | Marquee position. |

---

## 3. GROQ queries

All in `apps/web/src/lib/sanity/queries.ts`. Project queries expect
`{ locale, fallbackLocale }`, usually from `localeParams(locale)`. Shared
fragments:

- **localized helpers** — resolve `{ it, en }` fields to the requested locale
  with fallback.
- **image fragment** — localized `alt`, `hotspot`, `crop`, and `asset->{ _id,
  url, metadata { dimensions, lqip } }`.
- **media item fragment** — `_key`, `mediaType`, `image`, `videoUrl`,
  `videoFile.asset->{ url, mimeType }`, `poster`, `caption`.
- **media section fragment** — `_key`, `placement`, `internalLabel`,
  `layout`, `mediaItems[]`.
- **list fields** — `_id`, `title`, `subtitle`, `slug.current`, `year`,
  `categories`, `excerpt`, `coverImage`, `featured`.

Queries:

| Name | Purpose |
|---|---|
| `clientsQuery` | All clients, ordered by `order`. |
| `projectsListQuery` | All projects (`order asc, year desc`) — list fields only. Used by the projects list page. |
| `featuredProjectsQuery` | Same as above but `featured == true`. Used by the homepage grid. |
| `projectBySlugQuery` | One full project by `$slug` — list fields + titleGraphic, season, roles, heroMedia, the text sections, credits, and `projectContentSections[]`. |
| `projectSlugsQuery` | All slug strings, for `generateStaticParams`. |

Helpers: `categoryLabel(value, labels)`, `CATEGORY_ORDER`,
`getCategoryOptions(projects, labels)` (derives filter options from categories
actually used, in canonical order).

---

## 4. Frontend rendering

### 4.1 Images

- `<SanityImage>` wraps `next/image`. It uses the asset's intrinsic dimensions,
  an LQIP blur placeholder, and hotspot-aware `object-position`. Supports
  `fill` mode and intrinsic (width/height) mode.
- Returns `null` if the image has no asset, so callers never crash on missing
  media. `hasImageAsset()` guards optional images.
- `cdn.sanity.io` is allowlisted in `next.config.ts`.

### 4.2 Projects list page (`/[locale]/projects`)

- Server component fetches `projectsListQuery`.
- Delegates to `<ProjectsListing>` (client) which:
  - builds category filter buttons from `getCategoryOptions(projects)` — a
    button only appears if at least one project uses that category;
  - filters by selected category (a project matches if its `categories`
    **includes** the selected value — multi-category aware);
  - "All" resets; clicking the active category clears it;
  - shows "No projects yet." / "No projects in this category." empty states.
- `revalidate = 60`.

### 4.3 Project detail page (`/[locale]/projects/[slug]`)

`generateStaticParams` over all locales × slugs. `revalidate = 60`. The single
`projectContentSections` array is split by `placement` via
`sectionsAt(sections, placement)`. Render order:

1. **Hero** — `heroMedia` (image or video) full-bleed; falls back to `coverImage`.
2. **Title block** — title + subtitle, `titleGraphic` beside it (stacks on mobile).
3. **Meta** — category chips + `season` + `year`.
4. **Roles / Services** — labeled chip list (if any).
5. **Challenge** (yellow label)
6. **Concept** (blue label)
7. **Media — `afterConcept`**
8. **Process** (yellow label)
9. **Responsibilities** (blue label, list)
10. **Media — `afterResponsibilities`**
11. **Outcome** (yellow label)
12. **Media — `afterOutcome`**
13. **Credits**
14. **Behind the Scenes** — fixed heading from the app dictionary; only shown if its zone has media
15. **Media — `behindTheScenes`**
16. Back-to-projects link + footer.

Each media zone is a `<MediaZone>` that renders nothing when empty. Fixed
section labels come from the project dictionary and use the `HighlightText`
underline component (yellow/blue alternating).

### 4.4 Homepage featured grid (`/[locale]/page.tsx`)

- Fetches `featuredProjectsQuery` (`featured == true`).
- Renders the existing projects grid markup (3-col at `lg`, hover scale +
  grayscale→color + mix-blend title) with cover images, linking to each
  `/projects/[slug]`. Styling unchanged from the original static version.
- Tick **Featured** on a project in Studio → it appears here.

---

## 5. Design system

- The project pages reuse existing tokens/utilities only (`page-shell`,
  `section-y*`, `grid-gap-*`, typography `type-*`, color tokens, `pill-button`,
  `HighlightText`). **No new design tokens were added.**
- See `apps/web/DESIGN_SYSTEM.md` for the token rules. Layout-specific one-offs
  (image aspect ratios, the list grid template, masonry margins) are allowed per
  that doc.

---

## 6. Editor workflow (how to build a project in Studio)

The project form is split into tabs (**Info & cover / Copy / Media / Credits /
Settings**). A **language toggle** in the toolbar (via `@sanity/language-filter`)
lets editors show one language at a time, so the IT + EN inputs aren't all
visible at once. The toggle only affects `localizedString` / `localizedText`
fields.

1. Create a **Project**. Fill localized title (`it` and/or `en`), slug, year,
   season, categories, localized roles, localized excerpt, cover image.
   Optionally add a title graphic and hero media.
2. Write localized Challenge / Concept / Process / Outcome and localized
   Responsibilities.
3. Under **Media sections**, click **+ Add item** to append one media layout.
   For each media layout: pick a numbered **Placement**, optionally add an
   **Internal label** for backend organization, pick a **Layout**, then add
   image/video items. Repeat for as many media layouts as you want — there is
   no limit.
4. Reorder sections by dragging; sections with the same placement keep their
   relative order.
5. Add **Credits** rows.
6. Tick **Featured** to surface it on the homepage. Set **Order** to control
   list position.
7. Publish. The site revalidates within ~60s.

---

## 7. Constraints / conventions

- Do **not** seed or hardcode project content; all content is editor-managed.
- Do **not** model media as fixed slots — keep the single repeatable
  `projectContentSections` array with per-section `placement`.
- Use `_key` as the React key for object arrays (media sections, items, credits).
- Keep the project system focused — it is **not** a generic site-wide page
  builder.
- Verification commands: `npm run typecheck:web`, `npm run build:web`,
  `npm run build:studio`.
