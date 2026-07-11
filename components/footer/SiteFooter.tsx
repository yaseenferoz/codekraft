import Link from "next/link";
import { CodeKraftLogoMark } from "@/components/common/CodeKraftLogoMark";

export function SiteFooter() {
  return (
    <footer className="ck-site-footer">
      <div>
        <span className="ck-footer-logo">
          <CodeKraftLogoMark />
        </span>
        <p>CodeKraft</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms &amp; Conditions</Link>
      </nav>
      <small>&copy; 2026 CodeKraft. All rights reserved.</small>
    </footer>
  );
}
