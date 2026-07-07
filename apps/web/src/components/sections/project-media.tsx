import { SanityImage } from "@/components/ui/sanity-image";
import { PortableRichText } from "@/components/ui/portable-rich-text";
import {
  ViewportAutoplayEmbed,
  ViewportAutoplayVideo,
} from "@/components/sections/viewport-autoplay-media";
import { hasImageAsset } from "@/lib/sanity/image";
import type {
  PortableRichTextValue,
  ProjectMediaItem,
  ProjectMediaSection,
} from "@/lib/sanity/queries";

// --- Video helpers ---------------------------------------------------------

function getEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function getAutoplayEmbedUrl(url: string): string {
  const parsed = new URL(url);
  parsed.searchParams.set("autoplay", "1");
  parsed.searchParams.set("mute", "1");
  parsed.searchParams.set("muted", "1");
  parsed.searchParams.set("playsinline", "1");
  parsed.searchParams.set("controls", "0");
  parsed.searchParams.set("loop", "1");
  parsed.searchParams.set("autopause", "0");

  if (parsed.hostname.includes("youtube.com")) {
    const videoId = parsed.pathname.split("/").filter(Boolean).at(-1);
    if (videoId) parsed.searchParams.set("playlist", videoId);
  }

  return parsed.toString();
}

function MediaCaption({ caption }: { caption: string | null }) {
  if (!caption) return null;
  return (
    <figcaption className="type-body-sm mt-3 text-[var(--color-text-muted)]">
      {caption}
    </figcaption>
  );
}

// --- Single media item -----------------------------------------------------

type MediaItemProps = {
  item: ProjectMediaItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
  variant?: "default" | "hero";
  frame?: "natural" | "fill";
};

export function ProjectMediaItemView({
  item,
  className,
  sizes,
  priority,
  variant = "default",
  frame = "natural",
}: MediaItemProps) {
  const isHero = variant === "hero";
  const shouldFillFrame = frame === "fill";

  if (item.mediaType === "image") {
    if (!hasImageAsset(item.image)) return null;
    if (isHero) {
      // Tailwind's `relative` utility outranks `absolute` in the compiled
      // stylesheet regardless of class order, so a caller-provided
      // `className` asking for absolute positioning (e.g. a full-bleed
      // background) would otherwise be silently overridden.
      const callerPositionsIt = className?.includes("absolute");
      return (
        <figure
          className={[
            callerPositionsIt ? undefined : "relative",
            "h-[calc(var(--viewport-stable-height)-var(--project-hero-offset,0px))] w-full overflow-hidden bg-[var(--color-bg-muted)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <SanityImage
            image={item.image}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </figure>
      );
    }

    if (shouldFillFrame) {
      return (
        <figure
          className={[
            "relative h-full w-full overflow-hidden bg-[var(--color-bg-muted)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <SanityImage
            image={item.image}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </figure>
      );
    }

    return (
      <figure className={className}>
        <SanityImage
          image={item.image}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full"
        />
        <MediaCaption caption={item.caption} />
      </figure>
    );
  }

  // Video
  const directUrl = item.videoFile?.url ?? null;
  const externalUrl = item.videoUrl ?? null;
  const embedUrl = externalUrl ? getEmbedUrl(externalUrl) : null;
  const posterProps = hasImageAsset(item.poster) ? item.poster : null;

  if (embedUrl) {
    return (
      <figure className={className}>
        <ViewportAutoplayEmbed
          src={getAutoplayEmbedUrl(embedUrl)}
          title={item.caption ?? "Project video"}
          className={
            isHero
              ? "relative h-[calc(var(--viewport-stable-height)-var(--project-hero-offset,0px))] w-full overflow-hidden bg-black"
              : shouldFillFrame
                ? "relative h-full w-full overflow-hidden bg-black"
              : "relative aspect-video w-full overflow-hidden bg-black"
          }
        />
        {!isHero && !shouldFillFrame && <MediaCaption caption={item.caption} />}
      </figure>
    );
  }

  const playableUrl = directUrl ?? externalUrl;
  if (!playableUrl) return null;

  return (
    <figure className={className}>
      <ViewportAutoplayVideo
        src={playableUrl}
        mimeType={item.videoFile?.mimeType ?? undefined}
        preload={isHero ? "auto" : "metadata"}
        poster={posterProps?.asset?.url}
        className={
          isHero
            ? "h-[calc(var(--viewport-stable-height)-var(--project-hero-offset,0px))] w-full bg-black object-cover"
            : shouldFillFrame
              ? "h-full w-full bg-black object-cover"
            : "h-auto w-full bg-black"
        }
      />
      {!isHero && !shouldFillFrame && <MediaCaption caption={item.caption} />}
    </figure>
  );
}

// --- Layout variants -------------------------------------------------------

function renderItems(
  items: ProjectMediaItem[],
  sizes: string,
): React.ReactNode[] {
  return items.map((item) => (
    <ProjectMediaItemView key={item._key} item={item} sizes={sizes} />
  ));
}

const MOSAIC_ITEM_CLASSES = [
  "lg:col-span-5 lg:aspect-[10/7]",
  "lg:col-span-3 lg:aspect-[6/7]",
  "lg:col-span-3 lg:aspect-square",
  "lg:col-span-5 lg:aspect-[14/9]",
] as const;

function mosaicItemClass(index: number): string {
  return [
    "aspect-[4/3] overflow-hidden bg-[var(--color-bg-muted)]",
    MOSAIC_ITEM_CLASSES[index % MOSAIC_ITEM_CLASSES.length],
  ]
    .filter(Boolean)
    .join(" ");
}

function LayoutBody({ section }: { section: ProjectMediaSection }) {
  const items = section.mediaItems ?? [];
  if (items.length === 0) return null;
  const isFullWidth = section.widthMode === "fullWidth";

  switch (section.layout) {
    case "oneColumnCollage":
      return (
        <div className="flex w-full flex-col grid-gap-lg">
          {items.map((item) => (
            <div key={item._key} className="w-full">
              <ProjectMediaItemView
                item={item}
                sizes={
                  isFullWidth
                    ? "100vw"
                    : "(min-width: 1440px) 1200px, calc(100vw - 48px)"
                }
              />
            </div>
          ))}
        </div>
      );

    case "masonry":
      return (
        <div className="grid grid-cols-1 gap-[clamp(20px,2vw,32px)] lg:grid-cols-8">
          {items.map((item, index) => (
            <div key={item._key} className={mosaicItemClass(index)}>
              <ProjectMediaItemView
                item={item}
                frame="fill"
                sizes={
                  isFullWidth
                    ? "(min-width: 1024px) 63vw, 100vw"
                    : "(min-width: 1024px) 58vw, 100vw"
                }
              />
            </div>
          ))}
        </div>
      );

    case "compactThreeColumnGrid":
      return (
        <div className="grid grid-cols-2 grid-gap-md lg:grid-cols-3">
          {renderItems(
            items,
            isFullWidth
              ? "(min-width: 1024px) 33vw, 50vw"
              : "(min-width: 1024px) 29vw, 50vw",
          )}
        </div>
      );

    case "twoColumnGrid":
    default:
      return (
        <div className="grid grid-cols-1 grid-gap-md lg:grid-cols-2">
          {renderItems(
            items,
            isFullWidth
              ? "(min-width: 1024px) 50vw, 100vw"
              : "(min-width: 1024px) 42vw, 100vw",
          )}
        </div>
      );
  }
}

// --- Section wrapper -------------------------------------------------------

function hasPortableTextValue(value: PortableRichTextValue): boolean {
  if (!value) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return value.length > 0;
}

export function ProjectMediaSectionBlock({
  section,
  fallbackHeading,
}: {
  section: ProjectMediaSection;
  fallbackHeading?: string;
}) {
  if (!section.mediaItems || section.mediaItems.length === 0) return null;
  const isFullWidth = section.widthMode === "fullWidth";
  const shouldRenderHeading =
    section.placement === "behindTheScenes" &&
    (hasPortableTextValue(section.heading) || fallbackHeading);

  return (
    <section
      className={
        isFullWidth
          ? "relative left-1/2 w-screen -translate-x-1/2"
          : undefined
      }
    >
      {shouldRenderHeading && (
        <div className={isFullWidth ? "page-shell" : undefined}>
          {hasPortableTextValue(section.heading) ? (
            <PortableRichText
              as="h2"
              blocks={section.heading}
              className="type-display uppercase"
            />
          ) : (
            <h2 className="type-display font-bold uppercase">
              {fallbackHeading}
            </h2>
          )}
        </div>
      )}
      <div className={shouldRenderHeading ? "mt-8 md:mt-12" : undefined}>
        <LayoutBody section={section} />
      </div>
    </section>
  );
}
