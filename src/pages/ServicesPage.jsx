import { useState, useEffect, useRef } from "react";
import useOnScreen from "../hooks/useOnScreen.js";
import { ServiceIcon } from "../icons.jsx";
import { colors, fonts } from "../tokens.js";
import { Link } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import { services as SERVICES, workflow as WORKFLOW } from "../data/services.js";

/* ── Service card ── */
function ServiceCard({ service, index }) {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(56,189,248,0.04)" : "rgba(255,255,255,0.02)",
        border: hovered ? "1px solid rgba(56,189,248,0.3)" : "1px solid rgba(255,255,255,0.06)",
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
        transform: isVisible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(30px)",
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${index * 120}ms`,
        boxShadow: hovered
          ? "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(56,189,248,0.06)"
          : "0 4px 20px rgba(0,0,0,0.15)",
      }}
    >
      <ServiceIcon type={service.icon} />
      <h3 style={{ fontSize: 20, fontWeight: 600, color: colors.textPrimary, fontFamily: fonts.body, letterSpacing: "-0.01em" }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: colors.textSecondary, fontFamily: fonts.body, maxWidth: 260 }}>
        {service.description}
      </p>
    </div>
  );
}

/* ── Workflow item — alternating left/right, no box ── */
function WorkflowItem({ step, index, reached, isLast, dotRef }) {
  const isLeft = index % 2 === 0;

  const textContent = (
    <div
      className="wf-cell-text"
      style={{
        textAlign: isLeft ? "right" : "left",
        paddingRight: isLeft ? 28 : 0,
        paddingLeft: isLeft ? 0 : 28,
        opacity: reached ? 1 : 0,
        transform: reached ? "translateX(0)" : `translateX(${isLeft ? "-22px" : "22px"})`,
        transition: "opacity 0.75s cubic-bezier(.22,1,.36,1) 0.18s, transform 0.75s cubic-bezier(.22,1,.36,1) 0.18s",
      }}
    >
      <span
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: colors.sky,
          fontFamily: fonts.body,
          marginBottom: 10,
          opacity: 0.8,
        }}
      >
        Step 0{index + 1}
      </span>

      <h3
        style={{
          fontSize: "clamp(28px, 3.8vw, 46px)",
          fontWeight: 800,
          fontFamily: fonts.body,
          background: "linear-gradient(135deg, #f1f5f9 0%, #cbd5e1 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          marginBottom: 14,
        }}
      >
        {step.step}
      </h3>

      <p
        style={{
          fontSize: 14.5,
          lineHeight: 1.8,
          color: "#64748b",
          fontFamily: fonts.body,
          margin: 0,
        }}
      >
        {step.detail}
      </p>
    </div>
  );

  const dotCol = (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 6 }}>
      {/* wrapper gives rings a positioning context */}
      <div style={{ position: "relative" }}>
        <div
          ref={dotRef}
          style={{
            width: 14,
            height: 14,
            borderRadius: "50%",
            position: "relative",
            zIndex: 2,
            background: reached
              ? `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`
              : "rgba(255,255,255,0.1)",
            border: reached
              ? "2px solid rgba(56,189,248,0.5)"
              : "2px solid rgba(255,255,255,0.08)",
            boxShadow: reached
              ? "0 0 18px rgba(56,189,248,0.65), 0 0 40px rgba(56,189,248,0.2)"
              : "none",
            transition: "background 0.5s ease 0.05s, box-shadow 0.5s ease 0.05s, border-color 0.5s ease 0.05s",
          }}
        />
        {reached && (
          <>
            <div className="cp-ring cp-ring-1" />
            <div className="cp-ring cp-ring-2" />
            <div className="cp-ring cp-ring-3" />
          </>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="wf-row"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 48px 1fr",
        alignItems: "start",
        marginBottom: isLast ? 0 : 80,
      }}
    >
      {isLeft ? (
        <>
          <div>{textContent}</div>
          <div>{dotCol}</div>
          <div className="wf-cell-empty" />
        </>
      ) : (
        <>
          <div className="wf-cell-empty" />
          <div>{dotCol}</div>
          <div>{textContent}</div>
        </>
      )}
    </div>
  );
}

/* ════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════ */
export default function ServicesSection() {
  const [headingRef, headingVisible] = useOnScreen({ threshold: 0.2 });
  const [workflowHeadingRef, workflowHeadingVisible] = useOnScreen({ threshold: 0.2 });
  const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.2 });

  /* ── Workflow scroll state ── */
  const wfContainerRef = useRef(null);
  const dotRefs = useRef(WORKFLOW.map(() => null));
  const reachedFlags = useRef(WORKFLOW.map(() => false));
  const [reached, setReached] = useState(WORKFLOW.map(() => false));
  const [wfFillPx, setWfFillPx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const container = wfContainerRef.current;
      if (!container) return;

      const cRect = container.getBoundingClientRect();
      /* Fill front: point 70% down the viewport */
      const fillFront = window.innerHeight * 0.72 - cRect.top;
      const fillPx = Math.max(0, Math.min(fillFront, cRect.height));
      setWfFillPx(fillPx);

      /* Checkpoint detection */
      dotRefs.current.forEach((dotEl, i) => {
        if (!dotEl || reachedFlags.current[i]) return;
        const dRect = dotEl.getBoundingClientRect();
        const dotCenter = dRect.top + dRect.height / 2 - cRect.top;
        if (fillPx >= dotCenter) {
          reachedFlags.current[i] = true;
          setReached(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(30px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        /* Checkpoint ring burst */
        @keyframes cpRing {
          0%   { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(3);   opacity: 0; }
        }

        /*
          Layout: 3-col grid — 1fr | 48px center col | 1fr
          Dot: 14×14, centered in the 48px col → left:17px in col
          Dot center relative to its wrapper: (7,7)
          Ring 38px: left = 7-19 = -12px, top = 7-19 = -12px
        */
        .cp-ring {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 3;
          left: -12px;
          top: -12px;
          width: 38px;
          height: 38px;
          animation: cpRing 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .cp-ring-1 { border: 1.5px solid rgba(56,189,248,0.75); animation-delay: 0ms; }
        .cp-ring-2 { border: 1.5px solid rgba(129,140,248,0.55); animation-delay: 160ms; }
        .cp-ring-3 { border: 1px   solid rgba(56,189,248,0.3);  animation-delay: 310ms; }

        /* Mobile: collapse to left-side single column */
        @media (max-width: 640px) {
          .wf-row { grid-template-columns: 40px 1fr !important; }
          .wf-cell-empty { display: none !important; }
          .wf-cell-text  { text-align: left !important; }
        }
      `}</style>

      {/* ══ SCREEN 1 — What I Do (full viewport) ══ */}
      <section
        style={{
          height: "100vh",
          background: colors.bg,
          fontFamily: fonts.body,
          padding: "0 40px",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 700,
            background: "radial-gradient(circle, rgba(56,189,248,0.04) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1 }}>
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
                fontFamily: fonts.body,
                background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 12,
              }}
            >
              What I Do
            </h2>
            <div style={{ width: 40, height: 3, background: `linear-gradient(90deg, ${colors.sky}, ${colors.indigo})`, borderRadius: 2, margin: "0 auto" }} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} service={service} index={i} />
            ))}
          </div>

        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "fadeInUp 1s ease 1.2s both",
            opacity: 0.5,
          }}
        >
          <span style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "#5a6a84", fontFamily: fonts.body }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${colors.sky}, transparent)` }} />
        </div>
      </section>


      {/* ══ SCREEN 2 — My Workflow ══ */}
      <section
        style={{
          background: colors.bg,
          fontFamily: fonts.body,
          padding: "120px 40px 100px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* Workflow heading */}
          <div
            ref={workflowHeadingRef}
            style={{
              textAlign: "center",
              marginBottom: 80,
              opacity: workflowHeadingVisible ? 1 : 0,
              transform: workflowHeadingVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <h2
              style={{
                fontSize: 30,
                fontWeight: 700,
                fontFamily: fonts.body,
                background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 12,
              }}
            >
              My Workflow
            </h2>
            <div style={{ width: 40, height: 3, background: `linear-gradient(90deg, ${colors.sky}, ${colors.indigo})`, borderRadius: 2, margin: "0 auto" }} />
          </div>

          {/* Workflow timeline */}
          <div
            ref={wfContainerRef}
            style={{
              position: "relative",
              maxWidth: 700,
              margin: "0 auto",
              padding: "0 24px",
            }}
          >
            {/* Line — dull background track, centered */}
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 1px)",
                top: 0,
                bottom: 0,
                width: 2,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 1,
              }}
            />

            {/* Line — gradient fill, scroll-driven */}
            <div
              style={{
                position: "absolute",
                left: "calc(50% - 1px)",
                top: 0,
                width: 2,
                height: wfFillPx,
                background: `linear-gradient(to bottom, ${colors.sky}, ${colors.indigo})`,
                borderRadius: 1,
                transition: "height 0.06s linear",
                boxShadow: wfFillPx > 0 ? "0 0 10px rgba(56,189,248,0.45)" : "none",
              }}
            />

            {WORKFLOW.map((step, i) => (
              <WorkflowItem
                key={step.step}
                step={step}
                index={i}
                reached={reached[i]}
                isLast={i === WORKFLOW.length - 1}
                dotRef={el => { dotRefs.current[i] = el; }}
              />
            ))}
          </div>

          {/* CTA */}
          <div
            ref={ctaRef}
            style={{
              textAlign: "center",
              marginTop: 80,
              opacity: ctaVisible ? 1 : 0,
              transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s cubic-bezier(.22,1,.36,1)",
              transitionDelay: "200ms",
            }}
          >
            <Link
              to="/contact"
              className="btn-cool"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 36px",
                borderRadius: 100,
                background: `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`,
                color: colors.bg,
                fontSize: 15,
                fontWeight: 600,
                fontFamily: fonts.body,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px) scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0) scale(1)"; }}
            >
              Let's Work Together
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
