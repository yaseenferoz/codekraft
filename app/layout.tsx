import type { Metadata, Viewport } from "next";
import { ContentMotion } from "@/components/common/ContentMotion";
import { BootLoader } from "@/components/common/BootLoader";
import { GlobalCodeParticles } from "@/components/common/GlobalCodeParticles";
import { SiteChatbot } from "@/components/common/SiteChatbot";
import { SiteFooter } from "@/components/footer/SiteFooter";
import "./globals.css";

const siteUrl = "https://www.codekraft.co.in";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CodeKraft",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  image: `${siteUrl}/logo.svg`,
  email: "hello@codekraft.co.in",
  telephone: "+918073049854",
  areaServed: ["India", "Karnataka", "Gulbarga", "Kalaburagi"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gulbarga",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: ["https://www.linkedin.com/in/yaseen-feroz/", "https://github.com/yaseenferoz"],
  knowsAbout: [
    "Website development",
    "Web application development",
    "E-commerce development",
    "ERP systems",
    "UI/UX design",
    "Next.js development",
    "React development",
    "AI chatbot integration",
    "Supabase lead management",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "CodeKraft",
  title: {
    default: "CodeKraft | Website & Web App Development in India",
    template: "%s | CodeKraft",
  },
  description:
    "CodeKraft builds websites, web applications, e-commerce platforms, ERP systems, AI chatbots, and beautiful digital products for businesses in India.",
  keywords: [
    "CodeKraft",
    "website development India",
    "website development Gulbarga",
    "website development Kalaburagi",
    "web application development India",
    "Next.js development company",
    "React web development",
    "ecommerce website development",
    "ERP software development",
    "UI UX design studio",
    "AI chatbot integration",
    "Supabase development",
    "software development studio Karnataka",
  ],
  authors: [{ name: "CodeKraft", url: siteUrl }],
  creator: "CodeKraft",
  publisher: "CodeKraft",
  category: "Software Development",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "CodeKraft | Crafting Digital Experiences",
    description: "Websites, web apps, e-commerce, ERP, AI chatbot, and premium digital product solutions.",
    url: siteUrl,
    siteName: "CodeKraft",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeKraft | Crafting Digital Experiences",
    description: "Websites, web apps, e-commerce, ERP, AI chatbot, and premium digital product solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
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
