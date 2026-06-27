"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  // Match locale-prefixed paths: /en/projects → strip locale prefix to compare
  const isActive = pathname === href || pathname.replace(/^\/[a-z]{2}/, "") === href;

  return (
    <Link
      href={href}
      className={[
        "site-nav-link focus-ring type-nav",
        isActive
          ? "site-nav-link-active"
          : "text-black",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
