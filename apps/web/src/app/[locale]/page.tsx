import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClientMarquee } from "@/components/sections/client-marquee";
import { PotentialSection } from "@/components/sections/potential-section";
import { ProjectMediaItemView } from "@/components/sections/project-media";
import { SiteFooter } from "@/components/sections/site-footer";
import { PageRichText } from "@/components/ui/page-rich-text";
import { SanityImageOrPlaceholder } from "@/components/ui/sanity-image";
import { client } from "@/lib/sanity/client";
import { localeParams } from "@/lib/sanity/locale";
import {
  PLACEHOLDER_IMAGE,
  placeholderText,
} from "@/content/placeholders";
import {
  clientsQuery,
  featuredProjectsQuery,
  homePageQuery,
  type HomePageContent,
  type ProjectListItem,
  type SanityClient,
} from "@/lib/sanity/queries";
import {
  isRenderableProjectMediaItem,
  projectDisplayTitle,
} from "@/lib/project-content";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const revalidate = 3600;

export default async function Home({
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

  const [featuredProjects, homeContent, selectedClients] = await Promise.all([
    client.fetch<ProjectListItem[]>(featuredProjectsQuery, localeParams(locale), {
      next: { tags: ["project"] },
    }),
    client.fetch<HomePageContent | null>(homePageQuery, localeParams(locale), {
      next: { tags: ["homePage"] },
    }),
    client.fetch<SanityClient[]>(clientsQuery, {}, { next: { tags: ["client"] } }),
  ]);

  const fallbackMethodSteps = [
    dictionary.home.method.identify,
    dictionary.home.method.define,
    dictionary.home.method.express,
  ];
  const methodSteps =
    homeContent?.methodSteps?.length
      ? homeContent.methodSteps.map((step) => ({
          title: step.title || placeholderText.title,
          items: step.items?.length ? step.items : [placeholderText.item],
        }))
      : fallbackMethodSteps;
  const clientsForMarquee = selectedClients.length
    ? selectedClients
    : [{ name: placeholderText.name, logo: PLACEHOLDER_IMAGE, url: null }];
  const heroMedia = homeContent?.heroMedia;

  return (
    <main className="overflow-hidden bg-paper">
      <section className="relative h-dvh bg-black text-[var(--color-text-on-hero)]">
        {isRenderableProjectMediaItem(heroMedia) ? (
          <ProjectMediaItemView
            item={heroMedia}
            className="absolute inset-0 z-0"
            priority
            sizes="100vw"
            variant="hero"
          />
        ) : (
          <Image
            src={PLACEHOLDER_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            className="z-0 object-cover"
          />
        )}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="page-shell relative z-20 flex h-full flex-col justify-center pb-20 pt-28">
          <PageRichText
            as="p"
            value={homeContent?.heroKicker}
            fallback={dictionary.home.heroKicker}
            className="type-body-md absolute left-[var(--page-gutter)] top-[92px]"
          />
          <div className="mt-28 text-center md:mt-20">
            <PageRichText
              as="h1"
              value={homeContent?.heroTitle}
              fallback={dictionary.home.heroTitle}
              className="type-display-xl uppercase"
            />
            <PageRichText
              as="p"
              value={homeContent?.heroSubheading}
              fallback={dictionary.home.heroSubheading}
              className="type-body-lg mt-8 text-center italic"
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-[90px]">
        <div>
          <PageRichText
            as="p"
            value={homeContent?.mission}
            fallback={dictionary.home.mission}
            className="type-body-xl"
          />
          <Link
            href={localizedPath(locale, "/contact")}
            className="pill-button mt-8"
          >
            {dictionary.home.contactCta}
          </Link>
        </div>
      </section>

      <section className="relative py-20 md:pb-[128px] md:pt-[170px]">
        <div className="page-shell">
          <PotentialSection
            heading={
              <PageRichText
                as="h2"
                value={homeContent?.potentialTitle}
                fallback={dictionary.home.potentialTitle}
                className="type-display uppercase"
              />
            }
            ctaHref={localizedPath(locale, "/services")}
            ctaLabel={dictionary.home.discoverServices}
            steps={methodSteps}
          />
        </div>
      </section>

      <section className="page-shell py-20 md:pb-[88px] md:pt-[72px]">
        <div className="mb-12 md:mb-[68px]">
          <PageRichText
            as="h2"
            value={homeContent?.projectsTitle}
            fallback={dictionary.home.projectsTitle}
            className="type-display uppercase"
          />
        </div>
        {/* 2 cols at md keeps images tall enough for 1.1× to reach the title;
            3 cols only kicks in at lg (≥1024px) where images are large enough */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-[80px]">
          {featuredProjects.map((project) => {
            const projectTitle = projectDisplayTitle(project);
            return (
              /* `isolate` creates a shared compositing group so the text's
                 mix-blend-difference blends against the image that overlaps it.
                 `bg-paper` gives that group an opaque backdrop (same as the page,
                 so invisible): where the scaled image doesn't cover the title, the
                 difference blend resolves white against cream → dark/readable
                 instead of staying white. The visible title below is the link's
                 accessible name, so the image stays alt="" (decorative). */
              <Link
                key={project._id}
                href={localizedPath(locale, `/projects/${project.slug}`)}
                aria-label={
                  project.year
                    ? `${projectTitle} (${project.year})`
                    : projectTitle
                }
                className="focus-ring group relative isolate block bg-paper"
              >

                {/* Image grows from the top-left anchor on hover */}
                <div
                  className="relative aspect-square overflow-hidden md:media-portrait
                             origin-top-left transition-transform duration-500 ease-out
                             motion-reduce:transition-none
                             md:group-hover:scale-[1.1] md:motion-reduce:group-hover:scale-100"
                >
                  <SanityImageOrPlaceholder
                    image={project.coverImage}
                    alt=""
                    fallbackSrc={PLACEHOLDER_IMAGE}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-[filter] duration-500 ease-out
                               md:grayscale md:blur-[3px]
                               motion-reduce:transition-none
                               md:group-hover:grayscale-0 md:group-hover:blur-0"
                  />
                </div>

                {/* On desktop the title is permanently white + mix-blend-difference.
                    Against the card's cream backdrop it resolves to near-black at
                    rest; as the scaled image moves over it on hover, the overlapped
                    part auto-contrasts. Nothing toggles on hover (the smooth image
                    scale drives the change), so the title never flashes. Mobile
                    keeps plain dark text. */}
                <div className="relative mt-4">
                  <h3
                    className="type-heading-md font-bold uppercase text-ink
                               md:text-white md:mix-blend-difference"
                  >
                    <span className="block">{project.clientName}</span>
                    {project.projectName && (
                      <span className="block italic normal-case">
                        {project.projectName}
                      </span>
                    )}
                  </h3>
                  <p
                    className="type-heading-md mt-1 text-[var(--color-text-subtle)]"
                  >
                    {project.year}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
        <Link
          href={localizedPath(locale, "/projects")}
          className="pill-button mt-12"
        >
          {dictionary.home.seeAllProjects}
        </Link>
      </section>

      <section className="page-shell py-16 md:pb-[120px] md:pt-[80px]">
        <div className="mb-12">
          <PageRichText
            value={homeContent?.methodologyLabel}
            fallback={dictionary.home.methodologyLabel}
            className="type-body-xl"
          />
        </div>

        <PageRichText
          as="p"
          value={homeContent?.methodology}
          fallback={dictionary.home.methodology}
          className="type-body-xl"
        />
      </section>

      <section className="section-y">
        <div className="page-shell">
          <PageRichText
            as="h2"
            value={homeContent?.selectedClients}
            fallback={dictionary.home.selectedClients}
            className="type-display uppercase"
          />
        </div>
        <ClientMarquee clients={clientsForMarquee} />
      </section>

      <section className="py-20 md:pb-[180px] md:pt-[190px]">
        {/* Heading */}
        <div className="page-shell">
          <PageRichText
            as="h2"
            value={homeContent?.teamTitle}
            fallback={dictionary.home.teamTitle}
            className="type-display uppercase"
          />
        </div>

        {/* Full-width photo */}
        <div className="relative mt-8 aspect-[1440/1029] w-full overflow-hidden">
          <SanityImageOrPlaceholder
            image={homeContent?.teamImage}
            fallbackSrc={PLACEHOLDER_IMAGE}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Body text + button */}
        <div className="page-shell mt-16 md:mt-24">
          <PageRichText
            as="p"
            value={homeContent?.teamIntro}
            fallback={dictionary.home.teamIntro}
            className="type-body-xl"
          />
          <Link
            href={localizedPath(locale, "/about")}
            className="pill-button mt-10"
          >
            {dictionary.home.learnMore}
          </Link>
        </div>
      </section>

      <SiteFooter footer={dictionary.footer} />
    </main>
  );
}
