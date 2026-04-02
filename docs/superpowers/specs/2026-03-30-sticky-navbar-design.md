# Sticky Navbar Fix — Design Spec
**Date:** 2026-03-30

## Problem

The navbar (`src/components/Navbar.jsx`) uses `position: fixed` but does not follow the user when scrolling on any page. The root cause is a CSS containing-block rule: any ancestor element with a `transform` CSS property applied creates a new containing block for `position: fixed` descendants, overriding viewport-relative positioning.

In `src/main.jsx`, the `AnimatedRoutes` wrapper div applies `transform: translateY(...)` for page transition animations. All page components render `<Navbar />` inside their own JSX, which makes the navbar a descendant of this transformed div — breaking fixed positioning on every route.

## Solution: Lift Navbar to Root Level

Move `<Navbar />` out of all page components and render it once in `main.jsx`, outside the transformed `AnimatedRoutes` wrapper. The navbar is then a sibling of `AnimatedRoutes`, not a child of it, so it is never inside a transformed ancestor.

## Changes

### `src/main.jsx`
- Add `import Navbar from "./components/Navbar.jsx"`
- Render `<Navbar />` directly inside `<BrowserRouter>`, above `<AnimatedRoutes />`

### `src/pages/Home.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/pages/PortfolioPage.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/pages/ServicesPage.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/pages/AboutPage.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/pages/ContactPage.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/pages/ResumePage.jsx`
- Remove `import Navbar from "../components/Navbar.jsx"`
- Remove `<Navbar />` from JSX

### `src/components/Navbar.jsx`
- No changes required. Already implements `position: fixed`, scroll detection, transparent-to-solid background transition, and mobile hamburger menu.

## Expected Result

- Navbar is mounted once for the lifetime of the app, not per-route
- Navbar is never a descendant of a transformed element
- `position: fixed` behaves correctly — navbar stays at the top of the viewport while the user scrolls on every page
- Page transition animations are unaffected
- Navbar does not flicker or re-mount on route changes
