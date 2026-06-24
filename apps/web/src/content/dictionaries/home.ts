import type { RichTextToken } from "@/components/ui/rich-text";

// ⚠️ IT — Italian copy. Currently an English placeholder; translate each string.
const homeIt = {
  heroKicker:
    "URLO CREATIVO È UN HUB MULTIDISCIPLINARE\nidentità di brand · design · sviluppo prodotto · art direction",
  heroTitle: "URLO CREATIVO",
  heroSubheading: "DOVE I BRAND PRENDONO FORMA",
  mission:
    "Aiutiamo i brand a costruire identità, prodotti ed esperienze che le persone possano riconoscere, vivere e ricordare.\nAttraverso strategia, design, sviluppo prodotto e comunicazione.",
  contactCta: "Contact",
  potentialTitle: [
    [
      { text: " DAL ", bold: true },
      { text: "POTENZIALE", bold: true, highlight: "pink", trigger: "scroll" },
    ],
    [
      { text: "ALLA ", bold: true },
      {
        text: "FORMA",
        italic: true,
        highlight: "yellow",
        trigger: "scroll",
      },
    ],
  ] satisfies RichTextToken[][],
  method: {
    identify: {
      title: "1.IDENTIFICARE",
      items: [
        "Cosa guida il brand",
        "Dove vuole andare",
        "A chi si vuole rivolgere",
      ],
    },
    define: {
      title: "2.DEFINE",
      items: ["Identità visiva", "Identità verbale", "Posizionamento strategico"],
    },
    express: {
      title: "3.ESPRIMERE",
      items: [
        "Design e sviluppo del prodotto",
        "Comunicazione",
        "Presenza digitale",
      ],
    },
  },
  discoverServices: "Scopri i servizi >",
  projectsTitle: "ALCUNI PROGETTI",
  seeAllProjects: "Guarda tutti i progetti >",
  methodologyLabel: [
    [{ text: "Il nostro metodo", highlight: "yellow", trigger: "scroll" }],
  ] satisfies RichTextToken[][],
  methodology: [
    [
      { text: "Ogni progetto riunisce prospettive, competenze e discipline diverse.\n\n", bold: true },
      { text: " Non seguiamo una formula fissa, ma costruiamo il team attorno alle esigenze del brand, creando una direzione condivisa che guidi il processo in ogni sua fase. \n\n" },
      { text: "Lavoriamo a stretto contatto con i nostri clienti: questo ci aiuta a " },
      { text: "far emergere l’unicità del brand ", bold: true },
      { text: "e a meglio valorizzarla.\n\n" },
      { text: "Così nasce un " },
      { text: "ecosistema coerente", bold: true },
      { text: ", in cui ciò che un brand dice, crea e mostra diventa parte della stessa storia." },
    ],
  ] satisfies RichTextToken[][],
  whatWeDo: "What we do",
  selectedClients: [
    [
      { text: "LA SELEZIONE DEI ", bold: true },
      { text: "CLIENTI", italic: true },
    ],
  ] satisfies RichTextToken[][],
  teamTitle: "LE PERSONE",
  teamIntro: [
    [
      { text: "Urlo Creativo è una " },
      { text: "rete connessa di professioniste indipendenti.\n\n", bold: true, highlight: "orange", trigger: "scroll" },
      {
        text: "Ogni membro porta con sé un background, una prospettiva e un’area di competenza diversa, dando vita a un ",
      },
      { text: "collettivo che cresce	 ed evolve attraverso la collaborazione.", bold: true },
    ],
  ] satisfies RichTextToken[][],
  learnMore: "Scopri di più >",
};

// EN — English copy.
const homeEn = {
  heroKicker:
    "URLO CREATIVO IS A MULTIDISCIPLINARY STUDIO\nbrand identity • design • product development • art direction",
  heroTitle: "URLO CREATIVO",
  heroSubheading: "WHERE BRANDS TAKE SHAPE",
  mission:
    "Urlo Creativo is a multidisciplinary creative agency dedicated to bringing out the full potential of brands.",
  contactCta: "Contact",
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
  discoverServices: "Discover our services",
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
};

export const homeDictionary = { it: homeIt, en: homeEn };
