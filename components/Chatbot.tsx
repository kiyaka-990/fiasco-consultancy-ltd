"use client";
import { useState, useRef, useEffect } from "react";
import { BRAIN, QUICK_PROMPTS } from "@/lib/data";
import { theme } from "@/lib/theme";

interface Message { r: "ai" | "user"; t: string; }
export interface ChatbotProps { dark?: boolean; }

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
  const [msgs, setMsgs] = useState<Message[]>([
    { r: "ai", t: "Hello! I'm the Fiasco AI Assistant — trained entirely in-house.\n\nNo API key needed. I know everything about Fiasco Consultancy.\n\nHow can I help you today?" },
  ]);
  const [inp, setInp] = useState("");
  const [thinking, setThinking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);
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

  // On mobile: chat window fills most of the screen
  const chatWidth = isMobile ? "calc(100vw - 24px)" : "380px";
  const chatHeight = isMobile ? "70vh" : "540px";
  const chatRight = isMobile ? "12px" : "0";
  const chatBottom = isMobile ? "72px" : "76px";

  return (
    // Wrapper — on mobile pushes FAB away from the edge so it never clips off screen
    <div style={{
      position: "fixed",
      bottom: isMobile ? 20 : 28,
      right: isMobile ? 16 : 28,
      zIndex: 9000, // below navbar (1000) issues won't occur, but above page content
    }}>

      {/* ── CHAT WINDOW ── */}
      {open && (
        <div style={{
          position: "fixed",         // fixed so it doesn't clip on mobile
          bottom: chatBottom,
          right: chatRight,
          width: chatWidth,
          height: chatHeight,
          maxHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          background: dark ? "rgba(8,12,20,0.97)" : "rgba(245,240,232,0.97)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: `1px solid ${t.bdr}`,
          borderRadius: isMobile ? "16px 16px 0 0" : 24,
          overflow: "hidden",
          boxShadow: `0 -4px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,168,75,0.1)`,
          zIndex: 9000,
          animation: "chatSlideUp 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}>

          {/* Header */}
          <div style={{
            padding: "14px 18px",
            background: `linear-gradient(135deg,rgba(200,168,75,0.12),rgba(139,105,20,0.05))`,
            borderBottom: `1px solid ${t.bdr}`,
            display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `linear-gradient(135deg,${G},${t.goldDark})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#1A1000", fontSize: 16,
              fontFamily: t.sans, boxShadow: `0 4px 16px rgba(200,168,75,0.4)`, flexShrink: 0,
            }}>F</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 800, fontSize: 14, fontFamily: t.sans, color: t.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Fiasco AI Assistant</div>
              <div style={{ fontSize: 11, color: "#4CAF50", fontFamily: t.sans, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", display: "inline-block", animation: "pulsedot 2s infinite" }} />
                In-house AI · Zero API · Always online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "transparent", border: `1px solid ${t.bdr}`, borderRadius: 8, width: 30, height: 30, cursor: "pointer", fontSize: 16, color: t.fgMuted, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              aria-label="Close chat"
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 12 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.r === "user" ? "flex-end" : "flex-start", gap: 8, alignItems: "flex-start" }}>
                {m.r === "ai" && (
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#1A1000", fontWeight: 900, fontFamily: t.sans, flexShrink: 0, marginTop: 2 }}>F</div>
                )}
                <div style={{
                  maxWidth: "80%",
                  padding: "10px 14px",
                  borderRadius: m.r === "user" ? "14px 14px 4px 14px" : "4px 14px 14px 14px",
                  background: m.r === "user"
                    ? `linear-gradient(135deg,${G},${t.goldDark})`
                    : dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)",
                  color: m.r === "user" ? "#1A1000" : t.fg,
                  fontSize: 13, fontFamily: t.sans, lineHeight: 1.6,
                  whiteSpace: "pre-wrap", wordBreak: "break-word",
                  fontWeight: m.r === "user" ? 600 : 400,
                }}>{m.t}</div>
              </div>
            ))}

            {/* Typing dots */}
            {thinking && (
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#1A1000", fontWeight: 900, fontFamily: t.sans }}>F</div>
                <div style={{ padding: "12px 16px", borderRadius: "4px 14px 14px 14px", background: dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)", display: "flex", gap: 4, alignItems: "center" }}>
                  {([0, 0.2, 0.4] as number[]).map((d, i) => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: G, display: "inline-block", animation: `bounce 1.2s ${d}s infinite` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* Quick prompts */}
          {msgs.length <= 1 && (
            <div style={{ padding: "4px 12px 10px", display: "flex", gap: 5, flexWrap: "wrap", flexShrink: 0 }}>
              {QUICK_PROMPTS.slice(0, isMobile ? 3 : 6).map((q) => (
                <button key={q} onClick={() => void send(q)} style={{
                  fontSize: 11, fontFamily: t.sans, padding: "5px 10px", borderRadius: 100,
                  background: "rgba(200,168,75,0.1)", border: `1px solid rgba(200,168,75,0.3)`,
                  color: G, cursor: "pointer", lineHeight: 1.4, whiteSpace: "nowrap" as const,
                }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: `1px solid ${t.bdr}`, display: "flex", gap: 8, flexShrink: 0 }}>
            <input
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) void send(); }}
              placeholder="Ask anything about Fiasco..."
              style={{
                flex: 1, padding: "10px 14px",
                background: dark ? "rgba(200,168,75,0.06)" : "rgba(26,16,0,0.04)",
                border: `1px solid ${t.bdr}`,
                borderRadius: 100, color: t.fg, fontSize: 13,
                fontFamily: t.sans, outline: "none",
                minWidth: 0,
              }}
            />
            <button
              onClick={() => void send()}
              disabled={thinking}
              aria-label="Send message"
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: thinking ? "rgba(200,168,75,0.3)" : `linear-gradient(135deg,${G},${t.goldDark})`,
                border: "none", cursor: thinking ? "default" : "pointer",
                fontSize: 16, color: "#1A1000",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, fontWeight: 900,
              }}
            >→</button>
          </div>
        </div>
      )}

      {/* ── FAB TOGGLE BUTTON ── */}
      <button
        onClick={() => setOpen((o) => !o)}
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
          fontWeight: 900,
          position: "relative",
          zIndex: 9001,
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Label tooltip — desktop only */}
      {!open && !isMobile && (
        <div style={{
          position: "absolute", bottom: 64, right: 0,
          background: dark ? "rgba(8,12,20,0.96)" : "#fff",
          color: t.fg, fontSize: 11, fontFamily: t.sans, fontWeight: 700,
          padding: "6px 12px", borderRadius: 100, whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          border: `1px solid ${t.bdr}`,
          animation: "chatSlideUp 0.4s ease",
          pointerEvents: "none",
        }}>
          💬 Fiasco AI — No API Key
        </div>
      )}

      <style>{`
        @keyframes pulsedot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-7px)}}
        @keyframes chatSlideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
