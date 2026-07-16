import type { Metadata, Viewport } from "next";
import { ContentMotion } from "@/components/common/ContentMotion";
import { BootLoader } from "@/components/common/BootLoader";
import { GlobalCodeParticles } from "@/components/common/GlobalCodeParticles";
import { SiteChatbot } from "@/components/common/SiteChatbot";
import { SiteFooter } from "@/components/footer/SiteFooter";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const siteUrl = siteConfig.siteUrl;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: siteConfig.companyName,
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
      image: `${siteUrl}/logo.svg`,
      email: siteConfig.contactEmail,
      telephone: siteConfig.phoneHref,
      founder: { "@type": "Person", name: siteConfig.founder },
      areaServed: ["India", "Karnataka", "Kalaburagi"],
      address: { "@type": "PostalAddress", addressLocality: "Kalaburagi", addressRegion: "Karnataka", addressCountry: "IN" },
      sameAs: ["https://www.linkedin.com/in/yaseen-feroz/", "https://github.com/yaseenferoz"],
      knowsAbout: ["Web application development", "Cloud application development", "SaaS product development", "AI-enabled solutions", "ERP systems", "UI/UX engineering"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.companyName,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "CodeKraft",
  title: {
    default: "CodeKraft | Software Engineering & SaaS Products",
    template: "%s | CodeKraft",
  },
  description:
    "CodeKraft builds modern web applications, cloud platforms, AI-enabled solutions and proprietary SaaS products, including the upcoming CampusKraft education ERP.",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd).replace(/</g, "\\u003c") }}
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
