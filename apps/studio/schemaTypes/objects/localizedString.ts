import { defineField, defineType } from "sanity";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Testo breve localizzato",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "Italiano",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "Inglese",
      type: "string",
    }),
  ],
  preview: {
    select: { it: "it", en: "en" },
    prepare({ it, en }) {
      return { title: it || en || "—" };
    },
  },
});
