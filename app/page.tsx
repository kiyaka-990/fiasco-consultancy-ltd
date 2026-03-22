"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SLIDES, STATS, SERVICES, PROCESS, TESTIMONIALS, BLOGS, PROJECTS, TEAM, IMG } from "@/lib/data";
import { theme } from "@/lib/theme";
import type { Service, Slide, Testimonial, Project, BlogPost, TeamMember, ProcessStep, Stat } from "@/lib/data";

// ── HELPERS ───────────────────────────────────────────────────────────────────
function glass(t: ReturnType<typeof theme>, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: t.glass,
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`,
    borderRadius: 20,
    ...extra,
  };
}

function SH({ tag, title, sub, t }: { tag?: string; title: string; sub?: string; t: ReturnType<typeof theme> }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 68 }}>
      {tag && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
          <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>{tag}</span>
        </div>
      )}
      <h2 style={{ fontSize: "clamp(1.9rem,4vw,3rem)", fontWeight: 700, fontFamily: t.serif, letterSpacing: -0.5, marginBottom: sub ? 16 : 0, color: t.fg }}>{title}</h2>
      {sub && <p style={{ color: t.fgMuted, maxWidth: 580, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>{sub}</p>}
    </div>
  );
}

function GoldLine() {
  return <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.5),transparent)", margin: "0 0 0 0" }} />;
}

// ── CARD COMPONENTS ───────────────────────────────────────────────────────────
function SvcCard({ s, t, T }: { s: Service; t: ReturnType<typeof theme>; T: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...glass(t, { overflow: "hidden" }), transition: T, transform: hov ? "translateY(-6px)" : "translateY(0)", boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(200,168,75,0.3)` : "none", border: `1px solid ${hov ? "rgba(200,168,75,0.45)" : t.bdr}` }}>
      <div style={{ height: 185, overflow: "hidden", position: "relative" }}>
        <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.65)", transform: hov ? "scale(1.08)" : "scale(1)", transition: T }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.9) 0%,transparent 60%)" }} />
        <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 12px" }}>
          <span style={{ fontSize: 9, fontFamily: t.sans, fontWeight: 700, color: t.gold, letterSpacing: 0.5, textTransform: "uppercase" as const }}>{s.badge}</span>
        </div>
        <div style={{ position: "absolute", bottom: 14, left: 18, fontSize: 24, color: t.gold }}>{s.icon}</div>
      </div>
      <div style={{ padding: "22px 24px 28px" }}>
        <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.fg }}>{s.title}</h3>
        <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.75, margin: 0, fontFamily: t.sans }}>{s.desc}</p>
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, cursor: "pointer" }}>
          Learn More <span style={{ transition: T, transform: hov ? "translateX(5px)" : "translateX(0)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function ProjCard({ p, t, T }: { p: Project; t: ReturnType<typeof theme>; T: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...glass(t, { overflow: "hidden" }), transition: T, transform: hov ? "translateY(-5px)" : "translateY(0)", boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.35)" : "none" }}>
      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
        <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw,50vw" style={{ objectFit: "cover", filter: "brightness(0.5)", transform: hov ? "scale(1.07)" : "scale(1)", transition: T }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.95) 0%,transparent 50%)" }} />
        <div style={{ position: "absolute", top: 18, left: 18, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "5px 14px" }}>
          <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" as const }}>{p.cat}</span>
        </div>
      </div>
      <div style={{ padding: "24px 28px" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.fg }}>{p.title}</h3>
        <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.7, fontFamily: t.sans }}>{p.desc}</p>
        <div style={{ marginTop: 16, color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          View Case Study <span style={{ transition: T, transform: hov ? "translateX(5px)" : "translateX(0)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ m, t, T }: { m: TeamMember; t: ReturnType<typeof theme>; T: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...glass(t, { textAlign: "center", overflow: "hidden" }), transition: T, transform: hov ? "translateY(-6px)" : "translateY(0)", boxShadow: hov ? `0 24px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(200,168,75,0.25)` : "none", border: `1px solid ${hov ? "rgba(200,168,75,0.4)" : t.bdr}` }}>
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <Image src={m.img} alt={m.name} fill sizes="25vw" style={{ objectFit: "cover", objectPosition: "top", filter: "brightness(0.78)", transform: hov ? "scale(1.06)" : "scale(1)", transition: T }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.82) 0%,transparent 55%)" }} />
      </div>
      <div style={{ padding: "20px 18px 24px" }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, fontFamily: t.serif, color: t.fg }}>{m.name}</div>
        <div style={{ color: t.gold, fontSize: 12, fontFamily: t.sans, fontWeight: 600, marginBottom: 6 }}>{m.role}</div>
        <div style={{ fontSize: 11, color: t.fgMuted, fontFamily: t.sans }}>{m.spec}</div>
      </div>
    </div>
  );
}

function BlogCard({ b, t, T }: { b: BlogPost; t: ReturnType<typeof theme>; T: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ ...glass(t, { overflow: "hidden" }), transition: T, transform: hov ? "translateY(-5px)" : "translateY(0)", boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.3)" : "none" }}>
      <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
        <Image src={b.img} alt={b.title} fill sizes="33vw" style={{ objectFit: "cover", filter: "brightness(0.6)", transform: hov ? "scale(1.07)" : "scale(1)", transition: T }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.88) 0%,transparent 55%)" }} />
        <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 12px" }}>
          <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700 }}>{b.cat}</span>
        </div>
      </div>
      <div style={{ padding: "22px 22px 26px" }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 10, fontFamily: t.sans, fontSize: 11, color: t.fgMuted }}><span>{b.date}</span><span>·</span><span>{b.read} read</span></div>
        <h3 style={{ fontSize: 15, fontWeight: 700, fontFamily: t.serif, lineHeight: 1.45, color: t.fg }}>{b.title}</h3>
        <div style={{ marginTop: 14, color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 5 }}>
          Read Article <span style={{ transition: T, transform: hov ? "translateX(5px)" : "translateX(0)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

function AccessPanel({ t, dark, setDark, fs, setFs, rm, setRm, onClose }: {
  t: ReturnType<typeof theme>; dark: boolean; setDark: (v: boolean) => void;
  fs: number; setFs: (v: number) => void; rm: boolean; setRm: (v: boolean) => void; onClose: () => void;
}) {
  return (
    <div style={{ position: "fixed", top: 128, right: 18, zIndex: 2000, ...glass(t, { padding: 28, minWidth: 280, boxShadow: "0 30px 80px rgba(0,0,0,0.5)" }) }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 15, fontFamily: t.sans, color: t.gold }}>⚙ Accessibility</span>
        <button onClick={onClose} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18, color: t.fgMuted }}>✕</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: t.sans, fontSize: 13 }}>
        <div>
          <div style={{ color: t.fgMuted, marginBottom: 8 }}>Font Size: <strong style={{ color: t.fg }}>{fs}px</strong></div>
          <input type="range" min={13} max={22} step={1} value={fs} onChange={(e) => setFs(Number(e.target.value))} style={{ width: "100%", accentColor: t.gold }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: t.fgMuted }}>Theme</span>
          <div style={{ display: "flex", gap: 6 }}>
            {([["Dark", true], ["Light", false]] as [string, boolean][]).map(([l, v]) => (
              <button key={l} onClick={() => setDark(v)} style={{ padding: "5px 14px", borderRadius: 8, background: dark === v ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : "transparent", color: dark === v ? "#1A1000" : t.fg, border: `1px solid ${dark === v ? t.gold : t.bdr}`, cursor: "pointer", fontSize: 12, fontFamily: t.sans, fontWeight: dark === v ? 700 : 400 }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: t.fgMuted }}>Reduce Motion</span>
          <div onClick={() => setRm(!rm)} style={{ width: 44, height: 24, borderRadius: 12, background: rm ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : t.bdr, position: "relative", cursor: "pointer", transition: t.T }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: rm ? "#1A1000" : "#fff", position: "absolute", top: 3, left: rm ? 23 : 3, transition: t.T }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function HomePage() {
  const [slide, setSlide] = useState(0);
  const [fading, setFading] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [dark, setDark] = useState(true);
  const [fs, setFs] = useState(16);
  const [rm, setRm] = useState(false);
  const [acc, setAcc] = useState(false);
  const [testi, setTesti] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const A = !rm;

  const t = theme(dark);
  const T = A ? t.T : "none";

  useEffect(() => {
    if (!A) return;
    const id = setInterval(() => { setFading(true); setTimeout(() => { setSlide((s) => (s + 1) % SLIDES.length); setFading(false); }, 500); }, 6000);
    return () => clearInterval(id);
  }, [A]);

  useEffect(() => {
    if (!A) return;
    const id = setInterval(() => setTesti((s) => (s + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(id);
  }, [A]);

  const goSlide = (i: number) => { setFading(true); setTimeout(() => { setSlide(i); setFading(false); }, 300); };
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setActiveNav(id); };

  return (
    <div style={{ fontFamily: t.sans, fontSize: fs, background: t.bg, color: t.fg, minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar dark={dark} setDark={setDark} onOpenAccessibility={() => setAcc((o) => !o)} activeNav={activeNav} scrollTo={scrollTo} />
      {acc && <AccessPanel t={t} dark={dark} setDark={setDark} fs={fs} setFs={setFs} rm={rm} setRm={setRm} onClose={() => setAcc(false)} />}

      {/* ═══ HERO ═══ */}
      <section id="home" style={{ height: "100vh", minHeight: 700, position: "relative", overflow: "hidden" }}>
        {SLIDES.map((s: Slide, i: number) => (
          <div key={i} style={{ position: "absolute", inset: 0, transition: A ? "opacity 1.4s ease" : "none", opacity: slide === i ? 1 : 0, zIndex: 0 }}>
            <Image src={s.img} alt="" fill sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.28)" }} priority={i === 0} />
          </div>
        ))}
        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(135deg,rgba(8,12,20,0.92) 0%,rgba(139,105,20,0.15) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: "radial-gradient(ellipse at 70% 30%,rgba(200,168,75,0.1) 0%,transparent 55%)" }} />
        {/* Subtle grid */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1, backgroundImage: `linear-gradient(rgba(200,168,75,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.04) 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", paddingTop: 115 }}>
          <div style={{ maxWidth: 880, textAlign: "center" }}>
            {/* Tag pill */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.3)", borderRadius: 100, padding: "7px 24px", marginBottom: 36, backdropFilter: "blur(12px)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: t.gold, display: "inline-block", boxShadow: `0 0 12px ${t.gold}`, animation: A ? "pulsedot 2s infinite" : "none" }} />
              <span style={{ color: t.goldLight, fontSize: 11, fontFamily: t.sans, letterSpacing: 2.5, textTransform: "uppercase" as const, fontWeight: 600 }}>{SLIDES[slide].tag}</span>
            </div>

            {/* Headline carousel */}
            <div style={{ minHeight: 170, position: "relative" }}>
              {SLIDES.map((s: Slide, i: number) => (
                <div key={i} style={{ transition: A ? "opacity 0.9s ease,transform 0.9s ease" : "none", opacity: slide === i && !fading ? 1 : 0, transform: slide === i && !fading ? "translateY(0)" : "translateY(28px)", position: slide === i ? "relative" : "absolute", width: "100%", pointerEvents: slide === i ? "auto" : "none" }}>
                  <h1 style={{ fontSize: "clamp(2.2rem,6vw,4.6rem)", fontWeight: 900, fontFamily: t.serif, color: "#fff", lineHeight: 1.1, marginBottom: 22, textShadow: "0 2px 40px rgba(0,0,0,0.5)", letterSpacing: -1 }}>{s.h}</h1>
                  <p style={{ fontSize: "clamp(1rem,2vw,1.2rem)", color: "rgba(240,232,208,0.72)", maxWidth: 680, margin: "0 auto 44px", fontFamily: t.sans, lineHeight: 1.8, fontWeight: 300 }}>{s.s}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}>
              <button onClick={() => scrollTo("contact")} style={{ background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", border: "none", borderRadius: 14, padding: "16px 38px", fontSize: 15, cursor: "pointer", fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 40px rgba(200,168,75,0.5)`, transition: T, letterSpacing: 0.3 }}>
                Emergency Consultation →
              </button>
              <button onClick={() => scrollTo("services")} style={{ background: "rgba(200,168,75,0.08)", color: t.goldLight, border: `1px solid rgba(200,168,75,0.35)`, borderRadius: 14, padding: "16px 38px", fontSize: 15, cursor: "pointer", fontFamily: t.sans, fontWeight: 600, backdropFilter: "blur(12px)", transition: T }}>
                Explore Services
              </button>
            </div>

            {/* Slide dots */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 52 }}>
              {SLIDES.map((_: Slide, i: number) => (
                <button key={i} onClick={() => goSlide(i)} style={{ width: slide === i ? 34 : 9, height: 9, borderRadius: 100, background: slide === i ? t.gold : "rgba(200,168,75,0.25)", border: "none", cursor: "pointer", transition: T, padding: 0 }} />
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, background: "rgba(8,12,20,0.82)", backdropFilter: "blur(24px)", borderTop: `1px solid rgba(200,168,75,0.18)` }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
            {STATS.map((s: Stat, i: number) => (
              <div key={i} style={{ padding: "22px 36px", textAlign: "center", borderRight: i < 3 ? `1px solid rgba(200,168,75,0.1)` : "none" }}>
                <div style={{ fontSize: 30, fontWeight: 800, color: t.gold, fontFamily: t.sans, letterSpacing: -1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: t.fgSubtle, fontFamily: t.sans, letterSpacing: 2, textTransform: "uppercase" as const, marginTop: 5 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section id="services" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="What We Offer" title="Our Consulting Services" sub="From crisis intervention to strategic transformation — comprehensive solutions for East Africa's most demanding business challenges." t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(285px,1fr))", gap: 24 }}>
            {SERVICES.map((s: Service, i: number) => <SvcCard key={i} s={s} t={t} T={T} />)}
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative", height: 520 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "72%", height: "75%", borderRadius: 20, overflow: "hidden", boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${t.bdr}` }}>
              <Image src={IMG.about} alt="Team" fill sizes="50vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: "55%", borderRadius: 20, overflow: "hidden", boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${t.bdr}`, border: `3px solid ${t.bg}` }}>
              <Image src={IMG.about2} alt="Strategy" fill sizes="30vw" style={{ objectFit: "cover" }} />
            </div>
            {/* Float badge */}
            <div style={{ position: "absolute", top: "42%", right: "-2%", ...glass(t, { padding: "18px 22px", borderRadius: 16, boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }) }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.gold, fontFamily: t.sans, lineHeight: 1 }}>98%</div>
              <div style={{ fontSize: 10, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>Recovery Rate</div>
            </div>
          </div>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 16 }}>
              <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>The Fiasco Methodology</span>
            </div>
            <h2 style={{ fontSize: "clamp(1.9rem,3.5vw,2.8rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, lineHeight: 1.2, color: t.fg }}>Restoring Order From Chaos</h2>
            <p style={{ color: t.fgMuted, marginBottom: 36, fontFamily: t.sans, lineHeight: 1.85, fontSize: 15 }}>When failure is not an option, Fiasco Consultancy steps in. We specialize in rapid intervention, project recovery, and strategic defense — turning uncertainty into clarity and crises into lasting transformation.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {PROCESS.map((p: ProcessStep, i: number) => (
                <div key={i} style={{ ...glass(t, { padding: "18px 22px", borderRadius: 16 }), display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: `rgba(200,168,75,0.25)`, flexShrink: 0, fontFamily: t.sans, minWidth: 40, lineHeight: 1 }}>{p.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4, color: t.gold, fontFamily: t.sans }}>{p.t}</div>
                    <div style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 32 }}>
              <a href="/about" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 12, padding: "13px 28px", fontSize: 14, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 6px 28px rgba(200,168,75,0.4)` }}>Our Full Story →</a>
            </div>
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Case Studies" title="Crises We've Resolved" sub="Real results from real interventions across East Africa's most challenging business situations." t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 }}>
            {PROJECTS.map((p: Project, i: number) => <ProjCard key={i} p={p} t={t} T={T} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: 44 }}>
            <a href="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, border: `1px solid ${t.bdr}`, color: t.gold, textDecoration: "none", borderRadius: 12, padding: "13px 28px", fontSize: 14, fontFamily: t.sans, fontWeight: 700, background: "rgba(200,168,75,0.06)", transition: T }}>View All Case Studies →</a>
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ TEAM ═══ */}
      <section id="team" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SH tag="Our Specialists" title="Meet the Crisis Team" sub="East Africa's most experienced crisis management and strategic consulting professionals." t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {TEAM.map((m: TeamMember, i: number) => <TeamCard key={i} m={m} t={t} T={T} />)}
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <SH tag="Client Success" title="What Our Partners Say" t={t} />
          <div style={{ position: "relative", minHeight: 270 }}>
            {TESTIMONIALS.map((t_: Testimonial, i: number) => (
              <div key={i} style={{ transition: A ? "opacity 0.7s ease,transform 0.7s ease" : "none", opacity: testi === i ? 1 : 0, transform: testi === i ? "translateY(0)" : "translateY(14px)", position: testi === i ? "relative" : "absolute", top: 0, left: 0, right: 0 }}>
                <div style={{ ...glass(t, { padding: "44px 48px" }) }}>
                  <div style={{ fontSize: 72, color: t.gold, lineHeight: 0.7, marginBottom: 22, fontFamily: t.serif, opacity: 0.35 }}>&ldquo;</div>
                  <p style={{ fontSize: 17, lineHeight: 1.8, fontStyle: "italic", marginBottom: 32, color: dark ? "rgba(240,232,208,0.88)" : "rgba(26,16,0,0.85)", fontFamily: t.serif }}>{t_.q}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Image src={t_.img} alt={t_.name} width={52} height={52} style={{ borderRadius: "50%", objectFit: "cover", border: `2px solid rgba(200,168,75,0.4)` }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, fontFamily: t.sans, color: t.fg }}>{t_.name}</div>
                      <div style={{ fontSize: 12, color: t.gold, fontFamily: t.sans }}>{t_.co}</div>
                    </div>
                    <div style={{ marginLeft: "auto" }}>{"★★★★★".split("").map((s: string, j: number) => <span key={j} style={{ color: t.gold, fontSize: 15 }}>{s}</span>)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 28 }}>
            {TESTIMONIALS.map((_: Testimonial, i: number) => (
              <button key={i} onClick={() => setTesti(i)} style={{ width: testi === i ? 32 : 9, height: 9, borderRadius: 100, background: testi === i ? t.gold : "rgba(200,168,75,0.25)", border: "none", cursor: "pointer", transition: T, padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ BLOG ═══ */}
      <section id="blog" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Insights" title="Blog & Articles" sub="Thought leadership on crisis management, turnaround strategy, and East African business resilience." t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {BLOGS.map((b: BlogPost, i: number) => <BlogCard key={i} b={b} t={t} T={T} />)}
          </div>
        </div>
      </section>

      <GoldLine />

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding: "110px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SH tag="Contact Us" title="Facing a Crisis? Let's Talk." sub="For urgent situations call us directly. For consultations and strategic engagements fill the form below." t={t} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Form */}
            <div style={{ ...glass(t, { padding: 44 }) }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>✅</div>
                  <div style={{ fontWeight: 700, fontFamily: t.serif, fontSize: 22, marginBottom: 10, color: t.fg }}>Message Received</div>
                  <div style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 28, fontSize: 14 }}>Our team will contact you within 2 hours for urgent matters.</div>
                  <button onClick={() => setSent(false)} style={{ background: "transparent", border: `1px solid ${t.bdr}`, color: t.gold, borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: t.sans }}>Send Another</button>
                </div>
              ) : (
                <>
                  <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: t.serif, marginBottom: 28, color: t.gold }}>Schedule a Fiasco Audit</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {([{ k: "name", l: "Full Name", p: "Your full name", tp: "text" }, { k: "email", l: "Email", p: "your@company.co.ke", tp: "email" }, { k: "phone", l: "Phone", p: "+254 7XX XXX XXX", tp: "tel" }] as { k: keyof typeof formData; l: string; p: string; tp: string }[]).map((f) => (
                      <div key={f.k}>
                        <label style={{ fontSize: 10, fontFamily: t.sans, color: t.fgMuted, letterSpacing: 1.5, textTransform: "uppercase" as const, display: "block", marginBottom: 7, fontWeight: 700 }}>{f.l}</label>
                        <input type={f.tp} placeholder={f.p} value={formData[f.k]} onChange={(e) => setFormData((d) => ({ ...d, [f.k]: e.target.value }))} style={{ width: "100%", padding: "13px 18px", background: dark ? "rgba(200,168,75,0.05)" : "rgba(26,16,0,0.04)", border: `1px solid ${t.bdr}`, borderRadius: 12, color: t.fg, fontSize: 14, fontFamily: t.sans, outline: "none", boxSizing: "border-box" }} />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 10, fontFamily: t.sans, color: t.fgMuted, letterSpacing: 1.5, textTransform: "uppercase" as const, display: "block", marginBottom: 7, fontWeight: 700 }}>Service</label>
                      <select value={formData.service} onChange={(e) => setFormData((d) => ({ ...d, service: e.target.value }))} style={{ width: "100%", padding: "13px 18px", background: dark ? "rgba(8,12,20,0.95)" : "rgba(245,240,232,0.95)", border: `1px solid ${t.bdr}`, borderRadius: 12, color: t.fg, fontSize: 14, fontFamily: t.sans, outline: "none", boxSizing: "border-box" }}>
                        <option value="">Select a service...</option>
                        {SERVICES.map((s: Service) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 10, fontFamily: t.sans, color: t.fgMuted, letterSpacing: 1.5, textTransform: "uppercase" as const, display: "block", marginBottom: 7, fontWeight: 700 }}>Describe Your Situation</label>
                      <textarea placeholder="Tell us about the challenge or crisis you're facing..." value={formData.message} onChange={(e) => setFormData((d) => ({ ...d, message: e.target.value }))} rows={5} style={{ width: "100%", padding: "13px 18px", background: dark ? "rgba(200,168,75,0.05)" : "rgba(26,16,0,0.04)", border: `1px solid ${t.bdr}`, borderRadius: 12, color: t.fg, fontSize: 14, fontFamily: t.sans, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                    </div>
                    <button onClick={() => { if (formData.name && formData.email) setSent(true); }} style={{ background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, cursor: "pointer", fontFamily: t.sans, fontWeight: 900, boxShadow: `0 8px 30px rgba(200,168,75,0.4)`, transition: T }}>
                      Request Fiasco Audit →
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Map + info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${t.bdr}`, flex: 1, minHeight: 300 }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.977044879952!2d36.81193!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba7f3c3%3A0xf0d3e18af58c2e4!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" width="100%" height="100%" style={{ border: 0, display: "block", minHeight: 300 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fiasco Location" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {([{ icon: "📍", l: "Head Office", v: "Standard Str, Standard Bld, Nairobi" }, { icon: "🏢", l: "Branch Office", v: "Likoni Rd, Joakim Est, Nairobi" }, { icon: "📞", l: "Emergency Line", v: "+254 712 770 999" }, { icon: "🕐", l: "Hours", v: "Mon–Sat, 8:00 AM – 5:00 PM" }] as { icon: string; l: string; v: string }[]).map((c, i) => (
                  <div key={i} style={{ ...glass(t, { padding: "18px 20px" }) }}>
                    <div style={{ fontSize: 20, marginBottom: 7 }}>{c.icon}</div>
                    <div style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 5, fontWeight: 700 }}>{c.l}</div>
                    <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 600, lineHeight: 1.4, color: t.fg }}>{c.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />

      <style>{`
        @keyframes pulsedot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.72)}}
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(200,168,75,0.3);color:#F0E8D0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${dark ? "#080C14" : "#F5F0E8"};}
        ::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}
        ::-webkit-scrollbar-thumb:hover{background:rgba(200,168,75,0.65);}
      `}</style>
    </div>
  );
}
