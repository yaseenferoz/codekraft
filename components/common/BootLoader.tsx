"use client";

import type { CSSProperties } from "react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type BootModule = {
  label: string;
  status: string;
  glyphs: string[];
};

const bootModules: Record<string, BootModule> = {
  "/": {
    label: "home.module",
    status: "igniting digital craft",
    glyphs: ["C", "K", "</>", "{ }", "UI", "3D"],
  },
  "/about": {
    label: "about.module",
    status: "opening studio operating system",
    glyphs: ["CK", "UX", "QA", "DB", "AI", "{}"],
  },
  "/services": {
    label: "services.module",
    status: "compiling solution architecture",
    glyphs: ["API", "SEO", "ERP", "WEB", "APP", "</>"],
  },
  "/portfolio": {
    label: "work.module",
    status: "loading client archives",
    glyphs: ["01", "02", "UI", "CMS", "WEB", "LIVE"],
  },
  "/process": {
    label: "process.module",
    status: "routing delivery engine",
    glyphs: ["01", "02", "03", "04", "QA", "DB"],
  },
  "/contact": {
    label: "contact.module",
    status: "opening project brief console",
    glyphs: ["@", "+91", "JSON", "SEND", "AI", "{}"],
  },
  "/privacy": {
    label: "privacy.module",
    status: "validating data rules",
    glyphs: ["LOCK", "DATA", "POLICY", "CK", "QA", "{}"],
  },
  "/terms": {
    label: "terms.module",
    status: "syncing service protocol",
    glyphs: ["TERMS", "SCOPE", "SHIP", "CK", "QA", "{}"],
  },
};

function getBootModule(pathname: string): BootModule {
  if (pathname.startsWith("/portfolio/")) {
    return {
      label: "case-study.module",
      status: "opening project archive",
      glyphs: ["CASE", "LIVE", "UX", "SEO", "CK", "LINK"],
    };
  }

  return bootModules[pathname] ?? {
    label: "codekraft.module",
    status: "starting CodeKraft engine",
    glyphs: ["C", "K", "</>", "{ }", "AI", "DB"],
  };
}

const glyphOffsets = [
  ["-4.2rem", "-3.15rem"],
  ["1.9rem", "-3.55rem"],
  ["4.45rem", "-0.3rem"],
  ["2.3rem", "3.2rem"],
  ["-2.65rem", "3.05rem"],
  ["-4.55rem", "0.2rem"],
];

export function BootLoader() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const boot = getBootModule(pathname);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 1900);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="ck-boot-loader" role="status" aria-label="Loading CodeKraft">
      <div className="ck-boot-core">
        <div className="ck-boot-tesseract" aria-hidden="true">
          <span className="ck-boot-face ck-boot-face-front" />
          <span className="ck-boot-face ck-boot-face-back" />
          <span className="ck-boot-face ck-boot-face-top" />
          <span className="ck-boot-face ck-boot-face-side" />
          <span className="ck-boot-face ck-boot-face-left" />
          <span className="ck-boot-face ck-boot-face-bottom" />
          <span className="ck-boot-inner-cube" />
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className={`ck-boot-edge ck-boot-edge-${index + 1}`} />
          ))}
          <strong>CK</strong>
        </div>

        {boot.glyphs.map((glyph, index) => (
          <span
            key={glyph}
            className="ck-boot-glyph"
            style={
              {
                "--ck-i": index,
                "--ck-x": glyphOffsets[index]?.[0] ?? "0rem",
                "--ck-y": glyphOffsets[index]?.[1] ?? "0rem",
              } as CSSProperties
            }
          >
            {glyph}
          </span>
        ))}
      </div>

      <div className="ck-boot-copy">
        <strong>CodeKraft</strong>
        <em>{boot.label}</em>
        <span>{boot.status}</span>
      </div>
      <div className="ck-boot-progress" />
    </div>
  );
}
