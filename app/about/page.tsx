import { Activity, Code2, Layers3, Sparkles } from "lucide-react";
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

const team = [
  ["Yaseen Feroz", "Full Stack", "Product direction, engineering decisions, client delivery, and CodeKraft systems."],
  ["Md Asadullah", "Marketing", "Outreach, client communication, lead generation, and brand growth."],
  ["Nagraj Awanti", "Full Stack", "Development support, implementation, testing, and technical execution."],
  ["Md Aejaz", "Technical Writer", "Website content, messaging clarity, page copy, and client communication material."],
  ["Sharjeel Zeeshan", "UI/UX", "Interface design, user flows, visual systems, and product experience polish."],
];

export const metadata = {
  title: "About | CodeKraft",
  description: "Learn how CodeKraft designs and builds premium digital products, websites, and business systems.",
};

export default function AboutPage() {
  const stats = [
    ["9", "client modules"],
    ["6", "service lanes"],
    ["5", "delivery phases"],
    ["24/7", "digital mindset"],
  ];

  return (
    <main className="ck-module-shell">
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

      <section className="ck-team-section" aria-label="CodeKraft team">
        <div className="ck-team-heading">
          <p>&lt; studio.team /&gt;</p>
          <h2>The people behind the modules.</h2>
          <span>
            CodeKraft works like a compact product cell: technical execution,
            design, content, marketing, and delivery moving together.
          </span>
        </div>

        <div className="ck-team-grid">
          {team.map(([name, role, summary]) => (
            <article key={name} className="ck-team-card">
              <span>{role}</span>
              <h3>{name}</h3>
              <p>{summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
