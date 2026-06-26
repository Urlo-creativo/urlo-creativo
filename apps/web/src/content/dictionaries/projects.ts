// Projects page UI chrome. Project content comes from Sanity; fixed labels,
// filters and empty states stay in the app dictionary. Category labels are
// derived from the single source in `@/lib/sanity/categories`.
import type { RichTextToken } from "@/components/ui/rich-text";
import { categoryLabelsFor } from "@/lib/sanity/categories";

// Highlight decoration (colour + reveal trigger) for each fixed detail-page
// section heading. Neither is localized, so it is defined once here and merged
// into the per-locale headings below. The headings render through the standard
// StructuredRichText / RichTextToken pipeline used across the site.
// trigger: "scroll" = progressive fill on scroll, "load" = reveal once on
// enter, "static" = always shown.
const sectionStyle = {
  challenge: { highlight: "pink", trigger: "scroll" },
  concept: { highlight: "blue", trigger: "scroll" },
  process: { highlight: "yellow", trigger: "scroll" },
  responsibilities: { highlight: "blue", trigger: "scroll" },
  outcome: { highlight: "pink", trigger: "scroll" },
} as const;

function sectionHeading(
  text: string,
  key: keyof typeof sectionStyle,
): RichTextToken[][] {
  return [[{ text, bold: true, ...sectionStyle[key] }]];
}

const projectsIt = {
  title: "PROGETTI",
  allLabel: "TUTTI",
  emptyAll: "Nessun progetto ancora.",
  emptyCategory: "Nessun progetto in questa categoria.",
  categoryLabels: categoryLabelsFor("it"),
  detailLabels: {
    rolesServices: "Ruoli / Servizi",
    challenge: sectionHeading("Sfida", "challenge"),
    concept: sectionHeading("Concept", "concept"),
    process: sectionHeading("Processo", "process"),
    responsibilities: sectionHeading("Responsabilita", "responsibilities"),
    outcome: sectionHeading("Risultato", "outcome"),
    credits: "Crediti",
    behindTheScenes: "Dietro le quinte",
    seeOtherProjects: "Vedi altri progetti",
  },
};

// EN — English copy.
const projectsEn = {
  title: "PROJECTS",
  allLabel: "ALL",
  emptyAll: "No projects yet.",
  emptyCategory: "No projects in this category.",
  categoryLabels: categoryLabelsFor("en"),
  detailLabels: {
    rolesServices: "Roles / Services",
    challenge: sectionHeading("Challenge", "challenge"),
    concept: sectionHeading("Concept", "concept"),
    process: sectionHeading("Process", "process"),
    responsibilities: sectionHeading("Responsibilities", "responsibilities"),
    outcome: sectionHeading("Outcome", "outcome"),
    credits: "Credits",
    behindTheScenes: "Behind the Scenes",
    seeOtherProjects: "See other projects",
  },
};

export const projectsDictionary = { it: projectsIt, en: projectsEn };
