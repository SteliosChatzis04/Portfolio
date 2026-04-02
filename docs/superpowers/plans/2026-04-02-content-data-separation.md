# Content/Data Separation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract all hardcoded content from React page components into dedicated `src/data/` files so content can be updated without touching component logic.

**Architecture:** One data file per page (`home.js`, `portfolio.js`, `about.js`, `services.js`, `resume.js`, `contact.js`). Each file exports plain JS objects/arrays. Components import from these files and use the data exactly where the hardcoded values were. No logic, layout, animation, or styling changes.

**Tech Stack:** React 18, Vite 5 — plain ES module exports, no new dependencies.

> **What does NOT move:** SVG icon components, animation hooks (`useReveal`, `useOnScreen`), inline styles, design token objects (`const T = {...}`), form state/validation logic, `ICON_PATHS` JSX in PortfolioPage, `CATEGORIES` filter array in PortfolioPage.

---

## File Map

| Data file | Source component | What moves |
|---|---|---|
| `src/data/home.js` | `src/pages/Home.jsx` | hero tagline, bio headline+body, skills list, featuredProjects, services |
| `src/data/portfolio.js` | `src/pages/PortfolioPage.jsx` | `PROJECTS` array |
| `src/data/about.js` | `src/pages/AboutPage.jsx` | `STATS`, `SKILLS` |
| `src/data/services.js` | `src/pages/ServicesPage.jsx` | `SERVICES`, `WORKFLOW` |
| `src/data/resume.js` | `src/pages/ResumePage.jsx` | `TIMELINE_DATA`, `SKILLS_DATA` |
| `src/data/contact.js` | `src/pages/ContactPage.jsx` | email, githubUrl, location, heading, subtext |

---

### Task 1: Create `src/data/` directory

**Files:**
- Create: `src/data/` directory

- [ ] **Step 1: Create the directory**

```bash
mkdir -p src/data
```

- [ ] **Step 2: Verify**

```bash
ls src/
```
Expected: `assets  components  data  hooks  pages  utils`

---

### Task 2: Create `src/data/home.js` and update `Home.jsx`

**Files:**
- Create: `src/data/home.js`
- Modify: `src/pages/Home.jsx`

- [ ] **Step 1: Create `src/data/home.js`**

```js
// src/data/home.js
// ─── Edit this file to update Home page content ───

export const hero = {
  tagline:
    "I design and build digital products that combine intuitive user experience with clean, modern code.",
};

export const bio = {
  headline: "Passionate about creating intuitive digital experiences.",
  body: "With a strong background in Computer Engineering and a passion for innovation, I bridge the gap between creative vision and technical precision. I focus on creating user-centric interfaces that solve real problems, ensuring that every digital experience not only functions but also feels intuitive, engaging, and visually compelling.",
};

export const skills = ["Java", "React", "HTML/CSS", "JavaScript", "C", "Python"];

// Mini cards shown on the home page — update title/subtitle when you have real projects.
// imageUrl can be a CSS gradient string or a real image path e.g. "/images/project1.jpg"
export const featuredProjects = [
  {
    title: "FinTech Dashboard App",
    subtitle: "UI Design • Figma",
    imageUrl: "linear-gradient(135deg,#0a1930 0%,#1a2a4a 50%,#0066cc 100%)",
  },
  {
    title: "Urban Streetwear",
    subtitle: "Web Design • E-Commerce",
    imageUrl: "linear-gradient(135deg,#1a1a2e 0%,#2d2d44 50%,#4a4a6a 100%)",
  },
  {
    title: "Wanderlust App",
    subtitle: "Mobile App • UI Research",
    imageUrl: "linear-gradient(135deg,#0d2137 0%,#1a3a5c 50%,#2a5a8c 100%)",
  },
];

// Mini service cards on the home page (separate from the full Services page)
export const services = [
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive and visually stunning interfaces that prioritize user needs and create a memorable digital journey.",
  },
  {
    title: "Web Dev",
    description:
      "Building responsive, high-performance websites using modern technologies that deliver fast, seamless user experiences.",
  },
  {
    title: "Prototyping",
    description:
      "Creating rapid, high-fidelity prototypes to bridge concepts, test usability, and iterate quickly for the best results.",
  },
];
```

- [ ] **Step 2: Update `src/pages/Home.jsx` — add import**

At the top of `Home.jsx`, after the existing imports, add:

```jsx
import { hero, bio, skills, featuredProjects, services as homeServices } from "../data/home.js";
```

- [ ] **Step 3: Update `Home.jsx` — hero tagline paragraph**

Find this line (~line 252):
```jsx
I design and build digital products that combine intuitive user experience with clean, modern code.
```

Replace the text content with `{hero.tagline}`:
```jsx
{hero.tagline}
```

- [ ] **Step 4: Update `Home.jsx` — bio headline and body**

Find (in the WHO I AM section, ~line 314):
```jsx
<h3 style={{ fontSize:"26px",fontWeight:700,marginBottom:"20px",lineHeight:1.35,letterSpacing:"-0.3px" }}>Passionate about creating intuitive digital experiences.</h3>
<p style={{ fontSize:"15px",color:"#7a8ba8",lineHeight:1.85,marginBottom:"28px" }}>With a strong background in Computer Engineering...</p>
```

Replace the hardcoded text with:
```jsx
<h3 style={{ fontSize:"26px",fontWeight:700,marginBottom:"20px",lineHeight:1.35,letterSpacing:"-0.3px" }}>{bio.headline}</h3>
<p style={{ fontSize:"15px",color:"#7a8ba8",lineHeight:1.85,marginBottom:"28px" }}>{bio.body}</p>
```

- [ ] **Step 5: Update `Home.jsx` — skills list**

Find (~line 317):
```jsx
{["Java","React","HTML/CSS","JavaScript","C","Python"].map(s => <SkillTag key={s} label={s}/>)}
```

Replace with:
```jsx
{skills.map(s => <SkillTag key={s} label={s}/>)}
```

- [ ] **Step 6: Update `Home.jsx` — featured project cards**

Find (~lines 280–283):
```jsx
<ProjectCard title="FinTech Dashboard App" subtitle="UI Design • Figma" imageUrl="linear-gradient(135deg,#0a1930 0%,#1a2a4a 50%,#0066cc 100%)" delay={0}/>
<ProjectCard title="Urban Streetwear" subtitle="Web Design • E-Commerce" imageUrl="linear-gradient(135deg,#1a1a2e 0%,#2d2d44 50%,#4a4a6a 100%)" delay={0.15}/>
<ProjectCard title="Wanderlust App" subtitle="Mobile App • UI Research" imageUrl="linear-gradient(135deg,#0d2137 0%,#1a3a5c 50%,#2a5a8c 100%)" delay={0.3}/>
```

Replace with:
```jsx
{featuredProjects.map((p, i) => (
  <ProjectCard key={p.title} title={p.title} subtitle={p.subtitle} imageUrl={p.imageUrl} delay={i * 0.15}/>
))}
```

- [ ] **Step 7: Update `Home.jsx` — service cards**

Find (~lines 293–296):
```jsx
<ServiceCard icon={icons.uiux} title="UI/UX Design" description="Designing intuitive..." delay={0.1}/>
<ServiceCard icon={icons.webdev} title="Web Dev" description="Building responsive..." delay={0.25}/>
<ServiceCard icon={icons.proto} title="Prototyping" description="Creating rapid..." delay={0.4}/>
```

Replace with:
```jsx
{homeServices.map((s, i) => {
  const iconMap = { "UI/UX Design": icons.uiux, "Web Dev": icons.webdev, "Prototyping": icons.proto };
  return (
    <ServiceCard key={s.title} icon={iconMap[s.title]} title={s.title} description={s.description} delay={0.1 + i * 0.15}/>
  );
})}
```

- [ ] **Step 8: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 3: Create `src/data/portfolio.js` and update `PortfolioPage.jsx`

**Files:**
- Create: `src/data/portfolio.js`
- Modify: `src/pages/PortfolioPage.jsx`

- [ ] **Step 1: Create `src/data/portfolio.js`**

```js
// src/data/portfolio.js
// ─── Edit this file to add, edit, or remove portfolio projects ───
//
// Each project has:
//   id         unique number
//   title      project name
//   tags       array of label strings shown as chips
//   category   "web" | "mobile" | "branding"  (used by the filter)
//   color      hex accent color for the icon ring
//   icon       "chart" | "store" | "map" | "brand" | "zen" | "home"
//   description  one-paragraph summary
//   role         your role on the project
//   duration     how long it took
//   tools        array of tool/tech names
//   challenge    the problem you faced
//   solution     how you solved it
//   outcome      measurable results

export const projects = [
  {
    id: 1,
    title: "FinTech Dashboard App",
    tags: ["UI Design", "React"],
    category: "web",
    color: "#38bdf8",
    icon: "chart",
    description:
      "A comprehensive financial analytics dashboard built with React, featuring real-time data visualization, portfolio tracking, and AI-driven market insights.",
    role: "Lead UI Designer & Front-End Developer",
    duration: "3 months",
    tools: ["React", "D3.js", "Figma", "TailwindCSS"],
    challenge:
      "Financial data is inherently complex. The challenge was distilling dense market analytics into intuitive, glanceable views that both novice investors and seasoned traders could navigate with confidence.",
    solution:
      "I designed a modular card-based system with progressive disclosure — surface-level KPIs expand into detailed charts on demand. A custom dark theme reduces eye strain during extended trading sessions, while color-coded indicators provide instant sentiment cues.",
    outcome:
      "The dashboard increased user engagement by 40% and reduced the average time-to-insight from 12 minutes to under 3 minutes during beta testing.",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    tags: ["Web Design", "E-Commerce"],
    category: "web",
    color: "#f472b6",
    icon: "store",
    description:
      "A high-end e-commerce platform for an urban streetwear brand, blending editorial photography with seamless shopping experiences.",
    role: "Web Designer & UX Strategist",
    duration: "2 months",
    tools: ["Figma", "Shopify", "GSAP", "Liquid"],
    challenge:
      "The brand needed a digital storefront that captured the raw energy of street culture while maintaining the polish expected of a premium fashion label.",
    solution:
      "I crafted an editorial-style layout with full-bleed imagery, bold typography, and micro-interactions that echo the kinetic energy of urban environments.",
    outcome:
      "The redesign resulted in a 55% increase in average session duration and a 28% uplift in conversion rate within the first quarter post-launch.",
  },
  {
    id: 3,
    title: "Wanderlust App",
    tags: ["Mobile App", "UX Research"],
    category: "mobile",
    color: "#818cf8",
    icon: "map",
    description:
      "A travel companion mobile app combining intelligent route planning with community-sourced local insights for authentic travel experiences.",
    role: "UX Researcher & Mobile Designer",
    duration: "4 months",
    tools: ["Figma", "Maze", "Miro", "Protopie"],
    challenge:
      "Travelers are overwhelmed by fragmented tools. We needed to unify maps, reviews, bookings, and itineraries into one cohesive experience.",
    solution:
      "Through extensive user research (40+ interviews, diary studies), I designed a context-aware interface that surfaces relevant features based on the traveler's current phase.",
    outcome:
      "User testing showed a 92% task completion rate for itinerary creation. The app achieved a 4.7-star rating within 3 months of soft launch.",
  },
  {
    id: 4,
    title: "EcoBurger Brand",
    tags: ["Branding", "Web Dev"],
    category: "branding",
    color: "#fbbf24",
    icon: "brand",
    description:
      "Complete brand identity and web presence for a sustainable fast-food chain, from logo design to a fully responsive marketing site.",
    role: "Brand Designer & Web Developer",
    duration: "2.5 months",
    tools: ["Illustrator", "Photoshop", "HTML/CSS", "WordPress"],
    challenge:
      "EcoBurger needed to stand out in the crowded fast-food market while authentically communicating its commitment to sustainability.",
    solution:
      "I developed a brand identity that juxtaposes bold, appetite-driven visuals with earthy, organic textures and a playful scroll-driven storytelling approach.",
    outcome:
      "Brand awareness increased 60% in the target demographic within 6 months. The website's bounce rate dropped to 22%, well below the industry average.",
  },
  {
    id: 5,
    title: "ZenMind Yoga",
    tags: ["Mobile App", "Prototyping"],
    category: "mobile",
    color: "#34d399",
    icon: "zen",
    description:
      "A mindfulness and yoga app with guided sessions, progress tracking, and a serene, distraction-free interface for daily wellness.",
    role: "Mobile App Designer & Prototyper",
    duration: "3 months",
    tools: ["Figma", "Protopie", "After Effects", "Lottie"],
    challenge:
      "Wellness apps often feel clinical or overwhelming. The goal was to create a calming digital sanctuary without gamification pressure.",
    solution:
      "I designed a breathing-rhythm-based UI where elements gently pulse in sync with guided breathing. The onboarding adapts to experience level.",
    outcome:
      "The prototype scored 94/100 on usability testing. Daily active retention improved 35% compared to the previous app version.",
  },
  {
    id: 6,
    title: "SmartHome Hub",
    tags: ["UI Design", "IoT"],
    category: "web",
    color: "#a78bfa",
    icon: "home",
    description:
      "A centralized smart home control interface unifying IoT devices into an intuitive, room-based dashboard with automation workflows.",
    role: "UI/UX Designer",
    duration: "3.5 months",
    tools: ["Figma", "React", "Node.js", "MQTT"],
    challenge:
      "Smart home ecosystems are fragmented. The challenge was creating a single pane of glass that's simple yet powerful for advanced automation.",
    solution:
      "I designed a spatial interface organized by rooms with a visual floor plan as primary navigation and a drag-and-drop automation builder.",
    outcome:
      "Beta users reported 70% fewer app switches per day. The automation builder's completion rate hit 88%.",
  },
];
```

- [ ] **Step 2: Update `src/pages/PortfolioPage.jsx` — add import**

At the top of the file, after the existing imports, add:
```js
import { projects as PROJECTS } from "../data/portfolio.js";
```

- [ ] **Step 3: Remove the hardcoded `PROJECTS` array**

Delete the entire `const PROJECTS = [ ... ];` block (lines 25–140 of the original file). The imported `PROJECTS` replaces it.

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 4: Create `src/data/about.js` and update `AboutPage.jsx`

**Files:**
- Create: `src/data/about.js`
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Create `src/data/about.js`**

```js
// src/data/about.js
// ─── Edit this file to update the About page content ───

// Counter stats displayed at the top of the About page
export const stats = [
  { value: "3+",  label: "Years Experience" },
  { value: "15+", label: "Projects Completed" },
  { value: "10+", label: "Happy Clients" },
];

// Skills shown with icons — only edit the `name` field.
// The `icon` field is an SVG path string used to render the icon shape.
export const skills = [
  { name: "Axure",      icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" },
  { name: "React",      icon: "M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" },
  { name: "HTML5/CSS3", icon: "M4 3l1.5 17L12 22l6.5-2L20 3H4zm3.5 4h9l-.3 3H8.2l.2 3h7.8l-.5 5.5L12 19.5l-3.7-1L8 14h2.5l.2 2 1.3.4 1.3-.4.2-2H8.5" },
  { name: "Node.js",    icon: "M12 2L3 7v10l9 5 9-5V7l-9-5zm0 4v12M3 7l9 5 9-5" },
  { name: "JavaScript", icon: "M3 3h18v18H3V3zm9.5 14c0 1.1-.9 2-2 2H9v-1.5h1.5c.3 0 .5-.2.5-.5v-4h1.5v4zm5-1c0 1.1-.9 2-2 2h-2v-1.5h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h2V14h-2c-.3 0-.5.2-.5.5s.2.5.5.5h1c.8 0 1.5.7 1.5 1.5" },
  { name: "C",          icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" },
  { name: "Python",     icon: "M12 2c-1.7 0-3 .5-3.8 1.3C7.4 4.1 7 5.2 7 6.5V9h5v1H6.5C4.6 10 3 11.5 3 14s1.6 4 3.5 4H9v-2.5C9 13.6 10.6 12 12.5 12H17c1.4 0 2.5-1.1 2.5-2.5V6.5C19.5 4.3 16.5 2 12 2zm-1.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10v2.5c0 1.9-1.6 3.5-3.5 3.5H9c-1.4 0-2.5 1.1-2.5 2.5v3C6.5 23.7 9.5 24 12 24c1.7 0 3-.5 3.8-1.3.8-.8 1.2-1.9 1.2-3.2V17h-5v-1h5.5c1.9 0 3.5-1.5 3.5-4s-1.6-3-3.5-3H17zm.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
];
```

- [ ] **Step 2: Update `src/pages/AboutPage.jsx` — add import**

After the existing imports at the top, add:
```js
import { stats as STATS, skills as SKILLS } from "../data/about.js";
```

- [ ] **Step 3: Remove hardcoded `SKILLS` and `STATS` arrays**

Delete the `const SKILLS = [ ... ];` block (lines 19–27) and the `const STATS = [ ... ];` block (lines 29–33). The imports replace them.

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 5: Create `src/data/services.js` and update `ServicesPage.jsx`

**Files:**
- Create: `src/data/services.js`
- Modify: `src/pages/ServicesPage.jsx`

- [ ] **Step 1: Create `src/data/services.js`**

```js
// src/data/services.js
// ─── Edit this file to update the Services page content ───

// icon must be one of: "design" | "code" | "prototype"
// (these map to the SVG icon components already in ServicesPage.jsx)
export const services = [
  {
    title: "UI/UX Design",
    description:
      "Crafting intuitive interfaces through user research, wireframing, and iterative prototyping — always grounded in real user needs.",
    icon: "design",
  },
  {
    title: "Web Development",
    description:
      "Building responsive, performant websites with React, clean architecture, and modern tooling — from concept to deployment.",
    icon: "code",
  },
  {
    title: "Prototyping",
    description:
      "Creating high-fidelity interactive mockups in Axure RP and Figma to validate ideas and align stakeholders before development.",
    icon: "prototype",
  },
];

export const workflow = [
  { step: "Discover", detail: "Research users, audit competitors, define problems worth solving." },
  { step: "Define",   detail: "Synthesize insights into clear goals, personas, and success metrics." },
  { step: "Design",   detail: "Iterate from wireframes to polished UI with continuous user feedback." },
  { step: "Deliver",  detail: "Build, test, and ship — then measure, learn, and refine." },
];
```

- [ ] **Step 2: Update `src/pages/ServicesPage.jsx` — add import**

After the existing imports, add:
```js
import { services as SERVICES, workflow as WORKFLOW } from "../data/services.js";
```

- [ ] **Step 3: Remove hardcoded `SERVICES` and `WORKFLOW` arrays**

Delete the `const SERVICES = [ ... ];` block (lines 5–24) and the `const WORKFLOW = [ ... ];` block (lines 26–43). The imports replace them.

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 6: Create `src/data/resume.js` and update `ResumePage.jsx`

**Files:**
- Create: `src/data/resume.js`
- Modify: `src/pages/ResumePage.jsx`

- [ ] **Step 1: Create `src/data/resume.js`**

```js
// src/data/resume.js
// ─── Edit this file to update Resume timeline and skills ───
//
// timeline entries:
//   id        unique string e.g. "edu-1", "exp-2"
//   category  "education" | "experience"
//   title     institution or job title
//   subtitle  degree/field or company name
//   date      date range string e.g. "2022 - Present"
//   description  one-paragraph summary

export const timeline = [
  {
    id: "edu-1",
    category: "education",
    title: "University of Peloponnese",
    subtitle: "Electrical and Computer Engineering",
    date: "2022 - Present",
    description:
      "Pursuing a degree in Electrical and Computer Engineering, building a strong foundation in software development, systems design, and engineering principles.",
  },
  {
    id: "exp-1",
    category: "experience",
    title: "Full-Stack Developer & UX/UI Designer",
    subtitle: "Freelance / Independent",
    date: "2024 - Present",
    description:
      "Designing and developing end-to-end web applications with a focus on clean UI/UX, responsive design, and modern tech stacks.",
  },
];

// Skill category lists shown in the skills section of the resume
export const skillCategories = [
  {
    category: "Web Development",
    skills: ["HTML5", "CSS3", "JavaScript", "Node.js", "React.js", "Axure RP", "C", "Python"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "SQLite", "PostgreSQL", "MongoDB", "Cassandra", "Neo4j"],
  },
];
```

- [ ] **Step 2: Update `src/pages/ResumePage.jsx` — add import**

After the existing imports, add:
```js
import { timeline as TIMELINE_DATA, skillCategories as SKILLS_DATA } from "../data/resume.js";
```

- [ ] **Step 3: Remove hardcoded `TIMELINE_DATA` and `SKILLS_DATA` arrays**

Delete the `const TIMELINE_DATA = [ ... ];` block (lines 4–23) and the `const SKILLS_DATA = [ ... ];` block (lines 25–34). The imports replace them.

- [ ] **Step 4: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 7: Create `src/data/contact.js` and update `ContactPage.jsx`

**Files:**
- Create: `src/data/contact.js`
- Modify: `src/pages/ContactPage.jsx`

- [ ] **Step 1: Create `src/data/contact.js`**

```js
// src/data/contact.js
// ─── Edit this file to update contact details ───

export const contact = {
  email: "your.email@example.com",
  githubUrl: "https://github.com/yourusername",
  location: "Piraeus, Greece",
  heading: "Let's Work Together",
  subtext: "Have a project in mind? Fill out the form below or send me an email anytime.",
};
```

- [ ] **Step 2: Update `src/pages/ContactPage.jsx` — add import**

After the existing imports, add:
```js
import { contact } from "../data/contact.js";
```

- [ ] **Step 3: Update email href and text**

Find (~line 303):
```jsx
<a href="mailto:your.email@example.com" style={{...}}>
  your.email@example.com
</a>
```

Replace with:
```jsx
<a href={`mailto:${contact.email}`} style={{...}}>
  {contact.email}
</a>
```

- [ ] **Step 4: Update location text**

Find (~line 325):
```jsx
<span style={{ color: "#e2e8f0", fontSize: 14 }}>Piraeus, Greece</span>
```

Replace with:
```jsx
<span style={{ color: "#e2e8f0", fontSize: 14 }}>{contact.location}</span>
```

- [ ] **Step 5: Update GitHub link href**

Find (~line 342):
```jsx
href="https://github.com/yourusername"
```

Replace with:
```jsx
href={contact.githubUrl}
```

- [ ] **Step 6: Verify build**

```bash
npm run build
```
Expected: `✓ built in ...s` with no errors.

---

### Task 8: Final commit

- [ ] **Step 1: Run final build to confirm everything is clean**

```bash
npm run build
```
Expected: `✓ built in ...s` — 0 errors.

- [ ] **Step 2: Commit**

```bash
git add src/data/ src/pages/Home.jsx src/pages/PortfolioPage.jsx src/pages/AboutPage.jsx src/pages/ServicesPage.jsx src/pages/ResumePage.jsx src/pages/ContactPage.jsx
git commit -m "refactor: extract hardcoded content into src/data/ files"
```
