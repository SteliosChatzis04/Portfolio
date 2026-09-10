// src/pages/Home/index.jsx
import { useState }          from "react";
import { useNavigate }       from "react-router-dom";
import Footer                from "../../components/Footer.jsx";
import AnimatedSection       from "../../components/AnimatedSection.jsx";
import Button                from "../../components/Button.jsx";
import SectionHeader         from "../../components/SectionHeader.jsx";
import SkillTag              from "../../components/SkillTag.jsx";
import CaseStudyPage         from "../../components/CaseStudyPage.jsx";
import ParticleHero          from "./ParticleHero.jsx";
import { TypewriterGreeting, AnimatedHeroTitle } from "./HeroText.jsx";
import ProjectCard           from "./ProjectCard.jsx";
import ServiceCard           from "./ServiceCard.jsx";
import { ArrowIcon, UIUXIcon, WebDevIcon, PrototypeIcon, SpecIcon } from "../../icons.jsx";
import { hero, bio, skills, featuredProjects, services as homeServices } from "../../data/home.js";
import { colors, fonts }     from "../../tokens.js";

const SERVICE_ICONS = {
  "spec":      <SpecIcon />,
  "webdev":    <WebDevIcon />,
  "prototype": <PrototypeIcon />,
};

export default function Home() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);

  if (selectedProject) {
    return <CaseStudyPage project={selectedProject} onBack={() => setSelectedProject(null)} />;
  }

  return (
    <div style={{ background: colors.bg, color: colors.textPrimary, fontFamily: fonts.body, minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        /* Bio block: image beside text on desktop, stacked on phones. */
        .home-bio {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 52px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .home-bio { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (max-width: 620px) {
          /* The placeholder image adds nothing at phone width — the text leads. */
          .home-bio-media { display: none; }
        }
      `}</style>

      {/* ═══ HERO ═══ */}
      <section className="r-screen" style={{
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 var(--page-x)", overflow: "hidden",
        background: "linear-gradient(135deg,#060d1a 0%,#0a1628 40%,#0d1f35 100%)",
      }}>
        <ParticleHero />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "860px", padding: "0 clamp(0px, 2vw, 24px)" }}>
          <TypewriterGreeting />
          <AnimatedHeroTitle />
          <p style={{
            fontSize: "clamp(15px,1.4vw,19px)", color: colors.textSecondary, lineHeight: 1.75,
            maxWidth: "580px", margin: "0 auto 48px",
            animation: "blurFadeIn 1s ease 1.6s both",
          }}>
            {hero.tagline}
          </p>
          <div style={{
            display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap",
            animation: "fadeInUp 0.8s ease 2s both", opacity: 0,
          }}>
            <Button variant="primary"  onClick={() => navigate("/portfolio")}>View My Work <ArrowIcon /></Button>
            <Button variant="outline"  onClick={() => navigate("/contact")}>Contact Me <ArrowIcon /></Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="r-scroll-hint" style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "fadeInUp 1s ease 1.2s both", opacity: 0.5 }}>
          <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: colors.textMuted }}>Scroll</span>
          <div style={{ width: "1px", height: "44px", background: `linear-gradient(to bottom, ${colors.accent}, transparent)` }} />
        </div>
      </section>

      {/* ═══ PORTFOLIO PREVIEW ═══ */}
      <section style={{ padding: "70px var(--page-x) 50px", maxWidth: "1100px", margin: "0 auto" }}>
        <div className="r-grid-3">
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 0.15} onSelect={setSelectedProject} />
          ))}
        </div>
      </section>

      {/* ═══ WHAT I DO ═══ */}
      <section style={{ padding: "70px var(--page-x)", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>What I Do</SectionHeader>
        </AnimatedSection>
        <div className="r-grid-3">
          {homeServices.map((s, i) => (
            <ServiceCard key={s.title} icon={SERVICE_ICONS[s.icon]} title={s.title} description={s.description} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </section>

      {/* ═══ WHO I AM ═══ */}
      <section style={{ padding: "70px var(--page-x)", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>Who I am</SectionHeader>
        </AnimatedSection>
        <div className="home-bio">
          <AnimatedSection className="home-bio-media" delay={0.1} direction="left">
            <div style={{ borderRadius: "12px", overflow: "hidden", border: `1px solid ${colors.border}`, aspectRatio: "4/3", background: "linear-gradient(135deg,#0d1b2a 0%,#1b2838 50%,#2a3a4a 100%)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ fontSize: "48px", opacity: 0.25 }}>📸</div>
              <div style={{ position: "absolute", bottom: "12px", right: "12px", fontSize: "11px", color: colors.textMuted, fontStyle: "italic" }}>Your photo here</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.25} direction="right">
            <div>
              <h3 style={{ fontSize: "clamp(21px, 4.6vw, 26px)", fontWeight: 700, marginBottom: "20px", lineHeight: 1.35, letterSpacing: "-0.3px" }}>
                {bio.headline}
              </h3>
              <p style={{ fontSize: "15px", color: colors.textSecondary, lineHeight: 1.85, marginBottom: "28px" }}>
                {bio.body}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {skills.map(s => <SkillTag key={s} label={s} />)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </div>
  );
}
