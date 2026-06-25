import { InfoOutlineIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPageType = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  icon: InfoOutlineIcon,
  groups: [
    { name: "about", title: "About Us", default: true },
    { name: "teamCore", title: "Team core" },
    { name: "process", title: "Process" },
    { name: "mission", title: "Mission" },
    { name: "history", title: "History" },
    { name: "people", title: "People" },
  ],
  fields: [
    // ===== About Us =====
    defineField({
      name: "title",
      title: "Titolo / Title",
      type: "localizedRichText",
      group: "about",
    }),
    defineField({
      name: "intro",
      title: "Introduzione / Intro",
      type: "localizedRichText",
      group: "about",
    }),
    defineField({
      name: "heroImage",
      title: "Immagine grande / Hero image",
      type: "image",
      description:
        "Immagine sfocata a tutta larghezza sotto l'intro. / Full-width blurred image under the intro.",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
      ],
      group: "about",
    }),
    defineField({
      name: "statement",
      title: "Statement evidenziato / Highlight statement",
      type: "localizedRichText",
      group: "about",
    }),

    // ===== Team core =====
    defineField({
      name: "teamCoreTitle",
      title: "Titolo team core / Team core title",
      type: "localizedString",
      group: "teamCore",
    }),
    defineField({
      name: "coreRoles",
      title: "Ruoli core / Core roles",
      type: "array",
      group: "teamCore",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "role",
              title: "Ruolo / Role",
              type: "localizedString",
            }),
            defineField({
              name: "image",
              title: "Immagine hover / Hover image",
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt text",
                  type: "localizedString",
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "role", media: "image" },
            prepare({ title, media }) {
              const localizedTitle =
                typeof title === "string" ? title : title?.it || title?.en;
              return {
                title: localizedTitle || "Core role",
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
      title: "Titolo processo / Process title",
      type: "localizedString",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Step processo / Process steps (Massimo 5 Steps)",
      type: "array",
      group: "process",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "stage",
              title: "Fase / Stage",
              type: "localizedString",
            }),
            defineField({
              name: "description",
              title: "Descrizione / Description",
              type: "localizedString",
            }),
            defineField({
              name: "color",
              title: "Colore / Color",
              type: "string",
              initialValue: "pink",
              options: {
                layout: "radio",
                list: [
                  { title: "Pink", value: "pink" },
                  { title: "Deep blue", value: "deepBlue" },
                  { title: "Yellow", value: "yellow" },
                  { title: "Coral", value: "coral" },
                  { title: "Blue", value: "blue" },
                  { title: "Orange", value: "orange" },
                ],
              },
            }),
          ],
          preview: {
            select: { title: "stage", subtitle: "description", color: "color" },
            prepare({ title, subtitle, color }) {
              const localizedTitle =
                typeof title === "string" ? title : title?.it || title?.en;
              const localizedSubtitle =
                typeof subtitle === "string"
                  ? subtitle
                  : subtitle?.it || subtitle?.en;
              return {
                title: localizedTitle || "Process step",
                subtitle: [localizedSubtitle, color].filter(Boolean).join(" · "),
              };
            },
          },
        }),
      ],
    }),

    // ===== Mission =====
    defineField({
      name: "missionTitle",
      title: "Titolo mission / Mission title",
      type: "localizedString",
      group: "mission",
    }),
    defineField({
      name: "mission",
      title: "Testo mission / Mission text",
      type: "localizedRichText",
      group: "mission",
    }),
    defineField({
      name: "missionImage",
      title: "Immagine mission / Mission image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
      ],
      group: "mission",
    }),
    defineField({
      name: "missionHighlight",
      title: "Highlight mission / Mission highlight",
      type: "localizedRichText",
      group: "mission",
    }),

    // ===== History =====
    defineField({
      name: "historyTitle",
      title: "Titolo history / History title",
      type: "localizedRichText",
      group: "history",
    }),
    defineField({
      name: "historyImage",
      title: "Immagine history / History image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "localizedString" }),
      ],
      group: "history",
    }),
    defineField({
      name: "historyItems",
      title: "Voci history / History items (massimo 2 voci)",
      type: "array",
      group: "history",
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
              name: "year",
              title: "Anno / Year",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Descrizione / Description",
              type: "localizedRichText",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "year" },
            prepare({ title, subtitle }) {
              const localizedTitle =
                typeof title === "string" ? title : title?.it || title?.en;
              return {
                title: localizedTitle || "History item",
                subtitle,
              };
            },
          },
        }),
      ],
    }),

    // ===== People =====
    defineField({
      name: "peopleTitle",
      title: "Titolo People / People title",
      type: "localizedString",
      group: "people",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About page" };
    },
  },
});
