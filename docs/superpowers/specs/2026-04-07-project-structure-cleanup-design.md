---
name: Project Structure Cleanup
description: Refactor portfolio codebase for consistent styling, separation of concerns, and no duplicate code — no functionality changes.
type: project
---

## Goal

Bring the codebase to a consistent, maintainable state where:
- All content lives in `src/data/` files (edit data, never JSX, to change text)
- All styling uses inline styles (no embedded CSS strings)
- No duplicate component logic across files

## Changes

### 1. `src/data/about.js` — add bio content

Add a `bio` export with `label`, `heading`, and `body` fields. The text currently lives hardcoded in `AboutPage.jsx` lines 469–484.

```js
export const bio = {
  label: "Who I am",
  heading: "Engineering software with precision and purpose.",
  body: "I'm an Electrical and Computer Engineering student ...",
};
```

### 2. `src/pages/AboutPage.jsx` — rewrite to inline styles

Remove the ~340-line embedded `<style>` string and all CSS class names. Replace with inline style objects following the same pattern as every other page. Read `bio` from `data/about.js`.

Key visual behaviours to preserve during conversion:
- Scroll-triggered fade/slide-in animations (currently via `.visible` class toggle → replicate with inline `opacity`/`transform` controlled by the `visible` state)
- Skill pill hover effects (currently via CSS `:hover` pseudo-class → replicate with `onMouseEnter`/`onMouseLeave` handlers, same as `CaseStudy.jsx` back button)
- `::before`/`::after` decorative glows (position: absolute divs)
- Counter animation (no style dependency — keep as-is)
- Responsive layout (media query → keep a single `<style>` tag ONLY for the responsive breakpoint, or use a JS media-query hook)

### 3. `src/components/CaseStudyPage.jsx` — new shared wrapper

Extract the repeated case-study full-page wrapper from both Home and PortfolioPage:

```jsx
export default function CaseStudyPage({ project, onBack }) {
  return (
    <div style={{ background: colors.bg, minHeight: "100vh", fontFamily: fonts.body, padding: "clamp(24px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <CaseStudy project={project} onBack={onBack} />
      </div>
    </div>
  );
}
```

### 4. `src/pages/Home/index.jsx` — use CaseStudyPage + icon key

- Replace the inline case-study wrapper with `<CaseStudyPage>`.
- Replace the `SERVICE_ICONS` title-string map with an icon-key lookup: `SERVICE_ICONS[s.icon]`.

### 5. `src/pages/PortfolioPage.jsx` — use CaseStudyPage + shared Thumbnail

- Replace the inline case-study wrapper with `<CaseStudyPage>`.
- Remove the local `Thumbnail` function; import it from `CaseStudy.jsx` instead.

### 6. `src/components/CaseStudy.jsx` — export Thumbnail

Move the `Thumbnail` component (currently local to PortfolioPage) into CaseStudy.jsx and export it alongside `PlaceholderThumb`.

### 7. `src/data/home.js` — add icon key to services

Add an `icon` field (`"design"` | `"webdev"` | `"prototype"`) to each service object so the mapping in Home is key-based, not title-string-based.

## What does NOT change

- All visual output — pixels, animations, colours unchanged
- All routing and navigation
- `portfolio.js`, `resume.js`, `services.js`, `contact.js`, `tokens.js`, `icons.jsx`
- Component APIs (props) for existing components

## Files touched

| File | Action |
|---|---|
| `src/data/about.js` | Add `bio` export |
| `src/data/home.js` | Add `icon` field to each service |
| `src/pages/AboutPage.jsx` | Rewrite styles to inline; read bio from data |
| `src/components/CaseStudyPage.jsx` | Create new wrapper component |
| `src/components/CaseStudy.jsx` | Export `Thumbnail` |
| `src/pages/Home/index.jsx` | Use CaseStudyPage; use icon-key lookup |
| `src/pages/PortfolioPage.jsx` | Use CaseStudyPage; import Thumbnail from CaseStudy |
