// src/data/home.js
// ─── Edit this file to update Home page content ───
// featuredProjects is derived from portfolio.js — edit projects there, not here.

export const hero = {
  tagline:
    "I build software from the ground up — architecturally sound, performant, and refined at every layer of the stack.",
};

export const bio = {
  headline: "Engineering software from architecture to interface.",
  body: "Currently pursuing an MEng in Electrical and Computer Engineering at the University of Peloponnese, I work across the full stack with a clear focus on backend systems — REST APIs, database architecture, and server-side logic. My coursework spans data structures, compilers, algorithms, and distributed systems, building the rigour to write software that holds up beyond the prototype.",
};

export const skills = ["Java", "Python", "Node.js", "React", "C", "SQL"];

import { projects } from "./portfolio.js";

// Top 3 projects shown on the home page — full objects sourced from portfolio.js (single source of truth).
export const featuredProjects = projects.slice(0, 3);

// Mini service cards on the home page (separate from the full Services page)
export const services = [
  {
    icon: "design",
    title: "Interface Design",
    description:
      "Crafting clean, functional interfaces informed by engineering judgment — supported by working knowledge of Figma and Axure.",
  },
  {
    icon: "webdev",
    title: "Web Dev",
    description:
      "Building full-stack applications with a backend-first mindset — REST APIs, database design, and server-side architecture that scales.",
  },
  {
    icon: "prototype",
    title: "Prototyping",
    description:
      "Translating requirements into structured, testable prototypes before implementation — reducing ambiguity and aligning expectations early.",
  },
];
