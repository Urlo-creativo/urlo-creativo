import Image from "next/image";

import { hasImageAsset, sanityImageProps } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/queries";

type SharedProps = {
  image: SanityImageType | null | undefined;
  /** Falls back to the image's own alt text, then to an empty (decorative) alt. */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Requested render width passed to the Sanity image builder. */
  width?: number;
};

type SanityImageProps = SharedProps &
  ({ fill?: false } | { fill: true });

/**
 * Renders a resolved Sanity image with next/image, using the asset's intrinsic
 * dimensions, LQIP blur placeholder, and hotspot-aware object position.
 * Returns null when no asset is present so callers can render cleanly.
 */
export function SanityImage({
  image,
  alt,
  className,
  sizes,
  priority,
  width,
  fill,
}: SanityImageProps) {
  if (!hasImageAsset(image)) return null;

  const resolvedAlt = alt ?? image.alt ?? "";

  if (fill) {
    const hotspot = image.hotspot;
    const objectPosition = hotspot
      ? `${(hotspot.x * 100).toFixed(2)}% ${(hotspot.y * 100).toFixed(2)}%`
      : undefined;

    const props = sanityImageProps(image, width ?? 1600);
    if (!props) return null;

    return (
      <Image
        src={props.src}
        alt={resolvedAlt}
        fill
        sizes={sizes ?? "100vw"}
        priority={priority}
        placeholder={props.blurDataURL ? "blur" : "empty"}
        blurDataURL={props.blurDataURL}
        className={className}
        style={objectPosition ? { objectPosition } : undefined}
      />
    );
  }

  const props = sanityImageProps(image, width ?? 1600);
  if (!props) return null;

  return (
    <Image
      src={props.src}
      alt={resolvedAlt}
      width={props.width}
      height={props.height}
      sizes={sizes}
      priority={priority}
      placeholder={props.blurDataURL ? "blur" : "empty"}
      blurDataURL={props.blurDataURL}
      className={className}
    />
  );
}
