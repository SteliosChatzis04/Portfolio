import { useState, useEffect } from "react";
import { colors, fonts } from "../../tokens.js";

export function TypewriterGreeting() {
  const text = "Hi, I'm Stelios";
  const [count,         setCount]         = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    if (count < text.length) {
      const t = setTimeout(() => setCount(c => c + 1), 72);
      return () => clearTimeout(t);
    }
    const blink = setInterval(() => setCursorVisible(v => !v), 520);
    const hide  = setTimeout(() => { clearInterval(blink); setCursorVisible(false); }, 2600);
    return () => { clearInterval(blink); clearTimeout(hide); };
  }, [count]);

  return (
    <p style={{
      fontSize: "13px", letterSpacing: "5px", textTransform: "uppercase",
      color: colors.textMuted, marginBottom: "28px", minHeight: "20px",
      fontFamily: fonts.body,
    }}>
      {text.slice(0, count)}
      <span style={{
        color: colors.accent,
        animation: count < text.length ? "none" : "cursorBlink 0.52s step-end infinite",
        opacity: cursorVisible ? 1 : 0,
      }}>|</span>
    </p>
  );
}

export function AnimatedHeroTitle() {
  const words = [
    { text: "Full-Stack", colored: false },
    { text: "Developer", colored: false },
    { text: "&",          colored: false },
    { text: "UX/UI",     colored: true  },
    { text: "Designer",  colored: true  },
  ];
  return (
    <h1 style={{
      fontSize: "clamp(38px,5.5vw,72px)", fontWeight: 700,
      lineHeight: 1.2, marginBottom: "28px", letterSpacing: "-1px",
      fontFamily: fonts.body,
    }}>
      {words.map((w, i) => (
        <span key={i} style={{
          display: "inline-block",
          marginRight: i < words.length - 1 ? "0.28em" : 0,
          animation: `wordReveal 0.75s cubic-bezier(0.22,1,0.36,1) forwards`,
          animationDelay: `${0.9 + i * 0.12}s`,
          opacity: 0,
          ...(w.colored ? {
            background: `linear-gradient(135deg, ${colors.accent}, ${colors.accentDim})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          } : {}),
        }}>
          {w.text}
        </span>
      ))}
    </h1>
  );
}
