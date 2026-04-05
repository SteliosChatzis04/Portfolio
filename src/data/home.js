// src/data/home.js
// ─── Edit this file to update Home page content ───

export const hero = {
  tagline:
    "I build software from the ground up — architecturally sound, performant, and refined at every layer of the stack.",
};

export const bio = {
  headline: "Engineering software from architecture to interface.",
  body: "Currently pursuing an MEng in Electrical and Computer Engineering at the University of Peloponnese, I work across the full stack with a clear focus on backend systems — REST APIs, database architecture, and server-side logic. My coursework spans data structures, compilers, algorithms, and distributed systems, building the rigour to write software that holds up beyond the prototype.",
};

export const skills = ["Java", "Python", "Node.js", "React", "C", "SQL"];

// Mini cards shown on the home page — update title/subtitle when you have real projects.
// imageUrl can be a CSS gradient string or a real image path e.g. "/images/project1.jpg"
export const featuredProjects = [
  {
    title: "LoL Insights & Analytics Tool",
    subtitle: "Python • React • Riot API",
    imageUrl: "linear-gradient(135deg,#0d0a2e 0%,#1a1550 50%,#2d2080 100%)",
  },
  {
    title: "Custom Language Compiler",
    subtitle: "C • Flex • Bison",
    imageUrl: "linear-gradient(135deg,#0a1f0d 0%,#0f3318 50%,#1a4f28 100%)",
  },
  {
    title: "Digital Archive Platform",
    subtitle: "HTML • CSS • JavaScript",
    imageUrl: "linear-gradient(135deg,#0a1930 0%,#0f2545 50%,#0a3a6e 100%)",
  },
];

// Mini service cards on the home page (separate from the full Services page)
export const services = [
  {
    title: "Interface Design",
    description:
      "Crafting clean, functional interfaces informed by engineering judgment — supported by working knowledge of Figma and Axure.",
  },
  {
    title: "Web Dev",
    description:
      "Building full-stack applications with a backend-first mindset — REST APIs, database design, and server-side architecture that scales.",
  },
  {
    title: "Prototyping",
    description:
      "Translating requirements into structured, testable prototypes before implementation — reducing ambiguity and aligning expectations early.",
  },
];
