import { PrimaryButton } from "@/components/buttons/PrimaryButton";
import { TypewriterHeadline } from "@/components/hero/TypewriterHeadline";

export function HeroCopy() {
  return (
    <div className="ck-hero-copy">
      <p className="ck-eyebrow">&lt; we build solutions /&gt;</p>
      <TypewriterHeadline />
      <p className="ck-hero-description">
        CodeKraft is a software development studio that builds powerful web
        applications, scalable systems, and beautiful digital products.
      </p>
      <PrimaryButton href="/contact">
        start a project
      </PrimaryButton>
    </div>
  );
}
