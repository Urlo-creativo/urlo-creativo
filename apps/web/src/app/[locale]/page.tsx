import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MethodologyLabel } from "@/components/methodology-label";
import { PeopleText } from "@/components/people-text";
import { PotentialSection } from "@/components/potential-heading";
import { RichText } from "@/components/rich-text";
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

const projectImages = [
  {
    src: "/projects/project_kappa_ducati.png",
    title: "KAPPA X DUCATI",
    year: "2026",
  },
  {
    src: "/projects/project_colmar.png",
    title: "COLMAR SPORT",
    year: "2026",
  },
  {
    src: "/projects/project_rossignol.png",
    title: "JCC X ROSSIGNOL",
    year: "2026",
  },
];

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

  const methodSteps = [
    dictionary.home.method.identify,
    dictionary.home.method.define,
    dictionary.home.method.express,
  ];

  return (
    <main className="overflow-hidden bg-paper">
      <section className="relative min-h-[820px] bg-black text-[#f4f4f4] md:h-[1018px]">
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
              "linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.48) 38%, rgba(0,0,0,0.18) 68%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.58) 0%, rgba(0,0,0,0.24) 42%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div className="page-shell relative z-20 flex h-full min-h-[820px] flex-col justify-center pb-20 pt-28 md:min-h-0">
          <p className="absolute left-[var(--page-gutter)] top-[92px] whitespace-pre-line text-[16px] leading-normal">
            {dictionary.home.heroKicker}
          </p>
          <div className="mt-28 text-center md:mt-20">
            <h1 className="text-[clamp(56px,8vw,96px)] font-bold uppercase leading-none tracking-normal">
              {dictionary.home.heroTitle}
            </h1>
            <p className="mt-8 text-center text-[clamp(18px,2vw,24px)] italic">
              {dictionary.home.heroSubheading}
            </p>
          </div>
        </div>
      </section>

      <section className="page-shell py-24 md:py-[90px]">
        <div className="max-w-[1182px]">
          <p className="text-[clamp(28px,2.5vw,36px)] font-bold leading-normal tracking-normal">
            {dictionary.home.mission}
          </p>
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
            heading={dictionary.home.potentialHeading}
            ctaHref={localizedPath(locale, "/services")}
            ctaLabel={dictionary.home.discoverServices}
            steps={methodSteps}
          />
        </div>
      </section>

      <section className="page-shell py-20 md:pb-[88px] md:pt-[72px]">
        <div className="mb-12 md:mb-[68px]">
          <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
            {dictionary.home.projectsTitle}
          </h2>
        </div>
        {/* 2 cols at md keeps images tall enough for 1.1× to reach the title;
            3 cols only kicks in at lg (≥1024px) where images are large enough */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-[80px]">
          {projectImages.map((project) => (
            /* `isolate` creates a shared compositing group so the text's
               mix-blend-difference blends against the image that overlaps it */
            <article key={project.src} className="group relative isolate cursor-pointer">

              {/* Image grows from the top-left anchor on hover */}
              <div
                className="relative aspect-square overflow-hidden md:aspect-[357/440]
                           origin-top-left transition-transform duration-500 ease-out
                           group-hover:scale-[1.1]"
              >
                <Image
                  src={project.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-all duration-500 ease-out
                             grayscale blur-[3px]
                             group-hover:grayscale-0 group-hover:blur-0"
                />
              </div>

              {/* Text is always in its layout position and always its normal colour.
                  On hover, text-white + mix-blend-difference turns on so it
                  auto-contrasts wherever the scaled image overlaps it. */}
              <div className="relative mt-4">
                <h3
                  className="text-[clamp(20px,2.5vw,36px)] font-bold uppercase leading-none
                             text-ink transition-colors duration-500
                             group-hover:text-white group-hover:mix-blend-difference"
                >
                  {project.title}
                </h3>
                <p
                  className="mt-1 text-[clamp(20px,2.5vw,36px)] leading-none text-gray-500"
                >
                  {project.year}
                </p>
              </div>
            </article>
          ))}
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
          <MethodologyLabel label={dictionary.home.methodologyLabel} />
        </div>

        <RichText
          text={dictionary.home.methodology}
          className="max-w-content text-[clamp(22px,2.5vw,36px)] leading-[1.2]"
        />

        <Link
          href={localizedPath(locale, "/services")}
          className="pill-button mt-12"
        >
          {dictionary.home.whatWeDo}
        </Link>
      </section>

      <section className="py-16 md:py-[150px]">
        <div className="page-shell">
          <RichText
            as="h2"
            text={dictionary.home.selectedClients}
            className="text-[clamp(48px,6.7vw,96px)] uppercase leading-none tracking-normal"
          />
        </div>
        <div className="mt-16 overflow-hidden bg-yellow py-8 md:py-[40px]">
          {/* 4 copies + mr- (not gap-) so -50% always has content on screen.
              With 6 clients × ~182px each = 1092px < 1440px viewport,
              2 copies would expose empty space at the loop point. */}
          <div className="flex min-w-max animate-[client-marquee_24s_linear_infinite] items-center">
            {[...clients, ...clients, ...clients, ...clients].map((c, i) => {
              const img = (
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={240}
                  height={80}
                  className="h-[80px] w-auto object-contain"
                />
              );
              return c.url ? (
                <a
                  key={`${c.name}-${i}`}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mr-16 block shrink-0 transition-opacity duration-300 hover:opacity-60 md:mr-[118px]"
                >
                  {img}
                </a>
              ) : (
                <div key={`${c.name}-${i}`} className="mr-16 shrink-0 md:mr-[118px]">
                  {img}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 md:pb-[180px] md:pt-[190px]">
        {/* Heading */}
        <div className="page-shell">
          <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none">
            {dictionary.home.teamTitle}
          </h2>
        </div>

        {/* Full-width photo */}
        <div className="relative mt-8 aspect-[1440/1029] w-full overflow-hidden">
          <Image
            src="/projects/people-team.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Body text + button */}
        <div className="page-shell mt-16 md:mt-24">
          <PeopleText text={dictionary.home.teamIntro} />
          <Link
            href={localizedPath(locale, "/about")}
            className="pill-button mt-10"
          >
            {dictionary.home.learnMore}
          </Link>
        </div>
      </section>

      <section className="bg-yellow py-20 md:py-[180px]">
        <div className="page-shell">
          <h2 className="mb-16 text-[clamp(64px,6.7vw,96px)] font-bold uppercase leading-none">
            {dictionary.home.contactTitle}
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            <p className="whitespace-pre-line text-[24px] leading-normal">
              {dictionary.home.contactAddress}
            </p>
            <div className="flex flex-col gap-8 text-[24px] font-bold leading-none">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-opacity hover:opacity-60"
              >
                Instagram
              </a>
            </div>
          </div>

          <a
            href="mailto:info@consulenzecreativeperetto.com"
            className="pill-button mt-16"
          >
            {dictionary.home.consultationCta}
          </a>
        </div>
      </section>
    </main>
  );
}
