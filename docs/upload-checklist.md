# Upload Readiness Checklist

## Blockers (must fix)

- [x] **Contact form doesn't send anything**
  - `handleSubmit` in `src/pages/ContactPage.jsx` only sets `submitted = true` — no email is sent
  - Wire to [Formspree](https://formspree.io) (free, no backend) or EmailJS
  - Form shows "Message Sent!" but nothing arrives in inbox

- [x] **SPA routing 404s on GitHub Pages**
  - `BrowserRouter` breaks direct URL access and page refreshes on GitHub Pages
  - Fix: add `public/404.html` redirect + restore script in `index.html`
  - Affects any link like `yourusername.github.io/Portfolio/about` opened directly

- [x] **No GitHub Actions deployment workflow**
  - No `.github/workflows/` directory exists
  - Options: auto-deploy via GitHub Actions on push, or manually push `dist/` to `gh-pages` branch
  - `npm run build` already outputs correct `/Portfolio/` base path via `vite.config.js`

## Should Fix

- [ ] **Commit the 4 unstaged files**
  - `src/icons.jsx`, `src/main.jsx`, `src/router.jsx`, `vite.config.js`
  - Changes are comment additions only (no functional diff)

- [ ] **No favicon**
  - `public/` is empty, `index.html` has no `<link rel="icon">`
  - Browsers show a blank tab icon

## Nice to Have

- [x] **No OG / meta description tags**
  - `index.html` missing `<meta name="description">` and Open Graph tags
  - Shared links show no preview on social/messaging platforms
