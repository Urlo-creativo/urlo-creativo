import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRichText } from "@/components/ui/page-rich-text";
import { ServiceAccordion, type ServiceItem } from "@/components/sections/service-accordion";
import { SiteFooter } from "@/components/sections/site-footer";
import {
  PLACEHOLDER_ALT,
  PLACEHOLDER_IMAGE,
  placeholderBodyRichText,
  placeholderRichText,
  placeholderText,
} from "@/content/placeholders";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { client } from "@/lib/sanity/client";
import { localeParams } from "@/lib/sanity/locale";
import {
  servicesPageQuery,
  type ServicesPageContent,
} from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Services",
};

const serviceImages = [PLACEHOLDER_IMAGE] as const;

const placeholderGallery = [
  {
    label: placeholderText.label,
    fallbackImage: PLACEHOLDER_IMAGE,
    alt: PLACEHOLDER_ALT,
  },
] as const;

function linesFromText(value: string | null | undefined) {
  return value
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : null;
}

function serviceItemsFromSanity(
  content: ServicesPageContent,
  fallbackItems: readonly ServiceItem[],
): ServiceItem[] {
  return (content.items ?? []).map((item, index) => {
    const fallbackItem = fallbackItems[index];
    const base = {
      number: item.number ?? String(index + 1).padStart(2, "0"),
      title: item.title ?? placeholderText.title,
      previewImage: item.previewImage,
    };

    if (item.variant === "structured") {
      return {
        ...base,
        details:
          item.detailGroups?.map((detail) => ({
            title: detail.title ?? placeholderRichText,
            items:
              linesFromText(detail.itemsText) ??
              [placeholderText.item],
          })) ?? [],
        statement: item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
        statementImage: {
          fallbackImage: PLACEHOLDER_IMAGE,
          image: item.statementImage,
          alt: item.statementImage?.alt ?? PLACEHOLDER_ALT,
        },
      };
    }

    if (item.variant === "media") {
      return {
        ...base,
        details:
          linesFromText(item.detailsText) ?? [placeholderText.item],
        media: {
          fallbackImage: PLACEHOLDER_IMAGE,
          image: item.media?.image,
          alt: item.media?.alt ?? PLACEHOLDER_ALT,
        },
        statement: item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
      };
    }

    if (item.variant === "gallery") {
      const fallbackGallery = placeholderGallery;
      const sanityGallery = item.gallery ?? [];
      const galleryLength = Math.max(fallbackGallery.length, sanityGallery.length);
      const gallery = Array.from({ length: galleryLength }, (_, galleryIndex) => {
        const fallbackGalleryItem = fallbackGallery[galleryIndex];
        const sanityGalleryItem = sanityGallery[galleryIndex];

        return {
          fallbackImage: fallbackGalleryItem?.fallbackImage,
          image: sanityGalleryItem?.image,
          label:
            sanityGalleryItem?.label ??
            fallbackGalleryItem?.label ??
            placeholderText.label,
          alt: sanityGalleryItem?.alt ?? fallbackGalleryItem?.alt ?? PLACEHOLDER_ALT,
        };
      }).map((galleryItem) => ({
        ...galleryItem,
        fallbackImage: galleryItem.fallbackImage ?? PLACEHOLDER_IMAGE,
      }));

      return {
        ...base,
        details: [],
        gallery,
        statement: item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
      };
    }

    return {
      ...base,
      details:
        linesFromText(item.detailsText) ?? [placeholderText.item],
    };
  });
}

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
