"use client";

import Image from "next/image";
import { useState } from "react";

import { AnimatedBar } from "@/components/animated-bar";

// Each image has its own position + size for a scattered editorial layout
const imageStyles = [
  { top: "2%",   left: "0%",  width: "80%", aspect: "4/3"   },
  { top: "22%",  left: "14%", width: "72%", aspect: "3/4"   },
  { top: "-6%",  left: "5%",  width: "86%", aspect: "16/10" },
  { top: "32%",  left: "10%", width: "76%", aspect: "5/4"   },
  { top: "10%",  left: "2%",  width: "82%", aspect: "4/3"   },
] as const;

const coreImages = [
  "/about/Team core1.png",
  "/about/Team core2.png",
  "/about/Team core3.png",
  "/about/Team core4.png",
  "/about/Team core5.png",
];

type TeamCoreSectionProps = {
  title: string;
  roles: readonly string[];
};

export function TeamCoreSection({ title, roles }: TeamCoreSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="page-shell py-20 md:pb-[148px] md:pt-[172px]">
      <h2 className="text-[clamp(48px,6.7vw,96px)] font-bold uppercase leading-none tracking-normal">
        {title}
      </h2>

      <div className="relative mt-9 flex">
        <AnimatedBar className="w-[18px] shrink-0 bg-[var(--uc-blue-deep)]" />

        {/* Roles list */}
        <div className="flex flex-col md:w-1/2">
          {roles.map((role, i) => (
            <div
              key={role}
              className="role-item py-5 pl-10"
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <span className="inline-block w-fit border-y border-black py-2 text-[clamp(20px,2vw,32px)] uppercase leading-none tracking-normal text-black">
                {role}
              </span>
            </div>
          ))}
        </div>

        {/* Image reveal area */}
        <div className="pointer-events-none relative hidden flex-1 md:block">
          {coreImages.map((src, i) => {
            const s = imageStyles[i]!;
            return (
              <div
                key={src}
                className="absolute transition-all duration-300 ease-out"
                style={{
                  top: s.top,
                  left: s.left,
                  width: s.width,
                  aspectRatio: s.aspect,
                  opacity: activeIndex === i ? 1 : 0,
                  transform: activeIndex === i ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <Image
                  src={src}
                  alt=""
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
