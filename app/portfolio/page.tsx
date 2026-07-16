import Link from "next/link";
import { ExternalLink, FolderKanban } from "lucide-react";
import type { Metadata } from "next";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import { clientProjects } from "@/lib/client-projects";

const categories = Array.from(new Set(clientProjects.map((project) => project.category)));

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Explore selected CodeKraft client work across web, commerce, hospitality, public-sector, wellness, and innovation projects.",
  keywords: [
    "CodeKraft portfolio",
    "website development case studies",
    "web design portfolio India",
    "client website projects",
    "Next.js portfolio",
    "responsive website examples",
  ],
  alternates: { canonical: "https://www.codekraft.co.in/portfolio" },
  openGraph: { title: "CodeKraft Work and Products in Development", description: "Explore delivered client work and the separate CampusKraft product vision currently in development.", url: "https://www.codekraft.co.in/portfolio", type: "website" },
};

export default function PortfolioPage() {
  return (
    <main className="ck-portfolio-shell">
      <ModuleAmbientScene variant="work" />
      <Navbar />
      <section className="ck-portfolio-hero" aria-labelledby="portfolio-title">
        <p>&lt; portfolio.index /&gt;</p>
        <h1 id="portfolio-title">Client systems we have shipped</h1>
        <span>
          A compact archive of real CodeKraft work. Each module represents a
          client problem turned into a responsive digital product.
        </span>
      </section>

      <section className="ck-portfolio-board" aria-label="Portfolio projects">
        <div className="ck-portfolio-toolbar">
          <div>
            <FolderKanban size={18} />
            <strong>{clientProjects.length} client modules</strong>
          </div>
          <div className="ck-category-row">
            {categories.map((category) => (
              <span key={category}>{category}</span>
            ))}
          </div>
        </div>

        <div className="ck-portfolio-grid">
          {clientProjects.map((project, index) => (
            <article
              key={project.name}
              className={`ck-portfolio-card ck-accent-${project.accent}`}
            >
              <div className="ck-portfolio-card-top">
                <span>module 0{index + 1}</span>
                <small>{project.year}</small>
              </div>
              <h2>
                <Link href={`/portfolio/${project.slug}`}>{project.name}</Link>
              </h2>
              <p>{project.summary}</p>
              <div className="ck-work-tags">
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <Link href={`/portfolio/${project.slug}`} className="ck-case-link">
                read case study
              </Link>
              <Link href={project.url} target="_blank" rel="noreferrer" className="ck-work-card-link">
                launch site
                <ExternalLink size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="ck-portfolio-product-callout">
        <div><span>CodeKraft Product</span><em>In Development</em></div><h2>CampusKraft</h2><p>An upcoming education operations platform designed around admissions, academics, attendance, finance, communication and campus administration. It is shown separately from delivered client work because it remains in development.</p><Link href="/products/campuskraft">Explore Product Vision</Link>
      </section>
    </main>
  );
}
