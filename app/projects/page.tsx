"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { theme } from "@/lib/theme";

const ALL_PROJECTS = [
  { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80", title: "Failing Project Turnaround", cat: "Project Rescue", tag: "Infrastructure", outcome: "Delivered on revised timeline", value: "Sh. 2.4B", desc: "Rescued a massive infrastructure project from total collapse — replanned, re-staffed, and delivered with all stakeholders aligned." },
  { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80", title: "Reputation Crisis Mitigation", cat: "Media Defense", tag: "Banking", outcome: "Trust restored in 60 days", value: "KES 8.2B at risk", desc: "Managed aggressive media fallout for a regional bank after an internal data breach. Restored full public trust within 60 days." },
  { img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80", title: "Internal Fraud Investigation", cat: "Forensic Audit", tag: "Manufacturing", outcome: "Prosecution secured", value: "KES 180M recovered", desc: "Uncovered a systemic internal fraud scheme across 3 subsidiaries. Led to successful prosecution and full governance overhaul." },
  { img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80", title: "Operational Collapse Stabilization", cat: "Intervention", tag: "Manufacturing", outcome: "Operations restored in 72hrs", value: "500 jobs saved", desc: "Deployed rapid-response team to stabilize a manufacturing firm facing total operational shutdown and supply chain failure." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", title: "HR Strategy Overhaul", cat: "HR Strategy", tag: "NGO", outcome: "40% retention improvement", value: "1,200 employees", desc: "Redesigned HR systems, compensation structure, and culture framework for a large regional NGO facing a talent exodus." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", title: "Digital Transformation — Retailer", cat: "Digital", tag: "Retail", outcome: "35% efficiency gain", value: "12 branches integrated", desc: "Led full ERP migration and process automation for a national retailer — integrating 12 branches into a single digital platform." },
];

const CATS = ["All", "Project Rescue", "Media Defense", "Forensic Audit", "Intervention", "HR Strategy", "Digital"];

export default function ProjectsPage() {
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);
  const t = theme(dark);
  const T = t.T;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: t.glass, backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`, borderRadius: 20, ...extra,
  });

  const filtered = filter === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="projects" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.08) 0%,transparent 65%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Case Studies</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Crises We&apos;ve Resolved</h1>
          <p style={{ color: t.fgMuted, maxWidth: 560, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>Real results from real interventions. Every engagement represents a business pulled back from the brink.</p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ padding: "0 24px 60px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 20px", borderRadius: 100, border: `1px solid ${filter === c ? t.gold : t.bdr}`, background: filter === c ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : "transparent", color: filter === c ? "#1A1000" : t.fg, fontSize: 13, fontFamily: t.sans, cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: T, boxShadow: filter === c ? `0 4px 20px rgba(200,168,75,0.4)` : "none" }}>{c}</button>
        ))}
      </div>

      {/* Projects grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(360px,1fr))", gap: 26 }}>
          {filtered.map((p, i) => (
            <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? "0 24px 60px rgba(0,0,0,0.4)" : "none" }}>
              <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                <Image src={p.img} alt={p.title} fill sizes="(max-width:768px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.5)", transform: hov === i ? "scale(1.07)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.95) 0%,transparent 50%)" }} />
                <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 14px" }}>
                  <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700, textTransform: "uppercase" as const }}>{p.cat}</span>
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "4px 12px" }}>
                  <span style={{ fontSize: 9, fontFamily: t.sans, color: "#fff", fontWeight: 600 }}>{p.tag}</span>
                </div>
              </div>
              <div style={{ padding: "24px 26px 28px" }}>
                <h3 style={{ fontSize: 19, fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.fg }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.7, fontFamily: t.sans, marginBottom: 18 }}>{p.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <div style={{ background: "rgba(200,168,75,0.07)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 9, color: t.gold, fontFamily: t.sans, letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Outcome</div>
                    <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 700, color: t.fg }}>{p.outcome}</div>
                  </div>
                  <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(26,16,0,0.04)", borderRadius: 10, padding: "10px 14px" }}>
                    <div style={{ fontSize: 9, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Scale</div>
                    <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 700, color: t.gold }}>{p.value}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
