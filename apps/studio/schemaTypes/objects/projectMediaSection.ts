import { defineArrayMember, defineField, defineType } from "sanity";

const LAYOUT_VARIANTS = [
  { title: "Una colonna full-width", value: "oneColumnCollage" },
  { title: "Griglia a due colonne", value: "twoColumnGrid" },
  { title: "Mosaico", value: "masonry" },
  {
    title: "Griglia compatta a tre colonne",
    value: "compactThreeColumnGrid",
  },
] as const;

const WIDTH_MODE_OPTIONS = [
  { title: "Fill container", value: "container" },
  { title: "Full width", value: "fullWidth" },
] as const;

const PLACEMENT_OPTIONS = [
  { title: "1. Dopo Concept", value: "afterConcept" },
  {
    title: "2. Dopo Responsabilità",
    value: "afterResponsibilities",
  },
  { title: "3. Dopo Risultato", value: "afterOutcome" },
  { title: "4. Dietro le quinte", value: "behindTheScenes" },
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
  title: "Sezione media",
  type: "object",
  fields: [
    defineField({
      name: "placement",
      title: "Posizione nella pagina",
      type: "string",
      description:
        "Choose where this media section appears in the project detail flow.",
      options: {
        list: [...PLACEMENT_OPTIONS],
        layout: "radio",
      },
      initialValue: "afterConcept",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "internalLabel",
      title: "Etichetta interna",
      type: "string",
      description: "For Studio organization only. Not shown on the website.",
    }),
    defineField({
      name: "heading",
      title: "Titolo Behind the Scenes / Behind the Scenes title",
      type: "localizedRichText",
      description:
        "Shown only for media sections placed in Dietro le quinte / Behind the Scenes.",
      hidden: ({ parent }) => parent?.placement !== "behindTheScenes",
    }),
    defineField({
      name: "layout",
      title: "Variante disposizione",
      type: "string",
      options: {
        list: [...LAYOUT_VARIANTS],
        layout: "radio",
      },
      initialValue: "twoColumnGrid",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "widthMode",
      title: "Larghezza / Width",
      type: "string",
      description:
        "Fill container resta dentro il contenitore pagina. Full width estende la sezione media a tutta la larghezza viewport.",
      options: {
        list: [...WIDTH_MODE_OPTIONS],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "container",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mediaItems",
      title: "Elementi media",
      type: "array",
      // Grid layout shows thumbnails so editors can scan and drag-reorder
      // many images visually instead of reading a vertical list.
      options: { layout: "grid" },
      of: [defineArrayMember({ type: "projectMediaItem" })],
      validation: (Rule) => Rule.min(1).error("Add at least one media item."),
    }),
  ],

  preview: {
    select: {
      internalLabel: "internalLabel",
      layout: "layout",
      widthMode: "widthMode",
      placement: "placement",
      item0: "mediaItems.0",
      item1: "mediaItems.1",
      item2: "mediaItems.2",
      item3: "mediaItems.3",
      item4: "mediaItems.4",
      item5: "mediaItems.5",
      item6: "mediaItems.6",
      item7: "mediaItems.7",
      item8: "mediaItems.8",
      item9: "mediaItems.9",
      item10: "mediaItems.10",
      item11: "mediaItems.11",
      item12: "mediaItems.12",
      firstImage: "mediaItems.0.image",
      firstPoster: "mediaItems.0.poster",
    },
    prepare({
      internalLabel,
      layout,
      widthMode,
      placement,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      item7,
      item8,
      item9,
      item10,
      item11,
      item12,
      firstImage,
      firstPoster,
    }) {
      const visibleItems = [
        item0,
        item1,
        item2,
        item3,
        item4,
        item5,
        item6,
        item7,
        item8,
        item9,
        item10,
        item11,
      ].filter(Boolean).length;
      const count = item12 ? `${visibleItems}+` : String(visibleItems);
      const variant = layout ? (LAYOUT_TITLES[layout] ?? layout) : "No layout";
      const width = widthMode === "fullWidth" ? "Full width" : "Container";
      const where = placement
        ? (PLACEMENT_TITLES[placement] ?? placement)
        : "No placement";

      return {
        title: `${where} · ${variant} · ${width} · ${count} media`,
        subtitle: internalLabel || "No internal label",
        media: firstImage || firstPoster,
      };
    },
  },
});
