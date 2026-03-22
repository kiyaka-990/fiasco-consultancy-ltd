"use client";
import { useState } from "react";
import { theme } from "@/lib/theme";

export interface TeamMemberData {
  name: string;
  role: string;
  spec: string;
  initials: string;
  // gradient index 0-7 picks one of 8 unique colour schemes
  palette: number;
  // icon SVG path or emoji representing their specialty
  icon: string;
  bio?: string;
}

// 8 unique gradient palettes — all premium, none red
const PALETTES = [
  // 0 — deep teal → gold
  { from: "#0D3B38", to: "#1A5C56", accent: "#C8A84B", orb: "#C8A84B", shape: "#1E6E68" },
  // 1 — midnight blue → gold
  { from: "#0D1B3E", to: "#1A2F6B", accent: "#C8A84B", orb: "#7B9EE0", shape: "#1F3880" },
  // 2 — deep forest → gold
  { from: "#0D2B1E", to: "#1A4B30", accent: "#C8A84B", orb: "#5FBF8A", shape: "#1E5234" },
  // 3 — dark plum → gold
  { from: "#1E0D3B", to: "#371A6B", accent: "#C8A84B", orb: "#A07BD4", shape: "#3D1E7A" },
  // 4 — charcoal bronze
  { from: "#1A1206", to: "#2E2010", accent: "#E8C97A", orb: "#C8A84B", shape: "#352514" },
  // 5 — dark slate → gold
  { from: "#0D1A2E", to: "#162840", accent: "#C8A84B", orb: "#4A90C4", shape: "#1A3050" },
  // 6 — dark copper
  { from: "#2E1506", to: "#4A2410", accent: "#E8A43A", orb: "#D4844A", shape: "#521E0A" },
  // 7 — obsidian teal
  { from: "#060D1A", to: "#0D2030", accent: "#C8A84B", orb: "#3ABFCF", shape: "#0E2840" },
];

// Specialty icons as clean SVG paths (viewBox 0 0 24 24)
const ICONS: Record<string, string> = {
  crisis: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  strategy: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  forensic: "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18",
  comms: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  digital: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2zM9 9h6v6H9V9z",
  hr: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7.5-6a3.5 3.5 0 0 1 0 7M23 21v-2a3.5 3.5 0 0 0-2.6-3.4",
  data: "M18 20V10M12 20V4M6 20v-6",
  ops: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 6v4l3 3",
};

interface Props {
  member: TeamMemberData;
  dark: boolean;
  size?: "sm" | "lg";
}

export default function TeamCard({ member, dark, size = "sm" }: Props) {
  const [hov, setHov] = useState(false);
  const t = theme(dark);
  const T = t.T;
  const p = PALETTES[member.palette % PALETTES.length];
  const iconPath = ICONS[member.icon] ?? ICONS.strategy;
  const isLg = size === "lg";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: t.glass,
        backdropFilter: "blur(28px)",
        WebkitBackdropFilter: "blur(28px)",
        border: `1px solid ${hov ? "rgba(200,168,75,0.5)" : t.bdr}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: T,
        transform: hov ? "translateY(-7px)" : "translateY(0)",
        boxShadow: hov ? `0 28px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(200,168,75,0.3)` : "none",
        cursor: "default",
      }}
    >
      {/* ── AVATAR AREA ── */}
      <div style={{ height: isLg ? 260 : 220, position: "relative", overflow: "hidden" }}>

        {/* Gradient background */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)`,
          transition: T,
        }} />

        {/* Animated radial glow on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 50% 110%, ${p.orb}30 0%, transparent 65%)`,
          opacity: hov ? 1 : 0.4,
          transition: "opacity 0.5s ease",
        }} />

        {/* Geometric SVG art layer */}
        <svg
          viewBox="0 0 300 220"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: hov ? 0.55 : 0.3, transition: "opacity 0.5s ease" }}
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Large rotated hexagon */}
          <polygon points="150,10 230,55 230,145 150,190 70,145 70,55" fill="none" stroke={p.shape} strokeWidth="1.5" />
          {/* Inner hexagon */}
          <polygon points="150,40 210,72 210,138 150,170 90,138 90,72" fill="none" stroke={p.accent} strokeWidth="0.5" strokeDasharray="4 4" />
          {/* Corner circles */}
          <circle cx="30" cy="30" r="40" fill="none" stroke={p.shape} strokeWidth="1" />
          <circle cx="270" cy="190" r="50" fill="none" stroke={p.shape} strokeWidth="1" />
          {/* Cross lines */}
          <line x1="0" y1="110" x2="300" y2="110" stroke={p.accent} strokeWidth="0.3" strokeDasharray="6 6" />
          <line x1="150" y1="0" x2="150" y2="220" stroke={p.accent} strokeWidth="0.3" strokeDasharray="6 6" />
          {/* Small decorative dots */}
          <circle cx="150" cy="110" r="3" fill={p.accent} opacity="0.6" />
          <circle cx="80" cy="50" r="2" fill={p.orb} opacity="0.5" />
          <circle cx="220" cy="170" r="2" fill={p.orb} opacity="0.5" />
          <circle cx="220" cy="50" r="1.5" fill={p.accent} opacity="0.4" />
          <circle cx="80" cy="170" r="1.5" fill={p.accent} opacity="0.4" />
        </svg>

        {/* Specialty icon ring */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: `translate(-50%, -50%) scale(${hov ? 1.08 : 1})`,
          transition: T,
          width: isLg ? 96 : 80,
          height: isLg ? 96 : 80,
          borderRadius: "50%",
          background: `linear-gradient(135deg, rgba(200,168,75,0.18), rgba(200,168,75,0.06))`,
          border: `1.5px solid rgba(200,168,75,0.5)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: hov ? `0 0 40px rgba(200,168,75,0.3), inset 0 0 20px rgba(200,168,75,0.08)` : `0 0 20px rgba(200,168,75,0.1)`,
          backdropFilter: "blur(8px)",
        }}>
          {/* Initials */}
          <span style={{
            fontSize: isLg ? 28 : 22,
            fontWeight: 900,
            color: p.accent,
            fontFamily: "'Playfair Display', Georgia, serif",
            letterSpacing: -0.5,
            lineHeight: 1,
            textShadow: `0 0 20px ${p.accent}80`,
          }}>{member.initials}</span>
        </div>

        {/* Specialty icon — bottom right of avatar */}
        <div style={{
          position: "absolute", bottom: 14, right: 16,
          width: 32, height: 32, borderRadius: 9,
          background: "rgba(8,12,20,0.6)",
          border: `1px solid rgba(200,168,75,0.35)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(8px)",
          transition: T,
          transform: hov ? "scale(1.1)" : "scale(1)",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={p.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPath} />
          </svg>
        </div>

        {/* Gold shimmer line at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)`,
          opacity: hov ? 1 : 0.4,
          transition: "opacity 0.4s ease",
        }} />
      </div>

      {/* ── INFO AREA ── */}
      <div style={{ padding: isLg ? "24px 24px 28px" : "18px 18px 22px" }}>
        <div style={{ fontWeight: 700, fontSize: isLg ? 17 : 15, marginBottom: 4, fontFamily: "'Playfair Display', Georgia, serif", color: t.fg }}>{member.name}</div>
        <div style={{ color: t.gold, fontSize: isLg ? 13 : 12, fontFamily: t.sans, fontWeight: 600, marginBottom: isLg ? 8 : 6 }}>{member.role}</div>
        <div style={{
          display: "inline-block",
          background: "rgba(200,168,75,0.08)",
          border: "1px solid rgba(200,168,75,0.2)",
          borderRadius: 100,
          padding: "3px 10px",
          fontSize: 10,
          color: "rgba(200,168,75,0.7)",
          fontFamily: t.sans,
          letterSpacing: 0.3,
          marginBottom: isLg && member.bio ? 14 : 0,
        }}>{member.spec}</div>
        {isLg && member.bio && (
          <>
            <div style={{ height: 1, background: t.bdr, margin: "14px 0" }} />
            <p style={{ fontSize: 13, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.7, margin: 0 }}>{member.bio}</p>
          </>
        )}
      </div>
    </div>
  );
}
