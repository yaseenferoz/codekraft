"use client";

import { useEffect } from "react";

const revealSelector = [
  ".ck-module-hero",
  ".ck-portfolio-hero",
  ".ck-featured-work",
  ".ck-about-matrix",
  ".ck-about-depth",
  ".ck-team-section",
  ".ck-service-grid",
  ".ck-service-lab",
  ".ck-module-cta",
  ".ck-portfolio-board",
  ".ck-case-hero",
  ".ck-case-panel",
  ".ck-case-grid",
  ".ck-case-delivery",
  ".ck-case-switcher",
  ".ck-flow-diagram",
  ".ck-process-timeline",
  ".ck-process-console",
  ".ck-contact-layout",
  ".ck-policy-panel",
  ".ck-social-row",
].join(",");

const spotlightSelector = [
  ".ck-work-preview-card",
  ".ck-portfolio-card",
  ".ck-case-screen",
  ".ck-case-story article",
  ".ck-case-grid article",
  ".ck-case-delivery-list article",
  ".ck-case-switcher a",
  ".ck-module-card",
  ".ck-service-card",
  ".ck-process-step",
  ".ck-contact-method",
  ".ck-team-card",
  ".ck-about-story article",
  ".ck-service-lab div",
  ".ck-policy-panel article",
  ".ck-flow-lane > span",
  ".ck-flow-lane-output article",
].join(",");

export function ContentMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.querySelectorAll<HTMLElement>(revealSelector).forEach((element) => {
      element.classList.add("ck-reveal");
    });

    if (reduceMotion.matches) {
      document.querySelectorAll<HTMLElement>(".ck-reveal").forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12,
      },
    );

    document.querySelectorAll<HTMLElement>(".ck-reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handlePointerMove(event: PointerEvent) {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(spotlightSelector) : null;

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      target.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
      target.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return null;
}
