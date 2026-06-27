"use client";

import type { CategoryOption } from "@/lib/sanity/queries";
import { projectCategoryPillClass } from "@/lib/project-category-styles";

type ProjectFilterButtonsProps = {
  options: CategoryOption[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function ProjectFilterButtons({
  options,
  selected,
  onToggle,
}: ProjectFilterButtonsProps) {
  return (
    <div
      className="mt-10 flex flex-wrap gap-3 md:mt-[70px]"
      role="group"
      aria-label="Project categories"
    >
      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected.includes(option.value)}
          onClick={() => onToggle(option.value)}
          className={[
            "pill-button min-h-11 px-5 py-2 text-center md:min-w-[348px] md:px-8",
            projectCategoryPillClass(index),
          ].join(" ")}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
