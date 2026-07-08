import Link from "next/link";
import { ArrowLeft, ExternalLink, FolderKanban } from "lucide-react";
import { Navbar } from "@/components/navigation/Navbar";
import { clientProjects } from "@/lib/client-projects";

const categories = Array.from(new Set(clientProjects.map((project) => project.category)));

export const metadata = {
  title: "Portfolio | CodeKraft",
  description: "Explore selected CodeKraft client work across web, commerce, hospitality, public-sector, wellness, and innovation projects.",
};

export default function PortfolioPage() {
  return (
    <main className="ck-portfolio-shell">
      <Navbar />
      <section className="ck-portfolio-hero" aria-labelledby="portfolio-title">
        <Link href="/" className="ck-back-link">
          <ArrowLeft size={18} />
          home.module
        </Link>
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
              <h2>{project.name}</h2>
              <p>{project.summary}</p>
              <div className="ck-work-tags">
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <Link href={project.url} target="_blank" rel="noreferrer" className="ck-work-card-link">
                launch site
                <ExternalLink size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
