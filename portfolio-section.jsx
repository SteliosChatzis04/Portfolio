import { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/* ════════════════════════════════════════════════════
   DESIGN TOKENS — matching homepage, resume, services
   ════════════════════════════════════════════════════ */
const T = {
  bg: "#0B0F19",
  surface: "#111827",
  cardBg: "rgba(56, 189, 248, 0.04)",
  cardBorder: "rgba(56, 189, 248, 0.10)",
  cardBorderHover: "rgba(56, 189, 248, 0.25)",
  accent1: "#38bdf8",   // cyan
  accent2: "#818cf8",   // indigo
  textPrimary: "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted: "#64748b",
  font: "'Sora', sans-serif",
  radius: 16,
};

/* ════════════════════════════════════════
   PROJECT DATA
   ════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    title: "FinTech Dashboard App",
    tags: ["UI Design", "React"],
    category: "web",
    color: "#38bdf8",
    icon: "chart",
    description:
      "A comprehensive financial analytics dashboard built with React, featuring real-time data visualization, portfolio tracking, and AI-driven market insights.",
    role: "Lead UI Designer & Front-End Developer",
    duration: "3 months",
    tools: ["React", "D3.js", "Figma", "TailwindCSS"],
    challenge:
      "Financial data is inherently complex. The challenge was distilling dense market analytics into intuitive, glanceable views that both novice investors and seasoned traders could navigate with confidence.",
    solution:
      "I designed a modular card-based system with progressive disclosure — surface-level KPIs expand into detailed charts on demand. A custom dark theme reduces eye strain during extended trading sessions, while color-coded indicators provide instant sentiment cues.",
    outcome:
      "The dashboard increased user engagement by 40% and reduced the average time-to-insight from 12 minutes to under 3 minutes during beta testing.",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    tags: ["Web Design", "E-Commerce"],
    category: "web",
    color: "#f472b6",
    icon: "store",
    description:
      "A high-end e-commerce platform for an urban streetwear brand, blending editorial photography with seamless shopping experiences.",
    role: "Web Designer & UX Strategist",
    duration: "2 months",
    tools: ["Figma", "Shopify", "GSAP", "Liquid"],
    challenge:
      "The brand needed a digital storefront that captured the raw energy of street culture while maintaining the polish expected of a premium fashion label.",
    solution:
      "I crafted an editorial-style layout with full-bleed imagery, bold typography, and micro-interactions that echo the kinetic energy of urban environments.",
    outcome:
      "The redesign resulted in a 55% increase in average session duration and a 28% uplift in conversion rate within the first quarter post-launch.",
  },
  {
    id: 3,
    title: "Wanderlust App",
    tags: ["Mobile App", "UX Research"],
    category: "mobile",
    color: "#818cf8",
    icon: "map",
    description:
      "A travel companion mobile app combining intelligent route planning with community-sourced local insights for authentic travel experiences.",
    role: "UX Researcher & Mobile Designer",
    duration: "4 months",
    tools: ["Figma", "Maze", "Miro", "Protopie"],
    challenge:
      "Travelers are overwhelmed by fragmented tools. We needed to unify maps, reviews, bookings, and itineraries into one cohesive experience.",
    solution:
      "Through extensive user research (40+ interviews, diary studies), I designed a context-aware interface that surfaces relevant features based on the traveler's current phase.",
    outcome:
      "User testing showed a 92% task completion rate for itinerary creation. The app achieved a 4.7-star rating within 3 months of soft launch.",
  },
  {
    id: 4,
    title: "EcoBurger Brand",
    tags: ["Branding", "Web Dev"],
    category: "branding",
    color: "#fbbf24",
    icon: "brand",
    description:
      "Complete brand identity and web presence for a sustainable fast-food chain, from logo design to a fully responsive marketing site.",
    role: "Brand Designer & Web Developer",
    duration: "2.5 months",
    tools: ["Illustrator", "Photoshop", "HTML/CSS", "WordPress"],
    challenge:
      "EcoBurger needed to stand out in the crowded fast-food market while authentically communicating its commitment to sustainability.",
    solution:
      "I developed a brand identity that juxtaposes bold, appetite-driven visuals with earthy, organic textures and a playful scroll-driven storytelling approach.",
    outcome:
      "Brand awareness increased 60% in the target demographic within 6 months. The website's bounce rate dropped to 22%, well below the industry average.",
  },
  {
    id: 5,
    title: "ZenMind Yoga",
    tags: ["Mobile App", "Prototyping"],
    category: "mobile",
    color: "#34d399",
    icon: "zen",
    description:
      "A mindfulness and yoga app with guided sessions, progress tracking, and a serene, distraction-free interface for daily wellness.",
    role: "Mobile App Designer & Prototyper",
    duration: "3 months",
    tools: ["Figma", "Protopie", "After Effects", "Lottie"],
    challenge:
      "Wellness apps often feel clinical or overwhelming. The goal was to create a calming digital sanctuary without gamification pressure.",
    solution:
      "I designed a breathing-rhythm-based UI where elements gently pulse in sync with guided breathing. The onboarding adapts to experience level.",
    outcome:
      "The prototype scored 94/100 on usability testing. Daily active retention improved 35% compared to the previous app version.",
  },
  {
    id: 6,
    title: "SmartHome Hub",
    tags: ["UI Design", "IoT"],
    category: "web",
    color: "#a78bfa",
    icon: "home",
    description:
      "A centralized smart home control interface unifying IoT devices into an intuitive, room-based dashboard with automation workflows.",
    role: "UI/UX Designer",
    duration: "3.5 months",
    tools: ["Figma", "React", "Node.js", "MQTT"],
    challenge:
      "Smart home ecosystems are fragmented. The challenge was creating a single pane of glass that's simple yet powerful for advanced automation.",
    solution:
      "I designed a spatial interface organized by rooms with a visual floor plan as primary navigation and a drag-and-drop automation builder.",
    outcome:
      "Beta users reported 70% fewer app switches per day. The automation builder's completion rate hit 88%.",
  },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "web", label: "Web Design" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "branding", label: "Branding" },
];

/* ── SVG icon paths per project type ── */
const ICON_PATHS = {
  chart: (
    <>
      <polyline points="4,18 8,12 12,15 16,8 20,11" fill="none" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth="1" opacity="0.4" />
      <line x1="4" y1="4" x2="4" y2="20" strokeWidth="1" opacity="0.4" />
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
        background: T.bg,
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
            <stop offset="100%" stopColor={T.bg} stopOpacity="1" />
          </radialGradient>
          <linearGradient id={`lg-${project.id}${large ? "L" : ""}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={project.color} stopOpacity="0.06" />
            <stop offset="100%" stopColor={T.accent2} stopOpacity="0.04" />
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
          fontFamily: T.font,
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
          color: T.accent1,
          cursor: "pointer",
          fontFamily: T.font,
          fontSize: 14,
          fontWeight: 500,
          padding: "4px 0",
          marginBottom: 32,
          transition: "opacity .2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <ArrowLeft /> Back to Projects
      </button>

      {/* Hero */}
      <div
        style={{
          borderRadius: T.radius,
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
          fontFamily: T.font,
          fontSize: "clamp(26px, 4vw, 42px)",
          fontWeight: 700,
          background: `linear-gradient(135deg, ${T.textPrimary}, ${T.textSecondary})`,
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
              fontFamily: T.font,
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
              background: T.cardBg,
              border: `1px solid ${T.cardBorder}`,
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: T.accent1,
                fontWeight: 700,
                marginBottom: 8,
                fontFamily: T.font,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: 13,
                color: T.textSecondary,
                lineHeight: 1.55,
                fontFamily: T.font,
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
          color: T.textSecondary,
          fontFamily: T.font,
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
              fontFamily: T.font,
              fontSize: 21,
              fontWeight: 600,
              color: T.textPrimary,
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
                background: `linear-gradient(135deg, ${T.accent1}18, ${T.accent2}18)`,
                color: T.accent1,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: T.font,
                border: `1px solid ${T.accent1}15`,
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
              color: T.textSecondary,
              fontFamily: T.font,
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
          background: T.bg,
          minHeight: "100vh",
          fontFamily: T.font,
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
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section
        style={{
          background: T.bg,
          minHeight: "100vh",
          fontFamily: T.font,
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
            background: `radial-gradient(circle, ${T.accent1}06 0%, transparent 70%)`,
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
                fontFamily: T.font,
                background: `linear-gradient(135deg, ${T.textPrimary}, ${T.textSecondary})`,
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
                background: `linear-gradient(90deg, ${T.accent1}, ${T.accent2})`,
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
                  onClick={() => switchCategory(cat.key)}
                  style={{
                    padding: "9px 24px",
                    borderRadius: 100,
                    border: isActive
                      ? `1px solid ${T.accent1}`
                      : `1px solid rgba(148, 163, 184, 0.15)`,
                    background: isActive
                      ? `linear-gradient(135deg, ${T.accent1}15, ${T.accent2}10)`
                      : "transparent",
                    color: isActive ? T.accent1 : T.textMuted,
                    cursor: "pointer",
                    fontFamily: T.font,
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    transition: "all .3s ease",
                    letterSpacing: ".02em",
                  }}
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
                    borderRadius: T.radius,
                    overflow: "hidden",
                    background: T.cardBg,
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${isH ? T.cardBorderHover : T.cardBorder}`,
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
                        background: `linear-gradient(135deg, ${project.color}CC, ${T.bg}DD)`,
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
                          fontFamily: T.font,
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
                        color: T.textPrimary,
                        fontFamily: T.font,
                        marginBottom: 8,
                      }}
                    >
                      {project.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 12,
                        color: T.textMuted,
                        fontFamily: T.font,
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
