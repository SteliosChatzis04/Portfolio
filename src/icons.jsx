import { colors } from "./tokens.js";

// ── Arrow (16×16, uses currentColor — inherits from parent) ──
export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Home page service icons (40×40) ──
export function UIUXIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4"  y="4"  width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="22" y="4"  width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="4"  y="22" width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="22" y="22" width="14" height="14" rx="7" stroke={colors.accent} strokeWidth="2" />
    </svg>
  );
}

export function WebDevIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <polyline points="12,10 4,20 12,30"  stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="28,10 36,20 28,30" stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="6" x2="18" y2="34" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PrototypeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={colors.accent} strokeWidth="2" />
      <circle cx="20" cy="20" r="6"  stroke={colors.accent} strokeWidth="2" />
      <line x1="20" y1="6"  x2="20" y2="2"  stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="38" x2="20" y2="34" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="6"  y1="20" x2="2"  y2="20" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="20" x2="34" y2="20" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Services page icon component (circle container + SVG) ──
export function ServiceIcon({ type, size = 56 }) {
  const circleStyle = {
    width: size, height: size,
    borderRadius: "50%",
    border: `2px solid ${colors.sky}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(56,189,248,0.06)",
    flexShrink: 0,
  };
  const svgProps = {
    width: 26, height: 26, viewBox: "0 0 24 24",
    fill: "none", stroke: colors.sky,
    strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
  };
  if (type === "design") return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" /><path d="M9 21V9" /><circle cx="16" cy="15" r="2" />
      </svg>
    </div>
  );
  if (type === "code") return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    </div>
  );
  // default: mobile
  return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
        <path d="M9 6h6" /><path d="M9 10h6" /><path d="M9 14h4" />
      </svg>
    </div>
  );
}

// ── Contact page icons ──
export function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ── Portfolio page icon paths (SVG path fragments used inside <svg><g>…</g></svg>) ──
// Usage: <g transform="..." stroke={project.color} ...>{ICON_PATHS[project.icon]}</g>
export const ICON_PATHS = {
  chart: (
    <>
      <polyline points="4,18 8,12 12,15 16,8 20,11" fill="none" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth="1" opacity="0.4" />
      <line x1="4" y1="4"  x2="4"  y2="20" strokeWidth="1" opacity="0.4" />
    </>
  ),
  store: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="1" fill="none" strokeWidth="1.5" />
      <path d="M4 10 L6 4 L18 4 L20 10" fill="none" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="12" y2="20" strokeWidth="1" opacity="0.5" />
    </>
  ),
  map: (
    <>
      <path d="M12 2 C8 7 4 12 12 20 C20 12 16 7 12 2 Z" fill="none" strokeWidth="1.5" />
      <circle cx="12" cy="10" r="2" fill="none" strokeWidth="1.5" />
    </>
  ),
  brand: (
    <>
      <circle cx="12" cy="12" r="8" fill="none" strokeWidth="1.5" />
      <path d="M8 12 L10 15 L16 9" fill="none" strokeWidth="1.5" />
    </>
  ),
  zen: (
    <>
      <circle cx="12" cy="12" r="8" fill="none" strokeWidth="1.5" />
      <path d="M12 8 C9 10 9 14 12 16 C15 14 15 10 12 8 Z" fill="none" strokeWidth="1.2" />
    </>
  ),
  home: (
    <>
      <path d="M4 11 L12 4 L20 11" fill="none" strokeWidth="1.5" />
      <rect x="6" y="11" width="12" height="9" rx="1" fill="none" strokeWidth="1.5" />
      <rect x="10" y="15" width="4" height="5" fill="none" strokeWidth="1" />
    </>
  ),
};
