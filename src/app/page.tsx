"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { HeroSection } from "@/components/ui/HeroSection";
import { ProjectsSection } from "@/components/ui/ProjectsSection";
import { SkillsSection } from "@/components/ui/SkillsSection";
import { ExperienceSection } from "@/components/ui/ExperienceSection";
import { ContactSection } from "@/components/ui/ContactSection";
import { Footer } from "@/components/ui/Footer";
import { RecruiterModal } from "@/components/ui/RecruiterModal";
import { TerminalModal } from "@/components/ui/TerminalModal";

export default function Home() {
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);
  const [terminalModalOpen, setTerminalModalOpen] = useState(false);

  useEffect(() => {
    const handleGlobalKeys = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K opens terminal
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeys);
    return () => window.removeEventListener("keydown", handleGlobalKeys);
  }, []);

  return (
    <main className="min-h-screen bg-[#030712] text-gray-100 relative overflow-x-hidden selection:bg-cyan-400 selection:text-black">
      {/* HUD Navigation */}
      <Navbar
        onOpenRecruiterModal={() => setRecruiterModalOpen(true)}
        onOpenTerminalModal={() => setTerminalModalOpen(true)}
      />

      {/* Main Sections */}
      <HeroSection
        onOpenRecruiterModal={() => setRecruiterModalOpen(true)}
        onOpenTerminalModal={() => setTerminalModalOpen(true)}
      />

      <ProjectsSection />

      <SkillsSection />

      <ExperienceSection />

      <ContactSection
        onOpenRecruiterModal={() => setRecruiterModalOpen(true)}
      />

      <Footer
        onOpenTerminalModal={() => setTerminalModalOpen(true)}
      />

      {/* Standout Interactive Modals */}
      <RecruiterModal
        isOpen={recruiterModalOpen}
        onClose={() => setRecruiterModalOpen(false)}
      />

      <TerminalModal
        isOpen={terminalModalOpen}
        onClose={() => setTerminalModalOpen(false)}
        onTriggerRecruiterMode={() => setRecruiterModalOpen(true)}
      />
    </main>
  );
}
