// Projects page UI chrome. Project content comes from Sanity; fixed labels,
// filters and empty states stay in the app dictionary. Category labels are
// derived from the single source in `@/lib/sanity/categories`.
import { categoryLabelsFor } from "@/lib/sanity/categories";

const projectsIt = {
  title: "PROGETTI",
  allLabel: "TUTTI",
  emptyAll: "Nessun progetto ancora.",
  emptyCategory: "Nessun progetto in questa categoria.",
  categoryLabels: categoryLabelsFor("it"),
  detailLabels: {
    rolesServices: "Ruoli / Servizi",
    challenge: "Sfida",
    concept: "Concept",
    process: "Processo",
    responsibilities: "Responsabilita",
    outcome: "Risultato",
    credits: "Crediti",
    behindTheScenes: "Dietro le quinte",
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
    challenge: "Challenge",
    concept: "Concept",
    process: "Process",
    responsibilities: "Responsibilities",
    outcome: "Outcome",
    credits: "Credits",
    behindTheScenes: "Behind the Scenes",
  },
};

export const projectsDictionary = { it: projectsIt, en: projectsEn };
