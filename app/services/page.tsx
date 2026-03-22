"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";

const R = "#E8303A";

export default function ServicesPage() {
  const [dark, setDark] = useState(true);
  const [hov, setHov] = useState<number | null>(null);

  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="services" scrollTo={scrollTo} />
      <section style={{ padding: "140px 24px 80px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>What We Offer</div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: 20 }}>Our Consulting Services</h1>
        <p style={{ color: fgM, maxWidth: 620, margin: "0 auto", fontFamily: "sans-serif", lineHeight: 1.8 }}>From crisis intervention to strategic transformation — comprehensive solutions for East Africa&apos;s most demanding business challenges.</p>
      </section>
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))", gap: 28 }}>
          {SERVICES.map((s: Service, i: number) => (
            <div key={s.slug} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${hov === i ? s.color + "45" : bdr}`, borderRadius: 20, overflow: "hidden", transition: T, transform: hov === i ? "translateY(-6px)" : "translateY(0)", boxShadow: hov === i ? `0 24px 60px rgba(0,0,0,0.3)` : "none" }}>
              <div style={{ height: 200, overflow: "hidden", position: "relative" }}>
                <Image src={s.img} alt={s.title} fill sizes="(max-width:768px) 100vw,33vw" style={{ objectFit: "cover", filter: "brightness(0.7)", transform: hov === i ? "scale(1.07)" : "scale(1)", transition: T }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,13,26,0.85) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", top: 14, right: 14, background: `${s.color}20`, border: `1px solid ${s.color}55`, borderRadius: 100, padding: "4px 12px" }}>
                  <span style={{ fontSize: 9, fontFamily: "sans-serif", fontWeight: 800, color: s.color, textTransform: "uppercase" }}>{s.badge}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, fontSize: 28, color: s.color }}>{s.icon}</div>
              </div>
              <div style={{ padding: "24px 24px 28px" }}>
                <h2 style={{ fontSize: 19, fontWeight: 800, marginBottom: 12 }}>{s.title}</h2>
                <p style={{ fontSize: 14, color: fgM, lineHeight: 1.75, fontFamily: "sans-serif", marginBottom: 20 }}>{s.desc}</p>
                <a href={`/services/${s.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: s.color, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, textDecoration: "none" }}>Learn More →</a>
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
