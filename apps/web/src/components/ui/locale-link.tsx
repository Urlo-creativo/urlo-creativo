"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { switchLocalePath, type Locale } from "@/i18n/config";

type LocaleLinkProps = {
  children: React.ReactNode;
  className?: string;
  hrefLang: Locale;
  onClick?: () => void;
};

export function LocaleLink({
  children,
  className,
  hrefLang,
  onClick,
}: LocaleLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={switchLocalePath(pathname, hrefLang)}
      hrefLang={hrefLang}
      onClick={onClick}
      className={className}
    >
      {children}
    </Link>
  );
}
