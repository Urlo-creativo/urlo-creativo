import { HomeIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

import { localizedPreviewText } from "./utils/preview";

export const homePageType = defineType({
  name: "homePage",
  title: "Pagina home",
  type: "document",
  icon: HomeIcon,
  initialValue: {
    heroGradientOverlayEnabled: true,
    heroTextColor: "white",
  },
  groups: [
    { name: "hero", title: "Sezione iniziale", default: true },
    { name: "mission", title: "Missione" },
    { name: "methodSteps", title: "Intro metodo" },
    { name: "methodology", title: "Metodologia" },
    { name: "projects", title: "Progetti" },
    { name: "clients", title: "Clienti" },
    { name: "team", title: "Persone" },
  ],
  fields: [
    defineField({
      name: "heroKicker",
      title: "Testo breve sopra il titolo",
      type: "localizedRichText",
      group: "hero",
      description: "Breve testo sopra il titolo principale della home.",
    }),
    defineField({
      name: "heroMedia",
      title: "Media di sfondo iniziale",
      type: "projectMediaItem",
      group: "hero",
      description:
        "Immagine o video di sfondo nella prima sezione. I video partono senza audio.",
    }),
    defineField({
      name: "heroGradientOverlayEnabled",
      title: "Mostra gradiente nero",
      type: "boolean",
      group: "hero",
      description:
        "Attiva o disattiva il livello gradiente nero sopra il media iniziale.",
      initialValue: true,
    }),
    defineField({
      name: "heroTextColor",
      title: "Colore testo iniziale",
      type: "string",
      group: "hero",
      description:
        "Scegli se il testo sopra il media iniziale usa il nero o il bianco del sito.",
      initialValue: "white",
      options: {
        list: [
          { title: "Bianco", value: "white" },
          { title: "Nero", value: "black" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroTitle",
      title: "Titolo sezione iniziale",
      type: "localizedRichText",
      group: "hero",
      description: "Titolo principale in alto nella home.",
    }),
    defineField({
      name: "heroSubheading",
      title: "Sottotitolo sezione iniziale",
      type: "localizedRichText",
      group: "hero",
      description: "Breve testo sotto il titolo principale.",
    }),
    defineField({
      name: "mission",
      title: "Dichiarazione missione",
      type: "localizedRichText",
      group: "mission",
      description: "Testo grande subito dopo la sezione iniziale.",
    }),
    defineField({
      name: "potentialTitle",
      title: "Titolo intro metodo",
      type: "localizedRichText",
      group: "methodSteps",
      description: "Titolo sopra la lista degli step del metodo.",
    }),
    defineField({
      name: "methodSteps",
      title: "Step metodo",
      type: "array",
      group: "methodSteps",
      description: "Colonne compatte mostrate sotto il titolo intro metodo.",
      validation: (Rule) => Rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Titolo step",
              type: "localizedString",
              validation: (Rule) =>
                Rule.custom((value) => {
                  const title = value as
                    | { it?: string; en?: string }
                    | undefined;
                  return title?.it || title?.en
                    ? true
                    : "Aggiungi almeno una lingua.";
                }),
            }),
            defineField({
              name: "items",
              title: "Righe dello step",
              type: "array",
              description: "Brevi righe elencate sotto questo step.",
              of: [defineArrayMember({ type: "localizedString" })],
              validation: (Rule) => Rule.max(6),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare({ title, items }) {
              const localizedTitle = localizedPreviewText(title);
              const count = Array.isArray(items) ? items.length : 0;
              return {
                title: localizedTitle || "Step senza titolo",
                subtitle: count
                  ? `${count} rig${count === 1 ? "a" : "he"}`
                  : "Nessuna riga inserita",
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "methodologyLabel",
      title: "Etichetta metodologia",
      type: "localizedRichText",
      group: "methodology",
      description: "Piccola etichetta sopra il testo metodologia.",
    }),
    defineField({
      name: "methodology",
      title: "Testo metodologia",
      type: "localizedRichText",
      group: "methodology",
    }),
    defineField({
      name: "projectsTitle",
      title: "Titolo sezione progetti",
      type: "localizedRichText",
      group: "projects",
      description: "Titolo sopra la griglia dei progetti in evidenza.",
    }),
    defineField({
      name: "selectedClients",
      title: "Titolo clienti selezionati",
      type: "localizedRichText",
      group: "clients",
      description: "Titolo sopra la fascia dei loghi clienti.",
    }),
    defineField({
      name: "teamTitle",
      title: "Titolo sezione persone",
      type: "localizedRichText",
      group: "team",
    }),
    defineField({
      name: "teamImage",
      title: "Immagine persone",
      type: "image",
      group: "team",
      description: "Immagine mostrata nella sezione persone della home.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
    }),
    defineField({
      name: "teamIntro",
      title: "Introduzione persone",
      type: "localizedRichText",
      group: "team",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Pagina home" };
    },
  },
});
