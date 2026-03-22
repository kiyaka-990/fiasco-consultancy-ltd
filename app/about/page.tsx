"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import TeamCard from "@/components/TeamCard";
import { TEAM, PROCESS, IMG } from "@/lib/data";
import { theme } from "@/lib/theme";
import type { TeamMember, ProcessStep } from "@/lib/data";

const MILESTONES = [
  { year: "2008", t: "Founded in Nairobi", d: "Fiasco Consultancy established with a mission to transform business crises into strategic opportunities across East Africa." },
  { year: "2012", t: "Regional Expansion", d: "Extended operations to Uganda, Tanzania, and Rwanda — becoming a true East African consulting firm." },
  { year: "2016", t: "100th Crisis Resolved", d: "Celebrated a milestone of 100 successful crisis interventions, maintaining a 98% recovery rate throughout." },
  { year: "2020", t: "Digital Practice Launch", d: "Launched our Digital Transformation and Data Analytics service lines to meet the demands of the new economy." },
  { year: "2024", t: "300+ Engagements", d: "Surpassed 300 completed engagements across 50+ corporate clients throughout East Africa and beyond." },
];

export default function AboutPage() {
  const [dark, setDark] = useState(true);
  const t = theme(dark);
  const T = t.T;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: t.glass,
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`,
    borderRadius: 20,
    ...extra,
  });

  const pill = (label: string) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 16 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
      <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>{label}</span>
    </div>
  );

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="about" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "0", position: "relative", height: 480, overflow: "hidden" }}>
        <Image src={IMG.hero1} alt="About Fiasco" fill sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.22)" }} priority />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,12,20,0.95) 0%,rgba(139,105,20,0.18) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(200,168,75,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.04) 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px", paddingTop: 100 }}>
          <div style={{ maxWidth: 760 }}>
            {pill("Our Story")}
            <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 900, fontFamily: t.serif, color: "#fff", lineHeight: 1.15, letterSpacing: -1 }}>When Failure Is Not An Option, We Step In</h1>
            <p style={{ fontSize: 16, color: "rgba(240,232,208,0.7)", fontFamily: t.sans, lineHeight: 1.8, maxWidth: 600, margin: "20px auto 0" }}>Founded in Nairobi in 2008, Fiasco Consultancy has spent over 15 years turning East Africa&apos;s most complex crises into lasting competitive advantages.</p>
          </div>
        </div>
      </section>

      {/* Mission / Vision cards */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 28 }}>
          {[
            { icon: "🎯", title: "Our Mission", body: "To transform crises into triumphs — providing immediate, decisive action that stabilizes emergencies and implements long-term strategies for organizational resilience across East Africa." },
            { icon: "🔭", title: "Our Vision", body: "To be the most trusted crisis management and strategic consulting firm in Sub-Saharan Africa, known for decisive intervention, measurable results, and unwavering integrity." },
            { icon: "💎", title: "Our Values", body: "Decisiveness, transparency, accountability, and excellence. We treat every engagement as if our own reputation is on the line — because it is." },
            { icon: "🌍", title: "Our Region", body: "Headquartered in Nairobi with reach across Kenya, Uganda, Tanzania, Rwanda, Ethiopia and South Sudan. We understand East African business from the inside." },
          ].map((c, i) => (
            <div key={i} style={{ ...glass({ padding: 36 }) }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{c.icon}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: t.serif, marginBottom: 12, color: t.gold }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.85 }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About images + stats */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div style={{ position: "relative", height: 480 }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "70%", height: "72%", borderRadius: 20, overflow: "hidden", boxShadow: `0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px ${t.bdr}` }}>
              <Image src={IMG.about} alt="Our team" fill sizes="40vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: "52%", borderRadius: 20, overflow: "hidden", boxShadow: `0 30px 80px rgba(0,0,0,0.5)`, border: `3px solid ${t.bg}` }}>
              <Image src={IMG.about2} alt="Strategy" fill sizes="30vw" style={{ objectFit: "cover" }} />
            </div>
            <div style={{ position: "absolute", top: "38%", right: "-2%", ...glass({ padding: "16px 20px", borderRadius: 16, boxShadow: "0 20px 50px rgba(0,0,0,0.4)" }) }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: t.gold, fontFamily: t.sans }}>98%</div>
              <div style={{ fontSize: 10, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>Recovery Rate</div>
            </div>
          </div>
          <div>
            {pill("Why Fiasco")}
            <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, lineHeight: 1.2, color: t.fg }}>East Africa&apos;s Crisis Management Specialists</h2>
            <p style={{ color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.85, marginBottom: 28, fontSize: 15 }}>We don&apos;t just consult — we intervene. When things go wrong, Fiasco goes in. Our teams are deployable within hours, bringing forensic-level diagnosis and decisive execution to every engagement.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
              {[{ v: "15+", l: "Years" }, { v: "300+", l: "Crises Resolved" }, { v: "98%", l: "Recovery Rate" }, { v: "50+", l: "Clients" }].map((s, i) => (
                <div key={i} style={{ ...glass({ padding: "18px 20px", textAlign: "center" as const }) }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: t.gold, fontFamily: t.sans }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: "100px 24px", background: dark ? "rgba(200,168,75,0.03)" : "rgba(200,168,75,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            {pill("How We Work")}
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontFamily: t.serif, color: t.fg }}>The Fiasco 4-Stage Methodology</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {PROCESS.map((p: ProcessStep, i: number) => (
              <div key={i} style={{ ...glass({ padding: "24px 28px" }), display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ fontSize: 38, fontWeight: 800, color: "rgba(200,168,75,0.2)", flexShrink: 0, lineHeight: 1, fontFamily: t.sans, minWidth: 56 }}>{p.n}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 7, color: t.gold, fontFamily: t.sans }}>{p.t}</div>
                  <div style={{ fontSize: 14, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.75 }}>{p.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            {pill("Our History")}
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontFamily: t.serif, color: t.fg }}>Milestones</h2>
          </div>
          {MILESTONES.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 28, paddingBottom: 36 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#1A1000", fontWeight: 800, fontSize: 12, fontFamily: t.sans, boxShadow: `0 4px 20px rgba(200,168,75,0.4)` }}>{m.year}</div>
                {i < MILESTONES.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 40, background: `linear-gradient(to bottom,rgba(200,168,75,0.4),transparent)`, marginTop: 8 }} />}
              </div>
              <div style={{ ...glass({ padding: "20px 24px", flex: 1 as unknown as string }), marginTop: 6 }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, fontFamily: t.sans, color: t.fg }}>{m.t}</div>
                <div style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{m.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team preview */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            {pill("Leadership")}
            <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, fontFamily: t.serif, color: t.fg }}>The Crisis Team</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {TEAM.map((m: TeamMember, i: number) => (
              <TeamCard key={i} member={m} dark={dark} size="sm" />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <a href="/team" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 12, padding: "14px 32px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 30px rgba(200,168,75,0.4)` }}>Meet the Full Team →</a>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
