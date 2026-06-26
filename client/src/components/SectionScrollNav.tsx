import { useEffect, useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

// Design: Electric Blueprint — vertical section scroll navigator
// Fixed to right edge of the boxed container, up/down arrows + active dot indicator

const SECTIONS = [
  { id: "hero",       label: "Home" },
  { id: "about",      label: "About" },
  { id: "who",        label: "Who It's For" },
  { id: "master",     label: "Skills" },
  { id: "how",        label: "How It Works" },
  { id: "curriculum", label: "Curriculum" },
  { id: "tools",      label: "Tool Stack" },
  { id: "b2b",        label: "B2B Opportunity" },
  { id: "register",   label: "Get Started" },
];

export default function SectionScrollNav() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((section, i) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Show nav after scrolling past hero
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((index: number) => {
    const id = SECTIONS[index]?.id;
    if (!id) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goUp = () => {
    const next = Math.max(0, activeIndex - 1);
    scrollTo(next);
  };

  const goDown = () => {
    const next = Math.min(SECTIONS.length - 1, activeIndex + 1);
    scrollTo(next);
  };

  return (
    <div
      className="fixed z-40 flex flex-col items-center gap-2 transition-all duration-500"
      style={{
        right: "max(calc((100vw - 1100px) / 2 - 44px), 8px)",
        top: "50%",
        transform: "translateY(-50%)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Up button */}
      <button
        onClick={goUp}
        disabled={activeIndex === 0}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: activeIndex === 0 ? "oklch(0.12 0.02 240 / 0.7)" : "oklch(0.14 0.025 240 / 0.92)",
          border: "1px solid oklch(0.78 0.15 175 / 0.18)",
          backdropFilter: "blur(10px)",
          color: activeIndex === 0 ? "oklch(0.35 0.03 175)" : "oklch(0.78 0.15 175)",
          boxShadow: activeIndex === 0 ? "none" : "0 0 14px oklch(0.78 0.15 175 / 0.15)",
          cursor: activeIndex === 0 ? "default" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (activeIndex === 0) return;
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 22px oklch(0.78 0.15 175 / 0.35)";
          (e.currentTarget as HTMLElement).style.background = "oklch(0.18 0.03 240 / 0.95)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = activeIndex === 0 ? "none" : "0 0 14px oklch(0.78 0.15 175 / 0.15)";
          (e.currentTarget as HTMLElement).style.background = activeIndex === 0 ? "oklch(0.12 0.02 240 / 0.7)" : "oklch(0.14 0.025 240 / 0.92)";
        }}
        title="Previous section"
        aria-label="Scroll to previous section"
      >
        <ChevronUp size={16} />
      </button>

      {/* Dot indicators */}
      <div className="flex flex-col items-center gap-2 py-1">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollTo(i)}
            title={section.label}
            aria-label={`Go to ${section.label}`}
            className="relative flex items-center justify-center transition-all duration-300"
            style={{
              width: i === activeIndex ? "10px" : "7px",
              height: i === activeIndex ? "10px" : "7px",
            }}
          >
            <span
              className="rounded-full block transition-all duration-300"
              style={{
                width: "100%",
                height: "100%",
                background: i === activeIndex
                  ? "oklch(0.78 0.15 175)"
                  : "oklch(0.35 0.04 175 / 0.7)",
                boxShadow: i === activeIndex
                  ? "0 0 10px oklch(0.78 0.15 175 / 0.8), 0 0 20px oklch(0.78 0.15 175 / 0.4)"
                  : "none",
              }}
            />
            {/* Tooltip on hover */}
            <span
              className="absolute right-full mr-3 px-2 py-1 rounded text-xs font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              style={{
                background: "oklch(0.12 0.025 240 / 0.95)",
                color: "oklch(0.78 0.15 175)",
                border: "1px solid oklch(0.78 0.15 175 / 0.2)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "10px",
              }}
            >
              {section.label}
            </span>
          </button>
        ))}
      </div>

      {/* Down button */}
      <button
        onClick={goDown}
        disabled={activeIndex === SECTIONS.length - 1}
        className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          background: activeIndex === SECTIONS.length - 1
            ? "oklch(0.12 0.02 240 / 0.7)"
            : "oklch(0.14 0.025 240 / 0.92)",
          border: `1px solid ${activeIndex === SECTIONS.length - 1 ? "oklch(0.78 0.15 175 / 0.1)" : "oklch(0.78 0.15 175 / 0.4)"}`,
          backdropFilter: "blur(10px)",
          color: activeIndex === SECTIONS.length - 1 ? "oklch(0.35 0.03 175)" : "oklch(0.78 0.15 175)",
          boxShadow: activeIndex === SECTIONS.length - 1 ? "none" : "0 0 18px oklch(0.78 0.15 175 / 0.3)",
          cursor: activeIndex === SECTIONS.length - 1 ? "default" : "pointer",
        }}
        onMouseEnter={(e) => {
          if (activeIndex === SECTIONS.length - 1) return;
          (e.currentTarget as HTMLElement).style.boxShadow = "0 0 28px oklch(0.78 0.15 175 / 0.5)";
          (e.currentTarget as HTMLElement).style.background = "oklch(0.18 0.03 240 / 0.95)";
        }}
        onMouseLeave={(e) => {
          const isLast = activeIndex === SECTIONS.length - 1;
          (e.currentTarget as HTMLElement).style.boxShadow = isLast ? "none" : "0 0 18px oklch(0.78 0.15 175 / 0.3)";
          (e.currentTarget as HTMLElement).style.background = isLast ? "oklch(0.12 0.02 240 / 0.7)" : "oklch(0.14 0.025 240 / 0.92)";
        }}
        title="Next section"
        aria-label="Scroll to next section"
      >
        <ChevronDown size={16} />
      </button>
    </div>
  );
}
