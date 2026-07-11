import type { CSSProperties } from "react";

const signalLines = [
  {
    before: "We craft",
    accent: "digital",
    after: "systems",
  },
  {
    before: "with clarity,",
    accent: "taste,",
    after: "and motion.",
  },
];

export function TypewriterHeadline() {
  return (
    <h1 className="ck-hero-heading ck-hero-heading-signal">
      <span className="ck-visually-hidden">
        We craft digital systems with clarity, taste, and motion.
      </span>
      <span className="ck-hero-signal-shell" aria-hidden="true">
        <span className="ck-hero-signal-tag">&lt;build.signal /&gt;</span>
        {signalLines.map((line, index) => (
          <span
            key={line.before}
            className="ck-hero-signal-line"
            style={{ "--ck-delay": `${index * 150}ms` } as CSSProperties}
          >
            <span>{line.before}</span>
            <span className="ck-word-accent">{line.accent}</span>
            <span>{line.after}</span>
          </span>
        ))}
        <span className="ck-hero-signal-scan" />
      </span>
    </h1>
  );
}
