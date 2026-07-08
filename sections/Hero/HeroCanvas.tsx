"use client";

import { CodeSnippet } from "@/components/code/CodeSnippet";
import { TesseractHero } from "@/components/three/TesseractHero";
import type { CSSProperties, PointerEvent } from "react";
import { useRef, useState } from "react";

const tags = [
  ["< clean code />", "ck-tag-clean"],
  ["< ui/ux design />", "ck-tag-design"],
  ["< scalable />", "ck-tag-scalable"],
  ["< performance />", "ck-tag-performance"],
  ["< innovation />", "ck-tag-innovation"],
];

export function HeroCanvas() {
  const [motion, setMotion] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  const [touchControl, setTouchControl] = useState({ active: false, x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setMotion({
      x: x * 28,
      y: y * 22,
      rotateX: y * -5,
      rotateY: x * 7,
    });

    if (touchControl.active) {
      setTouchControl({
        active: true,
        x: event.clientX - dragStart.current.x,
        y: event.clientY - dragStart.current.y,
      });
    }
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    dragStart.current = { x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    setTouchControl({ active: true, x: 0, y: 0 });
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setTouchControl({ active: false, x: 0, y: 0 });
  }

  function handlePointerLeave() {
    setMotion({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
    setTouchControl({ active: false, x: 0, y: 0 });
  }

  const style = {
    "--ck-visual-x": `${motion.x}px`,
    "--ck-visual-y": `${motion.y}px`,
    "--ck-visual-rx": `${motion.rotateX}deg`,
    "--ck-visual-ry": `${motion.rotateY}deg`,
  } as CSSProperties;

  return (
    <div
      className="ck-hero-canvas"
      style={style}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerLeave}
    >
      <div className="ck-tesseract-stage" aria-label="Floating CodeKraft tesseract animation">
        <TesseractHero active={touchControl.active} drag={touchControl} />
        <div className="ck-logo-orbit" />
      </div>
      {tags.map(([label, className]) => (
        <span key={label} className={`ck-hero-tag ${className}`}>
          {label}
        </span>
      ))}
      <CodeSnippet />
      <div className="ck-right-measure" />
    </div>
  );
}
