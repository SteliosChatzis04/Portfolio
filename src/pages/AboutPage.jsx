import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

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

const SKILLS = [
  { name: "Axure", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "React", icon: "M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" },
  { name: "HTML5/CSS3", icon: "M4 3l1.5 17L12 22l6.5-2L20 3H4zm3.5 4h9l-.3 3H8.2l.2 3h7.8l-.5 5.5L12 19.5l-3.7-1L8 14h2.5l.2 2 1.3.4 1.3-.4.2-2H8.5" },
  { name: "Node.js", icon: "M12 2L3 7v10l9 5 9-5V7l-9-5zm0 4v12M3 7l9 5 9-5" },
  { name: "JavaScript", icon: "M3 3h18v18H3V3zm9.5 14c0 1.1-.9 2-2 2H9v-1.5h1.5c.3 0 .5-.2.5-.5v-4h1.5v4zm5-1c0 1.1-.9 2-2 2h-2v-1.5h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h2V14h-2c-.3 0-.5.2-.5.5s.2.5.5.5h1c.8 0 1.5.7 1.5 1.5" },
  { name: "C", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" },
  { name: "Python", icon: "M12 2c-1.7 0-3 .5-3.8 1.3C7.4 4.1 7 5.2 7 6.5V9h5v1H6.5C4.6 10 3 11.5 3 14s1.6 4 3.5 4H9v-2.5C9 13.6 10.6 12 12.5 12H17c1.4 0 2.5-1.1 2.5-2.5V6.5C19.5 4.3 16.5 2 12 2zm-1.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10v2.5c0 1.9-1.6 3.5-3.5 3.5H9c-1.4 0-2.5 1.1-2.5 2.5v3C6.5 23.7 9.5 24 12 24c1.7 0 3-.5 3.8-1.3.8-.8 1.2-1.9 1.2-3.2V17h-5v-1h5.5c1.9 0 3.5-1.5 3.5-4s-1.6-3-3.5-3H17zm.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
];

const STATS = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
];

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
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const num = parseInt(target);
    if (isNaN(num)) { setVal(target); return; }
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = Math.ceil(num / 40);
        const iv = setInterval(() => {
          start += step;
          if (start >= num) { setVal(num); clearInterval(iv); }
          else setVal(start);
        }, 30);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
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
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');

        .about-section {
          --bg: #0B0F19;
          --surface: #171B2D;
          --surface-border: rgba(255,255,255,0.06);
          --accent: #7B5FFF;
          --accent-glow: rgba(123,95,255,0.15);
          --cyan: #00D4FF;
          --cyan-glow: rgba(0,212,255,0.15);
          --text-primary: #E8E4F0;
          --text-secondary: #9490A8;
          --text-muted: #5E5A70;
          background: var(--bg);
          font-family: 'Outfit', sans-serif;
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
          color: #0B0F19;
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

        .about-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(0,212,255,0.3), 0 0 0 4px rgba(0,212,255,0.1);
        }

        .about-cta:active {
          transform: translateY(0);
        }

        /* ── Stats strip ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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

        .stat-value {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, var(--accent), var(--cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
        }

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
            grid-template-columns: 1fr;
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
                Passionate about creating <em>intuitive digital experiences.</em>
              </h2>

              <p className={`about-body ${visible ? "visible" : ""}`}>
                With a strong background in Computer Engineering and a passion for
                aesthetics, I bridge the gap between complex code and intuitive design.
                I focus on creating user-centric interfaces that solve real problems,
                ensuring that every digital experience is not only functional but also
                visually compelling.
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
                  <Counter target={s.value.replace("+", "")} suffix="+" />
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
