import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PotentialSection } from "@/components/potential-heading";
import { isLocale, localizedPath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const projectImages = [
  {
    src: "/projects/project-kappa-ducati.png",
    title: "KAPPA X DUCATI",
    year: "2026",
  },
  {
    src: "/projects/project-colmar.png",
    title: "COLMAR SPORT",
    year: "2026",
  },
  {
    src: "/projects/project-rossignol.png",
    title: "JCC x ROSSIGNOL",
    year: "2026",
  },
];

const clients = ["COLMAR", "VELASCA", "OVS", "KAPPA", "DUCATI", "ROSSIGNOL"];

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
            accent={dictionary.home.potentialAccent}
            ctaHref={localizedPath(locale, "/services")}
            ctaLabel={dictionary.home.discoverServices}
            line1={dictionary.home.potentialLine1}
            line2={dictionary.home.potentialLine2}
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
        <div className="grid gap-8 md:grid-cols-3 md:gap-[38px]">
          {projectImages.map((project) => (
            <article key={project.src}>
              <div className="relative aspect-square overflow-hidden bg-gray-100 md:aspect-[357/440]">
                <Image
                  src={project.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover grayscale"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-[clamp(20px,2.5vw,36px)] font-bold uppercase leading-none">
                  {project.title}
                </h3>
                <p className="mt-1 text-[clamp(20px,2.5vw,36px)] leading-none text-gray-500">
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

      <section className="page-shell py-16 md:py-[170px]">
        <div className="max-w-[860px]">
          <p className="mb-6 inline bg-yellow px-1 text-[18px] leading-none">
            {dictionary.home.methodologyLabel}
          </p>
          <p className="mt-6 text-[clamp(22px,2.5vw,36px)] font-bold leading-[1.04] tracking-normal">
            {dictionary.home.methodology}
          </p>
          <Link
            href={localizedPath(locale, "/services")}
            className="pill-button mt-8"
          >
            {dictionary.home.whatWeDo}
          </Link>
        </div>
      </section>

      <section className="py-16 md:py-[150px]">
        <div className="page-shell">
          <h2 className="text-[clamp(48px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
            {dictionary.home.selectedClientsTitle}{" "}
            <span className="italic">
              {dictionary.home.selectedClientsAccent}
            </span>
          </h2>
        </div>
        <div className="mt-16 bg-yellow py-8 md:py-[33px]">
          <div className="flex min-w-max animate-[client-marquee_24s_linear_infinite] items-center gap-16 text-[clamp(28px,4vw,56px)] font-bold uppercase leading-none text-black/85 md:gap-[118px]">
            {[...clients, ...clients].map((client, index) => (
              <span key={`${client}-${index}`}>{client}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 md:min-h-[1760px] md:pb-[180px] md:pt-[190px]">
        <div className="absolute inset-x-0 top-[40%] -z-0 h-[760px] -translate-y-1/2 overflow-hidden opacity-45 blur-xl">
          <Image
            src="/projects/people-team.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover grayscale"
          />
        </div>
        <div className="page-shell relative z-10">
          <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none">
            {dictionary.home.teamTitle}
          </h2>
          <div className="mt-[clamp(260px,66vw,940px)] max-w-[980px]">
            <p className="text-[clamp(20px,2.2vw,32px)] font-bold leading-[1.04]">
              {dictionary.home.teamIntro}
            </p>
            <Link
              href={localizedPath(locale, "/about")}
              className="pill-button mt-8"
            >
              {dictionary.home.learnMore}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-yellow py-20 md:min-h-[865px] md:py-[180px]">
        <div className="page-shell">
          <div>
            <h2 className="mb-20 text-[clamp(64px,6.7vw,96px)] font-bold uppercase leading-none">
              {dictionary.home.contactTitle}
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-[1fr_1fr_1fr]">
            <p className="whitespace-pre-line text-[24px] leading-normal">
              {dictionary.home.contactAddress}
            </p>
            <div className="space-y-8 text-[24px] font-bold leading-none">
              <a href="https://www.linkedin.com" rel="noreferrer" target="_blank">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" rel="noreferrer" target="_blank">
                Instagram
              </a>
            </div>
            <div className="flex md:items-end md:justify-start">
              <a
                href="mailto:info@consulenzecreativeperetto.com"
                className="pill-button"
              >
                {dictionary.home.consultationCta}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
