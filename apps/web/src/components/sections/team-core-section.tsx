"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { AnimatedBar } from "@/components/ui/animated-bar";
import { SanityImageOrPlaceholder } from "@/components/ui/sanity-image";
import type { SanityImage as SanityImageType } from "@/lib/sanity/queries";

// Each image has its own position + size for a scattered editorial layout
const imageStyles = [
  { top: "2%",   left: "0%",  width: "80%", aspect: "4/3"   },
  { top: "22%",  left: "14%", width: "72%", aspect: "3/4"   },
  { top: "-6%",  left: "5%",  width: "86%", aspect: "16/10" },
  { top: "32%",  left: "10%", width: "76%", aspect: "5/4"   },
  { top: "10%",  left: "2%",  width: "82%", aspect: "4/3"   },
] as const;

export type TeamCoreRole = {
  role: string;
  image?: SanityImageType | null;
  fallbackImage?: string;
  alt?: string;
};

type TeamCoreSectionProps = {
  title: ReactNode;
  roles: readonly TeamCoreRole[];
};

export function TeamCoreSection({ title, roles }: TeamCoreSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="page-shell py-20 md:pb-[148px] md:pt-[172px]">
      <h2 className="type-display uppercase">
        {title}
      </h2>

      <div className="relative mt-9 flex">
        <AnimatedBar className="w-[18px] shrink-0 bg-[var(--color-rail-blue)]" />

        {/* Roles list */}
        <div className="flex flex-col md:w-1/2">
          {roles.map((item, i) => (
            <div
              key={`${item.role}-${i}`}
              className="role-item py-5 pl-10"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="type-heading-md inline-block w-fit border-y border-black py-2 uppercase text-black">
                {item.role}
              </span>
            </div>
          ))}
        </div>

        {/* Image reveal area */}
        <div className="pointer-events-none relative hidden flex-1 md:block">
          {roles.map((item, i) => {
            const s = imageStyles[i % imageStyles.length]!;
            return (
              <div
                key={`${item.role}-image-${i}`}
                className="absolute transition-[opacity,transform] duration-300 ease-out"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.width,
                  aspectRatio: s.aspect,
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <SanityImageOrPlaceholder
                  image={item.image}
                  alt={item.alt}
                  fallbackSrc={item.fallbackImage}
                  fallbackAlt={item.alt ?? ""}
                  fill
                  sizes="35vw"
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
