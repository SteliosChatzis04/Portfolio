// src/components/SectionHeader.jsx
import { colors, fonts } from "../tokens.js";

export default function SectionHeader({ children, accent }) {
  const c = accent || colors.accent;
  return (
    <>
      <h2 style={{
        textAlign: "center",
        fontSize: "28px",
        fontWeight: 700,
        color: c,
        marginBottom: "8px",
        fontFamily: fonts.body,
      }}>
        {children}
      </h2>
      <div style={{
        width: "60px",
        height: "3px",
        borderRadius: "2px",
        background: `linear-gradient(90deg, ${c}, transparent)`,
        margin: "0 auto 48px",
      }} />
    </>
  );
}
