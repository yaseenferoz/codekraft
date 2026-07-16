import Link from "next/link";
import { CodeKraftLogoMark } from "@/components/common/CodeKraftLogoMark";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="ck-site-footer">
      <div className="ck-footer-intro"><span className="ck-footer-logo"><CodeKraftLogoMark /></span><div><p>CodeKraft</p><small>Software engineering, custom platforms and focused SaaS products.</small></div></div>
      <div className="ck-footer-groups">
        <nav aria-label="Company"><strong>Company</strong><Link href="/about">About</Link><Link href="/portfolio">Work</Link><Link href="/process">Process</Link><Link href="/contact">Contact</Link></nav>
        <nav aria-label="Services"><strong>Services</strong><Link href="/services">Web Applications</Link><Link href="/services">Product Engineering</Link><Link href="/services">Cloud Solutions</Link><Link href="/services">AI Solutions</Link></nav>
        <nav aria-label="Products"><strong>Products</strong><Link href="/products/campuskraft">CampusKraft <em>In Development</em></Link><Link href="/products">Products Overview</Link><Link href="/roadmap">Product Vision</Link></nav>
        <nav aria-label="Legal"><strong>Legal</strong><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms &amp; Conditions</Link></nav>
        <address><strong>Contact</strong><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><a href="https://www.google.com/maps/search/?api=1&query=Kalaburagi%2C%20Karnataka%2C%20India">{siteConfig.location}</a></address>
      </div>
      <div className="ck-footer-bottom"><small>&copy; 2026 CodeKraft. All rights reserved.</small><small>CampusKraft is currently under development. Features and availability may change.</small></div>
    </footer>
  );
}
