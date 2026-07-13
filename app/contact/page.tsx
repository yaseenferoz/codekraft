import Link from "next/link";
import { Code2, Mail, MapPin, Phone, UsersRound } from "lucide-react";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { JsonContactForm } from "@/components/contact/JsonContactForm";
import { Navbar } from "@/components/navigation/Navbar";
import { contactMethods } from "@/lib/site-modules";

const icons = [Mail, Phone, MapPin];

export const metadata = {
  title: "Contact",
  description: "Contact CodeKraft to discuss websites, web applications, e-commerce, ERP systems, and premium digital experiences.",
  keywords: [
    "contact CodeKraft",
    "hire website developer India",
    "website developer Gulbarga",
    "web app development enquiry",
    "software company Karnataka",
    "hello@codekraft.co.in",
  ],
};

export default function ContactPage() {
  return (
    <main className="ck-module-shell">
      <ModuleAmbientScene variant="contact" />
      <Navbar />
      <section className="ck-module-hero" aria-labelledby="contact-title">
        <p>&lt; contact.terminal /&gt;</p>
        <h1 id="contact-title">Let&apos;s build something precise, useful, and memorable.</h1>
        <span>
          Share the idea, the problem, or the messy version in your head. We
          will help turn it into a clear product path.
        </span>
      </section>

      <section className="ck-contact-layout" aria-label="Contact CodeKraft">
        <div className="ck-contact-stack">
          {contactMethods.map((method, index) => {
            const Icon = icons[index];

            return (
              <Link key={method.label} href={method.href} className="ck-contact-method">
                <Icon size={21} />
                <span>{method.label}</span>
                <strong>{method.value}</strong>
              </Link>
            );
          })}
          <div className="ck-social-row" aria-label="Social links">
            <Link href="https://github.com/yaseenferoz" target="_blank" rel="noreferrer">
              <Code2 size={18} />
              GitHub
            </Link>
            <Link href="https://www.linkedin.com/in/yaseen-feroz/" target="_blank" rel="noreferrer">
              <UsersRound size={18} />
              LinkedIn
            </Link>
          </div>
        </div>

        <JsonContactForm />
      </section>
    </main>
  );
}
