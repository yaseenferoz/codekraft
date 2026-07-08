import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { clientProjects } from "@/lib/client-projects";

const featuredProjects = clientProjects.slice(0, 4);

export function FeaturedWork() {
  return (
    <section className="ck-featured-work" aria-labelledby="featured-work-title">
      <div className="ck-section-header">
        <p>&lt; work.preview /&gt;</p>
        <div>
          <h2 id="featured-work-title">Selected client modules</h2>
          <Link href="/portfolio" className="ck-section-link">
            open portfolio
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="ck-work-preview-grid">
        {featuredProjects.map((project, index) => (
          <article
            key={project.name}
            className={`ck-work-preview-card ck-accent-${project.accent}`}
          >
            <div className="ck-work-preview-top">
              <span>0{index + 1}</span>
              <small>{project.year}</small>
            </div>
            <h3>{project.name}</h3>
            <p>{project.summary}</p>
            <div className="ck-work-tags">
              {project.services.slice(0, 3).map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
            <Link href={project.url} target="_blank" rel="noreferrer" className="ck-work-card-link">
              visit project
              <ExternalLink size={15} />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
