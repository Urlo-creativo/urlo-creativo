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
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Nome utente social",
      type: "string",
      description: "Handle social opzionale, per esempio @username.",
    }),
    defineField({
      name: "url",
      title: "Collegamento",
      type: "url",
      description: "Link opzionale per handle o nome.",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
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
