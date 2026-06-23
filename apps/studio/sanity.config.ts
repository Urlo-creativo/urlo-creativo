import { languageFilter } from "@sanity/language-filter";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { defaultLocale, supportedLocales } from "../../shared/locales";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "rj63sc4z";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";
const organizationId =
  process.env.SANITY_STUDIO_ORGANIZATION_ID || "o8QxDdBzd";

export default defineConfig({
  name: "urlo-creativo",
  title: "Urlo Creativo",
  projectId,
  dataset,
  organizationId,
  plugins: [
    structureTool(),
    // Toolbar toggle to show one language at a time. Only affects the
    // localizedString / localizedText fields, so editors aren't faced with
    // every IT + EN input at once.
    languageFilter({
      supportedLanguages: supportedLocales.map((locale) => ({
        id: locale.id,
        title: locale.title,
      })),
      defaultLanguages: [defaultLocale],
      // Required: the toggle is only enabled for the document types listed here.
      documentTypes: ["project"],
      filterField: (enclosingType, member, selectedLanguages) =>
        !enclosingType.name.startsWith("localized") ||
        (member.kind === "field" && selectedLanguages.includes(member.name)),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
