import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ClientMarquee } from "@/components/sections/client-marquee";
import { PotentialSection } from "@/components/sections/potential-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { PortableRichText } from "@/components/ui/portable-rich-text";
import {
  StructuredRichText,
  type RichTextToken,
} from "@/components/ui/rich-text";
import { SanityImage } from "@/components/ui/sanity-image";
import { client } from "@/lib/sanity/client";
import { localeParams } from "@/lib/sanity/locale";
import {
  featuredProjectsQuery,
  homePageQuery,
  type HomePageContent,
  type PortableRichTextValue,
  type ProjectListItem,
} from "@/lib/sanity/queries";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type Client = { name: string; logo: string; url?: string };

const clients: Client[] = [
  { name: "Colmar", logo: "/clients/placeholder.svg", url: "https://www.colmar.it" },
  { name: "Velasca", logo: "/clients/placeholder.svg", url: "https://www.velasca.com" },
  { name: "OVS", logo: "/clients/placeholder.svg", url: "https://www.ovs.it" },
  { name: "Kappa", logo: "/clients/placeholder.svg", url: "https://www.kappa.com" },
  { name: "Ducati", logo: "/clients/placeholder.svg", url: "https://www.ducati.com" },
  { name: "Rossignol", logo: "/clients/placeholder.svg", url: "https://www.rossignol.com" },
];

type HomeRichTextProps = {
  as?: "p" | "h1" | "h2" | "h3" | "span";
  className?: string;
  fallback: RichTextToken[][];
  value: PortableRichTextValue | undefined;
};

function HomeRichText({
  as = "p",
  className,
  fallback,
  value,
}: HomeRichTextProps) {
  if (value && (!Array.isArray(value) || value.length > 0)) {
    return <PortableRichText as={as} blocks={value} className={className} />;
  }

  return <StructuredRichText as={as} lines={fallback} className={className} />;
}

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

  const featuredProjects = await client.fetch<ProjectListItem[]>(
    featuredProjectsQuery,
    localeParams(locale),
  );
  const homeContent = await client.fetch<HomePageContent | null>(
    homePageQuery,
    localeParams(locale),
  );

  const fallbackMethodSteps = [
    dictionary.home.method.identify,
    dictionary.home.method.define,
    dictionary.home.method.express,
  ];
  const methodSteps =
    homeContent?.methodSteps?.length
      ? homeContent.methodSteps.map((step) => ({
          title: step.title,
          items: step.items ?? [],
        }))
      : fallbackMethodSteps;

  return (
    <main className="overflow-hidden bg-paper">
      <section className="relative h-dvh bg-black text-[var(--color-text-on-hero)]">
        <Image
          src="/hero/hero-mountain.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover"
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0) 100%), linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="page-shell relative z-20 flex h-full flex-col justify-center pb-20 pt-28">
          <HomeRichText
            as="p"
            value={homeContent?.heroKicker}
            fallback={dictionary.home.heroKicker}
            className="type-body-md absolute left-[var(--page-gutter)] top-[92px]"
          />
          <div className="mt-28 text-center md:mt-20">
            <HomeRichText
              as="h1"
              value={homeContent?.heroTitle}
              fallback={dictionary.home.heroTitle}
              className="type-display-xl font-bold uppercase"
            />
            <HomeRichText
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
          <HomeRichText
            as="p"
            value={homeContent?.mission}
            fallback={dictionary.home.mission}
            className="type-body-xl"
          />
          <a
            href="mailto:info@consulenzecreativeperetto.com"
            className="pill-button mt-8"
          >
            {dictionary.home.contactCta}
          </a>
        </div>
      </section>

      <section className="relative py-20 md:pb-[128px] md:pt-[170px]">
        <div className="page-shell">
          <PotentialSection
            heading={
              <HomeRichText
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
          <HomeRichText
            as="h2"
            value={homeContent?.projectsTitle}
            fallback={dictionary.home.projectsTitle}
            className="type-display font-bold uppercase"
          />
        </div>
        {/* 2 cols at md keeps images tall enough for 1.1× to reach the title;
            3 cols only kicks in at lg (≥1024px) where images are large enough */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-[80px]">
          {featuredProjects.map((project) => {
            const projectTitle = [project.clientName, project.projectName]
              .filter(Boolean)
              .join(": ");
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
                className="group relative isolate block bg-paper"
              >

                {/* Image grows from the top-left anchor on hover */}
                <div
                  className="relative aspect-square overflow-hidden md:media-portrait
                             origin-top-left transition-transform duration-500 ease-out
                             md:group-hover:scale-[1.1]"
                >
                  <SanityImage
                    image={project.coverImage}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-all duration-500 ease-out
                               md:grayscale md:blur-[3px]
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
          <HomeRichText
            value={homeContent?.methodologyLabel}
            fallback={dictionary.home.methodologyLabel}
            className="type-body-xl"
          />
        </div>

        <HomeRichText
          as="p"
          value={homeContent?.methodology}
          fallback={dictionary.home.methodology}
          className="type-body-xl"
        />

        <Link
          href={localizedPath(locale, "/services")}
          className="pill-button mt-12"
        >
          {dictionary.home.whatWeDo}
        </Link>
      </section>

      <section className="section-y">
        <div className="page-shell">
          <HomeRichText
            as="h2"
            value={homeContent?.selectedClients}
            fallback={dictionary.home.selectedClients}
            className="type-display uppercase"
          />
        </div>
        <ClientMarquee clients={clients} />
      </section>

      <section className="py-20 md:pb-[180px] md:pt-[190px]">
        {/* Heading */}
        <div className="page-shell">
          <HomeRichText
            as="h2"
            value={homeContent?.teamTitle}
            fallback={dictionary.home.teamTitle}
            className="type-display font-bold uppercase"
          />
        </div>

        {/* Full-width photo */}
        <div className="relative mt-8 aspect-[1440/1029] w-full overflow-hidden">
          <Image
            src="/projects/people-team.jpg"
            alt="The Urlo Creativo team"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Body text + button */}
        <div className="page-shell mt-16 md:mt-24">
          <HomeRichText
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
