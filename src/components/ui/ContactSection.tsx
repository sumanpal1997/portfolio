"use client";

import { useState } from "react";
import { Mail, Send, Copy, Check, Sparkles, Zap, Phone, MapPin, Loader2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { soundManager } from "@/lib/sound";

export function ContactSection({ onOpenRecruiterModal }: { onOpenRecruiterModal: () => void }) {
  const { profile } = PORTFOLIO_DATA;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        referrerPolicy: "origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: `[Portfolio Signal] ${formData.subject} — from ${formData.name}`,
          subject: formData.subject,
          message: formData.message,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success !== "false" && data.success !== false) {
        soundManager.playSuccess();
        setSubmitted(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setErrorMessage(
          data.message || "Unable to transmit message right now. Please try again or use direct email."
        );
      }
    } catch {
      setErrorMessage(
        "Network error while transmitting message. Please check your connection or use direct email."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative cyber-grid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Recruiter CTA */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>COMMUNICATION TRANSMITTER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Let&apos;s Build Something Extraordinary.
            </h2>

            <p className="text-sm text-gray-300 font-mono leading-relaxed">
              Open to UI Developer, Frontend Engineer, and React / Next.js opportunities. Let&apos;s discuss how I can bring 40% performance gains and 100% design fidelity to your products.
            </p>

            {/* Direct Channels Cards */}
            <div className="space-y-3">
              {/* Direct Email Card */}
              <div className="p-4 rounded-xl bg-[#060b1c] border border-cyan-500/30 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Email Channel:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-cyan-400 transition-colors select-all truncate"
                  >
                    {profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Phone Card */}
              <div className="p-4 rounded-xl bg-[#060b1c] border border-cyan-500/30 space-y-2">
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Direct Phone / WhatsApp:
                </span>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={`tel:${profile.phone}`}
                    className="font-mono text-xs sm:text-sm text-white hover:text-cyan-400 transition-colors select-all"
                  >
                    {profile.phone}
                  </a>
                  <button
                    onClick={handleCopyPhone}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center gap-1.5 cursor-pointer shrink-0"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location Badge */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-2 text-xs font-mono text-gray-300">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Base Location: <strong className="text-white">{profile.location}</strong></span>
              </div>
            </div>

            {/* Recruiter Instant Callout */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border border-purple-500/30 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-yellow-300">
                <Zap className="w-4 h-4 animate-bounce" />
                HIRING FOR A FRONTEND ROLE?
              </div>
              <p className="text-xs text-gray-300 font-mono leading-relaxed">
                Skip the back-and-forth email loops. Access verified metrics, skills matrix, and instant resume download in one spot.
              </p>
              <button
                onClick={() => {
                  soundManager.playWarp();
                  onOpenRecruiterModal();
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(0,240,255,0.3)]"
              >
                <Zap className="w-3.5 h-3.5" />
                LAUNCH RECRUITER SPEEDRUN (30s)
              </button>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-2 font-mono text-xs"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
                <span>LinkedIn Profile</span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href={profile.twitter}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundManager.playClick()}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
                title="Twitter / X"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Holographic Message Transmitter */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#060b1c] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,0,0,0.5)] cyber-corners">
              <h3 className="text-xl font-bold font-mono text-white mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                Transmit Transmission Signal
              </h3>

              {submitted ? (
                <div className="py-12 text-center space-y-3 font-mono">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Signal Received!</h4>
                  <p className="text-xs text-gray-400 max-w-sm mx-auto">
                    Your message has been transmitted directly to{" "}
                    <span className="text-cyan-400">{profile.email}</span>. I will respond to your transmission promptly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setErrorMessage(null);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="text-xs text-cyan-400 underline pt-2 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-400 block font-bold">YOUR NAME / ORG</label>
                      <input
                        type="text"
                        name="name"
                        required
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => {
                          soundManager.playKey();
                          setFormData({ ...formData, name: e.target.value });
                        }}
                        placeholder="e.g. Talent Acquisition Lead"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-400 block font-bold">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        name="email"
                        required
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => {
                          soundManager.playKey();
                          setFormData({ ...formData, email: e.target.value });
                        }}
                        placeholder="recruiter@company.com"
                        className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 block font-bold">ROLE / SUBJECT</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      disabled={isSubmitting}
                      value={formData.subject}
                      onChange={(e) => {
                        soundManager.playKey();
                        setFormData({ ...formData, subject: e.target.value });
                      }}
                      placeholder="e.g. UI Developer / Frontend Engineer Opportunity"
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 block font-bold">TRANSMISSION MESSAGE</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => {
                        soundManager.playKey();
                        setFormData({ ...formData, message: e.target.value });
                      }}
                      placeholder="Share details on your opportunity, tech stack, or engineering project..."
                      className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/40 text-red-300 flex flex-col gap-2">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{errorMessage}</span>
                      </div>
                      <a
                        href={`mailto:${profile.email}?subject=${encodeURIComponent(
                          formData.subject || "Portfolio Inquiry"
                        )}&body=${encodeURIComponent(
                          `From: ${formData.name} (${formData.email})\n\n${formData.message}`
                        )}`}
                        className="text-cyan-400 hover:text-cyan-300 underline self-start"
                      >
                        Click here to send directly via your email client →
                      </a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> TRANSMITTING SIGNAL...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> TRANSMIT MESSAGE SIGNAL
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
