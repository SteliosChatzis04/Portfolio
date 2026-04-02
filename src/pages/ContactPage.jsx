import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer.jsx";

/* ════════════════════════════════════════════
   CONTACT SECTION — Stelios Ch. Portfolio

   Design system:
   - Background: #0B0F19
   - Font: Sora
   - Accent gradient: #38bdf8 → #818cf8
   - Heading gradient: #f1f5f9 → #cbd5e1
   - Cards: frosted glass, backdrop-blur
   - Animations: scroll-triggered, cubic-bezier(.22,1,.36,1)
   ════════════════════════════════════════════ */

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

/* ── Icons ── */
function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GithubIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="m22 2-11 11" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ── Main Component ── */
export default function ContactSection() {
  const [headerRef, headerVisible] = useReveal(0.2);
  const [infoRef, infoVisible] = useReveal(0.15);
  const [formRef, formVisible] = useReveal(0.1);
  const [footerRef, footerVisible] = useReveal(0.3);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [hoverBtn, setHoverBtn] = useState(false);
  const [hoverGithub, setHoverGithub] = useState(false);

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const getFieldState = (field) => {
    if (!touched[field]) return "idle";
    if (field === "name") return formData.name.trim().length > 0 ? "valid" : "error";
    if (field === "email") return isValidEmail(formData.email) ? "valid" : "error";
    if (field === "message") return formData.message.trim().length > 10 ? "valid" : "error";
    return "idle";
  };

  const canSubmit =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.message.trim().length > 10;

  const handleSubmit = () => {
    setTouched({ name: true, email: true, message: true });
    if (canSubmit) setSubmitted(true);
  };

  const borderForState = (field) => {
    const s = getFieldState(field);
    if (focused === field) return "1px solid #38bdf8";
    if (s === "valid") return "1px solid rgba(74,222,128,0.4)";
    if (s === "error") return "1px solid rgba(248,113,113,0.5)";
    return "1px solid rgba(255,255,255,0.08)";
  };

  const shadowForState = (field) => {
    if (focused === field) return "0 0 0 3px rgba(56,189,248,0.12), inset 0 1px 2px rgba(0,0,0,0.3)";
    return "inset 0 1px 2px rgba(0,0,0,0.3)";
  };

  const inputBase = {
    width: "100%",
    boxSizing: "border-box",
    padding: "14px 16px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(8px)",
    color: "#e2e8f0",
    fontSize: 14,
    fontFamily: "'Sora', sans-serif",
    outline: "none",
    transition: "all 0.3s ease",
    letterSpacing: "0.01em",
  };

  /* ── Render ── */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        ::placeholder { color: rgba(148,163,184,0.5); font-family: 'Sora', sans-serif; }
        textarea::-webkit-scrollbar { width: 6px; }
        textarea::-webkit-scrollbar-track { background: transparent; }
        textarea::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 3px; }
        textarea::-webkit-scrollbar-thumb:hover { background: rgba(56,189,248,0.4); }

        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(0.97); }
          66% { transform: translate(20px, -10px) scale(1.03); }
        }
        @keyframes successPulse {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <section
        id="contact"
        style={{
          position: "relative",
          background: "#0B0F19",
          fontFamily: "'Sora', sans-serif",
          padding: "100px 24px 0",
          overflow: "hidden",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Decorative orbs ── */}
        <div style={{
          position: "absolute", top: "15%", left: "-5%", width: 350, height: 350,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
          animation: "floatOrb1 12s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "-8%", width: 400, height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%)",
          animation: "floatOrb2 15s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* ── Content container ── */}
        <div style={{
          maxWidth: 1000,
          width: "100%",
          margin: "0 auto",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}>

          {/* ── Section header ── */}
          <div
            ref={headerRef}
            style={{
              textAlign: "center",
              marginBottom: 60,
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
            }}
          >
            <h2 style={{
              fontSize: "clamp(32px, 5vw, 44px)",
              fontWeight: 700,
              background: "linear-gradient(135deg, #f1f5f9, #cbd5e1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
              marginBottom: 12,
            }}>
              Let's Work Together
            </h2>
            <div style={{
              width: 50,
              height: 3,
              borderRadius: 2,
              background: "linear-gradient(90deg, #38bdf8, #818cf8)",
              margin: "0 auto 20px",
            }} />
            <p style={{
              color: "#94a3b8",
              fontSize: 15,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}>
              Have a project in mind? I'd love to hear about it. Fill out the form below or reach out directly — let's create something great.
            </p>
          </div>

          {/* ── Two-column layout ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: 40,
            alignItems: "start",
          }}>

            {/* ── Left: Contact info ── */}
            <div
              ref={infoRef}
              style={{
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? "translateY(0)" : "translateY(25px)",
                transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
                transitionDelay: "100ms",
              }}
            >
              <div style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                padding: "36px 30px",
              }}>
                <h3 style={{
                  color: "#e2e8f0",
                  fontSize: 18,
                  fontWeight: 600,
                  marginBottom: 8,
                  letterSpacing: "-0.01em",
                }}>
                  Get in Touch
                </h3>
                <p style={{
                  color: "#64748b",
                  fontSize: 13,
                  lineHeight: 1.6,
                  marginBottom: 32,
                }}>
                  I'm currently available for freelance work and open to discussing new projects and opportunities.
                </p>

                {/* ── Email ── */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <EmailIcon />
                  </div>
                  <div>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Email</div>
                    <a href="mailto:your.email@example.com" style={{
                      color: "#e2e8f0", fontSize: 14, textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}>
                      your.email@example.com
                    </a>
                  </div>
                </div>

                {/* ── Location ── */}
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 36 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: "rgba(56,189,248,0.08)",
                    border: "1px solid rgba(56,189,248,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <LocationIcon />
                  </div>
                  <div>
                    <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 3 }}>Location</div>
                    <span style={{ color: "#e2e8f0", fontSize: 14 }}>Piraeus, Greece</span>
                  </div>
                </div>

                {/* ── Divider ── */}
                <div style={{
                  height: 1,
                  background: "linear-gradient(90deg, transparent, rgba(56,189,248,0.15), transparent)",
                  marginBottom: 28,
                }} />

                {/* ── Social ── */}
                <div>
                  <div style={{ color: "#64748b", fontSize: 11, fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>
                    Find Me On
                  </div>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setHoverGithub(true)}
                    onMouseLeave={() => setHoverGithub(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 18px",
                      borderRadius: 10,
                      background: hoverGithub ? "rgba(56,189,248,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${hoverGithub ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)"}`,
                      color: hoverGithub ? "#38bdf8" : "#94a3b8",
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "'Sora', sans-serif",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                    }}
                  >
                    <GithubIcon size={18} />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* ── Right: Contact form ── */}
            <div
              ref={formRef}
              style={{
                opacity: formVisible ? 1 : 0,
                transform: formVisible ? "translateY(0)" : "translateY(25px)",
                transition: "all 0.8s cubic-bezier(.22,1,.36,1)",
                transitionDelay: "250ms",
              }}
            >
              {!submitted ? (
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "36px 30px",
                }}>
                  {/* Name */}
                  <div style={{ marginBottom: 20, position: "relative" }}>
                    <label style={{
                      display: "block", color: "#94a3b8", fontSize: 12,
                      fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em",
                    }}>
                      Your Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        onFocus={() => setFocused("name")}
                        onBlur={() => { setFocused(null); setTouched({ ...touched, name: true }); }}
                        style={{
                          ...inputBase,
                          border: borderForState("name"),
                          boxShadow: shadowForState("name"),
                          paddingRight: getFieldState("name") === "valid" ? 40 : 16,
                        }}
                      />
                      {getFieldState("name") === "valid" && (
                        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                    {getFieldState("name") === "error" && (
                      <div style={{ color: "#f87171", fontSize: 11, marginTop: 6, fontWeight: 400 }}>
                        Please enter your name
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 20, position: "relative" }}>
                    <label style={{
                      display: "block", color: "#94a3b8", fontSize: 12,
                      fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em",
                    }}>
                      Your Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onFocus={() => setFocused("email")}
                        onBlur={() => { setFocused(null); setTouched({ ...touched, email: true }); }}
                        style={{
                          ...inputBase,
                          border: borderForState("email"),
                          boxShadow: shadowForState("email"),
                          paddingRight: getFieldState("email") === "valid" ? 40 : 16,
                        }}
                      />
                      {getFieldState("email") === "valid" && (
                        <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                          <CheckIcon />
                        </div>
                      )}
                    </div>
                    {getFieldState("email") === "error" && (
                      <div style={{ color: "#f87171", fontSize: 11, marginTop: 6, fontWeight: 400 }}>
                        Please enter a valid email address
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28, position: "relative" }}>
                    <label style={{
                      display: "block", color: "#94a3b8", fontSize: 12,
                      fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em",
                    }}>
                      Tell Me About Your Project
                    </label>
                    <div style={{ position: "relative" }}>
                      <textarea
                        rows={5}
                        placeholder="Describe your project, goals, and timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        onFocus={() => setFocused("message")}
                        onBlur={() => { setFocused(null); setTouched({ ...touched, message: true }); }}
                        style={{
                          ...inputBase,
                          resize: "vertical",
                          minHeight: 130,
                          border: borderForState("message"),
                          boxShadow: shadowForState("message"),
                          lineHeight: 1.6,
                        }}
                      />
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6,
                    }}>
                      {getFieldState("message") === "error" ? (
                        <div style={{ color: "#f87171", fontSize: 11, fontWeight: 400 }}>
                          Please add more detail (at least 10 characters)
                        </div>
                      ) : <div />}
                      <div style={{ color: "#475569", fontSize: 11 }}>
                        {formData.message.length} chars
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setHoverBtn(true)}
                    onMouseLeave={() => setHoverBtn(false)}
                    style={{
                      width: "100%",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 10,
                      padding: "15px 32px",
                      borderRadius: 12,
                      border: "none",
                      background: hoverBtn
                        ? "linear-gradient(135deg, #38bdf8, #6366f1)"
                        : "linear-gradient(135deg, #38bdf8, #818cf8)",
                      color: "#0B0F19",
                      fontSize: 15,
                      fontWeight: 600,
                      fontFamily: "'Sora', sans-serif",
                      letterSpacing: "0.02em",
                      cursor: "pointer",
                      transition: "all 0.35s ease",
                      boxShadow: hoverBtn
                        ? "0 8px 30px rgba(56,189,248,0.35)"
                        : "0 4px 20px rgba(56,189,248,0.2)",
                      transform: hoverBtn ? "translateY(-2px)" : "translateY(0)",
                    }}
                  >
                    Send Message
                    <SendIcon />
                  </button>
                </div>
              ) : (
                /* ── Success state ── */
                <div style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(74,222,128,0.15)",
                  borderRadius: 16,
                  padding: "60px 30px",
                  textAlign: "center",
                  animation: "successPulse 0.5s ease-out",
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: "rgba(74,222,128,0.1)",
                    border: "2px solid rgba(74,222,128,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 24px",
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{
                    color: "#e2e8f0", fontSize: 22, fontWeight: 600,
                    marginBottom: 10, letterSpacing: "-0.01em",
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, maxWidth: 320, margin: "0 auto 28px" }}>
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                      setTouched({});
                    }}
                    style={{
                      padding: "10px 24px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.04)",
                      color: "#94a3b8",
                      fontSize: 13,
                      fontWeight: 500,
                      fontFamily: "'Sora', sans-serif",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
          <Footer />
    </>
  );
}
