import type { RichTextToken } from "@/components/ui/rich-text";

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
const aboutIt = {
  title: [
    [
      { text: "ABOUT THE", bold: true },
    ],
    [
      { text: "AGENCY", bold: true, highlight: "yellow", trigger: "load" },
    ],
  ] satisfies RichTextToken[][],
  intro:
    "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.",
  statement: [
    [
      { text: "Urlo Creativo", bold: true },
      {
        text: " is an agency dedicated to bringing out that potential. A ",
      },
      { text: "diverse team", bold: true },
      {
        text: " of professionals operating as an open system, brought together based on the ",
      },
      { text: "project's needs", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  teamCoreTitle: "TEAM CORE",
  coreRoles: [
    "Fashion Designer",
    "Copy Writer",
    "Graphic Designer",
    "Stylist",
    "UI/UX Designer and Writer",
  ],
  processTitle: "HOW WE WORK",
  processStages: [
    "Discovery",
    "Strategy",
    "Identity",
    "Development",
    "Production",
    "Growth",
  ],
  processDescriptions: [
    "Brand, context and objective analysis.",
    "Positioning, narrative and communication strategy.",
    "Visual and verbal identity system.",
    "Design and production of brand materials.",
    "Execution across all touchpoints.",
    "Ongoing support and brand evolution.",
  ],
  missionTitle: "MISSION",
  mission:
    "We love brands with personality. This is why we dig deep to bring it to the surface.",
  missionHighlight: [
    [{ text: "WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.", bold: true, highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  historyTitle: [
    [{ text: "HISTORY/VALUE", bold: true, highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  historyStart: "Begin",
  historyNow: "Now",
  historyStartYear: "2024",
  historyNowYear: "2026",
  historyStartDescription: [
    [
      {
        text: "Urlo Creativo was founded as a clothing design studio based on Giulia Peretto's vision. The idea was to ",
      },
      { text: "subvert traditional work methods", bold: true },
      {
        text: " and create an ecosystem of capable, flexible, and ",
      },
      { text: "ethical people", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  historyNowDescription: [
    [
      { text: "Today it is a " },
      { text: "multidisciplinary hub", bold: true },
      {
        text: " with all the know-how necessary for ",
      },
      { text: "brand development", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  peopleTitle: "PEOPLE",
  team: [
    {
      name: "Giulia",
      role: "Founder of Urlo Creativo, Graphic Designer, Project Manager",
    },
    {
      name: "Federica",
      role: "Graphic Designer, UI/UX Designer",
    },
    {
      name: "Martina",
      role: "Brand Identity Strategist, Copywriter, UX Writer",
    },
    {
      name: "Margherita",
      role: "Surface, Colour and Textile Designer",
    },
    {
      name: "Valentina",
      role: "Technical Designer and Product Developer",
    },
    {
      name: "Camilla",
      role: "Stylist",
    },
  ],
};

// EN — English copy.
const aboutEn = {
  title: [
    [
      { text: "ABOUT THE", bold: true },
    ],
    [
      { text: "AGENCY", bold: true, highlight: "yellow", trigger: "load" },
    ],
  ] satisfies RichTextToken[][],
  intro:
    "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the hidden potential of brands. A flexible network of professionals working together depending on each project.",
  statement: [
    [
      { text: "Urlo Creativo", bold: true },
      {
        text: " is an agency dedicated to bringing out that potential. A ",
      },
      { text: "diverse team", bold: true },
      {
        text: " of professionals operating as an open system, brought together based on the ",
      },
      { text: "project's needs", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  teamCoreTitle: "TEAM CORE",
  coreRoles: [
    "Fashion Designer",
    "Copy Writer",
    "Graphic Designer",
    "Stylist",
    "UI/UX Designer and Writer",
  ],
  processTitle: "HOW WE WORK",
  processStages: [
    "Discovery",
    "Strategy",
    "Identity",
    "Development",
    "Production",
    "Growth",
  ],
  processDescriptions: [
    "Brand, context and objective analysis.",
    "Positioning, narrative and communication strategy.",
    "Visual and verbal identity system.",
    "Design and production of brand materials.",
    "Execution across all touchpoints.",
    "Ongoing support and brand evolution.",
  ],
  missionTitle: "MISSION",
  mission:
    "We love brands with personality. This is why we dig deep to bring it to the surface.",
  missionHighlight: [
    [{ text: "WE DEVELOP IDEAS THROUGH WORDS AND IMAGES.", bold: true, highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  historyTitle: [
    [{ text: "HISTORY/VALUE", bold: true, highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  historyStart: "Begin",
  historyNow: "Now",
  historyStartYear: "2024",
  historyNowYear: "2026",
  historyStartDescription: [
    [
      {
        text: "Urlo Creativo was founded as a clothing design studio based on Giulia Peretto's vision. The idea was to ",
      },
      { text: "subvert traditional work methods", bold: true },
      {
        text: " and create an ecosystem of capable, flexible, and ",
      },
      { text: "ethical people", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  historyNowDescription: [
    [
      { text: "Today it is a " },
      { text: "multidisciplinary hub", bold: true },
      {
        text: " with all the know-how necessary for ",
      },
      { text: "brand development", bold: true },
      { text: "." },
    ],
  ] satisfies RichTextToken[][],
  peopleTitle: "PEOPLE",
  team: [
    {
      name: "Giulia",
      role: "Founder of Urlo Creativo, Graphic Designer, Project Manager",
    },
    {
      name: "Federica",
      role: "Graphic Designer, UI/UX Designer",
    },
    {
      name: "Martina",
      role: "Brand Identity Strategist, Copywriter, UX Writer",
    },
    {
      name: "Margherita",
      role: "Surface, Colour and Textile Designer",
    },
    {
      name: "Valentina",
      role: "Technical Designer and Product Developer",
    },
    {
      name: "Camilla",
      role: "Stylist",
    },
  ],
};

export const aboutDictionary = { it: aboutIt, en: aboutEn };
