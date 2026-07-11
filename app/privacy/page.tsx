import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

const privacyItems = [
  {
    id: "01",
    title: "Information We Collect",
    tag: "input.schema",
    body:
      "When you contact CodeKraft, we may collect your name, email, phone number, project requirements, timeline, and any message you choose to share.",
  },
  {
    id: "02",
    title: "How We Use It",
    tag: "purpose.map",
    body:
      "We use submitted information only to respond to enquiries, discuss project scope, prepare proposals, and communicate about CodeKraft services.",
  },
  {
    id: "03",
    title: "Data Sharing",
    tag: "access.rules",
    body:
      "We do not sell personal information. We only share details when required to deliver a requested service or comply with legal obligations.",
  },
  {
    id: "04",
    title: "Contact",
    tag: "privacy.channel",
    body:
      "For privacy-related questions, contact CodeKraft at hello@codekraft.co.in or +91 80730 49854.",
  },
];

export const metadata = {
  title: "Privacy Policy | CodeKraft",
  description: "CodeKraft privacy policy for website visitors, contact enquiries, and project communication.",
};

export default function PrivacyPage() {
  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="privacy" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="privacy-title">
        <p>&lt; privacy.policy /&gt;</p>
        <h1 id="privacy-title">Privacy Policy</h1>
        <span>
          This page explains how CodeKraft handles information shared through
          the website, contact form, and project enquiries.
        </span>
      </section>

      <section className="ck-legal-panel" aria-label="CodeKraft privacy policy">
        <div className="ck-legal-console">
          <span>policy.json</span>
          <strong>privacy_guard: active</strong>
          <code>{`{
  collect: "project enquiry data",
  sellData: false,
  purpose: "reply, plan, deliver",
  contact: "hello@codekraft.co.in"
}`}</code>
        </div>
        <div className="ck-legal-grid">
          {privacyItems.map((item) => (
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
