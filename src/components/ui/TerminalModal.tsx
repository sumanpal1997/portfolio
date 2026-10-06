"use client";

import { useState, useEffect, useRef } from "react";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { soundManager } from "@/lib/sound";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTriggerRecruiterMode: () => void;
}

interface CommandHistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function TerminalModal({
  isOpen,
  onClose,
  onTriggerRecruiterMode,
}: TerminalModalProps) {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      command: "welcome",
      output: (
        <div className="space-y-1 text-cyan-300">
          <p>⚡ CYBER OS v4.2.0 [Interactive Command Shell]</p>
          <p className="text-gray-400">Type <span className="text-yellow-300 font-bold">&apos;help&apos;</span> to inspect available operational commands.</p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Global Ctrl+K / Cmd+K listener
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        // handled in parent or toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playClick();

    let result: React.ReactNode = "";

    switch (cmd) {
      case "help":
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-yellow-300 font-bold">AVAILABLE COMMANDS:</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">projects</span> - View all flagship projects & tech</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">skills</span> - List primary engineering proficiencies</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">experience</span> - View company work history & accomplishments</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">education</span> - View academic qualifications</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">whoami</span> - Identity dossier of {PORTFOLIO_DATA.profile.name}</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">contact</span> - Show communication channels & phone</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">hire</span> - Launch 30s Recruiter Speedrun mode</p>
            <p><span className="text-cyan-400 w-24 inline-block font-bold">clear</span> - Flush terminal screen buffer</p>
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="space-y-2 text-xs">
            {PORTFOLIO_DATA.projects.map((p, i) => (
              <div key={p.id} className="border-l-2 border-cyan-500 pl-2">
                <span className="text-white font-bold">{i + 1}. {p.title}</span> ({p.category})
                <p className="text-gray-400">{p.tagline}</p>
                <p className="text-cyan-300">Impact: {p.impact}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "skills":
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-cyan-400 font-bold">CORE TECH STACK & COMPETENCIES:</p>
            <p className="text-gray-300">
              React.js, Next.js, Redux Toolkit, TypeScript, Modern JavaScript (ES6+), Ant Design, HTML5, CSS3, REST APIs, Jest, Node.js (Express), Git, Figma, Adobe XD, Lazy Loading & Performance Optimization.
            </p>
          </div>
        );
        break;

      case "experience":
        result = (
          <div className="space-y-2 text-xs">
            {PORTFOLIO_DATA.experiences.map((exp, i) => (
              <div key={i} className="border-l-2 border-cyan-500 pl-2">
                <span className="text-white font-bold">{exp.role} @ {exp.company}</span>
                <p className="text-cyan-300">{exp.period} • {exp.location}</p>
                <p className="text-gray-300">{exp.highlights[0]}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        result = (
          <div className="text-xs space-y-1 text-gray-300">
            <p className="text-white font-bold">{PORTFOLIO_DATA.education.degree}</p>
            <p className="text-cyan-400">{PORTFOLIO_DATA.education.institution}</p>
            <p className="text-gray-400">Period: {PORTFOLIO_DATA.education.period} • {PORTFOLIO_DATA.education.location}</p>
          </div>
        );
        break;

      case "whoami":
        result = (
          <div className="text-xs space-y-1 text-gray-300">
            <p className="text-white font-bold">{PORTFOLIO_DATA.profile.name}</p>
            <p className="text-cyan-400">{PORTFOLIO_DATA.profile.role}</p>
            <p>{PORTFOLIO_DATA.profile.shortBio}</p>
            <p className="text-emerald-400">Location: {PORTFOLIO_DATA.profile.location}</p>
            <p className="text-yellow-300">Phone: {PORTFOLIO_DATA.profile.phone}</p>
          </div>
        );
        break;

      case "contact":
        result = (
          <div className="text-xs space-y-1">
            <p className="text-white">Email: <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.profile.email}</a></p>
            <p className="text-white">Phone: <a href={`tel:${PORTFOLIO_DATA.profile.phone}`} className="text-cyan-400 underline">{PORTFOLIO_DATA.profile.phone}</a></p>
            <p className="text-white">LinkedIn: <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PORTFOLIO_DATA.profile.linkedin}</a></p>
            <p className="text-white">Location: <span className="text-emerald-400">{PORTFOLIO_DATA.profile.location}</span></p>
          </div>
        );
        break;

      case "hire":
        onClose();
        setTimeout(() => onTriggerRecruiterMode(), 200);
        result = <span className="text-yellow-300">Opening Recruiter Speedrun Mode...</span>;
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "sudo rm -rf /":
      case "rm -rf /":
        result = (
          <span className="text-red-400 font-bold">
            🚨 ACCESS DENIED: High-order quantum shielding prevented self-destruction protocol! Nice try, hacker! 😉
          </span>
        );
        break;

      default:
        result = (
          <span className="text-red-400">
            Command not recognized: &apos;{cmd}&apos;. Type &apos;help&apos; to view valid directives.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: inputVal, output: result }]);
    setInputVal("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div
        className="w-full max-w-2xl bg-[#030611] border border-cyan-500/40 rounded-xl shadow-[0_0_50px_rgba(0,240,255,0.2)] overflow-hidden font-mono flex flex-col h-[520px] cyber-corners"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="bg-[#080d21] px-4 py-3 border-b border-cyan-500/20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 text-xs">
            <TerminalIcon className="w-4 h-4" />
            <span className="font-bold tracking-wider">CYBER_CLI // BASH INTERFACE</span>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Screen / History */}
        <div
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-mono scanline-overlay"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-purple-400">guest@cyber-portfolio</span>
                <span className="text-gray-500">:</span>
                <span className="text-emerald-400">~</span>
                <span className="text-gray-300">$</span>
                <span className="text-white font-bold">{item.command}</span>
              </div>
              <div className="text-gray-300 pl-4">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Input Line */}
        <form
          onSubmit={handleCommandSubmit}
          className="bg-[#05091a] border-t border-cyan-500/20 p-3 flex items-center gap-2"
        >
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold shrink-0">
            <span className="text-emerald-400">guest@portfolio</span>
            <span className="text-gray-400">$</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => {
              soundManager.playKey();
              setInputVal(e.target.value);
            }}
            placeholder="Type 'help', 'projects', 'hire'..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-gray-600"
          />
        </form>
      </div>
    </div>
  );
}
