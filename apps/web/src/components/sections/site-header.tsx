import Image from "next/image";
import Link from "next/link";

import {
  localeLabels,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LocaleLink } from "@/components/ui/locale-link";
import { NavLink } from "@/components/ui/nav-link";
import { MobileMenu } from "@/components/sections/mobile-menu";

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

  const navLinks = navItems.map((item) => ({
    label: dictionary[item.key],
    href: localizedPath(locale, item.href),
  }));
  const localeLinks = otherLocales.map((l) => ({
    label: localeLabels[l].toUpperCase(),
    hrefLang: l,
  }));

  return (
    <header className="fixed left-0 right-0 top-[31px] z-[var(--z-header)]">
      {/* page-shell so the logo's left edge aligns with page content (e.g. the hero kicker) */}
      <div className="page-shell flex items-center justify-between gap-3 text-black">
        {/* Logo — standalone pill, aligned to content left */}
        <Link
          href={localizedPath(locale)}
          aria-label="Urlo Creativo home"
          className="relative z-[var(--z-header)] grid h-[50px] w-[50px] place-items-center rounded-full bg-[var(--color-nav-bg)] backdrop-blur-md transition-opacity hover:opacity-70"
        >
          <Image
            src="/brand/logo-mark.png"
            alt="Urlo Creativo"
            width={42}
            height={42}
            priority
          />
        </Link>

        {/* Pages + language in one pill */}
        <div className="hidden h-[50px] items-center rounded-pill bg-[var(--color-nav-bg)] px-3 backdrop-blur-md md:flex">
          <nav className="flex items-center" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink key={item.href} href={localizedPath(locale, item.href)}>
                {dictionary[item.key]}
              </NavLink>
            ))}
          </nav>

          <span
            aria-hidden
            className="mx-3 h-7 w-px bg-[var(--color-nav-divider)]"
          />

          {otherLocales.map((l) => (
            <LocaleLink
              key={l}
              hrefLang={l}
              className="type-nav flex h-[40px] w-[52px] items-center justify-center rounded-full transition-colors duration-150 hover:bg-black/[0.07] active:bg-black/[0.14]"
            >
              {localeLabels[l].toUpperCase()}
            </LocaleLink>
          ))}
        </div>

        {/* Mobile: hamburger + full-screen menu */}
        <MobileMenu navLinks={navLinks} localeLinks={localeLinks} />
      </div>
    </header>
  );
}
