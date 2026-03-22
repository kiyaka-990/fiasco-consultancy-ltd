"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { theme } from "@/lib/theme";

const NAV_LINKS = ["home", "services", "about", "projects", "team", "blog", "contact"];

export interface NavbarProps {
  dark?: boolean;
  setDark?: (v: boolean) => void;
  onOpenAccessibility?: () => void;
  activeNav?: string;
  scrollTo?: (id: string) => void;
}

export default function Navbar({
  dark: darkProp,
  setDark: setDarkProp,
  onOpenAccessibility,
  activeNav: activeNavProp,
  scrollTo: scrollToProp,
}: NavbarProps) {
  const [internalDark, setInternalDark] = useState(true);
  const [internalNav, setInternalNav] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // ── Accessibility state lives HERE so it always works even without parent wiring ──
  const [accOpen, setAccOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const accRef = useRef<HTMLDivElement>(null);

  const dark = darkProp !== undefined ? darkProp : internalDark;
  const setDark = setDarkProp ?? setInternalDark;
  const activeNav = activeNavProp ?? internalNav;
  const scrollTo = scrollToProp ?? ((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setInternalNav(id);
    setMobileOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 55);
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // set initial
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close acc panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (accRef.current && !accRef.current.contains(e.target as Node)) {
        setAccOpen(false);
      }
    };
    if (accOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [accOpen]);

  // Apply font size to root
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  // Apply reduce motion
  useEffect(() => {
    document.documentElement.style.setProperty("--motion", reduceMotion ? "none" : "all 0.35s cubic-bezier(0.4,0,0.2,1)");
  }, [reduceMotion]);

  const handleAccClick = () => {
    setAccOpen((o) => !o);
    onOpenAccessibility?.();
  };

  const t = theme(dark);
  const G = t.gold;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        transition: t.T,
        background: scrolled || mobileOpen ? t.navBg : "transparent",
        backdropFilter: scrolled || mobileOpen ? "blur(28px)" : "none",
        WebkitBackdropFilter: scrolled || mobileOpen ? "blur(28px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.bdr}` : "none",
      }}>

        {/* ── TOP BAR ── */}
        <div style={{
          background: `linear-gradient(90deg,${t.goldDark},${G},${t.goldDark})`,
          padding: isMobile ? "4px 16px" : "5px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}>
          <span style={{ fontSize: isMobile ? 10 : 11, color: "#1A1000", fontFamily: t.sans, fontWeight: 600 }}>
            {isMobile ? "Mon–Sat 8AM–5PM" : "Working Hours: Mon–Sat 8:00 AM – 5:00 PM"}
          </span>
          <span style={{ fontSize: isMobile ? 10 : 11, color: "#1A1000", fontFamily: t.sans, fontWeight: 700 }}>
            📞 +254 712 770 999
          </span>
        </div>

        {/* ── MAIN BAR ── */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: isMobile ? "0 16px" : "0 32px",
          height: isMobile ? 60 : 70,
        }}>

          {/* Logo */}
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}>
            <div style={{ position: "relative", width: isMobile ? 110 : 140, height: isMobile ? 36 : 44 }}>
              <Image
                src={dark ? "/logo.png" : "/logo-light.png"}
                alt="Fiasco Consultancy"
                fill sizes="140px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </a>

          {/* ── DESKTOP LINKS (hidden on mobile) ── */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {NAV_LINKS.map((n) => (
                <a key={n} href={n === "home" ? "/" : `/${n}`} style={{
                  color: activeNav === n ? G : t.fg,
                  padding: "8px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: t.sans,
                  fontWeight: activeNav === n ? 700 : 400,
                  textDecoration: "none",
                  textTransform: "capitalize" as const,
                  transition: t.T,
                  borderBottom: activeNav === n ? `2px solid ${G}` : "2px solid transparent",
                  letterSpacing: 0.2,
                  whiteSpace: "nowrap" as const,
                }}>{n}</a>
              ))}
            </div>
          )}

          {/* ── RIGHT CONTROLS ── */}
          <div style={{ display: "flex", gap: isMobile ? 6 : 8, alignItems: "center", flexShrink: 0 }}>
            {/* Accessibility button */}
            <button
              onClick={handleAccClick}
              title="Accessibility Settings"
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: accOpen ? `rgba(200,168,75,0.15)` : "transparent",
                border: `1px solid ${accOpen ? G : t.bdr}`,
                cursor: "pointer", fontSize: 14,
                color: accOpen ? G : t.fgMuted,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: t.T,
              }}
              aria-label="Accessibility settings"
            >⚙</button>

            {/* Dark/light toggle */}
            <button
              onClick={() => setDark(!dark)}
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
              style={{
                width: 34, height: 34, borderRadius: 9,
                background: "transparent", border: `1px solid ${t.bdr}`,
                cursor: "pointer", fontSize: 15, color: G,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: t.T,
              }}
              aria-label="Toggle theme"
            >{dark ? "☀" : "☾"}</button>

            {/* CTA — hide on very small screens */}
            {!isMobile && (
              <a href="/contact" style={{
                background: `linear-gradient(135deg,${G},${t.goldDark})`,
                color: "#1A1000", border: "none", borderRadius: 10,
                padding: "9px 18px", fontSize: 12,
                cursor: "pointer", fontFamily: t.sans, fontWeight: 800,
                boxShadow: `0 4px 20px rgba(200,168,75,0.4)`,
                textDecoration: "none", display: "inline-block",
                whiteSpace: "nowrap" as const,
              }}>Get Help Now</a>
            )}

            {/* Hamburger — only on mobile */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                style={{
                  width: 38, height: 38, borderRadius: 9,
                  background: mobileOpen ? `rgba(200,168,75,0.12)` : "transparent",
                  border: `1px solid ${mobileOpen ? G : t.bdr}`,
                  cursor: "pointer", fontSize: 18,
                  color: mobileOpen ? G : t.fg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: t.T,
                }}
              >
                {/* Animated hamburger → X */}
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  {mobileOpen ? (
                    <>
                      <line x1="2" y1="2" x2="16" y2="16" stroke={G} strokeWidth="2" strokeLinecap="round" />
                      <line x1="16" y1="2" x2="2" y2="16" stroke={G} strokeWidth="2" strokeLinecap="round" />
                    </>
                  ) : (
                    <>
                      <line x1="2" y1="4" x2="16" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <line x1="2" y1="14" x2="16" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* ── MOBILE MENU DRAWER ── */}
        {isMobile && (
          <div style={{
            maxHeight: mobileOpen ? "600px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
            background: dark ? "rgba(8,12,20,0.99)" : "rgba(245,240,232,0.99)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            borderTop: mobileOpen ? `1px solid ${t.bdr}` : "none",
          }}>
            <div style={{ padding: "12px 16px 20px", display: "flex", flexDirection: "column", gap: 2 }}>
              {NAV_LINKS.map((n) => (
                <a
                  key={n}
                  href={n === "home" ? "/" : `/${n}`}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    color: activeNav === n ? G : t.fg,
                    padding: "13px 16px",
                    borderRadius: 10,
                    fontSize: 15,
                    fontFamily: t.sans,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontWeight: activeNav === n ? 700 : 400,
                    textTransform: "capitalize" as const,
                    background: activeNav === n ? `rgba(200,168,75,0.08)` : "transparent",
                    borderLeft: activeNav === n ? `3px solid ${G}` : "3px solid transparent",
                    transition: t.T,
                  }}
                >
                  {n}
                  {activeNav === n && <span style={{ fontSize: 12, color: G }}>●</span>}
                </a>
              ))}
              {/* Mobile CTA */}
              <a href="/contact" onClick={() => setMobileOpen(false)} style={{
                background: `linear-gradient(135deg,${G},${t.goldDark})`,
                color: "#1A1000", textDecoration: "none", borderRadius: 12,
                padding: "14px 20px", fontSize: 15,
                fontFamily: t.sans, fontWeight: 900,
                textAlign: "center" as const,
                marginTop: 8,
                boxShadow: `0 4px 20px rgba(200,168,75,0.4)`,
                display: "block",
              }}>📞 Get Help Now</a>
            </div>
          </div>
        )}
      </nav>

      {/* ── ACCESSIBILITY PANEL ── (self-contained, always functional) */}
      {accOpen && (
        <div
          ref={accRef}
          style={{
            position: "fixed",
            top: isMobile ? 110 : 120,
            right: isMobile ? 12 : 18,
            zIndex: 2000,
            width: isMobile ? "calc(100vw - 24px)" : 300,
            maxWidth: 300,
            background: dark ? "rgba(8,12,20,0.97)" : "rgba(245,240,232,0.97)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: `1px solid ${t.bdr}`,
            borderRadius: 20,
            padding: 24,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            animation: "accSlideIn 0.2s ease",
          }}
          role="dialog"
          aria-label="Accessibility settings"
        >
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <span style={{ fontWeight: 700, fontSize: 14, fontFamily: t.sans, color: G, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>⚙</span> Accessibility
            </span>
            <button onClick={() => setAccOpen(false)} style={{ background: "transparent", border: `1px solid ${t.bdr}`, borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 14, color: t.fgMuted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, fontFamily: t.sans }}>

            {/* Font size */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600 }}>Font Size</span>
                <span style={{ fontSize: 13, color: G, fontWeight: 700, background: "rgba(200,168,75,0.1)", padding: "2px 10px", borderRadius: 100 }}>{fontSize}px</span>
              </div>
              <input
                type="range" min={13} max={22} step={1} value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: "100%", accentColor: G, cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                <span style={{ fontSize: 10, color: t.fgSubtle }}>A</span>
                <span style={{ fontSize: 14, color: t.fgSubtle, fontWeight: 700 }}>A</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: t.bdr }} />

            {/* Theme */}
            <div>
              <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600, display: "block", marginBottom: 10 }}>Colour Theme</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {([["🌙 Dark", true], ["☀ Light", false]] as [string, boolean][]).map(([label, val]) => (
                  <button
                    key={label}
                    onClick={() => setDark(val)}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 12,
                      background: dark === val ? `linear-gradient(135deg,${G},${t.goldDark})` : "transparent",
                      color: dark === val ? "#1A1000" : t.fg,
                      border: `1px solid ${dark === val ? G : t.bdr}`,
                      cursor: "pointer",
                      fontSize: 12,
                      fontFamily: t.sans,
                      fontWeight: dark === val ? 700 : 400,
                      transition: t.T,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}
                  >{label}</button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: t.bdr }} />

            {/* Reduce motion */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 12, color: t.fgMuted, fontWeight: 600, display: "block" }}>Reduce Motion</span>
                <span style={{ fontSize: 10, color: t.fgSubtle, marginTop: 2, display: "block" }}>Disable animations</span>
              </div>
              <button
                onClick={() => setReduceMotion((r) => !r)}
                role="switch"
                aria-checked={reduceMotion}
                style={{
                  width: 48, height: 26, borderRadius: 13,
                  background: reduceMotion ? `linear-gradient(135deg,${G},${t.goldDark})` : dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)",
                  border: `1px solid ${reduceMotion ? G : t.bdr}`,
                  position: "relative", cursor: "pointer",
                  transition: t.T, padding: 0,
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: reduceMotion ? "#1A1000" : "#fff",
                  position: "absolute", top: 2,
                  left: reduceMotion ? 24 : 2,
                  transition: t.T,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }} />
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: t.bdr }} />

            {/* Reset */}
            <button
              onClick={() => { setFontSize(16); setReduceMotion(false); }}
              style={{
                padding: "10px", borderRadius: 12, background: "transparent",
                border: `1px solid ${t.bdr}`, color: t.fgMuted,
                cursor: "pointer", fontSize: 12, fontFamily: t.sans,
                transition: t.T, width: "100%",
              }}
            >↺ Reset to Defaults</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes accSlideIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @media (max-width: 899px) {
          nav { font-size: 14px; }
        }
      `}</style>
    </>
  );
}
