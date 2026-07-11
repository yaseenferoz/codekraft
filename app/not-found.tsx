import Link from "next/link";
import { ArrowLeft, FolderSearch, Home, MessageCircle } from "lucide-react";
import { CodeKraftLogoMark } from "@/components/common/CodeKraftLogoMark";
import { ModuleAmbientScene } from "@/components/common/ModuleAmbientScene";
import { Navbar } from "@/components/navigation/Navbar";

export const metadata = {
  title: "404 | CodeKraft",
  description: "The requested CodeKraft module could not be found.",
};

export default function NotFound() {
  return (
    <main className="ck-module-shell ck-not-found-shell">
      <ModuleAmbientScene variant="work" />
      <Navbar />
      <section className="ck-not-found" aria-labelledby="not-found-title">
        <div className="ck-not-found-mark" aria-hidden="true">
          <CodeKraftLogoMark />
        </div>
        <p>&lt; route.notFound /&gt;</p>
        <h1 id="not-found-title">404: module missing.</h1>
        <span>
          We looked in production, staging, and the suspicious folder named
          final-final. This page still refused to exist.
        </span>

        <div className="ck-not-found-console" aria-label="404 diagnostic console">
          <div>
            <span>terminal</span>
            <strong>codekraft.os</strong>
          </div>
          <code>{`resolveRoute("/this-page")
=> null
suggestion:
  open home.module
  inspect work.index
  start contact.thread`}</code>
        </div>

        <nav className="ck-not-found-actions" aria-label="404 recovery links">
          <Link href="/">
            <Home size={18} />
            home.module
          </Link>
          <Link href="/portfolio">
            <FolderSearch size={18} />
            work.index
          </Link>
          <Link href="/contact">
            <MessageCircle size={18} />
            contact.thread
          </Link>
        </nav>

        <Link className="ck-not-found-back" href="/">
          <ArrowLeft size={18} />
          restore default route
        </Link>
      </section>
    </main>
  );
}
