import { defineField, defineType } from "sanity";

export const localizedTextType = defineType({
  name: "localizedText",
  title: "Testo lungo localizzato",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "Italiano",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "en",
      title: "Inglese",
      type: "text",
      rows: 4,
    }),
  ],
  preview: {
    select: { it: "it", en: "en" },
    prepare({ it, en }) {
      return { title: it || en || "—" };
    },
  },
});
