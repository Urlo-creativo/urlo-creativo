import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const metadata: Metadata = {
  title: "Contact",
};

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
            <p className="type-body-lg whitespace-pre-line">
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
