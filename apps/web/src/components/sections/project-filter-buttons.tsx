"use client";

import { useId, useState } from "react";

import type { CategoryOption } from "@/lib/sanity/queries";
import { projectCategoryPillClass } from "@/lib/project-category-styles";

type ProjectFilterButtonsProps = {
  label: string;
  options: CategoryOption[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function ProjectFilterButtons({
  label,
  options,
  selected,
  onToggle,
}: ProjectFilterButtonsProps) {
  const panelId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel = selected.length > 0 ? ` (${selected.length})` : "";

  return (
    <div className="mt-10 border-y border-black md:mt-[70px] md:border-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="focus-ring flex min-h-11 w-full items-center justify-between py-3 text-left md:hidden"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="type-body-md font-bold uppercase">
          {label}
          {selectedLabel}
        </span>
        <span
          aria-hidden="true"
          className="text-[26px] leading-none transition-transform duration-300 ease-out"
        >
          {isOpen ? "×" : "+"}
        </span>
      </button>

      <div
        id={panelId}
        className={[
          "grid transition-[grid-template-rows] duration-300 ease-out md:block",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        ].join(" ")}
      >
        <div className="min-h-0 overflow-hidden md:overflow-visible">
          <div
            className="flex flex-wrap gap-3 pb-6 pt-3 md:py-0"
            role="group"
            aria-label={label}
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
        </div>
      </div>
    </div>
  );
}
