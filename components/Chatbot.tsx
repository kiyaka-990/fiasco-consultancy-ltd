"use client";
import { useState, useRef, useEffect } from "react";
import { BRAIN } from "@/lib/data";
import { theme } from "@/lib/theme";

interface Message { r: "ai" | "user"; t: string; }
type Screen = "menu" | "chat";

export interface ChatbotProps { dark?: boolean; }

// ── Menu categories shown on the home screen ──────────────────────────────────
const MENU_ITEMS = [
  { icon: "🚨", label: "I Have a Crisis", query: "I have a crisis right now — help!" },
  { icon: "🛡️", label: "Our Services", query: "What services do you offer?" },
  { icon: "📋", label: "Our Methodology", query: "How does your 4-stage process work?" },
  { icon: "👥", label: "Meet the Team", query: "Tell me about your team" },
  { icon: "📍", label: "Location & Hours", query: "Where are you located and what are your hours?" },
  { icon: "💰", label: "Pricing & Fees", query: "How much do your services cost?" },
  { icon: "📅", label: "Book Consultation", query: "How do I book a consultation?" },
  { icon: "🔍", label: "Forensic Audits", query: "Tell me about your forensic audit service" },
  { icon: "🏆", label: "Case Studies", query: "Tell me about your past projects and results" },
  { icon: "💬", label: "Type a Message", query: "" }, // opens chat input directly
];

export default function Chatbot({ dark: darkProp }: ChatbotProps) {
  const [internalDark, setInternalDark] = useState(true);
  const dark = darkProp !== undefined ? darkProp : internalDark;

  useEffect(() => {
    if (darkProp === undefined) {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setInternalDark(mq.matches);
      const h = (e: MediaQueryListEvent) => setInternalDark(e.matches);
      mq.addEventListener("change", h);
      return () => mq.removeEventListener("change", h);
    }
  }, [darkProp]);

  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("menu");
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [inp, setInp] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = theme(dark);
  const G = t.gold;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  // Focus input when switching to chat
  useEffect(() => {
    if (screen === "chat") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [screen]);

  // Reset to menu when closed
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setScreen("menu"), 300);
  };

  const handleOpen = () => {
    setOpen(true);
    setScreen("menu");
  };

  const goToChat = async (query?: string) => {
    setScreen("chat");
    if (query && query.trim()) {
      setMsgs([]);
      // Add a welcome message then the user question
      const welcome: Message = { r: "ai", t: "Hello! I'm the Fiasco AI Assistant — trained entirely in-house on Fiasco Consultancy. How can I help?" };
      setMsgs([welcome, { r: "user", t: query }]);
      setThinking(true);
      const reply = await BRAIN.reply(query);
      setMsgs([welcome, { r: "user", t: query }, { r: "ai", t: reply }]);
      setThinking(false);
    } else {
      // "Type a Message" — just show welcome and empty input
      setMsgs([{ r: "ai", t: "Hello! I'm the Fiasco AI Assistant.\n\nI'm trained entirely in-house — no API key, no internet needed. Ask me anything about Fiasco Consultancy.\n\nWhat would you like to know?" }]);
    }
  };

  const send = async (q: string = inp): Promise<void> => {
    const text = q.trim();
    if (!text || thinking) return;
    setInp("");
    setMsgs((m) => [...m, { r: "user", t: text }]);
    setThinking(true);
    const reply = await BRAIN.reply(text);
    setMsgs((m) => [...m, { r: "ai", t: reply }]);
    setThinking(false);
  };

  const chatWidth = isMobile ? "calc(100vw - 24px)" : "390px";
  const chatHeight = isMobile ? "72vh" : "560px";
  const chatRight = isMobile ? "12px" : "0";
  const chatBottomPos = isMobile ? "72px" : "76px";

  // ── Shared styles ─────────────────────────────────────────────────────────
  const windowStyle: React.CSSProperties = {
    position: "fixed",
    bottom: chatBottomPos,
    right: chatRight,
    width: chatWidth,
    height: chatHeight,
    maxHeight: "82vh",
    display: "flex",
    flexDirection: "column",
    background: dark ? "rgba(8,12,20,0.98)" : "rgba(248,244,236,0.98)",
    backdropFilter: "blur(40px)",
    WebkitBackdropFilter: "blur(40px)",
    border: `1px solid ${t.bdr}`,
    borderRadius: isMobile ? "20px 20px 0 0" : 24,
    overflow: "hidden",
    boxShadow: `0 -4px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,168,75,0.08)`,
    zIndex: 9000,
    animation: "chatSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
  };

  const headerStyle: React.CSSProperties = {
    padding: "14px 16px",
    background: `linear-gradient(135deg,rgba(200,168,75,0.14),rgba(139,105,20,0.05))`,
    borderBottom: `1px solid ${t.bdr}`,
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  };

  const avatarStyle: React.CSSProperties = {
    width: 38, height: 38, borderRadius: 11,
    background: `linear-gradient(135deg,${G},${t.goldDark})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 900, color: "#1A1000", fontSize: 15,
    fontFamily: t.sans, boxShadow: `0 3px 12px rgba(200,168,75,0.4)`,
    flexShrink: 0,
  };

  const iconBtnStyle = (active = false): React.CSSProperties => ({
    width: 30, height: 30, borderRadius: 9,
    background: active ? `rgba(200,168,75,0.15)` : "transparent",
    border: `1px solid ${active ? G : t.bdr}`,
    cursor: "pointer", fontSize: 14, color: active ? G : t.fgMuted,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, transition: t.T,
  });

  return (
    <div style={{ position: "fixed", bottom: isMobile ? 20 : 28, right: isMobile ? 16 : 28, zIndex: 9000 }}>

      {open && (
        <div style={windowStyle}>

          {/* ════════════════ HEADER ════════════════ */}
          <div style={headerStyle}>
            {/* Back button — only in chat screen */}
            {screen === "chat" && (
              <button
                onClick={() => setScreen("menu")}
                style={iconBtnStyle()}
                aria-label="Back to menu"
                title="Back to menu"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}

            <div style={avatarStyle}>F</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 13, fontFamily: t.sans, color: t.fg }}>Fiasco AI Assistant</div>
              <div style={{ fontSize: 10, color: "#4CAF50", fontFamily: t.sans, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4CAF50", display: "inline-block", animation: "pulsedot 2s infinite" }} />
                <span>Online · In-house AI · No API key</span>
              </div>
            </div>

            {/* Menu button — always visible, goes back to menu */}
            <button
              onClick={() => setScreen("menu")}
              style={iconBtnStyle(screen === "menu")}
              aria-label="Main menu"
              title="Main menu"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="1" y1="3" x2="13" y2="3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="1" y1="7" x2="13" y2="7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                <line x1="1" y1="11" x2="13" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>

            {/* Close */}
            <button onClick={handleClose} style={iconBtnStyle()} aria-label="Close">✕</button>
          </div>

          {/* ════════════════ MENU SCREEN ════════════════ */}
          {screen === "menu" && (
            <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
              {/* Welcome banner */}
              <div style={{ padding: "20px 18px 16px", background: `linear-gradient(135deg,rgba(200,168,75,0.08),transparent)`, borderBottom: `1px solid ${t.bdr}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#1A1000", fontSize: 18, fontFamily: t.sans, flexShrink: 0, boxShadow: `0 4px 16px rgba(200,168,75,0.4)` }}>F</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: t.fg, fontFamily: t.sans, marginBottom: 4 }}>Hi there! 👋</div>
                    <div style={{ fontSize: 12, color: t.fgMuted, fontFamily: t.sans, lineHeight: 1.6 }}>I&apos;m the Fiasco AI — trained on everything about Fiasco Consultancy. What can I help you with?</div>
                  </div>
                </div>
              </div>

              {/* Menu grid */}
              <div style={{ padding: "14px 14px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ fontSize: 10, color: t.fgMuted, fontFamily: t.sans, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4, paddingLeft: 2, fontWeight: 700 }}>Quick Topics</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {MENU_ITEMS.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => void goToChat(item.query || undefined)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "10px 12px",
                        borderRadius: 12,
                        cursor: "pointer",
                        textAlign: "left" as const,
                        transition: t.T,
                        fontFamily: t.sans,
                        gridColumn: item.query === "" ? ("1 / -1" as React.CSSProperties["gridColumn"]) : undefined,
                        background: item.query === ""
                          ? `linear-gradient(135deg,rgba(200,168,75,0.12),rgba(200,168,75,0.06))`
                          : dark ? "rgba(200,168,75,0.06)" : "rgba(26,16,0,0.04)",
                        border: item.query === ""
                          ? `1px solid rgba(200,168,75,0.4)`
                          : `1px solid ${t.bdr}`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = dark ? "rgba(200,168,75,0.12)" : "rgba(200,168,75,0.08)";
                        e.currentTarget.style.borderColor = `rgba(200,168,75,0.4)`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = item.query === ""
                          ? `linear-gradient(135deg,rgba(200,168,75,0.12),rgba(200,168,75,0.06))`
                          : dark ? "rgba(200,168,75,0.06)" : "rgba(26,16,0,0.04)";
                        e.currentTarget.style.borderColor = item.query === "" ? "rgba(200,168,75,0.4)" : t.bdr;
                      }}
                    >
                      <span style={{ fontSize: 16, flexShrink: 0 }}>{item.icon}</span>
                      <span style={{ fontSize: 12, color: item.query === "" ? G : t.fg, fontWeight: item.query === "" ? 700 : 500, lineHeight: 1.3 }}>{item.label}</span>
                      {item.query === "" && <span style={{ marginLeft: "auto", color: G, fontSize: 14 }}>→</span>}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom contact strip */}
              <div style={{ marginTop: "auto", padding: "12px 14px", borderTop: `1px solid ${t.bdr}`, display: "flex", gap: 8 }}>
                <a href="tel:+254712770999" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 10, background: `linear-gradient(135deg,${G},${t.goldDark})`, color: "#1A1000", textDecoration: "none", fontSize: 12, fontFamily: t.sans, fontWeight: 800 }}>
                  📞 Call Now
                </a>
                <a href="/contact" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px", borderRadius: 10, background: dark ? "rgba(200,168,75,0.08)" : "rgba(200,168,75,0.12)", border: `1px solid ${t.bdr}`, color: t.fg, textDecoration: "none", fontSize: 12, fontFamily: t.sans, fontWeight: 600 }}>
                  📋 Contact Form
                </a>
              </div>
            </div>
          )}

          {/* ════════════════ CHAT SCREEN ════════════════ */}
          {screen === "chat" && (
            <>
              {/* Messages */}
              <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
                {msgs.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.r === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-start" }}>
                    {m.r === "ai" && (
                      <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#1A1000", fontWeight: 900, fontFamily: t.sans, flexShrink: 0, marginTop: 2 }}>F</div>
                    )}
                    <div style={{
                      maxWidth: "80%", padding: "10px 14px",
                      borderRadius: m.r === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
                      background: m.r === "user"
                        ? `linear-gradient(135deg,${G},${t.goldDark})`
                        : dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)",
                      color: m.r === "user" ? "#1A1000" : t.fg,
                      fontSize: 13, fontFamily: t.sans, lineHeight: 1.65,
                      whiteSpace: "pre-wrap", wordBreak: "break-word",
                      fontWeight: m.r === "user" ? 600 : 400,
                    }}>{m.t}</div>
                  </div>
                ))}

                {/* Typing indicator */}
                {thinking && (
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#1A1000", fontWeight: 900, fontFamily: t.sans }}>F</div>
                    <div style={{ padding: "12px 16px", borderRadius: "4px 14px 14px 14px", background: dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)", display: "flex", gap: 4, alignItems: "center" }}>
                      {([0, 0.2, 0.4] as number[]).map((d, i) => (
                        <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: G, display: "inline-block", animation: `bounce 1.2s ${d}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottom} />
              </div>

              {/* Back to menu pill — always visible in chat */}
              <div style={{ padding: "6px 14px 2px", flexShrink: 0 }}>
                <button
                  onClick={() => setScreen("menu")}
                  style={{ display: "flex", alignItems: "center", gap: 6, background: dark ? "rgba(200,168,75,0.07)" : "rgba(200,168,75,0.08)", border: `1px solid ${t.bdr}`, borderRadius: 100, padding: "5px 14px", cursor: "pointer", fontSize: 11, color: t.fgMuted, fontFamily: t.sans, transition: t.T }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to menu
                </button>
              </div>

              {/* Input */}
              <div style={{ padding: "8px 12px 12px", borderTop: `1px solid ${t.bdr}`, display: "flex", gap: 8, flexShrink: 0 }}>
                <input
                  ref={inputRef}
                  value={inp}
                  onChange={(e) => setInp(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) void send(); }}
                  placeholder="Ask anything about Fiasco..."
                  style={{
                    flex: 1, padding: "10px 14px",
                    background: dark ? "rgba(200,168,75,0.06)" : "rgba(26,16,0,0.04)",
                    border: `1px solid ${t.bdr}`,
                    borderRadius: 100, color: t.fg, fontSize: 13,
                    fontFamily: t.sans, outline: "none", minWidth: 0,
                  }}
                />
                <button
                  onClick={() => void send()}
                  disabled={thinking || !inp.trim()}
                  aria-label="Send"
                  style={{
                    width: 40, height: 40, borderRadius: "50%",
                    background: thinking || !inp.trim() ? "rgba(200,168,75,0.25)" : `linear-gradient(135deg,${G},${t.goldDark})`,
                    border: "none", cursor: thinking || !inp.trim() ? "default" : "pointer",
                    fontSize: 16, color: "#1A1000",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontWeight: 900, transition: t.T,
                  }}
                >→</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FAB toggle button ── */}
      <button
        onClick={open ? handleClose : handleOpen}
        aria-label={open ? "Close chat" : "Open Fiasco AI chat"}
        style={{
          width: isMobile ? 52 : 56,
          height: isMobile ? 52 : 56,
          borderRadius: "50%",
          background: `linear-gradient(135deg,${G},${t.goldDark})`,
          border: "none", cursor: "pointer",
          fontSize: open ? 18 : 22,
          color: "#1A1000",
          boxShadow: `0 6px 32px rgba(200,168,75,0.55)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: t.T,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          fontWeight: 900, position: "relative", zIndex: 9001,
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Desktop label */}
      {!open && !isMobile && (
        <div style={{
          position: "absolute", bottom: 64, right: 0,
          background: dark ? "rgba(8,12,20,0.96)" : "#fff",
          color: t.fg, fontSize: 11, fontFamily: t.sans, fontWeight: 700,
          padding: "6px 12px", borderRadius: 100, whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)", border: `1px solid ${t.bdr}`,
          animation: "chatSlideUp 0.4s ease", pointerEvents: "none",
        }}>
          💬 Fiasco AI — No API Key
        </div>
      )}

      <style>{`
        @keyframes pulsedot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
        @keyframes chatSlideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
