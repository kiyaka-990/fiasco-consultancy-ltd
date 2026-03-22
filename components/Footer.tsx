"use client";
import Image from "next/image";
import { SERVICES, BLOGS } from "@/lib/data";
import { theme } from "@/lib/theme";
import type { BlogPost, Service } from "@/lib/data";

const COMPANY_LINKS = ["About Us", "Our Team", "Projects", "Blog", "Contact", "Get a Quote"];

// Footer text colours — always dark-bg regardless of page theme
// so text is always readable in both light and dark modes
const F_BG = "#050810";
const F_FG = "rgba(240,232,208,0.90)";       // primary text
const F_MUTED = "rgba(240,232,208,0.48)";    // secondary text
const F_GOLD = "#C8A84B";
const F_GOLD_DARK = "#8B6914";
const F_BDR = "rgba(200,168,75,0.18)";

export interface FooterProps {
  scrollTo?: (id: string) => void;
  dark?: boolean;
}

export default function Footer({ scrollTo = () => {}, dark = true }: FooterProps) {
  const t = theme(dark);

  return (
    <footer style={{
      background: F_BG,
      color: F_MUTED,
      padding: "88px 32px 36px",
      borderTop: `1px solid ${F_BDR}`,
      fontFamily: t.sans,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2.2fr 1fr 1fr 1.6fr", gap: 60, marginBottom: 64 }}>

          {/* Brand column */}
          <div>
            <div style={{ position: "relative", width: 180, height: 52, marginBottom: 22 }}>
              <Image src="/logo.png" alt="Fiasco Consultancy" fill sizes="180px" style={{ objectFit: "contain", objectPosition: "left" }} />
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.9, maxWidth: 300, color: F_MUTED, marginBottom: 24 }}>
              Partnering with businesses to navigate complex market challenges. Delivering decisive crisis resolution and strategic insights across East Africa.
            </p>
            {/* Newsletter — FIX: replace border shorthand + borderRight with explicit side properties */}
            <div style={{ display: "flex", maxWidth: 300 }}>
              <input
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: "11px 16px",
                  background: "rgba(200,168,75,0.06)",
                  borderTop: `1px solid ${F_BDR}`,
                  borderBottom: `1px solid ${F_BDR}`,
                  borderLeft: `1px solid ${F_BDR}`,
                  borderRight: "none",
                  borderRadius: "10px 0 0 10px",
                  color: F_FG,
                  fontSize: 13,
                  fontFamily: t.sans,
                  outline: "none",
                }}
              />
              <button style={{ background: `linear-gradient(135deg,${F_GOLD},${F_GOLD_DARK})`, color: "#1A1000", border: "none", borderRadius: "0 10px 10px 0", padding: "0 18px", cursor: "pointer", fontSize: 14, fontFamily: t.sans, fontWeight: 800 }}>→</button>
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ color: F_GOLD, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>Services</div>
            {SERVICES.slice(0, 6).map((s: Service) => (
              <a
                key={s.title}
                href="/services"
                style={{ display: "block", fontSize: 13, color: F_MUTED, marginBottom: 10, cursor: "pointer", textDecoration: "none", lineHeight: 1.4, transition: t.T }}
                onMouseEnter={(e) => (e.currentTarget.style.color = F_GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = F_MUTED)}
              >{s.title}</a>
            ))}
          </div>

          {/* Company */}
          <div>
            <div style={{ color: F_GOLD, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>Company</div>
            {COMPANY_LINKS.map((s: string) => (
              <a
                key={s}
                href="#"
                style={{ display: "block", fontSize: 13, color: F_MUTED, marginBottom: 10, cursor: "pointer", textDecoration: "none", transition: t.T }}
                onMouseEnter={(e) => (e.currentTarget.style.color = F_GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = F_MUTED)}
              >{s}</a>
            ))}
          </div>

          {/* Recent Posts */}
          <div>
            <div style={{ color: F_GOLD, fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 20, fontWeight: 700 }}>Recent Posts</div>
            {BLOGS.map((b: BlogPost) => (
              <div key={b.title} style={{ display: "flex", gap: 12, marginBottom: 18, cursor: "pointer" }}>
                <div style={{ width: 52, height: 52, borderRadius: 8, overflow: "hidden", flexShrink: 0, position: "relative", border: `1px solid ${F_BDR}` }}>
                  <Image src={b.img} alt={b.title} fill sizes="52px" style={{ objectFit: "cover" }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: F_GOLD, marginBottom: 4, fontWeight: 600 }}>{b.date}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.45, color: F_MUTED }}>{b.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold divider line */}
        <div style={{ height: 1, background: `linear-gradient(90deg,transparent,rgba(200,168,75,0.4),transparent)`, marginBottom: 28 }} />

        {/* Bottom bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ fontSize: 12, color: F_MUTED }}>© 2026 Fiasco Consultancy Ltd — All Rights Reserved</div>
          <div style={{ display: "flex", gap: 20, fontSize: 12 }}>
            <span style={{ color: F_GOLD, fontWeight: 700 }}>+254 712 770 999</span>
            <span style={{ color: F_MUTED }}>info@fiascoconsultancy.co.ke</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
