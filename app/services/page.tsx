import { ArrowRight, Boxes, Code2, LayoutDashboard, LifeBuoy, PenTool, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navigation/Navbar";
import { services } from "@/lib/site-modules";

const icons = [Code2, LayoutDashboard, ShoppingCart, Boxes, PenTool, LifeBuoy];

export const metadata = {
  title: "Services | CodeKraft",
  description: "CodeKraft services include websites, web applications, e-commerce, ERP systems, UI/UX design, and maintenance.",
};

export default function ServicesPage() {
  return (
    <main className="ck-module-shell">
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
