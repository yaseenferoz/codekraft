import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

const termsItems = [
  {
    id: "01",
    title: "Project Scope",
    tag: "scope.lock",
    body:
      "Work begins from an agreed project brief, feature scope, timeline, and commercial understanding. Changes can be added through a revised estimate or phase.",
  },
  {
    id: "02",
    title: "Content & Access",
    tag: "client.input",
    body:
      "Clients are responsible for sharing accurate content, brand assets, approvals, hosting access, domain access, and required business information on time.",
  },
  {
    id: "03",
    title: "Delivery & Review",
    tag: "qa.loop",
    body:
      "CodeKraft designs, builds, tests, and ships agreed digital work. Review cycles are used to refine the product before final handover or deployment.",
  },
  {
    id: "04",
    title: "Payments",
    tag: "invoice.status",
    body:
      "Payment milestones, advances, and balances are confirmed per project. Final deployment, source handover, or production release may depend on cleared payments.",
  },
  {
    id: "05",
    title: "Third-Party Services",
    tag: "external.api",
    body:
      "Domains, hosting, email, payment gateways, APIs, AI tools, analytics, and other third-party services may have their own charges, terms, and limitations.",
  },
  {
    id: "06",
    title: "Support",
    tag: "growth.loop",
    body:
      "After launch, maintenance, fixes, improvements, backups, monitoring, and feature additions can continue through a support plan or separate agreement.",
  },
];

export const metadata = {
  title: "Terms & Conditions | CodeKraft",
  description: "CodeKraft terms and conditions for project scope, delivery, payments, third-party services, and support.",
};

export default function TermsPage() {
  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="privacy" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="terms-title">
        <p>&lt; terms.conditions /&gt;</p>
        <h1 id="terms-title">Terms &amp; Conditions</h1>
        <span>
          A simple operating agreement for how CodeKraft scopes, builds,
          reviews, ships, and supports digital products.
        </span>
      </section>

      <section className="ck-legal-panel" aria-label="CodeKraft terms and conditions">
        <div className="ck-legal-console">
          <span>terms.json</span>
          <strong>project_rules: loaded</strong>
          <code>{`{
  scope: "agreed before build",
  review: "visible delivery loop",
  payment: "milestone based",
  support: "available after launch"
}`}</code>
        </div>
        <div className="ck-legal-grid ck-legal-grid-wide">
          {termsItems.map((item) => (
            <article key={item.id} className="ck-legal-card">
              <small>{item.id}</small>
              <span>{item.tag}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
