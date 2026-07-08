const lines = [
  "const CodeKraft = {",
  "  passion: true,",
  '  solutions: "limitless",',
  '  impact: "forever"',
  "}",
];

export function CodeSnippet() {
  return (
    <div className="ck-code-snippet">
      <span className="ck-code-badge">&lt;/&gt;</span>
      {lines.map((line, index) => (
        <p key={line}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <code>{line}</code>
        </p>
      ))}
    </div>
  );
}
