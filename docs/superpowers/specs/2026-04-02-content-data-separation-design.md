# Content/Data Separation Design

**Date:** 2026-04-02
**Status:** Approved

## Goal

Extract all hardcoded content from React page components into dedicated data files under `src/data/`, one file per page/section. This makes it trivial to add, edit, or remove any text, project, skill, or link without touching component logic or JSX.

## The Rule

> If it's text or a list you'd ever want to update → data file.
> If it's code that makes things work or look right → stays in the component.

## New Directory

```
src/data/
  home.js       ← hero, bio, skills, mini project cards, mini service cards
  portfolio.js  ← full project entries (all 6)
  about.js      ← stats counters, skills with SVG icon paths
  services.js   ← service cards, workflow steps
  resume.js     ← timeline entries, skill category lists
  contact.js    ← email, GitHub URL, location, heading/subtext
```

---

## File Contracts

### `src/data/home.js`

```js
export const hero = {
  tagline: "I design and build digital products that combine intuitive user experience with clean, modern code.",
};

export const bio = {
  headline: "Passionate about creating intuitive digital experiences.",
  body: "With a strong background in Computer Engineering and a passion for innovation...",
};

export const skills = ["Java", "React", "HTML/CSS", "JavaScript", "C", "Python"];

// Mini cards shown on the home page (subset of full portfolio)
export const featuredProjects = [
  { title: "FinTech Dashboard App", subtitle: "UI Design • Figma",       imageUrl: "linear-gradient(135deg,#0a1930 0%,#1a2a4a 50%,#0066cc 100%)" },
  { title: "Urban Streetwear",      subtitle: "Web Design • E-Commerce", imageUrl: "linear-gradient(135deg,#1a1a2e 0%,#2d2d44 50%,#4a4a6a 100%)" },
  { title: "Wanderlust App",        subtitle: "Mobile App • UI Research", imageUrl: "linear-gradient(135deg,#0d2137 0%,#1a3a5c 50%,#2a5a8c 100%)" },
];

// Mini service cards shown on the home page
export const services = [
  { title: "UI/UX Design", description: "Designing intuitive and visually stunning interfaces that prioritize user needs and create a memorable digital journey." },
  { title: "Web Dev",       description: "Building responsive, high-performance websites using modern technologies that deliver fast, seamless user experiences." },
  { title: "Prototyping",   description: "Creating rapid, high-fidelity prototypes to bridge concepts, test usability, and iterate quickly for the best results." },
];
```

### `src/data/portfolio.js`

```js
export const projects = [
  {
    id: 1,
    title: "FinTech Dashboard App",
    tags: ["UI Design", "React"],
    category: "web",
    color: "#38bdf8",
    icon: "chart",
    description: "...",
    role: "Lead UI Designer & Front-End Developer",
    duration: "3 months",
    tools: ["React", "D3.js", "Figma", "TailwindCSS"],
    challenge: "...",
    solution: "...",
    outcome: "...",
  },
  // ... more projects
];
```

### `src/data/about.js`

```js
export const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "15+", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
];

// Each skill has a name and an SVG path string (used to render the icon)
export const skills = [
  { name: "Axure",      icon: "M12 2L2 7l10 5 10-5-10-5z..." },
  { name: "React",      icon: "M12 12m-2 0a2 2 0 1 0 4 0..." },
  { name: "HTML5/CSS3", icon: "M4 3l1.5 17L12 22l6.5-2..." },
  // ...
];
```

### `src/data/services.js`

```js
export const services = [
  { title: "UI/UX Design",    description: "Crafting intuitive interfaces...", icon: "design" },
  { title: "Web Development", description: "Building responsive, performant websites...", icon: "code" },
  { title: "Prototyping",     description: "Creating high-fidelity interactive mockups...", icon: "prototype" },
];

export const workflow = [
  { step: "Discover", detail: "Research users, audit competitors, define problems worth solving." },
  { step: "Define",   detail: "Synthesize insights into clear goals, personas, and success metrics." },
  { step: "Design",   detail: "Iterate from wireframes to polished UI with continuous user feedback." },
  { step: "Deliver",  detail: "Build, test, and ship — then measure, learn, and refine." },
];
```

### `src/data/resume.js`

```js
export const timeline = [
  {
    id: "edu-1",
    category: "education",
    title: "University of Peloponnese",
    subtitle: "Electrical and Computer Engineering",
    date: "2022 - Present",
    description: "Pursuing a degree in Electrical and Computer Engineering...",
  },
  {
    id: "exp-1",
    category: "experience",
    title: "Full-Stack Developer & UX/UI Designer",
    subtitle: "Freelance / Independent",
    date: "2024 - Present",
    description: "Designing and developing end-to-end web applications...",
  },
];

export const skillCategories = [
  { category: "Web Development", skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "React.js", "Axure RP", "C", "Python"] },
  { category: "Databases",       skills: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"] },
];
```

### `src/data/contact.js`

```js
export const contact = {
  email: "your.email@example.com",
  githubUrl: "https://github.com/yourusername",
  linkedinUrl: "https://linkedin.com/in/yourusername",
  location: "Greece",
  heading: "Let's Work Together",
  subtext: "Have a project in mind? Fill out the form below or send me an email anytime.",
};
```

---

## Component Changes

For each page, the change is mechanical:
1. Remove the hardcoded array/object from the top of the component file
2. Add an import from the corresponding `../data/` file
3. Use the imported variable where the hardcoded value was

No logic, layout, styling, or animation changes in any component.

---

## What Does NOT Move

- SVG icon components (`EmailIcon`, `GithubIcon`, `ServiceIcon`, `AboutImage`, etc.) — visual code, stays in components
- Animation hooks (`useReveal`, `useOnScreen`) — logic, stays in components
- Inline styles — layout, stays in components
- Form state and validation logic in `ContactPage.jsx` — logic, stays
- Design token objects (`const T = { bg: ..., accent: ... }`) — styling constants, stays

---

## Out of Scope

- No visual changes
- No logic changes
- No new features
- Adding real content (user's actual data) — done manually by the user after this refactor
