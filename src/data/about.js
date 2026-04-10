// src/data/about.js
// ─── Edit this file to update the About page content ───

export const bio = {
  label: "Who I am",
  heading: "Engineering software with precision and purpose.",
  body: "I'm an Electrical and Computer Engineering student at the University of Peloponnese, focused on backend systems and software architecture. My academic path spans data structures, compilers, distributed systems, and full-stack development — building the depth to approach software problems with rigour and clarity. I favour spec-driven development and clean architecture, and I build at every layer of the stack.",
};

// Counter stats displayed at the top of the About page
export const stats = [
  { value: "4+",  label: "Projects Built" },
  { value: "3+",  label: "Years Experience" },
  { value: "10+", label: "Technologies" },
  { value: "5+",  label: "Databases" },
];

// Skills shown with icons — only edit the `name` field freely.
// The `icon` field is an SVG path string used to render the icon shape.
export const skills = [
  { name: "Java",       icon: "M8 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2M16 3h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2M12 8v8M9 11h6" },
  { name: "React",      icon: "M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2" },
  { name: "SQL",        icon: "M12 2C6.48 2 2 4.24 2 7s4.48 5 10 5 10-2.24 10-5-4.48-5-10-5zM2 17c0 2.76 4.48 5 10 5s10-2.24 10-5M2 12c0 2.76 4.48 5 10 5s10-2.24 10-5M2 7v10" },
  { name: "Node.js",    icon: "M12 2L3 7v10l9 5 9-5V7l-9-5zm0 4v12M3 7l9 5 9-5" },
  { name: "JavaScript", icon: "M3 3h18v18H3V3zm9.5 14c0 1.1-.9 2-2 2H9v-1.5h1.5c.3 0 .5-.2.5-.5v-4h1.5v4zm5-1c0 1.1-.9 2-2 2h-2v-1.5h2c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h2V14h-2c-.3 0-.5.2-.5.5s.2.5.5.5h1c.8 0 1.5.7 1.5 1.5" },
  { name: "C",          icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1 5h2v3h3v2h-3v3h-2v-3H8v-2h3V7z" },
  { name: "Python",     icon: "M12 2c-1.7 0-3 .5-3.8 1.3C7.4 4.1 7 5.2 7 6.5V9h5v1H6.5C4.6 10 3 11.5 3 14s1.6 4 3.5 4H9v-2.5C9 13.6 10.6 12 12.5 12H17c1.4 0 2.5-1.1 2.5-2.5V6.5C19.5 4.3 16.5 2 12 2zm-1.5 2.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 10v2.5c0 1.9-1.6 3.5-3.5 3.5H9c-1.4 0-2.5 1.1-2.5 2.5v3C6.5 23.7 9.5 24 12 24c1.7 0 3-.5 3.8-1.3.8-.8 1.2-1.9 1.2-3.2V17h-5v-1h5.5c1.9 0 3.5-1.5 3.5-4s-1.6-3-3.5-3H17zm.5 9.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" },
];
