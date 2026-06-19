"use client";

import { useState } from "react";

const filterStyles = [
  "pill-button-neutral",
  "pill-button-yellow",
  "pill-button-pink",
  "pill-button-blue",
] as const;

type ProjectFilterButtonsProps = {
  filters: readonly string[];
};

export function ProjectFilterButtons({ filters }: ProjectFilterButtonsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div
      className="mt-12 flex flex-wrap gap-3 md:mt-[70px]"
      aria-label="Project categories"
    >
      {filters.map((filter, index) => (
        <button
          key={filter}
          type="button"
          aria-pressed={selectedIndex === index}
          onClick={() => {
            setSelectedIndex((current) => (current === index ? null : index));
          }}
          className={[
            "pill-button min-h-8 px-5 py-1 md:min-w-[144px] md:px-8",
            index > 0 ? "md:min-w-[348px]" : "",
            filterStyles[index],
          ].join(" ")}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
