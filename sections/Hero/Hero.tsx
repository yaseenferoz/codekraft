import { Navbar } from "@/components/navigation/Navbar";
import { HeroBackground } from "./HeroBackground";
import { HeroCanvas } from "./HeroCanvas";
import { HeroCopy } from "./HeroCopy";
import { TrustedBy } from "./TrustedBy";

export function Hero() {
  return (
    <section className="ck-home-shell">
      <HeroBackground />
      <Navbar />
      <section className="ck-hero-section">
        <HeroCopy />
        <HeroCanvas />
      </section>
      <TrustedBy />
    </section>
  );
}
