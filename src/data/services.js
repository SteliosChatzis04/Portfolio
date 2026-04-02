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
