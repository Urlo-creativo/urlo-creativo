import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectsListing } from "@/components/sections/projects-listing";
import { SiteFooter } from "@/components/sections/site-footer";
import { client } from "@/lib/sanity/client";
import { localizedAlternates } from "@/lib/site";
import { localeParams } from "@/lib/sanity/locale";
import { projectsListQuery, type ProjectListItem } from "@/lib/sanity/queries";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Projects" };
  return {
    title: getDictionary(locale).nav.projects,
    alternates: localizedAlternates(locale, "/projects"),
  };
}

export const revalidate = 3600;

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

  const items = await client.fetch<ProjectListItem[]>(
    projectsListQuery,
    localeParams(locale),
    { next: { tags: ["project"] } },
  );

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell pb-20 md:pb-[74px]">
        <h1 className="type-display font-bold uppercase">{projects.title}</h1>

        <ProjectsListing
          projects={items}
          locale={locale}
          filterLabel={projects.filterLabel}
          emptyAllLabel={projects.emptyAll}
          emptyCategoryLabel={projects.emptyCategory}
          categoryLabels={projects.categoryLabels}
        />
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
