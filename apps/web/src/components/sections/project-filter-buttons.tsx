"use client";

import type { CategoryOption } from "@/lib/sanity/queries";
import { projectCategoryPillClass } from "@/lib/project-category-styles";

type ProjectFilterButtonsProps = {
  options: CategoryOption[];
  allLabel: string;
  selected: string | null;
  onSelect: (value: string | null) => void;
};

export function ProjectFilterButtons({
  options,
  allLabel,
  selected,
  onSelect,
}: ProjectFilterButtonsProps) {
  return (
    <div
      className="mt-10 flex flex-wrap gap-3 md:mt-[70px]"
      role="group"
      aria-label="Project categories"
    >
      <button
        type="button"
        aria-pressed={selected === null}
        onClick={() => onSelect(null)}
        className="pill-button pill-button-neutral min-h-11 px-5 py-2 text-center md:min-w-[144px] md:px-8"
      >
        {allLabel}
      </button>

      {options.map((option, index) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={selected === option.value}
          onClick={() =>
            onSelect(selected === option.value ? null : option.value)
          }
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
