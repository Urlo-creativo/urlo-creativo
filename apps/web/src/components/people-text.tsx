"use client";

import { type CSSProperties, useEffect, useRef } from "react";

type PeopleTextProps = {
  text: string;
};

export function PeopleText({ text }: PeopleTextProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sentenceRef = useRef<HTMLSpanElement>(null);
  const stripRef = useRef<HTMLSpanElement>(null);

  const dotIndex = text.indexOf(". ");
  const firstSentence = dotIndex >= 0 ? text.slice(0, dotIndex + 1) : text;
  const rest = dotIndex >= 0 ? text.slice(dotIndex + 1) : "";

  useEffect(() => {
    const el = wrapperRef.current;
    const sentence = sentenceRef.current;
    const strip = stripRef.current;
    if (!el || !sentence || !strip) return;

    // getClientRects()[0] gives the exact width of the first rendered line box
    const updateStripWidth = () => {
      const rects = sentence.getClientRects();
      if (rects.length > 0) {
        strip.style.width = `${rects[0]!.width}px`;
      }
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      el.style.setProperty("--strip-progress", "1");
      updateStripWidth();
      return;
    }

    let frame = 0;

    const update = () => {
      frame = 0;
      updateStripWidth();
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        Math.max((vh * 0.9 - rect.top) / (vh * 0.9 - vh * 0.33), 0),
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
    <div ref={wrapperRef} style={{ "--strip-progress": "0" } as CSSProperties}>
      <p className="text-[clamp(20px,2.2vw,32px)] leading-[1.4]">
        <span className="relative">
          {/* Strip width is set in JS via getClientRects()[0] */}
          <span
            ref={stripRef}
            aria-hidden
            className="absolute bottom-[0.1em] left-0 h-[0.5em] origin-left bg-yellow"
            style={{
              transform: "scaleX(var(--strip-progress, 0))",
              willChange: "transform",
            }}
          />
          <span ref={sentenceRef} className="relative">
            {firstSentence}
          </span>
        </span>
        {rest}
      </p>
    </div>
  );
}
