"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type MethodologyLabelProps = {
  label: string;
};

export function MethodologyLabel({ label }: MethodologyLabelProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      el.style.setProperty("--strip-progress", "1");
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.9;
      const end = vh * 0.33;
      const progress = Math.min(
        Math.max((start - rect.top) / (start - end), 0),
        1,
      );
      el.style.setProperty("--strip-progress", progress.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-fit"
      style={{ "--strip-progress": "0" } as CSSProperties}
    >
      <span className="relative z-10 block text-[clamp(24px,2.5vw,36px)]">
        {label}
      </span>
      {/* Yellow strip — grows from left as the section scrolls up */}
      <div
        className="absolute bottom-[8%] left-[-3px] h-[40%] bg-yellow"
        style={{
          width: "calc(100% + 14px)",
          transform: "scaleX(var(--strip-progress, 0))",
          transformOrigin: "left center",
          willChange: "transform",
        }}
      />
    </div>
  );
}
