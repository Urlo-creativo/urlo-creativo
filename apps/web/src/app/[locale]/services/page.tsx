import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredRichText } from "@/components/ui/rich-text";
import { ServiceAccordion } from "@/components/sections/service-accordion";
import { SiteFooter } from "@/components/sections/site-footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Services",
};

const serviceImages = [
  "/services/brand-identity.jpg",
  "/services/design.jpg",
  "/services/styling.jpg",
] as const;

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

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell">
        <h1 className="type-display font-bold uppercase">{services.title}</h1>
      </section>

      <section className="page-shell pb-16 pt-12 md:pb-[96px] md:pt-[64px]">
        <ServiceAccordion
          items={services.items}
          images={serviceImages}
          statement={services.statement}
        />
      </section>

      <section className="page-shell pb-20 md:pb-[140px]">
        <StructuredRichText
          as="h2"
          lines={services.collaborationTitle}
          className="type-body-lg w-fit font-bold uppercase"
        />
        <StructuredRichText
          as="p"
          lines={services.collaboration}
          className="type-body-lg mt-6 max-w-[1036px] font-bold"
        />
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
