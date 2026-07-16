import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, GraduationCap, HeartPulse, Network } from "lucide-react";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

const url = "https://www.codekraft.co.in/products";

export const metadata: Metadata = {
  title: { absolute: "Products by CodeKraft | CampusKraft and Product Vision" },
  description: "Explore CampusKraft, CodeKraft's upcoming education ERP, and our long-term product direction across operational software and intelligent automation.",
  alternates: { canonical: url },
  openGraph: { title: "Products by CodeKraft | Software Platforms in Development", description: "Explore CampusKraft and CodeKraft's long-term direction for focused operational software.", url, type: "website" },
  twitter: { card: "summary_large_image", title: "Products by CodeKraft", description: "CampusKraft is CodeKraft's upcoming education ERP, currently in MVP development." },
};

const details = [["Current stage", "MVP development"], ["Audience", "Educational institutions"], ["Delivery model", "Planned cloud SaaS"], ["Roadmap", "Phased"], ["Interface status", "Conceptual and evolving"]];
const directions = [[HeartPulse, "Healthcare Platforms", "Potential platforms for healthcare administration and patient-centred operational workflows."], [Network, "Enterprise Operations", "Potential tools for approvals, reporting and internal workflow coordination."], [BrainCircuit, "AI Automation", "Potential responsible automation for documents, reporting and operational assistance."]] as const;

export default function ProductsPage() {
  return (
    <main className="ck-module-shell ck-products-page">
      <ModuleAmbientScene variant="services" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="products-title"><p>&lt; products.codekraft /&gt;</p><h1 id="products-title">Products by CodeKraft</h1><span>Purpose-built software platforms designed around real operational challenges.</span></section>
      <section className="ck-products-feature" aria-labelledby="campuskraft-product-title">
        <div><p>Flagship Product · In Development</p><GraduationCap size={30} /><h2 id="campuskraft-product-title">CampusKraft</h2><span>An upcoming education ERP designed to unify admissions, academics, attendance, finance, communication and institutional operations.</span><nav><Link href="/products/campuskraft">Explore CampusKraft <ArrowRight size={17} /></Link><Link href="/products/campuskraft#early-access">Register Early Interest</Link></nav></div>
        <div className="ck-products-facts">{details.map(([label, value]) => <article key={label}><small>{label}</small><strong>{value}</strong></article>)}</div>
        <p className="ck-products-disclosure">CampusKraft is currently under development. Its roadmap, interface and final feature set may evolve through technical validation and institutional feedback.</p>
      </section>
      <section className="ck-product-directions"><header><p>&lt; future.directions /&gt;</p><h2>Future Product Directions</h2><span>These are long-term product directions and are not currently available products.</span></header><div>{directions.map(([Icon, title, copy]) => <article key={title}><Icon size={21} /><em>Future Vision</em><h3>{title}</h3><p>{copy}</p></article>)}</div><Link href="/roadmap">Explore CodeKraft&apos;s product vision <ArrowRight size={16} /></Link></section>
    </main>
  );
}
