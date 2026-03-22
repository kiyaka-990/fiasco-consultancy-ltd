"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { PROJECTS } from "@/lib/data";
import type { Project } from "@/lib/data";

const R = "#E8303A";

const ALL_PROJECTS = [
  { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80", title: "Failing Project Turnaround", cat: "Project Rescue", tag: "Infrastructure", outcome: "Delivered on revised timeline", value: "Sh. 2.4B", desc: "Rescued a massive infrastructure project from total collapse — replanned, re-staffed, and delivered with all stakeholders aligned." },
  { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80", title: "Reputation Crisis Mitigation", cat: "Media Defense", tag: "Banking", outcome: "Trust restored in 60 days", value: "KES 8.2B at risk", desc: "Managed aggressive media fallout for a regional bank after an internal data breach. Restored full public trust within 60 days." },
  { img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80", title: "Internal Fraud Investigation", cat: "Forensic Audit", tag: "Manufacturing", outcome: "Prosecution secured", value: "KES 180M recovered", desc: "Uncovered a systemic internal fraud scheme across 3 subsidiaries. Led to successful prosecution and full governance overhaul." },
  { img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80", title: "Operational Collapse Stabilization", cat: "Intervention", tag: "Manufacturing", outcome: "Operations restored in 72hrs", value: "500 jobs saved", desc: "Deployed rapid-response team to stabilize a manufacturing firm facing total operational shutdown and supply chain failure." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", title: "HR Strategy Overhaul", cat: "HR Strategy", tag: "NGO", outcome: "40% retention improvement", value: "1,200 employees", desc: "Redesigned HR systems, compensation structure, and culture framework for a large regional NGO facing a talent exodus." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", title: "Digital Transformation — Retailer", cat: "Digital Transformation", tag: "Retail", outcome: "35% efficiency gain", value: "12 branches integrated", desc: "Led full ERP migration and process automation for a national retailer — integrating 12 branches into a single digital platform." },
];

const CATS = ["All", "Project Rescue", "Media Defense", "Forensic Audit", "Intervention", "HR Strategy", "Digital Transformation"];

export default function ProjectsPage() {
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);

  const filtered = filter === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);
  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${bdr}`, borderRadius: 20, ...extra });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="projects" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 80px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Case Studies</div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: 20 }}>Crises We&apos;ve Resolved</h1>
        <p style={{ color: fgM, maxWidth: 580, margin: "0 auto", fontFamily: "sans-serif", lineHeight: 1.8 }}>Real results from real interventions. Every engagement represents a business pulled back from the brink.</p>
      </section>

      {/* Filter tabs */}
      <div style={{ padding: "0 24px 60px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 20px", borderRadius: 100, border: `1px solid ${filter === c ? R : bdr}`, background: filter === c ? `linear-gradient(135deg,${R},#8B1520)` : "transparent", color: filter === c ? "#fff" : fg, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: T, boxShadow: filter === c ? `0 4px 20px ${R}44` : "none" }}>{c}</button>
        ))}
      </div>

      {/* Projects grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 28 }}>
          {filtered.map((p, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? "0 24px 60px rgba(0,0,0,0.3)" : "none" }}>
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.55)", transform: hov === i ? "scale(1.07)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,13,26,0.92) 0%,transparent 50%)" }} />
                <div style={{ position: "absolute", top: 16, left: 16, background: `${R}20`, border: `1px solid ${R}50`, borderRadius: 100, padding: "4px 14px" }}>
                  <span style={{ fontSize: 9, fontFamily: "sans-serif", color: R, fontWeight: 800, textTransform: "uppercase" as const }}>{p.cat}</span>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 100, padding: "4px 12px" }}>
                  <span style={{ fontSize: 9, fontFamily: "sans-serif", color: "#fff", fontWeight: 700 }}>{p.tag}</span>
                </div>
              </div>
              <div style={{ padding: "24px 26px 28px" }}>
                <h3 style={{ fontSize: 19, fontWeight: 900, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: fgM, lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: dark ? "rgba(232,48,58,0.08)" : "rgba(232,48,58,0.05)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 9, color: R, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Outcome</div>
                    <div style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: 700 }}>{p.outcome}</div>
                  </div>
                  <div style={{ background: dark ? "rgba(255,255,255,0.05)" : "rgba(10,22,40,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 9, color: fgM, fontFamily: "sans-serif", letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Scale</div>
                    <div style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, color: R }}>{p.value}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
      <Chatbot dark={dark} />
    </div>
  );
}
