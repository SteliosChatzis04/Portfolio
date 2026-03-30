# Project Structure Redesign

**Date:** 2026-03-30
**Status:** Approved

## Goal

Migrate the portfolio from a flat root-level file layout to the standard Vite/React folder structure so it is ready for deployment on GitHub Pages and eventually Vercel or Netlify.

## Context

All source files currently live in the project root alongside `package.json`, `vite.config.js`, and `index.html`. This works locally but is non-standard and causes friction with hosting platforms, CI/CD tooling, and any future collaborators.

The contact form has no backend yet. A backend may be added in a separate repo in the future — this restructure keeps the frontend clean and does not lock in any monorepo layout.

## Target Structure

```
Portfolio/
├── public/
│   └── favicon.ico              (placeholder for later)
├── src/
│   ├── assets/                  (images, logos — empty for now)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── hooks/
│   │   └── useOnScreen.js       (extracted from Home.jsx)
│   ├── pages/
│   │   ├── Home.jsx             (was portfolio.jsx)
│   │   ├── PortfolioPage.jsx    (was portfolio-section.jsx)
│   │   ├── ServicesPage.jsx     (was services-section.jsx)
│   │   ├── AboutPage.jsx        (was about-section.jsx)
│   │   ├── ContactPage.jsx      (was contact-section.jsx)
│   │   └── ResumePage.jsx       (was resume.jsx)
│   ├── utils/
│   │   └── logo-url.js
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## File Moves

| From (root) | To |
|---|---|
| `portfolio.jsx` | `src/pages/Home.jsx` |
| `portfolio-section.jsx` | `src/pages/PortfolioPage.jsx` |
| `services-section.jsx` | `src/pages/ServicesPage.jsx` |
| `about-section.jsx` | `src/pages/AboutPage.jsx` |
| `contact-section.jsx` | `src/pages/ContactPage.jsx` |
| `resume.jsx` | `src/pages/ResumePage.jsx` |
| `Navbar.jsx` | `src/components/Navbar.jsx` |
| `Footer.jsx` | `src/components/Footer.jsx` |
| `logo-url.js` | `src/utils/logo-url.js` |
| `main.jsx` | `src/main.jsx` |

## Extractions

- `useOnScreen` hook — currently defined inside `portfolio.jsx`, extracted to `src/hooks/useOnScreen.js`
- `AnimatedSection` component — currently defined inside `portfolio.jsx`, extracted to `src/components/AnimatedSection.jsx` so all pages can reuse it

## Deployment Config

`vite.config.js` updated to set the `base` path conditionally:

```js
base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/',
```

This makes GitHub Pages work out of the box (served from `/Portfolio/`). Vercel and Netlify serve from `/` and can override this via environment variable if needed.

`index.html` stays at the project root — Vite requires this.

## Import Path Changes

- `src/main.jsx`: all page imports update to `./pages/...`
- `src/pages/Home.jsx`: Navbar/Footer from `../components/...`, useOnScreen from `../hooks/useOnScreen`
- All other pages: shared components from `../components/...`
- Any file importing `logo-url.js`: path updates to `../utils/logo-url.js` or `./utils/logo-url.js`

## Out of Scope

- No logic changes
- No style changes
- No new features
- Backend integration (deferred, separate repo TBD)
- GitHub Pages deploy script (`gh-pages`) — can be added separately
