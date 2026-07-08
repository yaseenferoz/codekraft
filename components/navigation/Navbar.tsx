"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Power, Terminal, X } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/common/BrandMark";
import { siteModules } from "@/lib/site-modules";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  function openAssistant() {
    setIsOpen(false);
    window.dispatchEvent(new Event("ck:open-chat"));
  }

  return (
    <>
      <header className="ck-navbar">
        <BrandMark />
        <nav className="ck-desktop-nav" aria-label="Primary navigation">
          <Link href="/" className={`ck-nav-link ${pathname === "/" ? "is-active" : ""}`}>
            &lt;home&gt;
          </Link>
          {siteModules.slice(1).map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`ck-nav-link ${pathname === item.path ? "is-active" : ""}`}
              >
                &lt;{item.label}&gt;
              </Link>
          ))}
        </nav>
        <button type="button" className="ck-talk-button" onClick={openAssistant}>
          let&apos;s talk_
          <span />
        </button>
        <button
          type="button"
          className="ck-mobile-nav-trigger"
          aria-label={isOpen ? "Close CodeKraft OS menu" : "Open CodeKraft OS menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
          <span>OS</span>
        </button>
      </header>
      <div className={`ck-mobile-os ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="ck-mobile-os-top">
          <span>
            <Power size={14} />
            codekraft.os
          </span>
          <button type="button" aria-label="Close mobile navigation" onClick={() => setIsOpen(false)}>
            <X size={18} />
          </button>
        </div>
        <nav className="ck-mobile-os-grid" aria-label="Mobile navigation">
          {siteModules.map((item, index) => (
              <Link
                key={item.key}
                href={item.path}
                className={`ck-mobile-module ${pathname === item.path ? "is-active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}.tsx</strong>
                <small>{pathname === item.path ? "active module" : "open module"}</small>
              </Link>
          ))}
        </nav>
        <button type="button" className="ck-mobile-terminal" onClick={openAssistant}>
          <Terminal size={16} />
          <span>open codekraft.ai</span>
        </button>
      </div>
    </>
  );
}
