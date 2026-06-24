import type { RichTextToken } from "@/components/ui/rich-text";

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
// `items` mixes three shapes (structured details / media / gallery) that
// ServiceAccordion narrows via `"media" in item` etc. — keep that shape when
// this content moves to Sanity (model as discriminated array members).
const servicesIt = {
  title: "SERVICES",
  items: [
    {
      number: "01",
      title: "Brand Identity & Communication",
      details: [
        {
          title: [
            [{ text: "Brand strategy", highlight: "blue", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Brand analysis and context",
            "Positioning definition",
            "Tone of voice construction",
          ],
        },
        {
          title: [
            [{ text: "Visual identity", highlight: "pink", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Logo development",
            "Visual systems",
            "Guidelines",
            "Brand book",
          ],
        },
        {
          title: [
            [{ text: "Communication", highlight: "yellow", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Website",
            "Newsletter",
            "Editorial content",
            "Digital and social communication",
          ],
        },
      ],
    },
    {
      number: "02",
      title: "Design & Product Development",
      details: [
        "TREND RESEARCH AND POSITIONING",
        "COLLECTION STRUCTURE",
        "MOODBOARD",
        "FABRIC, PRODUCT AND MATERIAL RESEARCH",
        "GRAPHIC DEVELOPMENT",
        "SOURCING AND SUPPLIER FOLLOW-UP",
      ],
      media: {
        image: "/services/design-development-detail.png",
        alt: "",
      },
      statement: [
        [
          { text: "We " },
          { text: "design", highlight: "pink", trigger: "load" },
          { text: " collections," },
        ],
        [
          { text: "from the " },
          { text: "idea", bold: true },
          { text: " to " },
          { text: "product", bold: true },
        ],
        [{ text: "development.", bold: true }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "03",
      title: "Styling / Shooting & Art Direction",
      statement: [
        [
          { text: "We ", bold: true, italic: true },
          {
            text: "define",
            bold: true,
            italic: true,
            highlight: "coral",
            trigger: "load",
          },
          { text: " the brand’s", bold: true, italic: true },
        ],
        [{ text: "visual identity.", bold: true, italic: true }],
      ] satisfies RichTextToken[][],
      gallery: [
        {
          label: "PRODUCTION",
          image: "/services/styling-production.png",
          alt: "",
        },
        {
          label: "ART DIRECTION",
          image: "/services/styling-art-direction.png",
          alt: "",
        },
        {
          label: "STYLING",
          image: "/services/styling-styling.png",
          alt: "",
        },
        {
          label: "PHOTO AND VIDEO SHOOTINGS",
          image: "/services/styling-photo-video.png",
          alt: "",
        },
      ],
      details: [
        "PRODUCTION",
        "ART DIRECTION",
        "STYLING",
        "PHOTO AND VIDEO SHOOTINGS",
      ],
    },
  ],
  statement: [
    [
      { text: "We " },
      { text: "identify", highlight: "blue", trigger: "load" },
      { text: " the brand and define its " },
      { text: "personality.", highlight: "pink", trigger: "load" },
    ],
  ] satisfies RichTextToken[][],
  collaborationTitle: [
    [{ text: "Collaboration", highlight: "coral", trigger: "load" }],
  ] satisfies RichTextToken[][],
  collaboration: [
    [
      {
        text: "We suggest the right atmospheres, settings and faces for launch shootings.",
      },
    ],
  ] satisfies RichTextToken[][],
};

// EN — English copy.
const servicesEn = {
  title: "SERVICES",
  items: [
    {
      number: "01",
      title: "Brand Identity & Communication",
      details: [
        {
          title: [
            [{ text: "Brand strategy", highlight: "blue", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Brand analysis and context",
            "Positioning definition",
            "Tone of voice construction",
          ],
        },
        {
          title: [
            [{ text: "Visual identity", highlight: "pink", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Logo development",
            "Visual systems",
            "Guidelines",
            "Brand book",
          ],
        },
        {
          title: [
            [{ text: "Communication", highlight: "yellow", trigger: "load" }],
          ] satisfies RichTextToken[][],
          items: [
            "Website",
            "Newsletter",
            "Editorial content",
            "Digital and social communication",
          ],
        },
      ],
    },
    {
      number: "02",
      title: "Design & Product Development",
      details: [
        "TREND RESEARCH AND POSITIONING",
        "COLLECTION STRUCTURE",
        "MOODBOARD",
        "FABRIC, PRODUCT AND MATERIAL RESEARCH",
        "GRAPHIC DEVELOPMENT",
        "SOURCING AND SUPPLIER FOLLOW-UP",
      ],
      media: {
        image: "/services/design-development-detail.png",
        alt: "",
      },
      statement: [
        [
          { text: "We " },
          { text: "design", highlight: "pink", trigger: "load" },
          { text: " collections," },
        ],
        [
          { text: "from the " },
          { text: "idea", bold: true },
          { text: " to " },
          { text: "product", bold: true },
        ],
        [{ text: "development.", bold: true }],
      ] satisfies RichTextToken[][],
    },
    {
      number: "03",
      title: "Styling / Shooting & Art Direction",
      statement: [
        [
          { text: "We ", bold: true, italic: true },
          {
            text: "define",
            bold: true,
            italic: true,
            highlight: "coral",
            trigger: "load",
          },
          { text: " the brand’s", bold: true, italic: true },
        ],
        [{ text: "visual identity.", bold: true, italic: true }],
      ] satisfies RichTextToken[][],
      gallery: [
        {
          label: "PRODUCTION",
          image: "/services/styling-production.png",
          alt: "",
        },
        {
          label: "ART DIRECTION",
          image: "/services/styling-art-direction.png",
          alt: "",
        },
        {
          label: "STYLING",
          image: "/services/styling-styling.png",
          alt: "",
        },
        {
          label: "PHOTO AND VIDEO SHOOTINGS",
          image: "/services/styling-photo-video.png",
          alt: "",
        },
      ],
      details: [
        "PRODUCTION",
        "ART DIRECTION",
        "STYLING",
        "PHOTO AND VIDEO SHOOTINGS",
      ],
    },
  ],
  statement: [
    [
      { text: "We " },
      { text: "identify", highlight: "blue", trigger: "load" },
      { text: " the brand and define its " },
      { text: "personality.", highlight: "pink", trigger: "load" },
    ],
  ] satisfies RichTextToken[][],
  collaborationTitle: [
    [{ text: "Collaboration", highlight: "coral", trigger: "load" }],
  ] satisfies RichTextToken[][],
  collaboration: [
    [
      {
        text: "We suggest the right atmospheres, settings and faces for launch shootings.",
      },
    ],
  ] satisfies RichTextToken[][],
};

export const servicesDictionary = { it: servicesIt, en: servicesEn };
