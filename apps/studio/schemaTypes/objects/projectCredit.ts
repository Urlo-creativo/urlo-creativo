import { defineField, defineType } from "sanity";

/**
 * One row in a project's credits list, e.g. "Photographer: Jane Doe @jane".
 */
export const projectCreditType = defineType({
  name: "projectCredit",
  title: "Credito / Credit",
  type: "object",
  fields: [
    defineField({
      name: "role",
      title: "Ruolo / Role",
      type: "localizedString",
      description:
        "Esempi: Founder/Art Director, Photographer, Project Manager. / Examples.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Nome / Name",
      type: "string",
    }),
    defineField({
      name: "handle",
      title: "Handle",
      type: "string",
      description:
        "Handle social opzionale, es. @username. / Optional social handle.",
    }),
    defineField({
      name: "url",
      title: "Link / Link",
      type: "url",
      description:
        "Link opzionale per handle o nome. / Optional link for the handle/name.",
    }),
  ],
  preview: {
    select: { role: "role", name: "name", handle: "handle" },
    prepare({ role, name, handle }) {
      const localizedRole =
        typeof role === "string" ? role : role?.it || role?.en;
      return {
        title: localizedRole || "Credito / Credit",
        subtitle: [name, handle].filter(Boolean).join(" · "),
      };
    },
  },
});
