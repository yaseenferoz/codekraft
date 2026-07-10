"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, Menu, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { BrandMark } from "@/components/common/BrandMark";
import { siteModules } from "@/lib/site-modules";

const whatsappNumber = "918073049854";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  function openTalkForm() {
    setIsOpen(false);
    setIsTalkOpen(true);
  }

  function closeTalkForm() {
    setIsTalkOpen(false);
  }

  function navigateMobile(path: string) {
    setIsOpen(false);
    router.push(path);
  }

  function isActivePath(path: string) {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  }

  function startWhatsappConversation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const name = visitorName.trim() || "there";
    const message = `Hi CodeKraft, my name is ${name}. I want to discuss a project.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setVisitorName("");
    setIsTalkOpen(false);
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
                className={`ck-nav-link ${isActivePath(item.path) ? "is-active" : ""}`}
              >
                &lt;{item.label}&gt;
              </Link>
          ))}
        </nav>
        <button type="button" className="ck-talk-button" onClick={openTalkForm}>
          let&apos;s talk_
          <span />
        </button>
        <button
          type="button"
          className="ck-mobile-nav-trigger"
          aria-label={isOpen ? "Close CodeKraft menu" : "Open CodeKraft menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
          <span>CK</span>
        </button>
      </header>
      <div className={`ck-mobile-os ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="ck-mobile-os-top">
          <div className="ck-mobile-os-brand">
            <BrandMark />
          </div>
            <button type="button" aria-label="Close mobile navigation" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
        </div>
        <nav className="ck-mobile-os-grid" aria-label="Mobile navigation">
          {siteModules.map((item, index) => (
              <button
                type="button"
                key={item.key}
                className={`ck-mobile-module ${isActivePath(item.path) ? "is-active" : ""}`}
                onClick={() => navigateMobile(item.path)}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}.tsx</strong>
                <small>{isActivePath(item.path) ? "active module" : "open module"}</small>
              </button>
          ))}
        </nav>
        <button type="button" className="ck-mobile-connect" onClick={openTalkForm}>
          <MessageCircle size={17} />
          <span>let&apos;s connect</span>
        </button>
      </div>
      <div className={`ck-whatsapp-dialog ${isTalkOpen ? "is-open" : ""}`} aria-hidden={!isTalkOpen}>
        <button
          type="button"
          className="ck-whatsapp-backdrop"
          aria-label="Close WhatsApp form"
          onClick={closeTalkForm}
        />
        <form className="ck-whatsapp-card" onSubmit={startWhatsappConversation}>
          <div className="ck-whatsapp-top">
            <span>
              <MessageCircle size={17} />
              whatsapp.start
            </span>
            <button type="button" aria-label="Close WhatsApp form" onClick={closeTalkForm}>
              <X size={17} />
            </button>
          </div>
          <label>
            <span>your name</span>
            <input
              value={visitorName}
              onChange={(event) => setVisitorName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
              autoFocus={isTalkOpen}
              required
            />
          </label>
          <button type="submit" className="ck-whatsapp-submit">
            start conversation
            <MessageCircle size={17} />
          </button>
        </form>
      </div>
    </>
  );
}
