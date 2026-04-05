import "./index.css";
import { StrictMode, useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar         from "./components/Navbar.jsx";
import Home           from "./pages/Home.jsx";
import PortfolioPage  from "./pages/PortfolioPage.jsx";
import ServicesPage   from "./pages/ServicesPage.jsx";
import AboutPage      from "./pages/AboutPage.jsx";
import ContactPage    from "./pages/ContactPage.jsx";
import ResumePage     from "./pages/ResumePage.jsx";

function AnimatedRoutes() {
  const location                          = useLocation();
  const [shownLocation, setShownLocation] = useState(location);
  const [visible,       setVisible]       = useState(false);
  const isFirst                           = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      requestAnimationFrame(() => setVisible(true));
      return;
    }
    setVisible(false);
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      setShownLocation(location);
      requestAnimationFrame(() => setVisible(true));
    }, 300);
    return () => clearTimeout(t);
  }, [location.pathname]); // eslint-disable-line

  return (
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  (isFirst.current || visible) ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      minHeight:  "100vh",
    }}>
      <Routes location={shownLocation}>
        <Route path="/"          element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/services"  element={<ServicesPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/contact"   element={<ContactPage />} />
        <Route path="/resume"    element={<ResumePage />} />
      </Routes>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
    </BrowserRouter>
  </StrictMode>
);
