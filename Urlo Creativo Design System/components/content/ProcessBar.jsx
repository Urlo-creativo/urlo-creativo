import React from "react";

const DEFAULT_STAGES = [
  { label: "DISCOVERY", color: "var(--stage-discovery)" },
  { label: "STRATEGY", color: "var(--stage-strategy)" },
  { label: "IDENTITY", color: "var(--stage-identity)" },
  { label: "DEVELOPMENT", color: "var(--stage-development)" },
  { label: "PRODUCTION", color: "var(--stage-production)" },
  { label: "GROWTH", color: "var(--stage-growth)" },
];

/**
 * ProcessBar — the studio's "HOW WE WORK" stage bar: a row of caps
 * labels above a continuous band of process-accent colour blocks.
 */
export function ProcessBar({ stages = DEFAULT_STAGES, style = {}, ...rest }) {
  return (
    <div style={{ width: "100%", ...style }} {...rest}>
      <div style={{ display: "flex", borderTop: "1px solid var(--uc-black)", paddingTop: 10 }}>
        {stages.map((s) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              font: "var(--type-body-bold)",
              fontSize: 13,
              letterSpacing: "0.04em",
              color: "var(--uc-black)",
            }}
          >
            {s.label}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", height: 16, marginTop: 8 }}>
        {stages.map((s) => (
          <div key={s.label} style={{ flex: 1, background: s.color }} />
        ))}
      </div>
    </div>
  );
}
