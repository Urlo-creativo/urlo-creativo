export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-06-18";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gerfjp7t";

export const hasSanityConfig = Boolean(projectId && dataset);
