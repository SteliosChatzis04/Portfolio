import { colors, fonts } from "../tokens.js";

export default function Footer({ accent = colors.accent, accentEnd = colors.accentDim }) {
  const year = new Date().getFullYear();
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${accent}12`,
        padding: "28px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        background: "rgba(6,11,22,0.6)",
        backdropFilter: "blur(8px)",
      }}
    >
      <span
        style={{
          fontFamily: fonts.mono,
          fontSize: "12px",
          color: accent,
          opacity: 0.5,
        }}
      >
        &copy;
      </span>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: "13px",
          color: colors.textMuted,
          margin: 0,
          letterSpacing: "0.3px",
        }}
      >
        {year}{" "}
        <span
          style={{
            background: `linear-gradient(135deg, ${accent}, ${accentEnd})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 600,
          }}
        >
          Stelios Chatzisavramidis
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}
