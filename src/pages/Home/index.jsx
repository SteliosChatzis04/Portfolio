// src/pages/Home/index.jsx
import { useNavigate }       from "react-router-dom";
import Footer                from "../../components/Footer.jsx";
import AnimatedSection       from "../../components/AnimatedSection.jsx";
import Button                from "../../components/Button.jsx";
import SectionHeader         from "../../components/SectionHeader.jsx";
import SkillTag              from "../../components/SkillTag.jsx";
import ParticleHero          from "./ParticleHero.jsx";
import { TypewriterGreeting, AnimatedHeroTitle } from "./HeroText.jsx";
import ProjectCard           from "./ProjectCard.jsx";
import ServiceCard           from "./ServiceCard.jsx";
import { ArrowIcon, UIUXIcon, WebDevIcon, PrototypeIcon } from "../../icons.jsx";
import { hero, bio, skills, featuredProjects, services as homeServices } from "../../data/home.js";
import { colors, fonts }     from "../../tokens.js";

const SERVICE_ICONS = {
  "Interface Design": <UIUXIcon />,
  "Web Dev":          <WebDevIcon />,
  "Prototyping":      <PrototypeIcon />,
};

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ background: colors.bg, color: colors.textPrimary, fontFamily: fonts.body, minHeight: "100vh", overflowX: "hidden" }}>

      {/* ═══ HERO ═══ */}
      <section style={{
        position: "relative", height: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "0 48px", overflow: "hidden",
        background: "linear-gradient(135deg,#060d1a 0%,#0a1628 40%,#0d1f35 100%)",
      }}>
        <ParticleHero />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: "860px", padding: "0 24px" }}>
          <TypewriterGreeting />
          <AnimatedHeroTitle />
          <p style={{
            fontSize: "clamp(15px,1.4vw,19px)", color: "#6a7a94", lineHeight: 1.75,
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
        <div style={{
          position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)",
          zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
          animation: "fadeInUp 1s ease 1.2s both", opacity: 0.5,
        }}>
          <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: colors.textMuted }}>Scroll</span>
          <div style={{ width: "1px", height: "44px", background: `linear-gradient(to bottom, ${colors.accent}, transparent)` }} />
        </div>
      </section>

      {/* ═══ PORTFOLIO PREVIEW ═══ */}
      <section style={{ padding: "70px 48px 50px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }}>
          {featuredProjects.map((p, i) => (
            <ProjectCard key={p.title} title={p.title} subtitle={p.subtitle} imageUrl={p.imageUrl} delay={i * 0.15} />
          ))}
        </div>
      </section>

      {/* ═══ WHAT I DO ═══ */}
      <section style={{ padding: "70px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>What I Do</SectionHeader>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }}>
          {homeServices.map((s, i) => (
            <ServiceCard key={s.title} icon={SERVICE_ICONS[s.title]} title={s.title} description={s.description} delay={0.1 + i * 0.15} />
          ))}
        </div>
      </section>

      {/* ═══ WHO I AM ═══ */}
      <section style={{ padding: "70px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <SectionHeader>Who I am</SectionHeader>
        </AnimatedSection>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "52px", alignItems: "center" }}>
          <AnimatedSection delay={0.1} direction="left">
            <div style={{
              borderRadius: "12px", overflow: "hidden",
              border: `1px solid ${colors.border}`, aspectRatio: "4/3",
              background: "linear-gradient(135deg,#0d1b2a 0%,#1b2838 50%,#2a3a4a 100%)",
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              <div style={{ fontSize: "48px", opacity: 0.25 }}>📸</div>
              <div style={{ position: "absolute", bottom: "12px", right: "12px", fontSize: "11px", color: colors.textMuted, fontStyle: "italic" }}>
                Your photo here
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.25} direction="right">
            <div>
              <h3 style={{ fontSize: "26px", fontWeight: 700, marginBottom: "20px", lineHeight: 1.35, letterSpacing: "-0.3px" }}>
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
