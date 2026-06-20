"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

type AnimatedBarProps = {
  className?: string;
};

export function AnimatedBar({ className }: AnimatedBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: revealed ? "scaleY(1)" : "scaleY(0)",
        transformOrigin: "top",
        transition: "transform var(--dur-reveal) var(--ease-reveal)",
        willChange: "transform",
      } as CSSProperties}
    />
  );
}
