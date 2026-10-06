import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suman Kumar Pal // UI Developer & Frontend Engineer",
  description:
    "Portfolio of Suman Kumar Pal — UI Developer with 4+ years of experience building scalable web applications using React.js, Next.js, Redux Toolkit, and TypeScript.",
  keywords: [
    "Suman Kumar Pal",
    "UI Developer",
    "UI Engineer",
    "Frontend Engineer",
    "React.js",
    "Next.js",
    "Redux Toolkit",
    "TypeScript",
    "Ant Design",
    "JavaScript",
    "Kolkata",
  ],
  authors: [{ name: "Suman Kumar Pal" }],
  openGraph: {
    title: "Suman Kumar Pal // UI Developer & Frontend Engineer",
    description:
      "Results-oriented UI Developer with 4+ years of experience building scalable web applications using React.js, Next.js, Redux, and TypeScript.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#030712] text-gray-100">{children}</body>
    </html>
  );
}
