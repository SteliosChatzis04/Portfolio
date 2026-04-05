import { useState }    from "react";
import AnimatedSection from "../../components/AnimatedSection.jsx";
import Card            from "../../components/Card.jsx";
import { fonts, colors } from "../../tokens.js";

export default function ProjectCard({ title, subtitle, imageUrl, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <Card onHoverChange={setHovered}>
        <div style={{ overflow: "hidden", height: "190px" }}>
          <div style={{
            width: "100%", height: "100%",
            background: imageUrl,
            backgroundSize: "cover", backgroundPosition: "center",
            transform:  hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
            filter:     hovered ? "brightness(1.1)" : "brightness(0.75)",
          }} />
        </div>
        <div style={{ padding: "20px" }}>
          <h3 style={{ fontFamily: fonts.body, fontSize: "16px", fontWeight: 600, color: "#fff", margin: "0 0 6px" }}>
            {title}
          </h3>
          <p style={{ fontFamily: fonts.body, fontSize: "12px", color: colors.textSecondary, margin: 0 }}>
            {subtitle}
          </p>
        </div>
      </Card>
    </AnimatedSection>
  );
}
