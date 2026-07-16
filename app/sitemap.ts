import type { MetadataRoute } from "next";
import { clientProjects } from "@/lib/client-projects";

const siteUrl = "https://www.codekraft.co.in";
const lastModified = new Date("2026-07-16");

const coreRoutes: MetadataRoute.Sitemap = [
  {
    url: siteUrl,
    lastModified,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    url: `${siteUrl}/about`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: `${siteUrl}/services`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    url: `${siteUrl}/portfolio`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteUrl}/process`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    url: `${siteUrl}/contact`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${siteUrl}/products/campuskraft`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: `${siteUrl}/products`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  },
  {
    url: `${siteUrl}/roadmap`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    url: `${siteUrl}/privacy`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.25,
  },
  {
    url: `${siteUrl}/terms`,
    lastModified,
    changeFrequency: "yearly",
    priority: 0.25,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyRoutes = clientProjects.map((project) => ({
    url: `${siteUrl}/portfolio/${project.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...caseStudyRoutes];
}
