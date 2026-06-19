import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StructuredRichText } from "@/components/rich-text";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "About Us",
};

const processColors = [
  "var(--uc-pink)",
  "var(--uc-blue-deep)",
  "var(--uc-yellow)",
  "var(--uc-coral)",
  "var(--uc-blue)",
  "var(--uc-orange)",
] as const;

const teamPhotos = [
  "/about/giulia.jpg",
  "/about/federica.jpg",
  "/about/martina.jpg",
  "/about/margherita.jpg",
  "/about/valentina.jpg",
  "/about/camilla.jpg",
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

      <section className="page-shell py-20 md:pb-[148px] md:pt-[172px]">
        <h2 className="text-[clamp(48px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {about.teamCoreTitle}
        </h2>
        <div className="mt-9 flex max-w-[420px] flex-col items-start">
          {about.coreRoles.map((role) => (
            <span
              key={role}
              className="border border-[var(--uc-blue-deep)] px-2 py-1 text-[12px] uppercase leading-none tracking-normal text-gray-600 md:text-[14px]"
            >
              {role}
            </span>
          ))}
        </div>
      </section>

      <section className="page-shell py-20 md:pb-[136px] md:pt-[96px]">
        <h2 className="max-w-[620px] text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {about.processTitle}
        </h2>
        <div className="mt-10 max-w-[1180px] overflow-x-auto pb-2 md:mt-[58px]">
          <div className="min-w-[620px]">
            <div className="grid grid-cols-6 border-t border-black pt-3 text-[10px] font-bold uppercase leading-none tracking-normal md:text-[13px]">
              {about.processStages.map((stage) => (
                <span key={stage}>{stage}</span>
              ))}
            </div>
            <div className="mt-3 grid h-4 grid-cols-6">
              {about.processStages.map((stage, index) => (
                <div
                  key={stage}
                  style={{ backgroundColor: processColors[index] }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-20 md:pb-[170px] md:pt-[96px]">
        <h2 className="text-[clamp(56px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {about.missionTitle}
        </h2>
        <div className="mt-8 grid max-w-[1096px] gap-8 md:grid-cols-[minmax(0,440px)_minmax(320px,1fr)] md:items-end md:gap-[92px]">
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
        <p className="mt-4 inline bg-yellow px-2 text-[clamp(18px,2vw,32px)] font-bold uppercase leading-[1.08] tracking-normal">
          {about.missionHighlight}
        </p>
      </section>

      <section className="page-shell pb-20 pt-8 md:pb-[168px] md:pt-[92px]">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_310px] md:items-end">
          <div>
            <h2 className="inline bg-yellow px-1 text-[clamp(20px,2vw,32px)] font-bold uppercase leading-none tracking-normal">
              {about.historyTitle}
            </h2>
            <div className="mt-6 grid grid-cols-2 border-y border-black py-3">
              <div>
                <p className="text-[clamp(18px,1.9vw,30px)] font-bold leading-none tracking-normal">
                  {about.historyStart}
                </p>
                <p className="mt-3 text-right text-[10px] leading-none tracking-normal text-gray-600">
                  {about.historyStartYear}
                </p>
              </div>
              <div className="border-l border-black pl-4">
                <p className="text-[clamp(18px,1.9vw,30px)] font-bold leading-none tracking-normal">
                  {about.historyNow}
                </p>
                <p className="mt-3 text-right text-[10px] leading-none tracking-normal text-gray-600">
                  {about.historyNowYear}
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-[830px] text-[12px] leading-[1.28] tracking-normal md:text-[14px]">
              {about.history}
            </p>
          </div>
          <div className="relative ml-auto w-[220px] md:w-full">
            <span className="absolute -left-8 -top-6 h-3 w-24 rotate-[-45deg] bg-yellow" />
            <div className="relative aspect-[310/244] overflow-hidden">
              <Image
                src="/about/history-value.jpg"
                alt=""
                fill
                sizes="310px"
                className="object-cover object-center"
              />
            </div>
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
              <h3 className="mt-4 text-[13px] font-bold uppercase leading-none tracking-normal">
                {member.name}
              </h3>
              <p className="mt-2 max-w-[260px] text-[11px] uppercase leading-[1.25] tracking-normal text-gray-600">
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
