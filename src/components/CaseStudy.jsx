import { useState, useEffect } from "react";
import { ICON_PATHS, ArrowLeftIcon, ExternalLinkIcon } from "../icons.jsx";
import { colors, fonts } from "../tokens.js";

/* ── SVG Placeholder thumbnail ── */
export function PlaceholderThumb({ project, large }) {
  const h = large ? 400 : 240;
  return (
    <div style={{ width: "100%", height: h, position: "relative", background: colors.bg }}>
      <svg viewBox="0 0 400 300" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: "absolute", inset: 0 }}>
        <defs>
          <radialGradient id={`rg-${project.id}${large ? "L" : ""}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={project.color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={colors.bg} stopOpacity="1" />
          </radialGradient>
          <linearGradient id={`lg-${project.id}${large ? "L" : ""}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={project.color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={colors.indigo} stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill={`url(#lg-${project.id}${large ? "L" : ""})`} />
        <ellipse cx="200" cy="120" rx="140" ry="100" fill={`url(#rg-${project.id}${large ? "L" : ""})`} />
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle key={`${r}${c}`} cx={50 + c * 33} cy={50 + r * 33} r="0.8" fill={project.color} opacity="0.12" />
          ))
        )}
        <g transform="translate(176, 118) scale(2.4)" stroke={project.color} strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          {ICON_PATHS[project.icon]}
        </g>
        <path d="M24 50 L24 24 L50 24" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M376 50 L376 24 L350 24" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M24 250 L24 276 L50 276" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M376 250 L376 276 L350 276" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
      </svg>
    </div>
  );
}

/* ── Card thumbnail used by project grid pages ── */
export function Thumbnail({ project }) {
  if (project.image) {
    return (
      <div style={{ width: "100%", height: 220, borderRadius: 10, overflow: "hidden", position: "relative" }}>
        <img
          src={project.image}
          alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${colors.bg}99 0%, transparent 55%)` }} />
      </div>
    );
  }
  return (
    <div style={{ borderRadius: 10, overflow: "hidden" }}>
      <PlaceholderThumb project={project} />
    </div>
  );
}

/* ════════════════════════════════════════
   CASE STUDY
   ════════════════════════════════════════ */
export default function CaseStudy({ project, onBack }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => clearTimeout(t);
  }, []);

  const c = project.color;

  const sections = [
    { num: "01", title: "The Challenge", body: project.challenge },
    { num: "02", title: "The Solution",  body: project.solution  },
    { num: "03", title: "The Outcome",   body: project.outcome   },
  ];

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(28px)",
        transition: "all .6s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* ── Floating back button ── */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 7,
          background: "rgba(15,25,48,0.7)",
          border: `1px solid ${c}25`,
          color: colors.textSecondary,
          cursor: "pointer",
          fontFamily: fonts.body,
          fontSize: 13,
          fontWeight: 500,
          padding: "8px 18px",
          borderRadius: 100,
          marginBottom: 32,
          backdropFilter: "blur(12px)",
          transition: "all .25s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${c}60`;
          e.currentTarget.style.color = c;
          e.currentTarget.style.transform = "translateX(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = `${c}25`;
          e.currentTarget.style.color = colors.textSecondary;
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <ArrowLeftIcon /> Back to Projects
      </button>

      {/* ── Cinematic hero ── */}
      <div
        style={{
          position: "relative",
          height: "clamp(260px, 44vw, 500px)",
          borderRadius: 20,
          overflow: "hidden",
          marginBottom: 40,
          border: `1px solid ${c}18`,
          boxShadow: `0 0 80px ${c}10, 0 24px 60px rgba(0,0,0,.5)`,
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <PlaceholderThumb project={project} large />
        )}

        {/* Cinematic gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${colors.bg} 0%, ${colors.bg}cc 18%, ${colors.bg}44 45%, transparent 75%)`,
        }} />

        {/* Subtle color vignette */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 100%, ${c}15 0%, transparent 70%)`,
        }} />

        {/* Corner brackets */}
        {[
          { top: 16, left: 16, rotate: 0 },
          { top: 16, right: 16, rotate: 90 },
          { bottom: 16, right: 16, rotate: 180 },
          { bottom: 16, left: 16, rotate: 270 },
        ].map((pos, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ position: "absolute", ...pos, opacity: 0.4, transform: `rotate(${pos.rotate}deg)` }}>
            <path d="M1 12 L1 1 L12 1" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ))}

        {/* Overlaid title + tags */}
        <div style={{ position: "absolute", bottom: 28, left: 32, right: 32 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: "4px 12px",
                borderRadius: 100,
                background: `${c}18`,
                border: `1px solid ${c}35`,
                color: c,
                fontSize: 11,
                fontWeight: 600,
                fontFamily: fonts.body,
                letterSpacing: ".06em",
                textTransform: "uppercase",
                backdropFilter: "blur(8px)",
              }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 style={{
            fontFamily: fonts.body,
            fontSize: "clamp(24px, 4vw, 44px)",
            fontWeight: 700,
            color: colors.textPrimary,
            margin: 0,
            lineHeight: 1.15,
            textShadow: "0 2px 20px rgba(0,0,0,.6)",
          }}>
            {project.title}
          </h1>
        </div>
      </div>

      {/* ── Meta + CTA row ── */}
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 44, alignItems: "flex-start" }}>
        {/* Meta cards */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 12,
          minWidth: 0,
        }}>
          {[
            { label: "Role",     value: project.role     },
            { label: "Duration", value: project.duration },
            { label: "Stack",    value: project.tools.join(", ") },
          ].map((item) => (
            <div key={item.label} style={{
              padding: "18px 20px",
              borderRadius: 14,
              background: `linear-gradient(135deg, ${c}06, ${colors.indigo}04)`,
              border: `1px solid ${c}12`,
              backdropFilter: "blur(12px)",
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, width: "100%", height: 2,
                background: `linear-gradient(90deg, ${c}50, transparent)`,
              }} />
              <div style={{
                fontSize: 10, textTransform: "uppercase", letterSpacing: ".12em",
                color: c, fontWeight: 700, marginBottom: 7, fontFamily: fonts.body,
              }}>
                {item.label}
              </div>
              <div style={{
                fontSize: 13, color: colors.textSecondary,
                lineHeight: 1.5, fontFamily: fonts.body,
              }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* View Live button */}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 14,
              border: `1px solid ${c}40`,
              background: `linear-gradient(135deg, ${c}14, ${c}08)`,
              color: c,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: fonts.body,
              textDecoration: "none",
              transition: "all .25s ease",
              whiteSpace: "nowrap",
              alignSelf: "stretch",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
              boxShadow: `0 0 20px ${c}10`,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${c}22, ${c}14)`;
              e.currentTarget.style.borderColor = c;
              e.currentTarget.style.boxShadow = `0 0 28px ${c}22`;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = `linear-gradient(135deg, ${c}14, ${c}08)`;
              e.currentTarget.style.borderColor = `${c}40`;
              e.currentTarget.style.boxShadow = `0 0 20px ${c}10`;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <ExternalLinkIcon /> {project.linkLabel || "View Live Site"}
          </a>
        )}
      </div>

      {/* ── Description ── */}
      <div style={{
        position: "relative",
        padding: "28px 32px",
        borderRadius: 16,
        background: `linear-gradient(135deg, ${c}05, transparent)`,
        border: `1px solid ${c}10`,
        marginBottom: 52,
      }}>
        <div style={{
          position: "absolute", left: 0, top: "20%", bottom: "20%",
          width: 3, borderRadius: 2,
          background: `linear-gradient(to bottom, transparent, ${c}, transparent)`,
        }} />
        <p style={{
          fontSize: 16,
          lineHeight: 1.85,
          color: colors.textSecondary,
          fontFamily: fonts.body,
          margin: 0,
        }}>
          {project.description}
        </p>
      </div>

      {/* ── Sections ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {sections.map((s) => (
          <div key={s.num} style={{
            borderRadius: 16,
            overflow: "hidden",
            border: `1px solid ${c}10`,
            background: `linear-gradient(135deg, rgba(15,25,48,0.6), rgba(8,14,28,0.8))`,
            backdropFilter: "blur(12px)",
          }}>
            {/* Section header bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "18px 24px",
              borderBottom: `1px solid ${c}0e`,
              background: `linear-gradient(90deg, ${c}08, transparent)`,
            }}>
              <span style={{
                width: 36, height: 36,
                borderRadius: 10,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${c}20, ${colors.indigo}15)`,
                color: c,
                fontSize: 12,
                fontWeight: 700,
                fontFamily: fonts.body,
                border: `1px solid ${c}20`,
                flexShrink: 0,
              }}>
                {s.num}
              </span>
              <h2 style={{
                fontFamily: fonts.body,
                fontSize: 17,
                fontWeight: 600,
                color: colors.textPrimary,
                margin: 0,
              }}>
                {s.title}
              </h2>
            </div>

            {/* Section body */}
            <div style={{ padding: "20px 24px 22px" }}>
              <p style={{
                fontSize: 15,
                lineHeight: 1.85,
                color: colors.textSecondary,
                fontFamily: fonts.body,
                margin: 0,
              }}>
                {s.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Bottom spacer ── */}
      <div style={{ height: 60 }} />
    </div>
  );
}
