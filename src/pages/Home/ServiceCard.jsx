import { useState }    from "react";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import { colors, fonts, transitions } from "../../tokens.js";

export default function ServiceCard({ icon, title, description, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:   hovered ? colors.accentSoft : "rgba(15,25,50,0.5)",
          borderRadius: "12px",
          padding:      "36px 24px",
          border:       `1px solid ${hovered ? "rgba(0,229,255,0.2)" : "rgba(0,229,255,0.06)"}`,
          textAlign:    "center",
          transition:   transitions.smooth,
          transform:    hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow:    hovered ? "0 16px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          border: `2px solid ${hovered ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          background: hovered ? colors.accentSoft : "transparent",
          transition: transitions.smooth,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: fonts.body, fontSize: "18px", fontWeight: 600, color: "#fff", margin: "0 0 12px" }}>
          {title}
        </h3>
        <p style={{ fontFamily: fonts.body, fontSize: "13px", lineHeight: 1.7, color: colors.textSecondary, margin: 0 }}>
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
}
