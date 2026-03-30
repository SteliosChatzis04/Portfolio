# Project Structure Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all source files from the project root into a standard Vite/React `src/` folder layout so the project deploys cleanly on GitHub Pages and Vercel/Netlify.

**Architecture:** Create `src/` with `components/`, `pages/`, `hooks/`, `utils/`, and `assets/` subdirectories. Extract shared utilities (`useOnScreen`, `AnimatedSection`) into their own files. Move all existing files to their new locations with updated import paths. Update `vite.config.js` with a production `base` path for GitHub Pages.

**Tech Stack:** React 18, Vite 5, react-router-dom 6

> **Note:** This is a pure file reorganization — no logic changes. There is no test suite. Each task is verified by running `npm run dev` and confirming no console errors and no broken routes.

---

## File Map

| Old path (root) | New path |
|---|---|
| `main.jsx` | `src/main.jsx` |
| `portfolio.jsx` | `src/pages/Home.jsx` |
| `portfolio-section.jsx` | `src/pages/PortfolioPage.jsx` |
| `services-section.jsx` | `src/pages/ServicesPage.jsx` |
| `about-section.jsx` | `src/pages/AboutPage.jsx` |
| `contact-section.jsx` | `src/pages/ContactPage.jsx` |
| `resume.jsx` | `src/pages/ResumePage.jsx` |
| `Navbar.jsx` | `src/components/Navbar.jsx` |
| `Footer.jsx` | `src/components/Footer.jsx` |
| `logo-url.js` | `src/utils/logo-url.js` |
| *(new)* | `src/hooks/useOnScreen.js` |
| *(new)* | `src/components/AnimatedSection.jsx` |

---

### Task 1: Create directory structure

**Files:**
- Create dirs: `src/components/`, `src/pages/`, `src/hooks/`, `src/utils/`, `src/assets/`, `public/`

- [ ] **Step 1: Create all directories**

Run from the project root:
```bash
mkdir -p src/components src/pages src/hooks src/utils src/assets public
```

- [ ] **Step 2: Verify directories exist**

```bash
ls src/
```
Expected output:
```
assets  components  hooks  pages  utils
```

---

### Task 2: Extract `useOnScreen` hook

**Files:**
- Create: `src/hooks/useOnScreen.js`

The `useOnScreen` hook is currently defined at the top of `portfolio.jsx` (lines 8–19). Extract it verbatim.

- [ ] **Step 1: Create `src/hooks/useOnScreen.js`**

```js
import { useRef, useState, useEffect } from "react";

export default function useOnScreen(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}
```

---

### Task 3: Extract `AnimatedSection` component

**Files:**
- Create: `src/components/AnimatedSection.jsx`

`AnimatedSection` is currently defined in `portfolio.jsx` (lines 22–32). Multiple pages will benefit from sharing it.

- [ ] **Step 1: Create `src/components/AnimatedSection.jsx`**

```jsx
import useOnScreen from "../hooks/useOnScreen";

export default function AnimatedSection({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, isVisible] = useOnScreen();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translate(0,0)" : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
    }}>{children}</div>
  );
}
```

---

### Task 4: Move `logo-url.js` to utils

**Files:**
- Create: `src/utils/logo-url.js`
- The old `logo-url.js` stays in root until Task 10 cleans it up.

- [ ] **Step 1: Copy `logo-url.js` to `src/utils/logo-url.js`**

Open `logo-url.js` in the root and copy its entire contents into `src/utils/logo-url.js` without any changes.

---

### Task 5: Move `Footer.jsx` to components

**Files:**
- Create: `src/components/Footer.jsx`

`Footer.jsx` has no local imports — it only uses React and inline styles.

- [ ] **Step 1: Create `src/components/Footer.jsx`**

Copy the entire contents of the root `Footer.jsx` into `src/components/Footer.jsx`. No import changes needed.

---

### Task 6: Move `Navbar.jsx` to components

**Files:**
- Create: `src/components/Navbar.jsx`

`Navbar.jsx` imports `LOGO_URL` from `./logo-url.js`. This path must be updated.

- [ ] **Step 1: Create `src/components/Navbar.jsx`**

Copy the entire contents of root `Navbar.jsx` into `src/components/Navbar.jsx`, changing only line 3:

```js
// Before:
import { LOGO_URL } from "./logo-url.js";

// After:
import { LOGO_URL } from "../utils/logo-url.js";
```

All other lines stay identical.

---

### Task 7: Move `portfolio.jsx` → `src/pages/Home.jsx`

**Files:**
- Create: `src/pages/Home.jsx`

This is the largest file. It imports `Navbar` and `Footer` and also defines `useOnScreen` and `AnimatedSection` inline — those definitions must be removed and replaced with imports.

- [ ] **Step 1: Create `src/pages/Home.jsx`**

Open root `portfolio.jsx`. In `src/pages/Home.jsx`:

1. Replace the top imports block:
```jsx
// Before (lines 1–2 of portfolio.jsx):
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import useOnScreen from "../hooks/useOnScreen.js";
import AnimatedSection from "../components/AnimatedSection.jsx";
```

2. Delete the `useOnScreen` function definition (lines 8–19 of portfolio.jsx).

3. Delete the `AnimatedSection` function definition (lines 22–32 of portfolio.jsx).

4. Copy all remaining code unchanged.

- [ ] **Step 2: Verify the file opens without syntax errors**

Open `src/pages/Home.jsx` in the editor and check there are no red underlines on the deleted functions or imports.

---

### Task 8: Move `portfolio-section.jsx` → `src/pages/PortfolioPage.jsx`

**Files:**
- Create: `src/pages/PortfolioPage.jsx`

- [ ] **Step 1: Create `src/pages/PortfolioPage.jsx`**

Copy entire contents of root `portfolio-section.jsx` into `src/pages/PortfolioPage.jsx`, changing only the import lines at the top:

```jsx
// Before:
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
```

---

### Task 9: Move `services-section.jsx` → `src/pages/ServicesPage.jsx`

**Files:**
- Create: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Create `src/pages/ServicesPage.jsx`**

Copy entire contents of root `services-section.jsx` into `src/pages/ServicesPage.jsx`, changing only the import lines at the top:

```jsx
// Before:
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
```

---

### Task 10: Move `about-section.jsx` → `src/pages/AboutPage.jsx`

**Files:**
- Create: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Create `src/pages/AboutPage.jsx`**

Copy entire contents of root `about-section.jsx` into `src/pages/AboutPage.jsx`, changing only the import lines at the top:

```jsx
// Before:
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
```

---

### Task 11: Move `contact-section.jsx` → `src/pages/ContactPage.jsx`

**Files:**
- Create: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Create `src/pages/ContactPage.jsx`**

Copy entire contents of root `contact-section.jsx` into `src/pages/ContactPage.jsx`, changing only the import lines at the top:

```jsx
// Before:
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
```

---

### Task 12: Move `resume.jsx` → `src/pages/ResumePage.jsx`

**Files:**
- Create: `src/pages/ResumePage.jsx`

- [ ] **Step 1: Create `src/pages/ResumePage.jsx`**

Copy entire contents of root `resume.jsx` into `src/pages/ResumePage.jsx`, changing only the import lines at the top:

```jsx
// Before:
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

// After:
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
```

---

### Task 13: Update `main.jsx` and move it to `src/`

**Files:**
- Modify: `src/main.jsx` (create it — root `main.jsx` is the source)

`main.jsx` is the router entry point. All page imports need updating.

- [ ] **Step 1: Create `src/main.jsx`**

```jsx
import { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home           from "./pages/Home.jsx";
import PortfolioPage  from "./pages/PortfolioPage.jsx";
import ServicesPage   from "./pages/ServicesPage.jsx";
import AboutPage      from "./pages/AboutPage.jsx";
import ContactPage    from "./pages/ContactPage.jsx";
import ResumePage     from "./pages/ResumePage.jsx";

function AnimatedRoutes() {
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
    const t = setTimeout(() => {
      setShownLocation(location);
      requestAnimationFrame(() => setVisible(true));
    }, 300);
    return () => clearTimeout(t);
  }, [location.pathname]); // eslint-disable-line

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(8px)",
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

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
```

---

### Task 14: Update `index.html` to point at `src/main.jsx`

**Files:**
- Modify: `index.html`

Vite's `index.html` must reference the new entry point path.

- [ ] **Step 1: Open `index.html` and find the script tag**

It currently reads:
```html
<script type="module" src="/main.jsx"></script>
```

- [ ] **Step 2: Update the src attribute**

```html
<script type="module" src="/src/main.jsx"></script>
```

---

### Task 15: Update `vite.config.js`

**Files:**
- Modify: `vite.config.js`

- [ ] **Step 1: Update `vite.config.js`**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/Portfolio/" : "/",
});
```

---

### Task 16: Verify the dev server runs

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in ...ms

  ➜  Local:   http://localhost:5173/
```

- [ ] **Step 2: Check all routes in the browser**

Visit each route and confirm no blank pages or console errors:
- `http://localhost:5173/` — Home with particle hero
- `http://localhost:5173/portfolio` — Portfolio page
- `http://localhost:5173/services` — Services page
- `http://localhost:5173/about` — About page
- `http://localhost:5173/contact` — Contact page
- `http://localhost:5173/resume` — Resume page

- [ ] **Step 3: Stop the dev server** (`Ctrl+C`)

---

### Task 17: Delete old root-level source files

Only do this after Task 16 confirms everything works.

- [ ] **Step 1: Delete old files**

```bash
rm portfolio.jsx portfolio-section.jsx services-section.jsx about-section.jsx contact-section.jsx resume.jsx Navbar.jsx Footer.jsx logo-url.js main.jsx
```

- [ ] **Step 2: Confirm root is clean**

```bash
ls *.jsx *.js 2>/dev/null
```

Expected: no output (no orphaned source files).

---

### Task 18: Final build check and commit

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: build completes with no errors, `dist/` folder created.

- [ ] **Step 2: Preview the production build**

```bash
npm run preview
```

Visit `http://localhost:4173/Portfolio/` and confirm all routes work.

- [ ] **Step 3: Stop preview** (`Ctrl+C`)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "refactor: migrate to standard Vite src/ folder structure"
```
