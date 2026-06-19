"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type HighlightTextProps = {
  children: ReactNode;
  className?: string;
  color?: "pink" | "yellow";
  trigger?: "controlled" | "load" | "scroll" | "static";
};

export type RichTextToken = {
  bold?: boolean;
  highlight?: HighlightTextProps["color"];
  italic?: boolean;
  text: string;
  trigger?: HighlightTextProps["trigger"];
};

type StructuredRichTextProps = {
  lines: RichTextToken[][];
  className?: string;
  as?: "p" | "h1" | "h2" | "h3" | "span";
};

const colorClassNames = {
  pink: "highlight-text-pink",
  yellow: "highlight-text-yellow",
} as const;

const triggerClassNames = {
  controlled: "highlight-text-controlled",
  load: "highlight-text-load",
  scroll: "highlight-text-scroll",
  static: "highlight-text-static",
} as const;

export function HighlightText({
  children,
  className = "",
  color = "yellow",
  trigger = "controlled",
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasRevealed, setHasRevealed] = useState(trigger === "static");

  useEffect(() => {
    if (trigger !== "scroll") return;

    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      el.style.setProperty("--highlight-progress", "1");
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

      el.style.setProperty("--highlight-progress", progress.toFixed(3));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [trigger]);

  useEffect(() => {
    if (trigger !== "load") return;

    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

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

function tokenClassName(token: RichTextToken) {
  return [token.bold ? "font-bold" : "", token.italic ? "italic" : ""]
    .filter(Boolean)
    .join(" ");
}

function renderToken(
  token: RichTextToken,
  index: number,
) {
  const className = tokenClassName(token);

  if (token.highlight) {
    return (
      <HighlightText
        key={`${token.text}-${index}`}
        color={token.highlight}
        trigger={token.trigger ?? "controlled"}
        className={className}
      >
        {token.text}
      </HighlightText>
    );
  }

  return (
    <span key={`${token.text}-${index}`} className={className}>
      {token.text}
    </span>
  );
}

export function StructuredRichText({
  lines,
  className,
  as: Tag = "span",
}: StructuredRichTextProps) {
  return (
    <Tag className={className}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex}>
          {line.map((token, index) => renderToken(token, index))}
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      ))}
    </Tag>
  );
}
