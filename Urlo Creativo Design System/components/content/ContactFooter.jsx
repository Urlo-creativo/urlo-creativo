import React from "react";
import { Button } from "../core/Button.jsx";

/**
 * ContactFooter — the full-bleed yellow contact panel that closes
 * every page: giant CONTACT title, address + contacts column, social
 * links column, and a "Book a consultation" pill.
 */
export function ContactFooter({
  address = ["Via Barona 25", "20142 — Milano"],
  phone = "+39 3703028027",
  email = "contact@urlocreativo.com",
  socials = ["LinkedIn", "Instagram"],
  cta = "Book a consultation",
  onCta,
  style = {},
  ...rest
}) {
  return (
    <footer
      style={{
        background: "var(--uc-yellow)",
        color: "var(--uc-black)",
        padding: "96px var(--page-gutter)",
        ...style,
      }}
      {...rest}
    >
      <h2 style={{ margin: 0, font: "var(--type-display)", textTransform: "uppercase", letterSpacing: "0.01em" }}>
        Contact
      </h2>
      <div style={{ display: "flex", gap: 96, marginTop: 40, flexWrap: "wrap" }}>
        <div style={{ font: "var(--type-body)", lineHeight: 1.5 }}>
          {address.map((l) => <div key={l}>{l}</div>)}
          <div style={{ marginTop: 16 }}>{phone}</div>
          <div>{email}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {socials.map((s) => (
            <a key={s} href="#" style={{ font: "var(--type-body-bold)", color: "var(--uc-black)", textDecoration: "none" }}>
              {s}
            </a>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 40 }}>
        <Button variant="outline" onClick={onCta}>{cta}</Button>
      </div>
    </footer>
  );
}
