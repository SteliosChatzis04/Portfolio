# Gaza Digital Archive — Portfolio Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic "Digital Archive Platform" project entry with accurate Gaza Digital Archive content and add a "View Live" button to the case study view.

**Architecture:** Two-file change — update the data object in `portfolio.js` and add a conditional live-link button to the `CaseStudy` component in `PortfolioPage.jsx`.

**Tech Stack:** React, plain CSS-in-JS (inline styles), static data file.

---

### Task 1: Update project #3 in portfolio.js

**Files:**
- Modify: `src/data/portfolio.js` (project with id: 3)

- [ ] **Step 1: Replace project #3 entirely**

In `src/data/portfolio.js`, replace the object with `id: 3` with:

```js
{
  id: 3,
  title: "Gaza Digital Archive",
  tags: ["HTML", "CSS", "JavaScript"],
  category: "web",
  color: "#38bdf8",
  icon: "store",
  description:
    "A static frontend archive documenting the ongoing conflict in Gaza — built as a Web Development 1 academic project using pure HTML, CSS, and JavaScript. The site organises media, testimonies, and contextual data into a navigable, respectful interface without any backend or framework.",
  role: "Frontend Developer",
  duration: "Academic project — Web Dev 1",
  tools: ["HTML", "CSS", "JavaScript"],
  challenge:
    "Presenting sensitive, large-scale documentary content in a way that is navigable and emotionally considered — without a database, CMS, or backend to manage the data.",
  solution:
    "Structured all content as static HTML with a hand-crafted CSS layout and vanilla JavaScript for navigation and interactivity. Focused on clear information hierarchy and respectful visual design to handle heavy subject matter.",
  outcome:
    "A fully functional static archive deployed live on GitHub Pages, demonstrating command of core web fundamentals — semantic HTML, responsive CSS, and DOM manipulation — built entirely without frameworks or libraries.",
  link: "https://stelioschatzis04.github.io/Gaza-digital-archive/",
},
```

- [ ] **Step 2: Verify in browser**

Start dev server (`npm run dev`) and navigate to the Portfolio page. Confirm:
- Card shows "Gaza Digital Archive"
- Tags show HTML • CSS • JavaScript (no "Full-Stack")
- Clicking opens the case study with the updated content

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.js
git commit -m "feat: update project #3 to Gaza Digital Archive with accurate content and live link"
```

---

### Task 2: Add "View Live" button to CaseStudy component

**Files:**
- Modify: `src/pages/PortfolioPage.jsx` — `CaseStudy` function, after the tags `<div>`

- [ ] **Step 1: Add the button after the tags block**

In `PortfolioPage.jsx`, find the tags `<div>` inside `CaseStudy` (around line 174). Directly after the closing `</div>` of the tags block, add:

```jsx
{project.link && (
  <div style={{ marginBottom: 32 }}>
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "9px 22px",
        borderRadius: 100,
        border: `1px solid ${colors.sky}40`,
        background: `${colors.sky}10`,
        color: colors.sky,
        fontSize: 13,
        fontWeight: 500,
        fontFamily: fonts.body,
        textDecoration: "none",
        transition: "all .2s ease",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${colors.sky}20`;
        e.currentTarget.style.borderColor = colors.sky;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = `${colors.sky}10`;
        e.currentTarget.style.borderColor = `${colors.sky}40`;
      }}
    >
      ↗ View Live Site
    </a>
  </div>
)}
```

- [ ] **Step 2: Verify in browser**

Navigate to the Gaza Digital Archive case study. Confirm:
- "View Live Site" button appears below the tags
- Clicking opens `https://stelioschatzis04.github.io/Gaza-digital-archive/` in a new tab
- No button appears on any other project's case study

- [ ] **Step 3: Commit**

```bash
git add src/pages/PortfolioPage.jsx
git commit -m "feat: add View Live button to case study for projects with a link"
```
