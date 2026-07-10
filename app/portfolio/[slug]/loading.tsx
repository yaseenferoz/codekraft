import { Navbar } from "@/components/navigation/Navbar";

export default function CaseStudyLoading() {
  return (
    <main className="ck-portfolio-shell ck-case-shell">
      <Navbar />
      <section className="ck-case-loading" aria-label="Loading case study">
        <div className="ck-case-loading-orbit" />
        <p>&lt; loading.case /&gt;</p>
        <h1>Opening work module</h1>
        <span>Preparing CodeKraft case study...</span>
      </section>
    </main>
  );
}
