"use client";

import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Languages, Heart } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

export function ExperienceSection() {
  const { experiences, education, languages, interests } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 relative cyber-dots">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Work Experience Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAREER TRAJECTORY & TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Engineering Track Record
          </h2>
          <p className="text-sm text-gray-400 font-mono">
            4+ years building scalable UI architectures, in-house enterprise HRMS products, and responsive web platforms.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundManager.playHover()}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Glowing Node on Timeline */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#030712] border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.8)] transition-all" />

              {/* Card Container */}
              <div className="p-6 rounded-2xl bg-[#060b1c] border border-cyan-500/20 group-hover:border-cyan-400/50 transition-all cyber-corners">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white font-mono group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-cyan-300 font-mono">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-gray-400 gap-1">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <ul className="space-y-2 mt-4 text-xs font-mono text-gray-300">
                  {exp.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/10">
                  {exp.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Foundation Section */}
        <div className="space-y-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            <GraduationCap className="w-4 h-4 text-yellow-300" />
            ACADEMIC QUALIFICATION & ENGINEERING FOUNDATION
          </div>

          <div
            onMouseEnter={() => soundManager.playHover()}
            className="p-6 rounded-2xl bg-[#060b1c] border border-cyan-500/20 hover:border-cyan-400/50 transition-all cyber-corners"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl font-bold text-white font-mono text-glow-cyan">
                  {education.degree}
                </h3>
                <div className="text-sm font-semibold text-cyan-300 font-mono mt-0.5">
                  {education.institution}
                </div>
              </div>

              <div className="flex flex-col sm:items-end text-xs font-mono text-gray-400 gap-1">
                <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  {education.period}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {education.location}
                </span>
              </div>
            </div>

            <ul className="space-y-2 mt-4 text-xs font-mono text-gray-300">
              {education.highlights.map((hl, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Languages & Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
          {/* Languages */}
          <div className="p-6 rounded-2xl bg-[#060b1c] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
              <Languages className="w-4 h-4" />
              LANGUAGES PROFICIENCY
            </div>
            <div className="space-y-3">
              {languages.map((lang) => (
                <div
                  key={lang.language}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs"
                >
                  <span className="text-white font-bold">{lang.language}</span>
                  <span className="text-cyan-400 text-[11px]">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="p-6 rounded-2xl bg-[#060b1c] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-pink-400 uppercase">
              <Heart className="w-4 h-4" />
              AREAS OF INTEREST
            </div>
            <p className="text-xs text-gray-400 font-mono">
              Beyond engineering clean interfaces and writing maintainable code:
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-300 font-mono text-xs flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
