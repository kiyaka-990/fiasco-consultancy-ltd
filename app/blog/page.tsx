"use client";
import { useState } from "react";
import Image from "next/image";
import PageShell, { PageHero, Section, glassCard } from "@/components/PageShell";

const ALL_BLOGS = [
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", date: "Mar 10, 2026", cat: "Prevention", author: "Amelia Wangui", read: "5 min", title: "Lessons from the Near-Misses: Failure Prevention Tactics", excerpt: "Most business disasters don't arrive without warning. This explores the subtle signals that precede operational collapse and how to act before it's too late." },
  { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80", date: "Mar 12, 2026", cat: "Recovery", author: "Steve Nyagah", read: "7 min", title: "The Art of the Project Turnaround: Rescuing Failing Initiatives", excerpt: "When a project is declared too far gone, that's often when Fiasco steps in. Here's the methodology we use to rescue stalled, failing, and high-risk initiatives." },
  { img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&q=80", date: "Mar 13, 2026", cat: "Crisis Comms", author: "Michael Wainaina", read: "6 min", title: "Crisis Communications: Fixing Reputation Damage Post-Fiasco", excerpt: "A reputation takes years to build and hours to destroy. This covers the tactical communications playbook we deploy in the critical 72 hours following a public crisis." },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80", date: "Mar 15, 2026", cat: "Forensics", author: "Grace Elizabeth", read: "8 min", title: "How to Detect Internal Fraud Before It Destroys Your Business", excerpt: "Internal fraud costs East African businesses billions annually. This covers the behavioral and financial indicators every CEO and CFO should be monitoring." },
  { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80", date: "Mar 18, 2026", cat: "Strategy", author: "Amelia Wangui", read: "6 min", title: "Building Organizational Resilience in an Uncertain East African Market", excerpt: "The most successful companies in East Africa share one trait: they are built to absorb shocks. Here's how to design resilience into your organizational DNA." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", date: "Mar 20, 2026", cat: "Digital", author: "Steve Nyagah", read: "5 min", title: "Digital Transformation Failures: What Goes Wrong and How to Avoid It", excerpt: "70% of digital transformation projects fail. After auditing dozens of failed implementations, here are the patterns we consistently see." },
];

const CATS = ["All", "Prevention", "Recovery", "Crisis Comms", "Forensics", "Strategy", "Digital"];

export default function BlogPage() {
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);
  const filtered = filter === "All" ? ALL_BLOGS : ALL_BLOGS.filter(b => b.cat === filter);
  const [featured, ...rest] = filtered;

  return (
    <PageShell activeNav="blog">
      {(t, dark) => (
        <>
          <PageHero tag="Insights" title="Blog & Articles" sub="Thought leadership on crisis management, turnaround strategy, and East African business resilience — written by our specialists." t={t} />

          {/* Filter — scrollable on mobile */}
          <div style={{ padding: "0 16px 48px", overflowX: "auto", WebkitOverflowScrolling: "touch" as unknown as undefined }}>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", minWidth: "max-content", margin: "0 auto", padding: "0 4px" }}>
              {CATS.map(c => (
                <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 16px", borderRadius: 100, border: `1px solid ${filter === c ? t.gold : t.bdr}`, background: filter === c ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : "transparent", color: filter === c ? "#1A1000" : t.fg, fontSize: 12, fontFamily: t.sans, cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: t.T, whiteSpace: "nowrap" as const, flexShrink: 0 }}>{c}</button>
              ))}
            </div>
          </div>

          <Section style={{ paddingTop: 0 }}>
            {/* Featured article — stacks to single column on mobile */}
            {featured && (
              <div style={{ ...glassCard(t, { overflow: "hidden", marginBottom: 32 }), display: "grid", gridTemplateColumns: "clamp(200px,45%,1fr) 1fr" }}>
                <div style={{ minHeight: 260, overflow: "hidden", position: "relative" }}>
                  <Image src={featured.img} alt={featured.title} fill sizes="(max-width:600px) 100vw,45vw" style={{ objectFit: "cover", filter: "brightness(0.6)" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(8,12,20,0.3))" }} />
                  <div style={{ position: "absolute", top: 16, left: 16, background: "rgba(200,168,75,0.18)", border: "1px solid rgba(200,168,75,0.45)", borderRadius: 100, padding: "5px 14px" }}>
                    <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700, textTransform: "uppercase" as const }}>Featured · {featured.cat}</span>
                  </div>
                </div>
                <div style={{ padding: "clamp(20px,4vw,40px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 14, fontFamily: t.sans, fontSize: 11, color: t.fgMuted, flexWrap: "wrap" as const }}>
                    <span>{featured.date}</span><span>·</span><span>{featured.read} read</span><span>·</span><span>{featured.author}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(1.2rem,2.5vw,1.8rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 14, lineHeight: 1.3, color: t.fg }}>{featured.title}</h2>
                  <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.8, marginBottom: 24 }}>{featured.excerpt}</p>
                  <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 6px 20px rgba(200,168,75,0.4)`, width: "fit-content" }}>Read Article →</a>
                </div>
              </div>
            )}

            {/* Rest */}
            <div className="grid-auto">
              {rest.map((b, i) => (
                <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ ...glassCard(t, { overflow: "hidden" }), transition: t.T, transform: hov === i ? "translateY(-5px)" : "translateY(0)", boxShadow: hov === i ? "0 18px 45px rgba(0,0,0,0.3)" : "none" }}>
                  <div style={{ height: 185, overflow: "hidden", position: "relative" }}>
                    <Image src={b.img} alt={b.title} fill sizes="(max-width:600px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.6)", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: t.T }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.88) 0%,transparent 55%)" }} />
                    <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "3px 10px" }}>
                      <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700 }}>{b.cat}</span>
                    </div>
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ display: "flex", gap: 10, marginBottom: 8, fontFamily: t.sans, fontSize: 11, color: t.fgMuted }}>
                      <span>{b.date}</span><span>·</span><span>{b.read} read</span>
                    </div>
                    <h3 style={{ fontSize: "clamp(14px,2vw,16px)", fontWeight: 700, fontFamily: t.serif, lineHeight: 1.4, marginBottom: 10, color: t.fg }}>{b.title}</h3>
                    <p style={{ fontSize: 12, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7, marginBottom: 14 }}>{b.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, fontFamily: t.sans, color: t.fgMuted }}>By {b.author}</span>
                      <a href="#" style={{ color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, textDecoration: "none" }}>Read →</a>
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
