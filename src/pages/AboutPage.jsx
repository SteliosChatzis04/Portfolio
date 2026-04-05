import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { stats as STATS, skills as SKILLS } from "../data/about.js";
import { colors, fonts } from "../tokens.js";

/* ════════════════════════════════════════════════════════════
   ABOUT SECTION — Stelios Chatzisavramidis Portfolio

   Design system (matches portfolio-section.jsx):
   - Background:  #0B0F19
   - Surfaces:    #171B2D / #1E2236
   - Accent:      #7B5FFF (purple) / #00D4FF (cyan CTA)
   - Font:        Outfit (Google Fonts)
   - Card borders: rgba(255,255,255,0.06)

   Replace the SVG placeholder with your actual image
   by swapping <AboutImage /> for an <img> tag.
   ════════════════════════════════════════════════════════════ */


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
        {/* dot grid pattern */}
        {Array.from({ length: 20 }).map((_, r) =>
          Array.from({ length: 26 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={c * 20 + 10} cy={r * 20 + 10} r="1" fill="rgba(123,95,255,0.15)" />
          ))
        )}
        {/* workspace illustration */}
        <rect x="60" y="50" width="200" height="140" rx="8" fill="rgba(123,95,255,0.12)" stroke="rgba(123,95,255,0.25)" strokeWidth="1" />
        <rect x="70" y="60" width="60" height="40" rx="4" fill="rgba(255,200,50,0.3)" />
        <rect x="140" y="60" width="60" height="40" rx="4" fill="rgba(0,212,255,0.2)" />
        <rect x="70" y="110" width="180" height="8" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect x="70" y="126" width="140" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
        <rect x="70" y="142" width="160" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
        {/* sticky notes */}
        <rect x="280" y="60" width="80" height="80" rx="4" fill="rgba(255,200,50,0.4)" transform="rotate(-5 320 100)" />
        <rect x="340" y="90" width="80" height="80" rx="4" fill="rgba(123,95,255,0.3)" transform="rotate(3 380 130)" />
        <rect x="300" y="160" width="80" height="80" rx="4" fill="rgba(0,212,255,0.25)" transform="rotate(-2 340 200)" />
        {/* hand / pen sketch */}
        <path d="M200 280 Q220 260 240 270 Q260 280 250 300 Q240 320 220 310 Z" fill="rgba(210,170,140,0.5)" />
        <line x1="240" y1="265" x2="300" y2="220" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        {/* label */}
        <text x="260" y="370" textAnchor="middle" fill="rgba(123,95,255,0.4)" fontSize="13" fontFamily="Outfit, sans-serif" fontWeight="500" letterSpacing="2">YOUR IMAGE HERE</text>
      </g>
    </svg>
  );
}

/* ── Animated counter ── */
function Counter({ target, suffix = "", start = false }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    const num = parseInt(target);
    if (isNaN(num)) { setVal(target); return; }
    started.current = true;
    const from = 0;
    let startTime = null;
    const duration = 1600;
    const tick = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(2, -10 * progress);
      setVal(Math.round(from + eased * (num - from)));
      if (progress < 1) requestAnimationFrame(tick);
      else setVal(num);
    };
    requestAnimationFrame(tick);
  }, [start, target]);

  return <span>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .about-section {
          --bg: ${colors.bg};
          --surface: #171B2D;
          --surface-border: rgba(255,255,255,0.06);
          --accent: ${colors.purple};
          --accent-glow: rgba(123,95,255,0.15);
          --cyan: ${colors.accent};
          --cyan-glow: rgba(0,212,255,0.15);
          --text-primary: ${colors.textPrimary};
          --text-secondary: ${colors.textSecondary};
          --text-muted: #5E5A70;
          background: var(--bg);
          font-family: ${fonts.body};
          color: var(--text-primary);
          padding: 100px 0 60px;
          position: relative;
          overflow: hidden;
        }

        .about-section::before {
          content: '';
          position: absolute;
          top: -200px;
          right: -200px;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .about-section::after {
          content: '';
          position: absolute;
          bottom: -150px;
          left: -150px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--cyan-glow) 0%, transparent 70%);
          pointer-events: none;
        }

        .about-container {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 64px;
          align-items: center;
        }

        .about-image-wrapper {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 13/10;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 40px var(--accent-glow);
          opacity: 0;
          transform: translateX(-40px);
          transition: all 0.8s cubic-bezier(0.22,1,0.36,1);
        }

        .about-image-wrapper.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* decorative frame accent */
        .about-image-wrapper::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 18px;
          background: linear-gradient(135deg, var(--accent), transparent 50%, var(--cyan), transparent);
          opacity: 0.3;
          z-index: -1;
        }

        .about-label {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: var(--accent);
          margin-bottom: 16px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s;
        }

        .about-label.visible { opacity: 1; transform: translateY(0); }

        .about-heading {
          font-size: clamp(28px, 3.2vw, 42px);
          font-weight: 700;
          line-height: 1.2;
          color: var(--text-primary);
          margin: 0 0 24px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s;
        }

        .about-heading.visible { opacity: 1; transform: translateY(0); }

        .about-heading em {
          font-style: normal;
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .about-body {
          font-size: 16px;
          line-height: 1.75;
          color: var(--text-secondary);
          margin: 0 0 36px;
          max-width: 520px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s;
        }

        .about-body.visible { opacity: 1; transform: translateY(0); }

        /* ── Skill pills ── */
        .skills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 36px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.65s;
        }

        .skills-row.visible { opacity: 1; transform: translateY(0); }

        .skill-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          border-radius: 100px;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: default;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .skill-pill::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-pill:hover {
          border-color: var(--accent);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px var(--accent-glow);
        }

        .skill-pill:hover::before {
          opacity: 0.12;
        }

        .skill-pill svg {
          width: 16px;
          height: 16px;
          position: relative;
          z-index: 1;
        }

        .skill-pill span {
          position: relative;
          z-index: 1;
        }

        /* ── CTA button ── */
        .about-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
          border-radius: 100px;
          background: linear-gradient(135deg, var(--cyan), #0099CC);
          color: ${colors.bg};
          font-size: 15px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px var(--cyan-glow), 0 0 0 0 var(--cyan-glow);
          opacity: 0;
          transform: translateY(20px);
          text-decoration: none;
        }

        .about-cta.visible {
          opacity: 1;
          transform: translateY(0);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.8s;
        }

        @keyframes btnShimmer { 0% { left: -75% } 100% { left: 125% } }
        .about-cta { overflow: hidden !important; }
        .about-cta::after { content: ''; position: absolute; top: -50%; left: -75%; width: 50%; height: 200%; background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.22) 50%, transparent 60%); pointer-events: none; }
        .about-cta:hover::after { animation: btnShimmer 0.65s ease forwards; }

        .about-cta:hover {
          transform: translateY(-5px) scale(1.04);
        }

        .about-cta:active {
          transform: translateY(0) scale(1);
        }

        /* ── Stats strip ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 72px;
          padding-top: 48px;
          border-top: 1px solid var(--surface-border);
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.22,1,0.36,1) 0.9s;
        }

        .stats-strip.visible { opacity: 1; transform: translateY(0); }

        .stat-item {
          text-align: center;
          padding: 24px 16px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid var(--surface-border);
          transition: all 0.3s ease;
        }

        .stat-item:hover {
          border-color: rgba(123,95,255,0.2);
          box-shadow: 0 4px 24px var(--accent-glow);
          transform: translateY(-4px);
        }

        @keyframes statScale {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
          transform: scale(0);
          opacity: 0;
        }

        .stats-strip.visible .stat-item:nth-child(1) .stat-value { animation: statScale 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.95s forwards; }
        .stats-strip.visible .stat-item:nth-child(2) .stat-value { animation: statScale 0.55s cubic-bezier(0.34,1.56,0.64,1) 1.10s forwards; }
        .stats-strip.visible .stat-item:nth-child(3) .stat-value { animation: statScale 0.55s cubic-bezier(0.34,1.56,0.64,1) 1.25s forwards; }
        .stats-strip.visible .stat-item:nth-child(4) .stat-value { animation: statScale 0.55s cubic-bezier(0.34,1.56,0.64,1) 1.40s forwards; }

        .stat-label {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 400;
        }

        /* ── Footer ── */
        .about-footer {
          text-align: center;
          margin-top: 80px;
          padding-top: 32px;
          border-top: 1px solid var(--surface-border);
          font-size: 12px;
          color: var(--text-muted);
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .about-image-wrapper {
            max-width: 400px;
            margin: 0 auto;
          }
          .stats-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          .about-container { padding: 0 20px; }
        }
      `}</style>

      <section className="about-section" ref={sectionRef}>
        <div className="about-container">
          <div className="about-grid">

            {/* ── Left: Image ── */}
            <div className={`about-image-wrapper ${visible ? "visible" : ""}`}>
              <AboutImage />
            </div>

            {/* ── Right: Content ── */}
            <div>
              <div className={`about-label ${visible ? "visible" : ""}`}>
                Who I am
              </div>

              <h2 className={`about-heading ${visible ? "visible" : ""}`}>
                Engineering software <em>with precision and purpose.</em>
              </h2>

              <p className={`about-body ${visible ? "visible" : ""}`}>
                I'm an Electrical and Computer Engineering student at the University
                of Peloponnese, focused on backend systems and software architecture.
                My academic path spans data structures, compilers, distributed systems,
                and full-stack development — building the depth to approach software
                problems with rigour and clarity. I favour spec-driven development and
                clean architecture, and I build at every layer of the stack.
              </p>

              <div className={`skills-row ${visible ? "visible" : ""}`}>
                {SKILLS.map((skill, i) => (
                  <div
                    key={skill.name}
                    className="skill-pill"
                    onMouseEnter={() => setHoveredSkill(i)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    style={{ transitionDelay: `${i * 0.04}s` }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke={hoveredSkill === i ? "#fff" : "#7B5FFF"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.3s" }}>
                      <path d={skill.icon} />
                    </svg>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>

              <Link to="/resume" className={`about-cta ${visible ? "visible" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                View CV
              </Link>
            </div>
          </div>

          {/* ── Stats ── */}
          <div className={`stats-strip ${visible ? "visible" : ""}`}>
            {STATS.map((s) => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">
                  <Counter target={s.value.replace("+", "")} suffix="+" start={visible} />
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>

        </div>
      </section>
          <Footer />
    </>
  );
}
