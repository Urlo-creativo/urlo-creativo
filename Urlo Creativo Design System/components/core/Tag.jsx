import React from "react";

/**
 * Tag — a small outline pill used for meta labels and filters. Same
 * round language as Button but quieter. Optional yellow "fill".
 */
export function Tag({
  children,
  variant = "outline",   // "outline" | "fill" | "muted"
  style = {},
  ...rest
}) {
  const variants = {
    outline: { background: "transparent", color: "var(--uc-black)", boxShadow: "var(--ring-ink-1)" },
    fill: { background: "var(--uc-yellow)", color: "var(--uc-black)", boxShadow: "none" },
    muted: { background: "transparent", color: "var(--uc-gray-500)", boxShadow: "inset 0 0 0 1px var(--uc-gray-200)" },
  }[variant];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--font-sans)",
        fontWeight: 400,
        fontSize: 13,
        letterSpacing: "0.04em",
        lineHeight: 1,
        padding: "6px 13px",
        borderRadius: "var(--radius-pill)",
        whiteSpace: "nowrap",
        ...variants,
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
