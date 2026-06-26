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
      description: "Main headline at the top of the About page.",
    }),
    defineField({
      name: "intro",
      title: "Testo intro",
      type: "localizedRichText",
      group: "about",
      description: "Large intro paragraph below the page title.",
    }),
    defineField({
      name: "heroImage",
      title: "Immagine grande sfocata",
      type: "image",
      description: "Full-width blurred image under the intro.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
      group: "about",
    }),
    defineField({
      name: "statement",
      title: "Dichiarazione gialla",
      type: "localizedRichText",
      group: "about",
      description: "Large highlighted statement after the hero image.",
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
        "Roles shown in the Team core section. The image appears on hover.",
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
                    : "Add at least one language.";
                }),
            }),
            defineField({
              name: "image",
              title: "Immagine al passaggio del mouse",
              type: "image",
              description: "Optional image shown when this role is hovered.",
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
                title: localizedPreviewText(title) || "Untitled core role",
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
      description: "Steps shown in the circular Process section. Maximum 6.",
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
                    : "Add at least one language.";
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
              description: "Accent color used for this process step.",
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
                title: localizedTitle || "Untitled process step",
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
      description: "Image beside the Mission body.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
      group: "mission",
    }),
    defineField({
      name: "missionHighlight",
      title: "Highlight mission",
      type: "localizedRichText",
      group: "mission",
      description: "Short uppercase line below the Mission image and body.",
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
      description: "Image shown next to the History title.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the image for screen readers and SEO.",
        }),
      ],
      group: "history",
    }),
    defineField({
      name: "historyItems",
      title: "Voci storia",
      type: "array",
      group: "history",
      description: "Interactive history rows. Maximum 2.",
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
                    : "Add at least one language.";
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
                "Text revealed when the visitor hovers or focuses this row.",
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
                title: localizedPreviewText(title) || "Untitled history item",
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
        "Heading above the people grid. Team members are edited from the People list in the left sidebar.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pagina about" };
    },
  },
});
