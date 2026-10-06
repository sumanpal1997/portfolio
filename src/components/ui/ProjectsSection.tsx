"use client";

import { useState, useRef } from "react";
import { ExternalLink, Layers, Zap, Info, X } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

function ProjectCard({
  project,
  onOpenDetails,
}: {
  project: Project;
  onOpenDetails: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => soundManager.playHover()}
      style={{
        transform: transformStyle,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="relative rounded-2xl bg-[#070c1d] border border-cyan-500/25 p-6 flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] group cyber-corners cursor-pointer"
      onClick={() => {
        soundManager.playClick();
        onOpenDetails(project);
      }}
    >
      {/* Glare specular reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(0,240,255,${glarePosition.opacity}), transparent 60%)`,
        }}
      />

      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span
            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border tracking-wider"
            style={{
              borderColor: `${project.accentColor}50`,
              backgroundColor: `${project.accentColor}15`,
              color: project.accentColor,
            }}
          >
            {project.category}
          </span>

          {project.featured && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 flex items-center gap-1">
              <Zap className="w-3 h-3" /> FEATURED
            </span>
          )}
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors font-mono">
          {project.title}
        </h3>
        <p className="text-xs text-gray-300 mt-2 font-mono leading-relaxed line-clamp-2">
          {project.tagline}
        </p>

        {/* Quantified Impact Callout (Recruiter Magnet) */}
        <div className="mt-4 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-xs font-mono text-cyan-200">
          <div className="font-bold text-[11px] text-cyan-400 flex items-center gap-1.5 mb-1">
            <Zap className="w-3 h-3 text-yellow-300" /> PROVEN IMPACT:
          </div>
          {project.impact}
        </div>

        {/* Key Metrics Chips */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.metrics.map((metric) => (
            <span
              key={metric}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
            >
              {metric}
            </span>
          ))}
        </div>
      </div>

      {/* Tech Tags & Links Footer */}
      <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1 max-w-[65%]">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-gray-400 truncate"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playClick();
              onOpenDetails(project);
            }}
            className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-cyan-400 border border-cyan-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer"
            title="Inspect Architecture"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
              }}
              className="p-1.5 rounded-md bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10"
              title="GitHub Repository"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
              }}
              className="p-1.5 rounded-md bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
              title="Live Demo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["All", "Enterprise", "Fullstack", "Frontend / UI", "Web Apps"];

  const filteredProjects =
    selectedCategory === "All"
      ? PORTFOLIO_DATA.projects
      : PORTFOLIO_DATA.projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative cyber-dots">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">
              <Layers className="w-4 h-4" />
              // 3D Interactive Exhibition
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Flagship Engineering Projects
            </h2>
            <p className="text-sm text-gray-400 font-mono mt-2 max-w-xl">
              Scalable enterprise HRMS platforms, fullstack healthcare portals, and high-performance UI architectures. Hover cards to activate 3D parallax.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 font-mono text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-cyan-500 text-black font-bold border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "bg-white/5 text-gray-400 border-white/10 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Tilt Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenDetails={(p) => setActiveModalProject(p)}
            />
          ))}
        </div>
      </div>

      {/* Project Deep-Dive Architecture Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div
            className="w-full max-w-2xl bg-[#090e24] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,240,255,0.25)] p-6 sm:p-8 space-y-6 cyber-corners"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {activeModalProject.category}
                </span>
                <h3 className="text-2xl font-bold font-mono text-white mt-2">
                  {activeModalProject.title}
                </h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">
                  {activeModalProject.tagline}
                </p>
              </div>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setActiveModalProject(null);
                }}
                className="p-1.5 text-gray-400 hover:text-white bg-white/5 rounded-lg border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <h4 className="text-gray-400 font-bold uppercase tracking-wider mb-1">
                  Architecture & Implementation:
                </h4>
                <p className="text-gray-200 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/10">
                  {activeModalProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-yellow-300 font-bold uppercase tracking-wider mb-1">
                  Verified Real-World Impact:
                </h4>
                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200">
                  ⚡ {activeModalProject.impact}
                </div>
              </div>

              <div>
                <h4 className="text-purple-300 font-bold uppercase tracking-wider mb-1">
                  Technical Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-white/5 border border-white/15 text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-2 border border-white/20"
                >
                  <GithubIcon className="w-4 h-4" /> View GitHub Repo
                </a>
              )}
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Production Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
