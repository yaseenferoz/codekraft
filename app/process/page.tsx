import {
  BrainCircuit,
  CheckCircle2,
  Cloud,
  Database,
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
];

const buildStack = ["Next.js", "React", "TypeScript", "Node/API", "PostgreSQL", "Cloud", "AI tools", "Analytics"];

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

        <div className="ck-flow-map">
          <div className="ck-flow-lane ck-flow-lane-input">
            <small>01 input</small>
            {inputs.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <div className="ck-flow-lane ck-flow-lane-plan">
            <small>02 planning</small>
            <span>Scope map</span>
            <span>Feature priority</span>
            <span>User journeys</span>
            <span>Data model</span>
          </div>

          <div className="ck-flow-center">
            <span className="ck-flow-pulse" />
            <CodeKraftLogoMark />
            <strong>CodeKraft</strong>
            <em>product engine</em>
          </div>

          <div className="ck-flow-lane ck-flow-lane-output">
            <small>03 system layers</small>
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

          <div className="ck-flow-lane ck-flow-lane-delivery">
            <small>04 delivery</small>
            {processSteps.map((step) => (
              <span key={step.title}>{step.title}</span>
            ))}
          </div>

          <div className="ck-flow-stack" aria-label="Technology stack">
            {buildStack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          <span className="ck-flow-line line-top" />
          <span className="ck-flow-line line-left" />
          <span className="ck-flow-line line-right" />
          <span className="ck-flow-line line-bottom" />
          <span className="ck-flow-packet packet-one" />
          <span className="ck-flow-packet packet-two" />
          <span className="ck-flow-packet packet-three" />
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
