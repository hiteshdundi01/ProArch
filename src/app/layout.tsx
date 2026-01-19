import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ProArch - Professional Architecture Diagrams",
  description: "Transform Mermaid.js syntax into stunning, Cloudcraft-quality architecture visualizations",
  keywords: ["architecture diagrams", "mermaid", "react flow", "diagram as code", "system design"],
  authors: [{ name: "ProArch" }],
  openGraph: {
    title: "ProArch - Professional Architecture Diagrams",
    description: "Transform Mermaid.js syntax into stunning, Cloudcraft-quality architecture visualizations",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
