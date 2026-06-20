import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProcessSection } from "@/components/sections/process-section";
import { StructuredRichText } from "@/components/ui/rich-text";
import { SiteFooter } from "@/components/sections/site-footer";
import { TeamCoreSection } from "@/components/sections/team-core-section";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "About Us",
};

const teamPhotos = [
  "/about/giulia.png",
  "/about/federica.png",
  "/about/martina.png",
  "/about/margherita.png",
  "/about/valentina.png",
  "/about/camilla.png",
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
  const { about, footer } = dictionary;

  return (
    <main className="page-top overflow-hidden bg-paper text-black">
      <section className="page-shell">
        <div>
          <StructuredRichText
            as="h1"
            lines={about.title}
            className="type-display uppercase"
          />
          <p className="type-heading-xl mt-8 w-full font-bold md:mt-9">
            {about.intro}
          </p>
        </div>
      </section>

      <section className="relative mt-20 h-[360px] overflow-hidden bg-[var(--color-bg-muted)] md:mt-[104px] md:h-[1018px]">
        <Image
          src="/projects/people-team.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-[1.06] object-cover object-center blur-[8px]"
        />
      </section>

      <section className="section-y bg-yellow">
        <div className="page-shell">
          <StructuredRichText
            as="p"
            lines={about.statement}
            className="type-body-xl w-full"
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
        <h2 className="type-display font-bold uppercase">
          {about.missionTitle}
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start md:gap-[140px]">
          <p className="type-body-xl">
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
          className="type-heading-xl mt-1 uppercase"
        />
      </section>

      <section className="page-shell pb-20 pt-8 md:pb-[168px] md:pt-[92px]">
        <div className="grid md:grid-cols-2 md:items-end md:gap-[80px]">
          <StructuredRichText
            as="h2"
            lines={about.historyTitle}
            className="type-heading-xl uppercase"
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
              <p className="type-heading-xl font-bold">
                {about.historyStart}
              </p>
              <p className="type-body-sm self-end pb-1 text-right text-black">
                {about.historyStartYear}
              </p>
            </div>
            <StructuredRichText
              as="p"
              lines={about.historyStartDescription}
              className="type-body-sm text-measure-narrow pointer-events-none absolute left-0 top-full z-20 mt-6 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover/history-item:translate-y-0 group-hover/history-item:opacity-100 group-focus/history-item:translate-y-0 group-focus/history-item:opacity-100"
            />
          </div>
          <div className="group/history-item relative cursor-pointer border-y border-black py-2 outline-none" tabIndex={0}>
            <div className="flex min-h-[48px] items-center justify-between gap-4 md:min-h-[60px]">
              <p className="type-heading-xl font-bold">
                {about.historyNow}
              </p>
              <p className="type-body-sm self-end pb-1 text-right text-black">
                {about.historyNowYear}
              </p>
            </div>
            <StructuredRichText
              as="p"
              lines={about.historyNowDescription}
              className="type-body-sm text-measure-narrow pointer-events-none absolute left-0 top-full z-20 mt-6 translate-y-2 opacity-0 transition-all duration-300 ease-out group-hover/history-item:translate-y-0 group-hover/history-item:opacity-100 group-focus/history-item:translate-y-0 group-focus/history-item:opacity-100"
            />
          </div>
        </div>
      </section>

      <section className="page-shell pb-24 pt-10 md:pb-[190px] md:pt-[82px]">
        <h2 className="type-display font-bold uppercase">
          {about.peopleTitle}
        </h2>
        <div className="mt-12 grid gap-x-[72px] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.map((member, index) => (
            <article key={member.name}>
              <div className="media-portrait relative overflow-hidden bg-gray-100">
                <Image
                  src={teamPhotos[index]}
                  alt={`Portrait of ${member.name}`}
                  fill
                  sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
              <h3 className="type-body-lg mt-4 font-bold uppercase">
                {member.name}
              </h3>
              <p className="type-body-sm mt-2 w-full uppercase text-[var(--color-text-muted)]">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
