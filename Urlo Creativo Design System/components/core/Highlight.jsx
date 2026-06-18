import React from "react";

/**
 * Highlight — the studio's signature marker-pen accent. Three modes:
 *  • "fill"      → yellow block behind the text (default)
 *  • "underline" → thick yellow bar under the baseline
 *  • "text"      → coloured highlight using a process accent
 * Inline; wrap a word or phrase inside running copy or a headline.
 */
export function Highlight({
  children,
  mode = "fill",          // "fill" | "underline" | "text"
  color = "var(--uc-yellow)",
  style = {},
  ...rest
}) {
  const base = { fontFamily: "inherit", fontWeight: "inherit", color: "inherit" };

  if (mode === "underline") {
    return (
      <span
        style={{
          ...base,
          backgroundImage: `linear-gradient(${color}, ${color})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "0 88%",
          backgroundSize: "100% 0.42em",
          ...style,
        }}
        {...rest}
      >
        {children}
      </span>
    );
  }

  // fill / text — a solid block of accent behind the word
  return (
    <span
      style={{
        ...base,
        background: color,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        padding: "0.02em 0.12em",
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
