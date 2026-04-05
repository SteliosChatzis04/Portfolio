// src/components/SkillTag.jsx
import { useState } from "react";
import { colors, fonts, transitions } from "../tokens.js";

export default function SkillTag({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "8px 22px",
        borderRadius: "20px",
        background: hovered ? "rgba(0,229,255,0.15)" : colors.accentSoft,
        border: `1px solid ${hovered ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.15)"}`,
        color: hovered ? "#fff" : colors.accent,
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: fonts.body,
        transition: transitions.smooth,
        cursor: "default",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
    >
      {label}
    </span>
  );
}
