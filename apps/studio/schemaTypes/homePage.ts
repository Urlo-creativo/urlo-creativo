import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { localizedPreviewText } from "./utils/preview";

export const homePageType = defineType({
  name: "homePage",
  title: "Pagina home",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Sezione iniziale", default: true },
    { name: "mission", title: "Missione" },
    { name: "methodSteps", title: "Intro metodo" },
    { name: "methodology", title: "Metodologia" },
    { name: "projects", title: "Progetti" },
    { name: "clients", title: "Clienti" },
    { name: "team", title: "Persone" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      title: "Testo breve sopra il titolo",
      type: "localizedRichText",
      group: "hero",
      description: "Small line above the main homepage headline.",
    }),
    defineField({
      name: "heroMedia",
      title: "Media di sfondo iniziale",
      type: "projectMediaItem",
      group: "hero",
      description:
        "Image or video behind the homepage hero. Videos autoplay muted.",
    }),
    defineField({
      name: "heroTitle",
      title: "Titolo sezione iniziale",
      type: "localizedRichText",
      group: "hero",
      description: "Main headline at the top of the homepage.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Sottotitolo sezione iniziale",
      type: "localizedRichText",
      group: "hero",
      description: "Short text below the hero headline.",
    }),
    defineField({
      name: "mission",
      title: "Dichiarazione missione",
      type: "localizedRichText",
      group: "mission",
      description: "Large mission copy immediately after the hero.",
    }),
    defineField({
      name: "potentialTitle",
      title: "Titolo intro metodo",
      type: "localizedRichText",
      group: "methodSteps",
      description: "Headline above the method step list.",
    }),
    defineField({
      name: "methodSteps",
      title: "Step metodo",
      type: "array",
      group: "methodSteps",
      description: "The compact method columns shown below the intro title.",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titolo step",
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
              name: "items",
              title: "Righe dello step",
              type: "array",
              description: "Short lines listed under this step.",
              of: [defineArrayMember({ type: "localizedString" })],
              validation: (Rule) => Rule.max(6),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              const localizedTitle = localizedPreviewText(title);
              const count = Array.isArray(items) ? items.length : 0;
              return {
                title: localizedTitle || "Untitled method step",
                subtitle: count
                  ? `${count} line${count === 1 ? "" : "s"}`
                  : "No lines added",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "methodologyLabel",
      title: "Etichetta metodologia",
      type: "localizedRichText",
      group: "methodology",
      description: "Small label above the methodology body.",
    }),
    defineField({
      name: "methodology",
      title: "Testo metodologia",
      type: "localizedRichText",
      group: "methodology",
    }),
    defineField({
      name: "projectsTitle",
      title: "Titolo sezione progetti",
      type: "localizedRichText",
      group: "projects",
      description: "Heading above the featured projects grid.",
    }),
    defineField({
      name: "selectedClients",
      title: "Titolo clienti selezionati",
      type: "localizedRichText",
      group: "clients",
      description: "Heading above the selected client logo marquee.",
    }),
    defineField({
      name: "teamTitle",
      title: "Titolo sezione persone",
      type: "localizedRichText",
      group: "team",
    }),
    defineField({
      name: "teamImage",
      title: "Immagine persone",
      type: "image",
      group: "team",
      description: "Image shown beside the people section intro.",
      options: { hotspot: true },
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
      name: "teamIntro",
      title: "Introduzione persone",
      type: "localizedRichText",
      group: "team",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pagina home" };
    },
  },
});
