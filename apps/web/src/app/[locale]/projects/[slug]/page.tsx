import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ProjectMediaItemView,
  ProjectMediaSectionBlock,
} from "@/components/sections/project-media";
import { SiteFooter } from "@/components/sections/site-footer";
import { PortableRichText } from "@/components/ui/portable-rich-text";
import {
  StructuredRichText,
  type RichTextToken,
} from "@/components/ui/rich-text";
import { SanityImage } from "@/components/ui/sanity-image";
import { PLACEHOLDER_ALT, PLACEHOLDER_IMAGE } from "@/content/placeholders";
import { projectCategoryPillClass } from "@/lib/project-category-styles";
import { client } from "@/lib/sanity/client";
import { hasImageAsset } from "@/lib/sanity/image";
import { localeParams } from "@/lib/sanity/locale";
import {
  CATEGORY_ORDER,
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
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
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

function projectDisplayTitle(
  project: Pick<Project, "clientName" | "projectName">,
) {
  return [project.clientName, project.projectName].filter(Boolean).join(": ");
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
    title: projectDisplayTitle(project),
    description: project.excerpt ?? undefined,
  };
}

// Presentational wrapper for a fixed text section: highlighted heading + body.
// The heading (text + highlight colour + reveal trigger) is a dictionary
// RichTextToken and renders through the shared StructuredRichText pipeline used
// across the site — this component only adds the section/body layout.
function TextSection({
  heading,
  children,
}: {
  heading: RichTextToken[][];
  children: React.ReactNode;
}) {
  return (
    <section>
      <StructuredRichText
        as="h2"
        lines={heading}
        className="type-heading-md uppercase"
      />
      <div className="stack-md">{children}</div>
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

// Sections live in one ordered array; split them by their chosen placement,
// preserving the editor's relative order within each placement.
function sectionsAt(
  sections: ProjectMediaSection[] | null | undefined,
  placement: ProjectMediaPlacement,
): ProjectMediaSection[] {
  return (sections ?? []).filter((section) => section.placement === placement);
}

function linesFromResponsibilities(
  value: Project["responsibilities"],
): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return value
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : [];
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

  // Hero is a projectMediaItem (image or video). Render it via the shared
  // media view; fall back to the cover image when it has no usable source.
  const hero = project.heroMedia;
  const heroRenderable =
    hero &&
    (hero.mediaType === "video"
      ? Boolean(hero.videoUrl || hero.videoFile)
      : hasImageAsset(hero.image));

  const responsibilities = linesFromResponsibilities(project.responsibilities);
  const roles = project.roles ?? [];
  const credits = project.credits ?? [];
  const seasonLabel = project.season ?? project.year;

  const sections = project.projectContentSections;
  const mediaAfterConcept = sectionsAt(sections, "afterConcept");
  const mediaAfterResponsibilities = sectionsAt(
    sections,
    "afterResponsibilities",
  );
  const mediaAfterOutcome = sectionsAt(sections, "afterOutcome");
  const mediaBehindTheScenes = sectionsAt(sections, "behindTheScenes");

  return (
    <main className="bg-paper text-black">
      {/* 1. Hero */}
      <section className="[--project-hero-offset:96px] pt-[var(--project-hero-offset)] md:[--project-hero-offset:112px]">
        {heroRenderable ? (
          <ProjectMediaItemView
            item={hero}
            priority
            sizes="100vw"
            variant="hero"
          />
        ) : (
          <div className="relative h-[calc(100vh-var(--project-hero-offset))] w-full overflow-hidden bg-[var(--color-bg-muted)]">
            {hasImageAsset(project.coverImage) ? (
              <SanityImage
                image={project.coverImage}
                priority
                fill
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={PLACEHOLDER_ALT}
                priority
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        )}
      </section>

      <div className="page-shell">
        {/* 2–6. Title, graphic, category, season, roles */}
        <section className="border-b border-[var(--uc-gray-200)] py-20 md:pb-[72px] md:pt-[92px]">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 className="type-display font-bold uppercase">
                {project.clientName}
              </h1>
              {project.projectName && (
                <p className="type-display font-bold italic">
                  {project.projectName}
                </p>
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

          {(project.categories?.length || seasonLabel || roles.length > 0) && (
            <div className="mt-5 md:mt-6">
              {project.categories?.length ? (
                <div className="flex flex-wrap items-center gap-3">
                  {project.categories.map((category, index) => {
                    const categoryIndex = CATEGORY_ORDER.includes(category)
                      ? CATEGORY_ORDER.indexOf(category)
                      : index;

                    return (
                      <span
                        key={category}
                        className={[
                          "pill-button pill-button-reverse type-body-sm rounded-full border border-black px-6 py-1 uppercase",
                          projectCategoryPillClass(categoryIndex),
                        ].join(" ")}
                      >
                        {categoryLabel(category, categoryLabels)}
                      </span>
                    );
                  })}
                </div>
              ) : null}

              {seasonLabel && (
                <p className="type-body-sm mt-5 italic text-[var(--color-text-muted)]">
                  {seasonLabel}
                </p>
              )}

              {roles.length > 0 && (
                <p className="type-body-sm mt-1 italic text-[var(--color-text-muted)]">
                  {roles.join(" · ")}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Interleaved text + media flow */}
        <div className="flex flex-col grid-gap-lg pb-[var(--space-section-y)]">
          {/* 7. Challenge */}
          {project.challenge && project.challenge.length > 0 && (
            <TextSection heading={detailLabels.challenge}>
              <PortableRichText
                blocks={project.challenge}
                className="type-body-lg"
              />
            </TextSection>
          )}

          {/* 8. Concept */}
          {project.concept && project.concept.length > 0 && (
            <TextSection heading={detailLabels.concept}>
              <PortableRichText
                blocks={project.concept}
                className="type-body-lg"
              />
            </TextSection>
          )}

          {/* 9. Media after Concept */}
          <MediaZone sections={mediaAfterConcept} />

          {/* 10. Process */}
          {project.process && project.process.length > 0 && (
            <TextSection heading={detailLabels.process}>
              <PortableRichText
                blocks={project.process}
                className="type-body-lg"
              />
            </TextSection>
          )}

          {/* 11. Responsibilities */}
          {responsibilities.length > 0 && (
            <TextSection heading={detailLabels.responsibilities}>
              <ul className="type-body-lg flex flex-col items-start gap-7">
                {responsibilities.map((item, index) => (
                  <li
                    key={index}
                    className="inline-block border-y border-[var(--color-text-muted)] leading-[1.08]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TextSection>
          )}

          {/* 12. Media after Responsibilities */}
          <MediaZone sections={mediaAfterResponsibilities} />

          {/* 13. Outcome */}
          {project.outcome && project.outcome.length > 0 && (
            <TextSection heading={detailLabels.outcome}>
              <PortableRichText
                blocks={project.outcome}
                className="type-body-lg"
              />
            </TextSection>
          )}

          {/* 14. Media after Outcome */}
          <MediaZone sections={mediaAfterOutcome} />

          {/* 15. Credits */}
          {credits.length > 0 && (
            <section>
              <h2 className="type-heading-md mb-8 font-bold uppercase">
                {detailLabels.credits}
              </h2>
              <dl className="grid gap-x-12 gap-y-6 md:grid-cols-2">
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
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-black pb-3"
                    >
                      <dt className="type-body-sm">
                        <span className="font-bold uppercase">
                          {credit.role}
                        </span>
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
          {mediaBehindTheScenes.length > 0 && (
            <>
              <h2 className="type-display font-bold uppercase">
                {detailLabels.behindTheScenes}
              </h2>
              <MediaZone sections={mediaBehindTheScenes} />
            </>
          )}
        </div>

        {/* Back to projects */}
        <section className="pb-[var(--space-section-y)]">
          <Link
            href={localizedPath(locale, "/projects")}
            className="pill-button"
          >
            {nav.projects}
          </Link>
        </section>
      </div>

      <SiteFooter footer={footer} />
    </main>
  );
}
