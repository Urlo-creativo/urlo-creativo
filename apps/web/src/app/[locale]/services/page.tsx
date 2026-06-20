import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Services",
};

const serviceImages = [
  "/services/brand-identity.jpg",
  "/services/design.jpg",
  "/services/styling.jpg",
] as const;

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const { services, footer } = getDictionary(locale);

  return (
    <main className="page-top bg-paper text-black">
      <section className="page-shell">
        <h1 className="type-display font-bold uppercase">{services.title}</h1>
      </section>

      <section className="page-shell pb-16 pt-12 md:pb-[96px] md:pt-[64px]">
        <div className="border-t border-black">
          {services.items.map((item, index) => (
            <article
              key={item.number}
              className="grid items-center gap-6 border-b border-black py-10 md:grid-cols-[1fr_minmax(0,471px)] md:gap-16 md:py-14"
            >
              <h2 className="type-heading-xl font-bold uppercase">
                {item.number} {item.title}
              </h2>
              <div className="relative aspect-[471/248] w-full overflow-hidden">
                <Image
                  src={serviceImages[index]}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 471px, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell pb-20 md:pb-[140px]">
        <h2 className="type-body-lg w-fit font-bold uppercase">
          <span className="relative isolate inline-block">
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-[0.05em] -z-[1] h-[0.5em] bg-[var(--uc-coral)]"
            />
            {services.collaborationTitle}
          </span>
        </h2>
        <p className="type-body-lg mt-6 max-w-[1036px] font-bold">
          {services.collaboration}
        </p>
        <p className="type-body-md mt-10 italic text-[var(--color-text-muted)]">
          {services.season}
        </p>
      </section>

      <SiteFooter footer={footer} />
    </main>
  );
}
