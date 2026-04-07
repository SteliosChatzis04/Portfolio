# Design: Gaza Digital Archive — Portfolio Entry Update

**Date:** 2026-04-06  
**Scope:** Update project #3 in the portfolio data file and add a live link button to the case study view.

---

## What We're Changing

### 1. `src/data/portfolio.js` — project id 3

Replace the generic "Digital Archive Platform" entry with accurate Gaza-specific content:

- **title:** `"Gaza Digital Archive"`
- **tags:** `["HTML", "CSS", "JavaScript"]` — remove "Full-Stack", it's a frontend-only project
- **category:** `"web"` — unchanged
- **color/icon:** unchanged
- **role:** `"Frontend Developer"`
- **duration:** `"Academic project — Web Dev 1"`
- **description:** Accurately describes a static frontend archive for documenting the Gaza conflict, built as a Web Dev 1 project using pure HTML, CSS, and JS with hardcoded/static data.
- **challenge:** Designing a clean, navigable archive interface without a backend — structuring static data so it remains readable and emotionally respectful.
- **solution:** Hand-crafted HTML/CSS layout with JavaScript for interactivity and navigation across static content sections. No frameworks, no backend.
- **outcome:** A live, deployed archive hosted on GitHub Pages, functional and accessible as a standalone static site.
- **link (new field):** `"https://stelioschatzis04.github.io/Gaza-digital-archive/"`

### 2. `src/pages/PortfolioPage.jsx` — CaseStudy component

Add a "View Live" button rendered below the tags row. Conditions:
- Only renders when `project.link` is defined (other projects unaffected)
- Opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)
- Styled to match existing portfolio aesthetic (sky blue accent, pill shape, subtle border)

---

## What We're NOT Changing

- Portfolio grid card layout — no changes
- Other projects — unaffected (link field is optional)
- Filter categories — Gaza Archive stays under "web"
- Thumbnail/icon system — unchanged

---

## Success Criteria

- Project #3 shows "Gaza Digital Archive" in the grid and case study
- Case study accurately describes a frontend-only, static-data, academic project
- "View Live" button appears in the case study and opens the correct URL
- No other projects are affected
