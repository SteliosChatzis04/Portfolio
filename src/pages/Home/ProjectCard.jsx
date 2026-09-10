import { useState }    from "react";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import Card            from "../../components/Card.jsx";
import { EyeIcon }     from "../../icons.jsx";
import { fonts, colors } from "../../tokens.js";

function resolveBg(project) {
  if (project.image) return `url(${project.image})`;
  return `linear-gradient(135deg, ${project.color}22 0%, ${project.color}08 100%)`;
}

export default function ProjectCard({ project, delay, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <Card onHoverChange={setHovered} onClick={() => onSelect(project)} style={{ cursor: "pointer" }}>
        <div style={{ overflow: "hidden", height: "190px", position: "relative" }}>
          <div style={{
            width: "100%", height: "100%",
            background: resolveBg(project),
            backgroundSize: "cover", backgroundPosition: "center",
            transform:  hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            filter:     hovered ? "brightness(1.1)" : "brightness(0.75)",
          }} />

          {/* Hover overlay — see .r-hover-overlay for the touch-device variant */}
          <div className="r-hover-overlay" style={{
            position: "absolute", inset: 0,
            background: `linear-gradient(135deg, ${project.color}CC, ${colors.bg}DD)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity .35s ease",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 22px", borderRadius: 100,
              border: "1.5px solid rgba(255,255,255,.4)",
              color: "#fff", fontSize: 13, fontWeight: 500,
              fontFamily: fonts.body, backdropFilter: "blur(6px)",
            }}>
              <EyeIcon /> View Case Study
            </span>
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          <h3 style={{ fontFamily: fonts.body, fontSize: "16px", fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: fonts.body, fontSize: "12px", color: colors.textSecondary, margin: 0 }}>
            {project.tags.join(" • ")}
          </p>
        </div>
      </Card>
    </AnimatedSection>
  );
}
