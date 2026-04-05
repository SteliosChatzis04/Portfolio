# Portfolio — Full Restructure Design

**Date:** 2026-04-05  
**Goal:** Refactor the codebase for maintainability, separation of concerns, and easy alteration — without changing any visible behaviour or design.

---

## 1. Motivation

The site works well but accumulates structural debt:

- Design tokens (hex colors, font strings, transition values, shadows) are scattered as literals across 6 page files with inconsistent values — e.g. the accent color appears as `#00e5ff`, `#38bdf8`, and `#7B5FFF` in different files.
- Each page file re-implements its own scroll-reveal hook (`useReveal`, `useScrollReveal`, etc.) despite a shared `useOnScreen` hook already existing.
- `Home.jsx` is a 366-line monolith containing a particle canvas, two animation components, three card types, an icon map, and a duplicate contact form.
- Google Fonts are imported via inline `<style>` tags in both `Home.jsx` and `Navbar.jsx` independently.
- All `@keyframes` and CSS resets are duplicated inline per-page.
- `AnimatedRoutes` lives inside `main.jsx` alongside the root render call.

---

## 2. Guiding Principles

- **One file, one job.** Each module is understandable without reading its consumers or dependencies.
- **Single source of truth.** Design tokens, keyframes, and font imports exist in exactly one place.
- **No new abstractions for one-off use.** Shared components are only extracted when used by 2+ pages.
- **No behaviour changes.** Refactor only — animations, routing, data, and visual output stay identical.

---

## 3. Folder Structure

```
src/
  tokens.js                  ← all design tokens (colors, fonts, transitions, shadows)
  icons.jsx                  ← all SVG icons as named exports
  index.css                  ← CSS baseline: resets, @keyframes, ::selection
  router.jsx                 ← AnimatedRoutes (extracted from main.jsx)
  main.jsx                   ← createRoot + BrowserRouter + Navbar only

  hooks/
    useOnScreen.js            ← unchanged; all pages switch to this

  components/
    Navbar.jsx                ← unchanged structure, imports from tokens
    Footer.jsx                ← unchanged structure, imports from tokens
    AnimatedSection.jsx       ← unchanged
    Button.jsx                ← new: primary / outline variants
    SectionHeader.jsx         ← new: h2 + gradient divider
    SkillTag.jsx              ← extracted from Home.jsx
    Card.jsx                  ← new: base hover card shell

  pages/
    Home/
      index.jsx               ← composes sections (~80 lines)
      ParticleHero.jsx        ← canvas particle animation
      HeroText.jsx            ← TypewriterGreeting + AnimatedHeroTitle
      ProjectCard.jsx         ← uses Card.jsx
      ServiceCard.jsx         ← uses Card.jsx
    AboutPage.jsx
    ContactPage.jsx
    PortfolioPage.jsx
    ResumePage.jsx
    ServicesPage.jsx

  data/                       ← no changes
  utils/
    logo-url.js               ← no changes
```

---

## 4. Design Tokens (`src/tokens.js`)

All pages import tokens instead of hardcoding values. Per-section accents are intentional and documented.

```js
export const colors = {
  // Backgrounds
  bg:         "#080e1c",
  surface:    "#0f1930",
  surfaceAlt: "#111827",

  // Global accent — Home, Navbar, Footer, shared components
  accent:     "#00e5ff",
  accentDim:  "#00b8d4",
  accentSoft: "rgba(0,229,255,0.08)",

  // Per-section accents (intentional)
  sky:        "#38bdf8",   // Resume, Services
  indigo:     "#818cf8",   // Portfolio secondary
  purple:     "#a78bfa",   // Resume education pills
  pink:       "#e91e63",   // Contact send button

  // Text
  textPrimary:    "#f1f5f9",
  textSecondary:  "#7a8ba8",
  textMuted:      "#4a5670",

  // Borders
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

---

## 5. CSS Baseline (`src/index.css`)

Consolidates all currently-duplicated global styles.

**Contents:**
- `*` reset (margin, padding, box-sizing)
- `html { scroll-behavior: smooth }`
- `::selection` rule
- `input::placeholder, textarea::placeholder` colour
- All `@keyframes`: `fadeInUp`, `wordReveal`, `blurFadeIn`, `cursorBlink`, `btnShimmer`
- `.btn-cool` shimmer class

**Imported once** in `main.jsx`. Removed from every page file.

---

## 6. Fonts

The Google Fonts `<link>` tag moves to the root `index.html` `<head>` (Vite serves this directly, not from `public/`). The `@import` inside `<style>` tags in `Home.jsx` and `Navbar.jsx` is removed.

---

## 7. Shared Components

### `Button.jsx`
Props: `variant` (`"primary"` | `"outline"`), `onClick`, `children`.  
Replaces all inline button style objects. Hover effects handled internally via `onMouseEnter`/`onMouseLeave`.

### `SectionHeader.jsx`
Props: `children` (the heading text).  
Renders: `<h2>` in `colors.accent` + the 60px gradient divider line below it, centred.  
Used on every page that has a named section.

### `SkillTag.jsx`
Props: `label`.  
Extracted from `Home.jsx`. Used by Home (skills section) and `AboutPage`.

### `Card.jsx`
Props: `children`, `style` (optional overrides).  
Handles: hover lift (`translateY(-10px) scale(1.02)`), border glow, shadow transition.  
`ProjectCard` and `ServiceCard` in `Home/` wrap their content in `Card` rather than duplicating hover logic.

### `icons.jsx`
Named exports for every SVG currently defined inline across pages:  
`ArrowIcon`, `UIUXIcon`, `WebDevIcon`, `PrototypeIcon`, `ServiceIconDesign`, `ServiceIconCode`, `ServiceIconMobile`, etc.

---

## 8. Home Page Split

`Home.jsx` (366 lines) → `pages/Home/` directory:

| File | Responsibility | Est. lines |
|---|---|---|
| `index.jsx` | Compose Hero + sections, page layout | ~80 |
| `ParticleHero.jsx` | Canvas particle animation, mouse interaction | ~120 |
| `HeroText.jsx` | `TypewriterGreeting` + `AnimatedHeroTitle` | ~60 |
| `ProjectCard.jsx` | Project card using `Card.jsx` | ~30 |
| `ServiceCard.jsx` | Service card using `Card.jsx` | ~30 |

**Removed from Home:** the duplicate contact form (`formData` state + all inputs). The "Contact Me" CTA button already routes to `/contact`.

---

## 9. Router Extraction

`AnimatedRoutes` moves from `main.jsx` to `src/router.jsx`.

`main.jsx` becomes:
```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import AnimatedRoutes from "./router.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
```

---

## 10. Pages — What Changes

All 5 non-Home pages receive the same set of mechanical changes:

1. Delete local `useReveal` / `useScrollReveal` function → import `useOnScreen` from `../../hooks/useOnScreen.js`
2. Replace hardcoded hex strings with `colors.*` from `tokens.js`
3. Replace local section-header pattern (h2 + divider div) with `<SectionHeader>`
4. Replace inline button styles with `<Button>`
5. Remove font `@import` from any inline `<style>` blocks

No structural splits needed for these pages — each is already one coherent unit.

---

## 11. What Does NOT Change

- All `src/data/` files — untouched
- `src/utils/logo-url.js` — untouched
- `src/hooks/useOnScreen.js` — untouched
- All routing paths and page names
- All visible animations, colours (within per-section accent scheme), and layout
- `AnimatedSection.jsx` — untouched

---

## 12. Success Criteria

- [ ] `tokens.js` is the only place design values are defined
- [ ] No page file contains a local scroll-reveal hook implementation
- [ ] No `@keyframes` or CSS reset defined inside a JSX file
- [ ] Google Fonts imported once via `index.html`, not via `@import` in JS
- [ ] `Home/index.jsx` is under 100 lines
- [ ] `main.jsx` is under 15 lines
- [ ] No duplicate contact form in Home
- [ ] All SVG icons imported from `icons.jsx`
- [ ] Site renders and behaves identically to before
