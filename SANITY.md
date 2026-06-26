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
- **Content is uploaded manually in Studio.** Nothing is seeded or hardcoded.
  Schema migrations live under `apps/studio/migrations/` when field names or
  shapes need to change. The frontend renders whatever exists in Sanity, and
  degrades gracefully to empty states when there is none.
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
- `homePage.ts` — `homePage` singleton document for homepage editorial copy
- `servicesPage.ts` — `servicesPage` singleton document for services editorial copy
- `aboutPage.ts` — `aboutPage` singleton document for About page editorial sections
- `person.ts` — `person` document list for People grid members
- `project.ts` — `project` document
- `objects/localizedString.ts` — short `{ it, en }` text object
- `objects/localizedText.ts` — long `{ it, en }` plain-text object
- `objects/localizedRichText.tsx` — `{ it, en }` Portable Text (Bold / Italic /
  Highlight marks with colour + animation type)
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
- `components/ui/page-rich-text.tsx` — `<PageRichText>` (Sanity value or
  dictionary fallback); shared by home / services / about pages
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
| `clientName` | `localizedString` | **Required.** Client / brand name, localized `{ it, en }`. |
| `projectName` | `localizedString` | Optional project name shown under the client, e.g. `The Perfect Alliance`. |
| `titleGraphic` | image (`+ localized alt`) | Optional. Small badge / logo / illustration shown beside the title. **Image only** — not the hero, not a media section, no video. Hotspot enabled. |
| `slug` | slug | **Required.** Source = `clientName + projectName`. Used in the URL. |
| `year` | string | e.g. `2025`. Used for ordering and the listing. |
| `season` | string | e.g. `FW 23/24`, `SS 25`. Collection period. |
| `categories` | array of string | **Multi-select** from a fixed list (see 2.5). Drives the list-page filter. |
| `roles` | array of `localizedString` | e.g. Creative Direction, Visual Identity, Product Development. |
| `excerpt` | `localizedText` | Short summary for the listing page. |
| `coverImage` | image (`+ localized alt`) | **Required.** Used on the listing + homepage grid, and as hero fallback. Hotspot enabled. |
| `heroMedia` | `projectMediaItem` | Optional. Large image **or** video at the top of the detail page. |
| `challenge` | `localizedRichText` | Fixed text section. Bold / italic / highlight. |
| `concept` | `localizedRichText` | Fixed text section. Bold / italic / highlight. |
| `process` | `localizedRichText` | Fixed text section. Bold / italic / highlight. |
| `responsibilities` | array of `localizedString` | e.g. Material Research, Prototype Development. |
| `outcome` | `localizedRichText` | Fixed text section. Bold / italic / highlight. |
| `credits` | array of `projectCredit` | Repeatable credit rows. |
| `projectContentSections` | array of `projectMediaSection` | **The single media list.** Each section picks its own `placement` (see 2.2). |
| `featured` | boolean | If true, shows in the homepage projects grid. Default false. |
| `order` | number | Lower = first in the listing. |

Orderings: Manual order (`order asc`), Year newest first (`year desc`).
Preview: `clientName: projectName` + `season · year` + cover image.

**SEO rule:** `clientName` is the client / brand name and `projectName` is the
project name. The project detail page combines both for the HTML `<title>` and
keeps both inside the main H1, so the page remains descriptive for search
engines while the Studio fields stay editorially clear.

**Field migration (done):** older project documents used `title` for the client
and `subtitle` for the project name. The rename migration has been run on
`production` (verified: every project has `clientName`, none still has `title`),
so the GROQ `clientName→title` / `projectName→subtitle` fallback has been
**removed** — queries now read `clientName` / `projectName` directly. The
migration script remains for other datasets:

```bash
npm run migrate:project-fields
npm run migrate:project-fields:write
```

**Rich text (`localizedRichText`):** challenge / concept / process / outcome are
Portable Text with Bold (`strong`), Italic (`em`), quick Highlight colour
decorators.

For highlighting, editors select text and click one of the quick Evidenziato
colour buttons. `S` icons use the `scroll` animation; `L` icons use the `load`
animation:

| Mark | Frontend mapping |
|---|---|
| `highlightYellow` | `RichTextToken.highlight = "yellow"`, `trigger = "scroll"` |
| `highlightPink` | `RichTextToken.highlight = "pink"`, `trigger = "scroll"` |
| `highlightBlue` | `RichTextToken.highlight = "blue"`, `trigger = "scroll"` |
| `highlightCoral` | `RichTextToken.highlight = "coral"`, `trigger = "scroll"` |
| `highlightOrange` | `RichTextToken.highlight = "orange"`, `trigger = "scroll"` |
| `highlightLoadYellow` | `RichTextToken.highlight = "yellow"`, `trigger = "load"` |
| `highlightLoadPink` | `RichTextToken.highlight = "pink"`, `trigger = "load"` |
| `highlightLoadBlue` | `RichTextToken.highlight = "blue"`, `trigger = "load"` |
| `highlightLoadCoral` | `RichTextToken.highlight = "coral"`, `trigger = "load"` |
| `highlightLoadOrange` | `RichTextToken.highlight = "orange"`, `trigger = "load"` |

On the frontend `<PortableRichText>`
(`components/ui/portable-rich-text.tsx`) maps each span to a `RichTextToken` and
renders through `StructuredRichText` / `HighlightText`. It also tolerates a
legacy plain string (content authored before these fields became rich text), so
old projects keep rendering until re-authored.

> **Migration note:** projects created while these fields were plain
> `localizedText` still hold strings. Studio now shows them as rich text, so the
> old copy must be **re-entered** in the rich-text editor to gain formatting and
> highlight colour controls.
> The site keeps showing the old plain text until then.

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
| `caption` | `localizedString` | Optional caption under the media. Hidden when the item is the project `heroMedia` (single object field has no `_key`); only array media items show it. |

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

Pre-existing, for the homepage "Selected Clients" marquee. The homepage reads
these documents through `clientsQuery`; each logo renders from Sanity's CDN URL.

| Field | Type | Notes |
|---|---|---|
| `name` | string | **Required.** |
| `logo` | image | **Required.** |
| `url` | url | Optional. |
| `order` | number | Marquee position. |

### 2.8 `homePage` (singleton document)

The homepage keeps UI labels in the app dictionary, but editorial copy lives in
Sanity. Editors open **Homepage** in Studio; the document ID is fixed as
`homePage` by the Studio structure.

| Field | Type | Notes |
|---|---|---|
| `heroKicker` | `localizedRichText` | Small text in the hero. |
| `heroTitle` | `localizedRichText` | Main homepage hero title. |
| `heroSubheading` | `localizedRichText` | Homepage hero subtitle. |
| `mission` | `localizedRichText` | Main homepage mission paragraph. |
| `potentialTitle` | `localizedRichText` | Large title above the method steps. |
| `methodSteps` | array of objects | Ordered method steps. Each step has a localized `title` and localized `items`. |
| `methodologyLabel` | `localizedRichText` | Label before the methodology paragraph. |
| `methodology` | `localizedRichText` | Methodology body text. |
| `projectsTitle` | `localizedRichText` | Featured projects section title. |
| `selectedClients` | `localizedRichText` | Selected clients section title. |
| `teamTitle` | `localizedRichText` | People section title. |
| `teamIntro` | `localizedRichText` | People section body text. |

Current dictionary values were seeded into Sanity with:

```bash
npm run seed:home-page
npm run seed:home-page:write
```

The frontend reads Sanity first and falls back to the dictionary if a field is
missing, so content can be migrated field by field without breaking the page.
Because these fields are now maintained in Sanity, their dictionary entries use
short, obvious `Placeholder ...` fallbacks that preserve the expected shape.

### 2.9 `servicesPage` (singleton document)

The services page keeps its editorial copy in the `servicesPage` singleton.
Sanity controls the page title, accordion text, statements, detail lists,
media images, gallery labels, gallery images, and collaboration copy. Missing
local image fallbacks use the shared `/placeholder-image.png` asset.

| Field | Type | Notes |
|---|---|---|
| `title` | `localizedRichText` | Main services page title. |
| `items` | array of service objects | Ordered services accordion. Each item has `number`, localized `title`, `variant`, and variant-specific fields. |
| `items[].previewImage` | image (`+ localized alt`) | Image shown in the collapsed service header (all variants). Local `/placeholder-image.png` is the fallback if empty. |
| `items[].detailGroups` | array of objects | Used by structured services. Each group has a rich-text title and `itemsText` (`localizedText`): write one item per line. Older `items[]` arrays are still read as fallback. |
| `items[].detailsText` | `localizedText` | Used by media services for the uppercase details list: write one detail per line. Older `details[]` arrays are still read as fallback. |
| `items[].media` | object | Used by media services. Contains uploaded `image` and localized `alt`; local `/placeholder-image.png` is the fallback if empty. |
| `items[].statement` | `localizedRichText` | Statement for the service item. In the first structured service this renders the yellow highlighted statement block; media/gallery services render it inside their own expanded layout. |
| `items[].statementImage` | image (`+ localized alt`) | Used by structured services for the image beside the yellow highlighted statement block. Local `/placeholder-image.png` is the fallback if empty. |
| `items[].gallery` | array of objects | Used by gallery services. Each item has localized `label`, uploaded `image`, and localized `alt`. |
| `collaborationTitle` | `localizedRichText` | Collaboration section title. |
| `collaboration` | `localizedRichText` | Collaboration section body. |

Current dictionary values were seeded into Sanity with:

```bash
npm run seed:services-page
npm run seed:services-page:write
```

The frontend reads Sanity first and falls back to the dictionary if a field is
missing. Because these fields are now maintained in Sanity, their dictionary
entries use short, obvious `Placeholder ...` fallbacks that preserve the
expected shape.

### 2.10 `aboutPage` (singleton document)

The About page editorial sections are modelled in the `aboutPage` singleton.
Document ID fixed as `aboutPage`. The dictionary entries for these fields are
short, obvious `Placeholder ...` fallbacks only.

| Field | Type | Notes |
|---|---|---|
| `title` | `localizedRichText` | About page title (e.g. "ABOUT THE AGENCY"). |
| `intro` | `localizedRichText` | Intro paragraph under the title. |
| `heroImage` | image (`+ localized alt`) | Full-width blurred image under the intro. Local `/placeholder-image.png` is the fallback. |
| `statement` | `localizedRichText` | Yellow statement section. |
| `teamCoreTitle` | `localizedString` | Team core heading. |
| `coreRoles` | array of objects | Team core hover list. Each item has localized `role` and uploaded hover `image`. Local `/placeholder-image.png` is the fallback. |
| `processTitle` | `localizedString` | Process section heading. |
| `processSteps` | array of objects | Ordered process steps. Each item has localized `stage`, localized `description`, and a `color` from the fixed process palette (`pink`, `deepBlue`, `yellow`, `coral`, `blue`, `orange`). |
| `missionTitle` | `localizedString` | Mission section heading. |
| `mission` | `localizedRichText` | Mission body copy. |
| `missionImage` | image (`+ localized alt`) | Mission image. Local `/placeholder-image.png` is the fallback. |
| `missionHighlight` | `localizedRichText` | Large highlighted mission line. |
| `historyTitle` | `localizedRichText` | History/value section heading. |
| `historyImage` | image (`+ localized alt`) | History/value image. Local `/placeholder-image.png` is the fallback. |
| `historyItems` | array of objects | Ordered history/value items. Each item has localized `label`, `year`, and localized rich-text `description`. |
| `peopleTitle` | `localizedString` | "PEOPLE" heading. |

### 2.11 `person` (document list)

People are managed as independent `person` documents, listed in Studio under
**People**. This keeps member ordering, photos, and roles maintainable like the
project/client lists.

| Field | Type | Notes |
|---|---|---|
| `name` | string | Person name. |
| `role` | `localizedString` | Role shown under the name. |
| `photo` | image (`+ localized alt`) | Portrait shown in the People grid. Local `/placeholder-image.png` is the fallback. |
| `order` | number | Controls ordering; lower numbers render first. |

The About page reads `aboutPageQuery` plus `peopleQuery`, then falls back to the
`about` dictionary field-by-field. The current dictionary values were seeded
into Sanity with:

```bash
npm run seed:about-page
npm run seed:about-page:write
```

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
- **list fields** — `_id`, `clientName`, `projectName`, `slug.current`, `year`,
  `categories`, `excerpt`, `coverImage`, `featured`.

Queries:

| Name | Purpose |
|---|---|
| `clientsQuery` | All clients, ordered by `order`. |
| `servicesPageQuery` | Services page singleton content. Used by `/[locale]/services`. |
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
2. **Title block** — client name + project name, `titleGraphic` beside it (stacks on mobile).
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
visible at once. The toggle affects localized fields, including
`localizedString`, `localizedText`, and `localizedRichText`.

1. Create a **Project**. Fill localized client / brand name (`clientName`), optional
   project name (`projectName`), slug, year, season, categories, localized roles,
   localized excerpt, and cover image. Optionally add a title graphic and hero
   media.
2. Write localized Challenge / Concept / Process / Outcome in the rich-text
   editor. Use Bold / Italic decorators as needed; select text and click an
   **Evidenziato** colour button for highlights. Highlights use the default
   `scroll` animation. Add localized Responsibilities.
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
