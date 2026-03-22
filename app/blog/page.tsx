"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const R = "#E8303A";

const ALL_BLOGS = [
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", date: "Mar 10, 2026", cat: "Prevention", author: "Amelia Wangui", read: "5 min", title: "Lessons from the Near-Misses: Failure Prevention Tactics", excerpt: "Most business disasters don't arrive without warning. This article explores the subtle signals that precede operational collapse and how to act on them before it's too late." },
  { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80", date: "Mar 12, 2026", cat: "Recovery", author: "Steve Nyagah", read: "7 min", title: "The Art of the Project Turnaround: Rescuing Failing Initiatives", excerpt: "When a project is declared &quot;too far gone&quot; by most, that's often when Fiasco steps in. Here's the methodology we use to rescue stalled, failing, and high-risk initiatives." },
  { img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&q=80", date: "Mar 13, 2026", cat: "Crisis Comms", author: "Michael Wainaina", read: "6 min", title: "Crisis Communications: Fixing Reputation Damage Post-Fiasco", excerpt: "A reputation takes years to build and hours to destroy. This guide covers the tactical communications playbook we deploy in the critical 72 hours following a public crisis." },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80", date: "Mar 15, 2026", cat: "Forensics", author: "Grace Elizabeth", read: "8 min", title: "How to Detect Internal Fraud Before It Destroys Your Business", excerpt: "Internal fraud costs East African businesses billions annually. This piece covers the behavioral and financial indicators that every CEO and CFO should be monitoring." },
  { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80", date: "Mar 18, 2026", cat: "Strategy", author: "Amelia Wangui", read: "6 min", title: "Building Organizational Resilience in an Uncertain East African Market", excerpt: "The most successful companies in East Africa share one trait: they are built to absorb shocks. Here's how to design resilience into your organizational DNA." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", date: "Mar 20, 2026", cat: "Digital", author: "Steve Nyagah", read: "5 min", title: "Digital Transformation Failures: What Goes Wrong and How to Avoid It", excerpt: "70% of digital transformation projects fail to achieve their objectives. After auditing dozens of failed implementations, here are the patterns we consistently see." },
];

const CATS = ["All", "Prevention", "Recovery", "Crisis Comms", "Forensics", "Strategy", "Digital"];

export default function BlogPage() {
  const [dark, setDark] = useState(true);
  const [filter, setFilter] = useState("All");
  const [hov, setHov] = useState<number | null>(null);

  const filtered = filter === "All" ? ALL_BLOGS : ALL_BLOGS.filter(b => b.cat === filter);
  const [featured, ...rest] = filtered;

  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${bdr}`, borderRadius: 20, ...extra });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="blog" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 80px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Insights</div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: 20 }}>Blog & Articles</h1>
        <p style={{ color: fgM, maxWidth: 560, margin: "0 auto", fontFamily: "sans-serif", lineHeight: 1.8 }}>Thought leadership on crisis management, turnaround strategy, and East African business resilience — written by our specialists.</p>
      </section>

      {/* Filter */}
      <div style={{ padding: "0 24px 56px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 20px", borderRadius: 100, border: `1px solid ${filter === c ? R : bdr}`, background: filter === c ? `linear-gradient(135deg,${R},#8B1520)` : "transparent", color: filter === c ? "#fff" : fg, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: T, boxShadow: filter === c ? `0 4px 20px ${R}44` : "none" }}>{c}</button>
        ))}
      </div>

      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Featured article */}
          {featured && (
            <div style={{ ...glass({ overflow: "hidden", marginBottom: 40 }), display: "grid", gridTemplateColumns: "1.2fr 1fr" }}>
              <div style={{ height: 380, overflow: "hidden", position: "relative" }}>
                <Image src={featured.img} alt={featured.title} fill sizes="50vw" style={{ objectFit: "cover", filter: "brightness(0.65)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(5,13,26,0.4))" }} />
                <div style={{ position: "absolute", top: 20, left: 20, background: `${R}20`, border: `1px solid ${R}50`, borderRadius: 100, padding: "5px 16px" }}>
                  <span style={{ fontSize: 10, fontFamily: "sans-serif", color: R, fontWeight: 800, textTransform: "uppercase" as const }}>Featured · {featured.cat}</span>
                </div>
              </div>
              <div style={{ padding: "40px 40px 40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 16, fontFamily: "sans-serif", fontSize: 12, color: fgM }}>
                  <span>{featured.date}</span><span>·</span><span>{featured.read} read</span><span>·</span><span>{featured.author}</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 900, marginBottom: 16, lineHeight: 1.3 }}>{featured.title}</h2>
                <p style={{ fontSize: 14, color: fgM, fontFamily: "sans-serif", lineHeight: 1.8, marginBottom: 28 }}>{featured.excerpt}</p>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${R},#8B1520)`, color: "#fff", textDecoration: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontFamily: "sans-serif", fontWeight: 800, boxShadow: `0 6px 24px ${R}44`, width: "fit-content" }}>Read Article →</a>
              </div>
            </div>
          )}

          {/* Rest of articles */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
            {rest.map((b, i) => (
              <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-5px)" : "translateY(0)", boxShadow: hov === i ? "0 20px 50px rgba(0,0,0,0.25)" : "none" }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <Image src={b.img} alt={b.title} fill sizes="33vw" style={{ objectFit: "cover", filter: "brightness(0.62)", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: T }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,13,26,0.82) 0%,transparent 55%)" }} />
                  <div style={{ position: "absolute", top: 14, left: 14, background: `${R}20`, border: `1px solid ${R}50`, borderRadius: 100, padding: "4px 12px" }}>
                    <span style={{ fontSize: 9, fontFamily: "sans-serif", color: R, fontWeight: 800 }}>{b.cat}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 22px 26px" }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10, fontFamily: "sans-serif", fontSize: 11, color: fgM }}>
                    <span>{b.date}</span><span>·</span><span>{b.read} read</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.4, marginBottom: 10 }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: fgM, fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 16 }}>{b.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, fontFamily: "sans-serif", color: fgM }}>By {b.author}</span>
                    <a href="#" style={{ color: R, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} />
      <Chatbot dark={dark} />
    </div>
  );
}
