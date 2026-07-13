import { Activity, Code2, Cpu, Database, Layers3, Rocket, ShieldCheck, Sparkles } from "lucide-react";
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

const operatingSystem = [
  {
    icon: Cpu,
    label: "strategy.kernel",
    title: "Business logic before visual polish",
    text: "We first understand who the product is for, what action it should create, and which business workflow it has to support.",
  },
  {
    icon: Layers3,
    label: "interface.layer",
    title: "A repeatable interface language",
    text: "Navigation, cards, forms, dashboards, mobile states, and interaction patterns are treated as one connected design system.",
  },
  {
    icon: Database,
    label: "data.model",
    title: "Structure for real operations",
    text: "For apps and business systems, we think through data, roles, reports, permissions, and future modules before the UI becomes heavy.",
  },
  {
    icon: ShieldCheck,
    label: "qa.protocol",
    title: "Launch with checks, not hope",
    text: "We review responsive behavior, accessibility basics, SEO, performance, content clarity, and production readiness before release.",
  },
];

const studioSignals = [
  ["01", "Design that feels premium, but still helps people complete real tasks."],
  ["02", "Code that is organized enough to maintain after the first launch excitement fades."],
  ["03", "Content and layouts shaped around trust, conversion, and clear decision paths."],
  ["04", "Support for websites, apps, commerce, ERP-style systems, AI, cloud, and growth loops."],
];

const expertiseMatrix = [
  {
    title: "Interface",
    items: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
  },
  {
    title: "Systems",
    items: ["Node.js", "APIs", "Auth", "Dashboards", "Admin Panels"],
  },
  {
    title: "Data",
    items: ["Supabase", "PostgreSQL", "Storage", "Lead Pipelines", "Reports"],
  },
  {
    title: "Launch",
    items: ["Vercel", "SEO", "Analytics", "Resend", "Telegram Alerts"],
  },
  {
    title: "AI Layer",
    items: ["Gemini", "Chatbots", "Automation", "Brief Capture", "Search"],
  },
  {
    title: "Product Care",
    items: ["QA", "Mobile Checks", "Performance", "Maintenance", "Iteration"],
  },
];

export const metadata = {
  title: "About",
  description: "Learn how CodeKraft designs and builds premium digital products, websites, and business systems.",
  keywords: [
    "about CodeKraft",
    "software development studio India",
    "digital product studio Karnataka",
    "premium website design studio",
    "web application team Gulbarga",
  ],
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

      <section className="ck-studio-os" aria-label="CodeKraft studio operating system">
        <div className="ck-studio-core">
          <p>&lt; studio.os /&gt;</p>
          <h2>Small team energy. Product-company discipline.</h2>
          <span>
            CodeKraft works like a compact product cell: strategy, UX,
            frontend, backend, content, launch, and growth decisions stay close
            together so the final product feels intentional.
          </span>
          <div aria-label="CodeKraft studio signals">
            {studioSignals.map(([id, text]) => (
              <article key={id}>
                <strong>{id}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="ck-studio-orbit">
          <span className="ck-studio-orbit-line" aria-hidden="true" />
          {operatingSystem.map(({ icon: Icon, label, title, text }) => (
            <article key={label}>
              <Icon size={20} />
              <small>{label}</small>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
          <div className="ck-studio-launch">
            <Rocket size={24} />
            <strong>ship.module</strong>
            <span>build, test, launch, improve</span>
          </div>
          <div className="ck-studio-runtime" aria-label="CodeKraft expertise matrix">
            <div className="ck-studio-runtime-head">
              <strong>expertise.matrix</strong>
              <span>tools we use when the project actually needs them</span>
            </div>
            <div className="ck-studio-runtime-grid">
              {expertiseMatrix.map((group) => (
                <article key={group.title}>
                  <strong>{group.title}</strong>
                  <div>
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
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
