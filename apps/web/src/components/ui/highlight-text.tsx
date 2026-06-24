"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

// Module-level shared scroll/resize listener — one listener no matter how many instances
const subscribers = new Set<() => void>();
let raf = 0;

function flush() {
  raf = 0;
  subscribers.forEach((fn) => fn());
}

function onScroll() {
  if (raf) return;
  raf = requestAnimationFrame(flush);
}

function subscribe(fn: () => void): () => void {
  if (subscribers.size === 0) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }
  subscribers.add(fn);
  fn();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    }
  };
}

export type HighlightTextProps = {
  children: ReactNode;
  className?: string;
  color?: "blue" | "coral" | "orange" | "pink" | "yellow";
  trigger?: "load" | "scroll" | "static";
};

const colorClassNames = {
  blue: "highlight-text-blue",
  coral: "highlight-text-coral",
  orange: "highlight-text-orange",
  pink: "highlight-text-pink",
  yellow: "highlight-text-yellow",
} as const;

const triggerClassNames = {
  load: "highlight-text-load",
  scroll: "highlight-text-scroll",
  static: "highlight-text-static",
} as const;

export function HighlightText({
  children,
  className = "",
  color = "yellow",
  trigger = "scroll",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasRevealed, setHasRevealed] = useState(trigger === "static");

  useEffect(() => {
    if (trigger !== "scroll") return;
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.style.setProperty("--highlight-progress", "1");
      return;
    }

    return subscribe(() => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        Math.max((vh * 0.9 - rect.top) / (vh * 0.9 - vh * 0.33), 0),
        1,
      );
      el.style.setProperty("--highlight-progress", progress.toFixed(3));
    });
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "load") return;
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setHasRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setHasRevealed(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  return (
    <span
      ref={ref}
      className={[
        "highlight-text",
        colorClassNames[color],
        triggerClassNames[trigger],
        hasRevealed ? "highlight-text-revealed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        trigger === "static"
          ? ({ "--highlight-progress": "1" } as CSSProperties)
          : undefined
      }
    >
      {children}
    </span>
  );
}
