import type { CSSProperties } from "react";

const particles = [
  ["CK", "8%", "13%", "0s"],
  ["</>", "18%", "38%", "-7s"],
  ["Y", "28%", "18%", "-13s"],
  ["F", "39%", "72%", "-5s"],
  ["{ }", "52%", "24%", "-11s"],
  ["CK", "63%", "64%", "-17s"],
  ["</>", "74%", "16%", "-3s"],
  ["Y", "84%", "48%", "-19s"],
  ["F", "92%", "78%", "-9s"],
  ["01", "11%", "86%", "-15s"],
  ["<>", "46%", "91%", "-21s"],
  ["K", "69%", "88%", "-25s"],
  ["C", "96%", "28%", "-29s"],
  ["YF", "6%", "58%", "-23s"],
];

export function GlobalCodeParticles() {
  return (
    <div className="ck-global-particles" aria-hidden="true">
      {particles.map(([glyph, left, top, delay], index) => (
        <span
          key={`${glyph}-${index}`}
          style={{
            "--ck-particle-left": left,
            "--ck-particle-top": top,
            "--ck-particle-delay": delay,
          } as CSSProperties}
        >
          {glyph}
        </span>
      ))}
    </div>
  );
}
