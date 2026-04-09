// src/data/services.js
// ─── Edit this file to update the Services page content ───

// icon must be one of: "spec" | "code" | "prototype"
// (these map to the SVG icon components already in ServicesPage.jsx)
export const services = [
  {
    title: "Spec-Driven Development",
    description:
      "Writing detailed specifications before touching code — defining behaviour, edge cases, and acceptance criteria upfront so every implementation decision has a clear reference point.",
    icon: "spec",
  },
  {
    title: "Web Development",
    description:
      "Building full-stack applications with a backend-first mindset — REST APIs, database design, server-side logic, and performant frontends with React.",
    icon: "code",
  },
  {
    title: "Prototyping",
    description:
      "Translating requirements into structured, testable prototypes before implementation — reducing ambiguity and aligning expectations early in the process.",
    icon: "prototype",
  },
];

export const workflow = [
  { step: "Analyse",    detail: "Break down requirements into clear technical constraints, data flows, and system boundaries. I favour spec-driven development and structured spec tooling to define behaviour precisely before implementation begins." },
  { step: "Architect",  detail: "Design data models, API contracts, and service structure built to carry the product through growth, not just launch." },
  { step: "Implement",  detail: "Build from the backend up — business logic, database layer, REST APIs, and a clean frontend layer on top." },
  { step: "Deliver",    detail: "Test, deploy, and refine. Ship software that holds up under real conditions, then improve based on what the data shows." },
];
