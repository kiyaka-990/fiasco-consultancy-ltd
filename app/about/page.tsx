"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { TEAM, PROCESS, IMG } from "@/lib/data";
import type { TeamMember, ProcessStep } from "@/lib/data";

const R = "#E8303A";

const MILESTONES = [
  { year: "2008", t: "Founded in Nairobi", d: "Fiasco Consultancy established with a mission to transform business crises into strategic opportunities." },
  { year: "2012", t: "Regional Expansion", d: "Extended operations to Uganda, Tanzania, and Rwanda — becoming a true East African firm." },
  { year: "2016", t: "100th Crisis Resolved", d: "Celebrated a milestone of 100 successful crisis interventions with a 98% recovery rate." },
  { year: "2020", t: "Digital Practice Launch", d: "Launched our Digital Transformation and Data Analytics service lines to meet the new economy." },
  { year: "2024", t: "300+ Engagements", d: "Surpassed 300 completed engagements across 50+ corporate clients throughout East Africa." },
];

export default function AboutPage() {
  const [dark, setDark] = useState(true);

  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${bdr}`, borderRadius: 20, ...extra });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="about" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src={IMG.hero1} alt="About Fiasco" fill sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.25)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(5,13,26,0.95) 0%,rgba(139,21,32,0.2) 100%)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 16, fontWeight: 700 }}>Our Story</div>
          <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, color: "#fff", lineHeight: 1.15, marginBottom: 24, letterSpacing: -1 }}>When Failure Is Not An Option, We Step In</h1>
          <p style={{ fontSize: 17, color: "rgba(232,237,248,0.75)", fontFamily: "sans-serif", lineHeight: 1.8, maxWidth: 620, margin: "0 auto" }}>
            Founded in Nairobi in 2008, Fiasco Consultancy has spent over 15 years turning East Africa&apos;s most complex business crises into lasting competitive advantages.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
          {[
            { icon: "🎯", title: "Our Mission", body: "To transform crises into triumphs — providing immediate, decisive action that stabilizes emergencies and implements long-term strategies for organizational resilience across East Africa." },
            { icon: "🔭", title: "Our Vision", body: "To be the most trusted crisis management and strategic consulting firm in Sub-Saharan Africa, known for decisive intervention, measurable results, and unwavering integrity." },
            { icon: "💎", title: "Our Values", body: "Decisiveness, transparency, accountability, and excellence in everything we do. We treat every engagement as if our own reputation is on the line — because it is." },
            { icon: "🌍", title: "Our Region", body: "Headquartered in Nairobi with reach across Kenya, Uganda, Tanzania, Rwanda, Ethiopia and South Sudan. We understand the East African business environment from the inside." },
          ].map((c, i) => (
            <div key={i} style={{ ...glass({ padding: 36 }) }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, color: R }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: fgM, fontFamily: "sans-serif", lineHeight: 1.85 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About images + stats */}
      <section style={{ padding: "0 24px 100px", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 100, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative", height: 480 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "70%", height: "72%", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)" }}>
              <Image src={IMG.about} alt="Our team" fill sizes="40vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: "52%", borderRadius: 20, overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,0.4)", border: `3px solid ${bg}` }}>
              <Image src={IMG.about2} alt="Strategy session" fill sizes="30vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", top: "38%", right: "-2%", ...glass({ padding: "16px 20px", borderRadius: 16, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }) }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: R, fontFamily: "sans-serif" }}>98%</div>
              <div style={{ fontSize: 10, color: fgM, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" }}>Recovery Rate</div>
            </div>
          </div>
          <div>
            <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Why Fiasco</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, marginBottom: 20, lineHeight: 1.2 }}>East Africa&apos;s Crisis Management Specialists</h2>
            <p style={{ color: fgM, fontFamily: "sans-serif", lineHeight: 1.85, marginBottom: 28, fontSize: 15 }}>
              We don&apos;t just consult — we intervene. When things go wrong, Fiasco goes in. Our teams are deployable within hours, not weeks, bringing forensic-level diagnosis and decisive execution to every engagement.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 28 }}>
              {[{ v: "15+", l: "Years" }, { v: "300+", l: "Crises Resolved" }, { v: "98%", l: "Recovery Rate" }, { v: "50+", l: "Clients" }].map((s, i) => (
                <div key={i} style={{ ...glass({ padding: "18px 20px", textAlign: "center" as const }) }}>
                  <div style={{ fontSize: 26, fontWeight: 900, color: R, fontFamily: "sans-serif" }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: fgM, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" as const }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>How We Work</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900 }}>The Fiasco 4-Stage Methodology</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {PROCESS.map((p: ProcessStep, i: number) => (
              <div key={i} style={{ ...glass({ padding: "24px 28px" }), display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: `${R}25`, flexShrink: 0, lineHeight: 1, fontFamily: "sans-serif", minWidth: 56 }}>{p.n}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 8, color: R, fontFamily: "sans-serif" }}>{p.t}</div>
                  <div style={{ fontSize: 14, color: fgM, fontFamily: "sans-serif", lineHeight: 1.75 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "100px 24px", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Our History</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900 }}>Milestones</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {MILESTONES.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start", paddingBottom: 36, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${R},#8B1520)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: 13, fontFamily: "sans-serif", boxShadow: `0 4px 20px ${R}44` }}>{m.year}</div>
                  {i < MILESTONES.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 40, background: `linear-gradient(to bottom,${R}50,transparent)`, marginTop: 8 }} />}
                </div>
                <div style={{ ...glass({ padding: "20px 24px", flex: 1 as unknown as string }), marginTop: 6 }}>
                  <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6, fontFamily: "sans-serif" }}>{m.t}</div>
                  <div style={{ fontSize: 13, color: fgM, fontFamily: "sans-serif", lineHeight: 1.7 }}>{m.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team preview */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Leadership</div>
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900 }}>The Crisis Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {TEAM.map((m: TeamMember, i: number) => (
              <div key={i} style={{ ...glass({ textAlign: "center" as const, overflow: "hidden" }), transition: T }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <Image src={m.img} alt={m.name} fill sizes="25vw" style={{ objectFit: "cover", objectPosition: "top" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,13,26,0.76) 0%,transparent 55%)" }} />
                </div>
                <div style={{ padding: "18px 16px 22px" }}>
                  <div style={{ fontWeight: 900, fontSize: 15, marginBottom: 4, fontFamily: "sans-serif" }}>{m.name}</div>
                  <div style={{ color: R, fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 6 }}>{m.role}</div>
                  <div style={{ fontSize: 11, color: fgM, fontFamily: "sans-serif" }}>{m.spec}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/team" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${R},#8B1520)`, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 800, boxShadow: `0 8px 30px ${R}44` }}>Meet the Full Team →</a>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
      <Chatbot dark={dark} />
    </div>
  );
}
