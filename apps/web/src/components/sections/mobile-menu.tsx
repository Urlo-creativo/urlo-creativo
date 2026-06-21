"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LocaleLink } from "@/components/ui/locale-link";
import type { Locale } from "@/i18n/config";

type LinkItem = { label: string; href: string };
type LocaleItem = { label: string; hrefLang: Locale };

type MobileMenuProps = {
  navLinks: LinkItem[];
  localeLinks: LocaleItem[];
};

export function MobileMenu({ navLinks, localeLinks }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll and allow Escape to close while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-[var(--z-header)] grid h-[50px] w-[50px] place-items-center rounded-full bg-[var(--color-nav-bg)] backdrop-blur-md"
      >
        <span className="relative block h-3.5 w-6" aria-hidden>
          <span
            className={`absolute left-0 h-0.5 w-6 bg-black transition-transform duration-300 ${
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 bg-black transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 h-0.5 w-6 bg-black transition-transform duration-300 ${
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[var(--z-overlay)] bg-paper text-black">
          <nav
            className="page-shell page-top flex h-full flex-col gap-1 pb-16"
            aria-label="Mobile navigation"
          >
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`type-heading-xl font-bold uppercase transition-opacity ${
                    active ? "opacity-100" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="mt-auto flex items-center gap-5">
              {localeLinks.map((l) => (
                <LocaleLink
                  key={l.hrefLang}
                  hrefLang={l.hrefLang}
                  onClick={() => setOpen(false)}
                  className="type-nav uppercase opacity-60 transition-opacity hover:opacity-100"
                >
                  {l.label}
                </LocaleLink>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
