// src/tokens.js

export const colors = {
  // Backgrounds
  bg:         "#080e1c",
  surface:    "#0f1930",
  surfaceAlt: "#111827",

  // Global accent — Home, Navbar, Footer, shared components
  accent:     "#00e5ff",
  accentDim:  "#00b8d4",
  accentSoft: "rgba(0,229,255,0.08)",  // background fill tint

  // Per-section accents (intentional — see design spec)
  sky:        "#38bdf8",   // Resume, Services, Contact
  indigo:     "#818cf8",   // Portfolio secondary
  purple:     "#a78bfa",   // Resume education pills
  pink:       "#e91e63",   // Contact send button

  // Text
  textPrimary:   "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted:     "#64748b",

  // Borders (global)
  border:      "rgba(0,229,255,0.08)",  // default card/element border
  borderHover: "rgba(0,229,255,0.25)",
};

export const fonts = {
  body: "'Outfit', sans-serif",
  mono: "'Fira Code', 'SF Mono', 'Consolas', monospace",
};

export const transitions = {
  smooth:     "all 0.4s ease",
  spring:     "all 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
  springFast: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
};

export const shadows = {
  card:      "0 4px 20px rgba(0,0,0,0.2)",
  cardHover: "0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.08)",
};
