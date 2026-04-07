// src/main.jsx — App entry point. Mounts the React tree onto <div id="root"> in index.html.
import "./index.css";
import { StrictMode } from "react";// StrictMode is a development tool that highlights potential problems in an application. It does not affect the production build.
import { createRoot } from "react-dom/client";// createRoot is the new API for rendering React applications in React 18+. It replaces the older ReactDOM.render method and enables concurrent features.
import { BrowserRouter } from "react-router-dom";// BrowserRouter is a component from React Router that uses the HTML5 history API to keep the UI in sync with the URL. It enables client-side routing, allowing for navigation without full page reloads.
import Navbar         from "./components/Navbar.jsx";
import AnimatedRoutes from "./router.jsx";

createRoot(document.getElementById("root")).render(
  // StrictMode enables extra dev-only warnings (double-renders, deprecated APIs, etc.)
  <StrictMode>
    {/* BrowserRouter enables client-side routing — URL changes without full page reloads */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Navbar sits outside the routes so it renders persistently on every page */}
      <Navbar />
      {/* AnimatedRoutes maps URL paths to page components with animated transitions */}
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
