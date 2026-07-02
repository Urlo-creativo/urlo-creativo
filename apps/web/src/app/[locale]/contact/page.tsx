import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";
import { localizedAlternates } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return { title: "Contact" };
  return {
    title: getDictionary(locale).nav.contact,
    alternates: localizedAlternates(locale, "/contact"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const { contact } = getDictionary(locale);

  return (
    <main className="page-top min-h-screen bg-yellow text-black">
      <section className="page-shell pb-20 md:pb-[126px]">
        <h1 className="type-display font-bold uppercase">
          {contact.title}
        </h1>

        <div className="grid-gap-lg mt-16 grid border-t border-black pt-8 md:mt-[142px] md:grid-cols-2 md:pt-10">
          <div>
            <p className="type-body-lg whitespace-pre-line break-words">
              {contact.address}
            </p>

            <a
              href={contact.emailHref}
              className="pill-button mt-12 md:mt-16"
            >
              {contact.ctaLabel}
            </a>
          </div>

          <div className="type-heading-xl flex flex-col gap-8 font-bold md:items-start md:justify-start">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="subtle-link focus-ring flex min-h-11 w-fit items-center"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
