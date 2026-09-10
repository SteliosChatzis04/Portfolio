// src/data/portfolio.js
// ─── Edit this file to add, edit, or remove portfolio projects ───
//
// Each project:
//   id         unique number
//   title      project name
//   tags       array of label strings shown as chips
//   category   "web" | "data" | "systems"  (used by the filter)
//   color      hex accent color for the icon ring
//   icon       "chart" | "store" | "map" | "brand" | "code" | "zen" | "home"
//   description  one-paragraph summary
//   role         your role on the project
//   duration     how long it took
//   tools        array of tool/tech names
//   challenge    the problem you faced
//   solution     how you solved it
//   outcome      measurable results
//   link         optional URL for the CTA button on the case study
//   linkLabel    optional CTA text — defaults to "View Live Site"

// Filter categories shown on the Portfolio page.
// key must match the `category` field used on projects below.
export const categories = [
  { key: "all",     label: "All" },
  { key: "web",     label: "Web Apps" },
  { key: "data",    label: "Data & Analytics" },
  { key: "systems", label: "Systems" },
];

export const projects = [
  {
    id: 1,
    title: "LoL Insights & Analytics Tool",
    tags: ["Python", "React", "Riot API"],
    category: "data",
    color: "#818cf8",
    icon: "chart",
    //image: "/Advanced_Analytics_League_Platform.png",
    description:
      "A full-stack analytics application leveraging the Riot Games API to provide advanced player performance metrics and match outcome predictions through interactive data visualisation.",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    tools: ["Python", "React", "Riot Games API"],
    challenge:
      "Processing and presenting large volumes of match data in a way that surfaces meaningful insights — not just raw statistics that overwhelm the user.",
    solution:
      "Built a Python backend to handle API data ingestion and processing, paired with a React frontend featuring custom visualisation components for trend analysis and match prediction.",
    outcome:
      "Working analytics pipeline with a live visualisation layer for tracking player performance trends and predicting match outcomes based on historical data.",
  },
  {
    id: 2,
    title: "Minimal++ Interpreter",
    tags: ["C", "Flex", "Bison"],
    category: "systems",
    color: "#34d399",
    icon: "code",
    description:
      "A compiler front-end and tree-walking interpreter for Minimal++, a Pascal-like teaching language. Source is tokenised, parsed against a hand-written grammar, checked for scope and declaration errors, lowered into an AST, and then executed by walking that tree — all inside a single minicc binary produced by one make.",
    role: "Compiler Engineer",
    duration: "Academic project — Compilers course",
    tools: ["C", "Flex", "Bison", "Make"],
    challenge:
      "Minimal++ has control-flow constructs with no mainstream equivalent — forcase runs only the first matching clause, incase runs every matching one, and doublewhile falls through to an else body when its condition is false from the start — so there was no reference grammar to lean on. Harder still, inout parameters pass by reference: the interpreter cannot simply evaluate an argument down to a value, it has to resolve it back to the caller's storage and write the result into it once the call returns.",
    solution:
      "Split the work along clean phase boundaries — Flex owns tokenisation, Bison the grammar and operator precedence, and separate C modules handle the symbol table, scope resolution, AST construction, and evaluation. Scopes are tracked as a stack of symbol tables so names inside nested functions resolve correctly, and inout arguments bind to their caller-side slot instead of being copied. Every stage recovers rather than aborting: lexical faults are repaired and reported, semantic errors let parsing continue, and runtime faults such as division by zero substitute a safe default.",
    outcome:
      "Runs the full suite of ten sample programs covering control flow, recursion, and both parameter modes. Because each phase recovers instead of halting, a single run surfaces as many real errors as it can find rather than stopping at the first one — the behaviour that actually makes a teaching compiler usable. Open-sourced under MIT.",
    link: "https://github.com/SteliosChatzis04/Minimal-interpreter",
    linkLabel: "View on GitHub",
  },
  {
    id: 3,
    title: "Gaza Digital Archive",
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    color: "#38bdf8",
    icon: "store",
    image: `${import.meta.env.BASE_URL}gaza-archive-preview.png`,
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
  {
    id: 4,
    title: "Personal Portfolio",
    tags: ["React", "JavaScript"],
    category: "web",
    color: "#f472b6",
    icon: "home",
    image: `${import.meta.env.BASE_URL}Portfolio.png`,
    description:
      "A responsive single-page portfolio application built with React, featuring animated UI components, an interactive particle canvas, and a data-driven multi-page architecture.",
    role: "Full-Stack Developer",
    duration: "Ongoing",
    tools: ["React", "JavaScript", "CSS"],
    challenge:
      "Building a portfolio that reflects both technical depth and design sensibility — performant, animated, and easy to maintain as projects evolve.",
    solution:
      "Architected a component-based React application with a clean data-driven structure separating content from presentation, scroll-triggered animations, and an interactive particle canvas background.",
    outcome:
      "A live, deployed portfolio serving as a central hub for professional identity — fully maintainable through a set of structured data files without touching component code.",
  },
];
