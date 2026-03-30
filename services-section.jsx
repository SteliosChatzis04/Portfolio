import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

/* ════════════════════════════════════════════
   SERVICES SECTION — Stelios Ch. Portfolio
   
   Design system:
   - Background: #0B0F19
   - Font: Sora
   - Accent gradient: #38bdf8 → #818cf8
   - Heading gradient: #f1f5f9 → #cbd5e1
   - Cards: frosted glass, backdrop-blur
   - Animations: scroll-triggered, cubic-bezier(.22,1,.36,1)
   ════════════════════════════════════════════ */

const SERVICES = [
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive interfaces through user research, wireframing, and iterative prototyping — always grounded in real user needs.",
    icon: "design",
  },
  {
    title: "Web Development",
    description:
      "Building responsive, performant websites with React, clean architecture, and modern tooling — from concept to deployment.",
    icon: "code",
  },
  {
    title: "Prototyping",
    description:
      "Creating high-fidelity interactive mockups in Axure RP and Figma to validate ideas and align stakeholders before development.",
    icon: "prototype",
  },
];

const WORKFLOW = [
  {
    step: "Discover",
    detail: "Research users, audit competitors, define problems worth solving.",
  },
  {
    step: "Define",
    detail: "Synthesize insights into clear goals, personas, and success metrics.",
  },
  {
    step: "Design",
    detail: "Iterate from wireframes to polished UI with continuous user feedback.",
  },
  {
    step: "Deliver",
    detail: "Build, test, and ship — then measure, learn, and refine.",
  },
];

/* ── Icons as inline SVG ── */
function ServiceIcon({ type, size = 56 }) {
  const circleStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    border: "2px solid #38bdf8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(56, 189, 248, 0.06)",
    flexShrink: 0,
  };

  if (type === "design") {
    return (
      <div style={circleStyle}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
          <circle cx="16" cy="15" r="2" />
        </svg>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div style={circleStyle}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      </div>
    );
  }

  /* prototype — layers/device icon */
  return (
    <div style={circleStyle}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
        <path d="M9 6h6" />
        <path d="M9 10h6" />
        <path d="M9 14h4" />
      </svg>
    </div>
  );
}

/* ── Scroll-triggered animation hook ── */
function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ── Single service card ── */
function ServiceCard({ service, index }) {
  const [ref, visible] = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(56, 189, 248, 0.04)"
          : "rgba(255, 255, 255, 0.02)",
        border: hovered
          ? "1px solid rgba(56, 189, 248, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.06)",
        borderRadius: 16,
        padding: "40px 32px 36px",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 20,
        cursor: "default",
        transition: "all 0.5s cubic-bezier(.22,1,.36,1)",
        transform: visible
          ? hovered
            ? "translateY(-8px)"
            : "translateY(0)"
          : "translateY(30px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(56,189,248,0.06)"
          : "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <ServiceIcon type={service.icon} />

      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: "#e2e8f0",
          fontFamily: "'Sora', sans-serif",
          letterSpacing: "-0.01em",
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "#94a3b8",
          fontFamily: "'Sora', sans-serif",
          maxWidth: 260,
        }}
      >
        {service.description}
      </p>
    </div>
  );
}

/* ── Workflow step ── */
function WorkflowStep({ step, index, total }) {
  const [ref, visible] = useScrollReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s cubic-bezier(.22,1,.36,1)`,
        transitionDelay: `${index * 150 + 300}ms`,
      }}
    >
      {/* Step node */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          cursor: "default",
        }}
      >
        {/* Circle */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            border: "2px solid #38bdf8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: hovered
              ? "rgba(56,189,248,0.12)"
              : "rgba(56,189,248,0.04)",
            transition: "all 0.35s ease",
            boxShadow: hovered
              ? "0 0 24px rgba(56,189,248,0.25)"
              : "0 0 0 rgba(56,189,248,0)",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#38bdf8",
              fontFamily: "'Sora', sans-serif",
            }}
          >
            0{index + 1}
          </span>
        </div>

        {/* Label */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#38bdf8",
            fontFamily: "'Sora', sans-serif",
            letterSpacing: "0.02em",
          }}
        >
          {step.step}
        </span>

        {/* Tooltip on hover */}
        <div
          style={{
            position: "absolute",
            top: -62,
            left: "50%",
            transform: `translateX(-50%) ${hovered ? "translateY(0)" : "translateY(8px)"}`,
            opacity: hovered ? 1 : 0,
            pointerEvents: "none",
            transition: "all 0.3s ease",
            background: "#1e293b",
            border: "1px solid rgba(56,189,248,0.2)",
            borderRadius: 10,
            padding: "10px 16px",
            width: 220,
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <p
            style={{
              fontSize: 12,
              lineHeight: 1.5,
              color: "#94a3b8",
              fontFamily: "'Sora', sans-serif",
              margin: 0,
            }}
          >
            {step.detail}
          </p>
          {/* Arrow */}
          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: 12,
              height: 12,
              background: "#1e293b",
              borderRight: "1px solid rgba(56,189,248,0.2)",
              borderBottom: "1px solid rgba(56,189,248,0.2)",
            }}
          />
        </div>
      </div>

      {/* Connector line */}
      {index < total - 1 && (
        <div
          style={{
            width: 60,
            height: 2,
            background: "linear-gradient(90deg, #38bdf8, #818cf8)",
            opacity: 0.4,
            margin: "0 4px",
            marginBottom: 30,
            borderRadius: 1,
          }}
        />
      )}
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════ */
export default function ServicesSection() {
  const [headingRef, headingVisible] = useScrollReveal(0.2);
  const [workflowHeadingRef, workflowHeadingVisible] = useScrollReveal(0.2);
  const [ctaRef, ctaVisible] = useScrollReveal(0.2);

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <section
        style={{
          minHeight: "100vh",
          background: "#0B0F19",
          fontFamily: "'Sora', sans-serif",
          padding: "100px 40px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── Section heading ── */}
          <div
            ref={headingRef}
            style={{
              textAlign: "center",
              marginBottom: 64,
              opacity: headingVisible ? 1 : 0,
              transform: headingVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <h2
              style={{
                fontSize: 38,
                fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
                background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 12,
              }}
            >
              What I Do
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

          {/* ── Service cards grid ── */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 28,
              marginBottom: 90,
            }}
          >
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

          {/* ── Workflow heading ── */}
          <div
            ref={workflowHeadingRef}
            style={{
              textAlign: "center",
              marginBottom: 48,
              opacity: workflowHeadingVisible ? 1 : 0,
              transform: workflowHeadingVisible
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <h2
              style={{
                fontSize: 30,
                fontWeight: 700,
                fontFamily: "'Sora', sans-serif",
                background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 12,
              }}
            >
              My Workflow
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

          {/* ── Workflow steps ── */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 0,
              marginBottom: 80,
            }}
          >
            {WORKFLOW.map((step, i) => (
              <WorkflowStep
                key={step.step}
                step={step}
                index={i}
                total={WORKFLOW.length}
              />
            ))}
          </div>

          {/* ── CTA ── */}
          <div
            ref={ctaRef}
            style={{
              textAlign: "center",
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "200ms",
            }}
          >
            <Link
              to="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 36px",
                borderRadius: 100,
                background: "linear-gradient(135deg, #38bdf8, #818cf8)",
                color: "#0B0F19",
                fontSize: 15,
                fontWeight: 600,
                fontFamily: "'Sora', sans-serif",
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "all 0.35s ease",
                boxShadow: "0 4px 20px rgba(56,189,248,0.25)",
              }}
            >
              Let's Work Together
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
          <Footer />
    </>
  );
}
