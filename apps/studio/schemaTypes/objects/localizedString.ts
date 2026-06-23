import { defineField, defineType } from "sanity";

export const localizedStringType = defineType({
  name: "localizedString",
  title: "Testo breve localizzato / Localized short text",
  type: "object",
  fields: [
    defineField({
      name: "it",
      title: "Italiano / Italian",
      type: "string",
    }),
    defineField({
      name: "en",
      title: "English / Inglese",
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
