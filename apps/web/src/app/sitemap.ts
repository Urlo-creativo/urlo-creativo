import type { MetadataRoute } from "next";

import { locales } from "@/i18n/config";
import { localizedUrl, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: localizedUrl(locale, route),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, localizedUrl(l, route)]),
        ),
      },
    })),
  );
}
