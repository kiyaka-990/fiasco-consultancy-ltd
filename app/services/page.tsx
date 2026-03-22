"use client";
import { useState } from "react";
import Image from "next/image";
import PageShell, { PageHero, Section, SH, glassCard } from "@/components/PageShell";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";

export default function ServicesPage() {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <PageShell activeNav="services">
      {(t, dark) => (
        <>
          <PageHero tag="What We Offer" title="Our Consulting Services" sub="From crisis intervention to strategic transformation — comprehensive solutions for East Africa's most demanding business challenges." t={t} />

          <div className="gold-divider" />

          <Section>
            <div className="grid-auto">
              {SERVICES.map((s: Service, i: number) => (
                <div
                  key={s.slug}
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(null)}
                  style={{
                    ...glassCard(t, { overflow: "hidden" }),
                    transition: t.T,
                    transform: hov === i ? "translateY(-5px)" : "translateY(0)",
                    boxShadow: hov === i ? `0 20px 50px rgba(0,0,0,0.35),0 0 0 1px rgba(200,168,75,0.3)` : "none",
                    border: `1px solid ${hov === i ? "rgba(200,168,75,0.45)" : t.bdr}`,
                  }}
                >
                  <div style={{ height: 180, overflow: "hidden", position: "relative" }}>
                    <Image src={s.img} alt={s.title} fill sizes="(max-width:600px) 100vw,50vw" style={{ objectFit: "cover", filter: "brightness(0.65)", transform: hov === i ? "scale(1.07)" : "scale(1)", transition: t.T }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(8,12,20,0.9) 0%,transparent 60%)" }} />
                    <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(200,168,75,0.15)", border: "1px solid rgba(200,168,75,0.4)", borderRadius: 100, padding: "3px 10px" }}>
                      <span style={{ fontSize: 9, fontFamily: t.sans, fontWeight: 700, color: t.gold, textTransform: "uppercase" as const }}>{s.badge}</span>
                    </div>
                    <div style={{ position: "absolute", bottom: 12, left: 16, fontSize: 22, color: t.gold }}>{s.icon}</div>
                  </div>
                  <div style={{ padding: "20px 20px 24px" }}>
                    <h2 style={{ fontSize: "clamp(15px,2vw,17px)", fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.fg }}>{s.title}</h2>
                    <p style={{ fontSize: 13, color: t.fgMuted, lineHeight: 1.75, fontFamily: t.sans, marginBottom: 16 }}>{s.desc}</p>
                    <a href={`/services/${s.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, color: t.gold, fontSize: 13, fontFamily: t.sans, fontWeight: 700, textDecoration: "none" }}>Learn More →</a>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <Section style={{ paddingTop: 0 }}>
            <div style={{ ...glassCard(t, { padding: "clamp(28px,5vw,52px) clamp(20px,5vw,60px)", textAlign: "center", background: "rgba(200,168,75,0.05)" }) }}>
              <h2 style={{ fontSize: "clamp(1.3rem,3vw,2.2rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 14, color: t.fg }}>Not sure which service you need?</h2>
              <p style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 28, lineHeight: 1.8, fontSize: "clamp(13px,2vw,15px)" }}>Book a free consultation and our specialists will recommend the right approach.</p>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 12, padding: "13px 28px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 30px rgba(200,168,75,0.4)` }}>Book Free Consultation →</a>
            </div>
          </Section>
        </>
      )}
    </PageShell>
  );
}
