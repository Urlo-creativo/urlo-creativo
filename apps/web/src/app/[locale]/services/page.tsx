import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRichText } from "@/components/ui/page-rich-text";
import { ServiceAccordion } from "@/components/sections/service-accordion";
import { SiteFooter } from "@/components/sections/site-footer";
import { PLACEHOLDER_IMAGE } from "@/content/placeholders";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { client } from "@/lib/sanity/client";
import { localeParams } from "@/lib/sanity/locale";
import { serviceItemsFromSanity } from "@/lib/service-items";
import {
  servicesPageQuery,
  type ServicesPageContent,
} from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Services",
};

const serviceImages = [PLACEHOLDER_IMAGE] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const { services, footer } = getDictionary(locale);
  const servicesContent = await client.fetch<ServicesPageContent | null>(
    servicesPageQuery,
    localeParams(locale),
  );

  const serviceItems = servicesContent?.items?.length
    ? serviceItemsFromSanity(servicesContent, services.items)
    : services.items;

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell">
        <PageRichText
          as="h1"
          value={servicesContent?.title}
          fallback={services.title}
          className="type-display uppercase"
        />
      </section>

      <section className="page-shell pb-16 pt-12 md:pb-[96px] md:pt-[64px]">
        <ServiceAccordion
          items={serviceItems}
          images={serviceImages}
        />
      </section>

      <section className="page-shell pb-20 md:pb-[140px]">
        <PageRichText
          as="h2"
          value={servicesContent?.collaborationTitle}
          fallback={services.collaborationTitle}
          className="type-body-lg w-fit uppercase"
        />
        <PageRichText
          as="p"
          value={servicesContent?.collaboration}
          fallback={services.collaboration}
          className="type-body-lg mt-6 w-full"
        />
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
