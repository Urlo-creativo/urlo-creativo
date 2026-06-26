import Image from "next/image";

import { hasImageAsset, sanityImageProps } from "@/lib/sanity/image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/queries";
import { PLACEHOLDER_ALT } from "@/content/placeholders";

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

type SanityImageOrPlaceholderProps = SanityImageProps & {
  /** Static src to render when `image` has no asset. Omit to render nothing. */
  fallbackSrc?: string;
  /** Alt for the fallback image. Defaults to the generic placeholder alt. */
  fallbackAlt?: string;
};

/**
 * `SanityImage` that degrades to a static placeholder when the asset is missing.
 * Collapses the repeated `hasImageAsset(x) ? <SanityImage/> : <Image/>` branch
 * used across pages and sections. Renders nothing when there is no asset and no
 * `fallbackSrc`, so decorative/list slots stay empty rather than being forced to
 * show a placeholder (preserving each call site's original null behaviour).
 */
export function SanityImageOrPlaceholder({
  fallbackSrc,
  fallbackAlt = PLACEHOLDER_ALT,
  ...props
}: SanityImageOrPlaceholderProps) {
  if (hasImageAsset(props.image)) {
    return <SanityImage {...props} />;
  }
  if (!fallbackSrc) return null;

  const { className, sizes, priority } = props;

  if (props.fill) {
    return (
      <Image
        src={fallbackSrc}
        alt={fallbackAlt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  const width = props.width ?? 1600;
  return (
    <Image
      src={fallbackSrc}
      alt={fallbackAlt}
      width={width}
      height={width}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}
