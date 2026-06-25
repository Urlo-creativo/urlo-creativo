import { CaseIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const servicesPageType = defineType({
  name: "servicesPage",
  title: "Services page",
  type: "document",
  icon: CaseIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "accordion", title: "Accordion" },
    { name: "collaboration", title: "Collaboration" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titolo pagina / Page title",
      type: "localizedRichText",
      group: "hero",
    }),
    defineField({
      name: "statement",
      title: "Statement evidenziato / Highlight statement",
      type: "localizedRichText",
      group: "accordion",
    }),
    defineField({
      name: "items",
      title: "Servizi / Services",
      type: "array",
      group: "accordion",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "number",
              title: "Numero / Number",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Titolo / Title",
              type: "localizedString",
            }),
            defineField({
              name: "previewImage",
              title: "Immagine anteprima / Preview image",
              type: "image",
              description:
                "Immagine mostrata nell'intestazione del servizio (stato chiuso). / Image shown in the collapsed service header.",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "localizedString",
                }),
              ],
            }),
            defineField({
              name: "variant",
              title: "Tipo contenuto / Content type",
              type: "string",
              options: {
                layout: "radio",
                list: [
                  { title: "Dettagli strutturati / Structured details", value: "structured" },
                  { title: "Media + statement", value: "media" },
                  { title: "Gallery + statement", value: "gallery" },
                ],
              },
            }),
            defineField({
              name: "detailGroups",
              title: "Gruppi dettaglio / Detail groups",
              type: "array",
              hidden: ({ parent }) => parent?.variant !== "structured",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "title",
                      title: "Titolo / Title",
                      type: "localizedRichText",
                    }),
                    defineField({
                      name: "items",
                      title: "Voci / Items",
                      type: "array",
                      of: [defineArrayMember({ type: "localizedString" })],
                    }),
                  ],
                  preview: {
                    select: { title: "title" },
                    prepare({ title }) {
                      const localizedTitle =
                        title?.it?.[0]?.children?.map((child: { text?: string }) => child.text).join("") ||
                        title?.en?.[0]?.children?.map((child: { text?: string }) => child.text).join("");
                      return { title: localizedTitle || "Detail group" };
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: "details",
              title: "Dettagli / Details",
              type: "array",
              hidden: ({ parent }) => parent?.variant !== "media",
              of: [defineArrayMember({ type: "localizedString" })],
            }),
            defineField({
              name: "media",
              title: "Media",
              type: "object",
              hidden: ({ parent }) => parent?.variant !== "media",
              fields: [
                defineField({
                  name: "image",
                  title: "Immagine / Image",
                  type: "image",
                  options: { hotspot: true },
                }),
                defineField({
                  name: "alt",
                  title: "Alt text",
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
              title: "Statement",
              type: "localizedRichText",
              hidden: ({ parent }) => parent?.variant === "structured",
            }),
            defineField({
              name: "gallery",
              title: "Gallery",
              type: "array",
              hidden: ({ parent }) => parent?.variant !== "gallery",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Etichetta / Label",
                      type: "localizedString",
                    }),
                    defineField({
                      name: "image",
                      title: "Immagine / Image",
                      type: "image",
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: "alt",
                      title: "Alt text",
                      type: "localizedString",
                    }),
                  ],
                  preview: {
                    select: { title: "label", media: "image" },
                    prepare({ title, media }) {
                      const localizedTitle =
                        typeof title === "string" ? title : title?.it || title?.en;
                      return {
                        title: localizedTitle || "Gallery item",
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
              const localizedTitle =
                typeof title === "string" ? title : title?.it || title?.en;
              return {
                title: [number, localizedTitle].filter(Boolean).join(" "),
                subtitle: variant || "service",
                media,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "collaborationTitle",
      title: "Titolo collaborazione / Collaboration title",
      type: "localizedRichText",
      group: "collaboration",
    }),
    defineField({
      name: "collaboration",
      title: "Testo collaborazione / Collaboration body",
      type: "localizedRichText",
      group: "collaboration",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Services page" };
    },
  },
});
