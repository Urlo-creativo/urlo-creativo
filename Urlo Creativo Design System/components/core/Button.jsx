import React from "react";

/**
 * Urlo Creativo button — a fully-round pill. Default is the outline
 * (2px ink ring) that fills with ink on hover. The studio uses these
 * for "Contact", "Book a consultation", "Discover our services", etc.
 */
export function Button({
  children,
  variant = "outline",   // "outline" | "solid" | "ghost"
  size = "md",            // "sm" | "md" | "lg"
  as = "button",
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Tag = as;

  const sizes = {
    sm: { fontSize: 14, padding: "7px 18px" },
    md: { fontSize: 16, padding: "10px 26px" },
    lg: { fontSize: 18, padding: "13px 34px" },
  }[size];

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.02em",
    borderRadius: "var(--radius-pill)",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur) var(--ease-out), color var(--dur) var(--ease-out), opacity var(--dur)",
    ...sizes,
  };

  const variants = {
    outline: {
      background: hover ? "var(--uc-black)" : "transparent",
      color: hover ? "var(--uc-paper)" : "var(--uc-black)",
      boxShadow: "var(--ring-ink)",
    },
    solid: {
      background: "var(--uc-black)",
      color: "var(--uc-paper)",
      opacity: hover ? 0.88 : 1,
    },
    ghost: {
      background: hover ? "var(--uc-yellow)" : "transparent",
      color: "var(--uc-black)",
      boxShadow: "none",
    },
  }[variant];

  return (
    <Tag
      style={{ ...base, ...variants, ...style }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
