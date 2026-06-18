import Image from "next/image";
import Link from "next/link";

import {
  localeLabels,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { NavLink } from "@/components/nav-link";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
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
  const otherLocales = locales.filter((l) => l !== locale);

  return (
    <header className="fixed left-0 right-0 top-[31px] z-50 px-[var(--page-gutter)]">
      <nav
        className="mx-auto grid h-[50px] w-full max-w-content grid-cols-[auto_1fr_auto] items-center rounded-pill bg-[rgba(235,235,235,0.75)] px-3 text-black backdrop-blur-md"
        aria-label="Main navigation"
      >
        {/* Logo — left */}
        <Link
          href={localizedPath(locale)}
          aria-label="Urlo Creativo home"
          className="shrink-0 transition-opacity hover:opacity-70"
        >
          <Image
            src="/brand/logo-mark.png"
            alt="Urlo Creativo"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* Nav links — center */}
        <div className="hidden items-center justify-center md:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={localizedPath(locale, item.href)}>
              {dictionary[item.key]}
            </NavLink>
          ))}
        </div>

        {/* Language switcher — right */}
        <div className="flex items-center justify-end">
          {otherLocales.map((l) => (
            <Link
              key={l}
              href={localizedPath(l)}
              hrefLang={l}
              className="flex h-[34px] w-[52px] items-center justify-center rounded-full text-[16px] leading-none transition-colors duration-150 hover:bg-black/[0.07] active:bg-black/[0.14]"
            >
              {localeLabels[l].toUpperCase()}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
