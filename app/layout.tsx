import type { ReactNode } from "react";

export const metadata = {
  title: "Fiasco Consultancy Ltd",
  description: "When failure is not an option, Fiasco steps in.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
