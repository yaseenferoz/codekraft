import Link from "next/link";
import {
  ArrowRight, BrainCircuit, Cloud, Code2, GraduationCap, HeartPulse,
  Layers3, Lightbulb, LockKeyhole, Network, SearchCheck, Sparkles,
} from "lucide-react";

const productDirections = [
  { icon: GraduationCap, title: "Education Technology", focus: "Current focus: CampusKraft", status: "In Development", current: true },
  { icon: HeartPulse, title: "Healthcare Platforms", focus: "Long-term product direction", status: "Future Vision", current: false },
  { icon: Network, title: "Enterprise Operations", focus: "Long-term product direction", status: "Future Vision", current: false },
  { icon: BrainCircuit, title: "AI Automation", focus: "Long-term product direction", status: "Future Vision", current: false },
] as const;

const capabilities = [
  [SearchCheck, "Product Discovery"], [Sparkles, "UI and UX Engineering"],
  [Code2, "Full-Stack Development"], [Cloud, "Cloud Architecture"],
  [Network, "API and Integration Design"], [BrainCircuit, "AI-Assisted Workflows"],
  [LockKeyhole, "Security-First Engineering"], [Layers3, "Continuous Product Evolution"],
] as const;

function ProductConcept() {
  return (
    <div className="ck-home-product-concept" aria-label="Concept preview of the CampusKraft dashboard">
      <header><span><i /><i /><i /></span><strong>Concept Preview</strong><small>CampusKraft / overview</small></header>
      <div className="ck-home-product-ui">
        <aside aria-hidden="true"><i /><i /><i /><i /></aside>
        <div>
          <p><span>Campus overview</span><em>In Development</em></p>
          <section>{[["Students", "2,480"], ["Attendance", "91.4%"], ["Fee view", "Planned"]].map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</section>
          <div className="ck-home-product-chart">{[54, 72, 61, 84, 76, 90, 82].map((height, index) => <i key={index} style={{ "--home-bar": `${height}%` } as React.CSSProperties} />)}</div>
        </div>
      </div>
      <footer>Concept interface. Final features and design may evolve.</footer>
    </div>
  );
}

export function HomeProductStory() {
  return (
    <>
      <section className="ck-home-products" aria-labelledby="home-products-title">
        <header className="ck-home-section-heading"><p>Products by CodeKraft</p><h2 id="home-products-title">Building Tomorrow&apos;s Software.</h2><span>CodeKraft is building modern cloud-native software products designed to solve real operational challenges through thoughtful design, scalable engineering and intelligent automation.</span></header>
        <article className="ck-home-featured-product">
          <div className="ck-home-product-copy"><div><span>Flagship Product</span><em>In Development</em></div><h3>CampusKraft</h3><p>CampusKraft is an upcoming cloud-based education ERP being developed by CodeKraft for schools, colleges, universities and educational institutions. It is designed to bring admissions, academics, attendance, fees, communication, administration and campus operations into one connected platform.</p><nav aria-label="CampusKraft product links"><Link href="/products/campuskraft">Explore CampusKraft <ArrowRight size={17} /></Link><Link href="/products/campuskraft#early-access">Register Early Interest</Link></nav><small>CampusKraft is currently in MVP development. Features and availability may change.</small></div>
          <ProductConcept />
        </article>
      </section>

      <section className="ck-home-product-philosophy" aria-labelledby="why-products-title">
        <header className="ck-home-section-heading"><p>product.philosophy</p><h2 id="why-products-title">Why We Build Products</h2><span>Many organisations still rely on disconnected software, spreadsheets, repetitive data entry and manual workflows. Alongside custom software services, CodeKraft is investing in focused, long-term products designed around specific operational problems.</span></header>
        <div>{productDirections.map(({ icon: Icon, title, focus, status, current }) => <article key={title} className={current ? "is-current" : undefined}><Icon size={22} /><span>{status}</span><h3>{title}</h3><p>{focus}</p>{current ? <Link href="/products/campuskraft">View current focus <ArrowRight size={14} /></Link> : <small>Direction only · not currently available</small>}</article>)}</div>
      </section>

      <section className="ck-home-capabilities" aria-labelledby="platform-title">
        <div><p>&lt; product.engineering /&gt;</p><h2 id="platform-title">From Idea to Scalable Platform</h2><span>Strategy, interface craft and dependable engineering brought together for client platforms and CodeKraft products.</span><nav><Link href="/services">Services</Link><Link href="/process">Process</Link><Link href="/products">Products</Link><Link href="/roadmap">Product vision</Link></nav></div>
        <div>{capabilities.map(([Icon, label]) => <article key={label}><Icon size={18} /><span>{label}</span></article>)}</div>
      </section>

    </>
  );
}

export function HomeFinalCta() {
  return <section className="ck-home-dual-cta"><Lightbulb size={25} /><div><p>&lt; start.conversation /&gt;</p><h2>Build Something Meaningful.</h2><span>Whether you need a custom digital platform or want to follow the development of CampusKraft, CodeKraft is ready to start the conversation.</span></div><nav><Link href="/contact">Start a Project <ArrowRight size={17} /></Link><Link href="/products/campuskraft">Explore CampusKraft</Link></nav></section>;
}
