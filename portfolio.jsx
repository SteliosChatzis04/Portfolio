import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";


// ─── Intersection Observer hook ───
function useOnScreen(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, isVisible];
}

// ─── Animated Section ───
function AnimatedSection({ children, className = "", delay = 0, direction = "up" }) {
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

// ─── Interactive Particle Background (Refined) ───
function ParticleHero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const animRef = useRef(null);

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
      const changed = !w || !h || Math.abs(newW - w) > 10 || Math.abs(newH - h) > 10;
      w = newW; h = newH;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (changed) initParticles(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;
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
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = w + 10; if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; if (p.y > h + 10) p.y = -10;
        const glowR = p.r * pulse;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 3);
        grad.addColorStop(0, `rgba(0,229,255,${p.alpha * pulse})`);
        grad.addColorStop(1, "rgba(0,229,255,0)");
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR * 3, 0, Math.PI * 2); ctx.fillStyle = grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha * 1.5 * pulse})`; ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - dist / 160)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }

      if (mouseActive) {
        particles.forEach((p) => {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my);
            ctx.strokeStyle = `rgba(0,229,255,${0.12 * (1 - dist / 200)})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        });
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, [initParticles]);

  return <canvas ref={canvasRef} style={{ position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0 }}/>;
}

// ─── SVG Icons ───
const icons = {
  uiux: (<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="14" height="14" rx="2" stroke="#00e5ff" strokeWidth="2"/><rect x="22" y="4" width="14" height="14" rx="2" stroke="#00e5ff" strokeWidth="2"/><rect x="4" y="22" width="14" height="14" rx="2" stroke="#00e5ff" strokeWidth="2"/><rect x="22" y="22" width="14" height="14" rx="7" stroke="#00e5ff" strokeWidth="2"/></svg>),
  webdev: (<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><polyline points="12,10 4,20 12,30" stroke="#00e5ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><polyline points="28,10 36,20 28,30" stroke="#00e5ff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><line x1="22" y1="6" x2="18" y2="34" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round"/></svg>),
  proto: (<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="14" stroke="#00e5ff" strokeWidth="2"/><circle cx="20" cy="20" r="6" stroke="#00e5ff" strokeWidth="2"/><line x1="20" y1="6" x2="20" y2="2" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round"/><line x1="20" y1="38" x2="20" y2="34" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round"/><line x1="6" y1="20" x2="2" y2="20" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round"/><line x1="38" y1="20" x2="34" y2="20" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round"/></svg>),
  arrow: (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{flexShrink:0}}><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>),
};

function SectionDivider() {
  return <div style={{ width:"60px",height:"3px",borderRadius:"2px",background:"linear-gradient(90deg,#00e5ff,transparent)",margin:"0 auto 48px" }}/>;
}



function ProjectCard({ title, subtitle, imageUrl, delay }) {
  const [h, setH] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background:"rgba(15,25,50,0.7)",borderRadius:"12px",overflow:"hidden",border:`1px solid ${h?"rgba(0,229,255,0.25)":"rgba(0,229,255,0.08)"}`,cursor:"pointer",transform:h?"translateY(-10px) scale(1.02)":"translateY(0) scale(1)",boxShadow:h?"0 24px 48px rgba(0,0,0,0.5), 0 0 30px rgba(0,229,255,0.08)":"0 4px 20px rgba(0,0,0,0.2)",transition:"all 0.45s cubic-bezier(0.25,0.46,0.45,0.94)" }}>
        <div style={{ overflow:"hidden",height:"190px" }}>
          <div style={{ width:"100%",height:"100%",background:imageUrl,backgroundSize:"cover",backgroundPosition:"center",transform:h?"scale(1.1)":"scale(1)",transition:"transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",filter:h?"brightness(1.1)":"brightness(0.75)" }}/>
        </div>
        <div style={{ padding:"20px" }}>
          <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"16px",fontWeight:600,color:"#fff",margin:"0 0 6px" }}>{title}</h3>
          <p style={{ fontFamily:"'Outfit',sans-serif",fontSize:"12px",color:"#7a8ba8",margin:0 }}>{subtitle}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ServiceCard({ icon, title, description, delay }) {
  const [h, setH] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ background:h?"rgba(0,229,255,0.04)":"rgba(15,25,50,0.5)",borderRadius:"12px",padding:"36px 24px",border:`1px solid ${h?"rgba(0,229,255,0.2)":"rgba(0,229,255,0.06)"}`,textAlign:"center",transition:"all 0.4s ease",transform:h?"translateY(-6px)":"translateY(0)",boxShadow:h?"0 16px 32px rgba(0,0,0,0.3)":"none" }}>
        <div style={{ width:"72px",height:"72px",borderRadius:"50%",border:`2px solid ${h?"rgba(0,229,255,0.5)":"rgba(0,229,255,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",background:h?"rgba(0,229,255,0.08)":"transparent",transition:"all 0.4s",transform:h?"scale(1.08)":"scale(1)" }}>{icon}</div>
        <h3 style={{ fontFamily:"'Outfit',sans-serif",fontSize:"18px",fontWeight:600,color:"#fff",margin:"0 0 12px" }}>{title}</h3>
        <p style={{ fontFamily:"'Outfit',sans-serif",fontSize:"13px",lineHeight:1.7,color:"#7a8ba8",margin:0 }}>{description}</p>
      </div>
    </AnimatedSection>
  );
}

function SkillTag({ label }) {
  const [h, setH] = useState(false);
  return (
    <span onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} style={{ display:"inline-block",padding:"8px 22px",borderRadius:"20px",background:h?"rgba(0,229,255,0.15)":"rgba(0,229,255,0.05)",border:`1px solid ${h?"rgba(0,229,255,0.4)":"rgba(0,229,255,0.15)"}`,color:h?"#fff":"#00e5ff",fontSize:"13px",fontWeight:500,fontFamily:"'Outfit',sans-serif",transition:"all 0.3s ease",cursor:"default",transform:h?"scale(1.08)":"scale(1)" }}>
      {label}
    </span>
  );
}

// ─── Main App ───
export default function Portfolio() {
  const [formData, setFormData] = useState({ name:"",email:"",message:"" });
  const navigate = useNavigate();
  return (
    <div style={{ background:"#080e1c",color:"#ffffff",fontFamily:"'Outfit',sans-serif",minHeight:"100vh",overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Code:wght@300;400&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(0,229,255,0.3);color:#fff}
        input::placeholder,textarea::placeholder{color:#4a5670}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <Navbar/>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ position:"relative",height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 48px",overflow:"hidden",background:"linear-gradient(135deg,#060d1a 0%,#0a1628 40%,#0d1f35 100%)" }}>
        <ParticleHero/>
        <div style={{ position:"relative",zIndex:1,textAlign:"center",maxWidth:"860px",padding:"0 24px" }}>
          <p style={{ fontSize:"13px",letterSpacing:"5px",textTransform:"uppercase",color:"#5a6a84",marginBottom:"28px",animation:"fadeInUp 0.8s ease forwards" }}>Hi! I am Stelios</p>
          <h1 style={{ fontSize:"clamp(38px,5.5vw,72px)",fontWeight:700,lineHeight:1.1,marginBottom:"28px",animation:"fadeInUp 0.8s ease 0.2s both",letterSpacing:"-1px" }}>
            Full-Stack Developer &{" "}
            <span style={{ background:"linear-gradient(135deg,#00e5ff,#00b8d4)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>UX/UI Designer</span>
          </h1>
          <p style={{ fontSize:"clamp(15px,1.4vw,19px)",color:"#6a7a94",lineHeight:1.75,maxWidth:"580px",margin:"0 auto 48px",animation:"fadeInUp 0.8s ease 0.4s both" }}>
            I design and build digital products that combine intuitive user experience with clean, modern code.
          </p>
          <div style={{ display:"flex",gap:"20px",justifyContent:"center",flexWrap:"wrap",animation:"fadeInUp 0.8s ease 0.6s both" }}>
            <button onClick={() => navigate("/portfolio")}
              style={{ padding:"16px 38px",borderRadius:"8px",background:"linear-gradient(135deg,#0099cc,#00b8d4)",color:"#fff",border:"none",fontFamily:"'Outfit',sans-serif",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",transition:"all 0.35s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,184,212,0.4)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              View My Work {icons.arrow}
            </button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
              style={{ padding:"16px 38px",borderRadius:"8px",background:"transparent",color:"#00b8d4",border:"2px solid rgba(0,184,212,0.6)",fontFamily:"'Outfit',sans-serif",fontSize:"15px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",transition:"all 0.35s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 36px rgba(0,184,212,0.2)";e.currentTarget.style.background="rgba(0,184,212,0.08)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.background="transparent";}}>
              Contact Me {icons.arrow}
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position:"absolute",bottom:"36px",left:"50%",transform:"translateX(-50%)",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",animation:"fadeInUp 1s ease 1.2s both",opacity:0.5 }}>
          <span style={{ fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:"#5a6a84" }}>Scroll</span>
          <div style={{ width:"1px",height:"44px",background:"linear-gradient(to bottom,#00e5ff,transparent)" }}/>
        </div>
      </section>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" style={{ padding:"70px 48px 50px",maxWidth:"1100px",margin:"0 auto" }}>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"28px" }}>
          <ProjectCard title="FinTech Dashboard App" subtitle="UI Design • Figma" imageUrl="linear-gradient(135deg,#0a1930 0%,#1a2a4a 50%,#0066cc 100%)" delay={0}/>
          <ProjectCard title="Urban Streetwear" subtitle="Web Design • E-Commerce" imageUrl="linear-gradient(135deg,#1a1a2e 0%,#2d2d44 50%,#4a4a6a 100%)" delay={0.15}/>
          <ProjectCard title="Wanderlust App" subtitle="Mobile App • UI Research" imageUrl="linear-gradient(135deg,#0d2137 0%,#1a3a5c 50%,#2a5a8c 100%)" delay={0.3}/>
        </div>
      </section>

      {/* ═══ WHAT I DO ═══ */}
      <section id="services" style={{ padding:"70px 48px",maxWidth:"1100px",margin:"0 auto" }}>
        <AnimatedSection>
          <h2 style={{ textAlign:"center",fontSize:"28px",fontWeight:700,color:"#00e5ff",marginBottom:"8px" }}>What I Do</h2>
          <SectionDivider/>
        </AnimatedSection>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"28px" }}>
          <ServiceCard icon={icons.uiux} title="UI/UX Design" description="Designing intuitive and visually stunning interfaces that prioritize user needs and create a memorable digital journey." delay={0.1}/>
          <ServiceCard icon={icons.webdev} title="Web Dev" description="Building responsive, high-performance websites using modern technologies that deliver fast, seamless user experiences." delay={0.25}/>
          <ServiceCard icon={icons.proto} title="Prototyping" description="Creating rapid, high-fidelity prototypes to bridge concepts, test usability, and iterate quickly for the best results." delay={0.4}/>
        </div>
      </section>

      {/* ═══ WHO I AM ═══ */}
      <section id="about" style={{ padding:"70px 48px",maxWidth:"1100px",margin:"0 auto" }}>
        <AnimatedSection>
          <h2 style={{ textAlign:"center",fontSize:"28px",fontWeight:700,color:"#00e5ff",marginBottom:"8px" }}>Who I am</h2>
          <SectionDivider/>
        </AnimatedSection>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1.5fr",gap:"52px",alignItems:"center" }}>
          <AnimatedSection delay={0.1} direction="left">
            <div style={{ borderRadius:"12px",overflow:"hidden",border:"1px solid rgba(0,229,255,0.12)",aspectRatio:"4/3",background:"linear-gradient(135deg,#0d1b2a 0%,#1b2838 50%,#2a3a4a 100%)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
              <div style={{ fontSize:"48px",opacity:0.25 }}>📸</div>
              <div style={{ position:"absolute",bottom:"12px",right:"12px",fontSize:"11px",color:"#4a5670",fontStyle:"italic" }}>Your photo here</div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.25} direction="right">
            <div>
              <h3 style={{ fontSize:"26px",fontWeight:700,marginBottom:"20px",lineHeight:1.35,letterSpacing:"-0.3px" }}>Passionate about creating intuitive digital experiences.</h3>
              <p style={{ fontSize:"15px",color:"#7a8ba8",lineHeight:1.85,marginBottom:"28px" }}>With a strong background in Computer Engineering and a passion for innovation, I bridge the gap between creative vision and technical precision. I focus on creating user-centric interfaces that solve real problems, ensuring that every digital experience not only functions but also feels intuitive, engaging, and visually compelling.</p>
              <div style={{ display:"flex",flexWrap:"wrap",gap:"10px" }}>
                {["Java","React","HTML/CSS","JavaScript","C","Python"].map(s => <SkillTag key={s} label={s}/>)}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding:"70px 48px 90px",maxWidth:"620px",margin:"0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign:"center",marginBottom:"40px" }}>
            <h2 style={{ fontSize:"28px",fontWeight:700,marginBottom:"12px" }}>Let's Work Together</h2>
            <p style={{ fontSize:"15px",color:"#6a7a94",lineHeight:1.6 }}>Have a project in mind? Fill out the form below or send me an email anytime.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <div style={{ display:"flex",flexDirection:"column",gap:"16px" }}>
            {[{name:"name",placeholder:"Your Name / Company",type:"text"},{name:"email",placeholder:"youremail@example.com",type:"email"}].map(field => (
              <input key={field.name} type={field.type} placeholder={field.placeholder} value={formData[field.name]}
                onChange={e => setFormData({...formData,[field.name]:e.target.value})}
                style={{ width:"100%",padding:"15px 20px",background:"rgba(12,20,40,0.7)",border:"1px solid rgba(0,229,255,0.1)",borderRadius:"8px",color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:"14px",outline:"none",transition:"border-color 0.3s, box-shadow 0.3s" }}
                onFocus={e=>{e.target.style.borderColor="rgba(0,229,255,0.35)";e.target.style.boxShadow="0 0 0 3px rgba(0,229,255,0.06)";}}
                onBlur={e=>{e.target.style.borderColor="rgba(0,229,255,0.1)";e.target.style.boxShadow="none";}}/>
            ))}
            <textarea placeholder="Tell me about your project..." value={formData.message}
              onChange={e => setFormData({...formData,message:e.target.value})} rows={5}
              style={{ width:"100%",padding:"15px 20px",background:"rgba(12,20,40,0.7)",border:"1px solid rgba(0,229,255,0.1)",borderRadius:"8px",color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:"14px",outline:"none",resize:"vertical",transition:"border-color 0.3s, box-shadow 0.3s" }}
              onFocus={e=>{e.target.style.borderColor="rgba(0,229,255,0.35)";e.target.style.boxShadow="0 0 0 3px rgba(0,229,255,0.06)";}}
              onBlur={e=>{e.target.style.borderColor="rgba(0,229,255,0.1)";e.target.style.boxShadow="none";}}/>
            <button style={{ alignSelf:"flex-start",padding:"14px 40px",background:"linear-gradient(135deg,#c2185b,#e91e63)",border:"none",borderRadius:"8px",color:"#fff",fontFamily:"'Outfit',sans-serif",fontSize:"14px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"10px",transition:"all 0.35s ease" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 28px rgba(233,30,99,0.35)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
              Send Message {icons.arrow}
            </button>
          </div>
        </AnimatedSection>
      </section>

      <Footer />
    </div>
  );
}
