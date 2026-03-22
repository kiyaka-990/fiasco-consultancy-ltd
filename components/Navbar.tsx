"use client";
import { useState, useEffect } from "react";
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

  const dark = darkProp !== undefined ? darkProp : internalDark;
  const setDark = setDarkProp ?? setInternalDark;
  const activeNav = activeNavProp ?? internalNav;
  const scrollTo = scrollToProp ?? ((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setInternalNav(id);
    setMobileOpen(false);
  });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 55);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const t = theme(dark);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      transition: t.T,
      background: scrolled ? t.navBg : "transparent",
      backdropFilter: scrolled ? "blur(28px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(28px)" : "none",
      borderBottom: scrolled ? `1px solid ${t.bdr}` : "none",
    }}>
      {/* Top utility bar */}
      <div style={{
        background: `linear-gradient(90deg, ${t.goldDark}, ${t.gold}, ${t.goldDark})`,
        padding: "5px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 11, color: "#1A1000", fontFamily: t.sans, fontWeight: 600, letterSpacing: 0.3 }}>
          Working Hours: Mon–Sat 8:00 AM – 5:00 PM
        </span>
        <span style={{ fontSize: 11, color: "#1A1000", fontFamily: t.sans, fontWeight: 700 }}>
          📞 +254 712 770 999
        </span>
      </div>

      {/* Main nav bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 72 }}>

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textDecoration: "none" }}>
          <div style={{ position: "relative", width: 140, height: 44 }}>
            <Image
              src="/logo.png"
              alt="Fiasco Consultancy"
              fill
              sizes="140px"
              style={{ objectFit: "contain", objectPosition: "left center" }}
              priority
            />
          </div>
        </a>

        {/* Desktop nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map((n) => (
            <a
              key={n}
              href={n === "home" ? "/" : `/${n}`}
              style={{
                color: activeNav === n ? t.gold : t.fg,
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 13,
                fontFamily: t.sans,
                fontWeight: activeNav === n ? 700 : 400,
                textDecoration: "none",
                textTransform: "capitalize" as const,
                transition: t.T,
                borderBottom: activeNav === n ? `2px solid ${t.gold}` : "2px solid transparent",
                letterSpacing: 0.3,
              }}
            >{n}</a>
          ))}
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            onClick={onOpenAccessibility ?? (() => {})}
            title="Accessibility"
            style={{ width: 36, height: 36, borderRadius: 9, background: "transparent", border: `1px solid ${t.bdr}`, cursor: "pointer", fontSize: 14, color: t.fgMuted, display: "flex", alignItems: "center", justifyContent: "center", transition: t.T }}
          >⚙</button>
          <button
            onClick={() => setDark(!dark)}
            title="Toggle theme"
            style={{ width: 36, height: 36, borderRadius: 9, background: "transparent", border: `1px solid ${t.bdr}`, cursor: "pointer", fontSize: 15, color: t.gold, display: "flex", alignItems: "center", justifyContent: "center", transition: t.T }}
          >{dark ? "☀" : "☾"}</button>
          <a
            href="/contact"
            style={{
              background: `linear-gradient(135deg, ${t.gold}, ${t.goldDark})`,
              color: "#1A1000",
              border: "none",
              borderRadius: 10,
              padding: "10px 22px",
              fontSize: 13,
              cursor: "pointer",
              fontFamily: t.sans,
              fontWeight: 800,
              boxShadow: `0 4px 20px rgba(200,168,75,0.4)`,
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: 0.3,
            }}
          >Get Help Now</a>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            style={{ background: "transparent", border: `1px solid ${t.bdr}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 18, color: t.fg }}
          >☰</button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: dark ? "rgba(8,12,20,0.98)" : "rgba(245,240,232,0.98)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          borderTop: `1px solid ${t.bdr}`,
          padding: "12px 20px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          {NAV_LINKS.map((n) => (
            <a
              key={n}
              href={n === "home" ? "/" : `/${n}`}
              onClick={() => setMobileOpen(false)}
              style={{ color: activeNav === n ? t.gold : t.fg, padding: "12px 16px", borderRadius: 8, fontSize: 15, fontFamily: t.sans, textAlign: "left" as const, textTransform: "capitalize" as const, textDecoration: "none", display: "block", fontWeight: activeNav === n ? 700 : 400, borderLeft: activeNav === n ? `3px solid ${t.gold}` : "3px solid transparent" }}
            >{n}</a>
          ))}
        </div>
      )}
    </nav>
  );
}
