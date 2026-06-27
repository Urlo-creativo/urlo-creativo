import type { RichTextToken } from "@/components/ui/rich-text";
import {
  PLACEHOLDER_ALT,
  PLACEHOLDER_IMAGE,
  placeholderBodyRichText,
  placeholderRichText,
  placeholderText,
} from "@/content/placeholders";
import type {
  PortableRichTextValue,
  SanityImage as SanityImageType,
  ServicesPageContent,
} from "@/lib/sanity/queries";
import { nonEmptyLines } from "@/lib/text";

export type ServiceRichTextValue = PortableRichTextValue | RichTextToken[][];

export type StructuredServiceDetail = {
  title: ServiceRichTextValue;
  items: readonly string[];
};

export type ServiceDetail = string | StructuredServiceDetail;

export type ServiceItem = {
  number: string;
  title: string;
  previewImage?: SanityImageType | null;
  details: readonly ServiceDetail[];
  media?: {
    fallbackImage?: string;
    image?: SanityImageType | null;
    alt: string;
  };
  statement?: ServiceRichTextValue;
  statementImage?: {
    fallbackImage?: string;
    image?: SanityImageType | null;
    alt: string;
  };
  gallery?: readonly {
    fallbackImage?: string;
    image?: SanityImageType | null;
    label: string;
    alt: string;
  }[];
};

const placeholderGallery = [
  {
    label: placeholderText.label,
    fallbackImage: PLACEHOLDER_IMAGE,
    alt: PLACEHOLDER_ALT,
  },
] as const;

function fallbackLines(value: string | null | undefined): string[] {
  const lines = nonEmptyLines(value);
  return lines.length ? lines : [placeholderText.item];
}

export function serviceItemsFromSanity(
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
            items: fallbackLines(detail.itemsText),
          })) ?? [],
        statement:
          item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
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
        details: fallbackLines(item.detailsText),
        media: {
          fallbackImage: PLACEHOLDER_IMAGE,
          image: item.media?.image,
          alt: item.media?.alt ?? PLACEHOLDER_ALT,
        },
        statement:
          item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
      };
    }

    if (item.variant === "gallery") {
      const sanityGallery = item.gallery ?? [];
      const galleryLength = Math.max(
        placeholderGallery.length,
        sanityGallery.length,
      );
      const gallery = Array.from({ length: galleryLength }, (_, galleryIndex) => {
        const fallbackGalleryItem = placeholderGallery[galleryIndex];
        const sanityGalleryItem = sanityGallery[galleryIndex];

        return {
          fallbackImage:
            fallbackGalleryItem?.fallbackImage ?? PLACEHOLDER_IMAGE,
          image: sanityGalleryItem?.image,
          label:
            sanityGalleryItem?.label ??
            fallbackGalleryItem?.label ??
            placeholderText.label,
          alt:
            sanityGalleryItem?.alt ??
            fallbackGalleryItem?.alt ??
            PLACEHOLDER_ALT,
        };
      });

      return {
        ...base,
        details: [],
        gallery,
        statement:
          item.statement ?? fallbackItem?.statement ?? placeholderBodyRichText,
      };
    }

    return {
      ...base,
      details: fallbackLines(item.detailsText),
    };
  });
}
