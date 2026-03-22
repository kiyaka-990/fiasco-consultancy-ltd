"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { TEAM } from "@/lib/data";
import type { TeamMember } from "@/lib/data";

const R = "#E8303A";

const EXTENDED_TEAM = [
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80", name: "Amelia Wangui", role: "Head of Crisis Response", spec: "Rapid Intervention & Stabilization", bio: "15+ years in crisis management. Has led emergency response teams across Kenya, Uganda and Tanzania. Certified in organizational resilience and risk management.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", name: "Steve Nyagah", role: "Senior Turnaround Strategist", spec: "Project Recovery & Execution", bio: "Rescued 80+ failing projects across East Africa. Former PMP-certified project director with experience in infrastructure, tech, and FMCG sectors.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80", name: "Grace Elizabeth", role: "Forensic Audit Specialist", spec: "Investigation & Compliance", bio: "Court-qualified expert witness and certified fraud examiner. Has led forensic investigations totaling over KES 2B in recovered or secured assets.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80", name: "Michael Wainaina", role: "Reputation & Comms Lead", spec: "Media Defense & PR Strategy", bio: "Former journalist turned crisis communications expert. Has managed media fallout for 30+ organizations including listed companies and NGOs.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&q=80", name: "Diana Ochieng", role: "Digital Transformation Lead", spec: "Cloud, ERP & Automation", bio: "Delivered 40+ digital transformation projects for East African enterprises. Expert in Microsoft Azure, SAP, and custom enterprise solutions.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80", name: "James Kimani", role: "Senior HR Strategy Consultant", spec: "Workforce Planning & OD", bio: "Certified HR professional with deep expertise in Kenyan labour law, compensation design, and organizational development for high-growth firms.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=400&q=80", name: "Fatuma Hassan", role: "Data Analytics Director", spec: "BI, Predictive Modelling & Insights", bio: "Former data scientist at a Big 4 firm. Builds custom analytics frameworks and dashboards that turn complex data into clear strategic decisions.", linkedin: "#" },
  { img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80", name: "Patrick Otieno", role: "Operational Excellence Manager", spec: "Lean, Six Sigma & Process Design", bio: "Lean Six Sigma Black Belt. Has redesigned operations for manufacturers, retailers and logistics firms, achieving average 28% cost reduction.", linkedin: "#" },
];

export default function TeamPage() {
  const [dark, setDark] = useState(true);
  const [hov, setHov] = useState<number | null>(null);

  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${bdr}`, borderRadius: 20, ...extra });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="team" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 100px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 100%,rgba(232,48,58,0.1) 0%,transparent 60%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Our People</div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: 20, letterSpacing: -0.5 }}>Meet the Crisis Team</h1>
          <p style={{ color: fgM, maxWidth: 580, margin: "0 auto", fontFamily: "sans-serif", lineHeight: 1.8, fontSize: 16 }}>East Africa&apos;s most experienced crisis management and strategic consulting professionals — ready to deploy within hours.</p>
        </div>
      </section>

      {/* Team grid */}
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 28 }}>
          {EXTENDED_TEAM.map((m, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? `0 24px 60px rgba(0,0,0,0.3),0 0 0 1px ${R}25` : "none", border: `1px solid ${hov === i ? R + "45" : bdr}` }}>
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <Image src={m.img} alt={m.name} fill sizes="(max-width:768px) 100vw,25vw" style={{ objectFit: "cover", objectPosition: "top", filter: "brightness(0.8)", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,13,26,0.85) 0%,transparent 50%)" }} />
              </div>
              <div style={{ padding: "22px 22px 26px" }}>
                <div style={{ fontWeight: 900, fontSize: 17, marginBottom: 4, fontFamily: "sans-serif" }}>{m.name}</div>
                <div style={{ color: R, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 10 }}>{m.role}</div>
                <div style={{ fontSize: 12, color: fgM, fontFamily: "sans-serif", marginBottom: 12 }}>{m.spec}</div>
                <p style={{ fontSize: 13, color: fgM, fontFamily: "sans-serif", lineHeight: 1.7, borderTop: `1px solid ${bdr}`, paddingTop: 12, margin: 0 }}>{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", fontWeight: 900, marginBottom: 20 }}>Work With Our Team</h2>
          <p style={{ color: fgM, fontFamily: "sans-serif", lineHeight: 1.8, marginBottom: 36 }}>Facing a crisis? Our specialists are on standby. Contact us for an immediate assessment.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${R},#8B1520)`, color: "#fff", textDecoration: "none", borderRadius: 14, padding: "16px 36px", fontSize: 16, fontFamily: "sans-serif", fontWeight: 900, boxShadow: `0 8px 30px ${R}44` }}>Book a Consultation →</a>
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
      <Chatbot dark={dark} />
    </div>
  );
}
