import { defineArrayMember, defineField, defineType } from "sanity";

const LAYOUT_VARIANTS = [
  { title: "Una colonna grande", value: "oneColumnCollage" },
  { title: "Griglia a due colonne", value: "twoColumnGrid" },
  { title: "Mosaico", value: "masonry" },
  {
    title: "Griglia compatta a tre colonne",
    value: "compactThreeColumnGrid",
  },
] as const;

const WIDTH_MODE_OPTIONS = [
  { title: "Dentro il contenitore pagina", value: "container" },
  { title: "A tutta larghezza", value: "fullWidth" },
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
        "Scegli dove appare questa sezione nel flusso della pagina progetto.",
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
      description: "Solo per organizzarsi nello Studio. Non appare sul sito.",
    }),
    defineField({
      name: "heading",
      title: "Titolo Dietro le quinte",
      type: "localizedRichText",
      description:
        "Visibile solo se la sezione è posizionata in Dietro le quinte.",
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
      title: "Larghezza",
      type: "string",
      description:
        "Dentro il contenitore segue i margini pagina. A tutta larghezza estende la sezione fino ai bordi dello schermo.",
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
      const variant = layout
        ? (LAYOUT_TITLES[layout] ?? layout)
        : "Nessun layout";
      const width =
        widthMode === "fullWidth" ? "A tutta larghezza" : "Contenitore";
      const where = placement
        ? (PLACEMENT_TITLES[placement] ?? placement)
        : "Nessuna posizione";

      return {
        title: `${where} · ${variant} · ${width} · ${count} media`,
        subtitle: internalLabel || "Nessuna etichetta interna",
        media: firstImage || firstPoster,
      };
    },
  },
});
