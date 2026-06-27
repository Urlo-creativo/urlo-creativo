import { defineField, defineType } from "sanity";

import { localizedPreviewText } from "../utils/preview";

/**
 * One row in a project's credits list, e.g. "Photographer: Jane Doe @jane".
 */
export const projectCreditType = defineType({
  name: "projectCredit",
  title: "Credito",
  type: "object",
  fields: [
    defineField({
      name: "role",
      title: "Ruolo credito",
      type: "localizedString",
      description:
        "Esempi: Founder/Art Director, Photographer, Project Manager.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nome",
      type: "text",
      rows: 3,
      description: "Scrivi un nome per riga se ci sono più persone.",
    }),
    defineField({
      name: "handle",
      title: "Nome utente social",
      type: "text",
      rows: 3,
      description: "Scrivi un handle per riga, per esempio @username.",
    }),
  ],
  preview: {
    select: { role: "role", name: "name", handle: "handle" },
    prepare({ role, name, handle }) {
      const localizedRole = localizedPreviewText(role);
      return {
        title: localizedRole || "Credito senza ruolo",
        subtitle: [name, handle].filter(Boolean).join(" · "),
      };
    },
  },
});
