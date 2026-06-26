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
        "Examples: Founder/Art Director, Photographer, Project Manager.",
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
      description: "Optional social handle, e.g. @username.",
    }),
    defineField({
      name: "url",
      title: "Collegamento",
      type: "url",
      description: "Optional link for the handle or name.",
    }),
  ],
  preview: {
    select: { role: "role", name: "name", handle: "handle" },
    prepare({ role, name, handle }) {
      const localizedRole = localizedPreviewText(role);
      return {
        title: localizedRole || "Untitled credit",
        subtitle: [name, handle].filter(Boolean).join(" · "),
      };
    },
  },
});
