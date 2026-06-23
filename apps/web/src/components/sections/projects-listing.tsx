"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { ProjectFilterButtons } from "@/components/sections/project-filter-buttons";
import { SanityImage } from "@/components/ui/sanity-image";
import { localizedPath, type Locale } from "@/i18n/config";
import {
  categoryLabel,
  getCategoryOptions,
  type CategoryLabels,
  type ProjectListItem,
} from "@/lib/sanity/queries";

type ProjectsListingProps = {
  projects: ProjectListItem[];
  locale: Locale;
  allLabel: string;
  emptyAllLabel: string;
  emptyCategoryLabel: string;
  categoryLabels: CategoryLabels;
};

export function ProjectsListing({
  projects,
  locale,
  allLabel,
  emptyAllLabel,
  emptyCategoryLabel,
  categoryLabels,
}: ProjectsListingProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = useMemo(
    () => getCategoryOptions(projects, categoryLabels),
    [categoryLabels, projects],
  );

  const visibleProjects = useMemo(() => {
    if (!selected) return projects;
    return projects.filter((project) =>
      (project.categories ?? []).includes(selected),
    );
  }, [projects, selected]);

  return (
    <>
      <ProjectFilterButtons
        options={options}
        allLabel={allLabel}
        selected={selected}
        onSelect={setSelected}
      />

      <div className="mt-20 border-t border-black md:mt-[102px]">
        {visibleProjects.map((project) => (
          <article key={project._id} className="border-b border-black py-8 md:py-10">
            <Link
              href={localizedPath(locale, `/projects/${project.slug}`)}
              className="group grid gap-6 md:grid-cols-[104px_minmax(0,1fr)_minmax(0,360px)] md:gap-16"
            >
              <p className="type-body-md italic text-[var(--color-text-muted)] md:pt-1">
                {project.year}
              </p>

              <div>
                <h2 className="type-body-xl text-measure font-bold transition-opacity group-hover:opacity-60">
                  {project.title}
                </h2>
                {project.categories && project.categories.length > 0 && (
                  <p className="type-body-sm mt-3 uppercase text-[var(--color-text-muted)]">
                    {project.categories
                      .map((category) => categoryLabel(category, categoryLabels))
                      .join(" · ")}
                  </p>
                )}
                {project.excerpt && (
                  <p className="type-body-md mt-4 max-w-[1080px]">
                    {project.excerpt}
                  </p>
                )}
              </div>

              {project.coverImage && (
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--color-bg-muted)] md:max-w-[360px]">
                  <SanityImage
                    image={project.coverImage}
                    fill
                    sizes="(min-width: 768px) 360px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              )}
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
