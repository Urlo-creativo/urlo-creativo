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
      <div ref={railRef} className="method-rail grid gap-8 md:grid-cols-3 md:gap-20">
        {steps.map((step, index) => (
          <h3
            key={step.title}
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

      <div className="mt-6 grid gap-12 md:grid-cols-3 md:gap-20">
        {steps.map((step) => (
          <div key={step.title}>
            <ul className="type-body-lg space-y-5">
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
