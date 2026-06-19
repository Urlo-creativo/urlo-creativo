import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Projects",
};

const filterStyles = [
  "border-black bg-transparent",
  "border-black bg-[var(--uc-pink)]",
  "border-black bg-yellow",
  "border-black bg-[var(--uc-blue)]",
] as const;

export default async function ProjectsPage({
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
  const { projects, footer } = dictionary;

  return (
    <main className="bg-paper pt-[154px] text-black md:pt-[204px]">
      <section className="page-shell">
        <h1 className="text-[clamp(64px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
          {projects.title}
        </h1>

        <div
          className="mt-12 flex flex-wrap gap-3 md:mt-[70px]"
          aria-label="Project categories"
        >
          {projects.filters.map((filter, index) => (
            <span
              key={filter}
              className={[
                "inline-flex min-h-8 items-center justify-center rounded-pill border px-5 py-1 text-center text-[13px] leading-tight tracking-normal md:min-w-[144px] md:px-8 md:text-[16px]",
                index > 0 ? "md:min-w-[348px]" : "",
                filterStyles[index],
              ].join(" ")}
            >
              {filter}
            </span>
          ))}
        </div>
      </section>

      <section className="page-shell pb-20 pt-20 md:pb-[74px] md:pt-[102px]">
        <div className="border-t border-black">
          {projects.items.map((project) => (
            <article
              key={project.title}
              className="grid gap-4 border-b border-black py-8 md:grid-cols-[104px_minmax(0,1fr)] md:gap-16 md:py-10"
            >
              <p className="text-[16px] italic leading-normal tracking-normal text-gray-600 md:pt-4">
                {project.year}
              </p>
              <div>
                <h2 className="max-w-[980px] text-[clamp(30px,3vw,36px)] font-bold leading-[1.08] tracking-normal">
                  {project.title}
                </h2>
                <p className="mt-4 max-w-[1080px] text-[16px] leading-normal tracking-normal">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
