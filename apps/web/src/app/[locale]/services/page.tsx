import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageRichText, hasPortableText } from "@/components/ui/page-rich-text";
import type { RichTextToken } from "@/components/ui/rich-text";
import { ServiceAccordion, type ServiceItem } from "@/components/sections/service-accordion";
import { SiteFooter } from "@/components/sections/site-footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { client } from "@/lib/sanity/client";
import { localeParams } from "@/lib/sanity/locale";
import {
  servicesPageQuery,
  type PortableRichTextValue,
  type ServicesPageContent,
} from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Services",
};

const serviceImages = [
  "/services/brand-identity.jpg",
  "/services/design.jpg",
  "/services/styling.jpg",
] as const;

const mediaByServiceIndex = {
  1: { fallbackImage: "/services/design-development-detail.png", alt: "" },
} as const;

const galleryByServiceIndex = {
  2: [
    {
      label: "PRODUCTION",
      fallbackImage: "/services/styling-production.png",
      alt: "",
    },
    {
      label: "ART DIRECTION",
      fallbackImage: "/services/styling-art-direction.png",
      alt: "",
    },
    {
      label: "STYLING",
      fallbackImage: "/services/styling-styling.png",
      alt: "",
    },
    {
      label: "PHOTO AND VIDEO SHOOTINGS",
      fallbackImage: "/services/styling-photo-video.png",
      alt: "",
    },
  ],
} as const;

type ServiceRichText = PortableRichTextValue | RichTextToken[][];

function serviceItemsFromSanity(content: ServicesPageContent): ServiceItem[] {
  return (content.items ?? []).map((item, index) => {
    const base = {
      number: item.number ?? String(index + 1).padStart(2, "0"),
      title: item.title ?? "",
      previewImage: item.previewImage,
    };

    if (item.variant === "structured") {
      return {
        ...base,
        details:
          item.detailGroups?.map((detail) => ({
            title: detail.title,
            items: detail.items ?? [],
          })) ?? [],
      };
    }

    if (item.variant === "media") {
      const fallbackMedia =
        mediaByServiceIndex[index as keyof typeof mediaByServiceIndex];
      const media =
        item.media?.image || fallbackMedia
          ? {
              ...(fallbackMedia ?? {}),
              image: item.media?.image,
              alt: item.media?.alt ?? fallbackMedia?.alt ?? "",
            }
          : null;

      return {
        ...base,
        details: item.details ?? [],
        ...(media ? { media } : {}),
        statement: item.statement,
      };
    }

    if (item.variant === "gallery") {
      const fallbackGallery =
        galleryByServiceIndex[index as keyof typeof galleryByServiceIndex] ?? [];
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
            String(galleryIndex + 1).padStart(2, "0"),
          alt: sanityGalleryItem?.alt ?? fallbackGalleryItem?.alt ?? "",
        };
      }).filter((galleryItem) => galleryItem.image || galleryItem.fallbackImage);

      return {
        ...base,
        details: [],
        gallery,
        statement: item.statement,
      };
    }

    return {
      ...base,
      details: item.details ?? [],
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
    ? serviceItemsFromSanity(servicesContent)
    : services.items;
  const sanityStatement = servicesContent?.statement;
  const serviceStatement: ServiceRichText = hasPortableText(sanityStatement)
    ? sanityStatement
    : services.statement;

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell">
        <PageRichText
          as="h1"
          value={servicesContent?.title}
          fallback={services.title}
          className="type-display font-bold uppercase"
        />
      </section>

      <section className="page-shell pb-16 pt-12 md:pb-[96px] md:pt-[64px]">
        <ServiceAccordion
          items={serviceItems}
          images={serviceImages}
          statement={serviceStatement}
        />
      </section>

      <section className="page-shell pb-20 md:pb-[140px]">
        <PageRichText
          as="h2"
          value={servicesContent?.collaborationTitle}
          fallback={services.collaborationTitle}
          className="type-body-lg w-fit font-bold uppercase"
        />
        <PageRichText
          as="p"
          value={servicesContent?.collaboration}
          fallback={services.collaboration}
          className="type-body-lg mt-6 max-w-[1036px] font-bold"
        />
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
