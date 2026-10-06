"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { soundManager } from "@/lib/sound";

export function CyberCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Smooth lerp towards cursor coordinates
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetX + t * 0.15,
        3,
        delta
      );
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -targetY,
        3,
        delta
      );

      // Subtle breathing float
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.6;
      ring1Ref.current.rotation.z += delta * 0.3;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.8;
      ring2Ref.current.rotation.x -= delta * 0.4;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.z -= delta * 0.5;
      ring3Ref.current.rotation.y += delta * 0.2;
    }

    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.4;
      coreRef.current.rotation.y = t * 0.5;
      const scale = (hovered ? 1.25 : 1.0) + Math.sin(t * 3) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group
      ref={groupRef}
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
      {/* Central Pulsing Quantum Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={hovered ? "#ff007f" : "#00f0ff"}
          emissive={hovered ? "#ff007f" : "#00f0ff"}
          emissiveIntensity={hovered ? 1.8 : 1.1}
          wireframe={false}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Hologram Aura around Core */}
      <mesh scale={hovered ? 1.4 : 1.15}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Ring 1 - Inner Gyroscope Ring (Cyan) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.5, 0.035, 16, 64]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </mesh>

      {/* Ring 2 - Middle Gyroscope Ring (Purple/Magenta) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.9, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={1.3}
          roughness={0.3}
        />
      </mesh>

      {/* Ring 3 - Outer Orbit Ring (Glowing Emerald / Neon Pink) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[2.3, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#00ff9d"
          emissive="#00ff9d"
          emissiveIntensity={1.0}
          wireframe
        />
      </mesh>

      {/* Ambient glowing core light */}
      <pointLight
        color={hovered ? "#ff007f" : "#00f0ff"}
        intensity={hovered ? 5 : 3}
        distance={6}
      />
    </group>
  );
}
