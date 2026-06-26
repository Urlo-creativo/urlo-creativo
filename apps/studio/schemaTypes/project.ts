import { ImagesIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

// Category dropdown for the Studio. The `value` strings are the contract with
// the frontend — keep them identical to apps/web/src/lib/sanity/categories.ts
// (which owns the display labels and order on the website).
const CATEGORY_OPTIONS = [
  {
    title: "Identita del brand e comunicazione / Brand Identity & Communication",
    value: "brand-identity",
  },
  {
    title: "Design e sviluppo prodotto / Design & Product Development",
    value: "design-product",
  },
  {
    title:
      "Styling, shooting e art direction / Styling, Shooting & Art Direction",
    value: "styling-art-direction",
  },
] as const;

export const projectType = defineType({
  name: "project",
  title: "Progetto / Project",
  type: "document",
  icon: ImagesIcon,
  // Tabs keep the long form navigable for maintainers.
  groups: [
    { name: "info", title: "Info e copertina / Info & cover", default: true },
    { name: "copy", title: "Testi / Copy" },
    { name: "media", title: "Media" },
    { name: "credits", title: "Crediti / Credits" },
    { name: "settings", title: "Impostazioni / Settings" },
  ],
  fields: [
    // ===== Info & cover =====
    defineField({
      name: "clientName",
      title: "Cliente / Client",
      type: "localizedString",
      description:
        "Nome del cliente o brand, es. Kappa x Ducati. / Client or brand name.",
      group: "info",
      validation: (Rule) =>
        Rule.custom((value) => {
          const title = value as { it?: string; en?: string } | undefined;
          if (!title?.it && !title?.en) {
            return "Inserisci almeno il cliente italiano o inglese. / Add at least an Italian or English client name.";
          }
          return true;
        }),
    }),
    defineField({
      name: "projectName",
      title: "Nome progetto / Project name",
      type: "localizedString",
      description:
        "Nome del progetto mostrato sotto il cliente, es. The Perfect Alliance. / Project name shown under the client.",
      group: "info",
    }),
    defineField({
      name: "titleGraphic",
      title: "Grafica del titolo / Title graphic",
      type: "image",
      group: "info",
      options: { hotspot: true },
      description:
        "Piccola grafica, badge o logo accanto al titolo. Solo immagine: non e hero, non e una sezione media. / Small graphic, badge or logo beside the title. Image only.",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt / Alt text",
          type: "localizedString",
          description:
            "Descrivi l'immagine per accessibilità e SEO. / Describe the image for accessibility and SEO.",
        }),
      ],
    }),
    defineField({
      name: "slug",
      title: "Slug URL / URL slug",
      type: "slug",
      group: "info",
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
          const client =
            typeof clientName === "string"
              ? clientName
              : clientName?.it || clientName?.en;
          const project =
            typeof projectName === "string"
              ? projectName
              : projectName?.it || projectName?.en;
          return [client, project].filter(Boolean).join(" ") || "project";
        },
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "year",
      title: "Anno / Year",
      type: "string",
      description:
        "Usato per ordinamento e lista progetti, es. 2025. / Used for ordering and the listing.",
      group: "info",
    }),
    defineField({
      name: "season",
      title: "Stagione / Collezione / Season",
      type: "string",
      description: "Esempi: FW 23/24, FW 24/25, SS 25. / Examples.",
      group: "info",
    }),
    defineField({
      name: "categories",
      title: "Categorie / Categories",
      type: "array",
      group: "info",
      of: [defineArrayMember({ type: "string" })],
      options: { list: [...CATEGORY_OPTIONS] },
    }),
    defineField({
      name: "roles",
      title: "Ruoli / Servizi / Roles",
      type: "array",
      group: "info",
      description:
        "Esempi: Creative Direction, Visual Identity, Product Development. / Examples.",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    defineField({
      name: "excerpt",
      title: "Riassunto per lista / Listing excerpt",
      type: "localizedText",
      description:
        "Breve testo mostrato nella pagina progetti. / Short summary shown on the projects listing page.",
      group: "info",
    }),
    defineField({
      name: "coverImage",
      title: "Immagine di copertina / Cover image",
      type: "image",
      group: "info",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt / Alt text",
          type: "localizedString",
          description:
            "Descrivi l'immagine per accessibilità e SEO. / Describe the image for accessibility and SEO.",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroMedia",
      title: "Media hero / Hero media",
      type: "projectMediaItem",
      description:
        "Immagine o video grande in apertura della pagina progetto. / Large image or video at the top of the detail page.",
      group: "info",
    }),

    // ===== Copy =====
    defineField({
      name: "challenge",
      title: "Sfida / Challenge",
      type: "localizedRichText",
      group: "copy",
    }),
    defineField({
      name: "concept",
      title: "Concept / Concept",
      type: "localizedRichText",
      group: "copy",
    }),
    defineField({
      name: "process",
      title: "Processo / Process",
      type: "localizedRichText",
      group: "copy",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsabilita / Responsibilities",
      type: "array",
      description:
        "Esempi: Material Research, Prototype Development, Production Oversight. / Examples.",
      of: [defineArrayMember({ type: "localizedString" })],
      group: "copy",
    }),
    defineField({
      name: "outcome",
      title: "Risultato / Outcome",
      type: "localizedRichText",
      group: "copy",
    }),

    // ===== Media =====
    // One list; each section's own `placement` field decides where it renders
    // (after Concept / Responsibilities / Outcome, or under Behind the Scenes).
    defineField({
      name: "projectContentSections",
      title: "Sezioni media / Media sections",
      type: "array",
      group: "media",
      description:
        "Lista unica dei layout media del progetto. Aggiungi una sezione, scegli dove appare nella pagina, assegna un'etichetta interna se utile, poi scegli la griglia e aggiungi immagini/video. / Single media layout list; add sections, choose placement, optionally label them internally, then choose grid and add image/video items.",
      of: [defineArrayMember({ type: "projectMediaSection" })],
    }),

    // ===== Credits =====
    defineField({
      name: "credits",
      title: "Crediti / Credits",
      type: "array",
      group: "credits",
      of: [defineArrayMember({ type: "projectCredit" })],
    }),

    // ===== Settings =====
    defineField({
      name: "featured",
      title: "In evidenza / Featured",
      type: "boolean",
      description:
        "Mostra questo progetto nella griglia in homepage. / Show this project in the homepage projects grid.",
      initialValue: false,
      group: "settings",
    }),
    defineField({
      name: "order",
      title: "Ordine / Order",
      type: "number",
      description:
        "Numero piu basso = appare prima nella lista. / Lower number appears first in the listing.",
      group: "settings",
    }),
  ],

  orderings: [
    {
      title: "Ordine manuale / Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Anno (piu recente prima) / Year newest first",
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
      const localizedClientName =
        typeof clientName === "string"
          ? clientName
          : clientName?.it || clientName?.en;
      const localizedProjectName =
        typeof projectName === "string"
          ? projectName
          : projectName?.it || projectName?.en;
      const previewTitle = [localizedClientName, localizedProjectName]
        .filter(Boolean)
        .join(": ");
      const metaSubtitle = [season, year].filter(Boolean).join(" · ");
      return {
        title: previewTitle || "Progetto senza titolo / Untitled project",
        subtitle: metaSubtitle,
        media,
      };
    },
  },
});
