import React from "react";
import { Highlight } from "./Highlight.jsx";

/**
 * SectionTitle — the big bold caps statement the studio opens every
 * section with (PROJECTS, SELECTED CLIENTS, CONTACT, "EVERY BRAND
 * HAS A POTENTIAL"). Supports an italic accent word and an optional
 * yellow underline on a chosen word.
 */
export function SectionTitle({
  children,
  accent,                  // optional italic accent word appended
  underline = false,       // yellow underline on the accent word
  size = 96,
  color = "var(--uc-ink)",
  as = "h2",
  style = {},
  ...rest
}) {
  const Tag = as;
  return (
    <Tag
      style={{
        margin: 0,
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "0.01em",
        color,
        textTransform: "uppercase",
        ...style,
      }}
      {...rest}
    >
      {children}
      {accent != null && (
        <>
          {" "}
          <span style={{ fontStyle: "italic", fontWeight: 700 }}>
            {underline ? <Highlight mode="underline">{accent}</Highlight> : accent}
          </span>
        </>
      )}
    </Tag>
  );
}
