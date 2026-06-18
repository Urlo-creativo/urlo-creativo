import React from "react";

/**
 * ServiceRow — a numbered service entry separated by hairline rules,
 * as on the Services page ("01 BRAND IDENTITY & COMMUNICATION").
 * Expandable: pass children to reveal sub-items on click.
 */
export function ServiceRow({
  number,
  title,
  children,
  defaultOpen = false,
  style = {},
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const interactive = !!children;

  return (
    <div style={{ borderTop: "1px solid var(--uc-black)", ...style }} {...rest}>
      <button
        onClick={() => interactive && setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "baseline",
          gap: 18,
          background: "none",
          border: "none",
          padding: "28px 0",
          cursor: interactive ? "pointer" : "default",
          textAlign: "left",
        }}
      >
        {number != null && (
          <span style={{ font: "var(--type-h4)", fontWeight: 700, color: "var(--uc-black)", letterSpacing: "0.02em" }}>
            {String(number).padStart(2, "0")}
          </span>
        )}
        <span style={{ font: "var(--type-h4)", fontWeight: 700, fontSize: 30, color: "var(--uc-black)", textTransform: "uppercase", letterSpacing: "0.01em", flex: 1 }}>
          {title}
        </span>
        {interactive && (
          <span style={{ font: "var(--type-h4)", color: "var(--uc-black)", transform: open ? "rotate(45deg)" : "none", transition: "transform var(--dur)" }}>+</span>
        )}
      </button>
      {interactive && open && (
        <div style={{ paddingBottom: 32, display: "flex", flexDirection: "column", gap: 28 }}>
          {children}
        </div>
      )}
    </div>
  );
}

/** A sub-item within a ServiceRow (e.g. BRAND STRATEGY / VISUAL IDENTITY). */
export function ServiceItem({ label, style = {}, ...rest }) {
  return (
    <div
      style={{
        font: "var(--type-body-bold)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color: "var(--uc-black)",
        ...style,
      }}
      {...rest}
    >
      {label}
    </div>
  );
}
