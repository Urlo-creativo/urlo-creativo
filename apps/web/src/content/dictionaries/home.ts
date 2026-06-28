import {
  placeholderBodyRichText,
  placeholderRichText,
  placeholderText,
  placeholderTwoLineRichText,
} from "@/content/placeholders";

const placeholderMethod = {
  identify: {
    title: "1.PLACEHOLDER",
    items: [placeholderText.item],
  },
  define: {
    title: "2.PLACEHOLDER",
    items: [placeholderText.item],
  },
  express: {
    title: "3.PLACEHOLDER",
    items: [placeholderText.item],
  },
};

const homeIt = {
  // UI labels
  contactCta: "Prenota una consulenza >",
  discoverServices: "Scopri i servizi >",
  seeAllProjects: "Guarda tutti i progetti >",
  learnMore: "Scopri di più >",
  // Sanity fallbacks
  heroKicker: placeholderTwoLineRichText,
  heroTitle: placeholderRichText,
  heroSubheading: placeholderRichText,
  mission: placeholderBodyRichText,
  potentialTitle: placeholderRichText,
  method: placeholderMethod,
  projectsTitle: placeholderRichText,
  methodologyLabel: placeholderRichText,
  methodology: placeholderBodyRichText,
  selectedClients: placeholderRichText,
  teamTitle: placeholderRichText,
  teamIntro: placeholderBodyRichText,
};

const homeEn = {
  // UI labels
  contactCta: "Contact >",
  discoverServices: "Discover our services >",
  seeAllProjects: "See all projects >",
  learnMore: "Learn More >",
  // Sanity fallbacks
  heroKicker: placeholderTwoLineRichText,
  heroTitle: placeholderRichText,
  heroSubheading: placeholderRichText,
  mission: placeholderBodyRichText,
  potentialTitle: placeholderRichText,
  method: placeholderMethod,
  projectsTitle: placeholderRichText,
  methodologyLabel: placeholderRichText,
  methodology: placeholderBodyRichText,
  selectedClients: placeholderRichText,
  teamTitle: placeholderRichText,
  teamIntro: placeholderBodyRichText,
};

export const homeDictionary = { it: homeIt, en: homeEn };
