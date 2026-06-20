// Canonical site origin for metadata, sitemap, and robots. Set
// NEXT_PUBLIC_SITE_URL in the deployment environment — the localhost fallback
// is only for local dev and will produce wrong absolute URLs in production.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

// Top-level routes (without locale prefix). Keep in sync with the app router.
export const routes = ["", "/projects", "/about", "/services", "/contact"] as const;

export function localizedUrl(locale: string, route = "") {
  return `${siteUrl}/${locale}${route}`;
}
