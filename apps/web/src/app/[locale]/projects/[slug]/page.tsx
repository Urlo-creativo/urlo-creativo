import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProjectMediaItemView,
  ProjectMediaSectionBlock,
} from "@/components/sections/project-media";
import { SiteFooter } from "@/components/sections/site-footer";
import { HighlightText } from "@/components/ui/highlight-text";
import { SanityImage } from "@/components/ui/sanity-image";
import { client } from "@/lib/sanity/client";
import { hasImageAsset } from "@/lib/sanity/image";
import { localeParams } from "@/lib/sanity/locale";
import {
  categoryLabel,
  projectBySlugQuery,
  projectSlugsQuery,
  type Project,
  type ProjectMediaPlacement,
  type ProjectMediaSection,
} from "@/lib/sanity/queries";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizedPath, locales, type Locale } from "@/i18n/config";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

async function getProject(
  slug: string,
  locale: Locale,
): Promise<Project | null> {
  return client.fetch<Project | null>(projectBySlugQuery, {
    slug,
    ...localeParams(locale),
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  const locale = isLocale(localeParam) ? localeParam : "it";
  const project = await getProject(slug, locale);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description: project.excerpt ?? undefined,
  };
}

// Fixed text section: highlighted label + body. Alternating label colours
// mirror the reference layouts (challenge/process/outcome = yellow,
// concept/responsibilities = blue).
function TextSection({
  label,
  color,
  children,
}: {
  label: string;
  color: "yellow" | "blue";
  children: React.ReactNode;
}) {
  return (
    <section className="page-shell">
      <h2 className="type-heading-md font-bold uppercase">
        <HighlightText color={color} trigger="scroll">
          {label}
        </HighlightText>
      </h2>
      <div className="stack-md text-measure">{children}</div>
    </section>
  );
}

// A repeatable media zone: renders an ordered list of media sections, or
// nothing when the zone is empty.
function MediaZone({
  sections,
}: {
  sections: ProjectMediaSection[] | null | undefined;
}) {
  const list = sections ?? [];
  if (list.length === 0) return null;
  return (
    <div className="flex flex-col grid-gap-lg">
      {list.map((section) => (
        <ProjectMediaSectionBlock key={section._key} section={section} />
      ))}
    </div>
  );
}

function hasZone(sections: ProjectMediaSection[] | null | undefined): boolean {
  return Boolean(sections && sections.length > 0);
}

// Sections live in one ordered array; split them by their chosen placement,
// preserving the editor's relative order within each placement.
function sectionsAt(
  sections: ProjectMediaSection[] | null | undefined,
  placement: ProjectMediaPlacement,
): ProjectMediaSection[] {
  return (sections ?? []).filter((section) => section.placement === placement);
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const project = await getProject(slug, locale);

  if (!project) {
    notFound();
  }

  const { footer, nav, projects } = getDictionary(locale);
  const { detailLabels, categoryLabels } = projects;

  const heroIsVideo =
    project.heroMedia?.mediaType === "video" &&
    (project.heroMedia.videoUrl || project.heroMedia.videoFile);
  const heroImage =
    project.heroMedia?.mediaType === "image" &&
    hasImageAsset(project.heroMedia.image)
      ? project.heroMedia.image
      : project.coverImage;

  const responsibilities = project.responsibilities ?? [];
  const roles = project.roles ?? [];
  const credits = project.credits ?? [];

  const sections = project.projectContentSections;
  const mediaAfterConcept = sectionsAt(sections, "afterConcept");
  const mediaAfterResponsibilities = sectionsAt(sections, "afterResponsibilities");
  const mediaAfterOutcome = sectionsAt(sections, "afterOutcome");
  const mediaBehindTheScenes = sectionsAt(sections, "behindTheScenes");

  return (
    <main className="bg-paper text-black">
      {/* 1. Hero */}
      <section className="page-top">
        <div className="page-shell">
          {heroIsVideo && project.heroMedia ? (
            <ProjectMediaItemView item={project.heroMedia} priority />
          ) : (
            heroImage && (
              <SanityImage
                image={heroImage}
                priority
                sizes="(min-width: 1728px) 1632px, 100vw"
                className="h-auto w-full"
              />
            )
          )}
        </div>
      </section>

      {/* 2–6. Title, graphic, category, season, roles */}
      <section className="page-shell section-y-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="type-display font-bold uppercase">{project.title}</h1>
            {project.subtitle && (
              <p className="type-heading-xl mt-2 italic">{project.subtitle}</p>
            )}
          </div>

          {hasImageAsset(project.titleGraphic) && (
            <div className="w-32 shrink-0 md:w-40">
              <SanityImage
                image={project.titleGraphic}
                sizes="160px"
                className="h-auto w-full"
              />
            </div>
          )}
        </div>

        {(project.categories?.length ||
          project.season ||
          project.year) && (
          <div className="stack-md flex flex-wrap items-center gap-x-6 gap-y-3">
            {project.categories?.map((category) => (
              <span
                key={category}
                className="type-body-sm border border-black px-3 py-1 uppercase"
              >
                {categoryLabel(category, categoryLabels)}
              </span>
            ))}
            {project.season && (
              <span className="type-body-sm italic text-[var(--color-text-muted)]">
                {project.season}
              </span>
            )}
            {project.year && (
              <span className="type-body-sm italic text-[var(--color-text-muted)]">
                {project.year}
              </span>
            )}
          </div>
        )}

        {roles.length > 0 && (
          <div className="stack-md">
            <p className="type-body-sm uppercase text-[var(--color-text-muted)]">
              {detailLabels.rolesServices}
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {roles.map((role, index) => (
                <li
                  key={index}
                  className="type-body-sm border border-[var(--color-border-primary)] px-3 py-1"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Interleaved text + media flow */}
      <div className="flex flex-col grid-gap-lg pb-[var(--space-section-y)]">
        {/* 7. Challenge */}
        {project.challenge && (
          <TextSection label={detailLabels.challenge} color="yellow">
            <p className="type-body-lg whitespace-pre-line">
              {project.challenge}
            </p>
          </TextSection>
        )}

        {/* 8. Concept */}
        {project.concept && (
          <TextSection label={detailLabels.concept} color="blue">
            <p className="type-body-lg whitespace-pre-line">
              {project.concept}
            </p>
          </TextSection>
        )}

        {/* 9. Media after Concept */}
        <MediaZone sections={mediaAfterConcept} />

        {/* 10. Process */}
        {project.process && (
          <TextSection label={detailLabels.process} color="yellow">
            <p className="type-body-lg whitespace-pre-line">
              {project.process}
            </p>
          </TextSection>
        )}

        {/* 11. Responsibilities */}
        {responsibilities.length > 0 && (
          <TextSection label={detailLabels.responsibilities} color="blue">
            <ul className="type-body-lg flex flex-col gap-1">
              {responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </TextSection>
        )}

        {/* 12. Media after Responsibilities */}
        <MediaZone sections={mediaAfterResponsibilities} />

        {/* 13. Outcome */}
        {project.outcome && (
          <TextSection label={detailLabels.outcome} color="yellow">
            <p className="type-body-lg whitespace-pre-line">
              {project.outcome}
            </p>
          </TextSection>
        )}

        {/* 14. Media after Outcome */}
        <MediaZone sections={mediaAfterOutcome} />

        {/* 15. Credits */}
        {credits.length > 0 && (
          <section className="page-shell">
            <h2 className="type-heading-md mb-8 font-bold uppercase">
              {detailLabels.credits}
            </h2>
            <dl className="grid max-w-content gap-x-12 gap-y-6 md:grid-cols-2">
              {credits.map((credit) => {
                const handle = credit.url ? (
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-opacity hover:opacity-60"
                  >
                    {credit.handle ?? credit.url}
                  </a>
                ) : (
                  credit.handle
                );
                return (
                  <div
                    key={credit._key}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-[var(--color-border-primary)] pb-3"
                  >
                    <dt className="type-body-sm">
                      <span className="font-bold uppercase">{credit.role}</span>
                      {credit.name && (
                        <span className="block text-[var(--color-text-muted)]">
                          {credit.name}
                        </span>
                      )}
                    </dt>
                    {handle && (
                      <dd className="type-body-sm text-[var(--color-text-muted)]">
                        {handle}
                      </dd>
                    )}
                  </div>
                );
              })}
            </dl>
          </section>
        )}

        {/* 16–17. Behind the Scenes (fixed heading) + its media */}
        {hasZone(mediaBehindTheScenes) && (
          <>
            <section className="page-shell">
              <h2 className="type-display font-bold uppercase">
                {detailLabels.behindTheScenes}
              </h2>
            </section>
            <MediaZone sections={mediaBehindTheScenes} />
          </>
        )}
      </div>

      {/* Back to projects */}
      <section className="page-shell pb-[var(--space-section-y)]">
        <Link href={localizedPath(locale, "/projects")} className="pill-button">
          {nav.projects}
        </Link>
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
