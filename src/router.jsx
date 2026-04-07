// src/router.jsx — Animated page transitions (fade + slide).
// Strategy: pass a *lagged* location to <Routes> so the old page stays mounted
// and visible during its fade-out, then swap to the new page and fade it in.
import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home          from "./pages/Home/index.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import ServicesPage  from "./pages/ServicesPage.jsx";
import AboutPage     from "./pages/AboutPage.jsx";
import ContactPage   from "./pages/ContactPage.jsx";
import ResumePage    from "./pages/ResumePage.jsx";

export default function AnimatedRoutes() {
  const location = useLocation();

  // shownLocation lags behind the real location — it controls which page
  // <Routes> actually renders, allowing the old page to fade out first.
  const [shownLocation, setShownLocation] = useState(location);

  // visible drives the CSS opacity/transform transition.
  const [visible, setVisible] = useState(false);

  // Tracks whether this is the very first render so we can skip the fade-out
  // on initial load (there's no old page to hide).
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      // First load: skip fade-out, just fade in immediately.
      isFirst.current = false;
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    // Navigation: fade out the current page, then swap and fade in the new one.
    setVisible(false);
    window.scrollTo(0, 0); // reset scroll position for the incoming page

    // Wait for the fade-out transition (~300ms) before swapping the route.
    const t = setTimeout(() => {
      setShownLocation(location);                    // now render the new page
      requestAnimationFrame(() => setVisible(true)); // trigger fade-in on next paint
    }, 300);

    return () => clearTimeout(t); // cancel if the user navigates again mid-transition
  }, [location.pathname]); // eslint-disable-line

  return (
    // The wrapper div is the animated container — opacity and translateY are
    // driven by `visible`. cubic-bezier(0.22,1,0.36,1) is an ease-out spring curve.
    <div style={{
      opacity:    visible ? 1 : 0,
      transform:  (isFirst.current || visible) ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)",
      minHeight:  "100vh",
    }}>
      {/* shownLocation (not location) keeps the old page mounted during fade-out */}
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
