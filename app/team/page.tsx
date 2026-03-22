"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import TeamCard from "@/components/TeamCard";
import { theme } from "@/lib/theme";
import type { TeamMemberData } from "@/components/TeamCard";

// Full extended team with all 8 palettes
const FULL_TEAM: TeamMemberData[] = [
  {
    name: "Amelia Wangui", role: "Head of Crisis Response", spec: "Rapid Intervention & Stabilization",
    initials: "AW", palette: 0, icon: "crisis",
    bio: "15+ years in crisis management. Leads all emergency deployments across Kenya, Uganda and Tanzania. Certified in organizational resilience and risk management.",
  },
  {
    name: "Steve Nyagah", role: "Senior Turnaround Strategist", spec: "Project Recovery & Execution",
    initials: "SN", palette: 1, icon: "strategy",
    bio: "Rescued 80+ failing projects across East Africa. Former PMP-certified project director with deep experience in infrastructure, tech, and FMCG sectors.",
  },
  {
    name: "Grace Elizabeth", role: "Forensic Audit Specialist", spec: "Investigation & Compliance",
    initials: "GE", palette: 2, icon: "forensic",
    bio: "Court-qualified expert witness and certified fraud examiner. Has led forensic investigations totaling over KES 2B in recovered or secured assets.",
  },
  {
    name: "Michael Wainaina", role: "Reputation & Comms Lead", spec: "Media Defense & PR Strategy",
    initials: "MW", palette: 3, icon: "comms",
    bio: "Former journalist turned crisis communications expert. Has managed media fallout for 30+ organizations including listed companies and NGOs.",
  },
  {
    name: "Diana Ochieng", role: "Digital Transformation Lead", spec: "Cloud, ERP & Automation",
    initials: "DO", palette: 4, icon: "digital",
    bio: "Delivered 40+ digital transformation projects across East African enterprises. Expert in Microsoft Azure, SAP, and custom enterprise solutions.",
  },
  {
    name: "James Kimani", role: "Senior HR Strategy Consultant", spec: "Workforce Planning & OD",
    initials: "JK", palette: 5, icon: "hr",
    bio: "Certified HR professional with deep expertise in Kenyan labour law, compensation design, and organizational development for high-growth firms.",
  },
  {
    name: "Fatuma Hassan", role: "Data Analytics Director", spec: "BI, Predictive Modelling & Insights",
    initials: "FH", palette: 6, icon: "data",
    bio: "Former data scientist at a Big 4 firm. Builds custom analytics frameworks and dashboards that turn complex data into clear strategic decisions.",
  },
  {
    name: "Patrick Otieno", role: "Operational Excellence Manager", spec: "Lean, Six Sigma & Process Design",
    initials: "PO", palette: 7, icon: "ops",
    bio: "Lean Six Sigma Black Belt. Has redesigned operations for manufacturers, retailers and logistics firms, achieving an average 28% cost reduction.",
  },
];

export default function TeamPage() {
  const [dark, setDark] = useState(true);
  const t = theme(dark);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: t.glass, backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`, borderRadius: 20, ...extra,
  });

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="team" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.1) 0%,transparent 65%)` }} />
        {/* Decorative grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(200,168,75,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.03) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Our People</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Meet the Crisis Team</h1>
          <p style={{ color: t.fgMuted, maxWidth: 560, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>
            East Africa&apos;s most experienced crisis management and strategic consulting professionals — ready to deploy within hours.
          </p>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)", maxWidth: 800, margin: "0 auto 80px" }} />

      {/* Team grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 26 }}>
          {FULL_TEAM.map((m, i) => (
            <TeamCard key={i} member={m} dark={dark} size="lg" />
          ))}
        </div>
      </section>

      {/* Values strip */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {[
            { icon: "⚡", title: "Rapid Deployment", desc: "Our teams are on-site within hours, not weeks." },
            { icon: "🔒", title: "Full Confidentiality", desc: "Every engagement is handled with absolute discretion." },
            { icon: "📊", title: "Data-Driven", desc: "Every decision backed by forensic evidence and analysis." },
            { icon: "🌍", title: "Regional Expertise", desc: "Deep understanding of East African business landscape." },
          ].map((v, i) => (
            <div key={i} style={{ ...glass({ padding: "28px 24px", textAlign: "center" as const }) }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, fontFamily: t.serif, marginBottom: 8, color: t.gold }}>{v.title}</div>
              <div style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", ...glass({ padding: "52px 60px", textAlign: "center" as const, background: "rgba(200,168,75,0.05)" }) }}>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 16, color: t.fg }}>Work With Our Team</h2>
          <p style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 32, lineHeight: 1.8, fontSize: 15 }}>Facing a crisis? Our specialists are on standby. Contact us for an immediate, confidential assessment.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 14, padding: "15px 36px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 30px rgba(200,168,75,0.4)` }}>
            Book a Consultation →
          </a>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
