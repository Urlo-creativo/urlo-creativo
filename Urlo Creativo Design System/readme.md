# Urlo Creativo — Design System

A design system for **Urlo Creativo**, a multidisciplinary creative studio based in
Milan (*Via Barona 25, 20142 — Milano*). The studio works across **brand identity,
design, product development and art direction**, describing itself as *"a flexible
network of professionals working together depending on each project"* — and, notably,
*"proudly powered by women."*

This system captures the studio's Swiss-editorial visual language so any agent can
produce on-brand interfaces, decks, and assets.

---

## Sources

This system was reverse-engineered from the studio's own design files. If you have
access, explore them to go deeper:

- **Figma:** *"URLO CREATIVO — LANDING PAGE"* (the full landing-page + prototype file:
  Home, Services, Projects, About Us, Contact, plus personas, wireframes and research).
  The `PROTOTYPE-FINAL` and `Website-Design` pages are the most finished.
- **GitHub:** <https://github.com/Yuwei-pacific/urlo-creativo> — the production repo
  (currently a placeholder README; the Figma file is the source of truth). The team's
  stack is **Next.js (App Router) + TypeScript + Tailwind + shadcn/ui + Sanity CMS**, so
  these tokens are written as CSS custom properties that map cleanly onto a Tailwind
  theme.

> Don't assume the reader has access to the above — everything needed to design on-brand
> is captured in this project.

---

## Index

| Path | What |
|------|------|
| `styles.css` | Global entry — `@import`s every token + font file |
| `tokens/` | `colors.css`, `typography.css`, `spacing.css`, `fonts.css` |
| `components/` | Reusable React primitives (see the manifest below) |
| `ui_kits/website/` | Full click-through recreation of the marketing site (Home · Services · Projects · About · Contact) |
| `assets/` | Logo (mark + wordmark), client-logo bundle, project & team imagery |
| `guidelines/` | Foundation specimen cards (rendered in the Design System tab) |
| `SKILL.md` | Agent-Skill manifest for downloadable use |

### Component manifest

| Component | Group | Role |
|-----------|-------|------|
| `Logo` | brand | O-mark + URLO CREATIVO wordmark / lockup |
| `Button` | core | The house pill — outline / solid / ghost |
| `Tag` | core | Small meta pill — outline / fill / muted |
| `Highlight` | core | The signature marker accent — fill / underline / coloured |
| `SectionTitle` | core | Big caps headline with an italic accent word |
| `NavBar` | navigation | Floating pill site navigation |
| `ProcessBar` | content | The "HOW WE WORK" coloured stage bar |
| `ProjectCard` | content | B&W portfolio item, bold caption, muted year |
| `ServiceRow` / `ServiceItem` | content | Numbered, hairline-ruled, expandable service row |
| `TeamMember` | content | B&W portrait, caps name, muted role |
| `ContactFooter` | content | Full-bleed yellow contact panel |

Each component ships a sibling `.d.ts` (props contract) and `.prompt.md` (usage + example).
The Design System tab renders specimen cards from `guidelines/` and each component directory.

---

## Brand essence

Urlo Creativo (lit. *"creative scream/howl"*) is loud in confidence, quiet in
decoration. The work looks like a contemporary Milanese design studio's portfolio:
huge bold grotesque type, paper-white backgrounds, generous margins, real photography
in black-and-white, and one playful signal — a **pale highlighter yellow** — used like
a marker pen over key words. Tagline thinking: **"Every brand has a *potential*."**

---

## CONTENT FUNDAMENTALS

**Voice — confident, plain-spoken, "we".** Copy is written in first-person plural about
the studio and what it does for the client: *"we start by understanding each brand's
context… we then define a clear positioning…"*. It is declarative and unhedged.

**Casing is a design tool.** Big statements and section labels are **ALL-CAPS** (`COMING
SOON`, `PROJECTS`, `SELECTED CLIENTS`, `CONTACT`, `PEOPLE`, `SERVICES`). Body and
sub-labels are sentence case. Service rows are numbered + caps: `01 BRAND IDENTITY &
COMMUNICATION`. Methodology steps are numbered: `1.IDENTIFY`, `2.DEFINE`, `3.EXPRESS`.

**Emphasis by weight, not italics… except for one move.** Within body copy, key phrases
are **bolded** (`brand's context`, `multidisciplinary`, `project's needs`). The single
recurring stylistic flourish is an **italic accent word** dropped into an otherwise
upright caps headline: `EVERY BRAND HAS A `*`POTENTIAL`* and `SELECTED `*`CLIENTS`*.

**No emoji. No exclamatory marketing fluff.** The tone is studio-professional, a touch
poetic ("*we love brands with personality… we dig deep to bring it to the surface*"),
bilingual-adjacent (Italian address, the `IT` language toggle in the nav).

**Representative copy**
- *"Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the
  full potential of brands. A flexible network of professionals working together
  depending on each project."*
- *"We love brands with personality. This is why we dig deep to bring it to the surface."*
- *"We develop ideas through words and images."*
- Section words: `EVERY BRAND HAS A POTENTIAL`, `METHODOLOGY`, `MISSION`,
  `TEAM CORE`, `HOW WE WORK`, `HISTORY/VALUE`, `GET IN TOUCH`, `Book a consultation`.

---

## VISUAL FOUNDATIONS

**Colour.** A warm paper white (`#fefdf9`) ground, near-black ink (`#000`/`#0f0f0f`) for
type, and a precise gray ladder for secondary text (workhorse `#707070`). The brand's
one true accent is **highlighter yellow `#efebab`** — used three ways: full-bleed
section panels (the client strip and contact footer sit on it), and as a marker
underline or text-highlight behind a single word. A second, softer set of pastels comes
straight from the studio's *process diagram* — pink, sky blue, deep blue, sage, coral,
orange — used as small stage-colour swatches and the occasional inline word-highlight
(blue behind "identify", pink behind "personality"). Accents are always low-saturation
and never gradient.

**Type.** One family: **Helvetica** (we ship metric-compatible **Arimo** as the webfont).
Bold grotesque does nearly all the work, at a few decisive sizes — `96px` display,
`36px` section statements, `24px` leads, `16px` body. Leading is locked to **100%** on
display type; tracking is a hair positive (~`0.02em`). The lone variation is the
**oblique/italic** of the same face used for accent words.

**Layout.** A 1440-wide canvas with a signature **~138px side gutter**. Long single-column
editorial flow; sections are tall and breathe. Left-aligned is the house default (the
final landing direction is literally named "LEFT-ALIGNED — FINAL"). A fixed **pill nav
bar** floats at the top centre.

**Imagery.** Real photography, frequently **black-and-white** or desaturated — fashion/
product shoots, team portraits, sport collabs (Kappa×Ducati, Colmar, Rossignol). Images
are placed as **sharp-cornered rectangles, no radius, no shadow**, often gridded 3-up.
A signature treatment: a **heavily blurred** group photo used as soft texture behind the
"PEOPLE" sections.

**Backgrounds & texture.** Mostly flat paper white. The yellow panel is the only
full-bleed colour field. No patterns, no noise, no gradients. A hero video sits behind
the home headline.

**Corners, borders, elevation.** Corners are **sharp (0px)** everywhere except the
**fully-round pill** (radius 130px) used for buttons and tags. Borders are solid ink —
hairline rules between service rows, a 2px ink ring around outline buttons. There are
**no drop shadows**; "elevation" is expressed as a 2px **inset ink outline**.

**Motion & states.** Restrained. Transitions are short fades/slides on an ease-out curve.
Hover on an outline pill **fills with ink** (text flips to paper); hover on a nav item
underlines or darkens. Press states nudge opacity rather than bouncing. Nothing loops.

**Cards.** There is no heavy "card" chrome — a project "card" is just a sharp image with
a bold caption and a muted year beneath it. Restraint is the system.

---

## ICONOGRAPHY

Urlo Creativo is **near-iconless** — the visual system leans on type, photography and the
yellow accent rather than UI icons. What exists:

- **Logo:** an `O`-pictogram (two overlapping discs forming a crescent/eye) paired with a
  serif-flavoured `URLO CREATIVO` wordmark. Both are in `assets/` as PNG
  (`logo-mark.png`, `logo-wordmark.png`). Use the wordmark in headers; the mark alone as
  a compact nav glyph.
- **Bullet:** the middle-dot `•` separates tagline phrases (`brand identity • design •
  product development • art direction`).
- **Social:** plain **text links** ("Instagram", "LinkedIn") — no platform glyphs in the
  finished pages (the Figma library does contain a full social-icon set if needed).
- **Client logos:** real partner marks (Colmar, Velasca, OVS, Kappa, Ducati, Rossignol)
  ride the yellow strip. They're materialized from Figma into
  `assets/clients/Components.bundle.js` (`window.Component1` renders the strip).

When a UI genuinely needs functional icons (arrows, menu, close), use a **thin
monoline** set — **Lucide** (`https://unpkg.com/lucide-static`) at ~1.5px stroke is the
closest CDN match to the studio's hairline aesthetic. Flagged as a substitution; the
studio's own pages use almost none. No emoji, ever.

---

## Substitutions to confirm

- **Helvetica → Arimo** (metric-compatible). Drop in a licensed Helvetica Neue web kit
  for production if the studio owns one.
- **Functional icons → Lucide** (thin monoline) where the brand provides none.
