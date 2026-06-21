# Urlo Creativo Web Design System

This file is the source of truth for design-system decisions in `apps/web`.
Agents working on pages or components must read this file before making UI
changes.

## Core Rule

Use existing design tokens and utilities first. Do not introduce new arbitrary
Tailwind values unless the design requires a true one-off from Figma.

Good:

```tsx
<main className="page-top bg-paper text-black">
<h1 className="type-display font-bold uppercase">
<section className="section-y bg-yellow">
<p className="type-body-lg text-[var(--color-text-muted)]">
```

Avoid unless justified:

```tsx
<h1 className="text-[clamp(57px,7.2vw,101px)] leading-[0.98]">
<section className="md:py-[173px]">
<div className="max-w-[997px]">
<div className="bg-[#efebab]">
```

## Typography

Typography utilities live in `src/app/globals.css` under `@layer components`.

Available utilities:

- `type-display-xl` — `font-size: clamp(56px, 8vw, 112px)`;
  `line-height: 1`; `font-weight: 400`; `letter-spacing: 0`.
  Reserved for the homepage hero or an intentionally oversized hero moment.
- `type-display` — `font-size: clamp(52px, 6.7vw, 96px)`;
  `line-height: 1`; `font-weight: 400`; `letter-spacing: 0`.
  Used for page H1 and major section headings.
- `type-heading-xl` — `font-size: clamp(28px, 3.2vw, 50px)`;
  `line-height: 1.06`; `font-weight: 400`; `letter-spacing: 0`.
  Used for mid-large headings and highlighted statements.
- `type-heading-md` — `font-size: clamp(20px, 2.4vw, 36px)`;
  `line-height: 1.08`; `font-weight: 400`; `letter-spacing: 0`.
  Used for card titles, method titles, and compact section labels.
- `type-body-xl` — `font-size: clamp(22px, 2.5vw, 36px)`;
  `line-height: 1.2`; `font-weight: 400`; `letter-spacing: 0`.
  Used for lead paragraphs and large editorial body text.
- `type-body-lg` — `font-size: clamp(18px, 1.9vw, 28px)`;
  `line-height: 1.4`; `font-weight: 400`; `letter-spacing: 0`.
  Used for large body text, people names, and footer/contact copy.
- `type-body-md` — `font-size: 16px`; `line-height: 1.5`;
  `font-weight: 400`; `letter-spacing: 0`. Used for default body text.
- `type-body-sm` — `font-size: clamp(13px, 1vw, 16px)`;
  `line-height: 1.3`; `font-weight: 400`; `letter-spacing: 0`.
  Used for small labels, metadata, and descriptions.
- `type-caption` — `font-size: clamp(10px, 0.9vw, 13px)`;
  `line-height: 1.1`; `font-weight: 400`; `letter-spacing: 0`.
  Used for compact labels.
- `type-nav` — `font-size: 16px`; `line-height: 1`;
  `font-weight: 400`; `letter-spacing: 0`. Used for header navigation.

Mobile overrides below `md` are also tokenized in `src/styles/tokens.css` and
applied from `src/app/globals.css`:

- `--mobile-type-display-xl: clamp(48px, 16vw, 64px)`
- `--mobile-type-display: clamp(42px, 14vw, 56px)`
- `--mobile-type-heading-xl: clamp(26px, 8vw, 34px)`
- `--mobile-type-heading-md: clamp(20px, 6.4vw, 26px)`
- `--mobile-type-body-xl: clamp(21px, 6.1vw, 28px)`

These mobile caps keep editorial headings readable on 390px-class screens.
Do not add page-specific mobile heading sizes unless a specific word or phrase
still fails to fit.

Typography tokens are rhythm-only:

- They define font size, line height, and letter spacing.
- They default to regular weight.
- They do not encode `font-bold`, `uppercase`, or `italic`.

Emphasis belongs at the call site or in structured content:

```tsx
<h2 className="type-display font-bold uppercase">Projects</h2>
<p className="type-body-lg italic">2026</p>
```

For structured rich text, use dictionary token flags:

```ts
{ text: "Urlo Creativo", bold: true }
{ text: "POTENTIAL", italic: true, highlight: "yellow" }
```

Do not make `type-display` or `type-heading-*` bold by default. Do not add
`font-normal` hacks to cancel inherited bold; fix the parent class instead.

## Spacing

Spacing tokens live in `src/styles/tokens.css`. Spacing utilities live in
`src/app/globals.css`.

Available utilities:

- `page-top` — `padding-top: var(--space-page-top)`;
  `--space-page-top: clamp(154px, 14vw, 204px)`. Top offset for `<main>`
  under the fixed header.
- `section-y` — `padding-block: var(--space-section-y)`;
  `--space-section-y: clamp(80px, 9vw, 150px)`. Standard symmetric section
  padding.
- `section-y-sm` — `padding-block: var(--space-section-y-sm)`;
  `--space-section-y-sm: clamp(64px, 7vw, 120px)`. Compact symmetric section
  padding.
- `section-y-lg` — `padding-block: var(--space-section-y-lg)`;
  `--space-section-y-lg: clamp(96px, 12vw, 190px)`. Generous symmetric
  section padding.
- `stack-md` — `margin-top: var(--space-stack-md)`;
  `--space-stack-md: clamp(24px, 3vw, 48px)`. Medium block-to-block margin.
- `stack-lg` — `margin-top: var(--space-stack-lg)`;
  `--space-stack-lg: clamp(40px, 5vw, 80px)`. Large block-to-block margin.
- `grid-gap-md` — `gap: var(--space-grid-md)`;
  `--space-grid-md: clamp(32px, 4vw, 72px)`. Medium grid gap.
- `grid-gap-lg` — `gap: var(--space-grid-lg)`;
  `--space-grid-lg: clamp(48px, 6vw, 96px)`. Large grid gap.

Other spacing variables:

- `--space-stack-sm: 16px`
- `--mobile-space-page-top: 132px`
- `--mobile-space-section-y: 72px`
- `--mobile-space-section-y-sm: 56px`
- `--mobile-space-section-y-lg: 80px`

Use these for repeated section rhythm. Do not force asymmetric Figma sections
into symmetric tokens.

Acceptable one-offs:

- Distinct `pt`/`pb` section compositions from Figma.
- Image or overlay offsets.
- Animation reveal offsets.
- Responsive gaps that intentionally change across breakpoints.
- Existing Tailwind scale values like `mt-4`, `mt-8`, `gap-8` when they are
  simple local spacing.

## Page Layout

Layout tokens live in `src/styles/tokens.css`; layout utilities live in
`src/app/globals.css`.

Available utilities:

- `page-shell` — `width: min(100%, var(--page-max))`;
  `margin-inline: auto`; `padding-inline: var(--page-gutter)`;
  `--page-max: 1728px`; `--page-gutter: clamp(24px, 4.8vw, 96px)`.
  Primary page container.
- `max-w-content` — Tailwind utility backed by `--content-max: 1164px`.
- `text-measure` — `max-width: var(--layout-text-max)`;
  `--layout-text-max: 980px`. Canonical reading width.
- `text-measure-narrow` — `max-width: var(--layout-narrow-max)`;
  `--layout-narrow-max: 760px`. Narrow reading width.
- `media-portrait` — `aspect-ratio: var(--layout-aspect-portrait)`;
  `--layout-aspect-portrait: 357 / 440`. Shared portrait card ratio.
- `client-marquee-logo` — height is controlled by
  `--client-marquee-logo-height: 96px`; horizontal rhythm uses
  `--client-marquee-gap: 64px` and `--client-marquee-gap-md: 118px`.
  Used only for the Selected Clients marquee.

Use these before adding inline widths such as `max-w-[980px]` or
`aspect-[357/440]`.

Mobile layout token:

- `--mobile-page-gutter: 28px` — replaces `--page-gutter` below `md`.

Acceptable one-offs:

- Unique image ratios such as mission, history, or hero media.
- Header-specific grid templates.
- Project list-specific grid templates.
- Special Figma image sizing such as `w-[220px] md:w-[310px] lg:w-[360px]`.
- Card grids whose breakpoints/gaps intentionally differ.

Do not abstract a layout pattern just because it appears similar. Abstract only
when the value and behavior repeat without changing the design intent.

## Mobile Responsiveness

Mobile styles should preserve the editorial visual language while removing
hover-only dependencies and compressed multi-column layouts.

Current mobile rules:

- Below `md`, `page-shell`, `page-top`, and symmetric section spacing use the
  mobile tokens listed above.
- Below `md`, the largest typography utilities use the mobile type tokens
  listed above.
- Touch targets use `--touch-target-min: 44px`.
- `.pill-button` uses `--mobile-pill-button-x: 28px` for mobile horizontal
  padding.
- Hover-only reveals must have a readable mobile fallback. Examples:
  homepage project images are clear by default on mobile; About history text is
  visible by default on mobile; desktop hover/focus behavior starts at `md`.
- Dense desktop diagrams or rails should become direct stacked content on
  mobile. Examples: homepage method steps and About process steps.

When adding a mobile-only alternative, keep the desktop component behavior in
place at `md` and above, and prefer the same content/order rather than a
separate copy source.

## Colors

Raw palette and semantic color tokens live in `src/styles/tokens.css`.

Raw brand palette:

- `--uc-black: #000000`
- `--uc-white: #ffffff`
- `--uc-paper: #fefdf9`
- `--uc-paper-2: #fafafa`
- `--uc-yellow: hsla(56, 69%, 81%, 1)`
- `--uc-yellow-deep: #ebe48b`
- `--uc-pink: hsla(358, 58%, 80%, 1)`
- `--uc-blue: hsla(204, 39%, 70%, 1)`
- `--uc-blue-deep: hsla(212, 44%, 46%, 1)`
- `--uc-coral: hsla(10, 73%, 61%, 1)`
- `--uc-orange: #e2a14b` — sixth process step accent outside the client
  five-color palette.
- Gray scale:
  `--uc-gray-900: #3b3b3b`, `--uc-gray-800: #424242`,
  `--uc-gray-700: #595959`, `--uc-gray-600: #6b6b6b`,
  `--uc-gray-500: #707070`, `--uc-gray-400: #888888`,
  `--uc-gray-300: #c1c0c0`, `--uc-gray-200: #d9d9d9`,
  `--uc-gray-150: #e5e5e5`, `--uc-gray-100: #eaeaea`,
  `--uc-gray-50: #ebebeb`.

Semantic tokens include:

- `--color-bg-page: var(--uc-paper)`
- `--color-bg-muted: var(--uc-paper-2)`
- `--color-bg-inverse: var(--uc-black)`
- `--color-bg-section: var(--uc-yellow)`
- `--color-text-primary: var(--uc-black)`
- `--color-text-inverse: var(--uc-white)`
- `--color-text-muted: var(--uc-gray-600)`
- `--color-text-subtle: var(--uc-gray-500)`
- `--color-border-primary: var(--uc-black)`
- `--color-selection-bg: var(--uc-yellow)`
- `--color-selection-fg: var(--uc-black)`
- `--color-selection-on-yellow-bg: var(--uc-blue-deep)`
- `--color-selection-on-yellow-fg: var(--uc-white)`
- `--color-highlight-yellow: var(--uc-yellow)`
- `--color-highlight-pink: var(--uc-pink)`
- `--color-button-border: var(--uc-black)`
- `--color-button-text: var(--uc-black)`
- `--color-button-fill: var(--uc-yellow)` — CTA resting fill.
- `--color-button-fill-hover: var(--uc-pink)` — CTA two-tone hover fill.
- `--color-button-yellow: var(--uc-yellow)` — yellow toggle variant fill.
- `--color-button-pink: var(--uc-pink)` — pink toggle variant fill.
- `--color-button-blue: var(--uc-blue)` — blue toggle variant fill.
- `--color-button-neutral: var(--uc-black)` — neutral toggle variant fill.
- `--color-button-neutral-text: var(--uc-white)` — text on the neutral fill.
- `--color-hover-soft: rgba(0, 0, 0, 0.07)`
- `--color-nav-bg: rgba(235, 235, 235, 0.75)`
- `--color-rail-blue: var(--uc-blue-deep)`
- `--color-process-1: var(--uc-pink)`
- `--color-process-2: var(--uc-blue-deep)`
- `--color-process-3: var(--uc-yellow)`
- `--color-process-4: var(--uc-coral)`
- `--color-process-5: var(--uc-blue)`
- `--color-process-6: var(--uc-orange)`

Use semantic tokens for UI roles. Use raw palette tokens for decorative brand
accents only when the semantic role would be unclear.

Acceptable one-offs:

- Hero overlay gradients.
- Project image hover `mix-blend-difference`.
- Specific transparent hover opacities in navigation.
- Decorative category chips using raw palette colors.
- Specific image placeholder backgrounds.

Accessibility rules:

- Use black text on yellow, pink, blue, coral, and orange.
- Use white text on blue-deep.
- Do not use white text on coral, blue, or orange for normal-size copy.
- Selection on yellow sections must remain visible.

## Buttons

Pill buttons use `.pill-button` plus an optional color variant. The base is a
two-tone CTA; the color variants are monochrome toggles.

Interaction tokens:

- `--touch-target-min: 44px` — minimum interactive target height.
- `--pill-button-x: 32px` — default horizontal CTA/filter padding.
- `--mobile-pill-button-x: 28px` — mobile horizontal padding below `md`.

The base derives every fill from a single `--pill-button-color`. A color variant
sets that one variable (and overrides `--pill-button-fill-hover` to the same
value) so hover, selected, and resting fill share one color. Define a new
variant the same way — one color in, no per-state colors.

Available classes:

- `pill-button` — default CTA. Two-tone: resting fill `--color-button-fill:
  var(--uc-yellow)`, hover fill `--color-button-fill-hover: var(--uc-pink)`.
  Black text throughout. Used for links/CTAs, not toggles.
- `pill-button-yellow` — yellow toggle. `--color-button-yellow`, black text.
- `pill-button-pink` — pink toggle. `--color-button-pink`, black text.
- `pill-button-blue` — blue toggle. `--color-button-blue`, black text.
  (Black on brand blue, not white — white fails contrast.)
- `pill-button-neutral` — neutral toggle. `--color-button-neutral` (black) fill
  with `--color-button-neutral-text` (white) text. Used for an "All"/reset
  filter that must read distinct from the color categories.

Monochrome means hover *previews* the selected color: hovering shows the same
fill that selecting keeps. Only the base CTA is intentionally two-tone.

Button state logic (driven by `aria-pressed`):

- No selected state: black outline, transparent background.
- Hover/focus state: the fill animates open into the button (preview).
- Selected state: keep the fill extended with `aria-pressed="true"`.
- Cancel selection: remove `aria-pressed="true"` and let the fill retract.

Toggle buttons (filters) are `<button>` elements that own selection state in a
client component and set `aria-pressed`. CTAs are plain links with no variant.

Use:

```tsx
{/* CTA link */}
<a className="pill-button">Default</a>

{/* Toggle filters — see ProjectFilterButtons */}
<button className="pill-button pill-button-neutral" aria-pressed={selected}>All</button>
<button className="pill-button pill-button-yellow" aria-pressed={selected}>Yellow</button>
<button className="pill-button pill-button-pink" aria-pressed={selected}>Pink</button>
<button className="pill-button pill-button-blue" aria-pressed={selected}>Blue</button>
```

Do not create one-off button colors in page files. Add a semantic button token
and a named monochrome variant when a new brand button style repeats.

## Rich Text And Highlights

Use `StructuredRichText` for structured copy that needs bold, italic, or
highlight behavior.

Dictionary tokens may define:

```ts
{
  text: string;
  bold?: boolean;
  italic?: boolean;
  highlight?: "pink" | "yellow";
  trigger?: "scroll" | "load" | "static";
}
```

Highlight triggers:

- `scroll` — progress based on scroll position.
- `load` — reveal once when the element enters the viewport.
- `static` — highlight is visible immediately.

Highlight bars are unified through `.highlight-text`. Do not create one-off
highlight implementations unless the visual behavior is fundamentally different
from text highlighting.

The blue method/process rail is not a text highlight. Keep it separate.

## Motion

Prefer existing motion timing and transform-based animation:

- Use `transform` and `opacity`.
- Avoid `transition-all`.
- Keep image hover scale behavior consistent with existing project/history
  interactions.
- Respect existing reduced-motion behavior for highlights.

If adding a new repeated motion pattern, consider adding a motion token. If it
is a single Figma-specific interaction, keep it local.

## When To Add A New Token

Add or extend a token only when:

- The same value/pattern appears at least two or three times.
- The token expresses a clear design role.
- It reduces future inconsistency.
- It does not flatten intentional Figma differences.

Do not add a token just to remove every arbitrary value. Some one-offs are
intentional and should remain local.

## Required Checklist For Future Changes

Before editing:

1. Check whether an existing typography, spacing, layout, or color token covers
   the need.
2. Use semantic utilities before arbitrary Tailwind values.
3. Keep rich text emphasis in dictionary tokens where possible.
4. Preserve Figma-specific one-offs when they carry layout or animation intent.

After editing:

1. Run `npm run typecheck:web`.
2. Run `npm run build:web` for page-level or shared component changes.
3. Visually inspect affected pages at desktop and mobile widths when changing
   layout, color, typography, spacing, or motion.
