"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";

import { ProjectFilterButtons } from "@/components/sections/project-filter-buttons";
import { SanityImageOrPlaceholder } from "@/components/ui/sanity-image";
import { PLACEHOLDER_IMAGE } from "@/content/placeholders";
import { localizedPath, type Locale } from "@/i18n/config";
import {
  getCategoryOptions,
  type CategoryLabels,
  type ProjectListItem,
} from "@/lib/sanity/queries";

type ProjectsListingProps = {
  projects: ProjectListItem[];
  locale: Locale;
  emptyAllLabel: string;
  emptyCategoryLabel: string;
  categoryLabels: CategoryLabels;
};

export function ProjectsListing({
  projects,
  locale,
  emptyAllLabel,
  emptyCategoryLabel,
  categoryLabels,
}: ProjectsListingProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const options = useMemo(
    () => getCategoryOptions(projects, categoryLabels),
    [categoryLabels, projects],
  );

  const selectedCategorySet = useMemo(
    () => new Set(selectedCategories),
    [selectedCategories],
  );

  const visibleProjects = useMemo(() => {
    if (
      selectedCategories.length === 0 ||
      selectedCategories.length === options.length
    ) {
      return projects;
    }

    return projects.filter((project) =>
      (project.categories ?? []).some((category) =>
        selectedCategorySet.has(category),
      ),
    );
  }, [options.length, projects, selectedCategories.length, selectedCategorySet]);

  const hoveredProject = useMemo(
    () => visibleProjects.find((project) => project._id === hoveredProjectId),
    [hoveredProjectId, visibleProjects],
  );

  useEffect(() => {
    setHoveredProjectId(null);
  }, [selectedCategories]);

  function toggleCategory(value: string) {
    setSelectedCategories((current) =>
      current.includes(value)
        ? current.filter((category) => category !== value)
        : [...current, value],
    );
  }

  function movePreview(x: number, y: number) {
    if (!previewRef.current) return;
    previewRef.current.style.transform =
      `translate3d(${x}px, ${y}px, 0) translate(28px, 24px)`;
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch") return;
    movePreview(event.clientX, event.clientY);
  }

  return (
    <>
      <ProjectFilterButtons
        options={options}
        selected={selectedCategories}
        onToggle={toggleCategory}
      />

      <div
        ref={previewRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-40 hidden w-[min(28vw,380px)] md:block"
        style={{
          transform: "translate3d(-999px, -999px, 0) translate(28px, 24px)",
        }}
      >
        <div
          className={`relative aspect-[4/3] w-full overflow-hidden border border-black bg-[var(--color-bg-muted)] shadow-[0_24px_60px_rgba(0,0,0,0.16)] transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            hoveredProject
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0"
          }`}
        >
          {hoveredProject ? (
            <SanityImageOrPlaceholder
              image={hoveredProject.coverImage}
              alt=""
              fallbackSrc={PLACEHOLDER_IMAGE}
              fill
              sizes="380px"
              width={760}
              className="object-cover"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-20 border-t border-black md:mt-[102px]">
        {visibleProjects.map((project) => (
          <article key={project._id} className="border-b border-black">
            <Link
              href={localizedPath(locale, `/projects/${project.slug}`)}
              className="focus-ring group grid gap-6 py-8 md:grid-cols-[104px_minmax(0,1fr)] md:items-center md:gap-16 md:py-12"
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") {
                  return;
                }
                movePreview(event.clientX, event.clientY);
                setHoveredProjectId(project._id);
              }}
              onPointerMove={handlePointerMove}
              onPointerLeave={(event) => {
                if (event.pointerType === "touch") return;
                setHoveredProjectId(null);
              }}
              onFocus={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                movePreview(
                  rect.left + rect.width * 0.72,
                  rect.top + rect.height * 0.5,
                );
                setHoveredProjectId(project._id);
              }}
              onBlur={() => setHoveredProjectId(null)}
            >
              <p className="type-body-lg italic text-[var(--color-text-muted)]">
                {project.year}
              </p>

              <div>
                <h2 className="type-heading-xl font-bold transition-opacity duration-300 group-hover:opacity-60 group-focus-visible:opacity-60 motion-reduce:transition-none">
                  <span>{project.clientName}</span>
                  {project.projectName && (
                    <span>
                      {`: ${project.projectName}`}
                    </span>
                  )}
                </h2>
                {project.excerpt && (
                  <p className="type-body-md mt-3 max-w-[1080px]">
                    {project.excerpt}
                  </p>
                )}

                <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden bg-[var(--color-bg-muted)] md:hidden">
                  <SanityImageOrPlaceholder
                    image={project.coverImage}
                    alt=""
                    fallbackSrc={PLACEHOLDER_IMAGE}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          </article>
        ))}

        {visibleProjects.length === 0 && (
          <p className="type-body-md py-12 text-[var(--color-text-muted)]">
            {projects.length === 0 ? emptyAllLabel : emptyCategoryLabel}
          </p>
        )}
      </div>
    </>
  );
}
