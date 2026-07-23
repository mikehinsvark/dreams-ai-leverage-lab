/* Electric Blueprint × Quantum Bolt: compact mission-control hero preserving the live countdown, six-tool carousel, status rail, conversion actions, and topic strip. */
import { useEffect, useState } from "react";
import { Download, Zap } from "lucide-react";
import ClassCountdown from "@/components/ClassCountdown";
import HeroCarousel, { AI_TOOL_LOGOS } from "@/components/HeroCarousel";
import { PDF_URLS, TOPIC_PAGES } from "@/lib/constants";
import quantumBolt from "@/assets/brand/ai-leverage-lab-icon.svg";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663540400260/NPKEju6a8tZEcsR375b28w/hero-main-6pXgkmpBShCiMeNcqm3tLH.webp";

const statusCards = [
  { label: "SYSTEM STATUS", value: "ONLINE", color: "oklch(0.78 0.15 175)", icon: "⚡", pulse: true },
  { label: "ACTIVE PRODUCERS", value: "11,000+", color: "oklch(0.62 0.18 280)", icon: "👥" },
  { label: "NETWORK STRENGTH", value: "98.7%", color: "oklch(0.78 0.14 75)", icon: "🌐" },
  { label: "AI TOOLS READY", value: "5 FREE", color: "oklch(0.68 0.15 240)", icon: "🤖" },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 100);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex flex-col overflow-hidden" style={{ background: "#03090D" }}>
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <img src={HERO_IMAGE} alt="" className="h-full w-full object-cover" style={{ opacity: 0.18 }} />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(3,9,13,0.98) 0%, rgba(7,27,42,0.82) 55%, rgba(3,9,13,0.94) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(65% 55% at 62% 42%, rgba(0,231,224,0.08) 0%, transparent 65%)" }}
        />
      </div>

      <div className="relative z-10 flex flex-col">
        <div className="container flex flex-col py-4 md:py-5">
          <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[160px_1fr] lg:grid-cols-[160px_1fr_400px] lg:gap-4">
            <aside
              className="hidden flex-col gap-1.5 md:flex"
              aria-label="AI Leverage Lab system status"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-16px)",
                transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1) 0.15s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.15s",
              }}
            >
              {statusCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-lg px-3 py-2"
                  style={{ background: "oklch(0.1 0.025 240 / 0.92)", border: "1px solid oklch(0.78 0.15 175 / 0.14)", backdropFilter: "blur(8px)" }}
                >
                  <div className="mb-0.5 flex items-center gap-1.5">
                    <span style={{ fontSize: "11px" }}>{card.icon}</span>
                    <span className="text-xs uppercase tracking-wider" style={{ color: "oklch(0.4 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                      {card.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {card.pulse && (
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: card.color, boxShadow: `0 0 6px ${card.color}`, animation: "pulse-anim 2s infinite" }}
                      />
                    )}
                    <span className="font-black leading-none" style={{ fontFamily: "'Space Grotesk', sans-serif", color: card.color, fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)" }}>
                      {card.value}
                    </span>
                  </div>
                  <div className="mt-1.5 h-px rounded-full" style={{ background: `linear-gradient(90deg, ${card.color}, transparent)`, opacity: 0.35 }} />
                </div>
              ))}
              <a
                href={PDF_URLS.starterGuide}
                download="DBR-AI-Starter-Guide.pdf"
                className="mt-0.5 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200"
                style={{ background: "oklch(0.78 0.15 175 / 0.07)", border: "1px solid oklch(0.78 0.15 175 / 0.28)", color: "oklch(0.78 0.15 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}
              >
                <Download size={11} /> AI Starter Guide PDF
              </a>
            </aside>

            <div
              className="min-w-0 text-center md:text-left"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1) 0.05s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.05s",
              }}
            >
              <div
                className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ background: "rgba(0,231,224,0.08)", border: "1px solid rgba(0,231,224,0.26)", color: "#00E7E0", fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}
              >
                <img src={quantumBolt} alt="" aria-hidden="true" className="h-4 w-4" />
                Quantum Bolt · Live AI Accelerator
              </div>

              <div className="mb-3 flex justify-center md:justify-start">
                <ClassCountdown />
              </div>

              <div className="mb-2 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3 md:justify-start">
                <div
                  className="flex h-[82px] w-[82px] shrink-0 items-center justify-center sm:h-[92px] sm:w-[92px]"
                  style={{ background: "radial-gradient(circle, rgba(0,231,224,0.13) 0%, rgba(42,140,255,0.04) 52%, transparent 72%)" }}
                >
                  <img src={quantumBolt} alt="" aria-hidden="true" className="h-[84%] w-[84%] object-contain" />
                </div>
                <h1
                  className="leading-[0.88]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem, 4.8vw, 3.6rem)", fontWeight: 800, letterSpacing: "-0.045em" }}
                >
                  <span style={{ color: "#00E7E0", textShadow: "0 0 28px rgba(0,231,224,0.2)" }}>AI</span>{" "}
                  <span style={{ color: "#EAFBFF" }}>Leverage</span>
                  <br />
                  <span style={{ color: "#00E7E0", textShadow: "0 0 28px rgba(42,140,255,0.18)" }}>Lab</span>
                  <sup className="ml-1 align-top text-[0.28em] tracking-normal" style={{ color: "#00E7E0" }}>™</sup>
                </h1>
              </div>

              <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
                <div className="h-px w-6" style={{ background: "#F4C542" }} />
                <span className="text-xs font-bold uppercase tracking-[0.23em]" style={{ color: "#9FC3CA", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                  Leverage · Speed · Action
                </span>
                <div className="h-px w-6" style={{ background: "#F4C542" }} />
              </div>

              <p className="mx-auto mb-3 max-w-md leading-snug md:mx-0" style={{ color: "oklch(0.7 0.04 175)", fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.8rem, 1.4vw, 0.93rem)" }}>
                12-week live training for independent producers. <strong style={{ color: "#EAFBFF" }}>USE AI</strong> to prospect more, follow up better, and automate the busywork. <span style={{ color: "#F4C542", fontWeight: 600 }}>No coding. Just more business.</span>
              </p>

              <div className="dbr-genie-action-row flex flex-wrap justify-center gap-2 md:justify-start">
                <a
                  href="https://myhumanos.pro/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2.5 font-bold transition-all duration-200"
                  style={{ background: "#00E7E0", color: "#03090D", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)", boxShadow: "0 0 24px rgba(0,231,224,0.28)" }}
                >
                  Human Intelligence Operating System →
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1tR2fmwFxFq9xd3RYwWYO3OJdZ07YMojA?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-full px-4 py-2.5 font-bold transition-all duration-200"
                  style={{ background: "rgba(244,197,66,0.1)", color: "#F4C542", border: "1px solid rgba(244,197,66,0.35)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)" }}
                >
                  <Download size={13} /> Google Drive Docs
                </a>
                <a
                  href="https://zoom.dreamsresources.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2.5 font-bold transition-all duration-200"
                  style={{ background: "transparent", color: "oklch(0.55 0.04 175)", border: "1px solid oklch(0.78 0.15 175 / 0.18)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)" }}
                >
                  Zoom Link
                </a>
                <a
                  href="/genies/"
                  className="dbr-genie-hero-link inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-bold transition-all duration-200"
                  aria-label="Open AI Genie Team"
                  style={{
                    background: "linear-gradient(135deg, rgba(42,140,255,0.14), rgba(0,231,224,0.07))",
                    color: "#8DF3EF",
                    border: "1px solid rgba(42,140,255,0.34)",
                    boxShadow: "inset 0 0 18px rgba(42,140,255,0.05)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "clamp(0.78rem, 1.3vw, 0.88rem)",
                  }}
                >
                  AI Genie Team <Zap size={14} style={{ color: "#F4C542" }} aria-hidden="true" />
                </a>
              </div>

              <div className="mt-4 lg:hidden">
                <div className="mb-2 text-center text-xs font-bold uppercase tracking-widest md:text-left" style={{ color: "oklch(0.38 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                  Master These AI Tools
                </div>
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                  {AI_TOOL_LOGOS.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center justify-center overflow-hidden"
                      style={{ width: "52px", height: "52px", borderRadius: "14px", background: "oklch(0.06 0.015 240)", border: "1px solid oklch(0.78 0.15 175 / 0.2)" }}
                      title={tool.name}
                    >
                      <img src={tool.src} alt={tool.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="relative hidden items-center justify-center lg:flex"
              style={{
                minHeight: "380px",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(18px)",
                transition: "opacity 0.7s cubic-bezier(0.23,1,0.32,1) 0.25s, transform 0.7s cubic-bezier(0.23,1,0.32,1) 0.25s",
              }}
            >
              <HeroCarousel />
            </div>
          </div>

          <div
            className="mt-2 pb-3 pt-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1) 0.45s, transform 0.6s cubic-bezier(0.23,1,0.32,1) 0.45s",
              borderTop: "1px solid oklch(0.78 0.15 175 / 0.1)",
            }}
          >
            <div className="mb-2 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "oklch(0.38 0.04 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
              Explore Topics
            </div>
            <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-8">
              {TOPIC_PAGES.map((topic, index) => (
                <a
                  key={topic.id}
                  href={`${topic.path}/`}
                  className="flex flex-col items-center gap-1 rounded-lg px-1 py-2 text-center transition-all duration-200"
                  style={{
                    background: "oklch(0.1 0.025 240 / 0.85)",
                    border: `1px solid color-mix(in oklch, ${topic.color} 18%, transparent)`,
                    backdropFilter: "blur(8px)",
                    transitionDelay: `${index * 30}ms`,
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.background = `color-mix(in oklch, ${topic.color} 9%, oklch(0.1 0.025 240))`;
                    event.currentTarget.style.transform = "translateY(-2px)";
                    event.currentTarget.style.boxShadow = `0 0 18px color-mix(in oklch, ${topic.color} 18%, transparent)`;
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.background = "oklch(0.1 0.025 240 / 0.85)";
                    event.currentTarget.style.transform = "translateY(0)";
                    event.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: topic.color, boxShadow: `0 0 7px ${topic.color}` }} />
                    <span className="tabular-nums" style={{ color: "rgba(159,195,202,0.7)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="font-bold leading-tight" style={{ color: topic.color, fontFamily: "'Space Grotesk', sans-serif", fontSize: "9px" }}>
                    {topic.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
