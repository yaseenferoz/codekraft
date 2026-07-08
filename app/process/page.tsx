import { CheckCircle2, GitBranch, Rocket } from "lucide-react";
import { CodeKraftLogoMark } from "@/components/common/CodeKraftLogoMark";
import { Navbar } from "@/components/navigation/Navbar";
import { processSteps } from "@/lib/site-modules";

export const metadata = {
  title: "Process | CodeKraft",
  description: "See the CodeKraft delivery process from discovery and design through development, deployment, and support.",
};

export default function ProcessPage() {
  return (
    <main className="ck-module-shell">
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
          <p>Connect every moving part.</p>
          <span>
            Strategy, design, development, launch, and support move through one
            connected delivery system.
          </span>
        </div>

        <div className="ck-flow-map">
          <div className="ck-flow-row is-top">
            <span>Scope</span>
            <span>Interface System</span>
            <span>Build Queue</span>
            <span>Launch Plan</span>
          </div>

          <div className="ck-flow-side is-left">
            <span>Client Brief</span>
            <span>Existing Website</span>
            <span>Business Workflow</span>
          </div>

          <div className="ck-flow-center">
            <span className="ck-flow-pulse" />
            <CodeKraftLogoMark />
            <strong>CodeKraft</strong>
          </div>

          <div className="ck-flow-side is-right">
            <span>Web App</span>
            <span>CMS / Content</span>
            <span>Analytics</span>
          </div>

          <div className="ck-flow-row is-bottom">
            {processSteps.map((step) => (
              <span key={step.title}>{step.title}</span>
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
