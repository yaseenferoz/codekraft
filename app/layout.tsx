import type { Metadata, Viewport } from "next";
import { GlobalCodeParticles } from "@/components/common/GlobalCodeParticles";
import { SiteChatbot } from "@/components/common/SiteChatbot";
import { SiteFooter } from "@/components/footer/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeKraft | Crafting Digital Experiences",
  description:
    "CodeKraft builds modern websites, web apps, e-commerce systems, ERP tools, and digital product experiences.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full" suppressHydrationWarning>
        <GlobalCodeParticles />
        {children}
        <SiteFooter />
        <SiteChatbot />
      </body>
    </html>
  );
}
