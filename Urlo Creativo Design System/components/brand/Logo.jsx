import React from "react";

/**
 * Urlo Creativo logo. Renders the O-pictogram, the wordmark, or both
 * (the lockup). Image-based — uses the real brand PNGs from assets/.
 */
export function Logo({
  variant = "lockup",      // "lockup" | "wordmark" | "mark"
  height = 52,
  color,                    // optional ink tint via CSS filter for the mark
  basePath = "",           // prefix to assets/ (e.g. "../../")
  style = {},
  ...rest
}) {
  const mark = `${basePath}assets/logo-mark.png`;
  const wordmark = `${basePath}assets/logo-wordmark.png`;

  const imgBase = { display: "block", height, width: "auto" };

  if (variant === "mark") {
    return (
      <img src={mark} alt="Urlo Creativo" style={{ ...imgBase, ...style }} {...rest} />
    );
  }
  if (variant === "wordmark") {
    return (
      <img src={wordmark} alt="Urlo Creativo" style={{ ...imgBase, ...style }} {...rest} />
    );
  }
  // lockup — the wordmark PNG already contains mark + type
  return (
    <img src={wordmark} alt="Urlo Creativo" style={{ ...imgBase, ...style }} {...rest} />
  );
}
