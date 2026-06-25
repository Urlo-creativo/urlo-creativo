import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const clientType = defineType({
  name: "client",
  title: "Cliente selezionato / Selected client",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome / Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo / Logo",
      type: "image",
      options: { hotspot: false },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL sito web / Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Ordine / Order",
      type: "number",
      description:
        "Controlla la posizione nel marquee. Numero piu basso = prima posizione. / Controls position in the marquee.",
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
    select: { title: "name", media: "logo" },
  },
});
