import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";
import type { SanityImage } from "./queries";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/** Whether a resolved Sanity image actually has an uploaded asset. */
export function hasImageAsset(
  image: SanityImage | null | undefined,
): image is SanityImage & { asset: NonNullable<SanityImage["asset"]> } {
  return Boolean(image?.asset?.url);
}

/**
 * Derive next/image props from a resolved Sanity image: a hotspot/crop-aware
 * source URL plus intrinsic dimensions and an LQIP blur placeholder.
 */
export function sanityImageProps(
  image: SanityImage,
  width = 1600,
): {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
} | null {
  if (!hasImageAsset(image)) return null;

  const { dimensions, lqip } = image.asset.metadata;
  const targetWidth = Math.min(width, dimensions.width || width);
  const targetHeight = Math.round(targetWidth / (dimensions.aspectRatio || 1));

  return {
    src: urlForImage(image as unknown as SanityImageSource)
      .width(targetWidth)
      .url(),
    width: targetWidth,
    height: targetHeight,
    blurDataURL: lqip,
  };
}
