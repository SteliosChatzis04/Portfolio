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
    subtitle: "MEng in Electrical and Computer Engineering — Software Engineering Track",
    date: "2022 — Expected 2027",
    description:
      "Five-year MEng programme with a focus on the software engineering track. Coursework includes Data Structures, Compilers, Database Systems, Advanced Algorithms, Operating Systems, Distributed Systems, Full-Stack Web Development, and UX/UI Design.",
  },
  {
    id: "exp-1",
    category: "experience",
    title: "Software Engineer",
    subtitle: "Personal & Academic Projects",
    date: "2022 — Present",
    description:
      "Building full-stack applications across a range of domains — from data analytics tools and compilers to digital archive platforms. Focused on backend architecture, REST API design, and database modelling.",
  },
  {
    id: "exp-2",
    category: "experience",
    title: "PwC Software Academy",
    subtitle: "PwC Greece — Certified by EOPPEP",
    date: "January 2026",
    description:
      "Completed a 25-hour professional software development programme organised by PwC Greece, certified by EOPPEP as a Lifelong Learning Centre.",
  },
];

// Skill category lists shown in the skills section of the resume
export const skillCategories = [
  {
    category: "Languages",
    skills: ["C", "Python", "Java", "JavaScript", "HTML/CSS", "SQL"],
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React", "Node.js", "FastAPI", "Bootstrap"],
  },
  {
    category: "Databases",
    skills: ["MySQL", "SQLite", "MongoDB", "Cassandra", "Neo4J"],
  },
  {
    category: "Tools & Technologies",
    skills: ["Git", "Docker", "Linux", "REST APIs", "Figma"],
  },
];
