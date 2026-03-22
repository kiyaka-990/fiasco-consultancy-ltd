"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { theme } from "@/lib/theme";

interface PageShellProps {
  activeNav: string;
  children: (t: ReturnType<typeof theme>, dark: boolean) => React.ReactNode;
}

export default function PageShell({ activeNav, children }: PageShellProps) {
  const [dark, setDark] = useState(true);
  const t = theme(dark);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav={activeNav} scrollTo={scrollTo} />
      {children(t, dark)}
      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        ::selection{background:rgba(200,168,75,0.3);}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}
        .page-hero{padding:120px 20px 70px;text-align:center;position:relative;overflow:hidden;}
        .page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.09) 0%,transparent 65%);pointer-events:none;}
        .page-hero::after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(200,168,75,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.03) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;}
        .gold-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent);max-width:700px;margin:0 auto 60px;}
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:28px;}
        .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}
        .grid-auto{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;}
        .grid-auto-sm{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:20px;}
        .grid-about{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
        @media(max-width:900px){
          .grid-2{grid-template-columns:1fr;}
          .grid-3{grid-template-columns:1fr 1fr;}
          .grid-4{grid-template-columns:1fr 1fr;}
          .grid-about{grid-template-columns:1fr;gap:40px;}
          .grid-about .about-img-col{display:none;}
          .page-hero{padding:100px 16px 56px;}
        }
        @media(max-width:600px){
          .grid-3{grid-template-columns:1fr;}
          .grid-4{grid-template-columns:1fr 1fr;}
          .grid-auto{grid-template-columns:1fr;}
          .grid-auto-sm{grid-template-columns:1fr;}
          .page-hero{padding:90px 16px 48px;}
          .gold-divider{margin:0 auto 40px;}
        }
        @media(max-width:400px){
          .grid-4{grid-template-columns:1fr;}
        }
      `}</style>
    </div>
  );
}

// ── Shared hero section ────────────────────────────────────────────────────────
export function PageHero({ tag, title, sub, t }: { tag: string; title: string; sub: string; t: ReturnType<typeof theme> }) {
  return (
    <section className="page-hero">
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 18 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
          <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>{tag}</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.8rem,5vw,3.4rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 16, color: t.fg, letterSpacing: -0.5, lineHeight: 1.15 }}>{title}</h1>
        <p style={{ color: t.fgMuted, maxWidth: 540, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: "clamp(13px,2vw,15px)" }}>{sub}</p>
      </div>
    </section>
  );
}

// ── Shared glass card style ────────────────────────────────────────────────────
export function glassCard(t: ReturnType<typeof theme>, extra: React.CSSProperties = {}): React.CSSProperties {
  return {
    background: t.glass,
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`,
    borderRadius: 18,
    ...extra,
  };
}

// ── Section wrapper ────────────────────────────────────────────────────────────
export function Section({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <section style={{ padding: "clamp(48px,8vw,100px) clamp(16px,4vw,32px)", ...style }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────
export function SH({ tag, title, sub, t }: { tag?: string; title: string; sub?: string; t: ReturnType<typeof theme> }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "clamp(36px,6vw,60px)" }}>
      {tag && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 16 }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
          <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>{tag}</span>
        </div>
      )}
      <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.8rem)", fontWeight: 700, fontFamily: t.serif, letterSpacing: -0.5, marginBottom: sub ? 14 : 0, color: t.fg }}>{title}</h2>
      {sub && <p style={{ color: t.fgMuted, maxWidth: 560, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: "clamp(13px,2vw,15px)" }}>{sub}</p>}
    </div>
  );
}
