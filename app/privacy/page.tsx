import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

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
    title: "CampusKraft Interest Information",
    tag: "product.discovery",
    body:
      "When an institution registers interest in CampusKraft, CodeKraft may collect contact details, institution information, approximate student count, areas of interest and operational challenges. This information is used for product discovery, communication and evaluating potential pilot or early-access participation.",
  },
  {
    id: "05",
    title: "Processors and Delivery Services",
    tag: "service.providers",
    body:
      "Submitted information may be processed by infrastructure, database, email-delivery, analytics or communication providers used to operate the website and respond to enquiries. These providers are used only where relevant to the website workflow.",
  },
  {
    id: "06",
    title: "Retention and Choices",
    tag: "retention.controls",
    body:
      "We retain enquiry information for as long as reasonably needed for communication, product discovery, project records or operational requirements. You may ask CodeKraft to review, correct or delete information, subject to legitimate record-keeping needs.",
  },
  {
    id: "07",
    title: "Cookies and Analytics",
    tag: "usage.signals",
    body:
      "The website may use essential browser storage and proportionate analytics or operational logs to understand performance and usage. CodeKraft does not use this policy to claim certifications or legal compliance that has not been formally established.",
  },
  {
    id: "08",
    title: "Contact",
    tag: "privacy.channel",
    body: `For privacy-related questions, contact CodeKraft at ${siteConfig.contactEmail} or ${siteConfig.phoneDisplay}.`,
  },
];

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CodeKraft privacy policy for website visitors, contact enquiries, and project communication.",
  alternates: { canonical: "https://www.codekraft.co.in/privacy" },
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
  contact: "yaseenferoz@codekraft.co.in"
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
