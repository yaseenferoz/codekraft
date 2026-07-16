import type { Metadata } from "next";
import { FeaturedWork } from "@/sections/FeaturedWork/FeaturedWork";
import { Hero } from "@/sections/Hero/Hero";
import { HomeFinalCta, HomeProductStory } from "@/sections/Products/HomeProductStory";

export const metadata: Metadata = {
  title: { absolute: "CodeKraft | Software Engineering & SaaS Products" },
  description: "CodeKraft builds modern web applications, cloud platforms, AI-enabled solutions and proprietary SaaS products, including CampusKraft, an upcoming ERP for educational institutions.",
  alternates: { canonical: "https://www.codekraft.co.in" },
  openGraph: { title: "CodeKraft | Software Engineering & SaaS Products", description: "Custom digital platforms and focused SaaS products, including the upcoming CampusKraft education ERP.", url: "https://www.codekraft.co.in", type: "website" },
  twitter: { card: "summary_large_image", title: "CodeKraft | Software Engineering & SaaS Products", description: "Modern cloud applications, AI-enabled solutions and proprietary SaaS products." },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeProductStory />
      <FeaturedWork />
      <HomeFinalCta />
    </main>
  );
}
