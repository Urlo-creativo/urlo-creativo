"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import type { ProcessStepColor } from "@/lib/sanity/queries";

const processColorValues = {
  pink: "var(--color-process-1)",
  deepBlue: "var(--color-process-2)",
  yellow: "var(--color-process-3)",
  coral: "var(--color-process-4)",
  blue: "var(--color-process-5)",
  orange: "var(--color-process-6)",
} as const;

const defaultProcessColors: readonly ProcessStepColor[] = [
  "pink",
  "deepBlue",
  "yellow",
  "coral",
  "blue",
  "orange",
];

// Foreground per block, chosen for WCAG contrast against each fill.
// Only blue-deep (process-2) is dark enough to need white; the rest are light.
function textColorFor(color: ProcessStepColor) {
  return color === "deepBlue" ? "text-white" : "text-black";
}

type ProcessSectionProps = {
  title: ReactNode;
  stages: readonly string[];
  descriptions: readonly string[];
  colors?: readonly (ProcessStepColor | null | undefined)[];
};

export function ProcessSection({
  title,
  stages,
  descriptions,
  colors,
}: ProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  function colorFor(index: number) {
    return colors?.[index] ?? defaultProcessColors[index % defaultProcessColors.length]!;
  }

  return (
    <section className="page-shell py-20 lg:pb-[136px] lg:pt-[96px]">
      <h2 className="type-display uppercase">
        {title}
      </h2>
      <div className="mt-9 space-y-3 lg:hidden">
        {stages.map((stage, i) => (
          <div key={`process-mobile-${i}`} className="border-t border-black pt-3">
            <div className="flex gap-3">
              <span
                aria-hidden
                className="mt-1 h-12 w-4 shrink-0"
                style={{ backgroundColor: processColorValues[colorFor(i)] }}
              />
              <div>
                <p className="type-caption font-bold uppercase">
                  {stage}
                </p>
                <p className="type-body-sm mt-2">
                  {descriptions[i]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 hidden lg:block lg:mt-[58px]">
        <div className="type-caption grid grid-cols-6 pb-1 font-bold uppercase">
          {stages.map((stage, i) => (
            <span key={`process-label-${i}`}>{stage}</span>
          ))}
        </div>
        {/* Fixed height so expansion overlaps content below without pushing it */}
        <div
          className="mt-1 grid grid-cols-6 border-t border-black pt-2"
          style={{ height: "48px", overflow: "visible" }}
        >
          {stages.map((stage, i) => (
            <button
              type="button"
              key={`process-panel-${i}`}
              aria-label={`${stage}: ${descriptions[i]}`}
              className="focus-ring relative h-full cursor-pointer appearance-none bg-transparent p-0 text-left"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(null)}
            >
              <div
                className="absolute inset-x-0 top-0 z-10 flex items-center overflow-hidden transition-[height] duration-300 ease-out"
                style={{
                  backgroundColor: processColorValues[colorFor(i)],
                  height: activeIndex === i ? "120px" : "48px",
                }}
              >
                <p
                  className={`type-body-sm px-4 transition-opacity duration-200 ${textColorFor(colorFor(i))} ${
                    activeIndex === i ? "opacity-100 delay-100" : "opacity-0 delay-0"
                  }`}
                >
                  {descriptions[i]}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
