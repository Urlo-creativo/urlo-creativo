import { defineArrayMember, defineField, defineType } from "sanity";

const LAYOUT_VARIANTS = [
  { title: "Collage a una colonna / One-column collage", value: "oneColumnCollage" },
  { title: "Griglia a due colonne / Two-column grid", value: "twoColumnGrid" },
  { title: "Masonry / Masonry", value: "masonry" },
  {
    title: "Griglia compatta a tre colonne / Compact three-column grid",
    value: "compactThreeColumnGrid",
  },
] as const;

const PLACEMENT_OPTIONS = [
  { title: "1. Dopo Concept / After Concept", value: "afterConcept" },
  {
    title: "2. Dopo Responsabilita / After Responsibilities",
    value: "afterResponsibilities",
  },
  { title: "3. Dopo Risultato / After Outcome", value: "afterOutcome" },
  { title: "4. Behind the Scenes / Behind the Scenes", value: "behindTheScenes" },
] as const;

const LAYOUT_TITLES: Record<string, string> = Object.fromEntries(
  LAYOUT_VARIANTS.map((variant) => [variant.value, variant.title]),
);

const PLACEMENT_TITLES: Record<string, string> = Object.fromEntries(
  PLACEMENT_OPTIONS.map((option) => [option.value, option.title]),
);

/**
 * A repeatable, reorderable visual section in the project body flow.
 * A project holds any number of these in a single `projectContentSections`
 * array; each section chooses where on the page it renders via `placement`.
 */
export const projectMediaSectionType = defineType({
  name: "projectMediaSection",
  title: "Sezione media / Media section",
  type: "object",
  fields: [
    defineField({
      name: "placement",
      title: "Posizione nella pagina / Placement",
      type: "string",
      description:
        "Scegli dove mostrare questa sezione nella pagina progetto. / Choose where this media section renders.",
      options: {
        list: [...PLACEMENT_OPTIONS],
        layout: "radio",
      },
      initialValue: "afterConcept",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalLabel",
      title: "Etichetta interna / Internal label",
      type: "string",
      description:
        "Solo per organizzare il backend; non viene mostrata sul sito. / For Studio organization only; not shown on the website.",
    }),
    defineField({
      name: "layout",
      title: "Tipo di griglia / Layout variant",
      type: "string",
      options: {
        list: [...LAYOUT_VARIANTS],
        layout: "radio",
      },
      initialValue: "twoColumnGrid",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaItems",
      title: "Elementi media / Media items",
      type: "array",
      // Grid layout shows thumbnails so editors can scan and drag-reorder
      // many images visually instead of reading a vertical list.
      options: { layout: "grid" },
      of: [defineArrayMember({ type: "projectMediaItem" })],
      validation: (Rule) =>
        Rule.min(1).error(
          "Aggiungi almeno un elemento media. / Add at least one media item.",
        ),
    }),
  ],

  preview: {
    select: {
      internalLabel: "internalLabel",
      layout: "layout",
      placement: "placement",
      items: "mediaItems",
      firstImage: "mediaItems.0.image",
      firstPoster: "mediaItems.0.poster",
    },
    prepare({ internalLabel, layout, placement, items, firstImage, firstPoster }) {
      const count = Array.isArray(items) ? items.length : 0;
      const variant = layout
        ? LAYOUT_TITLES[layout] ?? layout
        : "Nessuna griglia / No layout";
      const where = placement
        ? PLACEMENT_TITLES[placement] ?? placement
        : "Nessuna posizione / No placement";

      return {
        title: `${where} · ${variant} · ${count} media`,
        subtitle:
          internalLabel || "No internal label / Nessuna etichetta interna",
        media: firstImage || firstPoster,
      };
    },
  },
});
