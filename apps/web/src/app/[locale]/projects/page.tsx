import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectFilterButtons } from "@/components/project-filter-buttons";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Projects",
};

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = getDictionary(locale);
  const { projects, footer } = dictionary;

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell">
        <h1 className="type-display font-bold uppercase">
          {projects.title}
        </h1>

        <ProjectFilterButtons filters={projects.filters} />
      </section>

      <section className="page-shell pb-20 pt-20 md:pb-[74px] md:pt-[102px]">
        <div className="border-t border-black">
          {projects.items.map((project) => (
            <article
              key={project.title}
              className="grid gap-4 border-b border-black py-8 md:grid-cols-[104px_minmax(0,1fr)] md:gap-16 md:py-10"
            >
              <p className="type-body-md italic text-[var(--color-text-muted)] md:pt-4">
                {project.year}
              </p>
              <div>
                <h2 className="type-body-xl text-measure font-bold">
                  {project.title}
                </h2>
                <p className="type-body-md mt-4 max-w-[1080px]">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
