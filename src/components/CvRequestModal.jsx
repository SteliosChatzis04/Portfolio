// src/components/CvRequestModal.jsx
import { useState, useEffect } from "react";
import { colors, fonts } from "../tokens.js";

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

const inputBase = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(8px)",
  color: "#e2e8f0",
  fontSize: 14,
  fontFamily: fonts.body,
  outline: "none",
  transition: "all 0.3s ease",
  letterSpacing: "0.01em",
};

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default function CvRequestModal({ open, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", reason: "" });
  const [touched, setTouched] = useState({});
  const [focused, setFocused] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [hoverBtn, setHoverBtn] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({ name: "", email: "", reason: "" });
      setTouched({});
      setFocused(null);
      setLoading(false);
      setSubmitted(false);
      setSubmitError(null);
      setHoverBtn(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const getFieldState = (field) => {
    if (!touched[field]) return "idle";
    if (field === "name") return formData.name.trim().length > 0 ? "valid" : "error";
    if (field === "email") return isValidEmail(formData.email) ? "valid" : "error";
    if (field === "reason") return formData.reason.trim().length >= 10 ? "valid" : "error";
    return "idle";
  };

  const canSubmit =
    formData.name.trim() &&
    isValidEmail(formData.email) &&
    formData.reason.trim().length >= 10;

  const borderForState = (field) => {
    const s = getFieldState(field);
    if (focused === field) return `1px solid ${colors.sky}`;
    if (s === "valid") return "1px solid rgba(74,222,128,0.4)";
    if (s === "error") return "1px solid rgba(248,113,113,0.5)";
    return "1px solid rgba(255,255,255,0.08)";
  };

  const shadowForState = (field) => {
    if (focused === field) return "0 0 0 3px rgba(56,189,248,0.12), inset 0 1px 2px rgba(0,0,0,0.3)";
    return "inset 0 1px 2px rgba(0,0,0,0.3)";
  };

  const handleSubmit = async () => {
    setTouched({ name: true, email: true, reason: true });
    if (!canSubmit) return;
    setHoverBtn(false);
    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CV_ID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        setSubmitted(true);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Couldn't send — please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "36px 30px",
          position: "relative",
          fontFamily: fonts.body,
        }}
      >
        {!submitted ? (
          <>
            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                position: "absolute", top: 16, right: 16,
                background: "none", border: "none", cursor: "pointer",
                color: colors.textMuted, padding: 4, lineHeight: 1,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.textPrimary; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = colors.textMuted; }}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Title */}
            <h3 style={{ color: colors.textPrimary, fontSize: 20, fontWeight: 700, marginBottom: 6, letterSpacing: "-0.01em" }}>
              Request My CV
            </h3>
            <p style={{ color: colors.textMuted, fontSize: 13, lineHeight: 1.6, marginBottom: 28 }}>
              Fill in your details and I'll send my CV directly to your email.
            </p>

            {/* Name */}
            <div style={{ marginBottom: 20, position: "relative" }}>
              <label style={{ display: "block", color: colors.textSecondary, fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em" }}>
                Your Name
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  disabled={loading}
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setFocused("name")}
                  onBlur={() => { setFocused(null); setTouched({ ...touched, name: true }); }}
                  style={{ ...inputBase, border: borderForState("name"), boxShadow: shadowForState("name"), paddingRight: getFieldState("name") === "valid" ? 40 : 16 }}
                />
                {getFieldState("name") === "valid" && (
                  <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                    <CheckIcon />
                  </div>
                )}
              </div>
              {getFieldState("name") === "error" && (
                <div style={{ color: "#f87171", fontSize: 11, marginTop: 6 }}>Please enter your name</div>
              )}
            </div>

            {/* Email */}
            <div style={{ marginBottom: 20, position: "relative" }}>
              <label style={{ display: "block", color: colors.textSecondary, fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em" }}>
                Your Email
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type="email"
                  disabled={loading}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => { setFocused(null); setTouched({ ...touched, email: true }); }}
                  style={{ ...inputBase, border: borderForState("email"), boxShadow: shadowForState("email"), paddingRight: getFieldState("email") === "valid" ? 40 : 16 }}
                />
                {getFieldState("email") === "valid" && (
                  <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                    <CheckIcon />
                  </div>
                )}
              </div>
              {getFieldState("email") === "error" && (
                <div style={{ color: "#f87171", fontSize: 11, marginTop: 6 }}>Please enter a valid email address</div>
              )}
            </div>

            {/* Reason */}
            <div style={{ marginBottom: 28, position: "relative" }}>
              <label style={{ display: "block", color: colors.textSecondary, fontSize: 12, fontWeight: 500, marginBottom: 8, letterSpacing: "0.03em" }}>
                Why are you requesting?
              </label>
              <textarea
                rows={4}
                disabled={loading}
                placeholder="e.g. considering you for a role, reviewing your portfolio…"
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                onFocus={() => setFocused("reason")}
                onBlur={() => { setFocused(null); setTouched({ ...touched, reason: true }); }}
                style={{ ...inputBase, resize: "vertical", minHeight: 110, border: borderForState("reason"), boxShadow: shadowForState("reason"), lineHeight: 1.6, paddingRight: getFieldState("reason") === "valid" ? 40 : 16 }}
              />
              {getFieldState("reason") === "valid" && (
                <div style={{ position: "absolute", right: 14, top: 14 }}>
                  <CheckIcon />
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                {getFieldState("reason") === "error" ? (
                  <div style={{ color: "#f87171", fontSize: 11 }}>Please add a bit more detail (at least 10 characters)</div>
                ) : <div />}
                <div style={{ color: "#475569", fontSize: 11 }}>{formData.reason.length} chars</div>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || !canSubmit}
              onMouseEnter={() => !loading && canSubmit && setHoverBtn(true)}
              onMouseLeave={() => setHoverBtn(false)}
              style={{
                width: "100%", display: "inline-flex", alignItems: "center",
                justifyContent: "center", gap: 10, padding: "15px 32px",
                borderRadius: 12, border: "none",
                background: `linear-gradient(135deg, ${colors.sky}, ${colors.indigo})`,
                color: colors.bg, fontSize: 15, fontWeight: 600,
                fontFamily: fonts.body, letterSpacing: "0.02em",
                cursor: (loading || !canSubmit) ? "not-allowed" : "pointer",
                opacity: (loading || !canSubmit) ? 0.7 : 1,
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                transform: hoverBtn && !loading && canSubmit ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
              }}
            >
              {loading ? "Sending…" : "Send Request"}
              {!loading && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m22 2-7 20-4-9-9-4z" />
                  <path d="m22 2-11 11" />
                </svg>
              )}
            </button>

            {submitError && (
              <div role="alert" style={{ marginTop: 12, color: "#f87171", fontSize: 13, textAlign: "center", lineHeight: 1.5 }}>
                {submitError}
              </div>
            )}
          </>
        ) : (
          /* Success state */
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "rgba(74,222,128,0.1)", border: "2px solid rgba(74,222,128,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>
              Request Sent!
            </h3>
            <p style={{ color: colors.textSecondary, fontSize: 14, lineHeight: 1.6, maxWidth: 300, margin: "0 auto 28px" }}>
              Thanks! I'll send my CV to your email shortly.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: "10px 28px", borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                color: colors.textSecondary, fontSize: 13, fontWeight: 500,
                fontFamily: fonts.body, cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.04)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.color = "#e2e8f0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = colors.textSecondary;
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
