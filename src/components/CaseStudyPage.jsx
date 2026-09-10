// src/components/CaseStudyPage.jsx
import CaseStudy from "./CaseStudy.jsx";
import { colors, fonts } from "../tokens.js";

export default function CaseStudyPage({ project, onBack }) {
  return (
    // Top padding clears the fixed navbar (~56px + notch); the sides and bottom
    // scale down to the phone gutter.
    <div style={{
      background: colors.bg,
      minHeight: "100vh",
      fontFamily: fonts.body,
      padding: "calc(88px + env(safe-area-inset-top)) clamp(20px, 5vw, 60px) clamp(24px, 5vw, 60px)",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <CaseStudy project={project} onBack={onBack} />
      </div>
    </div>
  );
}
