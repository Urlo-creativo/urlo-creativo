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
      <div className="mx-auto grid w-full max-w-content grid-cols-[auto_1fr_auto] items-center gap-3 text-black">
        {/* Logo — its own pill, left */}
        <Link
          href={localizedPath(locale)}
          aria-label="Urlo Creativo home"
          className="grid h-[50px] w-[50px] place-items-center justify-self-start rounded-full bg-[var(--color-nav-bg)] backdrop-blur-md transition-opacity hover:opacity-70"
        >
          <Image
            src="/brand/logo-mark.png"
            alt="Urlo Creativo"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* Nav links — its own pill, centered */}
        <nav
          className="hidden h-[50px] items-center justify-self-center rounded-pill bg-[var(--color-nav-bg)] px-3 backdrop-blur-md md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink key={item.href} href={localizedPath(locale, item.href)}>
              {dictionary[item.key]}
            </NavLink>
          ))}
        </nav>

        {/* Language switcher — its own pill, right */}
        <div className="flex h-[50px] items-center justify-self-end rounded-full bg-[var(--color-nav-bg)] px-1 backdrop-blur-md">
          {otherLocales.map((l) => (
            <Link
              key={l}
              href={localizedPath(l)}
              hrefLang={l}
              className="type-nav flex h-[40px] w-[52px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/[0.07] active:bg-black/[0.14]"
            >
              {localeLabels[l].toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
