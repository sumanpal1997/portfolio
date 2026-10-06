"use client";

import dynamic from "next/dynamic";
import { Zap, ArrowDown, Terminal, Sparkles, ExternalLink } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

// Dynamically import 3D HeroCanvas with ssr: false for seamless WebGL initialization
const HeroCanvas = dynamic(() => import("@/components/3d/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center text-cyan-400 font-mono text-xs gap-3">
      <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
      <span>INITIALIZING 3D QUANTUM CORE...</span>
    </div>
  ),
});

interface HeroSectionProps {
  onOpenRecruiterModal: () => void;
  onOpenTerminalModal: () => void;
}

export function HeroSection({
  onOpenRecruiterModal,
  onOpenTerminalModal,
}: HeroSectionProps) {
  const { profile } = PORTFOLIO_DATA;

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-12 overflow-hidden cyber-grid">
      {/* Radial neon glow backdrop */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Status HUD Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="tracking-widest uppercase">System Online • 60 FPS Target</span>
          </div>

          {/* Headline */}
          <div className="space-y-2">
            <h2 className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              // {profile.role}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Architecting{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-glow-cyan">
                Scalable UI
              </span>{" "}
              & High-Performance Web Apps.
            </h1>
          </div>

          {/* Bio statement */}
          <p className="text-base text-gray-300 max-w-xl leading-relaxed font-sans">
            Hi, I&apos;m <span className="text-white font-semibold">{profile.name}</span>. {profile.tagline}
          </p>

          {/* Recruiter & Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* The Recruiter Mode Button */}
            <button
              onClick={() => {
                soundManager.playWarp();
                onOpenRecruiterModal();
              }}
              className="relative group px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 p-[1px] font-mono text-xs font-bold cursor-pointer shadow-[0_0_30px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(255,0,127,0.6)] hover:scale-105 active:scale-95 transition-all"
            >
              <div className="px-5 py-3 rounded-xl bg-[#030712] flex items-center gap-2 group-hover:bg-[#030712]/70 transition-colors">
                <Zap className="w-4 h-4 text-yellow-300 animate-bounce" />
                <span className="text-white tracking-wider">⚡ RECRUITER SPEEDRUN (30s)</span>
              </div>
            </button>

            {/* Explore Projects Button */}
            <a
              href="#projects"
              onClick={() => soundManager.playClick()}
              className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs font-semibold border border-white/20 hover:border-cyan-400/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
            </a>

            {/* CLI Terminal Launcher */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminalModal();
              }}
              className="px-4 py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 font-mono text-xs border border-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer"
              title="Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal [Ctrl+K]</span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {profile.metrics.map((item) => (
              <div key={item.label} className="space-y-0.5">
                <div className="text-xl sm:text-2xl font-black font-mono text-white text-glow-cyan">
                  {item.value}
                </div>
                <div className="text-[11px] font-mono text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Holographic Artifact Canvas */}
        <div className="lg:col-span-6 h-[420px] sm:h-[500px] lg:h-[560px] w-full relative flex items-center justify-center">
          {/* Cyber Framing Brackets */}
          <div className="absolute inset-2 border border-cyan-500/20 rounded-2xl pointer-events-none cyber-corners" />

          {/* Top HUD Tag */}
          <div className="absolute top-4 left-6 z-20 pointer-events-none font-mono text-[10px] text-cyan-400/70 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>INTERACTIVE 3D QUANTUM CORE // DRAG TO ROTATE</span>
          </div>

          {/* Bottom HUD Tag */}
          <div className="absolute bottom-4 right-6 z-20 pointer-events-none font-mono text-[10px] text-purple-400/70">
            <span>ORBIT RADIUS: 3.5AU • COLLISION: ACTIVE</span>
          </div>

          {/* The R3F 3D Canvas */}
          <HeroCanvas />
        </div>
      </div>
    </section>
  );
}
