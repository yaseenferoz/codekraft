import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { CampusKraftExperience } from "@/components/campuskraft/CampusKraftExperience";

const canonicalUrl = "https://www.codekraft.co.in/products/campuskraft";

export const metadata: Metadata = {
  title: { absolute: "CampusKraft — Upcoming School & College ERP by CodeKraft" },
  description:
    "CampusKraft is an upcoming cloud-based education ERP by CodeKraft, designed to unify admissions, academics, attendance, fees, communication, HR, analytics and administrative workflows for schools and colleges.",
  keywords: [
    "CampusKraft",
    "upcoming education ERP",
    "school ERP India",
    "college management software",
    "campus operating platform",
    "education SaaS",
    "multi-campus ERP",
    "CodeKraft product",
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: "CampusKraft — Upcoming Education ERP by CodeKraft",
    description: "An upcoming intelligent operating platform for modern educational institutions, currently in development.",
    url: canonicalUrl,
    siteName: "CodeKraft",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusKraft — Upcoming Education ERP by CodeKraft",
    description: "Admissions, academics, attendance, fees and campus operations—planned as one connected platform.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CampusKraft",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: canonicalUrl,
  description:
    "An upcoming cloud-based education ERP being developed by CodeKraft for schools, colleges, universities and educational organisations.",
  creator: {
    "@type": "Organization",
    name: "CodeKraft",
    url: "https://www.codekraft.co.in",
  },
  releaseNotes: "CampusKraft is currently in early-stage MVP development. Features, roadmap and availability may change.",
};

export default function CampusKraftPage() {
  return (
    <main className="ck-campus-shell">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <CampusKraftExperience />
    </main>
  );
}
