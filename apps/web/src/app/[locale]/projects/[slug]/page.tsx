import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, cache } from "react";

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
import {
  SanityImage,
  SanityImageOrPlaceholder,
} from "@/components/ui/sanity-image";
import { PLACEHOLDER_IMAGE } from "@/content/placeholders";
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
  type ProjectMediaSection,
} from "@/lib/sanity/queries";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localizedPath, locales, type Locale } from "@/i18n/config";
import {
  isRenderableProjectMediaItem,
  projectDisplayTitle,
  projectMediaSectionsByPlacement,
  projectResponsibilities,
} from "@/lib/project-content";
import { nonEmptyLines } from "@/lib/text";
import { localizedAlternates } from "@/lib/site";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(projectSlugsQuery);
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

const getProject = cache(
  (slug: string, locale: Locale): Promise<Project | null> =>
    client.fetch<Project | null>(
      projectBySlugQuery,
      { slug, ...localeParams(locale) },
      { next: { tags: ["project"] } },
    ),
);

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
    alternates: localizedAlternates(locale, `/projects/${slug}`),
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
  fallbackHeading,
}: {
  sections: ProjectMediaSection[] | null | undefined;
  fallbackHeading?: string;
}) {
  const list = sections ?? [];
  if (list.length === 0) return null;
  return (
    <div className="flex flex-col grid-gap-lg">
      {list.map((section, index) => (
        <ProjectMediaSectionBlock
          key={section._key}
          section={section}
          fallbackHeading={index === 0 ? fallbackHeading : undefined}
        />
      ))}
    </div>
  );
}

type CreditPerson = {
  name: string | null;
  handles: string[];
};

function creditPeople(name: string | null, handle: string | null): CreditPerson[] {
  const names = nonEmptyLines(name);
  const handles = nonEmptyLines(handle);

  if (names.length === 0) {
    return handles.length > 0 ? [{ name: null, handles }] : [];
  }

  if (handles.length === 0) {
    return names.map((personName) => ({ name: personName, handles: [] }));
  }

  if (handles.length >= names.length && handles.length % names.length === 0) {
    const handlesPerName = handles.length / names.length;
    return names.map((personName, index) => ({
      name: personName,
      handles: handles.slice(
        index * handlesPerName,
        index * handlesPerName + handlesPerName,
      ),
    }));
  }

  return names.map((personName, index) => ({
    name: personName,
    handles:
      index === names.length - 1
        ? handles.slice(index)
        : handles.slice(index, index + 1),
  }));
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

  const { footer, projects } = getDictionary(locale);
  const { detailLabels, categoryLabels } = projects;

  // Hero is a projectMediaItem (image or video). Render it via the shared
  // media view; fall back to the cover image when it has no usable source.
  const hero = project.heroMedia;

  const responsibilities = projectResponsibilities(project.responsibilities);
  const roles = project.roles ?? [];
  const credits = project.credits ?? [];
  const seasonLabel = project.season ?? project.year;
  const mediaSections = projectMediaSectionsByPlacement(
    project.projectContentSections,
  );

  return (
    <main className="bg-paper text-black">
      {/* 1. Hero */}
      <section className="relative [--project-hero-offset:96px] pt-[var(--project-hero-offset)] md:[--project-hero-offset:112px]">
        {isRenderableProjectMediaItem(hero) ? (
          <ProjectMediaItemView
            item={hero}
            priority
            sizes="100vw"
            variant="hero"
          />
        ) : (
          <div className="relative h-[calc(var(--viewport-stable-height)-var(--project-hero-offset))] w-full overflow-hidden bg-[var(--color-bg-muted)]">
            <SanityImageOrPlaceholder
              image={project.coverImage}
              fallbackSrc={PLACEHOLDER_IMAGE}
              priority
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <a
          href="#project-detail-content"
          className="focus-ring type-caption absolute bottom-[clamp(20px,4vh,44px)] left-1/2 z-20 flex -translate-x-1/2 items-center justify-center rounded-full bg-black/60 px-5 py-3 text-center font-bold uppercase text-white shadow-[0_12px_36px_rgba(0,0,0,0.22)] backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 motion-reduce:transition-none"
          aria-label={detailLabels.scrollDown}
        >
          <span className="project-scroll-cue-motion flex flex-col items-center gap-2">
            <span>{detailLabels.scrollDown}</span>
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rotate-45 border-b border-r border-current"
            />
          </span>
        </a>
      </section>

      <div className="page-shell">
        {/* 2–6. Title, graphic, category, season, roles */}
        <section
          id="project-detail-content"
          className="border-b border-[var(--color-border-muted)] py-20 md:pb-[72px] md:pt-[92px]"
        >
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
        <div className="flex flex-col grid-gap-lg pb-[var(--space-section-y)] pt-14 md:pt-20">
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
          <MediaZone sections={mediaSections.afterConcept} />

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
          <MediaZone sections={mediaSections.afterResponsibilities} />

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
          <MediaZone sections={mediaSections.afterOutcome} />

          {/* 15. Credits */}
          {credits.length > 0 && (
            <section>
              <h2 className="type-heading-md mb-9 font-bold uppercase">
                {detailLabels.credits}
              </h2>
              <dl>
                {credits.map((credit) => {
                  const roleLabel = credit.role.trim().endsWith(":")
                    ? credit.role
                    : `${credit.role}:`;
                  const people = creditPeople(credit.name, credit.handle);

                  return (
                    <div
                      key={credit._key}
                      className="grid gap-4 border-b border-[var(--color-border-muted)] py-8 md:grid-cols-2 md:gap-16"
                    >
                      <dt className="type-body-lg">
                        <span className="font-bold uppercase">
                          {roleLabel}
                        </span>
                        {people.length > 0 && (
                          <span className="hidden space-y-8 pt-1 font-normal text-[var(--color-text-primary)] md:block">
                            {people.map((person, personIndex) =>
                              person.name ? (
                                <span
                                  key={`${credit._key}-desktop-name-${personIndex}`}
                                  className="block"
                                >
                                  {person.name}
                                </span>
                              ) : null,
                            )}
                          </span>
                        )}
                      </dt>

                      {people.length > 0 && (
                        <>
                          <dd className="type-body-lg hidden space-y-8 pt-[1.44em] text-[var(--color-text-muted)] md:block">
                            {people.map((person, personIndex) => (
                              <span
                                key={`${credit._key}-desktop-handles-${personIndex}`}
                                className="block"
                              >
                                {person.handles.map((personHandle) => (
                                  <span key={personHandle} className="block">
                                    {personHandle}
                                  </span>
                                ))}
                              </span>
                            ))}
                          </dd>

                          <dd className="type-body-lg space-y-7 md:hidden">
                            {people.map((person, personIndex) => (
                              <div key={`${credit._key}-mobile-person-${personIndex}`}>
                                {person.name && (
                                  <p className="text-[var(--color-text-primary)]">
                                    {person.name}
                                  </p>
                                )}
                                {person.handles.length > 0 && (
                                  <p className="mt-3 text-[var(--color-text-muted)]">
                                    {person.handles.map((personHandle) => (
                                      <Fragment key={personHandle}>
                                        {personHandle}
                                        <br />
                                      </Fragment>
                                    ))}
                                  </p>
                                )}
                              </div>
                            ))}
                          </dd>
                        </>
                      )}
                    </div>
                  );
                })}
              </dl>
            </section>
          )}

          {/* 16–17. Behind the Scenes heading + its media */}
          {mediaSections.behindTheScenes.length > 0 && (
            <MediaZone
              sections={mediaSections.behindTheScenes}
              fallbackHeading={detailLabels.behindTheScenes}
            />
          )}
        </div>

        {/* Back to projects */}
        <section className="flex justify-end pb-[var(--space-section-y)]">
          <Link
            href={localizedPath(locale, "/projects")}
            className="pill-button"
          >
            {detailLabels.seeOtherProjects}
          </Link>
        </section>
      </div>

      <SiteFooter footer={footer} />
    </main>
  );
}
