"use client";

import { useState } from "react";

const processColors = [
  "var(--color-process-1)",
  "var(--color-process-2)",
  "var(--color-process-3)",
  "var(--color-process-4)",
  "var(--color-process-5)",
  "var(--color-process-6)",
] as const;

// Foreground per block, chosen for WCAG contrast against each fill.
// Only blue-deep (process-2) is dark enough to need white; the rest are light.
const textColors = [
  "text-black",
  "text-white",
  "text-black",
  "text-black",
  "text-black",
  "text-black",
] as const;

type ProcessSectionProps = {
  title: string;
  stages: readonly string[];
  descriptions: readonly string[];
};

export function ProcessSection({ title, stages, descriptions }: ProcessSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="page-shell py-20 md:pb-[136px] md:pt-[96px]">
      <h2 className="type-display font-bold uppercase">
        {title}
      </h2>
      <div className="mt-10 md:mt-[58px]">
        <div className="type-caption grid grid-cols-6 pb-1 font-bold uppercase">
          {stages.map((stage) => (
            <span key={stage}>{stage}</span>
          ))}
        </div>
        {/* Fixed height so expansion overlaps content below without pushing it */}
        <div
          className="mt-1 grid grid-cols-6 border-t border-black pt-2"
          style={{ height: "48px", overflow: "visible" }}
        >
          {stages.map((stage, i) => (
            <div
              key={stage}
              className="relative cursor-pointer"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div
                className="absolute inset-x-0 top-0 z-10 flex items-center overflow-hidden transition-[height] duration-300 ease-out"
                style={{
                  backgroundColor: processColors[i],
                  height: activeIndex === i ? "120px" : "48px",
                }}
              >
                <p
                  className={`type-body-sm px-4 transition-opacity duration-200 ${textColors[i]} ${
                    activeIndex === i ? "opacity-100 delay-100" : "opacity-0 delay-0"
                  }`}
                >
                  {descriptions[i]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
