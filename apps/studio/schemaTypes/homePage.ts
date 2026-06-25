import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "methodSteps", title: "Method steps" },
    { name: "methodology", title: "Methodology" },
    { name: "projects", title: "Projects" },
    { name: "clients", title: "Clients" },
    { name: "team", title: "People" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      title: "Kicker hero / Hero kicker",
      type: "localizedRichText",
      group: "hero",
    }),
    defineField({
      name: "heroTitle",
      title: "Titolo hero / Hero title",
      type: "localizedRichText",
      group: "hero",
    }),
    defineField({
      name: "heroSubheading",
      title: "Sottotitolo hero / Hero subheading",
      type: "localizedRichText",
      group: "hero",
    }),
    defineField({
      name: "mission",
      title: "Missione homepage / Homepage mission",
      type: "localizedRichText",
      group: "mission",
    }),
    defineField({
      name: "potentialTitle",
      title: "Titolo metodo / Method title",
      type: "localizedRichText",
      group: "methodSteps",
    }),
    defineField({
      name: "methodSteps",
      title: "Step metodo / Method steps",
      type: "array",
      group: "methodSteps",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titolo / Title",
              type: "localizedString",
            }),
            defineField({
              name: "items",
              title: "Voci / Items",
              type: "array",
              of: [defineArrayMember({ type: "localizedString" })],
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              const localizedTitle =
                typeof title === "string" ? title : title?.it || title?.en;
              const count = Array.isArray(items) ? items.length : 0;
              return {
                title: localizedTitle || "Step metodo / Method step",
                subtitle: `${count} item${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "methodologyLabel",
      title: "Etichetta metodologia / Methodology label",
      type: "localizedRichText",
      group: "methodology",
    }),
    defineField({
      name: "methodology",
      title: "Testo metodologia / Methodology body",
      type: "localizedRichText",
      group: "methodology",
    }),
    defineField({
      name: "projectsTitle",
      title: "Titolo progetti / Projects title",
      type: "localizedRichText",
      group: "projects",
    }),
    defineField({
      name: "selectedClients",
      title: "Titolo clienti selezionati / Selected clients title",
      type: "localizedRichText",
      group: "clients",
    }),
    defineField({
      name: "teamTitle",
      title: "Titolo persone / People title",
      type: "localizedRichText",
      group: "team",
    }),
    defineField({
      name: "teamIntro",
      title: "Introduzione persone / People intro",
      type: "localizedRichText",
      group: "team",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
