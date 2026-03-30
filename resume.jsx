import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const TIMELINE_DATA = [
  {
    id: "edu-1",
    category: "education",
    title: "University of Peloponnese",
    subtitle: "Electrical and Computer Engineering",
    date: "2022 - Present",
    description:
      "Pursuing a degree in Electrical and Computer Engineering, building a strong foundation in software development, systems design, and engineering principles.",
  },
  {
    id: "exp-1",
    category: "experience",
    title: "Full-Stack Developer & UX/UI Designer",
    subtitle: "Freelance / Independent",
    date: "2024 - Present",
    description:
      "Designing and developing end-to-end web applications with a focus on clean UI/UX, responsive design, and modern tech stacks.",
  },
];

const SKILLS_DATA = [
  {
    category: "Web Development",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "React.js", "Axure RP", "C", "Python"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"],
  },
];

/* ── Intersection Observer hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Timeline Card ── */
function TimelineCard({ item, index, side }) {
  const [ref, visible] = useReveal(0.15);
  const isLeft = side === "left";
  const colorAccent =
    item.category === "education"
      ? { main: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)" }
      : { main: "#38bdf8", bg: "rgba(56,189,248,0.1)", border: "rgba(56,189,248,0.25)" };

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
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) translateX(0)"
          : `translateY(24px) translateX(${isLeft ? "-30px" : "30px"})`,
        transition: `all 0.75s cubic-bezier(.22,1,.36,1) ${index * 0.18}s`,
        boxShadow: visible
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
          color: "#f1f5f9",
          fontFamily: "'Sora', sans-serif",
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
          color: "#94a3b8",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {item.subtitle}
      </p>

      <span
        style={{
          display: "inline-block",
          fontSize: 12,
          color: "#64748b",
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
  const [ref, visible] = useReveal(0.1);

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
          ? "linear-gradient(135deg, #38bdf8, #818cf8)"
          : "rgba(56,189,248,0.08)",
        border: `1px solid ${hovered ? "transparent" : "rgba(56,189,248,0.2)"}`,
        cursor: "default",
        transition: "all 0.3s cubic-bezier(.22,1,.36,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(15px) scale(0.9)",
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

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = Math.max(window.innerHeight, document.documentElement.scrollHeight);
    }
    resize();

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * (w || 1200),
      y: Math.random() * (h || 2000),
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
      pulse: Math.random() * Math.PI * 2,
    }));

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
      animRef.current = requestAnimationFrame(draw);
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
  const [headerRef, headerVisible] = useReveal(0.1);
  const [skillsTitleRef, skillsTitleVisible] = useReveal(0.1);


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          background: #0a0e1a;
          min-height: 100vh;
          overflow-x: hidden;
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
          background: radial-gradient(circle, #38bdf8 30%, rgba(56,189,248,0.3));
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
        <Navbar />

        {/* ── HEADER ── */}
        <div style={{ paddingTop: 130, position: "relative", zIndex: 1 }}>
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
                fontSize: 50,
                fontWeight: 800,
                fontFamily: "'Sora', sans-serif",
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
                fontSize: 21,
                fontWeight: 500,
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 10,
              }}
            >
              Full Stack Developer & UI Designer
            </p>
            <div
              style={{
                width: 60,
                height: 3,
                background: "linear-gradient(90deg, #38bdf8, #818cf8)",
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
                  fontSize: 34,
                  fontWeight: 700,
                  fontFamily: "'Sora', sans-serif",
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
                  background: "linear-gradient(90deg, #38bdf8, #818cf8)",
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
                    color: "#38bdf8",
                    marginBottom: 16,
                    fontFamily: "'Sora', sans-serif",
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
        <Footer accent="#38bdf8" accentEnd="#818cf8" />
      </div>
    </>
  );
}
