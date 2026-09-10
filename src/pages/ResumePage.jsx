import { useState, useRef, useEffect } from "react";
import useOnScreen from "../hooks/useOnScreen.js";
import { colors, fonts } from "../tokens.js";
import Footer from "../components/Footer.jsx";
import { timeline as TIMELINE_DATA, skillCategories as SKILLS_DATA } from "../data/resume.js";

/* ── Timeline Card ── */
function TimelineCard({ item, index, side }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
  const isLeft = side === "left";
  const colorAccent =
    item.category === "education"
      ? { main: colors.purple, bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)" }
      : { main: colors.sky, bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.25)" };

  return (
    <div
      ref={ref}
      className="timeline-card"
      style={{
        background: "linear-gradient(145deg, rgba(15,23,42,0.97), rgba(30,41,59,0.9))",
        border: "1px solid rgba(56,189,248,0.12)",
        borderRadius: 18,
        padding: "30px 32px 28px",
        position: "relative",
        backdropFilter: "blur(12px)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "translateY(0) translateX(0)"
          : `translateY(24px) translateX(${isLeft ? "-30px" : "30px"})`,
        transition: `all 0.75s cubic-bezier(.22,1,.36,1) ${index * 0.18}s`,
        boxShadow: isVisible
          ? "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)"
          : "none",
        overflow: "hidden",
      }}
    >
      {/* Subtle top-edge glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${colorAccent.main}44, transparent)`,
        }}
      />

      {/* Category pill */}
      <span
        style={{
          display: "inline-block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: colorAccent.main,
          background: colorAccent.bg,
          border: `1px solid ${colorAccent.border}`,
          borderRadius: 20,
          padding: "5px 16px",
          marginBottom: 16,
        }}
      >
        {item.category}
      </span>

      <h3
        style={{
          margin: "0 0 6px",
          fontSize: 21,
          fontWeight: 700,
          color: colors.textPrimary,
          fontFamily: fonts.body,
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {item.title}
      </h3>

      <p
        style={{
          margin: "0 0 8px",
          fontSize: 14,
          color: colors.textSecondary,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.subtitle}
      </p>

      <span
        style={{
          display: "inline-block",
          fontSize: 12,
          color: colors.textMuted,
          marginBottom: 14,
          fontFamily: "'DM Mono', monospace",
          background: "rgba(100,116,139,0.1)",
          padding: "3px 10px",
          borderRadius: 6,
        }}
      >
        {item.date}
      </span>

      <p
        style={{
          margin: 0,
          fontSize: 14.5,
          lineHeight: 1.7,
          color: "#cbd5e1",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

/* ── Skill Chip ── */
function SkillChip({ label, delay }) {
  const [hovered, setHovered] = useState(false);
  const [ref, isVisible] = useOnScreen({ threshold: 0.15 });

  return (
    <span
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "9px 20px",
        borderRadius: 10,
        fontSize: 13.5,
        fontWeight: 600,
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.02em",
        color: hovered ? "#0f172a" : "#e2e8f0",
        background: hovered
          ? `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`
          : "rgba(56,189,248,0.08)",
        border: `1px solid ${hovered ? "transparent" : "rgba(56,189,248,0.2)"}`,
        cursor: "default",
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(15px) scale(0.9)",
        transitionDelay: `${delay}s`,
        boxShadow: hovered ? "0 4px 20px rgba(56,189,248,0.3)" : "none",
      }}
    >
      {label}
    </span>
  );
}

/* ── Particle Background ── */
function ParticlesBg() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let particles = [];

    const seed = () => {
      // Connection lines are O(n²); halving the count on phones quarters that
      // work, and a smaller screen needs fewer particles to look full anyway.
      const count = w < 700 ? 22 : 45;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.25,
        dy: (Math.random() - 0.5) * 0.25,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    function resize() {
      const prevW = w;
      // The canvas is position:fixed, so its box is the viewport — sizing the
      // backing store to scrollHeight both distorted the drawing and allocated
      // a buffer many megabytes larger than anything ever displayed.
      w = window.innerWidth;
      h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Width-only re-seed: mobile URL-bar collapse fires resize on every
      // scroll, and re-seeding there would make the field flicker.
      if (!prevW || Math.abs(w - prevW) > 10) seed();
    }
    resize();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.dx;
        p.y += p.dy;
        p.pulse += 0.012;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        const glow = 0.25 + Math.sin(p.pulse) * 0.15;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + Math.sin(p.pulse) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56,189,248,${glow})`;
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56,189,248,${0.05 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      if (!reduceMotion) animRef.current = requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ── Main Resume Page ── */
export default function ResumePage() {
  const [headerRef, headerVisible] = useOnScreen({ threshold: 0.15 });
  const [skillsTitleRef, skillsTitleVisible] = useOnScreen({ threshold: 0.15 });


  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #0a0e1a;
          min-height: 100vh;
          /* overflow-x is handled on <html> in index.css — setting it here too
             would make body a scroll container and break the navbar's
             window.scrollY listener while this page is mounted. */
        }

        .timeline-card:hover {
          border-color: rgba(56,189,248,0.28) !important;
          box-shadow: 0 12px 48px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.06) !important;
          transform: translateY(-3px) !important;
          transition: all 0.3s ease !important;
        }

        /* ── Timeline grid layout ── */
        .tl-container {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }

        .tl-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, transparent, rgba(56,189,248,0.25) 8%, rgba(56,189,248,0.25) 92%, transparent);
          transform: translateX(-50%);
        }

        .tl-row {
          display: grid;
          grid-template-columns: 1fr 48px 1fr;
          align-items: start;
          position: relative;
          margin-bottom: 56px;
        }
        .tl-row:last-child { margin-bottom: 0; }

        .tl-dot-wrap {
          display: flex;
          justify-content: center;
          padding-top: 32px;
        }
        .tl-dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: radial-gradient(circle, ${colors.sky} 30%, rgba(56,189,248,0.3));
          box-shadow: 0 0 18px rgba(56,189,248,0.45);
          position: relative;
          z-index: 2;
        }
        .tl-dot::after {
          content: '';
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          border: 2px solid rgba(56,189,248,0.2);
          animation: dotPulse 2.8s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0; }
        }

        .tl-card-left { grid-column: 1; }
        .tl-card-right { grid-column: 3; }

        /* connector from dot to card */
        .tl-connector {
          position: absolute;
          top: 39px;
          height: 2px;
          width: 16px;
          z-index: 1;
        }
        .tl-connector-left {
          right: calc(50% + 8px);
          background: linear-gradient(270deg, rgba(56,189,248,0.3), rgba(56,189,248,0.08));
        }
        .tl-connector-right {
          left: calc(50% + 8px);
          background: linear-gradient(90deg, rgba(56,189,248,0.3), rgba(56,189,248,0.08));
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .tl-container { padding: 0 16px 60px; }

          .tl-line {
            left: 20px !important;
            transform: none !important;
          }

          .tl-row {
            display: flex !important;
            flex-direction: row !important;
          }

          .tl-dot-wrap {
            position: absolute;
            left: 12px;
            padding-top: 30px;
            z-index: 3;
          }

          .tl-card-left,
          .tl-card-right {
            margin-left: 48px;
            width: calc(100% - 48px);
          }

          /* Reclaim horizontal room lost to the 48px rail gutter. */
          .timeline-card { padding: 24px 20px 22px !important; }

          .tl-empty { display: none; }
          .tl-connector { display: none; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(15,23,42,0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.3); border-radius: 3px; }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(165deg, #0a0e1a 0%, #0f172a 40%, #0c1222 100%)",
          position: "relative",
          fontFamily: "'DM Sans', sans-serif",
          color: "#e2e8f0",
        }}
      >
        <ParticlesBg />

        {/* ── HEADER ── */}
        <div style={{ paddingTop: "clamp(100px, 16vw, 130px)", position: "relative", zIndex: 1 }}>
          <div
            ref={headerRef}
            style={{
              textAlign: "center",
              maxWidth: 750,
              margin: "0 auto 70px",
              padding: "0 24px",
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <h1
              style={{
                fontSize: "clamp(30px, 7.5vw, 50px)",
                fontWeight: 800,
                fontFamily: fonts.body,
                lineHeight: 1.15,
                marginBottom: 14,
                background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Stelios Chatziavramidis
            </h1>
            <p
              style={{
                fontSize: "clamp(16px, 4.2vw, 21px)",
                fontWeight: 500,
                background: `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 10,
              }}
            >
              Software Engineer & Full-Stack Developer
            </p>
            <div
              style={{
                width: 60,
                height: 3,
                background: `linear-gradient(90deg, ${colors.sky}, ${colors.indigo})`,
                borderRadius: 2,
                margin: "22px auto 0",
              }}
            />
          </div>

          {/* ── TIMELINE ── */}
          <div className="tl-container">
            <div className="tl-line" />

            {TIMELINE_DATA.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.id} className="tl-row">
                  <div className={`tl-connector ${isLeft ? "tl-connector-left" : "tl-connector-right"}`} />

                  {isLeft ? (
                    <>
                      <div className="tl-card-left">
                        <TimelineCard item={item} index={i} side="left" />
                      </div>
                      <div className="tl-dot-wrap">
                        <div className="tl-dot" />
                      </div>
                      <div className="tl-empty" />
                    </>
                  ) : (
                    <>
                      <div className="tl-empty" />
                      <div className="tl-dot-wrap">
                        <div className="tl-dot" />
                      </div>
                      <div className="tl-card-right">
                        <TimelineCard item={item} index={i} side="right" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── SKILLS ── */}
          <div
            style={{
              maxWidth: 800,
              margin: "0 auto 60px",
              padding: "0 24px",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              ref={skillsTitleRef}
              style={{
                textAlign: "center",
                marginBottom: 44,
                opacity: skillsTitleVisible ? 1 : 0,
                transform: skillsTitleVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(26px, 6vw, 34px)",
                  fontWeight: 700,
                  fontFamily: fonts.body,
                  background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: 10,
                }}
              >
                Skills
              </h2>
              <div
                style={{
                  width: 40,
                  height: 3,
                  background: `linear-gradient(90deg, ${colors.sky}, ${colors.indigo})`,
                  borderRadius: 2,
                  margin: "0 auto",
                }}
              />
            </div>

            {SKILLS_DATA.map((group, gi) => (
              <div key={group.category} style={{ marginBottom: 36 }}>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: colors.sky,
                    marginBottom: 16,
                    fontFamily: fonts.body,
                  }}
                >
                  {group.category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {group.skills.map((skill, si) => (
                    <SkillChip key={skill} label={skill} delay={gi * 0.1 + si * 0.05} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer accent={colors.sky} accentEnd={colors.indigo} />
      </div>
    </>
  );
}
