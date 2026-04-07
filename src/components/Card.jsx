// src/components/Card.jsx
import { useState } from "react";
import { colors, shadows, transitions } from "../tokens.js";

export default function Card({ children, style, onHoverChange, onClick }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => { setHovered(true);  onHoverChange?.(true);  };
  const handleMouseLeave = () => { setHovered(false); onHoverChange?.(false); };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        background: "rgba(15,25,50,0.7)",
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${hovered ? colors.borderHover : colors.border}`,
        cursor: "pointer",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? shadows.cardHover : shadows.card,
        transition: transitions.spring,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
