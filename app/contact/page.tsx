import Link from "next/link";
import { ArrowRight, Code2, GraduationCap, Mail, MapPin, Phone, UsersRound } from "lucide-react";
import type { Metadata } from "next";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { JsonContactForm } from "@/components/contact/JsonContactForm";
import { Navbar } from "@/components/navigation/Navbar";
import { contactMethods } from "@/lib/site-modules";

const icons = [Mail, Phone, MapPin];

export const metadata: Metadata = {
  title: { absolute: "Contact CodeKraft | Projects and CampusKraft Enquiries" },
  description: "Contact CodeKraft to discuss websites, web applications, e-commerce, ERP systems, and premium digital experiences.",
  keywords: [
    "contact CodeKraft",
    "hire website developer India",
    "website developer Gulbarga",
    "web app development enquiry",
    "software company Karnataka",
    "yaseenferoz@codekraft.co.in",
  ],
  alternates: { canonical: "https://www.codekraft.co.in/contact" },
  openGraph: { title: "Contact CodeKraft | Projects and CampusKraft Enquiries", description: "Discuss a custom software project or register institutional interest in CampusKraft.", url: "https://www.codekraft.co.in/contact", type: "website" },
  twitter: { card: "summary_large_image", title: "Contact CodeKraft", description: "Custom software projects and CampusKraft institutional enquiries." },
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
          <article className="ck-campuskraft-contact-card">
            <GraduationCap size={22} /><span>CampusKraft enquiry path</span><h2>Interested in CampusKraft?</h2><p>Schools, colleges, universities and educational organisations can register interest, share operational challenges or discuss possible product-discovery participation with CodeKraft.</p><div><Link href="/products/campuskraft#early-access">Register CampusKraft Interest <ArrowRight size={15} /></Link><Link href="/products/campuskraft">Explore CampusKraft</Link></div>
          </article>
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
