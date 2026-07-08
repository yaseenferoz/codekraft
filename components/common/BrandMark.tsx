import Link from "next/link";
import { CodeKraftLogoMark } from "./CodeKraftLogoMark";

export function BrandMark() {
  return (
    <Link href="/" className="group flex items-center gap-4" aria-label="CodeKraft home">
      <span className="ck-brand-mark">
        <CodeKraftLogoMark />
      </span>
      <span className="leading-none">
        <span className="block text-xl font-black uppercase tracking-[0.18em] text-[var(--ck-text)]">
          CodeKraft
        </span>
        <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--ck-text-soft)]">
          Crafting digital experiences
        </span>
      </span>
    </Link>
  );
}
