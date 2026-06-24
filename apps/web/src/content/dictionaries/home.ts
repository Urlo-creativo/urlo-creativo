import type { RichTextToken } from "@/components/ui/rich-text";

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
const homeIt = {
  heroKicker:
    "URLO CREATIVO IS A MULTIDISCIPLINARY STUDIO\nbrand identity • design • product development • art direction",
  heroTitle: "URLO CREATIVO",
  heroSubheading: "WHERE BRANDS TAKE SHAPE",
  mission:
    "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the full potential of brands.",
  potentialTitle: [
    [
      { text: "EVERY", bold: true, highlight: "pink", trigger: "scroll" },
      { text: " BRAND", bold: true },
    ],
    [
      { text: "HAS A ", bold: true },
      {
        text: "POTENTIAL",
        italic: true,
        highlight: "yellow",
        trigger: "scroll",
      },
    ],
  ] satisfies RichTextToken[][],
  method: {
    identify: {
      title: "1.IDENTIFY",
      items: [
        "What drives the brand",
        "Where it wants to go",
        "Who it wants to speak to",
      ],
    },
    define: {
      title: "2.DEFINE",
      items: ["Visual identity", "Verbal identity", "Strategic positioning"],
    },
    express: {
      title: "3.EXPRESS",
      items: [
        "Product development",
        "Communication",
        "Digital presence",
      ],
    },
  },
  projectsTitle: "PROJECTS",
  seeAllProjects: "See all projects",
  methodologyLabel: [
    [{ text: "Methodology", highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  methodology: [
    [
      { text: "At " },
      { text: "Urlo Creativo,", bold: true },
      { text: " we start by understanding each " },
      { text: "brand's context", bold: true },
      { text: ", " },
      { text: "goals", bold: true },
      { text: ", and " },
      { text: "audience", bold: true },
      { text: " to uncover its core " },
      { text: "potential", bold: true },
      {
        text: ". We then define a clear positioning and build a coherent identity that guides every creative decision. Through a flexible, ",
      },
      { text: "multidisciplinary", bold: true },
      {
        text: " approach, we transform strategy into visuals, products, and communication, supporting brands with solutions that evolve over time.",
      },
    ],
  ] satisfies RichTextToken[][],
  whatWeDo: "What we do",
  selectedClients: [
    [
      { text: "SELECTED", bold: true },
      { text: " " },
      { text: "CLIENTS", italic: true },
    ],
  ] satisfies RichTextToken[][],
  servicesTitle: "SERVICES",
  servicesIntro:
    "We develop ideas through words and images. From strategy to execution, we shape identities, campaigns and product stories with a clear point of view.",
  services: [
    "Brand identity & communication",
    "Product development",
    "Art direction",
    "Digital presence",
  ],
  teamTitle: "PEOPLE",
  teamIntro: [
    [
      { text: "Urlo Creativo is proudly powered by women in bonded.", highlight: "orange", trigger: "scroll" },
      {
        text: " In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
      },
    ],
  ] satisfies RichTextToken[][],
  learnMore: "Learn More",
  contactCta: "Contact",
  discoverServices: "Discover our services",
};

// EN — English copy.
const homeEn = {
  heroKicker:
    "URLO CREATIVO IS A MULTIDISCIPLINARY STUDIO\nbrand identity • design • product development • art direction",
  heroTitle: "URLO CREATIVO",
  heroSubheading: "WHERE BRANDS TAKE SHAPE",
  mission:
    "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the full potential of brands.",
  potentialTitle: [
    [
      { text: "EVERY", bold: true, highlight: "pink", trigger: "scroll" },
      { text: " BRAND", bold: true },
    ],
    [
      { text: "HAS A ", bold: true },
      {
        text: "POTENTIAL",
        italic: true,
        highlight: "yellow",
        trigger: "scroll",
      },
    ],
  ] satisfies RichTextToken[][],
  method: {
    identify: {
      title: "1.IDENTIFY",
      items: [
        "What drives the brand",
        "Where it wants to go",
        "Who it wants to speak to",
      ],
    },
    define: {
      title: "2.DEFINE",
      items: ["Visual identity", "Verbal identity", "Strategic positioning"],
    },
    express: {
      title: "3.EXPRESS",
      items: [
        "Product development",
        "Communication",
        "Digital presence",
      ],
    },
  },
  projectsTitle: "PROJECTS",
  seeAllProjects: "See all projects",
  methodologyLabel: [
    [{ text: "Methodology", highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  methodology: [
    [
      { text: "At " },
      { text: "Urlo Creativo,", bold: true },
      { text: " we start by understanding each " },
      { text: "brand's context", bold: true },
      { text: ", " },
      { text: "goals", bold: true },
      { text: ", and " },
      { text: "audience", bold: true },
      { text: " to uncover its core " },
      { text: "potential", bold: true },
      {
        text: ". We then define a clear positioning and build a coherent identity that guides every creative decision. Through a flexible, ",
      },
      { text: "multidisciplinary", bold: true },
      {
        text: " approach, we transform strategy into visuals, products, and communication, supporting brands with solutions that evolve over time.",
      },
    ],
  ] satisfies RichTextToken[][],
  whatWeDo: "What we do",
  selectedClients: [
    [
      { text: "SELECTED", bold: true },
      { text: " " },
      { text: "CLIENTS", italic: true },
    ],
  ] satisfies RichTextToken[][],
  servicesTitle: "SERVICES",
  servicesIntro:
    "We develop ideas through words and images. From strategy to execution, we shape identities, campaigns and product stories with a clear point of view.",
  services: [
    "Brand identity & communication",
    "Product development",
    "Art direction",
    "Digital presence",
  ],
  teamTitle: "PEOPLE",
  teamIntro: [
    [
      { text: "Urlo Creativo is proudly powered by women in bonded.", highlight: "orange", trigger: "scroll" },
      {
        text: " In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
      },
    ],
  ] satisfies RichTextToken[][],
  learnMore: "Learn More",
  contactCta: "Contact",
  discoverServices: "Discover our services",
};

export const homeDictionary = { it: homeIt, en: homeEn };
