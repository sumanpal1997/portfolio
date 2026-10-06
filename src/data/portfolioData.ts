export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  impact: string;
  metrics: string[];
  tags: string[];
  category: 'Fullstack' | 'Frontend / UI' | 'Enterprise' | 'Web Apps';
  liveUrl?: string;
  githubUrl?: string;
  accentColor: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; icon: string; highlight?: boolean }[];
}

export interface Experience {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  highlights: string[];
}

export interface Language {
  language: string;
  proficiency: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Suman Kumar Pal",
    handle: "suman_dev",
    role: "UI Developer & Frontend Engineer",
    statusText: "AVAILABLE FOR ROLES & CONTRACTS",
    statusAvailable: true,
    tagline: "Results-oriented UI Developer with 4+ years of experience building scalable web applications using React.js, Next.js, Redux, and TypeScript.",
    shortBio: "Results-oriented UI Developer with 4+ years of experience building scalable web applications using React.js, Next.js, Redux, and TypeScript. Proven track record of improving application performance by 40% through code optimization and lazy loading techniques. Expert in translating complex UI/UX designs into responsive, high-quality code. Skilled in modern JavaScript (ES6+), RESTful API integration, and testing frameworks like Jest.",
    location: "Kolkata, WB, India",
    phone: "+91 7699662582",
    email: "suman.pal199710@gmail.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com/in/suman-pal-999634148",
    twitter: "https://x.com",
    resumeUrl: "#resume",
    metrics: [
      { label: "Frontend Experience", value: "4+ Years" },
      { label: "Performance Gain", value: "+40%" },
      { label: "Active Enterprise Users", value: "500+" },
      { label: "Setup Time Reduction", value: "-25%" },
    ],
  },

  projects: [
    {
      id: "project-1",
      title: "HRMS Web App",
      tagline: "Comprehensive in-house enterprise HR management system built from scratch",
      description: "Architected and engineered an end-to-end in-house HRMS platform from scratch. Converted high-fidelity Adobe XD design mockups into reusable, modular React components using Ant Design. Implemented robust business logic, Redux Toolkit for predictable global state management, integrated optimized backend REST APIs for data-dense listing tables, and utilized skeleton loaders for seamless user experience. Leveraged React hooks with Next.js for server-side rendering and search engine optimization.",
      impact: "Seamlessly serves 500+ daily active enterprise users with real-time data synchronization and 40% faster rendering.",
      metrics: ["500+ Active Users", "40% Faster Loads", "100% Design Fidelity"],
      tags: ["Next.js", "React.js", "Redux Toolkit", "TypeScript", "Ant Design", "REST APIs", "Adobe XD"],
      category: "Enterprise",
      liveUrl: "https://example.com/hrms-app",
      githubUrl: "https://github.com/example/hrms-app",
      accentColor: "#00f0ff", // Neon Cyan
      featured: true,
    },
    {
      id: "project-2",
      title: "Healthcare Web App",
      tagline: "End-to-end fullstack medical portal from UI/UX design to RESTful backend",
      description: "Delivered a patient-doctor healthcare web application from initial design mockups to production deployment. Crafted responsive, accessible frontend views with React.js, HTML5, and CSS3. Built scalable backend REST APIs using Node.js and Express to manage patient appointments, clinical records, and real-time scheduling.",
      impact: "Accelerated patient intake and scheduling workflows with reliable sub-second backend API response times.",
      metrics: ["Full-Cycle Delivery", "Node.js REST Backend", "Responsive Mobile-First"],
      tags: ["React.js", "Node.js", "Express", "REST APIs", "HTML5", "CSS3", "JavaScript"],
      category: "Fullstack",
      liveUrl: "https://example.com/healthcare-app",
      githubUrl: "https://github.com/example/healthcare-app",
      accentColor: "#00ff9d", // Neon Green
      featured: true,
    },
    {
      id: "project-3",
      title: "UI Component System & Performance Suite",
      tagline: "Reusable UI library and frontend workflow optimization reducing setup time by 25%",
      description: "Spearheaded the standardization of frontend architecture across agile teams. Evaluated and integrated modern UI libraries, created reusable Ant Design and React components with strict TypeScript types, implemented lazy loading and code splitting to trim bundle sizes, and added Jest testing suites for critical flows.",
      impact: "Improved team velocity and slashed initial project setup time by 25% while boosting app performance by 40%.",
      metrics: ["-25% Setup Time", "+40% Performance", "Agile Velocity"],
      tags: ["React.js", "TypeScript", "Redux Toolkit", "Ant Design", "Jest", "Figma", "Lazy Loading"],
      category: "Frontend / UI",
      liveUrl: "https://example.com/ui-system",
      githubUrl: "https://github.com/example/ui-system",
      accentColor: "#9d4edd", // Neon Purple
      featured: true,
    },
    {
      id: "project-4",
      title: "Interactive Client Portal & Web Applications",
      tagline: "Cross-device responsive web interfaces with dynamic validation engines",
      description: "Engineered responsive client-facing web features utilizing interactive jQuery plugins and modern ES6+ JavaScript modules. Designed mobile-first responsive layouts ensuring 100% compatibility across varying screen sizes and devices. Implemented robust client-side form validation and maintained Git-based collaborative workflows.",
      impact: "Ensured 100% cross-device compatibility with zero validation regression across production deployments.",
      metrics: ["100% Cross-Device", "Strict Client Validation", "Git Workflows"],
      tags: ["JavaScript (ES6+)", "jQuery", "HTML5", "CSS3", "Git", "Responsive Design"],
      category: "Web Apps",
      liveUrl: "https://example.com/client-portal",
      githubUrl: "https://github.com/example/client-portal",
      accentColor: "#ff007f", // Neon Pink
      featured: false,
    },
  ] as Project[],

  skillCategories: [
    {
      title: "Core Frontend & Frameworks",
      skills: [
        { name: "React.js", level: 95, icon: "React", highlight: true },
        { name: "Next.js", level: 92, icon: "Code", highlight: true },
        { name: "TypeScript", level: 90, icon: "Code", highlight: true },
        { name: "Redux / Redux Toolkit", level: 94, icon: "Layers", highlight: true },
        { name: "Modern JavaScript (ES6+)", level: 95, icon: "Zap", highlight: true },
        { name: "HTML5 & CSS3", level: 96, icon: "Palette" },
      ],
    },
    {
      title: "UI Design & Performance",
      skills: [
        { name: "Ant Design (antd)", level: 93, icon: "Palette", highlight: true },
        { name: "Code Optimization & Lazy Loading", level: 92, icon: "Zap", highlight: true },
        { name: "Responsive Web Design", level: 95, icon: "Sparkles", highlight: true },
        { name: "Figma & Adobe XD to Code", level: 90, icon: "Layers" },
        { name: "Tailwind CSS", level: 88, icon: "Palette" },
        { name: "Client-side Form Validation", level: 92, icon: "Shield" },
      ],
    },
    {
      title: "Backend, APIs & Workflow",
      skills: [
        { name: "RESTful API Integration", level: 94, icon: "Network", highlight: true },
        { name: "Node.js & Express", level: 84, icon: "Server", highlight: true },
        { name: "Git & Version Control", level: 92, icon: "GitCommit", highlight: true },
        { name: "Testing with Jest", level: 85, icon: "CheckCircle" },
        { name: "Agile & Team Collaboration", level: 92, icon: "Workflow" },
        { name: "SEO & Server-Side Rendering", level: 88, icon: "Activity" },
      ],
    },
  ] as SkillCategory[],

  experiences: [
    {
      period: "06/2022 — PRESENT",
      role: "UI Engineer",
      company: "Codeclouds IT Solutions Private Limited",
      location: "Kolkata, WB",
      highlights: [
        "Architected and built a comprehensive in-house HRMS product from the ground up, utilizing Ant Design for consistent UI components and Redux Toolkit for efficient global state management, creating a seamless experience for 500+ active users.",
        "Integrated complex RESTful APIs and backend services, optimizing data fetching strategies to improve application responsiveness and ensure real-time data synchronization.",
        "Collaborated closely with UI/UX designers, bridging the gap between design mockups (Adobe XD/Figma) and technical implementation to ensure 100% design fidelity and strict adherence to coding standards.",
        "Optimized the frontend development workflow by evaluating and implementing modern frameworks and libraries, which reduced the initial project setup time by 25% and improved team velocity.",
      ],
      skills: ["React.js", "Next.js", "Redux Toolkit", "TypeScript", "Ant Design", "REST APIs", "Jest"],
    },
    {
      period: "11/2021 — 06/2022",
      role: "Jr. Front End Developer",
      company: "Klizo Solutions Private Limited",
      location: "Kolkata, WB",
      highlights: [
        "Developed interactive features using jQuery plugins and modern JavaScript (ES6+).",
        "Created responsive designs ensuring cross-browser and cross-device compatibility across diverse form factors.",
        "Collaborated using Git version control systems within agile sprint teams.",
        "Integrated robust client-side validation for user input forms and interactive components.",
      ],
      skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "jQuery", "Git", "Responsive Design"],
    },
  ] as Experience[],

  education: {
    degree: "Electrical Engineering (B.Tech)",
    institution: "University Institute of Technology, Burdwan University",
    period: "08/2014 — 07/2018",
    location: "Purba Barddhaman, WB",
    highlights: [
      "Rigorous engineering education emphasizing computational logic, analytical thinking, and complex systems.",
      "Graduated and channeled problem-solving acumen into professional frontend architecture and modern web technologies.",
    ],
  } as Education,

  languages: [
    { language: "English", proficiency: "Professional Working Proficiency" },
    { language: "Hindi", proficiency: "Professional Working Proficiency" },
    { language: "Bengali", proficiency: "Native or Bilingual Proficiency" },
  ] as Language[],

  interests: ["Technology", "Tech Blogging", "Cooking", "Sports", "Podcasts"],
};
