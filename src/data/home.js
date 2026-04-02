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
