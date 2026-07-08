type CodeKraftLogoMarkProps = {
  className?: string;
};

export function CodeKraftLogoMark({ className }: CodeKraftLogoMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 64"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="ck-logo-blue" x1="6" x2="42" y1="8" y2="56">
          <stop offset="0%" stopColor="#37C9FF" />
          <stop offset="58%" stopColor="#4F8CFF" />
          <stop offset="100%" stopColor="#6B5CFF" />
        </linearGradient>
        <linearGradient id="ck-logo-violet" x1="42" x2="92" y1="8" y2="56">
          <stop offset="0%" stopColor="#37C9FF" />
          <stop offset="48%" stopColor="#6B5CFF" />
          <stop offset="100%" stopColor="#8B5CFF" />
        </linearGradient>
      </defs>
      <path
        className="ck-logo-c"
        d="M39.5 8H22.2L6 32l16.2 24h17.3L25.8 42.4 18.6 32l7.2-10.4L39.5 8Z"
      />
      <path
        className="ck-logo-k"
        d="M43.5 8h14.1v17.2L74.7 8h17.1L67.4 32l24.4 24H74.7L57.6 38.8V56H43.5V8Z"
      />
    </svg>
  );
}
