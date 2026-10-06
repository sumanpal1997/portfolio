"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX, Terminal, Zap, Menu, X, ArrowUpRight } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface NavbarProps {
  onOpenRecruiterModal: () => void;
  onOpenTerminalModal: () => void;
}

export function Navbar({ onOpenRecruiterModal, onOpenTerminalModal }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMuted(soundManager.isMuted());
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = soundManager.toggleMute();
    setIsMuted(newState);
  };

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Tech Stack", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#030712]/85 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#"
          onMouseEnter={() => soundManager.playHover()}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px] shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full bg-[#030712] rounded-lg flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:text-white transition-colors">
              SP
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
            <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              AVAILABLE FOR HIRE
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-mono">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => soundManager.playHover()}
              onClick={() => soundManager.playClick()}
              className="text-gray-300 hover:text-cyan-400 transition-colors relative py-1 hover:text-glow-cyan"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Terminal Launcher */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenTerminalModal();
            }}
            title="Open Interactive Terminal (Ctrl + K)"
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-gray-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            title={isMuted ? "Unmute UI Audio" : "Mute UI Audio"}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/30 text-gray-300 hover:text-cyan-400 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* RECRUITER SPEEDRUN BUTTON */}
          <button
            onClick={() => {
              soundManager.playWarp();
              onOpenRecruiterModal();
            }}
            className="relative group px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 p-[1px] font-mono text-xs font-semibold cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(255,0,127,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            <div className="px-3 py-1.5 rounded-lg bg-[#050816] flex items-center gap-2 group-hover:bg-[#050816]/80 transition-colors">
              <Zap className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
              <span className="text-white tracking-wide">RECRUITER MODE</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ⚡ 30s
              </span>
            </div>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => {
              soundManager.playWarp();
              onOpenRecruiterModal();
            }}
            className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 flex items-center gap-1"
          >
            <Zap className="w-3 h-3 text-yellow-300" />
            Recruiter
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#030712]/95 border-b border-cyan-500/20 px-6 py-4 space-y-3 font-mono text-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-gray-300 hover:text-cyan-400"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTerminalModal();
              }}
              className="flex items-center gap-2 text-cyan-400 text-xs py-1"
            >
              <Terminal className="w-4 h-4" /> Open Terminal
            </button>
            <button
              onClick={handleSoundToggle}
              className="flex items-center gap-2 text-gray-400 text-xs py-1"
            >
              {isMuted ? "Sound: Off" : "Sound: On"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
