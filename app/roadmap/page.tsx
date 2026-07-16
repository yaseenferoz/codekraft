import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BrainCircuit, GraduationCap, HeartPulse, Network, ShieldCheck } from "lucide-react";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

const url = "https://www.codekraft.co.in/roadmap";
export const metadata: Metadata = {
  title: { absolute: "CodeKraft Product Vision & Roadmap" },
  description: "Explore CodeKraft's long-term product direction across education technology, healthcare platforms, enterprise operations and AI automation.",
  alternates: { canonical: url },
  openGraph: { title: "CodeKraft Product Vision & Roadmap", description: "A transparent view of CodeKraft's current product focus and long-term software directions.", url, type: "website" },
  twitter: { card: "summary_large_image", title: "CodeKraft Product Vision & Roadmap", description: "Current direction, not guaranteed dates or commitments." },
};

const phases = [
  { icon: GraduationCap, eyebrow: "Current Focus", title: "CampusKraft", subtitle: "Education operations platform", status: "In Development", items: ["Institution setup", "Roles and permissions", "Student information", "Admissions", "Attendance", "Fees", "Notices", "Foundational reporting"] },
  { icon: GraduationCap, eyebrow: "Next Product Expansion", title: "CampusKraft Academic and Operational Expansion", subtitle: "Potential expansion after core validation", status: "Planned", items: ["Examinations", "Report cards", "Timetable", "HR", "Payroll", "Library", "Transport", "Inventory"] },
] as const;
const future = [[HeartPulse, "Healthcare Platforms", "Potential software platforms for patient journeys, clinical operations, appointment workflows and healthcare administration."], [Network, "Enterprise Operations", "Potential internal-operation platforms for workflow management, reporting, approvals and business process coordination."], [BrainCircuit, "AI Automation", "Potential intelligent tools for document processing, operational assistance, reporting and workflow automation."]] as const;
const principles = ["Real operational pain", "Repeated workflow problems", "Clear user value", "Responsible use of technology", "Scalable architecture", "Secure data handling", "Measurable improvement", "Sustainable product scope"];

export default function RoadmapPage() {
  return (
    <main className="ck-module-shell ck-roadmap-page">
      <ModuleAmbientScene variant="process" /><Navbar />
      <section className="ck-module-hero" aria-labelledby="roadmap-page-title"><p>&lt; product.vision /&gt;</p><h1 id="roadmap-page-title">Building Focused Software for Real Operations.</h1><span>CodeKraft&apos;s long-term direction is to build focused software platforms that simplify complex organisational workflows. This roadmap communicates product intent and may evolve as we learn from users, institutions and technical validation.</span></section>
      <p className="ck-roadmap-notice"><ShieldCheck size={17} /> This roadmap represents current product direction, not guaranteed release dates or commitments.</p>
      <section className="ck-company-roadmap" aria-label="CodeKraft product roadmap">{phases.map(({ icon: Icon, eyebrow, title, subtitle, status, items }) => <article key={title}><header><span>{eyebrow}</span><em>{status}</em></header><Icon size={25} /><h2>{title}</h2><p>{subtitle}</p><div>{items.map((item) => <small key={item}>{item}</small>)}</div></article>)}</section>
      <section className="ck-roadmap-future"><header><p>&lt; long.term.direction /&gt;</p><h2>Long-Term Direction</h2><span>Possible areas for future product research—not active or available products.</span></header><div>{future.map(([Icon, title, copy]) => <article key={title}><Icon size={22} /><em>Future Vision</em><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
      <section className="ck-roadmap-principles"><div><p>&lt; decision.framework /&gt;</p><h2>How We Decide What to Build</h2></div><div>{principles.map((item, index) => <span key={item}><small>0{index + 1}</small>{item}</span>)}</div></section>
      <section className="ck-roadmap-cta"><div><h2>Start with a real operational problem.</h2><p>Explore the current CampusKraft vision or share a workflow challenge with CodeKraft.</p></div><nav><Link href="/products/campuskraft">Explore CampusKraft <ArrowRight size={16} /></Link><Link href="/contact">Share an Operational Challenge</Link></nav></section>
    </main>
  );
}
