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
  const bottom = useRef<HTMLDivElement>(null);
  const t = theme(dark);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

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

  const G = t.gold;

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 9999 }}>
      {open && (
        <div style={{
          position: "absolute", bottom: 82, right: 0, width: 390, height: 560,
          display: "flex", flexDirection: "column",
          background: dark ? "rgba(8,12,20,0.97)" : "rgba(245,240,232,0.97)",
          backdropFilter: "blur(40px)", WebkitBackdropFilter: "blur(40px)",
          border: `1px solid ${t.bdr}`, borderRadius: 24, overflow: "hidden",
          boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,168,75,0.1)`,
        }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", background: `linear-gradient(135deg,rgba(200,168,75,0.12),rgba(139,105,20,0.05))`, borderBottom: `1px solid ${t.bdr}`, display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 20px rgba(200,168,75,0.4)`, flexShrink: 0, overflow: "hidden", position: "relative" }}>
              <span style={{ color: "#1A1000", fontWeight: 900, fontSize: 18, fontFamily: t.sans }}>F</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: 15, fontFamily: t.sans, color: t.fg }}>Fiasco AI Assistant</div>
              <div style={{ fontSize: 11, color: "#4CAF50", fontFamily: t.sans, display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4CAF50", display: "inline-block", animation: "pulsedot 2s infinite" }} />
                In-house AI · Zero API · Always online
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 20, color: t.fgMuted }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: 14 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.r === "user" ? "flex-end" : "flex-start", gap: 10, alignItems: "flex-start" }}>
                {m.r === "ai" && (
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#1A1000", fontWeight: 900, fontFamily: t.sans, flexShrink: 0, marginTop: 2 }}>F</div>
                )}
                <div style={{
                  maxWidth: "80%", padding: "11px 15px",
                  borderRadius: m.r === "user" ? "16px 16px 4px 16px" : "4px 16px 16px 16px",
                  background: m.r === "user"
                    ? `linear-gradient(135deg,${G},${t.goldDark})`
                    : dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)",
                  color: m.r === "user" ? "#1A1000" : t.fg,
                  fontSize: 13, fontFamily: t.sans, lineHeight: 1.65, whiteSpace: "pre-wrap", wordBreak: "break-word",
                  fontWeight: m.r === "user" ? 600 : 400,
                }}>{m.t}</div>
              </div>
            ))}
            {thinking && (
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${G},${t.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#1A1000", fontWeight: 900, fontFamily: t.sans }}>F</div>
                <div style={{ padding: "13px 18px", borderRadius: "4px 16px 16px 16px", background: dark ? "rgba(200,168,75,0.07)" : "rgba(26,16,0,0.06)", display: "flex", gap: 5, alignItems: "center" }}>
                  {([0, 0.25, 0.5] as number[]).map((d, i) => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: G, display: "inline-block", animation: `bounce 1.2s ${d}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottom} />
          </div>

          {/* Quick prompts */}
          {msgs.length <= 1 && (
            <div style={{ padding: "2px 12px 10px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
              {QUICK_PROMPTS.map((q) => (
                <button key={q} onClick={() => void send(q)} style={{ fontSize: 11, fontFamily: t.sans, padding: "5px 11px", borderRadius: 100, background: "rgba(200,168,75,0.1)", border: `1px solid rgba(200,168,75,0.3)`, color: G, cursor: "pointer", lineHeight: 1.4 }}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "12px 14px", borderTop: `1px solid ${t.bdr}`, display: "flex", gap: 10, flexShrink: 0 }}>
            <input
              value={inp}
              onChange={(e) => setInp(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) void send(); }}
              placeholder="Ask anything about Fiasco..."
              style={{ flex: 1, padding: "11px 16px", background: dark ? "rgba(200,168,75,0.06)" : "rgba(26,16,0,0.04)", border: `1px solid ${t.bdr}`, borderRadius: 100, color: t.fg, fontSize: 13, fontFamily: t.sans, outline: "none" }}
            />
            <button onClick={() => void send()} disabled={thinking}
              style={{ width: 44, height: 44, borderRadius: "50%", background: thinking ? "rgba(200,168,75,0.3)" : `linear-gradient(135deg,${G},${t.goldDark})`, border: "none", cursor: thinking ? "default" : "pointer", fontSize: 18, color: "#1A1000", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 900 }}
            >→</button>
          </div>
        </div>
      )}

      {/* FAB toggle */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: 60, height: 60, borderRadius: "50%",
          background: `linear-gradient(135deg,${G},${t.goldDark})`,
          border: "none", cursor: "pointer", fontSize: open ? 20 : 24,
          color: "#1A1000",
          boxShadow: `0 8px 40px rgba(200,168,75,0.55)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: t.T,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          fontWeight: 900,
          fontFamily: t.sans,
        }}
      >{open ? "✕" : "💬"}</button>

      {!open && (
        <div style={{
          position: "absolute", bottom: 68, right: 0,
          background: dark ? "rgba(8,12,20,0.96)" : "#fff",
          color: t.fg, fontSize: 12, fontFamily: t.sans, fontWeight: 700,
          padding: "6px 14px", borderRadius: 100, whiteSpace: "nowrap",
          boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          border: `1px solid ${t.bdr}`,
          animation: "slideup 0.4s ease",
        }}>
          💬 Fiasco AI — No API Key
        </div>
      )}

      <style>{`
        @keyframes pulsedot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.72)}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-8px)}}
        @keyframes slideup{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}
