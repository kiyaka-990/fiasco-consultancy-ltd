import type { ReactNode } from "react";

export const metadata = {
  title: "Fiasco Consultancy Ltd — When Failure Is Not An Option",
  description: "East Africa's leading crisis management and strategic consulting firm. Rapid intervention, forensic audits, project turnaround, and reputation defense.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#080C14" }}>{children}</body>
    </html>
  );
}
