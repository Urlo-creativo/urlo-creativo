import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const personType = defineType({
  name: "person",
  title: "Persona / Person",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome / Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Ruolo / Role",
      type: "localizedString",
    }),
    defineField({
      name: "photo",
      title: "Foto / Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "localizedString",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordine / Order",
      type: "number",
      description:
        "Controlla la posizione nella griglia People. Numero piu basso = prima posizione. / Controls position in the People grid.",
    }),
  ],
  orderings: [
    {
      title: "Ordine / Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", role: "role", media: "photo" },
    prepare({ title, role, media }) {
      const localizedRole =
        typeof role === "string" ? role : role?.it || role?.en;
      return {
        title: title || "Person",
        subtitle: localizedRole || undefined,
        media,
      };
    },
  },
});
