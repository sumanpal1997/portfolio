"use client";

import { useState } from "react";
import { Cpu, Terminal, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

export function SkillsSection() {
  const { skillCategories } = PORTFOLIO_DATA;
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  return (
    <section id="skills" className="py-24 relative cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING ARSENAL & SYSTEMS MATRIX</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Battle-Tested Technical Proficiencies
          </h2>
          <p className="text-sm text-gray-400 font-mono">
            From scalable React architecture and Redux Toolkit state management to 40% performance gains via code optimization.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {skillCategories.map((cat, idx) => (
            <button
              key={cat.title}
              onClick={() => {
                soundManager.playClick();
                setActiveCategoryIndex(idx);
              }}
              className={`px-4 sm:px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all cursor-pointer border ${
                activeCategoryIndex === idx
                  ? "bg-cyan-500 text-black border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                  : "bg-white/[0.03] text-gray-400 border-white/10 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories[activeCategoryIndex].skills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => soundManager.playHover()}
              className="p-5 rounded-xl bg-[#060a1c] border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-300 group hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-125 transition-transform" />
                  <span className="font-mono text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-cyan-400">
                  {skill.level}%
                </span>
              </div>

              {/* Glowing Progress Bar */}
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 group-hover:brightness-125"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {skill.highlight && (
                <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" /> Production Core Mastery
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/10">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="text-cyan-400 font-mono text-xs font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300" /> 40% PERFORMANCE BOOST
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              Track record of speeding up applications by 40% using code optimization, lazy loading, skeleton loaders, and asset minification.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="text-purple-400 font-mono text-xs font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400" /> 100% DESIGN FIDELITY
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              Seamlessly converting complex Figma and Adobe XD mockups into pixel-perfect, responsive components using Ant Design and Tailwind CSS.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
            <div className="text-emerald-400 font-mono text-xs font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> SCALABLE STATE & APIS
            </div>
            <p className="text-xs text-gray-300 font-mono leading-relaxed">
              Clean modular state management with Redux Toolkit, reactive hooks, robust RESTful API integration, and Jest testing suites.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
