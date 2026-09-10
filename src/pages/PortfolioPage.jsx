import { useState, useEffect } from "react";
import { EyeIcon } from "../icons.jsx";
import { colors, fonts } from "../tokens.js";
import Footer from "../components/Footer.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { Thumbnail } from "../components/CaseStudy.jsx";
import CaseStudyPage from "../components/CaseStudyPage.jsx";
import { projects as PROJECTS, categories as CATEGORIES } from "../data/portfolio.js";


/* ════════════════════════════════════════
   MAIN PORTFOLIO SECTION
   ════════════════════════════════════════ */
export default function PortfolioSection() {
  const [active, setActive]           = useState("all");
  const [animState, setAnimState]     = useState("visible");
  const [displayed, setDisplayed]     = useState(PROJECTS);
  const [pending, setPending]         = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [hovered, setHovered]         = useState(null);

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
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimState("visible")));
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
    return <CaseStudyPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  /* ── Grid ── */
  return (
    <>
      <section style={{
        background: colors.bg,
        minHeight: "100vh",
        fontFamily: fonts.body,
        padding: "clamp(80px, 8vw, 100px) clamp(20px, 5vw, 60px)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-15%", left: "50%", transform: "translateX(-50%)",
          width: 700, height: 700,
          background: `radial-gradient(circle, ${colors.sky}06 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Heading */}
          <SectionHeader accent={colors.sky}>Selected Works</SectionHeader>

          {/* Filter tabs */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 48, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => {
              const isActive = active === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => switchCategory(cat.key)}
                  style={{
                    padding: "11px 22px",
                    minHeight: 40,
                    borderRadius: 100,
                    border: isActive ? `1px solid ${colors.sky}` : `1px solid rgba(148,163,184,0.15)`,
                    background: isActive ? `linear-gradient(135deg, ${colors.sky}15, ${colors.indigo}10)` : "transparent",
                    color: isActive ? colors.sky : colors.textMuted,
                    cursor: "pointer",
                    fontFamily: fonts.body,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    transition: "all .35s cubic-bezier(0.22,1,0.36,1)",
                    letterSpacing: ".02em",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                    if (!isActive) { e.currentTarget.style.borderColor = `rgba(56,189,248,0.4)`; e.currentTarget.style.color = colors.sky; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    if (!isActive) { e.currentTarget.style.borderColor = "rgba(148,163,184,0.15)"; e.currentTarget.style.color = colors.textMuted; }
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="r-grid-3" style={{
            "--r-gap": "22px",
            transformOrigin: "center center",
            ...gridAnim,
          }}>
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

                    {/* Hover overlay — see .r-hover-overlay for the touch-device variant */}
                    <div className="r-hover-overlay" style={{
                      position: "absolute", inset: 0, borderRadius: 10,
                      background: `linear-gradient(135deg, ${project.color}CC, ${colors.bg}DD)`,
                      opacity: isH ? 1 : 0,
                      transition: "opacity .35s ease",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "9px 22px", borderRadius: 100,
                        border: "1.5px solid rgba(255,255,255,.4)",
                        color: "#fff", fontSize: 13, fontWeight: 500,
                        fontFamily: fonts.body, backdropFilter: "blur(6px)",
                      }}>
                        <EyeIcon /> View Case Study
                      </span>
                    </div>
                  </div>

                  {/* Card text */}
                  <div style={{ padding: "16px 8px 6px" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, fontFamily: fonts.body, marginBottom: 7 }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: 12, color: colors.textMuted, fontFamily: fonts.body, letterSpacing: ".02em" }}>
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
