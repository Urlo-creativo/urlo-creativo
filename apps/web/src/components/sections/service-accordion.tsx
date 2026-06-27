"use client";

import { useEffect, useRef, useState } from "react";

import { PortableRichText } from "@/components/ui/portable-rich-text";
import { StructuredRichText, type RichTextToken } from "@/components/ui/rich-text";
import { SanityImageOrPlaceholder } from "@/components/ui/sanity-image";
import { PLACEHOLDER_IMAGE } from "@/content/placeholders";
import type {
  ServiceDetail,
  ServiceItem,
  ServiceRichTextValue,
  StructuredServiceDetail,
} from "@/lib/service-items";
type MediaServiceItem = ServiceItem & {
  media: NonNullable<ServiceItem["media"]>;
  statement: ServiceRichTextValue;
};
type GalleryServiceItem = ServiceItem &
  {
    gallery: NonNullable<ServiceItem["gallery"]>;
    statement: ServiceRichTextValue;
  };

type ServiceAccordionProps = {
  images: readonly string[];
  items: readonly ServiceItem[];
};

function isTokenLines(value: ServiceRichTextValue): value is RichTextToken[][] {
  return Array.isArray(value) && (value.length === 0 || Array.isArray(value[0]));
}

function ServiceRichText({
  as = "span",
  className,
  value,
}: {
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  value: ServiceRichTextValue;
}) {
  if (isTokenLines(value)) {
    return <StructuredRichText as={as} lines={value} className={className} />;
  }

  return <PortableRichText as={as} blocks={value} className={className} />;
}

function isStructuredDetail(
  detail: ServiceDetail,
): detail is StructuredServiceDetail {
  return typeof detail === "object";
}

function isMediaServiceItem(item: ServiceItem): item is MediaServiceItem {
  return Boolean(item.media) && "statement" in item;
}

function isGalleryServiceItem(item: ServiceItem): item is GalleryServiceItem {
  return Boolean(item.gallery?.length) && "statement" in item;
}

// Keep in sync with the `duration-500` panel transitions below.
const PANEL_TRANSITION_MS = 500;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function ServiceAccordion({
  images,
  items,
}: ServiceAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const articleRefs = useRef<Array<HTMLElement | null>>([]);
  const anchorFrameRef = useRef<number | null>(null);
  const previousScrollBehaviorRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      stopAnchoring();
    };
  }, []);

  function stopAnchoring() {
    if (anchorFrameRef.current !== null) {
      cancelAnimationFrame(anchorFrameRef.current);
      anchorFrameRef.current = null;
    }

    if (previousScrollBehaviorRef.current !== null) {
      document.documentElement.style.scrollBehavior =
        previousScrollBehaviorRef.current;
      previousScrollBehaviorRef.current = null;
    }
  }

  function keepServiceAnchored(index: number, targetTop: number) {
    stopAnchoring();

    // With reduced motion the panels resize ~instantly (see globals.css), so a
    // single next-frame correction is enough; otherwise track the animation for
    // its full duration plus a small buffer.
    const duration = prefersReducedMotion() ? 0 : PANEL_TRANSITION_MS + 120;
    const startedAt = performance.now();
    previousScrollBehaviorRef.current =
      document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    function tick(now: number) {
      const article = articleRefs.current[index];

      if (article) {
        const currentTop = article.getBoundingClientRect().top;
        const delta = currentTop - targetTop;

        if (Math.abs(delta) > 0.5) {
          window.scrollTo(0, window.scrollY + delta);
        }
      }

      if (now - startedAt < duration) {
        anchorFrameRef.current = requestAnimationFrame(tick);
      } else {
        anchorFrameRef.current = null;
        stopAnchoring();
      }
    }

    anchorFrameRef.current = requestAnimationFrame(tick);
  }

  function openService(index: number) {
    stopAnchoring();

    const nextIndex = openIndex === index ? null : index;
    // Pin the clicked header for every toggle (open / close / switch): content
    // above it changes height (preview images collapsing + the other panel), so
    // without this the clicked section jumps on first-open and on close too.
    const targetTop = articleRefs.current[index]?.getBoundingClientRect().top;

    setOpenIndex(nextIndex);

    if (targetTop != null) {
      keepServiceAnchored(index, targetTop);
    }
  }

  const hasActiveService = openIndex !== null;

  return (
    <div className="service-accordion border-t border-black">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `service-panel-${item.number}`;

        return (
          <article
            key={item.number}
            ref={(node) => {
              articleRefs.current[index] = node;
            }}
            className="border-b border-black"
          >
            <button
              type="button"
              aria-label={`${item.number} ${item.title}`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className={[
                "focus-ring grid w-full items-center text-left transition-[gap,padding] duration-500 ease-out md:grid-cols-[1fr_minmax(0,471px)]",
                hasActiveService
                  ? "gap-0 py-8 md:gap-0 md:py-10"
                  : "gap-6 py-10 md:gap-16 md:py-14",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => openService(index)}
            >
              <h2 className="type-heading-xl font-bold uppercase">
                {item.number} {item.title}
              </h2>

              <div
                aria-hidden={hasActiveService}
                className={[
                  "w-full overflow-hidden transition-[max-height,transform] duration-500 ease-out",
                  hasActiveService
                    ? "pointer-events-none max-h-0 scale-[0.98]"
                    : "max-h-[420px] scale-100 md:max-h-[248px]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div
                  className={[
                    "relative aspect-[471/248] w-full overflow-hidden transition-opacity duration-200 ease-out",
                    hasActiveService ? "opacity-0" : "opacity-100",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <SanityImageOrPlaceholder
                    image={item.previewImage}
                    fallbackSrc={images[index] ?? images[0] ?? PLACEHOLDER_IMAGE}
                    fallbackAlt=""
                    fill
                    sizes="(min-width: 768px) 471px, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </button>

            <div
              id={panelId}
              aria-hidden={!isOpen}
              className={[
                "grid transition-[grid-template-rows] duration-500 ease-out",
                isOpen && index === 0 ? "" : "overflow-hidden",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                clipPath: "inset(0 -100vw)",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                overflow: isOpen && index === 0 ? "visible" : "hidden",
              }}
            >
              <div
                className={[
                  "min-h-0 transition-[opacity,transform] duration-500 ease-out",
                  isOpen ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <div className="pb-20 pt-6 md:pb-[92px] md:pt-8">
                  {isGalleryServiceItem(item) ? (
                    <div className="md:max-w-[1080px]">
                      <ServiceRichText
                        as="p"
                        value={item.statement}
                        className="type-heading-md mb-12 max-w-[430px]"
                      />
                      <div className="space-y-20 md:space-y-[112px]">
                        {item.gallery.map((galleryItem, galleryIndex) => (
                          <div
                            key={`${item.number}-gallery-${galleryIndex}`}
                            className="grid gap-6 md:grid-cols-[minmax(260px,430px)_minmax(220px,1fr)] md:gap-16"
                          >
                            <div
                              className={[
                                "relative aspect-[1276/944] w-full max-w-[430px] overflow-hidden transition-opacity duration-500 ease-out motion-reduce:opacity-100",
                                isOpen ? "opacity-100" : "opacity-0",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                              style={{
                                transitionDelay: isOpen
                                  ? `${360 + galleryIndex * 90}ms`
                                  : "0ms",
                              }}
                            >
                              <SanityImageOrPlaceholder
                                image={galleryItem.image}
                                alt={galleryItem.alt}
                                fallbackSrc={galleryItem.fallbackImage}
                                fallbackAlt={galleryItem.alt}
                                fill
                                sizes="(min-width: 768px) 430px, 100vw"
                                className="object-cover object-center"
                              />
                            </div>
                            <p className="type-heading-md pt-1 font-bold italic uppercase">
                              {galleryItem.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : isMediaServiceItem(item) ? (
                    <div className="grid gap-12 md:grid-cols-[minmax(0,760px)_minmax(320px,520px)] md:items-start md:gap-[120px]">
                      <div className="divide-y divide-[var(--color-border-muted)]">
                        {item.details.map((detail, detailIndex) => (
                          <p
                            key={`${item.number}-media-detail-${detailIndex}`}
                            className="type-heading-md py-7 font-bold uppercase md:py-9"
                          >
                            {String(detail)}
                          </p>
                        ))}
                      </div>
                      <div
                        className={[
                          "transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 md:pt-5",
                          isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-6 opacity-0",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        style={{
                          transitionDelay: isOpen ? "420ms" : "0ms",
                        }}
                      >
                        <div className="relative aspect-[888/990] w-full max-w-[528px] overflow-hidden">
                          <SanityImageOrPlaceholder
                            image={item.media.image}
                            alt={item.media.alt}
                            fallbackSrc={item.media.fallbackImage}
                            fallbackAlt={item.media.alt}
                            fill
                            sizes="(min-width: 768px) 520px, 100vw"
                            className="object-contain object-center"
                          />
                        </div>
                        <ServiceRichText
                          as="p"
                          value={item.statement}
                          className="type-heading-md mt-8"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--color-border-muted)]">
                      {item.details.map((detail, detailIndex) =>
                        isStructuredDetail(detail) ? (
                          <div
                            key={`${item.number}-structured-detail-${detailIndex}`}
                            className="grid gap-8 py-9 md:grid-cols-[minmax(260px,430px)_minmax(0,1fr)] md:gap-[116px] md:py-12"
                          >
                            <ServiceRichText
                              as="h3"
                              value={detail.title}
                              className="type-heading-md uppercase"
                            />
                            <div className="type-heading-md text-[var(--color-text-muted)]">
                              <div
                                className={[
                                  "transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100",
                                  isOpen
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-6 opacity-0",
                                ]
                                  .filter(Boolean)
                                  .join(" ")}
                                style={{
                                  transitionDelay: isOpen
                                    ? `${360 + detailIndex * 90}ms`
                                    : "0ms",
                                }}
                              >
                                {detail.items.map((line, lineIndex) => (
                                  <p key={`${item.number}-detail-${detailIndex}-line-${lineIndex}`}>
                                    {line}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p
                            key={`${item.number}-plain-detail-${detailIndex}`}
                            className="type-body-md py-7 font-bold uppercase md:py-9"
                          >
                            {detail}
                          </p>
                        ),
                      )}
                    </div>
                  )}
                </div>

                {index === 0 && item.statement ? (
                  <div
                    className="bg-yellow py-20 md:py-[96px]"
                    style={{
                      marginInline:
                        "calc((((100vw - min(100vw, var(--page-max))) / 2) + var(--page-gutter)) * -1)",
                    }}
                  >
                    <div className="page-shell grid gap-12 md:grid-cols-[minmax(220px,430px)_minmax(0,560px)] md:items-center md:gap-[116px]">
                      <div className="relative aspect-[357/248] w-full max-w-[357px] overflow-hidden">
                        <SanityImageOrPlaceholder
                          image={item.statementImage?.image}
                          alt={item.statementImage?.alt}
                          fallbackSrc={
                            item.statementImage?.fallbackImage ??
                            images[index] ??
                            images[0] ??
                            PLACEHOLDER_IMAGE
                          }
                          fallbackAlt={item.statementImage?.alt ?? ""}
                          fill
                          sizes="(min-width: 768px) 357px, 100vw"
                          className="object-cover object-center"
                        />
                      </div>
                      <ServiceRichText
                        as="p"
                        value={item.statement}
                        className="type-heading-xl"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
