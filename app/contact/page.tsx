"use client";
import { useState, type FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { SERVICES } from "@/lib/data";
import type { Service } from "@/lib/data";

const R = "#E8303A";
interface FormState { name: string; email: string; phone: string; service: string; message: string; }

export default function ContactPage() {
  const [dark, setDark] = useState(true);
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const fg = dark ? "#E8EDF8" : "#0A1628";
  const fgM = dark ? "rgba(232,237,248,0.52)" : "rgba(10,22,40,0.52)";
  const bdr = dark ? "rgba(255,255,255,0.08)" : "rgba(10,22,40,0.09)";
  const bg = dark ? "#050D1A" : "#F0F4FF";
  const T = "all 0.35s cubic-bezier(0.4,0,0.2,1)";
  const glass = (extra: React.CSSProperties = {}): React.CSSProperties => ({ background: dark ? "rgba(255,255,255,0.055)" : "rgba(255,255,255,0.72)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: `1px solid ${bdr}`, borderRadius: 20, ...extra });
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => { e.preventDefault(); if (formData.name && formData.email) setSent(true); };
  const updateField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => { setFormData((d) => ({ ...d, [field]: e.target.value })); };
  const inputStyle: React.CSSProperties = { width: "100%", padding: "13px 18px", background: dark ? "rgba(255,255,255,0.05)" : "rgba(10,22,40,0.04)", border: `1px solid ${bdr}`, borderRadius: 12, color: fg, fontSize: 14, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" };
  const labelStyle: React.CSSProperties = { fontSize: 10, fontFamily: "sans-serif", color: fgM, letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 7, fontWeight: 700 };

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: bg, color: fg, minHeight: "100vh" }}>
      <Navbar dark={dark} setDark={setDark} activeNav="contact" scrollTo={scrollTo} />
      <section style={{ padding: "140px 24px 80px", textAlign: "center", background: dark ? "rgba(255,255,255,0.014)" : "rgba(10,22,40,0.03)" }}>
        <div style={{ color: R, fontSize: 11, fontFamily: "sans-serif", letterSpacing: 4, textTransform: "uppercase", marginBottom: 14, fontWeight: 700 }}>Contact Us</div>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 900, marginBottom: 20 }}>Facing a Crisis? Let&apos;s Talk.</h1>
        <p style={{ color: fgM, maxWidth: 560, margin: "0 auto", fontFamily: "sans-serif", lineHeight: 1.8 }}>For urgent situations call us directly on <strong>+254 712 770 999</strong>. For consultations fill the form below.</p>
      </section>
      <section style={{ padding: "80px 24px 120px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          <div style={{ ...glass({ padding: 44 }) }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <div style={{ fontSize: 60, marginBottom: 20 }}>✅</div>
                <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 10 }}>Message Received</div>
                <div style={{ color: fgM, fontFamily: "sans-serif", marginBottom: 28 }}>Our team will contact you within 2 hours for urgent matters.</div>
                <button onClick={() => setSent(false)} style={{ background: "transparent", border: `1px solid ${R}`, color: R, borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: "sans-serif" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, color: R }}>Schedule a Fiasco Audit</h2>
                <div><label style={labelStyle}>Full Name</label><input type="text" placeholder="Your full name" value={formData.name} onChange={updateField("name")} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Email Address</label><input type="email" placeholder="your@company.co.ke" value={formData.email} onChange={updateField("email")} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Phone Number</label><input type="tel" placeholder="+254 7XX XXX XXX" value={formData.phone} onChange={updateField("phone")} style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>Service</label>
                  <select value={formData.service} onChange={updateField("service")} style={{ ...inputStyle, background: dark ? "rgba(5,13,26,0.95)" : "rgba(240,244,255,0.95)" }}>
                    <option value="">Select a service...</option>
                    {SERVICES.map((s: Service) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Describe Your Situation</label><textarea placeholder="Tell us about the challenge or crisis you're facing..." value={formData.message} onChange={updateField("message")} rows={5} style={{ ...inputStyle, resize: "vertical" }} /></div>
                <button type="submit" style={{ background: `linear-gradient(135deg,${R},#8B1520)`, color: "#fff", border: "none", borderRadius: 14, padding: "16px", fontSize: 16, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 900, boxShadow: `0 8px 30px ${R}44`, transition: T }}>Request Fiasco Audit →</button>
              </form>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${bdr}`, flex: 1, minHeight: 320 }}>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15954.977044879952!2d36.81193!3d-1.28333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22ba7f3c3%3A0xf0d3e18af58c2e4!2sNairobi%20CBD%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske" width="100%" height="100%" style={{ border: 0, display: "block", minHeight: 320 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Fiasco Location" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {([{ icon: "📍", l: "Head Office", v: "Standard Str, Standard Bld, Nairobi" }, { icon: "🏢", l: "Branch Office", v: "Likoni Rd, Joakim Est, Nairobi" }, { icon: "📞", l: "Emergency Line", v: "+254 712 770 999" }, { icon: "🕐", l: "Hours", v: "Mon–Sat, 8:00 AM – 5:00 PM" }] as { icon: string; l: string; v: string }[]).map((c, i) => (
                <div key={i} style={{ ...glass({ padding: "18px 20px" }) }}>
                  <div style={{ fontSize: 20, marginBottom: 7 }}>{c.icon}</div>
                  <div style={{ fontSize: 9, fontFamily: "sans-serif", color: R, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 5, fontWeight: 700 }}>{c.l}</div>
                  <div style={{ fontSize: 12, fontFamily: "sans-serif", fontWeight: 600, lineHeight: 1.4 }}>{c.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer scrollTo={scrollTo} />
      <Chatbot dark={dark} />
    </div>
  );
}
