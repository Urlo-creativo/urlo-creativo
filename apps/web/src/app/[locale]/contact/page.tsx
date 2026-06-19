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
    <main className="min-h-screen bg-yellow pt-[154px] text-black md:pt-[204px]">
      <section className="page-shell pb-20 md:pb-[126px]">
        <h1 className="text-[clamp(56px,7vw,112px)] font-bold uppercase leading-none tracking-normal">
          {contact.title}
        </h1>

        <div className="mt-16 grid gap-16 border-t border-black pt-8 md:mt-[142px] md:grid-cols-2 md:gap-[96px] md:pt-10">
          <div>
            <p className="whitespace-pre-line text-[clamp(20px,2vw,30px)] leading-[1.18] tracking-normal">
              {contact.address}
            </p>

            <a
              href={contact.emailHref}
              className="pill-button mt-12 md:mt-16"
            >
              {contact.ctaLabel}
            </a>
          </div>

          <div className="flex flex-col gap-8 text-[clamp(24px,2.7vw,40px)] font-bold leading-none tracking-normal md:items-start md:justify-start">
            {contact.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-opacity hover:opacity-60"
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
