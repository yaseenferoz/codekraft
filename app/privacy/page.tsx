import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

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

      <section className="ck-policy-panel">
        <article>
          <h2>Information We Collect</h2>
          <p>
            When you contact CodeKraft, we may collect your name, email, phone
            number, project requirements, timeline, and any message you choose
            to share.
          </p>
        </article>
        <article>
          <h2>How We Use It</h2>
          <p>
            We use submitted information only to respond to enquiries, discuss
            project scope, prepare proposals, and communicate about CodeKraft
            services.
          </p>
        </article>
        <article>
          <h2>Data Sharing</h2>
          <p>
            We do not sell personal information. We only share details when
            required to deliver a requested service or comply with legal
            obligations.
          </p>
        </article>
        <article>
          <h2>Contact</h2>
          <p>
            For privacy-related questions, contact CodeKraft at
            codekraftgulbarga@gmail.com or +91 80730 49854.
          </p>
        </article>
      </section>
    </main>
  );
}
