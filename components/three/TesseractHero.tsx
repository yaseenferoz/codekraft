"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Line } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import {
  AdditiveBlending,
  BackSide,
  CanvasTexture,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  SpriteMaterial,
  Vector3,
} from "three";

type Point3 = [number, number, number];
type TesseractHeroProps = {
  active?: boolean;
  drag?: {
    x: number;
    y: number;
  };
};

function seededValue(index: number, salt: number) {
  const value = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return value - Math.floor(value);
}

const connectorPoints = [
  [
    [-2.12, -2.12, -2.12],
    [-1.02, -1.02, -1.02],
  ],
  [
    [2.12, -2.12, -2.12],
    [1.02, -1.02, -1.02],
  ],
  [
    [-2.12, 2.12, -2.12],
    [-1.02, 1.02, -1.02],
  ],
  [
    [2.12, 2.12, -2.12],
    [1.02, 1.02, -1.02],
  ],
  [
    [-2.12, -2.12, 2.12],
    [-1.02, -1.02, 1.02],
  ],
  [
    [2.12, -2.12, 2.12],
    [1.02, -1.02, 1.02],
  ],
  [
    [-2.12, 2.12, 2.12],
    [-1.02, 1.02, 1.02],
  ],
  [
    [2.12, 2.12, 2.12],
    [1.02, 1.02, 1.02],
  ],
] satisfies Array<[Point3, Point3]>;

function createFaceTexture(mode: "logo" | "name") {
  const canvas = document.createElement("canvas");
  const size = 512;
  const context = canvas.getContext("2d");

  canvas.width = size;
  canvas.height = size;

  if (!context) {
    return new CanvasTexture(canvas);
  }

  context.clearRect(0, 0, size, size);
  const gradient = context.createRadialGradient(256, 256, 40, 256, 256, 260);
  gradient.addColorStop(0, "rgba(55, 201, 255, 0.2)");
  gradient.addColorStop(0.55, "rgba(79, 140, 255, 0.1)");
  gradient.addColorStop(1, "rgba(139, 92, 255, 0.02)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  context.strokeStyle = "rgba(99, 179, 255, 0.28)";
  context.lineWidth = 2;
  context.strokeRect(38, 38, size - 76, size - 76);

  if (mode === "name") {
    context.font = "900 58px Arial, sans-serif";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.letterSpacing = "4px";
    context.fillStyle = "#F8F9FC";
    context.shadowColor = "rgba(55, 201, 255, 0.85)";
    context.shadowBlur = 18;
    context.fillText("CODEKRAFT", 256, 256);
  } else {
    context.fillStyle = "#37C9FF";
    context.shadowColor = "rgba(55, 201, 255, 0.9)";
    context.shadowBlur = 24;

    // Draw the same visual idea as the navbar mark: an angular < paired with K.
    context.beginPath();
    context.moveTo(222, 106);
    context.lineTo(118, 256);
    context.lineTo(222, 406);
    context.lineTo(294, 406);
    context.lineTo(198, 256);
    context.lineTo(294, 106);
    context.closePath();
    context.fill();

    context.fillStyle = "#6B5CFF";
    context.beginPath();
    context.roundRect(312, 106, 64, 300, 4);
    context.fill();
    context.beginPath();
    context.moveTo(376, 244);
    context.lineTo(470, 106);
    context.lineTo(392, 106);
    context.lineTo(312, 222);
    context.lineTo(312, 290);
    context.lineTo(394, 406);
    context.lineTo(474, 406);
    context.lineTo(376, 268);
    context.closePath();
    context.fill();
  }

  const texture = new CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function useFaceMaterials(hovered: boolean) {
  const logoTexture = useMemo(() => createFaceTexture("logo"), []);
  const nameTexture = useMemo(() => createFaceTexture("name"), []);

  return useMemo(
    () =>
      Array.from({ length: 6 }, () => {
        const material = new MeshPhysicalMaterial({
          color: new Color("#5ac8ff"),
          map: hovered ? nameTexture : logoTexture,
          emissive: new Color(hovered ? "#566bff" : "#1bbcff"),
          emissiveIntensity: hovered ? 0.85 : 0.55,
          metalness: 0.08,
          roughness: 0.18,
          transmission: 0.5,
          transparent: true,
          opacity: hovered ? 0.82 : 0.72,
          side: DoubleSide,
        });

        return material;
      }),
    [hovered, logoTexture, nameTexture],
  );
}

function CodeGlyphField({ hovered }: { hovered: boolean }) {
  const glyphs = useMemo(() => ["C", "K", "<", "/", ">", "{", "}"], []);
  const sprites = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = 96;
        canvas.height = 96;

        if (context) {
          context.font = "700 46px Cascadia Code, monospace";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = index % 2 === 0 ? "#37C9FF" : "#8B5CFF";
          context.shadowColor = context.fillStyle;
          context.shadowBlur = 16;
          context.fillText(glyphs[index % glyphs.length], 48, 48);
        }

        const texture = new CanvasTexture(canvas);
        const material = new SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.42,
          blending: AdditiveBlending,
          depthWrite: false,
        });
        const angle = (index / 90) * Math.PI * 2;
        const radius = 2.7 + seededValue(index, 1) * 1.9;

        return {
          angle,
          radius,
          y: (seededValue(index, 2) - 0.5) * 4.2,
          speed: 0.08 + seededValue(index, 3) * 0.12,
          sprite: material,
          scale: 0.16 + seededValue(index, 4) * 0.18,
        };
      }),
    [glyphs],
  );

  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    const elapsed = clock.elapsedTime;

    if (group.current) {
      group.current.children.forEach((child, index) => {
        const item = sprites[index];
        const angle = item.angle + elapsed * item.speed;
        const radius = item.radius + (hovered ? 0.9 : 0);
        child.position.set(Math.cos(angle) * radius, item.y, Math.sin(angle) * radius);
        child.scale.setScalar(item.scale * (hovered ? 1.35 : 1));
      });
    }
  });

  return (
    <group ref={group}>
      {sprites.map((item, index) => (
        <sprite key={index} material={item.sprite} />
      ))}
    </group>
  );
}

function TesseractObject({ active = false, drag = { x: 0, y: 0 } }: TesseractHeroProps) {
  const group = useRef<Group>(null);
  const outer = useRef<Mesh>(null);
  const inner = useRef<Mesh>(null);
  const scaleTarget = useRef(new Vector3(1, 1, 1));
  const [hovered, setHovered] = useState(false);
  const isEngaged = hovered || active;
  const materials = useFaceMaterials(isEngaged);
  const shellMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: "#37C9FF",
        transparent: true,
        opacity: 0.055,
        side: BackSide,
        blending: AdditiveBlending,
      }),
    [],
  );

  useFrame(({ clock, pointer }) => {
    const elapsed = clock.elapsedTime;

    if (group.current) {
      const targetX = active
        ? MathUtils.clamp(drag.y * -0.014, -0.85, 0.85)
        : Math.sin(elapsed * 0.32) * 0.14 + pointer.y * 0.12;
      const targetY = active
        ? MathUtils.clamp(drag.x * 0.018, -1.1, 1.1)
        : elapsed * 0.16 + pointer.x * 0.18;
      const targetZ = active
        ? MathUtils.clamp(drag.x * 0.003, -0.18, 0.18)
        : Math.sin(elapsed * 0.22) * 0.07;

      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.09;
      group.current.rotation.y += (targetY - group.current.rotation.y) * 0.09;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.09;
      group.current.position.y = Math.sin(elapsed * 0.62) * 0.14;
      const scale = isEngaged ? 1.08 : 1;
      scaleTarget.current.set(scale, scale, scale);
      group.current.scale.lerp(scaleTarget.current, 0.08);
    }

    if (inner.current) {
      inner.current.rotation.x = -elapsed * 0.2;
      inner.current.rotation.y = elapsed * 0.26;
    }
  });

  return (
    <group
      ref={group}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <mesh ref={outer} material={materials}>
        <boxGeometry args={[3.4, 3.4, 3.4]} />
        <Edges color="#65d7ff" threshold={12} />
      </mesh>
      <mesh material={shellMaterial}>
        <boxGeometry args={[4.25, 4.25, 4.25]} />
        <Edges color={isEngaged ? "#a77cff" : "#4f8cff"} threshold={8} />
      </mesh>
      <mesh ref={inner}>
        <boxGeometry args={[2.05, 2.05, 2.05]} />
        <meshBasicMaterial color="#37C9FF" wireframe transparent opacity={0.2} />
      </mesh>
      {connectorPoints.map(([start, end], index) => (
        <Line
          key={index}
          points={[start, end]}
          color={isEngaged ? "#a77cff" : "#37c9ff"}
          transparent
          opacity={0.42}
          lineWidth={1}
        />
      ))}
      <CodeGlyphField hovered={isEngaged} />
    </group>
  );
}

export function TesseractHero({ active, drag }: TesseractHeroProps) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      camera={{ position: [0, 0, 7.4], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[4, 5, 5]} intensity={42} color="#37C9FF" />
      <pointLight position={[-5, -4, 4]} intensity={32} color="#8B5CFF" />
      <TesseractObject active={active} drag={drag} />
    </Canvas>
  );
}
