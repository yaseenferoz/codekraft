import {
  ArrowRight,
  Boxes,
  Code2,
  Database,
  Gauge,
  LayoutDashboard,
  LifeBuoy,
  PenTool,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import { services } from "@/lib/site-modules";

const icons = [Code2, LayoutDashboard, ShoppingCart, Boxes, PenTool, LifeBuoy];

const solutionPaths = [
  {
    id: "01",
    title: "Visibility System",
    bestFor: "Companies that need a premium website, SEO pages, and a clear trust-building presence.",
    modules: ["Brand story", "Landing pages", "Lead CTAs", "SEO structure"],
  },
  {
    id: "02",
    title: "Operations System",
    bestFor: "Teams replacing spreadsheets, manual tracking, repeated approvals, or scattered internal tools.",
    modules: ["Dashboards", "Roles", "Reports", "Workflow UI"],
  },
  {
    id: "03",
    title: "Commerce System",
    bestFor: "Businesses selling products, taking enquiries, showing catalogs, or improving mobile conversion.",
    modules: ["Catalog UX", "Product pages", "Checkout/enquiry", "Payment-ready flow"],
  },
  {
    id: "04",
    title: "Growth System",
    bestFor: "Existing sites or apps that need performance, maintenance, new features, or AI/cloud upgrades.",
    modules: ["Audit", "Optimization", "Automation", "Support loop"],
  },
];

const engagementLayers = [
  { icon: SearchCheck, title: "Audit & Scope", text: "We map business goals, current problems, users, content, data, and technical constraints." },
  { icon: Sparkles, title: "Interface Direction", text: "We shape the UI language, responsive behavior, hierarchy, states, and page rhythm." },
  { icon: Database, title: "Data & Backend", text: "When needed, we define data models, APIs, auth, roles, dashboards, and integrations." },
  { icon: Gauge, title: "Performance & SEO", text: "We optimize loading, metadata, accessibility basics, mobile behavior, and launch readiness." },
  { icon: ShieldCheck, title: "QA & Support", text: "We test on real devices, ship carefully, and keep improving the product after launch." },
];

export const metadata = {
  title: "Services | CodeKraft",
  description: "CodeKraft services include websites, web applications, e-commerce, ERP systems, UI/UX design, and maintenance.",
};

export default function ServicesPage() {
  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="services" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="services-title">
        <p>&lt; services.map /&gt;</p>
        <h1 id="services-title">From public websites to private business systems.</h1>
        <span>
          We cover the full product surface: strategy, interface design,
          frontend, backend, deployment, and long-term improvement.
        </span>
      </section>

      <section className="ck-service-grid" aria-label="CodeKraft services">
        {services.map((service, index) => {
          const Icon = icons[index];

          return (
            <article key={service.title} className="ck-service-card">
              <div className="ck-service-card-top">
                <Icon size={24} />
                <span>service 0{index + 1}</span>
              </div>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <small>{service.output}</small>
              <div className="ck-service-stack">
                {service.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      <section className="ck-service-lab" aria-label="Service operating layers">
        {services.slice(0, 4).map((service, index) => (
          <div key={service.title}>
            <span>layer.{index + 1}</span>
            <strong>{service.title}</strong>
            <p>{service.detail}</p>
          </div>
        ))}
      </section>

      <section className="ck-service-architect" aria-label="CodeKraft solution architecture">
        <div className="ck-service-architect-copy">
          <p>&lt; solution.architect /&gt;</p>
          <h2>We do not sell random pages. We choose the right system shape.</h2>
          <span>
            A public website, a dashboard, an e-commerce flow, and an ERP-style
            product should not feel like the same template with different text.
            We pick the structure based on the job your product has to do.
          </span>
        </div>

        <div className="ck-service-paths">
          {solutionPaths.map((path) => (
            <article key={path.id}>
              <small>{path.id}</small>
              <h3>{path.title}</h3>
              <p>{path.bestFor}</p>
              <div>
                {path.modules.map((module) => (
                  <span key={module}>{module}</span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="ck-service-engagement">
          {engagementLayers.map(({ icon: Icon, title, text }) => (
            <article key={title}>
              <Icon size={19} />
              <strong>{title}</strong>
              <span>{text}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="ck-module-cta">
        <div>
          <p>&lt; start.scope /&gt;</p>
          <h2>Have a project that does not fit neatly into one box?</h2>
        </div>
        <Link href="/contact" className="ck-section-link">
          open contact
          <ArrowRight size={18} />
        </Link>
      </section>
    </main>
  );
}
