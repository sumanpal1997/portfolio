# ⚡ 3D Cyberpunk Portfolio // High-Impact Engineering Showcase

A futuristic, high-performance 3D portfolio website built with **Next.js 16 (App Router)**, **React 19**, **Three.js / React Three Fiber**, **Tailwind CSS**, and synthesized **Web Audio API**.

Designed specifically to captivate technical recruiters, hiring managers, and design leads.

---

## 🌟 Recruiter-Magnet Features

1. **⚡ "Recruiter Speedrun Mode" (30-Second Dossier)**
   - Located prominently in the header and hero section.
   - Instantly brings up an executive HUD summary of candidate metrics, top 3 flagship projects, stack proficiency, 1-click resume download, and 1-click email copy with celebratory confetti.
   - Solves the #1 problem recruiters face with 3D portfolios: *speed and scannability*.

2. **🪐 Interactive 3D Quantum Core & Skills Orbit**
   - Built with **Three.js** and **React Three Fiber**.
   - Dual neon gyroscopic rings, pulsing glowing icosahedron core, additive blending starfield particles.
   - Interactive orbit nodes (Next.js, Three.js, TypeScript, Go, WebGPU, AI/LLM, PostgreSQL) with interactive 3D HUD tags that respond to mouse rotation and hovering.

3. **🎴 3D Tilt Interactive Project Cards**
   - Realistic 3D card tilt and specular glare reacting dynamically to cursor coordinates.
   - Filterable by project category (*Fullstack*, *3D / Creative*, *DevOps / Systems*, *AI / ML*).
   - "Architecture & Deep-Dive" modal breakdown for engineering rigor.

4. **⌨️ Cyber Terminal CLI (`Ctrl + K` / `Cmd + K`)**
   - Interactive terminal modal allowing power users to query `projects`, `skills`, `contact`, `hire`, and easter eggs (`whoami`, `sudo rm -rf /`).

5. **🔊 Synthesized Web Audio Micro-Interactions**
   - Zero external audio assets (100% generated in real-time with Web Audio API oscillators).
   - Muted by default with a clean audio toggle in the navigation bar.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) + React 19 + TypeScript
- **3D Graphics**: Three.js + `@react-three/fiber` + `@react-three/drei`
- **Styling**: Tailwind CSS + custom Cyberpunk HUD CSS utilities
- **Icons**: Lucide React + custom inline SVGs
- **Celebrations & Audio**: `canvas-confetti` + Web Audio API Synthesizer

---

## 🚀 Quick Start

The dev server is currently running at:
```bash
http://localhost:3000
```

To run manually:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## ✏️ How to Customize with Your Own Info

All personal content, project descriptions, skills, and links are organized inside a single configuration file:

👉 [src/data/portfolioData.ts](file:///d:/portfolio/src/data/portfolioData.ts)

You can update:
- `profile.name`, `role`, `tagline`, `shortBio`, `location`, `email`, and social links.
- `profile.metrics` (e.g. apps shipped, performance improvements).
- `projects` (add your own titles, live URLs, GitHub repositories, and impact statements).
- `skillCategories` (adjust percentages and tech stack pills).
- `experiences` (update your employment history and highlights).
