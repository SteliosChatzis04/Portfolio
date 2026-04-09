import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { colors, fonts } from "../tokens.js";

const NAV_LINKS = [
  ["Home",      "/"],
  ["Portfolio", "/portfolio"],
  ["Services",  "/services"],
  ["About",     "/about"],
  ["Contact",   "/contact"],
];

function HamburgerIcon({ open }) {
  const bar = (transform, opacity = 1) => (
    <span style={{
      display: "block", width: "22px", height: "2px",
      background: colors.textPrimary, borderRadius: "2px",
      transition: "all 0.3s ease",
      transform, opacity,
    }} />
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {bar(open ? "translateY(7px) rotate(45deg)"  : "none")}
      {bar("none", open ? 0 : 1)}
      {bar(open ? "translateY(-7px) rotate(-45deg)" : "none")}
    </div>
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const activePath = location.pathname;

  /* ── scroll detection ── */
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ── close menu on route change ── */
  useEffect(() => { setMenuOpen(false); }, [activePath]);

  /* ── lock body scroll while menu is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = (path) => { navigate(path); setMenuOpen(false); };

  return (
    <>
      <style>{`
        .nb-nav     { padding: 12px 48px !important; }
        .nb-desktop { display: flex !important; }
        .nb-burger  { display: none !important; }

        @media (max-width: 768px) {
          .nb-nav     { padding: 12px 20px !important; }
          .nb-desktop { display: none !important; }
          .nb-burger  { display: flex !important; }
        }

        .nb-mob-btn {
          background: none; border: none;
          color: ${colors.textPrimary}; font-family: ${fonts.body};
          font-size: 28px; font-weight: 500;
          cursor: pointer; letter-spacing: 0.5px;
          transition: color 0.2s; padding: 10px 0;
        }
        .nb-mob-btn:hover, .nb-mob-btn.active { color: ${colors.accent}; }

        .nb-mob-resume {
          border: 1px solid rgba(0,229,255,0.4); border-radius: 8px;
          background: none; color: ${colors.accent};
          font-family: ${fonts.body}; font-size: 20px; font-weight: 500;
          cursor: pointer; padding: 10px 32px;
          transition: background 0.2s; margin-top: 12px;
        }
        .nb-mob-resume:hover { background: rgba(0,229,255,0.1); }
      `}</style>

      {/* ── Fixed bar ── */}
      <nav
        className="nb-nav"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          display: "flex", justifyContent: "flex-end", alignItems: "center",
          background: scrolled ? "rgba(8,14,28,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          transition: "all 0.4s ease",
          borderBottom: scrolled ? `1px solid ${colors.border}` : "1px solid transparent",
        }}
      >
        {/* Desktop links */}
        <div
          className="nb-desktop"
          style={{ gap: "32px", alignItems: "center" }}
        >
          {NAV_LINKS.map(([label, path]) => {
            const isActive = activePath === path;
            return (
              <button
                key={path}
                onClick={() => handleNav(path)}
                style={{
                  background: "none", border: "none",
                  color: isActive ? colors.accent : colors.textPrimary,
                  fontFamily: fonts.body, fontSize: "14px",
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer", letterSpacing: "0.5px",
                  transition: "color 0.3s", padding: "4px 0", position: "relative",
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = colors.accent; }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = colors.textPrimary; }}
              >
                {label}
                {isActive && (
                  <span style={{ position: "absolute", bottom: "-2px", left: 0, right: 0, height: "2px", background: colors.accent, borderRadius: "1px" }} />
                )}
              </button>
            );
          })}
          <button
            onClick={() => handleNav("/resume")}
            style={{
              background: "none", border: "1px solid rgba(0,229,255,0.35)", borderRadius: "6px",
              color: colors.accent, fontFamily: fonts.body, fontSize: "14px",
              fontWeight: 500, cursor: "pointer", letterSpacing: "0.5px",
              padding: "4px 14px", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,229,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
          >
            Resume
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nb-burger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "8px", alignItems: "center", justifyContent: "center",
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 99,
          background: "rgba(8,14,28,0.97)",
          backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 4,
          opacity:       menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {NAV_LINKS.map(([label, path]) => (
          <button
            key={path}
            className={`nb-mob-btn${activePath === path ? " active" : ""}`}
            onClick={() => handleNav(path)}
          >
            {label}
          </button>
        ))}
        <button className="nb-mob-resume" onClick={() => handleNav("/resume")}>
          Resume
        </button>
      </div>
    </>
  );
}
