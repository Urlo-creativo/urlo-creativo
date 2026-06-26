import type { RichTextToken } from "@/components/ui/rich-text";

const servicesIt = {
  // Sanity content
  title: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  items: [
    {
      number: "01",
      title: "Lorem ipsum",
      details: [
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
      ],
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "02",
      title: "Lorem ipsum",
      details: ["Lorem ipsum", "Dolor sit", "Amet"],
      media: {
        fallbackImage: "/services/design-development-detail.png",
        alt: "",
      },
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "03",
      title: "Lorem ipsum",
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
      gallery: [
        {
          label: "Lorem ipsum",
          fallbackImage: "/services/styling-production.png",
          alt: "",
        },
        {
          label: "Dolor sit",
          fallbackImage: "/services/styling-art-direction.png",
          alt: "",
        },
        {
          label: "Amet",
          fallbackImage: "/services/styling-styling.png",
          alt: "",
        },
        {
          label: "Consectetur",
          fallbackImage: "/services/styling-photo-video.png",
          alt: "",
        },
      ],
      details: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
  ],
  collaborationTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  collaboration: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
};

// EN — English copy.
const servicesEn = {
  // Sanity content
  title: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  items: [
    {
      number: "01",
      title: "Lorem ipsum",
      details: [
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
        {
          title: [
            [{ text: "Lorem ipsum" }],
          ] satisfies RichTextToken[][],
          items: ["Lorem ipsum", "Dolor sit", "Amet"],
        },
      ],
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "02",
      title: "Lorem ipsum",
      details: ["Lorem ipsum", "Dolor sit", "Amet"],
      media: {
        fallbackImage: "/services/design-development-detail.png",
        alt: "",
      },
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "03",
      title: "Lorem ipsum",
      statement: [
        [{ text: "Lorem ipsum dolor sit amet." }],
      ] satisfies RichTextToken[][],
      gallery: [
        {
          label: "Lorem ipsum",
          fallbackImage: "/services/styling-production.png",
          alt: "",
        },
        {
          label: "Dolor sit",
          fallbackImage: "/services/styling-art-direction.png",
          alt: "",
        },
        {
          label: "Amet",
          fallbackImage: "/services/styling-styling.png",
          alt: "",
        },
        {
          label: "Consectetur",
          fallbackImage: "/services/styling-photo-video.png",
          alt: "",
        },
      ],
      details: ["Lorem ipsum", "Dolor sit", "Amet"],
    },
  ],
  collaborationTitle: [
    [{ text: "Lorem ipsum" }],
  ] satisfies RichTextToken[][],
  collaboration: [
    [{ text: "Lorem ipsum dolor sit amet." }],
  ] satisfies RichTextToken[][],
};

export const servicesDictionary = { it: servicesIt, en: servicesEn };
