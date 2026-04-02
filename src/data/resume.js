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
