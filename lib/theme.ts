// ─── FIASCO GOLD/BLACK DESIGN TOKENS ─────────────────────────────────────────
export const GOLD = "#C8A84B";
export const GOLD_LIGHT = "#E8C97A";
export const GOLD_DARK = "#8B6914";
export const GOLD_DIM = "rgba(200,168,75,0.15)";
export const GOLD_BORDER = "rgba(200,168,75,0.25)";

export const theme = (dark: boolean) => ({
  bg: dark ? "#080C14" : "#F5F0E8",
  bgSurface: dark ? "#0D1420" : "#FFFFFF",
  fg: dark ? "#F0E8D0" : "#1A1000",
  fgMuted: dark ? "rgba(240,232,208,0.5)" : "rgba(26,16,0,0.5)",
  fgSubtle: dark ? "rgba(240,232,208,0.28)" : "rgba(26,16,0,0.28)",
  bdr: dark ? "rgba(200,168,75,0.18)" : "rgba(200,168,75,0.3)",
  bdrHov: dark ? "rgba(200,168,75,0.45)" : "rgba(200,168,75,0.6)",
  glass: dark
    ? "rgba(13,20,32,0.6)"
    : "rgba(255,252,245,0.75)",
  navBg: dark
    ? "rgba(8,12,20,0.94)"
    : "rgba(245,240,232,0.94)",
  gold: GOLD,
  goldLight: GOLD_LIGHT,
  goldDark: GOLD_DARK,
  goldDim: GOLD_DIM,
  goldBorder: GOLD_BORDER,
  T: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
  serif: "'Playfair Display', Georgia, serif",
  sans: "'Inter', sans-serif",
});

export type Theme = ReturnType<typeof theme>;
