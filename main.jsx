import { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Portfolio       from "./portfolio.jsx";
import PortfolioSection from "./portfolio-section.jsx";
import ServicesSection  from "./services-section.jsx";
import AboutSection     from "./about-section.jsx";
import ContactSection   from "./contact-section.jsx";
import ResumePage       from "./resume.jsx";

function AnimatedRoutes() {
  const location                        = useLocation();
  const [shownLocation, setShownLocation] = useState(location);
  const [visible,       setVisible]       = useState(false);
  const isFirst                         = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      requestAnimationFrame(() => setVisible(true));
      return;
    }
    // Fade out → swap → fade in
    setVisible(false);
    const t = setTimeout(() => {
      setShownLocation(location);
      requestAnimationFrame(() => setVisible(true));
    }, 300);
    return () => clearTimeout(t);
  }, [location.pathname]); // eslint-disable-line

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      minHeight:  "100vh",
    }}>
      <Routes location={shownLocation}>
        <Route path="/"          element={<Portfolio />} />
        <Route path="/portfolio" element={<PortfolioSection />} />
        <Route path="/services"  element={<ServicesSection />} />
        <Route path="/about"     element={<AboutSection />} />
        <Route path="/contact"   element={<ContactSection />} />
        <Route path="/resume"    element={<ResumePage />} />
      </Routes>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
