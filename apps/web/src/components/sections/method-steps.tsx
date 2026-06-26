"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type MethodStep = {
  items: string[];
  title: string;
};

type MethodStepsProps = {
  steps: MethodStep[];
};

export function MethodSteps({ steps }: MethodStepsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<Array<HTMLHeadingElement | null>>([]);
  const mobileTitleRefs = useRef<Array<HTMLHeadingElement | null>>([]);

  // Mobile equivalent of the desktop rail: each stacked title gets its own
  // full-width blue band that fills with scroll progress (same start/end mapping
  // as the desktop rail), turning the title white where the band covers it.
  useEffect(() => {
    const titles = mobileTitleRefs.current.filter(
      (el): el is HTMLHeadingElement => el !== null,
    );
    if (titles.length === 0) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      titles.forEach((title) => {
        title.style.setProperty("--method-rail-progress", "1");
        title.style.setProperty("--method-text-progress", "1");
      });
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const start = vh;
      const end = vh * 0.5;

      titles.forEach((title) => {
        const rect = title.getBoundingClientRect();
        const progress = Math.min(
          Math.max((start - rect.top) / (start - end), 0),
          1,
        );
        const fullWidth = title.clientWidth;
        const textWidth =
          title.querySelector<HTMLElement>(".method-mobile-text")?.offsetWidth ??
          fullWidth;
        // The band fills the full divider width; the white text only needs to
        // reveal up to where the band's right edge has reached the text.
        const textProgress =
          fullWidth > 0 ? Math.min(progress, textWidth / fullWidth) : 0;

        title.style.setProperty("--method-rail-progress", progress.toFixed(3));
        title.style.setProperty("--method-text-progress", textProgress.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      wrapper.style.setProperty("--rail-progress", "1");
      headingRefs.current.forEach((heading) => {
        heading?.style.setProperty("--step-progress-width", "100%");
      });
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rail = railRef.current;
      const rect = rail?.getBoundingClientRect() ?? wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh;
      const end = vh * 0.5;
      const progress = Math.min(
        Math.max((start - rect.top) / (start - end), 0),
        1,
      );

      wrapper.style.setProperty("--rail-progress", progress.toFixed(3));

      if (!rail) return;

      const railRect = rail.getBoundingClientRect();
      const barLeft = railRect.left + railRect.width / 2 - window.innerWidth / 2;
      const barRight = barLeft + window.innerWidth * progress;

      headingRefs.current.forEach((heading) => {
        if (!heading) return;

        const headingRect = heading.getBoundingClientRect();
        const covered = Math.min(
          Math.max((barRight - headingRect.left) / headingRect.width, 0),
          1,
        );

        heading.style.setProperty(
          "--step-progress-width",
          `${(covered * 100).toFixed(2)}%`,
        );
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="method-block mt-20"
      style={{ "--rail-progress": 0 } as CSSProperties}
    >
      <div className="space-y-8 md:hidden">
        {steps.map((step, index) => (
          <section key={`method-mobile-${index}`} className="border-t border-black pt-4">
            <h3
              ref={(el) => {
                mobileTitleRefs.current[index] = el;
              }}
              className="method-mobile-title type-heading-md relative z-10 block w-full font-bold text-black"
            >
              <span
                aria-hidden
                className="method-mobile-rail pointer-events-none absolute left-0"
              />
              <span className="method-mobile-text relative inline-block">
                {step.title}
              </span>
              <span
                aria-hidden
                className="method-mobile-cover pointer-events-none absolute left-0 top-0 overflow-hidden whitespace-nowrap"
              >
                {step.title}
              </span>
            </h3>
            <ul className="type-body-md mt-4 space-y-3">
              {step.items.map((item, itemIndex) => (
                <li key={`method-mobile-${index}-item-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div ref={railRef} className="method-rail hidden gap-8 md:grid md:grid-cols-3 md:gap-20">
        {steps.map((step, index) => (
          <h3
            key={`method-heading-${index}`}
            ref={(el) => {
              headingRefs.current[index] = el;
            }}
            className="type-heading-md relative z-10 font-bold text-black"
            style={{ "--step-progress-width": "0%" } as CSSProperties}
          >
            <span>{step.title}</span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-white"
              style={{ width: "var(--step-progress-width, 0%)" }}
            >
              {step.title}
            </span>
          </h3>
        ))}
      </div>

      <div className="mt-6 hidden gap-12 md:grid md:grid-cols-3 md:gap-20">
        {steps.map((step, stepIndex) => (
          <div key={`method-items-${stepIndex}`}>
            <ul className="type-body-lg space-y-5">
              {step.items.map((item, itemIndex) => (
                <li key={`method-items-${stepIndex}-${itemIndex}`}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
