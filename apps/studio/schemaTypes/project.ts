import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { localizedPreviewText } from "./utils/preview";

// Category dropdown for the Studio. The `value` strings are the contract with
// the frontend — keep them identical to apps/web/src/lib/sanity/categories.ts
// (which owns the display labels and order on the website).
const CATEGORY_OPTIONS = [
  {
    title: "Identità del brand e comunicazione",
    value: "brand-identity",
  },
  {
    title: "Design e sviluppo prodotto",
    value: "design-product",
  },
  {
    title: "Styling, shooting e art direction",
    value: "styling-art-direction",
  },
] as const;

export const projectType = defineType({
  name: "project",
  title: "Progetto",
  type: "document",
  icon: ImagesIcon,
  groups: [
    { name: "hero", title: "Inizio pagina dettaglio", default: true },
    { name: "copy", title: "Testi pagina dettaglio" },
    { name: "media", title: "Sezioni media" },
    { name: "credits", title: "Crediti" },
    { name: "listing", title: "Lista e impostazioni" },
  ],
  fields: [
    // ===== Detail page top =====
    defineField({
      name: "heroMedia",
      title: "Media iniziale",
      type: "projectMediaItem",
      description:
        "Large image or video at the top of the project detail page. Falls back to the cover image if empty.",
      group: "hero",
    }),
    defineField({
      name: "clientName",
      title: "Nome cliente",
      type: "localizedString",
      description: "Main project title line, e.g. Kappa x Ducati.",
      group: "hero",
      validation: (Rule) =>
        Rule.custom((value) => {
          const title = value as { it?: string; en?: string } | undefined;
          if (!title?.it && !title?.en) {
            return "Add at least one language.";
          }
          return true;
        }),
    }),
    defineField({
      name: "projectName",
      title: "Nome progetto",
      type: "localizedString",
      description: "Second project title line shown below the client name.",
      group: "hero",
    }),
    defineField({
      name: "titleGraphic",
      title: "Grafica titolo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Small graphic, badge, or logo beside the title. This is not the hero media.",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categorie",
      type: "array",
      group: "hero",
      description: "Category tags shown below the project title.",
      of: [defineArrayMember({ type: "string" })],
      options: { list: [...CATEGORY_OPTIONS] },
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "season",
      title: "Stagione / collezione",
      type: "string",
      description: "Shown below the project title, e.g. FW 24/25 or SS 25.",
      group: "hero",
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "string",
      description: "Shown below the project title and used for sorting.",
      group: "hero",
    }),
    defineField({
      name: "roles",
      title: "Ruoli / servizi",
      type: "array",
      group: "hero",
      description: "Tags shown in the Roles / Services row on the detail page.",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.max(8),
    }),

    // ===== Detail page copy =====
    defineField({
      name: "challenge",
      title: "Sfida",
      type: "localizedRichText",
      group: "copy",
      description: "First text section on the project detail page.",
    }),
    defineField({
      name: "concept",
      title: "Concetto",
      type: "localizedRichText",
      group: "copy",
      description: "Second text section, before media placed after Concept.",
    }),
    defineField({
      name: "process",
      title: "Processo",
      type: "localizedRichText",
      group: "copy",
      description: "Text section after the media placed after Concept.",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsabilità",
      type: "localizedText",
      description:
        "Scrivi una responsabilità per riga. Mostrata dopo Processo e prima di Risultato.",
      group: "copy",
      validation: (Rule) =>
        Rule.custom((value) => {
          const responsibilities = value as
            | { it?: string; en?: string }
            | undefined;
          const lineCount = Math.max(
            ...[responsibilities?.it, responsibilities?.en].map((text) =>
              text
                ? text
                    .split(/\r?\n/)
                    .map((line) => line.trim())
                    .filter(Boolean).length
                : 0,
            ),
          );

          return lineCount <= 12
            ? true
            : "Inserisci massimo 12 responsabilità.";
        }),
    }),
    defineField({
      name: "outcome",
      title: "Risultato",
      type: "localizedRichText",
      group: "copy",
      description: "Final text section before Credits.",
    }),

    // ===== Media =====
    // One list; each section's own `placement` field decides where it renders
    // (after Concept / Responsibilities / Outcome, or under Behind the Scenes).
    defineField({
      name: "projectContentSections",
      title: "Sezioni media del progetto",
      type: "array",
      group: "media",
      description:
        "Reusable media sections. Each section chooses where it appears in the detail page flow.",
      of: [defineArrayMember({ type: "projectMediaSection" })],
      validation: (Rule) => Rule.max(12),
    }),

    // ===== Credits =====
    defineField({
      name: "credits",
      title: "Crediti",
      type: "array",
      group: "credits",
      description: "Credit rows shown near the bottom of the detail page.",
      of: [defineArrayMember({ type: "projectCredit" })],
      validation: (Rule) => Rule.max(24),
    }),

    // ===== Listing & settings =====
    defineField({
      name: "coverImage",
      title: "Immagine di copertina lista",
      type: "image",
      group: "listing",
      description:
        "Image used in project listings and as the hero fallback if Hero media is empty.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Riassunto per lista",
      type: "localizedText",
      description: "Short summary shown on the projects listing page.",
      group: "listing",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "listing",
      description: "Used in the public project URL.",
      options: {
        source: (doc) => {
          const clientName = doc.clientName as
            | { it?: string; en?: string }
            | string
            | undefined;
          const projectName = doc.projectName as
            | { it?: string; en?: string }
            | string
            | undefined;
          const client = localizedPreviewText(clientName);
          const project = localizedPreviewText(projectName);
          return [client, project].filter(Boolean).join(" ") || "project";
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "In evidenza in homepage",
      type: "boolean",
      description: "Show this project in the homepage projects grid.",
      initialValue: false,
      group: "listing",
    }),
    defineField({
      name: "order",
      title: "Ordine manuale",
      type: "number",
      description: "Lower number appears first in project lists.",
      group: "listing",
    }),
  ],

  orderings: [
    {
      title: "Ordine manuale",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Anno più recente prima",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],

  preview: {
    select: {
      clientName: "clientName",
      projectName: "projectName",
      year: "year",
      season: "season",
      media: "coverImage",
    },
    prepare({ clientName, projectName, year, season, media }) {
      const localizedClientName = localizedPreviewText(clientName);
      const localizedProjectName = localizedPreviewText(projectName);
      const previewTitle = [localizedClientName, localizedProjectName]
        .filter(Boolean)
        .join(": ");
      const metaSubtitle = [season, year].filter(Boolean).join(" · ");
      return {
        title: previewTitle || "Untitled project",
        subtitle: metaSubtitle,
        media,
      };
    },
  },
});
