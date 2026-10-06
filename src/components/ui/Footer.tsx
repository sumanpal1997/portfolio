"use client";

import { useEffect, useState } from "react";
import { ArrowUp, Terminal, Shield, Cpu } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

export function Footer({ onOpenTerminalModal }: { onOpenTerminalModal: () => void }) {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-cyan-500/20 bg-[#02050e] py-12 relative font-mono text-xs text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* System Telemetry Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM STATUS: NOMINAL
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Cpu className="w-3 h-3" />
              FPS: 60+ (WEBGL)
            </span>
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
              LOCAL TIME: {time || "00:00:00"}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenTerminalModal();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5" />
              CLI Shell
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-gray-500 text-[11px] gap-2">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.name}. All rights reserved. Built with Next.js, Three.js & TailwindCSS.
          </div>
          <div className="text-gray-400">
            Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white">Ctrl + K</kbd> to launch interactive terminal.
          </div>
        </div>
      </div>
    </footer>
  );
}
