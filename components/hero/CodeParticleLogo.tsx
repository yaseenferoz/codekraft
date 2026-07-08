"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  originX: number;
  originY: number;
  burstX: number;
  burstY: number;
  rayLength: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  phase: number;
  glyph: string;
};

const glyphs = ["C", "K", "<", "/", ">"];
const particleColors = [
  "rgba(76, 205, 255, 0.96)",
  "rgba(89, 151, 255, 0.92)",
  "rgba(128, 104, 255, 0.9)",
  "rgba(174, 122, 255, 0.84)",
];

function easeOutExpo(value: number) {
  return value === 1 ? 1 : 1 - 2 ** (-10 * value);
}

function drawLogoMask(context: CanvasRenderingContext2D, width: number, height: number) {
  const markWidth = width * 0.64;
  const markHeight = height * 0.42;
  const scale = Math.min(markWidth / 96, markHeight / 64);
  const offsetX = width / 2 - (96 * scale) / 2;
  const offsetY = height / 2 - (64 * scale) / 2;
  const cPath = new Path2D(
    "M39.5 8H22.2L6 32l16.2 24h17.3L25.8 42.4 18.6 32l7.2-10.4L39.5 8Z",
  );
  const kPath = new Path2D(
    "M43.5 8h14.1v17.2L74.7 8h17.1L67.4 32l24.4 24H74.7L57.6 38.8V56H43.5V8Z",
  );

  context.save();
  context.translate(offsetX, offsetY);
  context.scale(scale, scale);
  context.fillStyle = "#ffffff";
  context.fill(cPath);
  context.fill(kPath);
  context.restore();
}

function createTargets(width: number, height: number) {
  const offscreen = document.createElement("canvas");
  const scale = Math.min(window.devicePixelRatio || 1, 1.5);
  offscreen.width = width * scale;
  offscreen.height = height * scale;

  const context = offscreen.getContext("2d");

  if (!context) {
    return [];
  }

  context.scale(scale, scale);
  context.clearRect(0, 0, width, height);
  drawLogoMask(context, width, height);

  const image = context.getImageData(0, 0, offscreen.width, offscreen.height);
  const targets: Array<{ x: number; y: number }> = [];
  const step = Math.max(4, Math.floor(width / 190));

  for (let y = 0; y < offscreen.height; y += step * scale) {
    for (let x = 0; x < offscreen.width; x += step * scale) {
      const alpha = image.data[(y * offscreen.width + x) * 4 + 3];

      if (alpha > 80) {
        targets.push({ x: x / scale, y: y / scale });
      }
    }
  }

  return targets;
}

export function CodeParticleLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const activeCanvas = canvas;
    const activeContext = context;
    let frame = 0;
    let animation = 0;
    let particles: Particle[] = [];
    let lastTime = 0;
    const startedAt = performance.now();

    function resize() {
      const rect = activeCanvas.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);

      activeCanvas.width = Math.floor(rect.width * scale);
      activeCanvas.height = Math.floor(rect.height * scale);
      activeContext.setTransform(scale, 0, 0, scale, 0, 0);

      const targets = createTargets(rect.width, rect.height);
      const count = Math.min(820, targets.length);

      particles = Array.from({ length: count }, (_, index) => {
        const target = targets[Math.floor((index / count) * targets.length)];
        const angle = (index / count) * Math.PI * 2;
        const fanAngle = -Math.PI * 0.9 + (index / count) * Math.PI * 0.8;
        const radius = Math.max(rect.width, rect.height) * (0.18 + Math.random() * 0.18);
        const rayLength = Math.max(rect.width, rect.height) * (0.18 + Math.random() * 0.42);
        const originX = rect.width / 2 + Math.cos(angle) * radius;
        const originY = rect.height / 2 + Math.sin(angle) * radius;
        const rayOriginX = rect.width * 0.5;
        const rayOriginY = rect.height * 0.78;
        const burstX = rayOriginX + Math.cos(fanAngle) * rayLength;
        const burstY = rayOriginY + Math.sin(fanAngle) * rayLength * 0.78;

        return {
          x: originX,
          y: originY,
          originX,
          originY,
          burstX,
          burstY,
          rayLength,
          targetX: target.x,
          targetY: target.y,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          size: Math.random() * 1.8 + 1.9,
          color: particleColors[index % particleColors.length],
          phase: Math.random() * Math.PI * 2,
          glyph: glyphs[index % glyphs.length],
        };
      });
    }

    function drawLogoAura(width: number, height: number, time: number) {
      const pulse = 0.5 + Math.sin(time / 760) * 0.5;
      const gradient = activeContext.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.04,
        width * 0.5,
        height * 0.5,
        width * 0.34,
      );

      gradient.addColorStop(0, `rgba(64, 157, 255, ${0.14 + pulse * 0.035})`);
      gradient.addColorStop(0.48, "rgba(104, 92, 255, 0.08)");
      gradient.addColorStop(1, "rgba(139, 92, 255, 0)");

      activeContext.fillStyle = gradient;
      activeContext.beginPath();
      activeContext.arc(width * 0.5, height * 0.5, width * 0.46, 0, Math.PI * 2);
      activeContext.fill();
    }

    function draw(time: number) {
      if (time - lastTime < 28) {
        animation = requestAnimationFrame(draw);
        return;
      }

      lastTime = time;

      const rect = activeCanvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const elapsed = time - startedAt;
      const formProgress = easeOutExpo(Math.min(elapsed / 2200, 1));
      const drift = Math.sin(time / 1600) * 0.9;
      hoverRef.current += ((activeCanvas.matches(":hover") ? 1 : 0) - hoverRef.current) * 0.08;
      const hover = hoverRef.current;
      const pointer = pointerRef.current;

      activeContext.clearRect(0, 0, width, height);
      drawLogoAura(width, height, time);

      activeContext.save();
      activeContext.globalCompositeOperation = "screen";

      if (hover > 0.02) {
        const rayOriginX = width * (0.5 + (pointer.x - 0.5) * 0.05);
        const rayOriginY = height * (0.78 + (pointer.y - 0.5) * 0.04);

        activeContext.save();
        activeContext.globalAlpha = hover * 0.48;
        activeContext.lineWidth = 1;
        particles.forEach((particle, index) => {
          if (index % 2 !== 0) {
            return;
          }

          activeContext.strokeStyle =
            index % 4 === 0
              ? "rgba(76, 205, 255, 0.38)"
              : "rgba(174, 122, 255, 0.28)";
          activeContext.beginPath();
          activeContext.moveTo(rayOriginX, rayOriginY);
          activeContext.lineTo(particle.x, particle.y);
          activeContext.stroke();
        });
        activeContext.restore();
      }

      particles.forEach((particle, index) => {
        const breathing = Math.sin(time / 900 + particle.phase) * 2.2;
        const orbit = Math.sin(time / 1600 + index * 0.04) * (1 - formProgress) * 4;
        const bloomX = particle.burstX + (pointer.x - 0.5) * 42;
        const bloomY = particle.burstY + (pointer.y - 0.5) * 30;
        const formedX =
          particle.targetX +
          Math.sin(time / 1300 + particle.phase) * drift +
          breathing * 0.35;
        const formedY =
          particle.targetY +
          Math.cos(time / 1400 + particle.phase) * drift +
          breathing * 0.25;
        const targetX = formedX + (bloomX - formedX) * hover;
        const targetY = formedY + (bloomY - formedY) * hover;

        particle.x += (targetX - particle.x) * (0.065 + formProgress * 0.026) + particle.vx + orbit * 0.002;
        particle.y += (targetY - particle.y) * (0.065 + formProgress * 0.026) + particle.vy;

        activeContext.globalAlpha = 0.66 + formProgress * 0.24 + hover * 0.08 + Math.sin(time / 420 + particle.phase) * 0.08;
        activeContext.fillStyle = particle.color;

        activeContext.font = `${particle.size * (hover > 0.2 ? 4.3 : 3.6)}px Cascadia Code, monospace`;
        activeContext.fillText(particle.glyph, particle.x, particle.y);
      });

      activeContext.globalAlpha = 1;
      activeContext.restore();

      frame += 1;
      if (hover < 0.15 && frame % 2 === 0) {
        activeContext.strokeStyle = "rgba(77, 176, 255, 0.05)";
        activeContext.lineWidth = 1;
        particles.slice(0, 42).forEach((particle, index) => {
          const next = particles[(index * 13) % particles.length];
          const distance = Math.hypot(particle.x - next.x, particle.y - next.y);

          if (distance < 86) {
            activeContext.beginPath();
            activeContext.moveTo(particle.x, particle.y);
            activeContext.lineTo(next.x, next.y);
            activeContext.stroke();
          }
        });
      }

      animation = requestAnimationFrame(draw);
    }

    resize();
    animation = requestAnimationFrame(draw);
    function handlePointerMove(event: PointerEvent) {
      const rect = activeCanvas.getBoundingClientRect();
      pointerRef.current = {
        x: (event.clientX - rect.left) / rect.width,
        y: (event.clientY - rect.top) / rect.height,
      };
    }

    activeCanvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animation);
      activeCanvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ck-particle-logo" />;
}
