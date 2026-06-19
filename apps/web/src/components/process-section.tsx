"use client";

import { useState } from "react";

const processColors = [
  "var(--uc-pink)",
  "var(--uc-blue-deep)",
  "var(--uc-yellow)",
  "var(--uc-coral)",
  "var(--uc-blue)",
  "var(--uc-orange)",
] as const;

const textColors = [
  "text-black",
  "text-white",
  "text-black",
  "text-white",
  "text-white",
  "text-white",
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
      <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
        {title}
      </h2>
      <div className="mt-10 md:mt-[58px]">
        <div className="grid grid-cols-6 pb-1 text-[10px] font-bold uppercase leading-none tracking-normal md:text-[13px]">
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
                  className={`px-4 text-[12px] leading-[1.4] transition-opacity duration-200 md:text-[14px] ${textColors[i]} ${
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
