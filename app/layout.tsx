import type { Metadata, Viewport } from "next";
import { ContentMotion } from "@/components/common/ContentMotion";
import { BootLoader } from "@/components/common/BootLoader";
import { GlobalCodeParticles } from "@/components/common/GlobalCodeParticles";
import { SiteChatbot } from "@/components/common/SiteChatbot";
import { SiteFooter } from "@/components/footer/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codekraft.co.in"),
  title: "CodeKraft | Website & Web App Development in India",
  description:
    "CodeKraft builds websites, web applications, ecommerce platforms, ERP systems, and beautiful digital products.",
  alternates: {
    canonical: "https://www.codekraft.co.in",
  },
  openGraph: {
    title: "CodeKraft | Crafting Digital Experiences",
    description: "Websites, web apps, ecommerce and ERP solutions.",
    url: "https://www.codekraft.co.in",
    siteName: "CodeKraft",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeKraft | Crafting Digital Experiences",
    description: "Websites, web apps, ecommerce and ERP solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <BootLoader />
        <GlobalCodeParticles />
        <ContentMotion />
        {children}
        <SiteFooter />
        <SiteChatbot />
      </body>
    </html>
  );
}
