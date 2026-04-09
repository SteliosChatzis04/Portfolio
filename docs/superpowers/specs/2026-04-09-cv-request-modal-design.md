# CV Request Modal — Design Spec
**Date:** 2026-04-09

## Overview

Replace the "View CV" button on the About page with a "Request CV" button that opens a modal form. Visitors submit their name, email, and reason for requesting. The submission goes to a dedicated Formspree endpoint (`VITE_FORMSPREE_CV_ID`). The portfolio owner replies via Formspree email with the CV attached.

---

## Component Structure

### New file: `src/components/CvRequestModal.jsx`

**Props:**
- `open: bool` — controls visibility
- `onClose: () => void` — called on backdrop click, X button click, or Escape key

**Internal state:**
- `formData: { name: string, email: string, reason: string }`
- `touched: { name: bool, email: bool, reason: bool }`
- `focused: string | null`
- `loading: bool`
- `submitted: bool`
- `submitError: string | null`

**Validation:**
- `name`: non-empty string
- `email`: passes `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- `reason`: at least 10 characters
- Validation fires on blur (per field) and on submit attempt

**Submission:**
- POST to `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CV_ID}`
- Body: `JSON.stringify({ name, email, reason })`
- Headers: `Content-Type: application/json`, `Accept: application/json`
- On success (`res.ok`): show success state
- On non-ok response: set `submitError = "Something went wrong. Please try again."`
- On network error: set `submitError = "Couldn't send — please email me directly."`

**Reset behavior:** Form data and state reset when `open` transitions from `false` to `true` (i.e. each time the modal is reopened it starts fresh).

---

## Changes to `src/pages/AboutPage.jsx`

1. Import `CvRequestModal` and `useState` (already imported).
2. Add state: `const [cvModalOpen, setCvModalOpen] = useState(false)`.
3. Replace the `<Link to="/resume">` CTA with a `<button>` that calls `setCvModalOpen(true)` on click. Identical styling — same cyan→blue gradient, same document icon, same hover animation. Label changes from "View CV" to "Request CV".
4. Render `<CvRequestModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />` at the bottom of the returned JSX (after the `<Footer />`).

---

## Modal Visual Design

Matches the existing design system (`colors` + `fonts` tokens from `src/tokens.js`).

**Backdrop:**
- Fixed full-screen, `rgba(0,0,0,0.6)`, `backdropFilter: blur(4px)`
- Clicking backdrop calls `onClose`
- `z-index: 1000`

**Card:**
- Centered (flexbox on backdrop), max-width 480px, width `calc(100% - 48px)`
- Frosted glass: `background: rgba(255,255,255,0.03)`, `backdropFilter: blur(12px)`
- `border: 1px solid rgba(255,255,255,0.06)`, `borderRadius: 16`, `padding: 36px 30px`

**Header:**
- Title: "Request My CV" — `fontSize: 20`, `fontWeight: 700`, `color: colors.textPrimary`
- X close button: top-right absolute, icon-only, same ghost style as existing icon buttons

**Fields (in order):**
1. **Your Name** — `<input type="text">`, placeholder "John Doe"
2. **Your Email** — `<input type="email">`, placeholder "john@example.com"
3. **Why are you requesting?** — `<textarea rows={4}>`, placeholder "e.g. considering you for a role, reviewing your portfolio…"

Each field uses the same `inputBase` styling, border-state logic (idle / focused sky / valid green / error red), and green checkmark icon on valid state as in `ContactPage.jsx`.

**Submit button:**
- Full-width, `border-radius: 12`, sky→indigo gradient (`colors.sky` → `colors.indigo`)
- Label: "Send Request" with send icon
- Disabled + `opacity: 0.7` while `loading`
- Hover: `translateY(-5px) scale(1.04)`

**Success state:**
- Replaces the form within the card
- Green checkmark circle (same as ContactPage success)
- Heading: "Request Sent!"
- Body: "Thanks! I'll send my CV to your email shortly."
- "Close" button to dismiss the modal

**Error display:**
- Inline below submit button, `color: #f87171`, `fontSize: 13`

**Keyboard behavior:**
- `Escape` key calls `onClose`
- Focus trap is not required (portfolio is a simple site, not an enterprise app)

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_FORMSPREE_ID` | Existing contact form (unchanged) |
| `VITE_FORMSPREE_CV_ID` | New dedicated CV request form |

`VITE_FORMSPREE_CV_ID` is already added to `.env.local`.

---

## Out of Scope

- No changes to the Resume page (`/resume`) or its route
- No changes to the Contact page
- No server-side logic — Formspree handles delivery
- No file upload (CV is sent manually by the owner via Formspree reply)
