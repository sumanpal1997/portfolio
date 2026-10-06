"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { soundManager } from "@/lib/sound";

const SKILL_NODES = [
  { name: "React.js", color: "#00f0ff", distance: 3.2, speed: 0.4, initialAngle: 0 },
  { name: "Next.js", color: "#9d4edd", distance: 3.5, speed: 0.35, initialAngle: (Math.PI * 2) / 7 },
  { name: "TypeScript", color: "#00ff9d", distance: 3.1, speed: 0.45, initialAngle: (Math.PI * 4) / 7 },
  { name: "Redux", color: "#ff007f", distance: 3.6, speed: 0.38, initialAngle: (Math.PI * 6) / 7 },
  { name: "Ant Design", color: "#00f0ff", distance: 3.3, speed: 0.42, initialAngle: (Math.PI * 8) / 7 },
  { name: "Node.js", color: "#9d4edd", distance: 3.4, speed: 0.36, initialAngle: (Math.PI * 10) / 7 },
  { name: "REST APIs", color: "#00ff9d", distance: 3.2, speed: 0.4, initialAngle: (Math.PI * 12) / 7 },
];

function OrbitNode({
  node,
  isPaused,
}: {
  node: (typeof SKILL_NODES)[0];
  isPaused: boolean;
}) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const angleRef = useRef(node.initialAngle);

  // Generate crisp 3D sprite texture without creating any ReactDOM roots (100% React 19 safe)
  const labelTexture = useMemo(() => {
    if (typeof document === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Background pill
    ctx.fillStyle = hovered ? "rgba(3, 7, 18, 0.95)" : "rgba(3, 7, 18, 0.8)";
    ctx.beginPath();
    ctx.roundRect(6, 6, 244, 52, 10);
    ctx.fill();

    // Border with neon glow
    ctx.lineWidth = hovered ? 3 : 1.5;
    ctx.strokeStyle = hovered ? "#00f0ff" : node.color;
    if (hovered) {
      ctx.shadowColor = "#00f0ff";
      ctx.shadowBlur = 8;
    }
    ctx.stroke();

    // Text
    ctx.font = "bold 22px 'Courier New', monospace, sans-serif";
    ctx.fillStyle = hovered ? "#ffffff" : "#e2e8f0";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.name, 128, 32);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    return texture;
  }, [node.name, node.color, hovered]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    if (!isPaused && !hovered) {
      angleRef.current += delta * node.speed;
    }
    const x = Math.cos(angleRef.current) * node.distance;
    const z = Math.sin(angleRef.current) * (node.distance * 0.7);
    const y = Math.sin(angleRef.current * 2) * 0.5;

    meshRef.current.position.set(x, y, z);
  });

  return (
    <group
      ref={meshRef}
      onPointerOver={() => {
        setHovered(true);
        if (typeof document !== "undefined") document.body.style.cursor = "pointer";
        soundManager.playHover();
      }}
      onPointerOut={() => {
        setHovered(false);
        if (typeof document !== "undefined") document.body.style.cursor = "auto";
      }}
      onClick={() => soundManager.playClick()}
    >
      {/* Node Sphere */}
      <mesh scale={hovered ? 1.4 : 1}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={hovered ? 2.0 : 1.2}
          roughness={0.2}
        />
      </mesh>

      {/* Halo Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.015, 8, 32]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.6} />
      </mesh>

      {/* Native WebGL 3D Billboard Sprite Badge (Zero React-DOM roots, completely immune to React 19 unmount bug) */}
      {labelTexture && (
        <sprite
          position={[0, 0.38, 0]}
          scale={hovered ? [1.05, 0.26, 1] : [0.9, 0.225, 1]}
        >
          <spriteMaterial
            map={labelTexture}
            transparent
            opacity={0.95}
            depthTest={false}
            depthWrite={false}
          />
        </sprite>
      )}
    </group>
  );
}

export function SkillsOrbit() {
  const [paused, setPaused] = useState(false);

  return (
    <group
      onPointerEnter={() => setPaused(false)}
      onPointerLeave={() => setPaused(false)}
    >
      {SKILL_NODES.map((node) => (
        <OrbitNode key={node.name} node={node} isPaused={paused} />
      ))}
    </group>
  );
}
