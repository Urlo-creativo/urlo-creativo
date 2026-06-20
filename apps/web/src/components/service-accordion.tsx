"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { StructuredRichText } from "@/components/rich-text";
import type { Dictionary } from "@/i18n/dictionaries";

type ServiceItem = Dictionary["services"]["items"][number];
type ServiceDetail = ServiceItem["details"][number];
type StructuredServiceDetail = Extract<ServiceDetail, { items: readonly string[] }>;

type ServiceAccordionProps = {
  images: readonly string[];
  items: readonly ServiceItem[];
  statement: Dictionary["services"]["statement"];
};

function isStructuredDetail(
  detail: ServiceDetail,
): detail is StructuredServiceDetail {
  return typeof detail === "object";
}

export function ServiceAccordion({
  images,
  items,
  statement,
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

    const startedAt = performance.now();
    const duration = 620;
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
    const isSwitchingOpenService = openIndex !== null && openIndex !== index;
    const targetTop = articleRefs.current[index]?.getBoundingClientRect().top;

    setOpenIndex(nextIndex);

    if (isSwitchingOpenService && targetTop != null) {
      keepServiceAnchored(index, targetTop);
    }
  }

  const hasActiveService = openIndex !== null;

  return (
    <div className="border-t border-black">
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
                "grid w-full items-center text-left transition-[gap,padding] duration-500 ease-out md:grid-cols-[1fr_minmax(0,471px)]",
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
                  <Image
                    src={images[index]}
                    alt=""
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
              className="grid transition-[grid-template-rows] duration-500 ease-out"
              style={{
                clipPath: "inset(0 -100vw)",
                gridTemplateRows: isOpen ? "1fr" : "0fr",
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
                  <div className="divide-y divide-[var(--uc-gray-200)]">
                    {item.details.map((detail) =>
                      isStructuredDetail(detail) ? (
                        <div
                          key={detail.items.join("|")}
                          className="grid gap-8 py-9 md:grid-cols-[minmax(260px,430px)_minmax(0,1fr)] md:gap-[116px] md:py-12"
                        >
                          <StructuredRichText
                            as="h3"
                            lines={detail.title}
                            className="type-heading-md font-bold uppercase"
                          />
                          <div className="type-heading-md text-[var(--color-text-muted)]">
                            {detail.items.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p
                          key={detail}
                          className="type-body-md py-7 font-bold uppercase md:py-9"
                        >
                          {detail}
                        </p>
                      ),
                    )}
                  </div>
                </div>

                {index === 0 ? (
                  <div
                    className="bg-yellow py-20 md:py-[96px]"
                    style={{
                      marginInline:
                        "calc((((100vw - min(100vw, var(--page-max))) / 2) + var(--page-gutter)) * -1)",
                    }}
                  >
                    <div className="page-shell grid gap-12 md:grid-cols-[minmax(220px,430px)_minmax(0,560px)] md:items-center md:gap-[116px]">
                      <div className="relative aspect-[357/248] w-full max-w-[357px] overflow-hidden">
                        <Image
                          src={images[1]}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 357px, 100vw"
                          className="object-cover object-center"
                        />
                      </div>
                      <StructuredRichText
                        as="p"
                        lines={statement}
                        className="type-heading-xl font-bold"
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
