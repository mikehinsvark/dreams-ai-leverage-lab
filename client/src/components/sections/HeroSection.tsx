import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import SpinningGlobe from "@/components/SpinningGlobe";
import { TOPIC_PAGES, PDF_URLS } from "@/lib/constants";
import { Download, Zap } from "lucide-react";

// Design: Electric Blueprint — compact hero, everything above the fold
// Status widgets left, headline center, globe right, topic strip pinned to bottom

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663540400260/NPKEju6a8tZEcsR375b28w/hero-main-6pXgkmpBShCiMeNcqm3tLH.webp";

// AI tool logos featured in the course (the toolkit producers will master)
const AI_LOGOS = [
  { name: "ChatGPT", src: "/manus-storage/logo-chatgpt_cc90774e.webp", chip: true },
  { name: "Manus", src: "/manus-storage/logo-manus_2ca7bdb4.png", chip: true },
  { name: "Claude", src: "/manus-storage/logo-claude-clean_7950af5c.png", chip: true },
  { name: "Gemini", src: "/manus-storage/logo-gemini-clean_8393566f.png", chip: true },
  { name: "Grok", src: "/manus-storage/logo-grok_9fc259ba.webp", chip: true },
  { name: "NotebookLM", src: "/manus-storage/logo-notebooklm_97864a07.jpg", chip: true },
];

// Positions for the floating logo cluster around the globe (lg+ only)
// Globe sits anchored bottom-right; logos fan out across the upper-left of the column
const FLOAT_POSITIONS = [
  { name: "ChatGPT", top: "2%", left: "66%", w: 64, delay: "0.35s" },
  { name: "Manus", top: "8%", left: "30%", w: 76, delay: "0.45s" },
  { name: "Claude", top: "32%", left: "12%", w: 124, delay: "0.55s" },
  { name: "Gemini", top: "54%", left: "6%", w: 120, delay: "0.65s" },
  { name: "Grok", top: "74%", left: "16%", w: 98, delay: "0.75s" },
  { name: "NotebookLM", top: "88%", left: "36%", w: 138, delay: "0.85s" },
];

const stats = [
  { value: "12", label: "Weekly Classes" },
  { value: "60", label: "Min/Week" },
  { value: "$0", label: "To Start" },
  { value: "5–10", label: "Hrs Saved" },
];

const statusWidgets = [
  { icon: "⚡", label: "SYSTEM STATUS", value: "ONLINE", valueColor: "oklch(0.78 0.15 175)", pulse: true },
  { icon: "👥", label: "ACTIVE PRODUCERS", value: "11,000+", valueColor: "oklch(0.62 0.18 280)", pulse: false },
  { icon: "🌐", label: "NETWORK STRENGTH", value: "98.7%", valueColor: "oklch(0.78 0.14 75)", pulse: false },
  { icon: "🤖", label: "AI TOOLS READY", value: "5 FREE", valueColor: "oklch(0.68 0.15 240)", pulse: false },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{ background: "oklch(0.07 0.02 240)" }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" style={{ opacity: 0.18 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, oklch(0.07 0.02 240 / 0.97) 0%, oklch(0.07 0.02 240 / 0.78) 55%, oklch(0.07 0.02 240 / 0.92) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 65% 55% at 62% 42%, oklch(0.78 0.15 175 / 0.07) 0%, transparent 65%)" }} />
      </div>

      {/* Main layout: natural height, tight padding */}
      <div className="relative z-10 flex flex-col">
        <div className="container flex flex-col py-4 md:py-5">

          {/* CENTER ROW: widgets + headline + globe */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[160px_1fr_400px] gap-3 lg:gap-4 items-center">

            {/* LEFT: Status widgets — compact */}
            <div
              className="hidden md:flex flex-col gap-1.5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: "opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s",
              }}
            >
              {statusWidgets.map((w, i) => (
                <div
                  key={i}
                  className="rounded-lg px-3 py-2"
                  style={{
                    background: "oklch(0.10 0.025 240 / 0.92)",
                    border: "1px solid oklch(0.78 0.15 175 / 0.14)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span style={{ fontSize: "11px" }}>{w.icon}</span>
                    <span className="text-xs tracking-wider uppercase" style={{ color: "oklch(0.4 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                      {w.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {w.pulse && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: w.valueColor, boxShadow: `0 0 6px ${w.valueColor}`, animation: "pulse-anim 2s infinite" }} />
                    )}
                    <span className="font-black leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: w.valueColor, fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)" }}>
                      {w.value}
                    </span>
                  </div>
                  <div className="mt-1.5 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${w.valueColor}, transparent)`, opacity: 0.35 }} />
                </div>
              ))}

              {/* Download PDF — compact */}
              <a
                href={PDF_URLS.starterGuide}
                download="DBR-AI-Starter-Guide.pdf"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 mt-0.5"
                style={{
                  background: "oklch(0.78 0.15 175 / 0.07)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.28)",
                  color: "oklch(0.78 0.15 175)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "10px",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.15 175 / 0.14)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.15 175 / 0.07)"; }}
              >
                <Download size={11} />
                AI Starter Guide PDF
              </a>
            </div>

            {/* CENTER: Headline + content — compact spacing */}
            <div
              className="text-center md:text-left min-w-0"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease-out 0.05s, transform 0.6s ease-out 0.05s",
              }}
            >
              {/* Eyebrow */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "oklch(0.78 0.15 175 / 0.08)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.28)",
                  color: "oklch(0.78 0.15 175)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "10px",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "oklch(0.78 0.15 175)", animation: "pulse-anim 2s infinite" }} />
                ⚡ AI-Powered Training — DBR 2026
              </div>

              {/* Headline — tighter, fits in box */}
              <h1
                className="leading-none mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(2rem, 5.5vw, 3.8rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                }}
              >
                <span style={{ color: "oklch(0.93 0.02 175)" }}>THE DBR</span>
                <br />
                <span style={{ color: "oklch(0.78 0.15 175)", textShadow: "0 0 50px oklch(0.78 0.15 175 / 0.5)" }}>
                  AI LEVERAGE
                </span>
                <br />
                <span style={{ color: "oklch(0.93 0.02 175)" }}>LAB™</span>
              </h1>

              {/* Tagline */}
              <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                <div className="h-px w-6" style={{ background: "oklch(0.78 0.15 175 / 0.5)" }} />
                <span className="text-xs tracking-widest uppercase font-bold" style={{ color: "oklch(0.5 0.06 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                  AI Accelerator Program
                </span>
                <div className="h-px w-6" style={{ background: "oklch(0.78 0.15 175 / 0.5)" }} />
              </div>

              {/* Subheadline — shorter */}
              <p
                className="mb-3 leading-snug max-w-md mx-auto md:mx-0"
                style={{
                  color: "oklch(0.70 0.04 175)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "clamp(0.8rem, 1.4vw, 0.93rem)",
                }}
              >
                12-week live training for independent producers.{" "}
                <strong style={{ color: "oklch(0.93 0.02 175)" }}>USE AI</strong> to prospect more, follow up better, and automate the busywork.{" "}
                <span style={{ color: "oklch(0.78 0.14 75)", fontWeight: 600 }}>No coding. Just more business.</span>
              </p>

              {/* Stats bar — compact */}
              <div
                className="grid grid-cols-4 gap-1.5 mb-3 px-3 py-2.5 rounded-xl"
                style={{
                  background: "oklch(0.10 0.025 240 / 0.9)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.14)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="font-black leading-none mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.78 0.15 175)", fontSize: "clamp(1rem, 2vw, 1.4rem)" }}>
                      {s.value}
                    </div>
                    <div className="uppercase tracking-wider" style={{ color: "oklch(0.42 0.05 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px" }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA buttons — compact row */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <a
                  href="mailto:mikeceo@gmail.com?subject=Register%20Me%20for%20the%20DBR%20AI%20Accelerator"
                  className="px-5 py-2.5 rounded-full font-bold transition-all duration-200"
                  style={{
                    background: "oklch(0.78 0.15 175)",
                    color: "oklch(0.07 0.02 240)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)",
                    boxShadow: "0 0 24px oklch(0.78 0.15 175 / 0.4)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                >
                  Save My Seat — Free to Start →
                </a>
                <a
                  href={PDF_URLS.week1Deck}
                  download="DBR-AI-Accelerator-Week1-Deck.pdf"
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold transition-all duration-200"
                  style={{
                    background: "oklch(0.78 0.14 75 / 0.1)",
                    color: "oklch(0.78 0.14 75)",
                    border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 75 / 0.18)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 75 / 0.1)"; }}
                >
                  <Download size={13} />
                  Week 1 Deck
                </a>
                <a
                  href="/genies"
                  className="group flex items-center gap-1.5 px-4 py-2.5 rounded-full font-bold transition-all duration-200"
                  style={{
                    background: "oklch(0.62 0.18 280 / 0.1)",
                    color: "oklch(0.78 0.15 175)",
                    border: "1px solid oklch(0.62 0.18 280 / 0.4)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.72rem, 1.2vw, 0.82rem)",
                    boxShadow: "0 0 16px oklch(0.62 0.18 280 / 0.14)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.18 280 / 0.18)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px oklch(0.78 0.15 175 / 0.28)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.18 280 / 0.1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 16px oklch(0.62 0.18 280 / 0.14)";
                  }}
                >
                  AI Genie Team
                  <Zap
                    size={14}
                    fill="currentColor"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-12 group-hover:scale-110"
                    aria-hidden="true"
                  />
                </a>
              </div>

              {/* Mobile/tablet logo strip — shows when globe is hidden */}
              <div className="lg:hidden mt-4">
                <div className="text-center md:text-left mb-2 text-xs tracking-widest uppercase font-bold" style={{ color: "oklch(0.38 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                  Master These AI Tools
                </div>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {AI_LOGOS.map((logo) => (
                    <div
                      key={logo.name}
                      className="flex items-center justify-center"
                      style={{
                        height: "42px",
                        padding: "6px 12px",
                        borderRadius: "10px",
                        background: "oklch(0.09 0.02 240 / 0.82)",
                        border: "1px solid oklch(0.78 0.15 175 / 0.16)",
                      }}
                    >
                      <img src={logo.src} alt={logo.name} className="h-full w-auto object-contain" style={{ maxWidth: "110px" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Spinning Globe + floating AI tool logos */}
            <div
              className="hidden lg:block relative"
              style={{
                minHeight: "340px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(20px)",
                transition: "opacity 0.7s ease-out 0.25s, transform 0.7s ease-out 0.25s",
              }}
            >
              {/* Globe anchored bottom-right */}
              <div className="absolute" style={{ bottom: "0", right: "0" }}>
                <SpinningGlobe size={230} />
              </div>

              {/* Floating logo cluster overlaid around the globe */}
              {FLOAT_POSITIONS.map((pos) => {
                const logo = AI_LOGOS.find((l) => l.name === pos.name)!;
                return (
                  <div
                    key={pos.name}
                    className="absolute"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      width: `${pos.w}px`,
                      padding: "6px 8px",
                      borderRadius: "12px",
                      background: "oklch(0.09 0.02 240 / 0.82)",
                      border: "1px solid oklch(0.78 0.15 175 / 0.16)",
                      backdropFilter: "blur(6px)",
                      boxShadow: "0 6px 20px oklch(0.04 0.01 240 / 0.5)",
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
                      transition: `opacity 0.5s ease-out ${pos.delay}, transform 0.5s ease-out ${pos.delay}`,
                      animation: `float-logo 5s ease-in-out ${pos.delay} infinite`,
                    }}
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className="w-full h-auto object-contain"
                      style={{ display: "block" }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* BOTTOM: Topic strip */}
          <div
            className="pb-3 pt-2 mt-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out 0.45s, transform 0.6s ease-out 0.45s",
              borderTop: "1px solid oklch(0.78 0.15 175 / 0.1)",
            }}
          >
            <div className="text-center mb-2 text-xs tracking-widest uppercase font-bold" style={{ color: "oklch(0.38 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
              Explore Topics
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
              {TOPIC_PAGES.map((topic, i) => (
                <button
                  key={topic.id}
                  onClick={() => navigate(topic.path)}
                  className="flex flex-col items-center gap-1 py-2 px-1 rounded-lg text-center transition-all duration-200"
                  style={{
                    background: "oklch(0.10 0.025 240 / 0.85)",
                    border: `1px solid color-mix(in oklch, ${topic.color} 18%, transparent)`,
                    backdropFilter: "blur(8px)",
                    transitionDelay: `${i * 30}ms`,
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = `color-mix(in oklch, ${topic.color} 10%, oklch(0.10 0.025 240))`;
                    el.style.borderColor = `color-mix(in oklch, ${topic.color} 40%, transparent)`;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = `0 6px 18px color-mix(in oklch, ${topic.color} 18%, transparent)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = "oklch(0.10 0.025 240 / 0.85)";
                    el.style.borderColor = `color-mix(in oklch, ${topic.color} 18%, transparent)`;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <span style={{ fontSize: "15px" }}>{topic.emoji}</span>
                  <span className="font-bold leading-tight" style={{ color: topic.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                    {topic.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
