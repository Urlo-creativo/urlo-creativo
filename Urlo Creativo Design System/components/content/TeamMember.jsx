import React from "react";

/**
 * TeamMember — a person on the People page: B&W portrait, bold caps
 * name, muted role caption. The studio is "proudly powered by women."
 */
export function TeamMember({ photo, name, role, style = {}, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      {photo && (
        <div style={{ width: "100%", aspectRatio: "1 / 1.18", overflow: "hidden", background: "var(--uc-gray-100)", marginBottom: 16 }}>
          <img src={photo} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1)", display: "block" }} />
        </div>
      )}
      <div style={{ font: "var(--type-body-bold)", fontSize: 13, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--uc-black)" }}>
        {name}
      </div>
      {role && (
        <div style={{ font: "var(--type-caption)", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--uc-gray-400)", marginTop: 6, maxWidth: 220 }}>
          {role}
        </div>
      )}
    </div>
  );
}
