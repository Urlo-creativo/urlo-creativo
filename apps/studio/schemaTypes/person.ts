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
      description: "Mostrato sotto il nome nella griglia Persone.",
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
          description: "Descrivi il ritratto per accessibilità e SEO.",
        }),
      ],
    }),
    defineField({
      name: "order",
      title: "Ordine manuale",
      type: "number",
      description:
        "Controlla la posizione nella griglia Persone. Il numero più basso appare prima.",
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
        title: title || "Persona senza nome",
        subtitle: localizedPreviewText(role) || undefined,
        media,
      };
    },
  },
});
