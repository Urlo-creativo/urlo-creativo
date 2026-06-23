import { defineField, defineType } from "sanity";

/**
 * A single piece of media inside a `projectMediaSection`.
 * It is either an image or a video (file upload or external URL).
 * Reused both inside media sections and as the optional project hero.
 */
export const projectMediaItemType = defineType({
  name: "projectMediaItem",
  title: "Elemento media / Media item",
  type: "object",
  fields: [
    defineField({
      name: "mediaType",
      title: "Tipo / Type",
      type: "string",
      options: {
        list: [
          { title: "Immagine / Image", value: "image" },
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
      title: "Immagine / Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== "image",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt / Alt text",
          type: "localizedString",
          description:
            "Descrivi l'immagine per accessibilita e SEO. / Describe the image for screen readers and SEO.",
        }),
      ],
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined;
          if (parent?.mediaType === "image" && !value) {
            return "Aggiungi un'immagine o cambia il tipo in Video. / Add an image or switch the type to Video.";
          }
          return true;
        }),
    }),

    // ----- Video -----
    defineField({
      name: "videoFile",
      title: "File video / Video file",
      type: "file",
      options: { accept: "video/*" },
      description:
        "Carica un file video, oppure usa un URL esterno. / Upload a video file, or use an external URL.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "videoUrl",
      title: "URL video esterno / External video URL",
      type: "url",
      description:
        "Esempio: file .mp4/.webm ospitato, Vimeo o YouTube. / Example: hosted .mp4/.webm, Vimeo or YouTube.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
    }),
    defineField({
      name: "poster",
      title: "Poster video / Video poster",
      type: "image",
      options: { hotspot: true },
      description:
        "Immagine opzionale mostrata prima del video. / Optional still shown before the video plays.",
      hidden: ({ parent }) => parent?.mediaType !== "video",
      fields: [
        defineField({
          name: "alt",
          title: "Testo alt / Alt text",
          type: "localizedString",
        }),
      ],
    }),

    // ----- Shared -----
    defineField({
      name: "caption",
      title: "Didascalia / Caption",
      type: "localizedString",
      description:
        "Testo opzionale sotto il media. / Optional caption shown under the media.",
    }),
  ],

  validation: (Rule) =>
    Rule.custom((value) => {
      const item = value as
        | { mediaType?: string; videoFile?: unknown; videoUrl?: string }
        | undefined;
      if (item?.mediaType === "video" && !item.videoFile && !item.videoUrl) {
        return "Aggiungi un file video o un URL esterno. / Add a video file or an external video URL.";
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
      const localizedCaption =
        typeof caption === "string" ? caption : caption?.it || caption?.en;
      return {
        title: localizedCaption || (isVideo ? "Video" : "Immagine / Image"),
        subtitle: isVideo ? `Video${videoUrl ? " · URL" : ""}` : "Immagine / Image",
        media: isVideo ? poster : image,
      };
    },
  },
});
