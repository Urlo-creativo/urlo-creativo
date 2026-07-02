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
        "Immagine o video grande in alto nella pagina progetto. Se vuoto usa la copertina.",
      group: "hero",
    }),
    defineField({
      name: "clientName",
      title: "Nome cliente",
      type: "localizedString",
      description: "Prima riga del titolo progetto, per esempio Kappa x Ducati.",
      group: "hero",
      validation: (Rule) =>
        Rule.custom((value) => {
          const title = value as { it?: string; en?: string } | undefined;
          if (!title?.it && !title?.en) {
            return "Aggiungi almeno una lingua.";
          }
          return true;
        }),
    }),
    defineField({
      name: "projectName",
      title: "Nome progetto",
      type: "localizedString",
      description: "Seconda riga del titolo progetto, sotto il nome cliente.",
      group: "hero",
    }),
    defineField({
      name: "titleGraphic",
      title: "Grafica titolo",
      type: "image",
      group: "hero",
      options: { hotspot: true },
      description:
        "Piccola grafica, badge o logo accanto al titolo. Non è il media iniziale.",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Categorie",
      type: "array",
      group: "hero",
      description: "Categorie mostrate sotto il titolo progetto.",
      of: [defineArrayMember({ type: "string" })],
      options: { list: [...CATEGORY_OPTIONS] },
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: "season",
      title: "Stagione / collezione",
      type: "string",
      description: "Mostrata sotto il titolo progetto, per esempio FW 24/25 o SS 25.",
      group: "hero",
    }),
    defineField({
      name: "year",
      title: "Anno",
      type: "string",
      description: "Mostrato sotto il titolo progetto e usato per ordinare.",
      group: "hero",
    }),
    defineField({
      name: "roles",
      title: "Ruoli / servizi",
      type: "array",
      group: "hero",
      description: "Etichette mostrate nella riga Ruoli / Servizi della pagina dettaglio.",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (Rule) => Rule.max(8),
    }),

    // ===== Detail page copy =====
    defineField({
      name: "challenge",
      title: "Sfida",
      type: "localizedRichText",
      group: "copy",
      description: "Prima sezione di testo della pagina progetto.",
    }),
    defineField({
      name: "concept",
      title: "Concetto",
      type: "localizedRichText",
      group: "copy",
      description: "Seconda sezione di testo, prima dei media posizionati dopo Concetto.",
    }),
    defineField({
      name: "process",
      title: "Processo",
      type: "localizedRichText",
      group: "copy",
      description: "Sezione di testo dopo i media posizionati dopo Concetto.",
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
      description: "Ultima sezione di testo prima dei Crediti.",
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
        "Sezioni media riutilizzabili. Ogni sezione sceglie dove appare nella pagina dettaglio.",
      of: [defineArrayMember({ type: "projectMediaSection" })],
      validation: (Rule) => Rule.max(12),
    }),

    // ===== Credits =====
    defineField({
      name: "credits",
      title: "Crediti",
      type: "array",
      group: "credits",
      description: "Righe di crediti mostrate in fondo alla pagina dettaglio.",
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
        "Immagine usata nelle liste progetto e come fallback se manca il media iniziale.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Riassunto per lista",
      type: "localizedText",
      description: "Breve riassunto mostrato nella lista progetti.",
      group: "listing",
    }),
    defineField({
      name: "slug",
      title: "URL slug",
      type: "slug",
      group: "listing",
      description: "Usato nell'indirizzo pubblico della pagina progetto.",
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
      description: "Mostra questo progetto nella griglia progetti della home.",
      initialValue: false,
      group: "listing",
    }),
    defineField({
      name: "order",
      title: "Ordine manuale",
      type: "number",
      description: "Il numero più basso appare prima nelle liste progetto.",
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
        title: previewTitle || "Progetto senza titolo",
        subtitle: metaSubtitle,
        media,
      };
    },
  },
});
