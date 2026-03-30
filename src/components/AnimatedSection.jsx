import useOnScreen from "../hooks/useOnScreen";

export default function AnimatedSection({ children, className = "", delay = 0, direction = "up" }) {
  const [ref, isVisible] = useOnScreen();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? "translate(0,0)" : transforms[direction],
      transition: `opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
    }}>{children}</div>
  );
}
