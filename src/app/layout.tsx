import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// The original app (CustomerLayout.vue) sets `font-family: "Montserrat"`
// globally — matched here instead of the scaffold's default Geist, per the
// "match the original's look closely" fidelity note in the handoff doc.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Impulsive Shopping",
  description:
    "A Vue + Express bootcamp e-commerce project, rebuilt solo as a Next.js + React app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
