import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { SiteHeader } from "@/components/sections/site-header";
import { SiteCursor } from "@/components/ui/site-cursor";
import { getDictionary } from "@/i18n/dictionaries";
import {
  isLocale,
  localeLabels,
  locales,
  type Locale,
} from "@/i18n/config";
import { siteUrl } from "@/lib/site";

import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "it";
  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "Urlo Creativo",
      template: "%s | Urlo Creativo",
    },
    description: dictionary.metadata.description,
    // No `alternates` here: layout metadata cascades to every child page, so a
    // layout-level canonical would wrongly point subpages at the locale root.
    // Each page sets its own via `localizedAlternates`.
    openGraph: {
      type: "website",
      siteName: "Urlo Creativo",
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          {dictionary.nav.skipToContent}
        </a>
        <SiteHeader
          dictionary={dictionary.nav}
          locale={locale}
          localeLabel={localeLabels[locale]}
        />
        <div id="main-content">{children}</div>
        <Analytics />
        <SpeedInsights />
        <SiteCursor />
      </body>
    </html>
  );
}
