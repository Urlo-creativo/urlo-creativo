import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProcessSection } from "@/components/process-section";
import { StructuredRichText } from "@/components/rich-text";
import { TeamCoreSection } from "@/components/team-core-section";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "About Us",
};

const teamPhotos = [
  "/about/GUILIA.png",
  "/about/FEDERICA.png",
  "/about/MARTINA.png",
  "/about/MARGHERITA.png",
  "/about/VALENTINA.png",
  "/about/CAMILLA.png",
] as const;

export default async function AboutPage({
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
  const { about, home } = dictionary;

  return (
    <main className="overflow-hidden bg-paper pt-[154px] text-black md:pt-[204px]">
      <section className="page-shell">
        <div>
          <StructuredRichText
            as="h1"
            lines={about.title}
            className="text-[clamp(56px,6.7vw,96px)] uppercase leading-none tracking-normal"
          />
          <p className="mt-8 w-full text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.08] tracking-normal md:mt-9">
            {about.intro}
          </p>
        </div>
      </section>

      <section className="relative mt-20 h-[360px] overflow-hidden bg-[var(--uc-paper-2)] md:mt-[104px] md:h-[1018px]">
        <Image
          src="/projects/people-team.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.06] object-cover object-center blur-[8px]"
        />
      </section>

      <section className="bg-yellow py-16 md:py-[145px]">
        <div className="page-shell">
          <StructuredRichText
            as="p"
            lines={about.statement}
            className="w-full text-[clamp(22px,2.45vw,36px)] leading-[1.16] tracking-normal"
          />
        </div>
      </section>

      <TeamCoreSection title={about.teamCoreTitle} roles={about.coreRoles} />

      <ProcessSection
        title={about.processTitle}
        stages={about.processStages}
        descriptions={about.processDescriptions}
      />

      <section className="page-shell py-20 md:pb-[170px] md:pt-[96px]">
        <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {about.missionTitle}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start md:gap-[140px]">
          <p className="text-[clamp(22px,2.5vw,36px)] leading-[1.12] tracking-normal">
            {about.mission}
          </p>
          <div className="relative aspect-[575/337] overflow-hidden">
            <Image
              src="/about/mission.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <StructuredRichText
          as="p"
          lines={about.missionHighlight}
          className="mt-1 text-[clamp(28px,3.2vw,52px)] uppercase leading-[1.08] tracking-normal"
        />
      </section>

      <section className="page-shell pb-20 pt-8 md:pb-[168px] md:pt-[92px]">
        <div className="grid md:grid-cols-2 md:items-end md:gap-[80px]">
          <StructuredRichText
            as="h2"
            lines={about.historyTitle}
            className="text-[clamp(30px,3.2vw,50px)] uppercase leading-none tracking-normal"
          />
          <div className="relative z-10 ml-auto aspect-[310/244] w-[220px] origin-top-left cursor-pointer overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.1] md:w-[310px] md:self-start lg:w-[360px]">
            <Image
              src="/about/history-value.png"
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:gap-6">
          <div className="group/history-item relative cursor-pointer border-y border-black py-2 outline-none" tabIndex={0}>
            <div className="flex min-h-[48px] items-center justify-between gap-4 md:min-h-[60px]">
              <p className="text-[clamp(30px,3.2vw,50px)] font-bold leading-none tracking-normal">
                {about.historyStart}
              </p>
              <p className="self-end pb-1 text-right text-[clamp(14px,1.1vw,18px)] leading-none tracking-normal text-black">
                {about.historyStartYear}
              </p>
            </div>
            <StructuredRichText
              as="p"
              lines={about.historyStartDescription}
              className="pointer-events-none absolute left-0 top-full z-20 mt-6 max-w-[760px] translate-y-2 text-[14px] leading-[1.18] tracking-normal opacity-0 transition-all duration-300 ease-out group-hover/history-item:translate-y-0 group-hover/history-item:opacity-100 group-focus/history-item:translate-y-0 group-focus/history-item:opacity-100 md:text-[16px]"
            />
          </div>
          <div className="group/history-item relative cursor-pointer border-y border-black py-2 outline-none" tabIndex={0}>
            <div className="flex min-h-[48px] items-center justify-between gap-4 md:min-h-[60px]">
              <p className="text-[clamp(30px,3.2vw,50px)] font-bold leading-none tracking-normal">
                {about.historyNow}
              </p>
              <p className="self-end pb-1 text-right text-[clamp(14px,1.1vw,18px)] leading-none tracking-normal text-black">
                {about.historyNowYear}
              </p>
            </div>
            <StructuredRichText
              as="p"
              lines={about.historyNowDescription}
              className="pointer-events-none absolute left-0 top-full z-20 mt-6 max-w-[760px] translate-y-2 text-[14px] leading-[1.18] tracking-normal opacity-0 transition-all duration-300 ease-out group-hover/history-item:translate-y-0 group-hover/history-item:opacity-100 group-focus/history-item:translate-y-0 group-focus/history-item:opacity-100 md:text-[16px]"
            />
          </div>
        </div>
      </section>

      <section className="page-shell pb-24 pt-10 md:pb-[190px] md:pt-[82px]">
        <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {about.peopleTitle}
        </h2>
        <div className="mt-12 grid gap-x-[72px] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.map((member, index) => (
            <article key={member.name}>
              <div className="relative aspect-[357/440] overflow-hidden bg-gray-100">
                <Image
                  src={teamPhotos[index]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <h3 className="mt-4 text-[clamp(18px,1.45vw,24px)] font-bold uppercase leading-none tracking-normal">
                {member.name}
              </h3>
              <p className="mt-2 w-full text-[clamp(14px,1vw,18px)] uppercase leading-[1.25] tracking-normal text-gray-600">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-yellow py-20 md:py-[180px]">
        <div className="page-shell">
          <h2 className="mb-16 text-[clamp(64px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
            {home.contactTitle}
          </h2>

          <div className="grid gap-12 md:grid-cols-2">
            <p className="whitespace-pre-line text-[24px] leading-normal tracking-normal">
              {home.contactAddress}
            </p>
            <div className="flex flex-col gap-8 text-[24px] font-bold leading-none tracking-normal">
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
            {home.consultationCta}
          </a>
        </div>
      </section>
    </main>
  );
}
