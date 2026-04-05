// src/components/Button.jsx
import { useState } from "react";
import { colors, fonts, transitions } from "../tokens.js";

export default function Button({ variant = "primary", onClick, children, style }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    padding: "16px 38px",
    borderRadius: "8px",
    fontFamily: fonts.body,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: transitions.springFast,
    transform: hovered ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
    border: "none",
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, #0099cc, ${colors.accentDim})`,
      color: "#fff",
    },
    outline: {
      background: hovered ? "rgba(0,184,212,0.1)" : "transparent",
      color: colors.accentDim,
      border: `2px solid ${hovered ? "rgba(0,229,255,0.9)" : "rgba(0,184,212,0.6)"}`,
    },
  };

  return (
    <button
      className="btn-cool"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
