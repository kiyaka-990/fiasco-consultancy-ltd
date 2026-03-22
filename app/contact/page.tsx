"use client";
import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SERVICES } from "@/lib/data";
import { theme } from "@/lib/theme";
import type { Service } from "@/lib/data";

interface FormState { name: string; email: string; phone: string; service: string; message: string; }

export default function ContactPage() {
  const [dark, setDark] = useState(true);
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const t = theme(dark);
  const T = t.T;
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({
    background: t.glass, backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)",
    border: `1px solid ${t.bdr}`, borderRadius: 20, ...extra,
  });

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 18px",
    background: dark ? "rgba(200,168,75,0.05)" : "rgba(26,16,0,0.04)",
    border: `1px solid ${t.bdr}`, borderRadius: 12,
    color: t.fg, fontSize: 14, fontFamily: t.sans, outline: "none", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 10, fontFamily: t.sans, color: t.fgMuted,
    letterSpacing: 1.5, textTransform: "uppercase" as const,
    display: "block", marginBottom: 7, fontWeight: 700,
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formData.name && formData.email) setSent(true);
  };
  const updateField = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
      setFormData((d) => ({ ...d, [field]: e.target.value }));
    };

  return (
    <div style={{ fontFamily: t.sans, background: t.bg, color: t.fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="contact" scrollTo={scrollTo} />

      {/* Hero */}
      <section style={{ padding: "140px 24px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 50% 0%,rgba(200,168,75,0.08) 0%,transparent 65%)` }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(200,168,75,0.1)", border: "1px solid rgba(200,168,75,0.25)", borderRadius: 100, padding: "5px 18px", marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: t.gold, display: "inline-block" }} />
            <span style={{ color: t.gold, fontSize: 10, fontFamily: t.sans, letterSpacing: 3, textTransform: "uppercase" as const, fontWeight: 700 }}>Get In Touch</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3.6rem)", fontWeight: 700, fontFamily: t.serif, marginBottom: 20, color: t.fg, letterSpacing: -0.5 }}>Facing a Crisis? Let&apos;s Talk.</h1>
          <p style={{ color: t.fgMuted, maxWidth: 540, margin: "0 auto", fontFamily: t.sans, lineHeight: 1.8, fontSize: 15 }}>For urgent situations, call us directly on <strong style={{ color: t.gold }}>+254 712 770 999</strong>. For consultations, fill the form below.</p>
        </div>
      </section>

      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)", maxWidth: 800, margin: "0 auto 80px" }} />

      {/* Contact grid */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>

          {/* Form */}
          <div style={{ ...glass({ padding: 44 }) }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
                <div style={{ fontWeight: 700, fontFamily: t.serif, fontSize: 22, marginBottom: 10, color: t.fg }}>Message Received</div>
                <div style={{ color: t.fgMuted, fontFamily: t.sans, marginBottom: 28, fontSize: 14 }}>Our team will contact you within 2 hours for urgent matters.</div>
                <button onClick={() => setSent(false)} style={{ background: "transparent", border: `1px solid ${t.bdr}`, color: t.gold, borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: t.sans, fontSize: 14 }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 700, fontFamily: t.serif, marginBottom: 8, color: t.gold }}>Schedule a Fiasco Audit</h2>
                <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, marginBottom: 8, lineHeight: 1.6 }}>All initial consultations are 100% confidential and free of charge.</p>

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
                  <textarea placeholder="Tell us about the challenge or crisis you're facing..." value={formData.message} onChange={updateField("message")} rows={5} style={{ ...inputStyle, resize: "vertical" }} />
                </div>
                <button type="submit" style={{ background: `linear-gradient(135deg,${t.gold},${t.goldDark})`, color: "#1A1000", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, cursor: "pointer", fontFamily: t.sans, fontWeight: 900, boxShadow: `0 8px 30px rgba(200,168,75,0.4)`, transition: T }}>
                  Request Fiasco Audit →
                </button>
              </form>
            )}
          </div>

          {/* Map + Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${t.bdr}`, flex: 1, minHeight: 320 }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.977044879952!2d36.81193!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba7f3c3%3A0xf0d3e18af58c2e4!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
                width="100%" height="100%" style={{ border: 0, display: "block", minHeight: 320 }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fiasco Location"
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {([
                { icon: "📍", l: "Head Office", v: "Standard Str, Standard Bld, Nairobi" },
                { icon: "🏢", l: "Branch Office", v: "Likoni Rd, Joakim Est, Nairobi" },
                { icon: "📞", l: "Emergency Line", v: "+254 712 770 999" },
                { icon: "🕐", l: "Hours", v: "Mon–Sat, 8:00 AM – 5:00 PM" },
              ] as { icon: string; l: string; v: string }[]).map((c, i) => (
                <div key={i} style={{ ...glass({ padding: "18px 20px" }) }}>
                  <div style={{ fontSize: 20, marginBottom: 7 }}>{c.icon}</div>
                  <div style={{ fontSize: 9, fontFamily: t.sans, color: t.gold, letterSpacing: 1.5, textTransform: "uppercase" as const, marginBottom: 5, fontWeight: 700 }}>{c.l}</div>
                  <div style={{ fontSize: 12, fontFamily: t.sans, fontWeight: 600, lineHeight: 1.4, color: t.fg }}>{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer scrollTo={scrollTo} dark={dark} />
      <Chatbot dark={dark} />
      <style>{`*{box-sizing:border-box;margin:0;padding:0;}::selection{background:rgba(200,168,75,0.3);}::-webkit-scrollbar{width:5px;}::-webkit-scrollbar-thumb{background:rgba(200,168,75,0.4);border-radius:100px;}`}</style>
    </div>
  );
}
