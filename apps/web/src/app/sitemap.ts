import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { client } from "@/lib/sanity/client";
import { projectSlugsQuery } from "@/lib/sanity/queries";
import { localizedUrl, routes } from "@/lib/site";

export const revalidate = 3600;

function entriesFor(route: string): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: localizedUrl(locale, route),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, localizedUrl(l, route)]),
      ),
    },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Project detail pages come from Sanity; if the fetch fails, still serve the
  // static routes rather than a 500 for the whole sitemap.
  const slugs = await client
    .fetch<string[]>(projectSlugsQuery)
    .catch(() => [] as string[]);

  return [
    ...routes.flatMap((route) => entriesFor(route)),
    ...slugs.flatMap((slug) => entriesFor(`/projects/${slug}`)),
  ];
}
