import { useState, useEffect, useRef } from "react";
import { ICON_PATHS } from "../icons.jsx";
import { colors, fonts } from "../tokens.js";
import Footer from "../components/Footer.jsx";
import { projects as PROJECTS } from "../data/portfolio.js";

const CATEGORIES = [
  { key: "all",     label: "All" },
  { key: "web",     label: "Web Apps" },
  { key: "data",    label: "Data & Analytics" },
  { key: "systems", label: "Systems" },
];

/* ── Placeholder thumbnail with inline SVG ── */
function Thumbnail({ project, large }) {
  const h = large ? 320 : 240;
  return (
    <div
      style={{
        width: "100%",
        height: h,
        borderRadius: large ? 14 : 10,
        overflow: "hidden",
        position: "relative",
        background: colors.bg,
      }}
    >
      <svg
        viewBox="0 0 400 300"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0 }}
      >
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

        {/* Dot grid */}
        {Array.from({ length: 7 }).map((_, r) =>
          Array.from({ length: 10 }).map((_, c) => (
            <circle key={`${r}${c}`} cx={50 + c * 33} cy={50 + r * 33} r="0.8" fill={project.color} opacity="0.12" />
          ))
        )}

        {/* Center icon */}
        <g transform="translate(176, 118) scale(2.4)" stroke={project.color} strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          {ICON_PATHS[project.icon]}
        </g>

        {/* Corner frames */}
        <path d="M24 50 L24 24 L50 24" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M376 50 L376 24 L350 24" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M24 250 L24 276 L50 276" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
        <path d="M376 250 L376 276 L350 276" fill="none" stroke={project.color} strokeWidth="0.8" opacity="0.15" />
      </svg>

      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: 12,
          fontSize: 9,
          letterSpacing: ".08em",
          color: `${project.color}40`,
          fontFamily: fonts.body,
          textTransform: "uppercase",
        }}
      >
        Replace with image
      </div>
    </div>
  );
}

/* ── Icons ── */
const ArrowLeft = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5" /><path d="M12 19l-7-7 7-7" />
  </svg>
);
const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

/* ════════════════════════════════════════
   CASE STUDY PAGE
   ════════════════════════════════════════ */
function CaseStudy({ project, onBack }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, []);

  const sections = [
    { num: "01", title: "The Challenge", body: project.challenge },
    { num: "02", title: "The Solution", body: project.solution },
    { num: "03", title: "The Outcome", body: project.outcome },
  ];

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "scale(1) translateY(0)" : "scale(0.96) translateY(24px)",
        transition: "all .55s cubic-bezier(.22,1,.36,1)",
      }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "none",
          border: "none",
          color: colors.sky,
          cursor: "pointer",
          fontFamily: fonts.body,
          fontSize: 14,
          fontWeight: 500,
          padding: "4px 0",
          marginBottom: 32,
          transition: "opacity .2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(-4px)"; e.currentTarget.style.opacity = "0.85"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.opacity = "1"; }}
      >
        <ArrowLeft /> Back to Projects
      </button>

      {/* Hero */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          marginBottom: 40,
          border: `1px solid ${project.color}20`,
        }}
      >
        <Thumbnail project={project} large />
      </div>

      {/* Title */}
      <h1
        style={{
          fontFamily: fonts.body,
          fontSize: "clamp(26px, 4vw, 42px)",
          fontWeight: 700,
          background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.textSecondary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          margin: "0 0 14px",
        }}
      >
        {project.title}
      </h1>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {project.tags.map((t) => (
          <span
            key={t}
            style={{
              padding: "5px 14px",
              borderRadius: 100,
              background: `${project.color}12`,
              border: `1px solid ${project.color}28`,
              color: project.color,
              fontSize: 12,
              fontWeight: 500,
              fontFamily: fonts.body,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Meta */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 14,
          marginBottom: 40,
        }}
      >
        {[
          { label: "Role", value: project.role },
          { label: "Duration", value: project.duration },
          { label: "Tools", value: project.tools.join(", ") },
        ].map((item) => (
          <div
            key={item.label}
            style={{
              padding: "20px 22px",
              borderRadius: 12,
              background: "rgba(56,189,248,0.04)",
              border: `1px solid ${"rgba(56,189,248,0.10)"}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: colors.sky,
                fontWeight: 700,
                marginBottom: 8,
                fontFamily: fonts.body,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                lineHeight: 1.55,
                fontFamily: fonts.body,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 17,
          lineHeight: 1.8,
          color: colors.textSecondary,
          fontFamily: fonts.body,
          maxWidth: 700,
          marginBottom: 52,
        }}
      >
        {project.description}
      </p>

      {/* Sections */}
      {sections.map((s, i) => (
        <div key={s.num} style={{ marginBottom: 44 }}>
          <h2
            style={{
              fontFamily: fonts.body,
              fontSize: 21,
              fontWeight: 600,
              color: colors.textPrimary,
              marginBottom: 14,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(135deg, ${colors.sky}18, ${colors.indigo}18)`,
                color: colors.sky,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: fonts.body,
                border: `1px solid ${colors.sky}15`,
              }}
            >
              {s.num}
            </span>
            {s.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.85,
              color: colors.textSecondary,
              fontFamily: fonts.body,
              maxWidth: 660,
              paddingLeft: 48,
            }}
          >
            {s.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════
   MAIN PORTFOLIO SECTION
   ════════════════════════════════════════ */
export default function PortfolioSection() {
  const [active, setActive] = useState("all");
  const [animState, setAnimState] = useState("visible");
  const [displayed, setDisplayed] = useState(PROJECTS);
  const [pending, setPending] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hovered, setHovered] = useState(null);

  /* ── Axure animation: fade + scale from 0.8, center anchor, 500ms ── */
  const switchCategory = (key) => {
    if (key === active || animState !== "visible") return;
    setPending(key);
    setAnimState("fading-out");
  };

  useEffect(() => {
    if (animState === "fading-out") {
      const t = setTimeout(() => {
        setActive(pending);
        setDisplayed(pending === "all" ? PROJECTS : PROJECTS.filter((p) => p.category === pending));
        setAnimState("fading-in");
      }, 500);
      return () => clearTimeout(t);
    }
    if (animState === "fading-in") {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimState("visible"));
      });
    }
  }, [animState, pending]);

  const gridAnim = (() => {
    if (animState === "fading-out")
      return { opacity: 0, transform: "scale(0.8)", transition: "opacity 500ms ease, transform 500ms ease" };
    if (animState === "fading-in")
      return { opacity: 0, transform: "scale(0.8)", transition: "none" };
    return { opacity: 1, transform: "scale(1)", transition: "opacity 500ms ease, transform 500ms ease" };
  })();

  /* ── Case study ── */
  if (selectedProject) {
    return (
      <div
        style={{
          background: colors.bg,
          minHeight: "100vh",
          fontFamily: fonts.body,
          padding: "clamp(24px, 5vw, 60px)",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <CaseStudy project={selectedProject} onBack={() => setSelectedProject(null)} />
        </div>
      </div>
    );
  }

  /* ── Grid ── */
  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section
        style={{
          background: colors.bg,
          minHeight: "100vh",
          fontFamily: fonts.body,
          padding: "clamp(80px, 8vw, 100px) clamp(20px, 5vw, 60px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle ambient glow — matches hero section's feel */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background: `radial-gradient(circle, ${colors.sky}06 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* ── Section heading ── */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <h2
              style={{
                fontSize: "clamp(30px, 5vw, 46px)",
                fontWeight: 700,
                fontFamily: fonts.body,
                background: `linear-gradient(135deg, ${colors.textPrimary}, ${colors.textSecondary})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 12,
              }}
            >
              Selected Works
            </h2>
            <div
              style={{
                width: 40,
                height: 3,
                background: `linear-gradient(90deg, ${colors.sky}, ${colors.indigo})`,
                borderRadius: 2,
                margin: "0 auto 36px",
              }}
            />
          </div>

          {/* ── Filter tabs ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              marginBottom: 48,
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  className="btn-cool"
                  onClick={() => switchCategory(cat.key)}
                  style={{
                    padding: "9px 24px",
                    borderRadius: 100,
                    border: isActive
                      ? `1px solid ${colors.sky}`
                      : `1px solid rgba(148, 163, 184, 0.15)`,
                    background: isActive
                      ? `linear-gradient(135deg, ${colors.sky}15, ${colors.indigo}10)`
                      : "transparent",
                    color: isActive ? colors.sky : colors.textMuted,
                    cursor: "pointer",
                    fontFamily: fonts.body,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    transition: "all .35s cubic-bezier(0.22,1,0.36,1)",
                    letterSpacing: ".02em",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px) scale(1.05)"; if (!isActive) { e.currentTarget.style.borderColor = `rgba(56,189,248,0.4)`; e.currentTarget.style.color = colors.sky; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; if (!isActive) { e.currentTarget.style.borderColor = "rgba(148,163,184,0.15)"; e.currentTarget.style.color = colors.textMuted; } }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* ── Grid with Axure fade+scale ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 22,
              transformOrigin: "center center",
              ...gridAnim,
            }}
          >
            {displayed.map((project) => {
              const isH = hovered === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  onMouseEnter={() => setHovered(project.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    background: "rgba(56,189,248,0.04)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${isH ? "rgba(56,189,248,0.25)" : "rgba(56,189,248,0.10)"}`,
                    cursor: "pointer",
                    transition: "all .4s cubic-bezier(.22,1,.36,1)",
                    transform: isH ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: isH
                      ? `0 20px 50px rgba(0,0,0,.35), 0 0 30px ${project.color}08`
                      : "0 2px 16px rgba(0,0,0,.15)",
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
                    <Thumbnail project={project} />

                    {/* Hover overlay */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 10,
                        background: `linear-gradient(135deg, ${project.color}CC, ${colors.bg}DD)`,
                        opacity: isH ? 1 : 0,
                        transition: "opacity .35s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "9px 22px",
                          borderRadius: 100,
                          border: "1.5px solid rgba(255,255,255,.4)",
                          color: "#fff",
                          fontSize: 13,
                          fontWeight: 500,
                          fontFamily: fonts.body,
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        <EyeIcon /> View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Card text */}
                  <div style={{ padding: "18px 8px 8px" }}>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: colors.textPrimary,
                        fontFamily: fonts.body,
                        marginBottom: 8,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: colors.textMuted,
                        fontFamily: fonts.body,
                        letterSpacing: ".02em",
                      }}
                    >
                      {project.tags.join(" • ")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
          <Footer />
    </>
  );
}
