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
        "type-nav flex h-[34px] w-[104px] items-center justify-center rounded-full transition-colors duration-150",
        isActive
          ? "bg-black text-white"
          : "text-black hover:bg-black/[0.12] active:bg-black/[0.20]",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}
