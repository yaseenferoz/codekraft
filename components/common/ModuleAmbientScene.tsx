const glyphs = ["CK", "</>", "api", "db", "01", "cloud", "ui", "{ }", "ship"];

type ModuleAmbientSceneProps = {
  variant?: "about" | "services" | "work" | "process" | "contact" | "privacy";
};

export function ModuleAmbientScene({ variant = "about" }: ModuleAmbientSceneProps) {
  return (
    <div className={`ck-module-ambient ck-module-ambient-${variant}`} aria-hidden="true">
      <span className="ck-ambient-orbit orbit-one" />
      <span className="ck-ambient-orbit orbit-two" />
      <span className="ck-ambient-orbit orbit-three" />
      <span className="ck-ambient-beam beam-one" />
      <span className="ck-ambient-beam beam-two" />
      <div className="ck-ambient-glyphs">
        {glyphs.map((glyph, index) => (
          <span key={`${glyph}-${index}`}>{glyph}</span>
        ))}
      </div>
    </div>
  );
}
