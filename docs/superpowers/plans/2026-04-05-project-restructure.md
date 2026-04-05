# Portfolio — Full Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor the portfolio codebase for maintainability and separation of concerns without changing any visible behaviour.

**Architecture:** Single `tokens.js` source of truth for design values; all SVG icons centralised in `icons.jsx`; CSS baseline and keyframes in `index.css`; `Home.jsx` split into focused sub-files; all pages use the shared `useOnScreen` hook instead of local duplicates.

**Tech Stack:** React 18, Vite 5, React Router DOM 6 — no new dependencies.

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/tokens.js` | All design tokens |
| Create | `src/index.css` | CSS reset, keyframes, `.btn-cool` |
| Create | `src/icons.jsx` | All SVG icon components + ICON_PATHS |
| Create | `src/router.jsx` | `AnimatedRoutes` extracted from `main.jsx` |
| Modify | `src/main.jsx` | Import CSS + router; remove `AnimatedRoutes` |
| Modify | `index.html` | Add Google Fonts `<link>` |
| Create | `src/components/Button.jsx` | Primary / outline button variants |
| Create | `src/components/SectionHeader.jsx` | h2 + gradient divider |
| Create | `src/components/SkillTag.jsx` | Skill pill (extracted from Home) |
| Create | `src/components/Card.jsx` | Base hover card shell |
| Create | `src/pages/Home/ParticleHero.jsx` | Canvas particle animation |
| Create | `src/pages/Home/HeroText.jsx` | Typewriter + word-reveal title |
| Create | `src/pages/Home/ProjectCard.jsx` | Project card (uses `Card`) |
| Create | `src/pages/Home/ServiceCard.jsx` | Service card (uses `Card`) |
| Create | `src/pages/Home/index.jsx` | Compose all Home sections |
| Delete | `src/pages/Home.jsx` | Replaced by `pages/Home/` directory |
| Modify | `src/components/Navbar.jsx` | Remove font `@import`; use tokens |
| Modify | `src/components/Footer.jsx` | Use tokens |
| Modify | `src/pages/AboutPage.jsx` | Remove font `@import`; interpolate tokens into CSS string |
| Modify | `src/pages/ContactPage.jsx` | Remove local hook; move icons to `icons.jsx`; use tokens |
| Modify | `src/pages/PortfolioPage.jsx` | Remove local `T` object; import from tokens + icons |
| Modify | `src/pages/ResumePage.jsx` | Remove local hook; use tokens |
| Modify | `src/pages/ServicesPage.jsx` | Remove local hook; import `ServiceIcon` from icons |

---

## Task 1: Create `src/tokens.js`

**Files:**
- Create: `src/tokens.js`

- [ ] **Step 1: Create the file**

```js
// src/tokens.js

export const colors = {
  // Backgrounds
  bg:         "#080e1c",
  surface:    "#0f1930",
  surfaceAlt: "#111827",

  // Global accent — Home, Navbar, Footer, shared components
  accent:     "#00e5ff",
  accentDim:  "#00b8d4",
  accentSoft: "rgba(0,229,255,0.08)",

  // Per-section accents (intentional — see design spec)
  sky:        "#38bdf8",   // Resume, Services, Contact
  indigo:     "#818cf8",   // Portfolio secondary
  purple:     "#a78bfa",   // Resume education pills
  pink:       "#e91e63",   // Contact send button

  // Text
  textPrimary:   "#f1f5f9",
  textSecondary: "#7a8ba8",
  textMuted:     "#4a5670",

  // Borders (global)
  border:      "rgba(0,229,255,0.08)",
  borderHover: "rgba(0,229,255,0.25)",
};

export const fonts = {
  body: "'Outfit', sans-serif",
  mono: "'Fira Code', 'SF Mono', 'Consolas', monospace",
};

export const transitions = {
  smooth:     "all 0.4s ease",
  spring:     "all 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
  springFast: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
};

export const shadows = {
  card:      "0 4px 20px rgba(0,0,0,0.2)",
  cardHover: "0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.08)",
};
```

- [ ] **Step 2: Verify build passes**

```
npm run build
```
Expected: exits with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/tokens.js
git commit -m "feat: add centralised design tokens"
```

---

## Task 2: Create `src/index.css` and wire it up

**Files:**
- Create: `src/index.css`
- Modify: `src/main.jsx` (add import)
- Modify: `index.html` (add Google Fonts link, remove redundant inline style)

- [ ] **Step 1: Create `src/index.css`**

```css
/* ── Reset (index.html already handles html/body/root; this covers everything else) ── */
* { margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
::selection { background: rgba(0, 229, 255, 0.3); color: #fff; }
input::placeholder,
textarea::placeholder { color: #4a5670; }

/* ── Keyframes ── */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes wordReveal {
  from { opacity: 0; transform: translateY(22px); filter: blur(6px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes blurFadeIn {
  from { opacity: 0; filter: blur(8px); }
  to   { opacity: 1; filter: blur(0); }
}
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes btnShimmer {
  0%   { left: -75%; }
  100% { left: 125%; }
}

/* ── Button shimmer (used on .btn-cool class) ── */
.btn-cool { position: relative !important; overflow: hidden !important; }
.btn-cool::after {
  content: '';
  position: absolute;
  top: -50%; left: -75%;
  width: 50%; height: 200%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.18) 50%,
    transparent 60%
  );
  pointer-events: none;
}
.btn-cool:hover::after { animation: btnShimmer 0.65s ease forwards; }
```

- [ ] **Step 2: Add `import "./index.css"` to `src/main.jsx`**

Open `src/main.jsx` and add this as the first import line:

```js
import "./index.css";
```

- [ ] **Step 3: Add Google Fonts to `index.html`**

In `index.html`, add inside `<head>` (before the closing `</head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Code:wght@300;400&display=swap" rel="stylesheet" />
```

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Expected: site loads, fonts render correctly, no console errors.

- [ ] **Step 5: Commit**

```bash
git add src/index.css src/main.jsx index.html
git commit -m "feat: add CSS baseline and centralise font loading"
```

---

## Task 3: Create `src/icons.jsx`

**Files:**
- Create: `src/icons.jsx`

- [ ] **Step 1: Create the file**

```jsx
// src/icons.jsx
import { colors } from "./tokens.js";

// ── Arrow (16×16, uses currentColor — inherits from parent) ──
export function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Home page service icons (40×40) ──
export function UIUXIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4"  y="4"  width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="22" y="4"  width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="4"  y="22" width="14" height="14" rx="2" stroke={colors.accent} strokeWidth="2" />
      <rect x="22" y="22" width="14" height="14" rx="7" stroke={colors.accent} strokeWidth="2" />
    </svg>
  );
}

export function WebDevIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <polyline points="12,10 4,20 12,30"  stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="28,10 36,20 28,30" stroke={colors.accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="22" y1="6" x2="18" y2="34" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PrototypeIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="14" stroke={colors.accent} strokeWidth="2" />
      <circle cx="20" cy="20" r="6"  stroke={colors.accent} strokeWidth="2" />
      <line x1="20" y1="6"  x2="20" y2="2"  stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="38" x2="20" y2="34" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="6"  y1="20" x2="2"  y2="20" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
      <line x1="38" y1="20" x2="34" y2="20" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ── Services page icon component (circle container + SVG) ──
export function ServiceIcon({ type, size = 56 }) {
  const circleStyle = {
    width: size, height: size,
    borderRadius: "50%",
    border: `2px solid ${colors.sky}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    background: "rgba(56,189,248,0.06)",
    flexShrink: 0,
  };
  const svgProps = {
    width: 26, height: 26, viewBox: "0 0 24 24",
    fill: "none", stroke: colors.sky,
    strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round",
  };
  if (type === "design") return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18" /><path d="M9 21V9" /><circle cx="16" cy="15" r="2" />
      </svg>
    </div>
  );
  if (type === "code") return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    </div>
  );
  // default: mobile
  return (
    <div style={circleStyle}>
      <svg {...svgProps}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
        <path d="M9 6h6" /><path d="M9 10h6" /><path d="M9 14h4" />
      </svg>
    </div>
  );
}

// ── Contact page icons ──
export function EmailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function LocationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={colors.sky} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

// ── Portfolio page icon paths (SVG path fragments used inside <svg><g>…</g></svg>) ──
// Usage: <g transform="..." stroke={project.color} ...>{ICON_PATHS[project.icon]}</g>
export const ICON_PATHS = {
  chart: (
    <>
      <polyline points="4,18 8,12 12,15 16,8 20,11" fill="none" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="20" y2="20" strokeWidth="1" opacity="0.4" />
      <line x1="4" y1="4"  x2="4"  y2="20" strokeWidth="1" opacity="0.4" />
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
```

- [ ] **Step 2: Verify build passes**

```
npm run build
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/icons.jsx
git commit -m "feat: centralise all SVG icons in icons.jsx"
```

---

## Task 4: Create `src/router.jsx` and simplify `src/main.jsx`

**Files:**
- Create: `src/router.jsx`
- Modify: `src/main.jsx`

- [ ] **Step 1: Create `src/router.jsx`**

Cut `AnimatedRoutes` out of `main.jsx` and paste it here verbatim. Add the necessary imports.

```jsx
// src/router.jsx
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home          from "./pages/Home/index.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import ServicesPage  from "./pages/ServicesPage.jsx";
import AboutPage     from "./pages/AboutPage.jsx";
import ContactPage   from "./pages/ContactPage.jsx";
import ResumePage    from "./pages/ResumePage.jsx";

export default function AnimatedRoutes() {
  const location                          = useLocation();
  const [shownLocation, setShownLocation] = useState(location);
  const [visible,       setVisible]       = useState(false);
  const isFirst                           = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      requestAnimationFrame(() => setVisible(true));
      return;
    }
    setVisible(false);
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      setShownLocation(location);
      requestAnimationFrame(() => setVisible(true));
    }, 300);
    return () => clearTimeout(t);
  }, [location.pathname]); // eslint-disable-line

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  (isFirst.current || visible) ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      minHeight:  "100vh",
    }}>
      <Routes location={shownLocation}>
        <Route path="/"          element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/resume"    element={<ResumePage />} />
      </Routes>
    </div>
  );
}
```

Note: the import path for Home is `./pages/Home/index.jsx` — this is the new directory structure created in Task 10.
Until Task 10 is complete, keep the import pointing to the old `./pages/Home.jsx`.

- [ ] **Step 2: Rewrite `src/main.jsx`**

Replace the entire file with:

```jsx
// src/main.jsx
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar         from "./components/Navbar.jsx";
import AnimatedRoutes from "./router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
```

- [ ] **Step 3: Verify dev server — all routes work**

```
npm run dev
```
Navigate to `/`, `/portfolio`, `/services`, `/about`, `/contact`, `/resume`.  
Expected: all pages load with page-transition animation intact.

- [ ] **Step 4: Commit**

```bash
git add src/router.jsx src/main.jsx
git commit -m "refactor: extract AnimatedRoutes to router.jsx, simplify main.jsx"
```

---

## Task 5: Create `Button.jsx` and `SectionHeader.jsx`

**Files:**
- Create: `src/components/Button.jsx`
- Create: `src/components/SectionHeader.jsx`

- [ ] **Step 1: Create `src/components/Button.jsx`**

```jsx
// src/components/Button.jsx
import { useState } from "react";
import { colors, fonts, transitions } from "../tokens.js";

export default function Button({ variant = "primary", onClick, children, style }) {
  const [hovered, setHovered] = useState(false);

  const base = {
    padding: "16px 38px",
    borderRadius: "8px",
    fontFamily: fonts.body,
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: transitions.springFast,
    transform: hovered ? "translateY(-5px) scale(1.04)" : "translateY(0) scale(1)",
    border: "none",
  };

  const variants = {
    primary: {
      background: `linear-gradient(135deg, #0099cc, ${colors.accentDim})`,
      color: "#fff",
    },
    outline: {
      background: hovered ? "rgba(0,184,212,0.1)" : "transparent",
      color: colors.accentDim,
      border: `2px solid ${hovered ? "rgba(0,229,255,0.9)" : "rgba(0,184,212,0.6)"}`,
    },
  };

  return (
    <button
      className="btn-cool"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ ...base, ...variants[variant], ...style }}
    >
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Create `src/components/SectionHeader.jsx`**

```jsx
// src/components/SectionHeader.jsx
import { colors, fonts } from "../tokens.js";

export default function SectionHeader({ children, accent }) {
  const c = accent || colors.accent;
  return (
    <>
      <h2 style={{
        textAlign: "center",
        fontSize: "28px",
        fontWeight: 700,
        color: c,
        marginBottom: "8px",
        fontFamily: fonts.body,
      }}>
        {children}
      </h2>
      <div style={{
        width: "60px",
        height: "3px",
        borderRadius: "2px",
        background: `linear-gradient(90deg, ${c}, transparent)`,
        margin: "0 auto 48px",
      }} />
    </>
  );
}
```

- [ ] **Step 3: Verify build**

```
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/Button.jsx src/components/SectionHeader.jsx
git commit -m "feat: add shared Button and SectionHeader components"
```

---

## Task 6: Create `SkillTag.jsx` and `Card.jsx`

**Files:**
- Create: `src/components/SkillTag.jsx`
- Create: `src/components/Card.jsx`

- [ ] **Step 1: Create `src/components/SkillTag.jsx`**

```jsx
// src/components/SkillTag.jsx
import { useState } from "react";
import { colors, fonts, transitions } from "../tokens.js";

export default function SkillTag({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "8px 22px",
        borderRadius: "20px",
        background: hovered ? "rgba(0,229,255,0.15)" : colors.accentSoft,
        border: `1px solid ${hovered ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.15)"}`,
        color: hovered ? "#fff" : colors.accent,
        fontSize: "13px",
        fontWeight: 500,
        fontFamily: fonts.body,
        transition: transitions.smooth,
        cursor: "default",
        transform: hovered ? "scale(1.08)" : "scale(1)",
      }}
    >
      {label}
    </span>
  );
}
```

- [ ] **Step 2: Create `src/components/Card.jsx`**

```jsx
// src/components/Card.jsx
import { useState } from "react";
import { colors, shadows, transitions } from "../tokens.js";

export default function Card({ children, style }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(15,25,50,0.7)",
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${hovered ? colors.borderHover : colors.border}`,
        cursor: "pointer",
        transform: hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hovered ? shadows.cardHover : shadows.card,
        transition: transitions.spring,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/SkillTag.jsx src/components/Card.jsx
git commit -m "feat: add shared SkillTag and Card components"
```

---

## Task 7: Extract `ParticleHero` to `pages/Home/ParticleHero.jsx`

**Files:**
- Create: `src/pages/Home/ParticleHero.jsx`

- [ ] **Step 1: Create the directory and file**

Create `src/pages/Home/` directory, then create `ParticleHero.jsx` with the full canvas component extracted verbatim from the top of `src/pages/Home.jsx` (the `ParticleHero` function starting at the `// ─── Interactive Particle Background` comment). Add the required imports at the top.

```jsx
// src/pages/Home/ParticleHero.jsx
import { useRef, useCallback, useEffect } from "react";

export default function ParticleHero() {
  const canvasRef    = useRef(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animRef      = useRef(null);

  const initParticles = useCallback((w, h) => {
    const count = Math.floor((w * h) / 12000);
    particlesRef.current = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseVx: (Math.random() - 0.5) * 0.25,
      baseVy: (Math.random() - 0.5) * 0.25,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, frame = 0;

    const resize = () => {
      const newW = canvas.parentElement.offsetWidth;
      const newH = canvas.parentElement.offsetHeight;
      const changed = !w || !h || Math.abs(newW - w) > 10 || Math.abs(newH - h) > 10;
      w = newW; h = newH;
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width  = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (changed) initParticles(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove  = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles   = particlesRef.current;
      const mouseActive = mx > -1000;

      particles.forEach((p) => {
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.15 + 1;
        if (mouseActive) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.35;
            p.vy += (dy / dist) * force * 0.35;
          }
        }
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;
        p.x  += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;

        const glowR = p.r * pulse;
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 3);
        grad.addColorStop(0, `rgba(0,229,255,${p.alpha * pulse})`);
        grad.addColorStop(1, "rgba(0,229,255,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha * 1.5 * pulse})`; ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      if (mouseActive) {
        particles.forEach((p) => {
          const dx   = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        });
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
```

- [ ] **Step 2: Verify build (file exists, no import errors)**

```
npm run build
```
Expected: no errors. (Not yet imported anywhere — that comes in Task 10.)

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home/ParticleHero.jsx
git commit -m "refactor: extract ParticleHero to pages/Home/ParticleHero.jsx"
```

---

## Task 8: Extract hero text to `pages/Home/HeroText.jsx`

**Files:**
- Create: `src/pages/Home/HeroText.jsx`

- [ ] **Step 1: Create `src/pages/Home/HeroText.jsx`**

Extract `TypewriterGreeting` and `AnimatedHeroTitle` verbatim from `src/pages/Home.jsx`. Add the required imports.

```jsx
// src/pages/Home/HeroText.jsx
import { useState, useEffect } from "react";
import { colors, fonts } from "../../tokens.js";

export function TypewriterGreeting() {
  const text = "Hi, I'm Stelios";
  const [count,         setCount]         = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (count < text.length) {
      const t = setTimeout(() => setCount(c => c + 1), 72);
      return () => clearTimeout(t);
    }
    const blink = setInterval(() => setCursorVisible(v => !v), 520);
    const hide  = setTimeout(() => { clearInterval(blink); setCursorVisible(false); }, 2600);
    return () => { clearInterval(blink); clearTimeout(hide); };
  }, [count]);

  return (
    <p style={{
      fontSize: "13px", letterSpacing: "5px", textTransform: "uppercase",
      color: colors.textMuted, marginBottom: "28px", minHeight: "20px",
      fontFamily: fonts.body,
    }}>
      {text.slice(0, count)}
      <span style={{
        color: colors.accent,
        animation: count < text.length ? "none" : "cursorBlink 0.52s step-end infinite",
        opacity: cursorVisible ? 1 : 0,
      }}>|</span>
    </p>
  );
}

export function AnimatedHeroTitle() {
  const words = [
    { text: "Full-Stack", colored: false },
    { text: "Developer", colored: false },
    { text: "&",          colored: false },
    { text: "UX/UI",     colored: true  },
    { text: "Designer",  colored: true  },
  ];
  return (
    <h1 style={{
      fontSize: "clamp(38px,5.5vw,72px)", fontWeight: 700,
      lineHeight: 1.2, marginBottom: "28px", letterSpacing: "-1px",
      fontFamily: fonts.body,
    }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: "inline-block",
          marginRight: i < words.length - 1 ? "0.28em" : 0,
          animation: `wordReveal 0.75s cubic-bezier(0.22,1,0.36,1) forwards`,
          animationDelay: `${0.9 + i * 0.12}s`,
          opacity: 0,
          ...(w.colored ? {
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDim})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          } : {}),
        }}>
          {w.text}
        </span>
      ))}
    </h1>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Home/HeroText.jsx
git commit -m "refactor: extract HeroText components to pages/Home/HeroText.jsx"
```

---

## Task 9: Create `ProjectCard.jsx` and `ServiceCard.jsx`

**Files:**
- Create: `src/pages/Home/ProjectCard.jsx`
- Create: `src/pages/Home/ServiceCard.jsx`

- [ ] **Step 1: Create `src/pages/Home/ProjectCard.jsx`**

```jsx
// src/pages/Home/ProjectCard.jsx
import { useState } from "react";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import Card            from "../../components/Card.jsx";
import { fonts }       from "../../tokens.js";

export default function ProjectCard({ title, subtitle, imageUrl, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <Card onHoverChange={setHovered}>
        <div style={{ overflow: "hidden", height: "190px" }}>
          <div style={{
            width: "100%", height: "100%",
            background: imageUrl,
            backgroundSize: "cover", backgroundPosition: "center",
            transform:  hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            filter:     hovered ? "brightness(1.1)" : "brightness(0.75)",
          }} />
        </div>
        <div style={{ padding: "20px" }}>
          <h3 style={{ fontFamily: fonts.body, fontSize: "16px", fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
            {title}
          </h3>
          <p style={{ fontFamily: fonts.body, fontSize: "12px", color: "#7a8ba8", margin: 0 }}>
            {subtitle}
          </p>
        </div>
      </Card>
    </AnimatedSection>
  );
}
```

Note: `Card` needs to expose its hover state so `ProjectCard` can animate the image. Update `src/components/Card.jsx` to accept an `onHoverChange` prop:

Open `src/components/Card.jsx` and add `onHoverChange` to the component:

```jsx
// src/components/Card.jsx  — add onHoverChange prop
export default function Card({ children, style, onHoverChange }) {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => { setHovered(true);  onHoverChange?.(true);  };
  const handleMouseLeave = () => { setHovered(false); onHoverChange?.(false); };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ /* ...same as before... */ }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/pages/Home/ServiceCard.jsx`**

```jsx
// src/pages/Home/ServiceCard.jsx
import { useState }    from "react";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import { colors, fonts, transitions } from "../../tokens.js";

export default function ServiceCard({ icon, title, description, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background:    hovered ? colors.accentSoft : "rgba(15,25,50,0.5)",
          borderRadius:  "12px",
          padding:       "36px 24px",
          border:        `1px solid ${hovered ? "rgba(0,229,255,0.2)" : "rgba(0,229,255,0.06)"}`,
          textAlign:     "center",
          transition:    transitions.smooth,
          transform:     hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow:     hovered ? "0 16px 32px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div style={{
          width: "72px", height: "72px", borderRadius: "50%",
          border: `2px solid ${hovered ? "rgba(0,229,255,0.5)" : "rgba(0,229,255,0.2)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px",
          background: hovered ? colors.accentSoft : "transparent",
          transition: transitions.smooth,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}>
          {icon}
        </div>
        <h3 style={{ fontFamily: fonts.body, fontSize: "18px", fontWeight: 600, color: "#fff", margin: "0 0 12px" }}>
          {title}
        </h3>
        <p style={{ fontFamily: fonts.body, fontSize: "13px", lineHeight: 1.7, color: colors.textSecondary, margin: 0 }}>
          {description}
        </p>
      </div>
    </AnimatedSection>
  );
}
```

- [ ] **Step 3: Verify build**

```
npm run build
```
Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home/ProjectCard.jsx src/pages/Home/ServiceCard.jsx src/components/Card.jsx
git commit -m "refactor: extract ProjectCard and ServiceCard to pages/Home/"
```

---

## Task 10: Create `pages/Home/index.jsx` and delete `pages/Home.jsx`

**Files:**
- Create: `src/pages/Home/index.jsx`
- Delete: `src/pages/Home.jsx`

- [ ] **Step 1: Create `src/pages/Home/index.jsx`**

```jsx
// src/pages/Home/index.jsx
import { useNavigate }       from "react-router-dom";
import Footer                from "../../components/Footer.jsx";
import AnimatedSection       from "../../components/AnimatedSection.jsx";
import Button                from "../../components/Button.jsx";
import SectionHeader         from "../../components/SectionHeader.jsx";
import SkillTag              from "../../components/SkillTag.jsx";
import ParticleHero          from "./ParticleHero.jsx";
import { TypewriterGreeting, AnimatedHeroTitle } from "./HeroText.jsx";
import ProjectCard           from "./ProjectCard.jsx";
import ServiceCard           from "./ServiceCard.jsx";
import { ArrowIcon, UIUXIcon, WebDevIcon, PrototypeIcon } from "../../icons.jsx";
import { hero, bio, skills, featuredProjects, services as homeServices } from "../../data/home.js";
import { colors, fonts }     from "../../tokens.js";

const SERVICE_ICONS = {
  "Interface Design": <UIUXIcon />,
  "Web Dev":          <WebDevIcon />,
  "Prototyping":      <PrototypeIcon />,
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: colors.bg, color: colors.textPrimary, fontFamily: fonts.body, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        position: "relative", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 48px", overflow: "hidden",
        background: "linear-gradient(135deg,#060d1a 0%,#0a1628 40%,#0d1f35 100%)",
      }}>
        <ParticleHero />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "860px", padding: "0 24px" }}>
          <TypewriterGreeting />
          <AnimatedHeroTitle />
          <p style={{
            fontSize: "clamp(15px,1.4vw,19px)", color: "#6a7a94", lineHeight: 1.75,
            maxWidth: "580px", margin: "0 auto 48px",
            animation: "blurFadeIn 1s ease 1.6s both",
          }}>
            {hero.tagline}
          </p>
          <div style={{
            display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap",
            animation: "fadeInUp 0.8s ease 2s both", opacity: 0,
          }}>
            <Button variant="primary"  onClick={() => navigate("/portfolio")}>View My Work <ArrowIcon /></Button>
            <Button variant="outline"  onClick={() => navigate("/contact")}>Contact Me <ArrowIcon /></Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
          zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "fadeInUp 1s ease 1.2s both", opacity: 0.5,
        }}>
          <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: colors.textMuted }}>Scroll</span>
          <div style={{ width: "1px", height: "44px", background: `linear-gradient(to bottom, ${colors.accent}, transparent)` }} />
        </div>
      </section>

      {/* ═══ PORTFOLIO PREVIEW ═══ */}
      <section style={{ padding: "70px 48px 50px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }}>
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.title} title={p.title} subtitle={p.subtitle} imageUrl={p.imageUrl} delay={i * 0.15} />
          ))}
        </div>
      </section>

      {/* ═══ WHAT I DO ═══ */}
      <section style={{ padding: "70px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>What I Do</SectionHeader>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }}>
          {homeServices.map((s, i) => (
            <ServiceCard key={s.title} icon={SERVICE_ICONS[s.title]} title={s.title} description={s.description} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </section>

      {/* ═══ WHO I AM ═══ */}
      <section style={{ padding: "70px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>Who I am</SectionHeader>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "52px", alignItems: "center" }}>
          <AnimatedSection delay={0.1} direction="left">
            <div style={{
              borderRadius: "12px", overflow: "hidden",
              border: `1px solid ${colors.border}`, aspectRatio: "4/3",
              background: "linear-gradient(135deg,#0d1b2a 0%,#1b2838 50%,#2a3a4a 100%)",
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              <div style={{ fontSize: "48px", opacity: 0.25 }}>📸</div>
              <div style={{ position: "absolute", bottom: "12px", right: "12px", fontSize: "11px", color: colors.textMuted, fontStyle: "italic" }}>
                Your photo here
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.25} direction="right">
            <div>
              <h3 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.35, letterSpacing: "-0.3px" }}>
                {bio.headline}
              </h3>
              <p style={{ fontSize: "15px", color: colors.textSecondary, lineHeight: 1.85, marginBottom: "28px" }}>
                {bio.body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.map(s => <SkillTag key={s} label={s} />)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Update `src/router.jsx` Home import**

Change:
```js
import Home from "./pages/Home.jsx";
```
to:
```js
import Home from "./pages/Home/index.jsx";
```

- [ ] **Step 3: Delete `src/pages/Home.jsx`**

```bash
rm src/pages/Home.jsx
```

- [ ] **Step 4: Verify dev server — Home page works end-to-end**

```
npm run dev
```
Navigate to `/`. Expected: hero, portfolio grid, services, about section all render and animate correctly. "Contact Me" button navigates to `/contact`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home/ src/router.jsx
git rm  src/pages/Home.jsx
git commit -m "refactor: split Home into pages/Home/ directory, remove duplicate contact form"
```

---

## Task 11: Update `Navbar.jsx` and `Footer.jsx`

**Files:**
- Modify: `src/components/Navbar.jsx`
- Modify: `src/components/Footer.jsx`

- [ ] **Step 1: Remove font `@import` from `Navbar.jsx`**

Open `src/components/Navbar.jsx`. Find the `<style>` block that starts with:
```js
<style>{`
  @import url('https://fonts.googleapis.com/css2?...');
  ...
`}</style>
```
Delete the `@import` line only. Keep all the `.nb-*` CSS class rules — they are still needed.

- [ ] **Step 2: Add token imports to `Navbar.jsx`**

Add at the top of `Navbar.jsx`:
```js
import { colors, fonts } from "../tokens.js";
```

Replace the two hardcoded hex strings used for link colours:
- `"#00e5ff"` → `colors.accent`
- `"#c0c8d8"` → `colors.textPrimary`

These appear in the desktop link `style` objects and the `.nb-mob-btn`/`.nb-mob-resume` class bodies inside the `<style>` string. For the inline `style` objects, use the token variables. For the CSS string, use template literals:

```js
<style>{`
  /* (no @import — fonts are in index.html) */
  .nb-mob-btn { color: ${colors.textPrimary}; ... }
  .nb-mob-btn:hover, .nb-mob-btn.active { color: ${colors.accent}; }
  .nb-mob-resume { border-color: rgba(0,229,255,0.4); color: ${colors.accent}; ... }
`}</style>
```

- [ ] **Step 3: Update `Footer.jsx`**

Add at the top:
```js
import { colors, fonts } from "../tokens.js";
```

Replace the `accent = "#00e5ff"` and `accentEnd = "#00b8d4"` default prop values:

```jsx
export default function Footer({ accent = colors.accent, accentEnd = colors.accentDim }) {
```

Replace the hardcoded `fontFamily` strings in the footer spans with `fonts.mono` and `fonts.body`.

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Expected: Navbar and Footer render identically. Mobile menu still works.

- [ ] **Step 5: Commit**

```bash
git add src/components/Navbar.jsx src/components/Footer.jsx
git commit -m "refactor: Navbar and Footer use tokens, remove duplicate font import"
```

---

## Task 12: Update `AboutPage.jsx`

**Files:**
- Modify: `src/pages/AboutPage.jsx`

AboutPage uses CSS classes (not inline transitions) for its animations — do NOT replace its `IntersectionObserver`/`visible` pattern with `useOnScreen`. Only remove the font import and interpolate token values into the CSS string.

- [ ] **Step 1: Add token import**

```js
import { colors, fonts } from "../tokens.js";
```

- [ ] **Step 2: Remove the Google Fonts `@import` line**

Find inside the `<style>` JSX string:
```
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
```
Delete that line.

- [ ] **Step 3: Interpolate token values into the CSS string**

The `<style>` block defines CSS custom properties. Convert it to a template literal and replace the hardcoded hex values:

The `<style>` block is a large CSS string. Only the custom property declarations at the top need updating. Change the `<style>` opening tag from:
```jsx
<style>{`
  @import url('...');
  .about-section {
    --bg: #0B0F19;
    --surface: #171B2D;
    ...
```
to:
```jsx
<style>{`
  .about-section {
    --bg: ${colors.bg};
    --surface: #171B2D;
    --surface2: #1E2236;
    --accent: ${colors.purple};
    --accent2: ${colors.accent};
    --text: ${colors.textPrimary};
    --text-dim: ${colors.textSecondary};
    --border: rgba(255,255,255,0.06);
    --font: ${fonts.body};
  }
```
All CSS rules after the `.about-section` block (`.about-heading`, `.about-stat`, etc.) stay exactly as written in the original file — do not touch them.

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Navigate to `/about`. Expected: page looks identical to before.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AboutPage.jsx
git commit -m "refactor: AboutPage uses tokens, removes duplicate font import"
```

---

## Task 13: Update `ContactPage.jsx`

**Files:**
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Add imports and remove local `useReveal`**

Replace:
```js
import { useState, useEffect, useRef } from "react";
```
with:
```js
import { useState } from "react";
import useOnScreen from "../hooks/useOnScreen.js";
import { EmailIcon, LocationIcon } from "../icons.jsx";
import { colors, fonts, transitions } from "../tokens.js";
```

Delete the entire `function useReveal(...)` block (lines 17–31 in the original file).

- [ ] **Step 2: Replace local icon functions**

Delete the `function EmailIcon()` and `function LocationIcon()` blocks — they are now imported from `icons.jsx`.

- [ ] **Step 3: Replace `useReveal` call sites with `useOnScreen`**

Find every `const [ref, visible] = useReveal(...)` and change to:
```js
const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
```
Then update references from `visible` to `isVisible` in the same scope.

- [ ] **Step 4: Replace hardcoded colour strings**

Search for `#38bdf8` and replace with `colors.sky`.  
Search for `#818cf8` and replace with `colors.indigo`.  
Search for `#0B0F19` and replace with `colors.bg`.  
Search for `#f1f5f9` and replace with `colors.textPrimary`.  
Search for `#94a3b8` and replace with `colors.textSecondary`.

- [ ] **Step 5: Verify dev server**

```
npm run dev
```
Navigate to `/contact`. Expected: page renders and scroll animations work.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ContactPage.jsx
git commit -m "refactor: ContactPage uses shared hook, icons, and tokens"
```

---

## Task 14: Update `PortfolioPage.jsx`

**Files:**
- Modify: `src/pages/PortfolioPage.jsx`

- [ ] **Step 1: Add imports and remove local `T` object**

Replace the `import` line at the top and remove the `const T = { ... }` block:

```js
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer.jsx";
import { projects as PROJECTS } from "../data/portfolio.js";
import { ICON_PATHS } from "../icons.jsx";
import { colors, fonts } from "../tokens.js";
```

Delete the entire `const T = { ... }` block (lines 8–21 in the original file).

- [ ] **Step 2: Replace `T.*` references with token imports**

Global search-and-replace in the file:

| Old | New |
|---|---|
| `T.bg` | `colors.bg` |
| `T.surface` | `colors.surfaceAlt` |
| `T.cardBg` | `"rgba(56,189,248,0.04)"` |
| `T.cardBorder` | `"rgba(56,189,248,0.10)"` |
| `T.cardBorderHover` | `"rgba(56,189,248,0.25)"` |
| `T.accent1` | `colors.sky` |
| `T.accent2` | `colors.indigo` |
| `T.textPrimary` | `colors.textPrimary` |
| `T.textSecondary` | `colors.textSecondary` |
| `T.textMuted` | `colors.textMuted` |
| `T.font` | `fonts.body` |
| `T.radius` | `16` |

- [ ] **Step 3: Remove local `ICON_PATHS` constant**

Delete the `const ICON_PATHS = { ... }` block (lines 31–71 in the original file) — it is now imported from `icons.jsx`.

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Navigate to `/portfolio`. Expected: project cards, category filter, and thumbnails all render correctly.

- [ ] **Step 5: Commit**

```bash
git add src/pages/PortfolioPage.jsx
git commit -m "refactor: PortfolioPage uses tokens and shared ICON_PATHS"
```

---

## Task 15: Update `ResumePage.jsx`

**Files:**
- Modify: `src/pages/ResumePage.jsx`

- [ ] **Step 1: Add imports and remove local `useReveal`**

Replace the top import line:
```js
import { useState, useEffect, useRef } from "react";
```
with:
```js
import { useState } from "react";
import useOnScreen from "../hooks/useOnScreen.js";
import { colors, fonts } from "../tokens.js";
```

Delete the entire `function useReveal(...)` block (lines 6–25).

- [ ] **Step 2: Replace `useReveal` call sites with `useOnScreen`**

Find every `const [ref, visible] = useReveal(...)` and change to:
```js
const [ref, isVisible] = useOnScreen({ threshold: 0.15 });
```
Update references from `visible` to `isVisible` in the same scope.

- [ ] **Step 3: Replace hardcoded colour strings**

Search and replace in the file:

| Old | New |
|---|---|
| `"#38bdf8"` | `colors.sky` |
| `"rgba(56,189,248,` | `\`rgba(56,189,248,\`` (keep as-is — this is an rgba with varying opacity, leave unchanged) |
| `"#a78bfa"` | `colors.purple` |
| `"#0B0F19"` / `"#080e1c"` | `colors.bg` |
| `"#f1f5f9"` | `colors.textPrimary` |
| `"#94a3b8"` | `colors.textSecondary` |

For any `rgba(...)` strings with these base colours, leave them as-is — they carry alpha values that cannot be derived from the token hex alone.

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Navigate to `/resume`. Expected: timeline and skill section animate correctly on scroll.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ResumePage.jsx
git commit -m "refactor: ResumePage uses shared hook and tokens"
```

---

## Task 16: Update `ServicesPage.jsx`

**Files:**
- Modify: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Add imports and remove local hook + local `ServiceIcon`**

Replace the top import line:
```js
import { useState, useEffect, useRef } from "react";
```
with:
```js
import { useState } from "react";
import useOnScreen from "../hooks/useOnScreen.js";
import { ServiceIcon } from "../icons.jsx";
import { colors, fonts, transitions } from "../tokens.js";
```

Delete the entire `function ServiceIcon(...)` block (lines 7–46).  
Delete the entire `function useScrollReveal(...)` block (lines 49–63).

- [ ] **Step 2: Replace `useScrollReveal` call sites with `useOnScreen`**

Find every `const [ref, visible] = useScrollReveal(...)` and change to:
```js
const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
```
Update references from `visible` to `isVisible`.

- [ ] **Step 3: Replace hardcoded colour strings**

Search and replace:

| Old | New |
|---|---|
| `"#38bdf8"` | `colors.sky` |
| `"#0B0F19"` | `colors.bg` |
| `"#e2e8f0"` | `colors.textPrimary` |
| `"#94a3b8"` | `colors.textSecondary` |
| `"'Sora', sans-serif"` | `fonts.body` |

- [ ] **Step 4: Verify dev server**

```
npm run dev
```
Navigate to `/services`. Expected: service cards and workflow section render and animate correctly.

- [ ] **Step 5: Commit**

```bash
git add src/pages/ServicesPage.jsx
git commit -m "refactor: ServicesPage uses shared hook, ServiceIcon from icons, and tokens"
```

---

## Task 17: Final verification against success criteria

- [ ] **Step 1: Run build**

```
npm run build
```
Expected: exits with 0 errors, 0 warnings about undefined imports.

- [ ] **Step 2: Run dev server and check every route**

```
npm run dev
```

Visit each route and verify visually:

| Route | Check |
|---|---|
| `/` | Hero particle animation, typewriter, word reveal, portfolio grid, services, about section |
| `/portfolio` | Category filter works, project thumbnails render |
| `/services` | Service cards animate on scroll |
| `/about` | Stats counter, skill pills, timeline all render |
| `/contact` | Form inputs, contact info cards |
| `/resume` | Timeline alternating cards, skill grid |

- [ ] **Step 3: Check success criteria from spec**

- [ ] `tokens.js` is the only place design values are defined
- [ ] No page file contains a local scroll-reveal hook implementation
- [ ] No `@keyframes` or CSS reset defined inside a JSX file
- [ ] Google Fonts imported once via `index.html`, not via `@import` in JS
- [ ] `Home/index.jsx` is under 100 lines
- [ ] `main.jsx` is under 15 lines
- [ ] No duplicate contact form in Home
- [ ] All SVG icons imported from `icons.jsx`
- [ ] Site renders and behaves identically to before

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "refactor: complete project restructure — tokens, icons, shared components, Home split"
```
