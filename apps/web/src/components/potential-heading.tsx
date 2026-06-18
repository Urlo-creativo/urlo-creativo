"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";

type MethodStep = {
  items: string[];
  title: string;
};

type PotentialSectionProps = {
  accent: string;
  ctaHref: string;
  ctaLabel: string;
  line1: string;
  line2: string;
  steps: MethodStep[];
};

export function PotentialSection({
  accent,
  ctaHref,
  ctaLabel,
  line1,
  line2,
  steps,
}: PotentialSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [firstWord, ...remainingWords] = line1.split(" ");
  const remainingLine = remainingWords.join(" ");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      section.style.setProperty("--highlight-progress", "1");
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const highlightStart = viewportHeight * 0.9;
      const highlightEnd = viewportHeight * 0.62;
      const rail = railRef.current;
      const railRect = rail?.getBoundingClientRect();
      const railStart = viewportHeight;
      const railEnd = viewportHeight * 0.5;
      const highlightProgress = Math.min(
        Math.max((highlightStart - rect.top) / (highlightStart - highlightEnd), 0),
        1,
      );
      const railProgress = Math.min(
        Math.max((railStart - (railRect?.top ?? rect.top)) / (railStart - railEnd), 0),
        1,
      );

      section.style.setProperty("--highlight-progress", highlightProgress.toFixed(3));
      section.style.setProperty("--rail-progress", railProgress.toFixed(3));
    };

    const requestUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ "--highlight-progress": 0, "--rail-progress": 0 } as CSSProperties}
    >
      <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
        <span className="scroll-highlight scroll-highlight-pink">{firstWord}</span>
        {remainingLine ? ` ${remainingLine}` : null}
        <br />
        {line2}{" "}
        <span className="scroll-highlight scroll-highlight-yellow italic">{accent}</span>
      </h2>

      <div className="method-block mt-20">
        <div ref={railRef} className="method-rail grid gap-8 md:grid-cols-3 md:gap-20">
          {steps.map((step) => (
            <h3
              key={step.title}
              className="relative z-10 text-[clamp(24px,2.5vw,36px)] font-bold leading-none"
            >
              {step.title}
            </h3>
          ))}
        </div>

        <div className="mt-6 grid gap-12 md:grid-cols-3 md:gap-20">
          {steps.map((step) => (
            <div key={step.title}>
              <ul className="space-y-5 text-[clamp(18px,1.7vw,24px)] leading-none">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Link href={ctaHref} className="pill-button mt-16">
        {ctaLabel}
      </Link>
    </div>
  );
}
