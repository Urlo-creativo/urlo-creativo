import React from "react";
import { Logo } from "../brand/Logo.jsx";

/**
 * NavBar — the floating, fully-round pill navigation that sits at the
 * top of every page. Logo mark on the left, centred links, optional
 * language toggle on the right.
 */
export function NavBar({
  items = ["Home", "Projects", "About Us", "Services", "Contact"],
  active = "Home",
  lang = "IT",
  onNavigate,
  basePath = "",
  style = {},
  ...rest
}) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        height: 64,
        padding: "0 28px",
        background: "rgba(250,250,250,0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        borderRadius: "var(--radius-pill)",
        boxShadow: "inset 0 0 0 1px var(--uc-gray-100)",
        ...style,
      }}
      {...rest}
    >
      <Logo variant="mark" height={30} basePath={basePath} />
      <div style={{ display: "flex", alignItems: "center", gap: 40, margin: "0 auto" }}>
        {items.map((label) => {
          const isActive = label === active;
          return (
            <a
              key={label}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(label); }}
              style={{
                font: "var(--type-body)",
                color: isActive ? "var(--uc-black)" : "var(--uc-gray-600)",
                fontWeight: isActive ? 700 : 400,
                textDecoration: "none",
                letterSpacing: "0.02em",
                paddingBottom: 2,
                borderBottom: isActive ? "1.5px solid var(--uc-black)" : "1.5px solid transparent",
                transition: "color var(--dur)",
              }}
            >
              {label}
            </a>
          );
        })}
      </div>
      {lang && (
        <span style={{ font: "var(--type-body)", color: "var(--uc-black)", letterSpacing: "0.04em" }}>
          {lang}
        </span>
      )}
    </nav>
  );
}
