"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SERVICES } from "@/lib/data";
import { theme } from "@/lib/theme";
import type { Service } from "@/lib/data";

export default function ServicesPage() {
  const [dark, setDark] = useState(true);
  const [hov, setHov] = useState<number | null>(null);
  const t = theme(dark);
  const T = t.T;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: t.glass,
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`,
    borderRadius: 20,
    ...extra,
  });

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="services" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.08) 0%,transparent 65%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>What We Offer</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Our Consulting Services</h1>
          <p style={{ color: t.fgMuted, maxWidth: 580, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>
            From crisis intervention to strategic transformation — comprehensive solutions for East Africa&apos;s most demanding business challenges.
          </p>
        </div>
      </section>

      {/* Gold divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)", maxWidth: 800, margin: "0 auto 80px" }} />

      {/* Services grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 26 }}>
          {SERVICES.map((s: Service, i: number) => (
            <div
              key={s.slug}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                ...glass({ overflow: "hidden" }),
                transition: T,
                transform: hov === i ? "translateY(-6px)" : "translateY(0)",
                boxShadow: hov === i ? `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,168,75,0.3)` : "none",
                border: `1px solid ${hov === i ? "rgba(200,168,75,0.45)" : t.bdr}`,
              }}
            >
              <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
                <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.65)", transform: hov === i ? "scale(1.07)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.9) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "4px 12px" }}>
                  <span style={{ fontSize: 9, fontFamily: t.sans, fontWeight: 700, color: t.gold, textTransform: "uppercase" as const }}>{s.badge}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, fontSize: 26, color: t.gold }}>{s.icon}</div>
              </div>
              <div style={{ padding: "24px 24px 30px" }}>
                <h2 style={{ fontSize: 18, fontWeight: 700, fontFamily: t.serif, marginBottom: 12, color: t.fg }}>{s.title}</h2>
                <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.78, fontFamily: t.sans, marginBottom: 18 }}>{s.desc}</p>
                <a href={`/services/${s.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, textDecoration: "none", transition: T }}>
                  Learn More <span style={{ transform: hov === i ? "translateX(4px)" : "translateX(0)", transition: T }}>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", ...glass({ padding: "52px 60px", textAlign: "center" as const, background: "rgba(200,168,75,0.06)" }) }}>
          <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 16, color: t.fg }}>Not sure which service you need?</h2>
          <p style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 32, lineHeight: 1.8, fontSize: 15 }}>Book a free consultation and our crisis specialists will assess your situation and recommend the right approach.</p>
          <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 12, padding: "14px 34px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 30px rgba(200,168,75,0.4)` }}>
            Book Free Consultation →
          </a>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />

      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
