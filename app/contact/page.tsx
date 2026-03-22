"use client";
import { useState, type FormEvent } from "react";
import PageShell, { PageHero, Section, glassCard } from "@/components/PageShell";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";

interface FormState { name: string; email: string; phone: string; service: string; message: string; }

export default function ContactPage() {
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>, t: ReturnType<typeof import("@/lib/theme").theme>): void => {
    e.preventDefault();
    if (formData.name && formData.email) setSent(true);
  };

  const updateField = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
      setFormData((d) => ({ ...d, [field]: e.target.value }));
    };

  return (
    <PageShell activeNav="contact">
      {(t, dark) => {
        const inputStyle: React.CSSProperties = {
          width: "100%", padding: "12px 16px",
          background: dark ? "rgba(200,168,75,0.05)" : "rgba(26,16,0,0.04)",
          border: `1px solid ${t.bdr}`, borderRadius: 12,
          color: t.fg, fontSize: 14, fontFamily: t.sans, outline: "none", boxSizing: "border-box",
        };
        const labelStyle: React.CSSProperties = {
          fontSize: 10, fontFamily: t.sans, color: t.fgMuted,
          letterSpacing: 1.5, textTransform: "uppercase" as const,
          display: "block", marginBottom: 7, fontWeight: 700,
        };

        return (
          <>
            <PageHero tag="Get In Touch" title="Facing a Crisis? Let's Talk." sub="For urgent situations, call us directly on +254 712 770 999. For consultations, fill the form below." t={t} />
            <div className="gold-divider" />

            <Section style={{ paddingTop: 0 }}>
              {/* Responsive: stacks to 1 col on mobile */}
              <div className="grid-2" style={{ alignItems: "start" }}>

                {/* Form */}
                <div style={{ ...glassCard(t, { padding: "clamp(24px,4vw,44px)" }) }}>
                  {sent ? (
                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                      <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                      <div style={{ fontWeight: 700, fontFamily: t.serif, fontSize: 20, marginBottom: 10, color: t.fg }}>Message Received</div>
                      <div style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 24, fontSize: 13 }}>Our team will contact you within 2 hours for urgent matters.</div>
                      <button onClick={() => setSent(false)} style={{ background: "transparent", border: `1px solid ${t.bdr}`, color: t.gold, borderRadius: 10, padding: "10px 22px", cursor: "pointer", fontFamily: t.sans, fontSize: 13 }}>Send Another</button>
                    </div>
                  ) : (
                    <form onSubmit={(e) => handleSubmit(e, t)} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <h2 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 700, fontFamily: t.serif, marginBottom: 4, color: t.gold }}>Schedule a Fiasco Audit</h2>
                      <p style={{ fontSize: 12, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.6, marginBottom: 4 }}>All initial consultations are 100% confidential and free.</p>
                      <div>
                        <label style={labelStyle}>Full Name</label>
                        <input type="text" placeholder="Your full name" value={formData.name} onChange={updateField("name")} required style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email Address</label>
                        <input type="email" placeholder="your@company.co.ke" value={formData.email} onChange={updateField("email")} required style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Phone Number</label>
                        <input type="tel" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={updateField("phone")} style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Service Interest</label>
                        <select value={formData.service} onChange={updateField("service")} style={{ ...inputStyle, background: dark ? "rgba(8,12,20,0.95)" : "rgba(245,240,232,0.95)" }}>
                          <option value="">Select a service...</option>
                          {SERVICES.map((s: Service) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Describe Your Situation</label>
                        <textarea placeholder="Tell us about the challenge or crisis you're facing..." value={formData.message} onChange={updateField("message")} rows={4} style={{ ...inputStyle, resize: "vertical" }} />
                      </div>
                      <button type="submit" style={{ background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", border: "none", borderRadius: 14, padding: "14px", fontSize: 15, cursor: "pointer", fontFamily: t.sans, fontWeight: 900, boxShadow: `0 8px 28px rgba(200,168,75,0.4)`, transition: t.T }}>
                        Request Fiasco Audit →
                      </button>
                    </form>
                  )}
                </div>

                {/* Map + info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Google Maps — Karen, Nairobi */}
                  <div style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${t.bdr}`, height: "clamp(240px,40vw,340px)" }}>
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8166509!2d36.7126!3d-1.3192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1b9a1b1b1b1b%3A0x1!2sNyumba+Moja+Rd%2C+Karen%2C+Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                      width="100%" height="100%"
                      style={{ border: 0, display: "block" }}
                      allowFullScreen loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Fiasco Consultancy — Karen, Nairobi"
                    />
                  </div>

                  {/* Contact info cards — 2×2 grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {([
                      { icon: "📍", l: "Physical Address", v: "Nyumba Moja Rd, Karen, Nairobi" },
                      { icon: "📮", l: "Postal Address", v: "P.O. Box 5060-00100, Nairobi" },
                      { icon: "📞", l: "Phone", v: "+254 712 770 999" },
                      { icon: "🕐", l: "Hours", v: "Mon–Sat, 8:00 AM – 5:00 PM" },
                    ] as { icon: string; l: string; v: string }[]).map((c, i) => (
                      <div key={i} style={{ ...glassCard(t, { padding: "16px 18px" }) }}>
                        <div style={{ fontSize: 18, marginBottom: 6 }}>{c.icon}</div>
                        <div style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 4, fontWeight: 700 }}>{c.l}</div>
                        <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 600, lineHeight: 1.4, color: t.fg }}>{c.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Emergency CTA */}
                  <a href="tel:+254712770999" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", textDecoration: "none", borderRadius: 14, padding: "16px", fontSize: 15, fontFamily: t.sans, fontWeight: 900, boxShadow: `0 8px 28px rgba(200,168,75,0.4)`, textAlign: "center" as const }}>
                    📞 Call Emergency Line
                  </a>
                </div>
              </div>
            </Section>
          </>
        );
      }}
    </PageShell>
  );
}
