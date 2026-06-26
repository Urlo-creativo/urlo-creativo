import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProcessSection } from "@/components/sections/process-section";
import { PageRichText } from "@/components/ui/page-rich-text";
import { SanityImageOrPlaceholder } from "@/components/ui/sanity-image";
import { SiteFooter } from "@/components/sections/site-footer";
import {
  TeamCoreSection,
  type TeamCoreRole,
} from "@/components/sections/team-core-section";
import { client } from "@/lib/sanity/client";
import {
  PLACEHOLDER_IMAGE,
  placeholderText,
} from "@/content/placeholders";
import { hasImageAsset } from "@/lib/sanity/image";
import { localeParams } from "@/lib/sanity/locale";
import {
  aboutPageQuery,
  peopleQuery,
  type AboutPageContent,
  type PersonListItem,
} from "@/lib/sanity/queries";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "About Us",
};

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

  const [aboutContent, people] = await Promise.all([
    client.fetch<AboutPageContent | null>(aboutPageQuery, localeParams(locale)),
    client.fetch<PersonListItem[]>(peopleQuery, localeParams(locale)),
  ]);

  const coreRoles: TeamCoreRole[] = aboutContent?.coreRoles?.length
    ? aboutContent.coreRoles.map((item, index) => ({
        role: item.role ?? about.coreRoles[index] ?? placeholderText.role,
        image: hasImageAsset(item.image) ? item.image : null,
        fallbackImage: PLACEHOLDER_IMAGE,
        alt: item.image?.alt ?? "",
      }))
    : about.coreRoles.map((role) => ({
        role,
        fallbackImage: PLACEHOLDER_IMAGE,
      }));
  const processSteps = aboutContent?.processSteps?.length
    ? aboutContent.processSteps.map((step, index) => ({
        stage: step.stage ?? about.processStages[index] ?? placeholderText.label,
        description:
          step.description ?? about.processDescriptions[index] ?? placeholderText.body,
        color: step.color,
      }))
    : about.processStages.map((stage, index) => ({
        stage,
        description: about.processDescriptions[index] ?? "",
        color: null,
      }));
  const historyItems = aboutContent?.historyItems?.length
    ? aboutContent.historyItems.map((item, index) => {
        const fallbackDescription =
          index === 0
            ? about.historyStartDescription
            : about.historyNowDescription;

        return {
          key: item._key,
          label:
            item.label ??
            (index === 0 ? about.historyStart : about.historyNow),
          year:
            item.year ??
            (index === 0 ? about.historyStartYear : about.historyNowYear),
          description: item.description,
          fallbackDescription,
        };
      })
    : [
        {
          key: "history-placeholder",
          label: about.historyStart,
          year: about.historyStartYear,
          description: undefined,
          fallbackDescription: about.historyStartDescription,
        },
      ];
  const teamMembers = people.length
    ? people.map((member, index) => {
        const fallbackMember = about.team[index];

        return {
          key: member._id,
          name: member.name ?? fallbackMember?.name ?? placeholderText.name,
          role: member.role ?? fallbackMember?.role ?? placeholderText.role,
          photo: hasImageAsset(member.photo) ? member.photo : null,
          fallbackPhoto: PLACEHOLDER_IMAGE,
        };
      })
    : about.team.map((member, index) => ({
        key: `${member.name}-${index}`,
        name: member.name || placeholderText.name,
        role: member.role || placeholderText.role,
        photo: null,
        fallbackPhoto: PLACEHOLDER_IMAGE,
      }));

  return (
    <main className="page-top overflow-hidden bg-paper text-black">
      <section className="page-shell">
        <div>
          <PageRichText
            as="h1"
            value={aboutContent?.title}
            fallback={about.title}
            className="type-display uppercase"
          />
          <PageRichText
            as="p"
            value={aboutContent?.intro}
            fallback={about.intro}
            className="type-heading-xl mt-8 w-full md:mt-9"
          />
        </div>
      </section>

      <section className="relative mt-20 h-[360px] overflow-hidden bg-[var(--color-bg-muted)] md:mt-[104px] md:h-[1018px]">
        <SanityImageOrPlaceholder
          image={aboutContent?.heroImage}
          fallbackSrc={PLACEHOLDER_IMAGE}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center blur-[8px] md:scale-[1.06]"
        />
      </section>

      <section className="section-y bg-yellow">
        <div className="page-shell">
          <PageRichText
            as="p"
            value={aboutContent?.statement}
            fallback={about.statement}
            className="type-body-xl w-full"
          />
        </div>
      </section>

      <TeamCoreSection
        title={
          <PageRichText
            as="span"
            value={aboutContent?.teamCoreTitle}
            fallback={about.teamCoreTitle}
          />
        }
        roles={coreRoles}
      />

      <ProcessSection
        title={
          <PageRichText
            as="span"
            value={aboutContent?.processTitle}
            fallback={about.processTitle}
          />
        }
        stages={processSteps.map((step) => step.stage)}
        descriptions={processSteps.map((step) => step.description)}
        colors={processSteps.map((step) => step.color)}
      />

      <section className="page-shell py-20 md:pb-[170px] md:pt-[96px]">
        <PageRichText
          as="h2"
          value={aboutContent?.missionTitle}
          fallback={about.missionTitle}
          className="type-display uppercase"
        />
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-start md:gap-[140px]">
          <PageRichText
            as="p"
            value={aboutContent?.mission}
            fallback={about.mission}
            className="type-body-xl"
          />
          <div className="relative aspect-[575/337] overflow-hidden">
            <SanityImageOrPlaceholder
              image={aboutContent?.missionImage}
              fallbackSrc={PLACEHOLDER_IMAGE}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <PageRichText
          as="p"
          value={aboutContent?.missionHighlight}
          fallback={about.missionHighlight}
          className="type-heading-xl mt-1 uppercase"
        />
      </section>

      <section className="page-shell pb-20 pt-8 md:pb-[168px] md:pt-[92px]">
        <div className="grid md:grid-cols-2 md:items-end md:gap-[80px]">
          <PageRichText
            as="h2"
            value={aboutContent?.historyTitle}
            fallback={about.historyTitle}
            className="type-heading-xl uppercase"
          />
          <div className="relative z-10 ml-auto aspect-[310/244] w-[220px] origin-top-left cursor-pointer overflow-hidden transition-transform duration-500 ease-out hover:scale-[1.1] md:w-[310px] md:self-start lg:w-[360px]">
            <SanityImageOrPlaceholder
              image={aboutContent?.historyImage}
              fallbackSrc={PLACEHOLDER_IMAGE}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {historyItems.map((item) => (
            <div
              key={item.key}
              className="group/history-item relative border-y border-black py-2 outline-none md:cursor-pointer"
              tabIndex={0}
            >
              <div className="flex min-h-[48px] items-center justify-between gap-4 md:min-h-[60px]">
                <p className="type-heading-xl font-bold">{item.label}</p>
                <p className="type-body-sm self-end pb-1 text-right text-black">
                  {item.year}
                </p>
              </div>
              <PageRichText
                as="p"
                value={item.description}
                fallback={item.fallbackDescription}
                className="type-body-sm text-measure-narrow mt-4 md:pointer-events-none md:absolute md:left-0 md:top-full md:z-20 md:mt-6 md:translate-y-2 md:opacity-0 md:transition-[opacity,transform] md:duration-300 md:ease-out md:group-hover/history-item:translate-y-0 md:group-hover/history-item:opacity-100 md:group-focus/history-item:translate-y-0 md:group-focus/history-item:opacity-100"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell pb-24 pt-10 md:pb-[190px] md:pt-[82px]">
        <PageRichText
          as="h2"
          value={aboutContent?.peopleTitle}
          fallback={about.peopleTitle}
          className="type-display uppercase"
        />
        <div className="mt-12 grid gap-x-[72px] gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <article key={member.key}>
              <div className="media-portrait relative overflow-hidden bg-gray-100">
                <SanityImageOrPlaceholder
                  image={member.photo}
                  alt={member.photo?.alt ?? `Portrait of ${member.name}`}
                  fallbackSrc={member.fallbackPhoto}
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
