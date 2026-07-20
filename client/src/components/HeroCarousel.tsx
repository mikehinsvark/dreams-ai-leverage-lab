/* Electric Blueprint × Quantum Bolt: preserve the live six-tool carousel with compact mission-control framing, cyan navigation signals, and non-blocking motion. */
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import chatgptLogo from "@/assets/logos/chatgpt.webp";
import claudeLogo from "@/assets/logos/claude.webp";
import manusLogo from "@/assets/logos/manus.webp";
import geminiLogo from "@/assets/logos/gemini.webp";
import grokLogo from "@/assets/logos/grok.webp";
import notebookLmLogo from "@/assets/logos/notebooklm.webp";

export const AI_TOOL_LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Claude", src: claudeLogo },
  { name: "Manus", src: manusLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Grok", src: grokLogo },
  { name: "NotebookLM", src: notebookLmLogo },
] as const;

const AUTOPLAY_INTERVAL_MS = 3200;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const step = useCallback((direction: number) => {
    setActiveIndex((current) => (current + direction + AI_TOOL_LOGOS.length) % AI_TOOL_LOGOS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(
      () => setActiveIndex((current) => (current + 1) % AI_TOOL_LOGOS.length),
      AUTOPLAY_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: "360px" }}
      role="region"
      aria-label="AI tools featured in the program"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="relative overflow-hidden rounded-3xl"
        style={{
          width: "340px",
          height: "340px",
          border: "1px solid oklch(0.78 0.15 175 / 0.22)",
          boxShadow: "0 20px 60px oklch(0.03 0.01 240 / 0.7), 0 0 40px oklch(0.78 0.15 175 / 0.08)",
          background: "oklch(0.06 0.015 240)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, oklch(0.78 0.15 175 / 0.10) 0%, transparent 70%)" }}
        />
        {AI_TOOL_LOGOS.map((tool, index) => (
          <img
            key={tool.name}
            src={tool.src}
            alt={`${tool.name} — AI tool you'll master`}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transform: index === activeIndex ? "scale(1)" : "scale(1.04)",
              transition: "opacity 0.6s cubic-bezier(0.23,1,0.32,1), transform 0.7s cubic-bezier(0.23,1,0.32,1)",
              pointerEvents: "none",
            }}
            draggable={false}
          />
        ))}
        <button
          type="button"
          aria-label="Previous tool"
          onClick={() => step(-1)}
          className="absolute left-2 top-1/2 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            background: "oklch(0.08 0.02 240 / 0.7)",
            border: "1px solid oklch(0.78 0.15 175 / 0.3)",
            color: "oklch(0.85 0.1 175)",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(event) => { event.currentTarget.style.background = "oklch(0.78 0.15 175 / 0.22)"; }}
          onMouseLeave={(event) => { event.currentTarget.style.background = "oklch(0.08 0.02 240 / 0.7)"; }}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          aria-label="Next tool"
          onClick={() => step(1)}
          className="absolute right-2 top-1/2 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            transform: "translateY(-50%)",
            width: "34px",
            height: "34px",
            background: "oklch(0.08 0.02 240 / 0.7)",
            border: "1px solid oklch(0.78 0.15 175 / 0.3)",
            color: "oklch(0.85 0.1 175)",
            backdropFilter: "blur(6px)",
          }}
          onMouseEnter={(event) => { event.currentTarget.style.background = "oklch(0.78 0.15 175 / 0.22)"; }}
          onMouseLeave={(event) => { event.currentTarget.style.background = "oklch(0.08 0.02 240 / 0.7)"; }}
        >
          <ChevronRight size={18} />
        </button>
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-center py-2"
          style={{ background: "linear-gradient(to top, oklch(0.05 0.015 240 / 0.9), transparent)" }}
        >
          <span
            className="text-[11px] font-bold uppercase tracking-widest"
            style={{ color: "oklch(0.85 0.1 175)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {AI_TOOL_LOGOS[activeIndex].name}
          </span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-center gap-2" aria-label="Choose an AI tool">
        {AI_TOOL_LOGOS.map((tool, index) => (
          <button
            type="button"
            key={tool.name}
            aria-label={`Show ${tool.name}`}
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className="rounded-full transition-all duration-200"
            style={{
              width: index === activeIndex ? "22px" : "7px",
              height: "7px",
              background: index === activeIndex ? "oklch(0.78 0.15 175)" : "oklch(0.78 0.15 175 / 0.28)",
              boxShadow: index === activeIndex ? "0 0 8px oklch(0.78 0.15 175 / 0.6)" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}
