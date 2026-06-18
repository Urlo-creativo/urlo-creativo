---
name: urlo-creativo-design
description: Use this skill to generate well-branded interfaces and assets for Urlo Creativo (a multidisciplinary creative studio in Milan), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `readme.md` — full brand guide: voice, visual foundations, iconography, substitutions.
- `styles.css` — link this one file; it `@import`s every token + the Arimo webfont.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `components/` — React primitives (Button, Tag, Highlight, SectionTitle, NavBar, ProcessBar, ProjectCard, ServiceRow, TeamMember, ContactFooter, Logo). Each has a `.prompt.md` with usage.
- `ui_kits/website/` — full click-through site recreation (Home, Services, Projects, About, Contact).
- `assets/` — logo (mark + wordmark), client-logo bundle, B&W project & team imagery.
- `guidelines/` — foundation specimen cards.

## Non-negotiables
- One typeface: **Helvetica** (ship **Arimo** as the webfont fallback). Bold grotesque, ~100% leading, ~0.02em tracking.
- Warm paper-white ground `#fefdf9`; near-black ink; the signature **highlighter yellow `#efebab`** used as panels and marker accents — sparingly.
- **Sharp corners** everywhere except the fully-round **pill** (buttons/tags). No drop shadows — "elevation" is a 2px inset ink ring.
- B&W / desaturated photography, no radius, no shadow. ALL-CAPS for big statements; one **italic accent word** per headline.
- No emoji. Almost no UI icons (the system leans on type + the yellow accent).
