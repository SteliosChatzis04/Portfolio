import { useRef, useCallback, useEffect } from "react";

export default function ParticleHero() {
  const canvasRef    = useRef(null);
  const mouseRef     = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animRef      = useRef(null);

  const initParticles = useCallback((w, h) => {
    const count = Math.floor((w * h) / 12000);
    particlesRef.current = Array.from({ length: Math.min(count, 80) }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      baseVx: (Math.random() - 0.5) * 0.25,
      baseVy: (Math.random() - 0.5) * 0.25,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.01 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, frame = 0;

    const resize = () => {
      const newW = canvas.parentElement.offsetWidth;
      const newH = canvas.parentElement.offsetHeight;
      // Re-seed on width change only. On mobile the collapsing URL bar fires
      // resize with a ~60px height delta while scrolling; re-seeding there
      // would make the field visibly jump mid-scroll.
      const changed = !w || Math.abs(newW - w) > 10;
      w = newW; h = newH;
      // Cap DPR at 2 — a 3x phone screen triples the fill cost for no
      // perceptible gain on a soft particle glow.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = w * dpr; canvas.height = h * dpr;
      canvas.style.width  = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (changed) initParticles(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    // Respect the OS "reduce motion" setting: paint one static frame, no loop.
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onMove  = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles   = particlesRef.current;
      const mouseActive = mx > -1000;

      particles.forEach((p) => {
        const pulse = Math.sin(frame * p.pulseSpeed + p.pulsePhase) * 0.15 + 1;
        if (mouseActive) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150;
            p.vx += (dx / dist) * force * 0.35;
            p.vy += (dy / dist) * force * 0.35;
          }
        }
        p.vx += (p.baseVx - p.vx) * 0.02;
        p.vy += (p.baseVy - p.vy) * 0.02;
        p.x  += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;

        const glowR = p.r * pulse;
        const grad  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 3);
        grad.addColorStop(0, `rgba(0,229,255,${p.alpha * pulse})`);
        grad.addColorStop(1, "rgba(0,229,255,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha * 1.5 * pulse})`; ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      if (mouseActive) {
        particles.forEach((p) => {
          const dx   = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 200)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        });
      }
      if (!reduceMotion) animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
