import {
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
  LineChart,
  GitBranch,
  MonitorSmartphone,
  Rocket,
  ServerCog,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { CodeKraftLogoMark } from "@/components/common/CodeKraftLogoMark";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import { TesseractHero } from "@/components/three/TesseractHero";
import { processSteps } from "@/lib/site-modules";

const inputs = ["Business goals", "Users & roles", "Existing data", "Content", "Budget & timeline"];

const outputs = [
  { icon: MonitorSmartphone, label: "Website UI", detail: "SEO pages, landing flows, CMS-ready sections" },
  { icon: Smartphone, label: "Mobile App", detail: "Responsive web app or native-ready product flow" },
  { icon: ServerCog, label: "Backend API", detail: "Auth, roles, workflows, payments, integrations" },
  { icon: Database, label: "Database", detail: "Models, relations, storage, reporting structure" },
  { icon: Cloud, label: "Cloud & DevOps", detail: "Deployment, domains, backups, monitoring" },
  { icon: BrainCircuit, label: "AI Layer", detail: "Chatbots, automation, search, content assistance" },
  { icon: ShieldCheck, label: "Security & QA", detail: "Validation, permissions, device testing, launch checks" },
  { icon: LineChart, label: "Analytics & Growth", detail: "Events, reports, conversion signals, iteration roadmap" },
];

const buildStack = ["Next.js", "React", "TypeScript", "Node/API", "PostgreSQL", "Cloud", "AI tools", "Analytics"];

const pipeline = [
  {
    id: "01",
    title: "Brief intake",
    subtitle: "Business goal, users, content, data, budget",
    items: inputs,
  },
  {
    id: "02",
    title: "Product blueprint",
    subtitle: "Scope, journeys, priorities, architecture",
    items: ["Scope map", "Feature priority", "User journeys", "Data model"],
  },
  {
    id: "03",
    title: "Build system",
    subtitle: "UI, backend, database, cloud, AI, QA",
    items: outputs.map((output) => output.label),
  },
  {
    id: "04",
    title: "Launch loop",
    subtitle: "Release, monitor, support, improve",
    items: processSteps.map((step) => step.title),
  },
];

export const metadata = {
  title: "Process | CodeKraft",
  description: "See the CodeKraft delivery process from discovery and design through development, deployment, and support.",
};

export default function ProcessPage() {
  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="process" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="process-title">
        <p>&lt; process.flow /&gt;</p>
        <h1 id="process-title">A calm path from rough idea to shipped system.</h1>
        <span>
          Our process keeps decisions visible. You always know what is being
          designed, built, reviewed, shipped, and improved.
        </span>
      </section>

      <section className="ck-flow-diagram" aria-label="Animated CodeKraft delivery flow">
        <div className="ck-flow-copy">
          <p>From business idea to complete digital system.</p>
          <span>
            We do not only design screens. We connect content, interfaces,
            databases, APIs, cloud deployment, AI assistance, QA, and support
            into one clear build pipeline.
          </span>
        </div>

        <div className="ck-process-system">
          <div className="ck-process-rail" aria-label="CodeKraft build pipeline">
            <span className="ck-process-rail-line" aria-hidden="true" />
            <span className="ck-process-rail-stop stop-one" aria-hidden="true" />
            <span className="ck-process-rail-stop stop-two" aria-hidden="true" />
            <span className="ck-process-rail-stop stop-engine" aria-hidden="true" />
            <span className="ck-process-rail-stop stop-three" aria-hidden="true" />
            <span className="ck-process-rail-stop stop-four" aria-hidden="true" />
            <span className="ck-process-rail-packet" aria-hidden="true" />
            {pipeline.slice(0, 2).map((phase) => (
              <article key={phase.id} className="ck-process-node">
                <small>{phase.id}</small>
                <h2>{phase.title}</h2>
                <p>{phase.subtitle}</p>
                <div>
                  {phase.items.slice(0, 5).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
            <div className="ck-process-engine">
              <span className="ck-flow-pulse" />
              <div className="ck-process-mini-tesseract" aria-hidden="true">
                <TesseractHero scale={0.58} />
              </div>
              <CodeKraftLogoMark />
              <strong>CodeKraft</strong>
              <em>product engine</em>
            </div>
            {pipeline.slice(2).map((phase) => (
              <article key={phase.id} className="ck-process-node">
                <small>{phase.id}</small>
                <h2>{phase.title}</h2>
                <p>{phase.subtitle}</p>
                <div>
                  {phase.items.slice(0, 5).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="ck-process-layer-grid" aria-label="System layers delivered by CodeKraft">
            {outputs.map(({ icon: Icon, label, detail }) => (
              <article key={label}>
                <Icon size={18} />
                <div>
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="ck-process-stack" aria-label="Technology stack">
            {buildStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="ck-process-timeline" aria-label="CodeKraft process">
        {processSteps.map((step, index) => (
          <article key={step.title} className="ck-process-step">
            <div>
              <span>0{index + 1}</span>
              {index === 0 ? <GitBranch size={20} /> : index === processSteps.length - 1 ? <Rocket size={20} /> : <CheckCircle2 size={20} />}
            </div>
            <h2>{step.title}</h2>
            <p>{step.summary}</p>
            <code>{step.artifact}</code>
            <ul>
              {step.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="ck-process-console" aria-label="CodeKraft process console">
        <div>
          <span>codekraft pipeline</span>
          <strong>idea --&gt; system --&gt; launch --&gt; growth</strong>
        </div>
        <pre>{`const delivery = [
  "discover requirements",
  "design the interface system",
  "develop production modules",
  "deploy with QA",
  "support and improve"
]`}</pre>
      </section>
    </main>
  );
}
