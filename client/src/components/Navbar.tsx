/* Electric Blueprint navigation: compact, high-contrast, and consistent across desktop and mobile routes. */
import { useState, useEffect } from "react";
import { Menu, X, Download, ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { PDF_URLS, TOPIC_PAGES } from "@/lib/constants";

const mainLinks = [
  { label: "About", href: "#about" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Tool Stack", href: "#tools" },
  { label: "B2B Opportunity", href: "#b2b" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [topicsOpen, setTopicsOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setTopicsOpen(false);
    if (href.startsWith("#")) {
      // If we're not on home, navigate home first then scroll
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleTopicClick = (path: string) => {
    setMobileOpen(false);
    setTopicsOpen(false);
    navigate(path);
  };

  return (
    <header
      className="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.08 0.02 240 / 0.97)"
          : "oklch(0.08 0.02 240 / 0.88)",
        backdropFilter: "blur(14px)",
        borderBottom: scrolled
          ? "1px solid oklch(0.78 0.15 175 / 0.15)"
          : "1px solid transparent",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black"
              style={{
                background: "linear-gradient(135deg, oklch(0.78 0.15 175), oklch(0.68 0.15 175))",
                color: "oklch(0.08 0.02 240)",
                boxShadow: "0 0 16px oklch(0.78 0.15 175 / 0.4)",
              }}
            >
              DBR
            </div>
            <div>
              <div
                className="text-sm font-bold leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.78 0.15 175)" }}
              >
                AI Leverage Lab™
              </div>
              <div className="text-xs leading-none mt-0.5" style={{ color: "oklch(0.45 0.04 175)" }}>
                Dreams Business Resources
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {mainLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium transition-colors duration-150"
                style={{ color: "oklch(0.65 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "oklch(0.78 0.15 175)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "oklch(0.65 0.04 175)")}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleTopicClick("/whileyousleep")}
              className="text-sm font-bold transition-all duration-150"
              style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "oklch(0.86 0.15 75)";
                (e.currentTarget as HTMLElement).style.textShadow = "0 0 14px oklch(0.78 0.14 75 / 0.35)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.14 75)";
                (e.currentTarget as HTMLElement).style.textShadow = "none";
              }}
            >
              While You Sleep
            </button>

            {/* Topics dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-sm font-medium transition-colors duration-150"
                style={{ color: "oklch(0.65 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
                onClick={() => setTopicsOpen(!topicsOpen)}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.15 175)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.65 0.04 175)")}
              >
                Topics
                <ChevronDown
                  size={14}
                  style={{
                    transform: topicsOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {topicsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "oklch(0.10 0.025 240 / 0.98)",
                    border: "1px solid oklch(0.78 0.15 175 / 0.2)",
                    boxShadow: "0 16px 48px oklch(0.07 0.02 240 / 0.8)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {TOPIC_PAGES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleTopicClick(t.path)}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-150"
                      style={{ borderBottom: "1px solid oklch(0.78 0.15 175 / 0.06)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.background = `color-mix(in oklch, ${t.color} 8%, transparent)`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      <span className="text-base">{t.emoji}</span>
                      <div>
                        <div className="text-xs font-bold" style={{ color: t.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                          {t.label}
                        </div>
                        <div className="text-xs" style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}>
                          {t.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Downloads */}
            <a
              href={PDF_URLS.starterGuide}
              download="DBR-AI-Starter-Guide.pdf"
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-150"
              style={{ color: "oklch(0.65 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.78 0.14 75)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "oklch(0.65 0.04 175)")}
            >
              <Download size={13} />
              Starter Guide
            </a>

            <a
              href="/savemyseat/"
              className="inline-flex shrink-0 items-center justify-center rounded-xl font-bold transition-all duration-200"
              style={{
                background: "oklch(0.78 0.15 175)",
                color: "oklch(0.08 0.02 240)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: "0 0 18px oklch(0.78 0.15 175 / 0.3)",
                fontSize: "13px",
                lineHeight: 1,
                padding: "9px 15px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px oklch(0.78 0.15 175 / 0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.78 0.15 175 / 0.3)";
              }}
            >
              Save My Seat →
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            style={{ color: "oklch(0.78 0.15 175)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{
            background: "oklch(0.08 0.02 240 / 0.98)",
            borderColor: "oklch(0.78 0.15 175 / 0.15)",
          }}
        >
          <div className="container py-4 flex flex-col gap-2">
            {mainLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-sm font-medium py-2"
                style={{ color: "oklch(0.65 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleTopicClick("/whileyousleep")}
              className="text-left text-sm font-bold py-2"
              style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              While You Sleep →
            </button>
            <div
              className="py-2 border-t"
              style={{ borderColor: "oklch(0.78 0.15 175 / 0.1)" }}
            >
              <div
                className="text-xs uppercase tracking-widest font-bold mb-2"
                style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Topics
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {TOPIC_PAGES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTopicClick(t.path)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-left"
                    style={{
                      background: `color-mix(in oklch, ${t.color} 8%, transparent)`,
                      border: `1px solid color-mix(in oklch, ${t.color} 20%, transparent)`,
                      color: t.color,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  >
                    <span>{t.emoji}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <a
                href={PDF_URLS.starterGuide}
                download="DBR-AI-Starter-Guide.pdf"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.1)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                <Download size={12} />
                Starter Guide
              </a>
              <a
                href="/savemyseat/"
                className="flex-1 inline-flex items-center justify-center rounded-xl text-xs font-bold text-center"
                style={{
                  background: "oklch(0.78 0.15 175)",
                  color: "oklch(0.08 0.02 240)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  padding: "9px 13px",
                  whiteSpace: "nowrap",
                }}
              >
                Save My Seat →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Close topics dropdown on outside click */}
      {topicsOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setTopicsOpen(false)}
        />
      )}
    </header>
  );
}
