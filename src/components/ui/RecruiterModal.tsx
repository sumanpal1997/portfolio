"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Zap,
  Briefcase,
  Mail,
  Sparkles,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

interface RecruiterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecruiterModal({ isOpen, onClose }: RecruiterModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const { profile, projects, skillCategories, education } = PORTFOLIO_DATA;

  useEffect(() => {
    if (isOpen) {
      soundManager.playWarp();
      // Cyber confetti celebration!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#00f0ff", "#ff007f", "#9d4edd", "#00ff9d"],
      });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    soundManager.playSuccess();
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(profile.phone);
    setCopiedPhone(true);
    soundManager.playSuccess();
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleDownloadResume = () => {
    soundManager.playSuccess();
    const link = document.createElement("a");
    link.href = "#";
    link.setAttribute("download", `Suman_Kumar_Pal_Resume.pdf`);
    document.body.appendChild(link);
    alert("📄 Suman Kumar Pal's resume ready. You can place your custom PDF in public/resume.pdf to link direct download.");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl transition-all">
      <div
        className="relative w-full max-w-4xl bg-[#070b1a] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden my-auto cyber-corners"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cyber Scan Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-[#0b132b] to-purple-950/80 px-6 py-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <Zap className="w-4 h-4 text-yellow-300" />
            </span>
            <div>
              <h2 className="text-sm font-mono font-bold tracking-wider text-cyan-300">
                RECRUITER SPEEDRUN // EXECUTIVE DOSSIER
              </h2>
              <p className="text-xs text-gray-400 font-mono">
                Optimized 30-second candidate evaluation view
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Candidate Quick Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready to Start
                </span>
                <span className="flex items-center gap-1 text-xs font-mono text-gray-400">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {profile.location}
                </span>
              </div>
              <p className="text-sm text-cyan-400 font-mono mt-1 font-semibold">{profile.role}</p>
              <p className="text-xs text-gray-300 mt-2 max-w-xl leading-relaxed">
                {profile.shortBio}
              </p>
            </div>

            {/* Instant Actions */}
            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
              <button
                onClick={handleDownloadResume}
                className="px-4 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD RESUME
              </button>
              <button
                onClick={handleCopyEmail}
                className="px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer hover:border-cyan-400/50"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">EMAIL COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-400" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
              <button
                onClick={handleCopyPhone}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-300 font-mono text-xs flex items-center justify-center gap-2 border border-cyan-500/20 transition-all cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">PHONE COPIED!</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{profile.phone}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {profile.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-center"
              >
                <div className="text-xl sm:text-2xl font-black font-mono text-glow-cyan text-cyan-400">
                  {metric.value}
                </div>
                <div className="text-[11px] font-mono text-gray-400 mt-1">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Top 3 Flagship Projects */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-purple-400 uppercase">
              <Briefcase className="w-4 h-4" />
              Flagship Project Impact (30-Second Summary)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {projects.slice(0, 3).map((p) => (
                <div
                  key={p.id}
                  className="p-4 rounded-xl bg-black/40 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">
                        {p.title}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                        {p.category}
                      </span>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 font-mono leading-tight">
                      {p.tagline}
                    </p>
                    <div className="my-2.5 p-2 rounded bg-cyan-950/40 border border-cyan-500/20 text-[11px] text-cyan-200 font-mono">
                      ⚡ {p.impact}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                    <div className="text-gray-400 truncate max-w-[150px]">
                      {p.tags.slice(0, 2).join(" • ")}
                    </div>
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 hover:text-white flex items-center gap-1"
                      >
                        Code <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies & Stack Proficiency */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              Core Competencies & Stack Proficiency
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {skillCategories.flatMap((cat) => cat.skills.filter((s) => s.highlight)).map((skill) => (
                <div
                  key={skill.name}
                  className="px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-gray-200">{skill.name}</span>
                  <span className="text-cyan-400 font-bold">{skill.level}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Academic Chip */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-2.5 text-gray-300">
              <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                <strong className="text-white">{education.degree}</strong> • {education.institution}
              </span>
            </div>
            <span className="text-gray-400 shrink-0">{education.period} ({education.location})</span>
          </div>

          {/* Footer Callout */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/50 to-purple-950/50 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-mono font-bold text-white">
                  Direct Line for Hiring Managers
                </div>
                <div className="text-xs text-cyan-300 font-mono">
                  {profile.email} • {profile.phone}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono text-xs flex items-center gap-1.5 border border-white/20 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={`mailto:${profile.email}?subject=Interview%20Invitation%20for%20${profile.name}`}
                onClick={() => soundManager.playClick()}
                className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs transition-colors shrink-0"
              >
                SEND DIRECT INVITATION
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
