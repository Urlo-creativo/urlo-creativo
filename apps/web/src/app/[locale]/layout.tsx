import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/sections/site-header";
import { getDictionary } from "@/i18n/dictionaries";
import {
  defaultLocale,
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
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}`])),
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Urlo Creativo",
      locale,
      url: `/${locale}`,
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
        <SiteHeader
          dictionary={dictionary.nav}
          locale={locale}
          localeLabel={localeLabels[locale]}
        />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
