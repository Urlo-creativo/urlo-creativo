import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "gerfjp7t";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "urlo-creativo",
  title: "Urlo Creativo",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
