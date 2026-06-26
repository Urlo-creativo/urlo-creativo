import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  localizedPreviewText,
  localizedRichTextPreview,
} from "./utils/preview";

const SERVICE_VARIANT_LABELS: Record<string, string> = {
  structured: "Structured details",
  media: "Media + statement",
  gallery: "Gallery + statement",
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
      description: "Main headline at the top of the Services page.",
    }),
    defineField({
      name: "items",
      title: "Servizi nella fisarmonica",
      type: "array",
      group: "accordion",
      description: "Each item is one expandable row in the services accordion.",
      validation: (Rule) => Rule.max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Numero visibile",
              type: "string",
              description: "Shown at the start of the accordion row, e.g. 01.",
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
                    : "Add at least one language.";
                }),
            }),
            defineField({
              name: "previewImage",
              title: "Immagine voce chiusa",
              type: "image",
              description: "Image shown while this service row is closed.",
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
              description: "Choose the layout used after the row is opened.",
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
                "For services that show grouped lists of details inside the open row.",
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
                      description: "Write one item per line.",
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
                        title: localizedTitle || "Untitled detail group",
                        subtitle: count
                          ? `${count} item${count === 1 ? "" : "s"}`
                          : "No items added",
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
              description: "Write one detail per line.",
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
                    : "Add details for this media layout.";
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
                    return "Add an image for this media layout.";
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
                "Highlighted sentence shown inside the open service row.",
            }),
            defineField({
              name: "statementImage",
              title: "Immagine dichiarazione strutturata",
              type: "image",
              description:
                "Image shown beside the statement for structured services.",
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
              description: "Images shown in the gallery layout.",
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
                        title: localizedTitle || "Untitled gallery item",
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
                  "Untitled service",
                subtitle:
                  SERVICE_VARIANT_LABELS[variant] || "Choose a content type",
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
      description: "Heading below the services accordion.",
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
