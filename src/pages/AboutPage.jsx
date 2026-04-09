import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer.jsx";
import CvRequestModal from "../components/CvRequestModal.jsx";
import { stats as STATS, skills as SKILLS, bio as BIO } from "../data/about.js";
import { colors, fonts } from "../tokens.js";

/* ── Placeholder image (replace with your actual photo) ── */
function AboutImage() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 520 400" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id="about-img-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E2236" />
          <stop offset="100%" stopColor="#2A1F4E" />
        </linearGradient>
        <clipPath id="about-img-clip">
          <rect x="0" y="0" width="520" height="400" rx="16" />
        </clipPath>
      </defs>
      <g clipPath="url(#about-img-clip)">
        <rect width="520" height="400" fill="url(#about-img-bg)" />
        {Array.from({ length: 20 }).map((_, r) =>
          Array.from({ length: 26 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="1" fill="rgba(123,95,255,0.15)" />
          ))
        )}
        <rect x="60" y="50" width="200" height="140" rx="8" fill="rgba(123,95,255,0.12)" stroke="rgba(123,95,255,0.25)" strokeWidth="1" />
        <rect x="70" y="60" width="60" height="40" rx="4" fill="rgba(255,200,50,0.3)" />
        <rect x="140" y="60" width="60" height="40" rx="4" fill="rgba(0,212,255,0.2)" />
        <rect x="70" y="110" width="180" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect x="70" y="126" width="140" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="70" y="142" width="160" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="280" y="60" width="80" height="80" rx="4" fill="rgba(255,200,50,0.4)" transform="rotate(-5 320 100)" />
        <rect x="340" y="90" width="80" height="80" rx="4" fill="rgba(123,95,255,0.3)" transform="rotate(3 380 130)" />
        <rect x="300" y="160" width="80" height="80" rx="4" fill="rgba(0,212,255,0.25)" transform="rotate(-2 340 200)" />
        <path d="M200 280 Q220 260 240 270 Q260 280 250 300 Q240 320 220 310 Z" fill="rgba(210,170,140,0.5)" />
        <line x1="240" y1="265" x2="300" y2="220" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        <text x="260" y="370" textAnchor="middle" fill="rgba(123,95,255,0.4)" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="500" letterSpacing="2">YOUR IMAGE HERE</text>
      </g>
    </svg>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "", start = false, delay = 0 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;
    const num = parseInt(target);
    if (isNaN(num)) { setVal(target); return; }
    let timeoutId;
    let rafId;
    timeoutId = setTimeout(() => {
      let startTime = null;
      const duration = 1600;
      const tick = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(2, -10 * progress);
        setVal(Math.round(eased * num));
        if (progress < 1) rafId = requestAnimationFrame(tick);
        else setVal(num);
      };
      rafId = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timeoutId); cancelAnimationFrame(rafId); };
  }, [start, target, delay]);

  return <span>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Fade + slide-up reveal. Uses separate opacity/transform transitions so
  // the delay only fires on the initial reveal — hover handlers override
  // transition imperatively without fighting this.
  const reveal = (delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <>
      {/* Minimal style block: keyframes + shimmer pseudo-element + responsive grid */}
      <style>{`
        @keyframes statReveal { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .stat-reveal-0 { animation: statReveal 0.6s ease 1.00s forwards; opacity: 0; }
        .stat-reveal-1 { animation: statReveal 0.6s ease 1.15s forwards; opacity: 0; }
        .stat-reveal-2 { animation: statReveal 0.6s ease 1.30s forwards; opacity: 0; }
        .stat-reveal-3 { animation: statReveal 0.6s ease 1.45s forwards; opacity: 0; }
        @media (max-width: 768px) {
          .about-grid      { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-stats     { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .about-container { padding: 0 20px !important; }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          background: colors.bg,
          fontFamily: fonts.body,
          color: colors.textPrimary,
          padding: "100px 0 48px",
          minHeight: "calc(100vh + 1px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow — top right */}
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.purple}26 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        {/* Decorative glow — bottom left */}
        <div style={{
          position: "absolute", bottom: -150, left: -150,
          width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, ${colors.accent}26 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div
          className="about-container"
          style={{ maxWidth: 1140, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}
        >
          {/* Two-column grid */}
          <div
            className="about-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 64, alignItems: "center" }}
          >
            {/* ── Left: Image ── */}
            <div style={{
              position: "relative",
              borderRadius: 16, overflow: "hidden",
              aspectRatio: "13/10",
              background: "#171B2D",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${colors.purple}26`,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)",
            }}>
              {/* Gradient border accent */}
              <div style={{
                position: "absolute", inset: -2,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${colors.purple}, transparent 50%, ${colors.accent}, transparent)`,
                opacity: 0.3,
                zIndex: -1,
              }} />
              <AboutImage />
            </div>

            {/* ── Right: Content ── */}
            <div>
              {/* Label */}
              <div style={{
                fontSize: 14, fontWeight: 600, textTransform: "uppercase",
                letterSpacing: 3, color: colors.purple, marginBottom: 16,
                ...reveal(0.2),
              }}>
                {BIO.label}
              </div>

              {/* Heading */}
              <h2 style={{
                fontSize: "clamp(28px, 3.2vw, 42px)", fontWeight: 700,
                lineHeight: 1.2, color: colors.textPrimary, margin: "0 0 24px",
                ...reveal(0.35),
              }}>
                Engineering software{" "}
                <em style={{
                  fontStyle: "normal",
                  background: `linear-gradient(135deg, ${colors.purple}, ${colors.accent})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  with precision and purpose.
                </em>
              </h2>

              {/* Body */}
              <p style={{
                fontSize: 16, lineHeight: 1.75, color: colors.textSecondary,
                margin: "0 0 36px", maxWidth: 520,
                ...reveal(0.5),
              }}>
                {BIO.body}
              </p>

              {/* Skill pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36, ...reveal(0.65) }}>
                {SKILLS.map((skill, i) => (
                  <div
                    key={skill.name}
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 18px", borderRadius: 100,
                      background: "#171B2D",
                      border: `1px solid ${hoveredSkill === i ? colors.purple : "rgba(255,255,255,0.06)"}`,
                      color: hoveredSkill === i ? "#fff" : colors.textSecondary,
                      fontSize: 13, fontWeight: 500, fontFamily: fonts.body,
                      cursor: "default",
                      transform: hoveredSkill === i ? "translateY(-2px)" : "translateY(0)",
                      boxShadow: hoveredSkill === i ? `0 6px 20px ${colors.purple}26` : "none",
                      transition: "all 0.3s ease",
                      transitionDelay: `${i * 0.04}s`,
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24" fill="none"
                      stroke={hoveredSkill === i ? "#fff" : colors.purple}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ width: 16, height: 16, transition: "stroke 0.3s", flexShrink: 0 }}
                    >
                      <path d={skill.icon} />
                    </svg>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                className="btn-cool"
                onClick={() => setCvModalOpen(true)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "14px 32px", borderRadius: 100,
                  background: `linear-gradient(135deg, ${colors.accent}, #0099CC)`,
                  color: colors.bg, fontSize: 15, fontWeight: 600,
                  fontFamily: fonts.body, border: "none", cursor: "pointer",
                  boxShadow: `0 4px 20px ${colors.accent}26`,
                  ...reveal(0.8),
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transition = "transform 0.3s ease";
                  e.currentTarget.style.transform = "translateY(-5px) scale(1.04)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transition = "transform 0.3s ease";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Request CV
              </button>
            </div>
          </div>

          {/* ── Stats strip ── */}
          <div
            className="about-stats"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              marginTop: 80, paddingTop: 56,
              borderTop: "1px solid rgba(255,255,255,0.06)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 0.9s, transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.9s",
            }}
          >
            {STATS.map((s, i) => (
              <div key={s.label} style={{ textAlign: "center", padding: "0 24px 35px", position: "relative" }}>
                {/* Vertical divider between items */}
                {i > 0 && (
                  <div style={{
                    position: "absolute", left: 0, top: 8, bottom: 48, width: 1,
                    background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)",
                  }} />
                )}
                <div className={`stat-reveal-${i}`}>
                  <div style={{
                    fontSize: 64, fontWeight: 800,
                    background: `linear-gradient(135deg, ${colors.purple} 30%, ${colors.accent})`,
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    lineHeight: 1, marginBottom: 4, letterSpacing: -2,
                  }}>
                    <Counter
                      target={s.value.replace("+", "")}
                      suffix={s.value.includes("+") ? "+" : ""}
                      start={visible}
                      delay={1000 + i * 150}
                    />
                  </div>
                  <div style={{
                    width: 32, height: 2, margin: "12px auto 14px",
                    background: `linear-gradient(90deg, ${colors.purple}, ${colors.accent})`,
                    borderRadius: 2, opacity: 0.6,
                  }} />
                  <div style={{ fontSize: 12, color: colors.textMuted, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 2s" }}>
        <Footer />
      </div>
      <CvRequestModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </>
  );
}
