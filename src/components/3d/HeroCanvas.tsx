"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CyberCore } from "./CyberCore";
import { StarfieldParticles } from "./StarfieldParticles";
import { SkillsOrbit } from "./SkillsOrbit";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f0ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1.2} color="#ff007f" />
      <pointLight position={[0, 0, 0]} intensity={2.5} color="#00f0ff" distance={8} />

      <StarfieldParticles count={900} />
      <CyberCore />
      <SkillsOrbit />
    </>
  );
}

export default function HeroCanvas() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7.2], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
