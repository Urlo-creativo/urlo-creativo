import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { localizedPreviewText } from "./utils/preview";

export const personType = defineType({
  name: "person",
  title: "Persona",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Ruolo",
      type: "localizedString",
      description: "Shown below the person's name in the People grid.",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      description: "Portrait used in the About page People grid.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Describe the portrait for screen readers and SEO.",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordine manuale",
      type: "number",
      description:
        "Controls position in the People grid. Lower number appears first.",
    }),
  ],
  orderings: [
    {
      title: "Ordine manuale",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", role: "role", media: "photo" },
    prepare({ title, role, media }) {
      return {
        title: title || "Person",
        subtitle: localizedPreviewText(role) || undefined,
        media,
      };
    },
  },
});
