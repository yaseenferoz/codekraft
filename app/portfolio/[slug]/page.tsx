import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Gauge, Layers3, Target } from "lucide-react";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import { clientProjects, getClientProjectBySlug } from "@/lib/client-projects";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return clientProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getClientProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study | CodeKraft",
    };
  }

  return {
    title: `${project.name} Case Study`,
    description: project.summary,
    keywords: [
      `${project.name} case study`,
      `${project.name} website`,
      `${project.category} website development`,
      ...project.services,
      ...project.stack,
      "CodeKraft portfolio",
      "responsive website development",
    ],
    alternates: {
      canonical: `https://www.codekraft.co.in/portfolio/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Case Study | CodeKraft`,
      description: project.summary,
      url: `https://www.codekraft.co.in/portfolio/${project.slug}`,
      siteName: "CodeKraft",
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getClientProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectIndex = clientProjects.findIndex((item) => item.slug === project.slug);
  const previousProject = clientProjects[(projectIndex - 1 + clientProjects.length) % clientProjects.length];
  const nextProject = clientProjects[(projectIndex + 1) % clientProjects.length];
  const deliveryNotes = [
    ["01", "Scope", project.challenge],
    ["02", "System", project.solution],
    ["03", "Launch", project.result],
  ];

  return (
    <main className="ck-portfolio-shell ck-case-shell">
      <ModuleAmbientScene variant="work" />
      <Navbar />

      <section className="ck-case-hero" aria-labelledby="case-title">
        <Link href="/portfolio" className="ck-back-link">
          <ArrowLeft size={17} />
          work.index
        </Link>
        <p>&lt; case.study /&gt;</p>
        <h1 id="case-title">{project.name}</h1>
        <span>{project.summary}</span>
        <div className="ck-case-actions">
          <Link
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="ck-section-link"
            aria-label={`Visit live ${project.name} project`}
          >
            visit live project
            <ExternalLink size={16} />
          </Link>
        </div>
      </section>

      <section className="ck-case-panel" aria-label={`${project.name} case study`}>
        <div className="ck-case-visual">
          <div className={`ck-case-screen ck-accent-${project.accent}`}>
            <div className="ck-case-browser">
              <span />
              <span />
              <span />
              <code>{project.slug}.module</code>
            </div>
            <div className="ck-case-interface">
              <strong>{project.name}</strong>
              <p>{project.category}.system</p>
              <div>
                {project.services.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
            </div>
            <div className="ck-case-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>

        <div className="ck-case-story">
          <article>
            <Target size={20} />
            <span>challenge</span>
            <p>{project.challenge}</p>
          </article>
          <article>
            <Layers3 size={20} />
            <span>solution</span>
            <p>{project.solution}</p>
          </article>
          <article>
            <Gauge size={20} />
            <span>result</span>
            <p>{project.result}</p>
          </article>
        </div>
      </section>

      <section className="ck-case-grid" aria-label="Case study details">
        <article>
          <span>stack</span>
          <div className="ck-work-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <article>
          <span>scope</span>
          <div className="ck-work-tags">
            {project.services.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        {project.metrics.map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="ck-case-delivery" aria-label={`${project.name} delivery notes`}>
        <div>
          <p>&lt; delivery.notes /&gt;</p>
          <h2>How the project moved from signal to shipped surface.</h2>
        </div>
        <div className="ck-case-delivery-list">
          {deliveryNotes.map(([step, title, text]) => (
            <article key={title}>
              <span>{step}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="ck-case-switcher" aria-label="Case study navigation">
        <Link href={`/portfolio/${previousProject.slug}`}>
          <ArrowLeft size={17} />
          <span>
            <small>previous</small>
            {previousProject.name}
          </span>
        </Link>
        <Link href={`/portfolio/${nextProject.slug}`}>
          <span>
            <small>next</small>
            {nextProject.name}
          </span>
          <ArrowRight size={17} />
        </Link>
      </nav>
    </main>
  );
}
