// src/data/portfolio.js
// ─── Edit this file to add, edit, or remove portfolio projects ───
//
// Each project:
//   id         unique number
//   title      project name
//   tags       array of label strings shown as chips
//   category   "web" | "mobile" | "branding"  (used by the filter)
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
    title: "FinTech Dashboard App",
    tags: ["UI Design", "React"],
    category: "web",
    color: "#38bdf8",
    icon: "chart",
    description:
      "A comprehensive financial analytics dashboard built with React, featuring real-time data visualization, portfolio tracking, and AI-driven market insights.",
    role: "Lead UI Designer & Front-End Developer",
    duration: "3 months",
    tools: ["React", "D3.js", "Figma", "TailwindCSS"],
    challenge:
      "Financial data is inherently complex. The challenge was distilling dense market analytics into intuitive, glanceable views that both novice investors and seasoned traders could navigate with confidence.",
    solution:
      "I designed a modular card-based system with progressive disclosure — surface-level KPIs expand into detailed charts on demand. A custom dark theme reduces eye strain during extended trading sessions, while color-coded indicators provide instant sentiment cues.",
    outcome:
      "The dashboard increased user engagement by 40% and reduced the average time-to-insight from 12 minutes to under 3 minutes during beta testing.",
  },
  {
    id: 2,
    title: "Urban Streetwear",
    tags: ["Web Design", "E-Commerce"],
    category: "web",
    color: "#f472b6",
    icon: "store",
    description:
      "A high-end e-commerce platform for an urban streetwear brand, blending editorial photography with seamless shopping experiences.",
    role: "Web Designer & UX Strategist",
    duration: "2 months",
    tools: ["Figma", "Shopify", "GSAP", "Liquid"],
    challenge:
      "The brand needed a digital storefront that captured the raw energy of street culture while maintaining the polish expected of a premium fashion label.",
    solution:
      "I crafted an editorial-style layout with full-bleed imagery, bold typography, and micro-interactions that echo the kinetic energy of urban environments.",
    outcome:
      "The redesign resulted in a 55% increase in average session duration and a 28% uplift in conversion rate within the first quarter post-launch.",
  },
  {
    id: 3,
    title: "Wanderlust App",
    tags: ["Mobile App", "UX Research"],
    category: "mobile",
    color: "#818cf8",
    icon: "map",
    description:
      "A travel companion mobile app combining intelligent route planning with community-sourced local insights for authentic travel experiences.",
    role: "UX Researcher & Mobile Designer",
    duration: "4 months",
    tools: ["Figma", "Maze", "Miro", "Protopie"],
    challenge:
      "Travelers are overwhelmed by fragmented tools. We needed to unify maps, reviews, bookings, and itineraries into one cohesive experience.",
    solution:
      "Through extensive user research (40+ interviews, diary studies), I designed a context-aware interface that surfaces relevant features based on the traveler's current phase.",
    outcome:
      "User testing showed a 92% task completion rate for itinerary creation. The app achieved a 4.7-star rating within 3 months of soft launch.",
  },
  {
    id: 4,
    title: "EcoBurger Brand",
    tags: ["Branding", "Web Dev"],
    category: "branding",
    color: "#fbbf24",
    icon: "brand",
    description:
      "Complete brand identity and web presence for a sustainable fast-food chain, from logo design to a fully responsive marketing site.",
    role: "Brand Designer & Web Developer",
    duration: "2.5 months",
    tools: ["Illustrator", "Photoshop", "HTML/CSS", "WordPress"],
    challenge:
      "EcoBurger needed to stand out in the crowded fast-food market while authentically communicating its commitment to sustainability.",
    solution:
      "I developed a brand identity that juxtaposes bold, appetite-driven visuals with earthy, organic textures and a playful scroll-driven storytelling approach.",
    outcome:
      "Brand awareness increased 60% in the target demographic within 6 months. The website's bounce rate dropped to 22%, well below the industry average.",
  },
  {
    id: 5,
    title: "ZenMind Yoga",
    tags: ["Mobile App", "Prototyping"],
    category: "mobile",
    color: "#34d399",
    icon: "zen",
    description:
      "A mindfulness and yoga app with guided sessions, progress tracking, and a serene, distraction-free interface for daily wellness.",
    role: "Mobile App Designer & Prototyper",
    duration: "3 months",
    tools: ["Figma", "Protopie", "After Effects", "Lottie"],
    challenge:
      "Wellness apps often feel clinical or overwhelming. The goal was to create a calming digital sanctuary without gamification pressure.",
    solution:
      "I designed a breathing-rhythm-based UI where elements gently pulse in sync with guided breathing. The onboarding adapts to experience level.",
    outcome:
      "The prototype scored 94/100 on usability testing. Daily active retention improved 35% compared to the previous app version.",
  },
  {
    id: 6,
    title: "SmartHome Hub",
    tags: ["UI Design", "IoT"],
    category: "web",
    color: "#a78bfa",
    icon: "home",
    description:
      "A centralized smart home control interface unifying IoT devices into an intuitive, room-based dashboard with automation workflows.",
    role: "UI/UX Designer",
    duration: "3.5 months",
    tools: ["Figma", "React", "Node.js", "MQTT"],
    challenge:
      "Smart home ecosystems are fragmented. The challenge was creating a single pane of glass that's simple yet powerful for advanced automation.",
    solution:
      "I designed a spatial interface organized by rooms with a visual floor plan as primary navigation and a drag-and-drop automation builder.",
    outcome:
      "Beta users reported 70% fewer app switches per day. The automation builder's completion rate hit 88%.",
  },
];
