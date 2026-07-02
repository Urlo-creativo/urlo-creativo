import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  localizedPreviewText,
  localizedRichTextPreview,
} from "./utils/preview";

const SERVICE_VARIANT_LABELS: Record<string, string> = {
  structured: "Dettagli strutturati",
  media: "Media + dichiarazione",
  gallery: "Galleria + dichiarazione",
};

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Pagina servizi",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Sezione iniziale", default: true },
    { name: "accordion", title: "Fisarmonica" },
    { name: "collaboration", title: "Collaborazione" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "localizedRichText",
      group: "hero",
      description: "Titolo principale in alto nella pagina Servizi.",
    }),
    defineField({
      name: "items",
      title: "Servizi nella fisarmonica",
      type: "array",
      group: "accordion",
      description: "Ogni voce è una riga apribile nella pagina Servizi.",
      validation: (Rule) => Rule.max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Numero visibile",
              type: "string",
              description: "Mostrato all'inizio della riga, per esempio 01.",
            }),
            defineField({
              name: "title",
              title: "Titolo della voce",
              type: "localizedString",
              validation: (Rule) =>
                Rule.custom((value) => {
                  const title = value as
                    | { it?: string; en?: string }
                    | undefined;
                  return title?.it || title?.en
                    ? true
                    : "Aggiungi almeno una lingua.";
                }),
            }),
            defineField({
              name: "previewImage",
              title: "Immagine voce chiusa",
              type: "image",
              description: "Immagine mostrata quando la voce è chiusa.",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Testo alt",
                  type: "localizedString",
                }),
              ],
            }),
            defineField({
              name: "variant",
              title: "Tipo contenuto aperto",
              type: "string",
              description: "Scegli la disposizione usata quando la riga è aperta.",
              options: {
                layout: "radio",
                list: [
                  { title: "Dettagli strutturati", value: "structured" },
                  { title: "Media + dichiarazione", value: "media" },
                  { title: "Galleria + dichiarazione", value: "gallery" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "detailGroups",
              title: "Gruppi di dettagli strutturati",
              type: "array",
              description:
                "Per i servizi che mostrano elenchi di dettagli raggruppati nella voce aperta.",
              hidden: ({ parent }) => parent?.variant !== "structured",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { variant?: string }
                    | undefined;
                  if (parent?.variant === "structured" && !value?.length) {
                    return "Add at least one detail group for this content type.";
                  }
                  return true;
                }).max(4),
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Titolo gruppo",
                      type: "localizedRichText",
                    }),
                    defineField({
                      name: "itemsText",
                      title: "Voci del gruppo",
                      type: "localizedText",
                      description: "Scrivi una voce per riga.",
                    }),
                  ],
                  preview: {
                    select: { title: "title", itemsText: "itemsText" },
                    prepare({ title, itemsText }) {
                      const localizedTitle = localizedRichTextPreview(title);
                      const text = localizedPreviewText(itemsText) || "";
                      const count = text
                        .split(/\r?\n/)
                        .map((line: string) => line.trim())
                        .filter(Boolean).length;
                      return {
                        title: localizedTitle || "Gruppo senza titolo",
                        subtitle: count
                          ? `${count} voc${count === 1 ? "e" : "i"}`
                          : "Nessuna voce inserita",
                      };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: "detailsText",
              title: "Dettagli disposizione media",
              type: "localizedText",
              description: "Scrivi un dettaglio per riga.",
              hidden: ({ parent }) => parent?.variant !== "media",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { variant?: string }
                    | undefined;
                  if (parent?.variant !== "media") {
                    return true;
                  }
                  const text = localizedPreviewText(
                    value as { it?: string; en?: string } | undefined,
                  );
                  return text?.trim()
                    ? true
                    : "Aggiungi almeno un dettaglio per questa disposizione.";
                }),
            }),
            defineField({
              name: "media",
              title: "Immagine disposizione media",
              type: "object",
              hidden: ({ parent }) => parent?.variant !== "media",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { variant?: string }
                    | undefined;
                  const media = value as { image?: unknown } | undefined;
                  if (parent?.variant === "media" && !media?.image) {
                    return "Aggiungi un'immagine per questa disposizione.";
                  }
                  return true;
                }),
              fields: [
                defineField({
                  name: "image",
                  title: "Immagine",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "alt",
                  title: "Testo alt",
                  type: "localizedString",
                }),
              ],
              preview: {
                select: { media: "image" },
                prepare({ media }) {
                  return {
                    title: "Media",
                    media,
                  };
                },
              },
            }),
            defineField({
              name: "statement",
              title: "Dichiarazione evidenziata",
              type: "localizedRichText",
              description:
                "Frase evidenziata mostrata quando la voce è aperta.",
            }),
            defineField({
              name: "statementImage",
              title: "Immagine dichiarazione strutturata",
              type: "image",
              description:
                "Immagine accanto alla dichiarazione nei servizi strutturati.",
              hidden: ({ parent }) => parent?.variant !== "structured",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Testo alt",
                  type: "localizedString",
                }),
              ],
            }),
            defineField({
              name: "gallery",
              title: "Galleria",
              type: "array",
              description: "Immagini mostrate nella disposizione galleria.",
              hidden: ({ parent }) => parent?.variant !== "gallery",
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as
                    | { variant?: string }
                    | undefined;
                  if (parent?.variant === "gallery" && !value?.length) {
                    return "Add at least one gallery item.";
                  }
                  return true;
                }).max(6),
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Etichetta immagine",
                      type: "localizedString",
                    }),
                    defineField({
                      name: "image",
                      title: "Immagine",
                      type: "image",
                      options: { hotspot: true },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "alt",
                      title: "Testo alt",
                      type: "localizedString",
                    }),
                  ],
                  preview: {
                    select: { title: "label", media: "image" },
                    prepare({ title, media }) {
                      const localizedTitle = localizedPreviewText(title);
                      return {
                        title: localizedTitle || "Immagine senza etichetta",
                        media,
                      };
                    },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              number: "number",
              title: "title",
              variant: "variant",
              media: "previewImage",
            },
            prepare({ number, title, variant, media }) {
              const localizedTitle = localizedPreviewText(title);
              return {
                title:
                  [number, localizedTitle].filter(Boolean).join(" ") ||
                  "Servizio senza titolo",
                subtitle:
                  SERVICE_VARIANT_LABELS[variant] || "Scegli un tipo contenuto",
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "collaborationTitle",
      title: "Titolo collaborazione",
      type: "localizedRichText",
      group: "collaboration",
      description: "Titolo sotto la fisarmonica dei servizi.",
    }),
    defineField({
      name: "collaboration",
      title: "Testo collaborazione",
      type: "localizedRichText",
      group: "collaboration",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pagina servizi" };
    },
  },
});
