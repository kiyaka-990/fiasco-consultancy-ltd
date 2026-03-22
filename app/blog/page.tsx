"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { theme } from "@/lib/theme";

const ALL_BLOGS = [
  { img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", date: "Mar 10, 2026", cat: "Prevention", author: "Amelia Wangui", read: "5 min", title: "Lessons from the Near-Misses: Failure Prevention Tactics", excerpt: "Most business disasters don't arrive without warning. This article explores the subtle signals that precede operational collapse and how to act before it's too late." },
  { img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=700&q=80", date: "Mar 12, 2026", cat: "Recovery", author: "Steve Nyagah", read: "7 min", title: "The Art of the Project Turnaround: Rescuing Failing Initiatives", excerpt: "When a project is declared too far gone, that's often when Fiasco steps in. Here's the methodology we use to rescue stalled, failing, and high-risk initiatives." },
  { img: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=700&q=80", date: "Mar 13, 2026", cat: "Crisis Comms", author: "Michael Wainaina", read: "6 min", title: "Crisis Communications: Fixing Reputation Damage Post-Fiasco", excerpt: "A reputation takes years to build and hours to destroy. This guide covers the tactical communications playbook we deploy in the critical 72 hours following a public crisis." },
  { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80", date: "Mar 15, 2026", cat: "Forensics", author: "Grace Elizabeth", read: "8 min", title: "How to Detect Internal Fraud Before It Destroys Your Business", excerpt: "Internal fraud costs East African businesses billions annually. This covers the behavioral and financial indicators every CEO and CFO should be monitoring." },
  { img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&q=80", date: "Mar 18, 2026", cat: "Strategy", author: "Amelia Wangui", read: "6 min", title: "Building Organizational Resilience in an Uncertain East African Market", excerpt: "The most successful companies in East Africa share one trait: they are built to absorb shocks. Here's how to design resilience into your organizational DNA." },
  { img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80", date: "Mar 20, 2026", cat: "Digital", author: "Steve Nyagah", read: "5 min", title: "Digital Transformation Failures: What Goes Wrong and How to Avoid It", excerpt: "70% of digital transformation projects fail to achieve their objectives. After auditing dozens of failed implementations, here are the patterns we consistently see." },
];

const CATS = ["All", "Prevention", "Recovery", "Crisis Comms", "Forensics", "Strategy", "Digital"];

export default function BlogPage() {
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

  const filtered = filter === "All" ? ALL_BLOGS : ALL_BLOGS.filter(b => b.cat === filter);
  const [featured, ...rest] = filtered;

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="blog" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.08) 0%,transparent 65%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Insights</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Blog & Articles</h1>
          <p style={{ color: t.fgMuted, maxWidth: 540, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>Thought leadership on crisis management, turnaround strategy, and East African business resilience — written by our specialists.</p>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ padding: "0 24px 56px", display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8 }}>
        {CATS.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: "8px 20px", borderRadius: 100, border: `1px solid ${filter === c ? t.gold : t.bdr}`, background: filter === c ? `linear-gradient(135deg,${t.gold},${t.goldDark})` : "transparent", color: filter === c ? "#1A1000" : t.fg, fontSize: 13, fontFamily: t.sans, cursor: "pointer", fontWeight: filter === c ? 700 : 400, transition: T, boxShadow: filter === c ? `0 4px 20px rgba(200,168,75,0.4)` : "none" }}>{c}</button>
        ))}
      </div>

      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          {/* Featured */}
          {featured && (
            <div style={{ ...glass({ overflow: "hidden", marginBottom: 40 }), display: "grid", gridTemplateColumns: "1.2fr 1fr" }}>
              <div style={{ height: 380, overflow: "hidden", position: "relative" }}>
                <Image src={featured.img} alt={featured.title} fill sizes="50vw" style={{ objectFit: "cover", filter: "brightness(0.6)" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent,rgba(8,12,20,0.4))" }} />
                <div style={{ position: "absolute", top: 20, left: 20, background: "rgba(200,168,75,0.18)", border: "1px solid rgba(200,168,75,0.45)", borderRadius: 100, padding: "5px 16px" }}>
                  <span style={{ fontSize: 10, fontFamily: t.sans, color: t.gold, fontWeight: 700, textTransform: "uppercase" as const }}>Featured · {featured.cat}</span>
                </div>
              </div>
              <div style={{ padding: "42px 44px 42px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 18, fontFamily: t.sans, fontSize: 12, color: t.fgMuted }}>
                  <span>{featured.date}</span><span>·</span><span>{featured.read} read</span><span>·</span><span>{featured.author}</span>
                </div>
                <h2 style={{ fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 16, lineHeight: 1.3, color: t.fg }}>{featured.title}</h2>
                <p style={{ fontSize: 14, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.8, marginBottom: 28 }}>{featured.excerpt}</p>
                <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 6px 24px rgba(200,168,75,0.4)`, width: "fit-content" }}>Read Article →</a>
              </div>
            </div>
          )}

          {/* Rest */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 24 }}>
            {rest.map((b, i) => (
              <div key={i} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
                style={{ ...glass({ overflow: "hidden" }), transition: T, transform: hov === i ? "translateY(-5px)" : "translateY(0)", boxShadow: hov === i ? "0 20px 50px rgba(0,0,0,0.35)" : "none" }}>
                <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                  <Image src={b.img} alt={b.title} fill sizes="33vw" style={{ objectFit: "cover", filter: "brightness(0.6)", transform: hov === i ? "scale(1.06)" : "scale(1)", transition: T }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.88) 0%,transparent 55%)" }} />
                  <div style={{ position: "absolute", top: 14, left: 14, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 12px" }}>
                    <span style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, fontWeight: 700 }}>{b.cat}</span>
                  </div>
                </div>
                <div style={{ padding: "20px 22px 26px" }}>
                  <div style={{ display: "flex", gap: 10, marginBottom: 10, fontFamily: t.sans, fontSize: 11, color: t.fgMuted }}>
                    <span>{b.date}</span><span>·</span><span>{b.read} read</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, fontFamily: t.serif, lineHeight: 1.4, marginBottom: 10, color: t.fg }}>{b.title}</h3>
                  <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7, marginBottom: 16 }}>{b.excerpt}</p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, fontFamily: t.sans, color: t.fgMuted }}>By {b.author}</span>
                    <a href="#" style={{ color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, textDecoration: "none" }}>Read →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
