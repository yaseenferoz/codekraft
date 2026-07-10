import { Activity, Code2, Layers3, Sparkles } from "lucide-react";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import { clientProjects } from "@/lib/client-projects";

const principles = [
  {
    icon: Sparkles,
    title: "Beautiful, but useful",
    text: "Every interaction should earn its place. We design memorable interfaces without sacrificing speed or clarity.",
  },
  {
    icon: Code2,
    title: "Engineering with taste",
    text: "We build with clean components, typed data, responsive systems, and product decisions that survive real usage.",
  },
  {
    icon: Layers3,
    title: "Systems over screens",
    text: "A website is not a pile of pages. It is a living interface system with rules, rhythm, and a point of view.",
  },
  {
    icon: Activity,
    title: "Launch is the middle",
    text: "We care about the product after it ships: performance, iteration, maintenance, and measurable business impact.",
  },
];

export const metadata = {
  title: "About | CodeKraft",
  description: "Learn how CodeKraft designs and builds premium digital products, websites, and business systems.",
};

export default function AboutPage() {
  const stats = [
    [String(clientProjects.length), "client modules"],
    ["6", "service lanes"],
    ["5", "delivery phases"],
    ["24/7", "digital mindset"],
  ];

  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="about" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="about-title">
        <p>&lt; about.codekraft /&gt;</p>
        <h1 id="about-title">We build digital systems with craft, clarity, and momentum.</h1>
        <span>
          CodeKraft is a software development studio for founders, companies,
          and teams who want their digital presence to feel engineered and
          designed at the same level.
        </span>
      </section>

      <section className="ck-about-matrix" aria-label="CodeKraft principles">
        <div className="ck-about-terminal">
          <span>function about() &#123;</span>
          <code>
            return &#123;
            <br />
            &nbsp;&nbsp;passion: true,
            <br />
            &nbsp;&nbsp;systems: &quot;scalable&quot;,
            <br />
            &nbsp;&nbsp;design: &quot;premium&quot;,
            <br />
            &nbsp;&nbsp;delivery: &quot;committed&quot;
            <br />
            &#125;
          </code>
          <span>&#125;</span>
        </div>

        <div className="ck-module-card-grid">
          {principles.map(({ icon: Icon, title, text }) => (
            <article key={title} className="ck-module-card">
              <Icon size={22} />
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ck-about-depth" aria-label="CodeKraft operating model">
        <div className="ck-stat-row">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>

        <div className="ck-about-story">
          <article>
            <p>&lt; studio.philosophy /&gt;</p>
            <h2>We treat websites like products, not posters.</h2>
            <span>
              A CodeKraft build has structure: navigation behavior, responsive
              rules, content rhythm, interaction states, conversion paths, and a
              foundation that can grow into a larger system.
            </span>
          </article>
          <article>
            <p>&lt; proof.clients /&gt;</p>
            <h2>Real businesses, different domains, one design standard.</h2>
            <span>
              Current client modules include {clientProjects.slice(0, 5).map((project) => project.name).join(", ")}
              , and more across hospitality, public sector, commerce, wellness,
              and innovation.
            </span>
          </article>
        </div>
      </section>

      <section className="ck-team-section" aria-label="CodeKraft delivery capabilities">
        <div className="ck-team-heading">
          <p>&lt; studio.cell /&gt;</p>
          <h2>A compact product cell for serious digital work.</h2>
          <span>
            CodeKraft combines strategy, interface design, engineering,
            content clarity, launch support, and growth thinking in one focused
            delivery system.
          </span>
        </div>

        <div className="ck-team-grid">
          {[
            ["Strategy", "Scope, goals, workflows, and launch priorities before design starts."],
            ["Design", "Interface systems, responsive layouts, content rhythm, and interaction polish."],
            ["Engineering", "Frontend, backend, data contracts, integrations, deployment, and QA."],
            ["Growth", "Maintenance, iteration, performance checks, analytics, and improvements after launch."],
          ].map(([title, summary]) => (
            <article key={title} className="ck-team-card">
              <span>capability</span>
              <h3>{title}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
