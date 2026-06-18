import Image from "next/image";
import Link from "next/link";

import {
  localeLabels,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

const navItems = [
  { key: "home", href: "/" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "contact", href: "/contact" },
] as const;

type SiteHeaderProps = {
  dictionary: Dictionary["nav"];
  locale: Locale;
  localeLabel: string;
};

export function SiteHeader({
  dictionary,
  locale,
  localeLabel,
}: SiteHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-[31px] z-50 px-4">
      <nav className="mx-auto flex h-[38px] w-full max-w-[857px] items-center gap-4 rounded-pill bg-[#ebebeb]/70 px-3 text-black backdrop-blur-md">
        <Link
          href={localizedPath(locale)}
          aria-label="Urlo Creativo home"
          className="hidden shrink-0"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={31}
            height={31}
            priority
          />
        </Link>
        <div className="hidden flex-1 items-center justify-between text-[16px] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={localizedPath(locale, item.href)}
              className="px-[10px] py-[9px] leading-none transition-opacity hover:opacity-70"
            >
              {dictionary[item.key]}
            </Link>
          ))}
        </div>
        <div
          className="ml-auto flex items-center gap-2 text-[14px] tracking-[0.04em] md:text-[15px]"
          aria-label="Language"
        >
          <span className="font-bold">{localeLabel}</span>
          <span className="text-black/35">/</span>
          {locales
            .filter((item) => item !== locale)
            .map((item) => (
              <Link
                key={item}
                href={localizedPath(item)}
                className="text-black/60 transition-colors hover:text-black"
                hrefLang={item}
              >
                {localeLabels[item]}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
}
