"use client";

import { useEffect, useState } from "react";
import { CodeKraftLogoMark } from "./CodeKraftLogoMark";

export function BootLoader() {
  const [visible, setVisible] = useState(true);

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
        <span className="ck-boot-logo">
          <CodeKraftLogoMark />
        </span>
        <span className="ck-boot-ring" />
      </div>
      <div className="ck-boot-copy">
        <strong>CodeKraft OS</strong>
        <span>initializing home.module</span>
      </div>
      <div className="ck-boot-progress" />
    </div>
  );
}
