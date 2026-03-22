"use client";
import Image from "next/image";
import PageShell, { PageHero, Section, SH, glassCard } from "@/components/PageShell";
import TeamCard from "@/components/TeamCard";
import { TEAM, PROCESS, IMG } from "@/lib/data";
import type { TeamMember, ProcessStep } from "@/lib/data";

const MILESTONES = [
  { year: "2008", t: "Founded in Nairobi", d: "Fiasco Consultancy established with a mission to transform business crises into strategic opportunities across East Africa." },
  { year: "2012", t: "Regional Expansion", d: "Extended operations to Uganda, Tanzania, and Rwanda — becoming a true East African consulting firm." },
  { year: "2016", t: "100th Crisis Resolved", d: "Celebrated 100 successful crisis interventions, maintaining a 98% recovery rate throughout." },
  { year: "2020", t: "Digital Practice Launch", d: "Launched our Digital Transformation and Data Analytics service lines to meet the new economy." },
  { year: "2024", t: "300+ Engagements", d: "Surpassed 300 completed engagements across 50+ corporate clients throughout East Africa." },
];

export default function AboutPage() {
  return (
    <PageShell activeNav="about">
      {(t, dark) => (
        <>
          {/* Hero with bg image */}
          <section style={{ position: "relative", minHeight: 400, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "clamp(90px,12vw,140px) 20px 60px", overflow: "hidden" }}>
            <Image src={IMG.hero1} alt="" fill sizes="100vw" style={{ objectFit: "cover", filter: "brightness(0.2)" }} priority />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(8,12,20,0.95) 0%,rgba(139,105,20,0.18) 100%)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(200,168,75,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,168,75,0.04) 1px,transparent 1px)`, backgroundSize: "60px 60px" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 18 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
                <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Our Story</span>
              </div>
              <h1 style={{ fontSize: "clamp(1.7rem,5vw,3.6rem)", fontWeight: 900, fontFamily: t.serif, color: "#fff", lineHeight: 1.15, letterSpacing: -0.5, marginBottom: 18 }}>When Failure Is Not An Option, We Step In</h1>
              <p style={{ fontSize: "clamp(13px,2vw,16px)", color: "rgba(240,232,208,0.7)", fontFamily: t.sans, lineHeight: 1.8 }}>Founded in Nairobi in 2008, Fiasco Consultancy has spent over 15 years turning East Africa&apos;s most complex crises into lasting competitive advantages.</p>
            </div>
          </section>

          {/* Mission cards */}
          <Section>
            <div className="grid-2">
              {[
                { icon: "🎯", title: "Our Mission", body: "To transform crises into triumphs — providing immediate, decisive action that stabilizes emergencies and implements long-term strategies for organizational resilience across East Africa." },
                { icon: "🔭", title: "Our Vision", body: "To be the most trusted crisis management and strategic consulting firm in Sub-Saharan Africa, known for decisive intervention, measurable results, and unwavering integrity." },
                { icon: "💎", title: "Our Values", body: "Decisiveness, transparency, accountability, and excellence. We treat every engagement as if our own reputation is on the line — because it is." },
                { icon: "🌍", title: "Our Region", body: "Headquartered in Karen, Nairobi with reach across Kenya, Uganda, Tanzania, Rwanda, Ethiopia and South Sudan. We understand East African business from the inside." },
              ].map((c, i) => (
                <div key={i} style={{ ...glassCard(t, { padding: "clamp(22px,4vw,36px)" }) }}>
                  <div style={{ fontSize: 32, marginBottom: 14 }}>{c.icon}</div>
                  <h3 style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, fontFamily: t.serif, marginBottom: 10, color: t.gold }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.85 }}>{c.body}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* Stats strip */}
          <Section style={{ paddingTop: 0 }}>
            <div style={{ ...glassCard(t, { padding: "clamp(20px,4vw,32px)" }), display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 16, textAlign: "center" }}>
              {[{ v: "15+", l: "Years" }, { v: "300+", l: "Crises Resolved" }, { v: "98%", l: "Recovery Rate" }, { v: "50+", l: "Clients" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, color: t.gold, fontFamily: t.sans }}>{s.v}</div>
                  <div style={{ fontSize: 10, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 1.5, textTransform: "uppercase" as const, marginTop: 4 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* Process */}
          <Section style={{ background: dark ? "rgba(200,168,75,0.02)" : "rgba(200,168,75,0.04)" }}>
            <SH tag="How We Work" title="The Fiasco 4-Stage Methodology" t={t} />
            <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 860, margin: "0 auto" }}>
              {PROCESS.map((p: ProcessStep, i: number) => (
                <div key={i} style={{ ...glassCard(t, { padding: "clamp(16px,3vw,24px) clamp(18px,3vw,28px)" }), display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <div style={{ fontSize: "clamp(22px,3vw,36px)", fontWeight: 800, color: "rgba(200,168,75,0.2)", flexShrink: 0, fontFamily: t.sans, minWidth: 44, lineHeight: 1 }}>{p.n}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "clamp(13px,2vw,15px)", marginBottom: 5, color: t.gold, fontFamily: t.sans }}>{p.t}</div>
                    <div style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{p.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Timeline */}
          <Section>
            <SH tag="Our History" title="Milestones" t={t} />
            <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column" }}>
              {MILESTONES.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: "clamp(16px,3vw,28px)", paddingBottom: 28 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#1A1000", fontWeight: 800, fontSize: 11, fontFamily: t.sans, boxShadow: `0 4px 16px rgba(200,168,75,0.4)`, flexShrink: 0 }}>{m.year}</div>
                    {i < MILESTONES.length - 1 && <div style={{ width: 2, flex: 1, minHeight: 24, background: `linear-gradient(to bottom,rgba(200,168,75,0.4),transparent)`, marginTop: 6 }} />}
                  </div>
                  <div style={{ ...glassCard(t, { padding: "clamp(14px,3vw,20px) clamp(16px,3vw,24px)" }), marginTop: 4, flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: "clamp(14px,2vw,16px)", marginBottom: 5, fontFamily: t.sans, color: t.fg }}>{m.t}</div>
                    <div style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{m.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* Team preview */}
          <Section style={{ paddingTop: 0 }}>
            <SH tag="Leadership" title="The Crisis Team" t={t} />
            <div className="grid-4">
              {TEAM.map((m: TeamMember, i: number) => <TeamCard key={i} member={m} dark={dark} size="sm" />)}
            </div>
            <div style={{ textAlign: "center", marginTop: 36 }}>
              <a href="/team" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 12, padding: "13px 30px", fontSize: 14, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 28px rgba(200,168,75,0.4)` }}>Meet the Full Team →</a>
            </div>
          </Section>
        </>
      )}
    </PageShell>
  );
}
