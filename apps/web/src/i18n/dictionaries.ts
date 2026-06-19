import type { RichTextToken } from "@/components/rich-text";
import type { Locale } from "./config";

const dictionaries = {
  it: {
    metadata: {
      description:
        "Urlo Creativo è uno studio creativo multidisciplinare con base a Milano, attivo in brand identity, design, product development e art direction.",
    },
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About Us",
      services: "Services",
      contact: "Contact",
    },
    home: {
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
          { text: "Urlo Creativo is proudly powered by women in bonded.", highlight: "yellow", trigger: "scroll" },
          {
            text: " In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
          },
        ],
      ] satisfies RichTextToken[][],
      learnMore: "Learn More",
      contactCta: "Contact",
      discoverServices: "Discover our services",
    },
    projects: {
      title: "PROJECTS",
      filters: [
        "ALL",
        "BRAND IDENTITY & COMMUNICATION",
        "DESIGN & PRODUCT DEVELOPMENT",
        "STYLING / SHOOTING & ART DIRECTION",
      ],
      items: [
        {
          title: "Velasca: Capsule Collection “Silene”",
          year: "2025",
          description:
            "Create a poetic and meaningful clothing capsule for a brand traditionally known for its craftsmanship and informal Italian identity.",
        },
        {
          title: "Colmar Sport: Skiwear Redesign",
          year: "2025",
          description:
            "Refresh and modernize the men’s and women’s skiwear collections.",
        },
      ],
    },
    contact: {
      title: "Let’s get in touch!",
      address:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      ctaLabel: "Book a consultation",
      emailHref: "mailto:info@consulenzecreativeperetto.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ],
    },
    footer: {
      title: "Contact",
      address:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      ctaLabel: "Book a consultation",
      emailHref: "mailto:info@consulenzecreativeperetto.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ],
    },
    about: {
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
    },
  },
  en: {
    metadata: {
      description:
        "Urlo Creativo is a Milan-based multidisciplinary creative studio working across brand identity, design, product development, and art direction.",
    },
    nav: {
      home: "Home",
      projects: "Projects",
      about: "About Us",
      services: "Services",
      contact: "Contact",
    },
    home: {
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
          { text: "Urlo Creativo is proudly powered by women in bonded.", highlight: "yellow", trigger: "scroll" },
          {
            text: " In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
          },
        ],
      ] satisfies RichTextToken[][],
      learnMore: "Learn More",
      contactCta: "Contact",
      discoverServices: "Discover our services",
    },
    projects: {
      title: "PROJECTS",
      filters: [
        "ALL",
        "BRAND IDENTITY & COMMUNICATION",
        "DESIGN & PRODUCT DEVELOPMENT",
        "STYLING / SHOOTING & ART DIRECTION",
      ],
      items: [
        {
          title: "Velasca: Capsule Collection “Silene”",
          year: "2025",
          description:
            "Create a poetic and meaningful clothing capsule for a brand traditionally known for its craftsmanship and informal Italian identity.",
        },
        {
          title: "Colmar Sport: Skiwear Redesign",
          year: "2025",
          description:
            "Refresh and modernize the men’s and women’s skiwear collections.",
        },
      ],
    },
    contact: {
      title: "Let’s get in touch!",
      address:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      ctaLabel: "Book a consultation",
      emailHref: "mailto:info@consulenzecreativeperetto.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ],
    },
    footer: {
      title: "Contact",
      address:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      ctaLabel: "Book a consultation",
      emailHref: "mailto:info@consulenzecreativeperetto.com",
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com" },
        { label: "Instagram", href: "https://www.instagram.com" },
      ],
    },
    about: {
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
    },
  },
} satisfies Record<Locale, object>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
