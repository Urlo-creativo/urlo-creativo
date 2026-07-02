import { InfoOutlineIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import {
  localizedPreviewText,
  localizedRichTextPreview,
} from "./utils/preview";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "Pagina about",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    { name: "about", title: "Chi siamo", default: true },
    { name: "teamCore", title: "Team principale" },
    { name: "process", title: "Processo" },
    { name: "mission", title: "Missione" },
    { name: "history", title: "Storia" },
    { name: "people", title: "Persone" },
  ],
  fields: [
    // ===== About Us =====
    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "localizedRichText",
      group: "about",
      description: "Titolo principale in alto nella pagina About.",
    }),
    defineField({
      name: "intro",
      title: "Testo intro",
      type: "localizedRichText",
      group: "about",
      description: "Paragrafo grande sotto il titolo pagina.",
    }),
    defineField({
      name: "heroImage",
      title: "Immagine grande sfocata",
      type: "image",
      description: "Immagine grande sotto l'intro.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
      group: "about",
    }),
    defineField({
      name: "statement",
      title: "Dichiarazione gialla",
      type: "localizedRichText",
      group: "about",
      description: "Testo grande evidenziato dopo l'immagine iniziale.",
    }),

    // ===== Team core =====
    defineField({
      name: "teamCoreTitle",
      title: "Titolo team core",
      type: "localizedRichText",
      group: "teamCore",
    }),
    defineField({
      name: "coreRoles",
      title: "Ruoli team core",
      type: "array",
      group: "teamCore",
      description:
        "Ruoli mostrati nella sezione Team principale. L'immagine appare al passaggio del mouse.",
      validation: (Rule) => Rule.max(8),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "role",
              title: "Etichetta ruolo",
              type: "localizedString",
              validation: (Rule) =>
                Rule.custom((value) => {
                  const role = value as
                    | { it?: string; en?: string }
                    | undefined;
                  return role?.it || role?.en
                    ? true
                    : "Aggiungi almeno una lingua.";
                }),
            }),
            defineField({
              name: "image",
              title: "Immagine al passaggio del mouse",
              type: "image",
              description: "Immagine opzionale mostrata al passaggio del mouse.",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Testo alt",
                  type: "localizedString",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "role", media: "image" },
            prepare({ title, media }) {
              return {
                title: localizedPreviewText(title) || "Ruolo senza titolo",
                media,
              };
            },
          },
        }),
      ],
    }),

    // ===== Process =====
    defineField({
      name: "processTitle",
      title: "Titolo processo",
      type: "localizedRichText",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Step processo",
      type: "array",
      group: "process",
      description: "Step mostrati nella sezione Processo. Massimo 6.",
      validation: (Rule) => Rule.max(6),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "stage",
              title: "Etichetta fase",
              type: "localizedString",
              validation: (Rule) =>
                Rule.custom((value) => {
                  const stage = value as
                    | { it?: string; en?: string }
                    | undefined;
                  return stage?.it || stage?.en
                    ? true
                    : "Aggiungi almeno una lingua.";
                }),
            }),
            defineField({
              name: "description",
              title: "Descrizione fase",
              type: "localizedString",
            }),
            defineField({
              name: "color",
              title: "Colore accento",
              type: "string",
              description: "Colore di accento per questo step del processo.",
              initialValue: "pink",
              options: {
                layout: "radio",
                list: [
                  { title: "Rosa", value: "pink" },
                  { title: "Blu intenso", value: "deepBlue" },
                  { title: "Giallo", value: "yellow" },
                  { title: "Corallo", value: "coral" },
                  { title: "Blu", value: "blue" },
                  { title: "Arancione", value: "orange" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "stage", subtitle: "description", color: "color" },
            prepare({ title, subtitle, color }) {
              const localizedTitle = localizedPreviewText(title);
              const localizedSubtitle = localizedPreviewText(subtitle);
              return {
                title: localizedTitle || "Step senza titolo",
                subtitle: [localizedSubtitle, color]
                  .filter(Boolean)
                  .join(" · "),
              };
            },
          },
        }),
      ],
    }),

    // ===== Mission =====
    defineField({
      name: "missionTitle",
      title: "Titolo mission",
      type: "localizedRichText",
      group: "mission",
    }),
    defineField({
      name: "mission",
      title: "Testo mission",
      type: "localizedRichText",
      group: "mission",
    }),
    defineField({
      name: "missionImage",
      title: "Immagine mission",
      type: "image",
      description: "Immagine accanto al testo mission.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
      group: "mission",
    }),
    defineField({
      name: "missionHighlight",
      title: "Highlight mission",
      type: "localizedRichText",
      group: "mission",
      description: "Breve frase sotto immagine e testo mission.",
    }),

    // ===== History =====
    defineField({
      name: "historyTitle",
      title: "Titolo storia",
      type: "localizedRichText",
      group: "history",
    }),
    defineField({
      name: "historyImage",
      title: "Immagine storia",
      type: "image",
      description: "Immagine mostrata accanto al titolo storia.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
      group: "history",
    }),
    defineField({
      name: "historyItems",
      title: "Voci storia",
      type: "array",
      group: "history",
      description: "Righe interattive della storia. Massimo 2.",
      validation: (Rule) => Rule.max(2),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Etichetta voce",
              type: "localizedString",
              validation: (Rule) =>
                Rule.custom((value) => {
                  const label = value as
                    | { it?: string; en?: string }
                    | undefined;
                  return label?.it || label?.en
                    ? true
                    : "Aggiungi almeno una lingua.";
                }),
            }),
            defineField({
              name: "year",
              title: "Anno",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Descrizione al passaggio del mouse",
              type: "localizedRichText",
              description:
                "Testo mostrato al passaggio del mouse o alla selezione della riga.",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "year",
              description: "description",
            },
            prepare({ title, subtitle, description }) {
              const summary = localizedRichTextPreview(description);
              return {
                title: localizedPreviewText(title) || "Voce storia senza titolo",
                subtitle: [subtitle, summary].filter(Boolean).join(" · "),
              };
            },
          },
        }),
      ],
    }),

    // ===== People =====
    defineField({
      name: "peopleTitle",
      title: "Titolo persone",
      type: "localizedRichText",
      group: "people",
      description:
        "Titolo sopra la griglia persone. Le persone si modificano dalla lista Persone nella sidebar.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pagina about" };
    },
  },
});
