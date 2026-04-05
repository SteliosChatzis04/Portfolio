// src/data/portfolio.js
// ─── Edit this file to add, edit, or remove portfolio projects ───
//
// Each project:
//   id         unique number
//   title      project name
//   tags       array of label strings shown as chips
//   category   "web" | "data" | "systems"  (used by the filter)
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
    title: "LoL Insights & Analytics Tool",
    tags: ["Python", "React", "Riot API"],
    category: "data",
    color: "#818cf8",
    icon: "chart",
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
    title: "Custom Language Compiler",
    tags: ["C", "Flex", "Bison"],
    category: "systems",
    color: "#34d399",
    icon: "brand",
    description:
      "A compiler for a custom programming language, covering the full pipeline from lexical analysis and syntax parsing to semantic analysis and code generation.",
    role: "Systems Engineer",
    duration: "Academic project",
    tools: ["C", "Flex", "Bison"],
    challenge:
      "Designing a language grammar and implementing a complete compilation pipeline from scratch — balancing correctness, performance, and clean code generation.",
    solution:
      "Implemented lexical analysis with Flex, syntax parsing with Bison, and semantic analysis in C. Focused on efficient code generation and optimisation techniques to ensure fast execution.",
    outcome:
      "Successfully compiled and executed programs written in the custom language, demonstrating correct handling of the full compilation pipeline from source to output.",
  },
  {
    id: 3,
    title: "Digital Archive Platform",
    tags: ["HTML/CSS", "JavaScript", "Full-Stack"],
    category: "web",
    color: "#38bdf8",
    icon: "store",
    description:
      "A comprehensive digital repository for archiving and categorising large-scale media and documentation, with efficient data indexing and a clean navigation interface.",
    role: "Full-Stack Developer",
    duration: "2 months",
    tools: ["HTML", "CSS", "JavaScript"],
    challenge:
      "Building a system capable of handling large-scale media archives while keeping navigation fast and accessible for non-technical users.",
    solution:
      "Designed a structured indexing system with a clean interface for browsing historical records. Focused on efficient data categorisation and fast retrieval across large datasets.",
    outcome:
      "Delivered a fully functional archive platform with seamless navigation through large media collections and a user-friendly interface for non-technical operators.",
  },
  {
    id: 4,
    title: "Personal Portfolio",
    tags: ["React", "JavaScript"],
    category: "web",
    color: "#f472b6",
    icon: "home",
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
