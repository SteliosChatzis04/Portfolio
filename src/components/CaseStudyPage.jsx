// src/components/CaseStudyPage.jsx
import CaseStudy from "./CaseStudy.jsx";
import { colors, fonts } from "../tokens.js";

export default function CaseStudyPage({ project, onBack }) {
  return (
    <div style={{ background: colors.bg, minHeight: "100vh", fontFamily: fonts.body, padding: "clamp(24px, 5vw, 60px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <CaseStudy project={project} onBack={onBack} />
      </div>
    </div>
  );
}
