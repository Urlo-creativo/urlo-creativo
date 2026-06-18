import React from "react";

/**
 * ProjectCard — a portfolio item: a sharp-cornered (no radius, no
 * shadow) image with a bold caption and a muted year beneath. Images
 * are typically black-and-white. Hover lifts the image slightly via
 * a subtle desaturate→full transition.
 */
export function ProjectCard({
  image,
  title,
  year,
  bw = true,               // render image black-and-white until hover
  href,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const Wrap = href ? "a" : "div";

  return (
    <Wrap
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        textDecoration: "none",
        color: "inherit",
        cursor: href ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      <div style={{ width: "100%", aspectRatio: "357 / 440", overflow: "hidden", background: "var(--uc-gray-100)" }}>
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: bw && !hover ? "grayscale(1)" : "grayscale(0)",
            transform: hover ? "scale(1.03)" : "scale(1)",
            transition: "filter var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)",
          }}
        />
      </div>
      <div style={{ font: "var(--type-body-bold)", letterSpacing: "0.02em", marginTop: 16, textTransform: "uppercase", color: "var(--uc-black)" }}>
        {title}
      </div>
      {year != null && (
        <div style={{ font: "var(--type-body)", color: "var(--uc-gray-300)", marginTop: 4 }}>{year}</div>
      )}
    </Wrap>
  );
}
