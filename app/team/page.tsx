"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { theme } from "@/lib/theme";

const TEAM_FULL = [
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", name: "Amelia Wangui", role: "Head of Crisis Response", spec: "Rapid Intervention & Stabilization", bio: "15+ years in crisis management. Leads all emergency deployments across Kenya, Uganda and Tanzania. Certified in organizational resilience and risk management." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", name: "Steve Nyagah", role: "Senior Turnaround Strategist", spec: "Project Recovery & Execution", bio: "Rescued 80+ failing projects across East Africa. Former PMP-certified project director with deep experience in infrastructure, tech, and FMCG sectors." },
  { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", name: "Grace Elizabeth", role: "Forensic Audit Specialist", spec: "Investigation & Compliance", bio: "Court-qualified expert witness and certified fraud examiner. Has led forensic investigations totaling over KES 2B in recovered or secured assets." },
  { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", name: "Michael Wainaina", role: "Reputation & Comms Lead", spec: "Media Defense & PR Strategy", bio: "Former journalist turned crisis communications expert. Has managed media fallout for 30+ organizations including listed companies and NGOs." },
  { img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80", name: "Diana Ochieng", role: "Digital Transformation Lead", spec: "Cloud, ERP & Automation", bio: "Delivered 40+ digital transformation projects across East African enterprises. Expert in Microsoft Azure, SAP, and custom enterprise solutions." },
  { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", name: "James Kimani", role: "Senior HR Strategy Consultant", spec: "Workforce Planning & OD", bio: "Certified HR professional with deep expertise in Kenyan labour law, compensation design, and organizational development for high-growth firms." },
  { img: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=400&q=80", name: "Fatuma Hassan", role: "Data Analytics Director", spec: "BI, Predictive Modelling & Insights", bio: "Former data scientist at a Big 4 firm. Builds custom analytics frameworks and dashboards that turn complex data into clear strategic decisions." },
  { img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", name: "Patrick Otieno", role: "Operational Excellence Manager", spec: "Lean, Six Sigma & Process Design", bio: "Lean Six Sigma Black Belt. Has redesigned operations for manufacturers, retailers and logistics firms, achieving an average 28% cost reduction." },
];

export default function TeamPage() {
  const [dark, setDark] = useState(true);
  const [hov, setHov] = useState<number | null>(null);
  const t = theme(dark);
  const T = t.T;
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
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.08) 0%,transparent 65%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Our People</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Meet the Crisis Team</h1>
          <p style={{ color: t.fgMuted, maxWidth: 560, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>East Africa&apos;s most experienced crisis management and strategic consulting professionals — ready to deploy within hours.</p>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)", maxWidth: 800, margin: "0 auto 80px" }} />

      {/* Team grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 26 }}>
          {TEAM_FULL.map((m, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,168,75,0.3)` : "none", border: `1px solid ${hov === i ? "rgba(200,168,75,0.4)" : t.bdr}` }}>
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <Image src={m.img} alt={m.name} fill sizes="(max-width:768px) 100vw,25vw" style={{ objectFit: "cover", objectPosition: "top", filter: "brightness(0.78)", transform: hov === i ? "scale(1.05)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.85) 0%,transparent 50%)" }} />
              </div>
              <div style={{ padding: "22px 22px 26px" }}>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4, fontFamily: t.serif, color: t.fg }}>{m.name}</div>
                <div style={{ color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 600, marginBottom: 10 }}>{m.role}</div>
                <div style={{ fontSize: 11, color: t.fgMuted, fontFamily: t.sans, marginBottom: 12, letterSpacing: 0.3 }}>{m.spec}</div>
                <div style={{ height: 1, background: t.bdr, marginBottom: 12 }} />
                <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7, margin: 0 }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", ...glass({ padding: "52px 60px", textAlign: "center" as const, background: "rgba(200,168,75,0.05)" }) }}>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 16, color: t.fg }}>Work With Our Team</h2>
          <p style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 32, lineHeight: 1.8, fontSize: 15 }}>Facing a crisis? Our specialists are on standby. Contact us for an immediate assessment — no obligation.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 14, padding: "15px 36px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 30px rgba(200,168,75,0.4)` }}>Book a Consultation →</a>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
