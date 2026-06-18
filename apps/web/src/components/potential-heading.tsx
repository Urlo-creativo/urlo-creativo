"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useRef } from "react";

type MethodStep = {
  items: string[];
  title: string;
};

type PotentialSectionProps = {
  heading: string;
  ctaHref: string;
  ctaLabel: string;
  steps: MethodStep[];
};

function parseMarkers(text: string) {
  if (text.startsWith("***") && text.endsWith("***"))
    return { clean: text.slice(3, -3), bold: true, italic: true };
  if (text.startsWith("**") && text.endsWith("**"))
    return { clean: text.slice(2, -2), bold: true, italic: false };
  if (text.startsWith("*") && text.endsWith("*"))
    return { clean: text.slice(1, -1), bold: false, italic: true };
  return { clean: text, bold: false, italic: false };
}

export function PotentialSection({
  heading,
  ctaHref,
  ctaLabel,
  steps,
}: PotentialSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  // heading = "**EVERY BRAND**\n**HAS A** ***POTENTIAL***"
  const [rawLine1 = "", rawLine2 = ""] = heading.split("\n");

  // Line 1: first word gets the pink scroll-highlight
  const l1 = parseMarkers(rawLine1.trim());
  const [firstWord, ...restWords] = l1.clean.split(" ");
  const restLine1 = restWords.join(" ");

  // Line 2: split into tokens, treat the last marked token as the accent (yellow highlight)
  const line2Parts = rawLine2
    .split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*|\*.*?\*)/g)
    .filter(Boolean);
  let accentIdx = -1;
  for (let i = line2Parts.length - 1; i >= 0; i--) {
    if (/^\*+.+\*+$/.test(line2Parts[i]!)) { accentIdx = i; break; }
  }
  const accentRaw = accentIdx >= 0 ? line2Parts[accentIdx]! : "";
  const ac = parseMarkers(accentRaw);
  const prefixRaw = line2Parts.slice(0, accentIdx >= 0 ? accentIdx : undefined).join("").trim();
  const l2 = parseMarkers(prefixRaw);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      section.style.setProperty("--highlight-progress", "1");
      return;
    }

    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const highlightStart = viewportHeight * 0.9;
      const highlightEnd = viewportHeight * 0.33;
      const rail = railRef.current;
      const railRect = rail?.getBoundingClientRect();
      const railStart = viewportHeight;
      const railEnd = viewportHeight * 0.5;

      section.style.setProperty(
        "--highlight-progress",
        Math.min(
          Math.max(
            (highlightStart - rect.top) / (highlightStart - highlightEnd),
            0,
          ),
          1,
        ).toFixed(3),
      );
      section.style.setProperty(
        "--rail-progress",
        Math.min(
          Math.max(
            (railStart - (railRect?.top ?? rect.top)) / (railStart - railEnd),
            0,
          ),
          1,
        ).toFixed(3),
      );
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ "--highlight-progress": 0, "--rail-progress": 0 } as CSSProperties}
    >
      <h2 className="text-[clamp(56px,6.7vw,96px)] uppercase leading-none tracking-normal">
        <span className={l1.bold ? "font-bold" : ""}>
          <span className="scroll-highlight scroll-highlight-pink">{firstWord}</span>
          {restLine1 ? ` ${restLine1}` : null}
        </span>
        <br />
        <span className={l2.bold ? "font-bold" : ""}>{l2.clean}</span>
        {" "}
        <span
          className={[
            "scroll-highlight scroll-highlight-yellow",
            ac.bold ? "font-bold" : "",
            ac.italic ? "italic" : "",
          ].join(" ")}
        >
          {ac.clean}
        </span>
      </h2>

      <div className="method-block mt-20">
        <div ref={railRef} className="method-rail grid gap-8 md:grid-cols-3 md:gap-20">
          {steps.map((step) => (
            <h3
              key={step.title}
              className="relative z-10 text-[clamp(24px,2.5vw,36px)] font-bold leading-none"
            >
              {step.title}
            </h3>
          ))}
        </div>

        <div className="mt-6 grid gap-12 md:grid-cols-3 md:gap-20">
          {steps.map((step) => (
            <div key={step.title}>
              <ul className="space-y-5 text-[clamp(18px,1.7vw,24px)] leading-none">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Link href={ctaHref} className="pill-button mt-16">
        {ctaLabel}
      </Link>
    </div>
  );
}
