"use client";
import PageShell, { PageHero, Section, SH, glassCard } from "@/components/PageShell";
import TeamCard from "@/components/TeamCard";
import type { TeamMemberData } from "@/components/TeamCard";

const FULL_TEAM: TeamMemberData[] = [
  { name: "Amelia Wangui", role: "Head of Crisis Response", spec: "Rapid Intervention & Stabilization", initials: "AW", palette: 0, icon: "crisis", bio: "15+ years in crisis management. Leads all emergency deployments across Kenya, Uganda and Tanzania. Certified in organizational resilience and risk management." },
  { name: "Steve Nyagah", role: "Senior Turnaround Strategist", spec: "Project Recovery & Execution", initials: "SN", palette: 1, icon: "strategy", bio: "Rescued 80+ failing projects across East Africa. Former PMP-certified project director with deep experience in infrastructure, tech, and FMCG sectors." },
  { name: "Grace Elizabeth", role: "Forensic Audit Specialist", spec: "Investigation & Compliance", initials: "GE", palette: 2, icon: "forensic", bio: "Court-qualified expert witness and certified fraud examiner. Has led forensic investigations totaling over KES 2B in recovered or secured assets." },
  { name: "Michael Wainaina", role: "Reputation & Comms Lead", spec: "Media Defense & PR Strategy", initials: "MW", palette: 3, icon: "comms", bio: "Former journalist turned crisis communications expert. Has managed media fallout for 30+ organizations including listed companies and NGOs." },
  { name: "Diana Ochieng", role: "Digital Transformation Lead", spec: "Cloud, ERP & Automation", initials: "DO", palette: 4, icon: "digital", bio: "Delivered 40+ digital transformation projects across East African enterprises. Expert in Microsoft Azure, SAP, and custom enterprise solutions." },
  { name: "James Kimani", role: "Senior HR Strategy Consultant", spec: "Workforce Planning & OD", initials: "JK", palette: 5, icon: "hr", bio: "Certified HR professional with deep expertise in Kenyan labour law, compensation design, and organizational development for high-growth firms." },
  { name: "Fatuma Hassan", role: "Data Analytics Director", spec: "BI, Predictive Modelling & Insights", initials: "FH", palette: 6, icon: "data", bio: "Former data scientist at a Big 4 firm. Builds custom analytics frameworks and dashboards that turn complex data into clear strategic decisions." },
  { name: "Patrick Otieno", role: "Operational Excellence Manager", spec: "Lean, Six Sigma & Process Design", initials: "PO", palette: 7, icon: "ops", bio: "Lean Six Sigma Black Belt. Has redesigned operations for manufacturers, retailers and logistics firms, achieving an average 28% cost reduction." },
];

export default function TeamPage() {
  return (
    <PageShell activeNav="team">
      {(t, dark) => (
        <>
          <PageHero tag="Our People" title="Meet the Crisis Team" sub="East Africa's most experienced crisis management and strategic consulting professionals — ready to deploy within hours." t={t} />
          <div className="gold-divider" />

          <Section>
            <div className="grid-auto-sm">
              {FULL_TEAM.map((m, i) => <TeamCard key={i} member={m} dark={dark} size="lg" />)}
            </div>
          </Section>

          {/* Values */}
          <Section style={{ paddingTop: 0 }}>
            <div className="grid-4">
              {[
                { icon: "⚡", title: "Rapid Deployment", desc: "Our teams are on-site within hours, not weeks." },
                { icon: "🔒", title: "Full Confidentiality", desc: "Every engagement is handled with absolute discretion." },
                { icon: "📊", title: "Data-Driven", desc: "Every decision backed by forensic evidence and analysis." },
                { icon: "🌍", title: "Regional Expertise", desc: "Deep understanding of East African business landscape." },
              ].map((v, i) => (
                <div key={i} style={{ ...glassCard(t, { padding: "clamp(20px,3vw,28px) clamp(16px,2vw,24px)", textAlign: "center" as const }) }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{v.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "clamp(13px,2vw,15px)", fontFamily: t.serif, marginBottom: 8, color: t.gold }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7 }}>{v.desc}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <Section style={{ paddingTop: 0 }}>
            <div style={{ maxWidth: 800, margin: "0 auto", ...glassCard(t, { padding: "clamp(28px,5vw,52px) clamp(20px,5vw,60px)", textAlign: "center" as const, background: "rgba(200,168,75,0.05)" }) }}>
              <h2 style={{ fontSize: "clamp(1.3rem,3vw,2.2rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 14, color: t.fg }}>Work With Our Team</h2>
              <p style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 28, lineHeight: 1.8, fontSize: "clamp(13px,2vw,15px)" }}>Facing a crisis? Our specialists are on standby for an immediate, confidential assessment.</p>
              <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 14, padding: "14px 32px", fontSize: 15, fontFamily: t.sans, fontWeight: 800, boxShadow: `0 8px 28px rgba(200,168,75,0.4)` }}>Book a Consultation →</a>
            </div>
          </Section>
        </>
      )}
    </PageShell>
  );
}
