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
      potentialLine1: "EVERY BRAND",
      potentialLine2: "HAS A",
      potentialAccent: "POTENTIAL",
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
      viewAll: "View all",
      seeAllProjects: "See all projects",
      methodologyLabel: "Methodology",
      methodology:
        "At Urlo Creativo, we start by understanding each brand's context, goals, and audience to uncover its core potential. We then define a clear positioning and build a coherent identity that guides every creative decision. Through a flexible, multidisciplinary approach, we transform strategy into visuals, products, and communication, supporting brands with solutions that evolve over time.",
      whatWeDo: "What we do",
      selectedClientsTitle: "SELECTED",
      selectedClientsAccent: "CLIENTS",
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
      teamIntro:
        "Urlo Creativo is proudly powered by women in bonded. In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
      learnMore: "Learn More",
      contactTitle: "CONTACT",
      contactAddress:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      contactCta: "Contact",
      consultationCta: "Book a consultation",
      discoverServices: "Discover our services",
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
      potentialLine1: "EVERY BRAND",
      potentialLine2: "HAS A",
      potentialAccent: "POTENTIAL",
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
      viewAll: "View all",
      seeAllProjects: "See all projects",
      methodologyLabel: "Methodology",
      methodology:
        "At Urlo Creativo, we start by understanding each brand's context, goals, and audience to uncover its core potential. We then define a clear positioning and build a coherent identity that guides every creative decision. Through a flexible, multidisciplinary approach, we transform strategy into visuals, products, and communication, supporting brands with solutions that evolve over time.",
      whatWeDo: "What we do",
      selectedClientsTitle: "SELECTED",
      selectedClientsAccent: "CLIENTS",
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
      teamIntro:
        "Urlo Creativo is proudly powered by women in bonded. In an industry where female voices are still underrepresented, we bring together a diverse network of creative professionals who lead with vision, sensitivity, and strength. Our approach is collaborative, intuitive, and driven by a shared commitment to shaping meaningful and impactful brands.",
      learnMore: "Learn More",
      contactTitle: "CONTACT",
      contactAddress:
        "Via Corrado II il Salico, 28\nMilan | 20141\n\n+39 3703028027\ninfo@consulenzecreativeperetto.com",
      contactCta: "Contact",
      consultationCta: "Book a consultation",
      discoverServices: "Discover our services",
    },
  },
} satisfies Record<Locale, object>;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
