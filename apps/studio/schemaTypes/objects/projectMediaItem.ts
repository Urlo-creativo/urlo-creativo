import { defineField, defineType } from "sanity";

import { localizedPreviewText } from "../utils/preview";

/**
 * A single piece of media inside a `projectMediaSection`.
 * It is either an image or a video (file upload or external URL).
 * Reused both inside media sections and as the optional project hero.
 */
export const projectMediaItemType = defineType({
  name: "projectMediaItem",
  title: "Elemento media",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Tipo media",
      type: "string",
      options: {
        list: [
          { title: "Immagine", value: "image" },
          { title: "Video", value: "video" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "image",
      validation: (Rule) => Rule.required(),
    }),

    // ----- Image -----
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
          description: "Descrivi l'immagine per accessibilità e SEO.",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "image" && !value) {
            return "Aggiungi un'immagine o passa il tipo media a Video.";
          }
          return true;
        }),
    }),

    // ----- Video -----
    defineField({
      name: "videoFile",
      title: "File video",
      type: "file",
      options: { accept: "video/*" },
      description: "Carica un video oppure usa un URL video esterno.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "URL video esterno",
      type: "url",
      description: "URL .mp4/.webm, Vimeo o YouTube.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "poster",
      title: "Poster video",
      type: "image",
      options: { hotspot: true },
      description: "Immagine opzionale mostrata prima del video.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt",
          type: "localizedString",
        }),
      ],
    }),

    // ----- Shared -----
    defineField({
      name: "caption",
      title: "Didascalia",
      type: "localizedString",
      description: "Didascalia opzionale sotto gli elementi media.",
      // Media items inside an array carry a `_key`; the single `heroMedia`
      // object field does not. Hide the caption on the hero, where it isn't
      // rendered and makes no sense.
      hidden: ({ parent }) => !(parent as { _key?: string } | undefined)?._key,
    }),
  ],

  validation: (Rule) =>
    Rule.custom((value) => {
      const item = value as
        | { mediaType?: string; videoFile?: unknown; videoUrl?: string }
        | undefined;
      if (item?.mediaType === "video" && !item.videoFile && !item.videoUrl) {
        return "Aggiungi un file video oppure un URL video esterno.";
      }
      return true;
    }),

  preview: {
    select: {
      mediaType: "mediaType",
      caption: "caption",
      videoUrl: "videoUrl",
      image: "image",
      poster: "poster",
    },
    prepare({ mediaType, caption, videoUrl, image, poster }) {
      const isVideo = mediaType === "video";
      const localizedCaption = localizedPreviewText(caption);
      return {
        title: localizedCaption || (isVideo ? "Video" : "Immagine"),
        subtitle: isVideo
          ? `Video${videoUrl ? " · URL esterno" : " · file"}`
          : "Immagine",
        media: isVideo ? poster : image,
      };
    },
  },
});
