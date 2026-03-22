"use client";
import { useState } from "react";
import Image from "next/image";
import PageShell, { PageHero, Section, SH, glassCard } from "@/components/PageShell";

const ALL_PROJECTS = [
  { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&q=80", title: "Failing Project Turnaround", cat: "Project Rescue", tag: "Infrastructure", outcome: "Delivered on revised timeline", value: "Sh. 2.4B", desc: "Rescued a massive infrastructure project from total collapse — replanned, re-staffed, and delivered with all stakeholders aligned." },
  { img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&q=80", title: "Reputation Crisis Mitigation", cat: "Media Defense", tag: "Banking", outcome: "Trust restored in 60 days", value: "KES 8.2B at risk", desc: "Managed aggressive media fallout for a regional bank after an internal data breach. Restored full public trust within 60 days." },
  { img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=700&q=80", title: "Internal Fraud Investigation", cat: "Forensic Audit", tag: "Manufacturing", outcome: "Prosecution secured", value: "KES 180M recovered", desc: "Uncovered a systemic internal fraud scheme across 3 subsidiaries. Led to successful prosecution and full governance overhaul." },
  { img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&q=80", title: "Operational Collapse Stabilization", cat: "Intervention", tag: "Manufacturing", outcome: "Operations restored in 72hrs", value: "500 jobs saved", desc: "Deployed rapid-response team to stabilize a manufacturing firm facing total operational shutdown and supply chain failure." },
  { img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80", title: "HR Strategy Overhaul", cat: "HR Strategy", tag: "NGO", outcome: "40% retention improvement", value: "1,200 employees", desc: "Redesigned HR systems, compensation structure, and culture framework for a large regional NGO facing a talent exodus." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", title: "Digital Transformation", cat: "Digital", tag: "Retail", outcome: "35% efficiency gain", value: "12 branches integrated", desc: "Led full ERP migration and process automation for a national retailer — integrating 12 branches into a single digital platform." },
];

const CATS = ["All", "Project Rescue", "Media Defense", "Forensic Audit", "Intervention", "HR Strategy", "Digital"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);
  const filtered = filter === "All" ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter);

  return (
    <PageShell activeNav="projects">
      {(t, dark) => (
        <>
          <PageHero tag="Case Studies" title="Crises We've Resolved" sub="Real results from real interventions. Every engagement represents a business pulled back from the brink." t={t} />

          {/* Filter tabs — scrollable on mobile */}
          <div style={{ padding: "0 16px 48px", overflowX: "auto" as const }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", minWidth: "max-content", margin: "0 auto", padding: "0 4px" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 100, border: `1px solid ${filter === c ? t.gold : t.bdr}`, background: filter === c ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : "transparent", color: filter === c ? "#1A1000" : t.fg, fontSize: 12, fontFamily: t.sans, cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: t.T, whiteSpace: "nowrap" as const, flexShrink: 0, boxShadow: filter === c ? `0 4px 16px rgba(200,168,75,0.4)` : "none" }}>{c}</button>
              ))}
            </div>
          </div>

          <Section style={{ paddingTop: 0 }}>
            <div className="grid-auto">
              {filtered.map((p, i) => (
                <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ ...glassCard(t, { overflow: "hidden" }), transition: t.T, transform: hov === i ? "translateY(-5px)" : "translateY(0)", boxShadow: hov === i ? "0 20px 50px rgba(0,0,0,0.35)" : "none" }}>
                  <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                    <Image src={p.img} alt={p.title} fill sizes="(max-width:600px) 100vw,50vw" style={{ objectFit: "cover", filter: "brightness(0.5)", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: t.T }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.95) 0%,transparent 50%)" }} />
                    <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 12px" }}>
                      <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700, textTransform: "uppercase" as const }}>{p.cat}</span>
                    </div>
                    <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 100, padding: "4px 10px" }}>
                      <span style={{ fontSize: 9, fontFamily: t.sans, color: "#fff", fontWeight: 600 }}>{p.tag}</span>
                    </div>
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h3 style={{ fontSize: "clamp(15px,2vw,18px)", fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.fg }}>{p.title}</h3>
                    <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.7, fontFamily: t.sans, marginBottom: 16 }}>{p.desc}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <div style={{ background: "rgba(200,168,75,0.07)", borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontSize: 9, color: t.gold, fontFamily: t.sans, letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Outcome</div>
                        <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 700, color: t.fg }}>{p.outcome}</div>
                      </div>
                      <div style={{ background: dark ? "rgba(255,255,255,0.04)" : "rgba(26,16,0,0.04)", borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontSize: 9, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1, textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 4 }}>Scale</div>
                        <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 700, color: t.gold }}>{p.value}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </>
      )}
    </PageShell>
  );
}
