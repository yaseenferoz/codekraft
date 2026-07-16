"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, MessageCircle, Menu, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { BrandMark } from "@/components/common/BrandMark";
import { siteModules } from "@/lib/site-modules";

const whatsappNumber = "918073049854";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTalkOpen, setIsTalkOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [visitorName, setVisitorName] = useState("");
  const productsRef = useRef<HTMLDivElement>(null);
  const productsTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (productsRef.current && event.target instanceof Node && !productsRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (isProductsOpen) {
        setIsProductsOpen(false);
        productsTriggerRef.current?.focus();
      } else if (isOpen) {
        setIsOpen(false);
        mobileTriggerRef.current?.focus();
      } else if (isTalkOpen) {
        setIsTalkOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, isProductsOpen, isTalkOpen]);

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
          {siteModules.slice(1, -1).map((item) => (
              <Link
                key={item.key}
                href={item.path}
                className={`ck-nav-link ${isActivePath(item.path) ? "is-active" : ""}`}
              >
                &lt;{item.label}&gt;
              </Link>
          ))}
          <div
            ref={productsRef}
            className={`ck-products-nav ${isProductsOpen ? "is-open" : ""}`}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsProductsOpen(false);
            }}
          >
            <button
              ref={productsTriggerRef}
              type="button"
              className={`ck-nav-link ${isActivePath("/products") || isActivePath("/roadmap") ? "is-active" : ""}`}
              aria-haspopup="menu"
              aria-expanded={isProductsOpen}
              aria-controls="ck-products-menu"
              onClick={() => setIsProductsOpen((current) => !current)}
            >
              &lt;products&gt;
              <ChevronDown size={14} />
            </button>
            {isProductsOpen ? <div className="ck-products-menu" id="ck-products-menu" role="menu">
              <Link href="/products" role="menuitem" onClick={() => setIsProductsOpen(false)}>
                <span><strong>Products Overview</strong><small>Current focus and future directions</small></span>
                <em>View</em>
              </Link>
              <Link href="/products/campuskraft" role="menuitem" onClick={() => setIsProductsOpen(false)}>
                <span>
                  <strong>CampusKraft</strong>
                  <small>Education operations platform</small>
                </span>
                <em>Upcoming</em>
              </Link>
              <Link href="/roadmap" role="menuitem" onClick={() => setIsProductsOpen(false)}>
                <span><strong>Product Vision</strong><small>How CodeKraft decides what to build</small></span>
                <em>Roadmap</em>
              </Link>
            </div> : null}
          </div>
          <Link
            href="/contact"
            className={`ck-nav-link ${isActivePath("/contact") ? "is-active" : ""}`}
          >
            &lt;contact&gt;
          </Link>
        </nav>
        <button type="button" className="ck-talk-button" onClick={openTalkForm}>
          let&apos;s talk_
          <span />
        </button>
        <button
          ref={mobileTriggerRef}
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
                style={
                  {
                    "--ck-shine-delay": `${-(index * 0.58 + (index % 2 ? 0.17 : 0)).toFixed(2)}s`,
                  } as CSSProperties
                }
                onClick={() => navigateMobile(item.path)}
              >
                <span>0{index + 1}</span>
                <strong>{item.label}.tsx</strong>
                <small>{isActivePath(item.path) ? "active module" : "open module"}</small>
              </button>
          ))}
          <button
            type="button"
            className={`ck-mobile-module ck-mobile-product ${isActivePath("/products") && !isActivePath("/products/campuskraft") ? "is-active" : ""}`}
            onClick={() => navigateMobile("/products")}
          >
            <span>07</span><strong>products.tsx</strong><small>product overview</small>
          </button>
          <button
            type="button"
            className={`ck-mobile-module ck-mobile-product ${isActivePath("/products/campuskraft") ? "is-active" : ""}`}
            onClick={() => navigateMobile("/products/campuskraft")}
          >
            <span>08</span>
            <strong>CampusKraft.tsx</strong>
            <small>product / upcoming</small>
          </button>
          <button type="button" className={`ck-mobile-module ck-mobile-product ${isActivePath("/roadmap") ? "is-active" : ""}`} onClick={() => navigateMobile("/roadmap")}>
            <span>09</span><strong>roadmap.tsx</strong><small>product vision</small>
          </button>
        </nav>
        <button
          type="button"
          className="ck-mobile-connect"
          style={{ "--ck-shine-delay": "-2.15s" } as CSSProperties}
          onClick={openTalkForm}
        >
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
