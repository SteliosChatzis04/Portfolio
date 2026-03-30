export default function Footer({ accent = "#00e5ff", accentEnd = "#00b8d4" }) {
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
          fontFamily: "'Fira Code','SF Mono','Consolas',monospace",
          fontSize: "12px",
          color: accent,
          opacity: 0.5,
        }}
      >
        &copy;
      </span>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          color: "#4a5670",
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
