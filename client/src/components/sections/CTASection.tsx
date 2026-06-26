import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Download } from "lucide-react";
import { PDF_URLS } from "@/lib/constants";

export default function CTASection() {
  const ref = useScrollReveal();

  return (
    <section id="register" className="py-24" ref={ref} style={{ background: "oklch(0.09 0.022 240)" }}>
      <div className="container">
        <div
          className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center reveal"
          style={{
            background: "linear-gradient(135deg, oklch(0.78 0.15 175 / 0.07) 0%, oklch(0.62 0.18 280 / 0.07) 100%)",
            border: "1px solid oklch(0.78 0.15 175 / 0.35)",
            boxShadow: "0 0 80px oklch(0.78 0.15 175 / 0.1), 0 0 80px oklch(0.62 0.18 280 / 0.06)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.78 0.15 175 / 0.05) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10">
            <div className="text-5xl mb-6">🚀</div>
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "oklch(0.93 0.02 175)",
                lineHeight: 1.15,
              }}
            >
              Ready to Build Your{" "}
              <span style={{ color: "oklch(0.78 0.15 175)", textShadow: "0 0 30px oklch(0.78 0.15 175 / 0.5)" }}>
                AI Advantage?
              </span>
            </h2>
            <p
              className="text-base max-w-xl mx-auto mb-8 leading-relaxed"
              style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Seats are limited to keep classes interactive. Register now and get the Week 1 Starter Guide the moment you join. Live on Zoom · Recordings included · Free tools to start.
            </p>

            {/* Value props */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { icon: "⏱️", text: "Save Time" },
                { icon: "📈", text: "Grow Revenue" },
                { icon: "🤝", text: "Build Partnerships" },
                { icon: "🎯", text: "Create Freedom" },
                { icon: "🏆", text: "Live Your Dreams" },
              ].map((v, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: "oklch(0.78 0.15 175 / 0.06)",
                    border: "1px solid oklch(0.78 0.15 175 / 0.2)",
                    color: "oklch(0.75 0.04 175)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  <span>{v.icon}</span>
                  <span>{v.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <a
                href="mailto:mikeceo@gmail.com?subject=Register%20Me%20for%20the%20DBR%20AI%20Accelerator"
                className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-200"
                style={{
                  background: "oklch(0.78 0.15 175)",
                  color: "oklch(0.08 0.02 240)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: "0 0 40px oklch(0.78 0.15 175 / 0.5), 0 4px 20px oklch(0.78 0.15 175 / 0.35)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 60px oklch(0.78 0.15 175 / 0.7), 0 6px 28px oklch(0.78 0.15 175 / 0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px oklch(0.78 0.15 175 / 0.5), 0 4px 20px oklch(0.78 0.15 175 / 0.35)";
                }}
              >
                Save My Seat — It's Free to Start →
              </a>
            </div>

            {/* PDF Downloads */}
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <a
                href={PDF_URLS.starterGuide}
                download="DBR-AI-Starter-Guide.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200"
                style={{
                  background: "oklch(0.78 0.14 75 / 0.1)",
                  color: "oklch(0.78 0.14 75)",
                  border: "1px solid oklch(0.78 0.14 75 / 0.35)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 75 / 0.18)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.78 0.14 75 / 0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.14 75 / 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Download size={15} />
                Download AI Starter Guide PDF
              </a>
              <a
                href={PDF_URLS.week1Deck}
                download="DBR-AI-Accelerator-Week1-Deck.pdf"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200"
                style={{
                  background: "oklch(0.62 0.18 280 / 0.1)",
                  color: "oklch(0.62 0.18 280)",
                  border: "1px solid oklch(0.62 0.18 280 / 0.35)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.18 280 / 0.18)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px oklch(0.62 0.18 280 / 0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.62 0.18 280 / 0.1)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                <Download size={15} />
                Download Week 1 Deck PDF
              </a>
              <a
                href="https://dreamsfaststart.com"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  color: "oklch(0.65 0.04 175)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.2)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "oklch(0.78 0.15 175 / 0.06)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                ← Back to DBR Fast Start
              </a>
            </div>

            <p
              className="text-xs"
              style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Live on Zoom · Recordings included · Free tools to start · Bring a colleague
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-xs mt-8 max-w-2xl mx-auto leading-relaxed"
          style={{
            color: "oklch(0.35 0.03 175)",
            fontFamily: "'DM Sans', sans-serif",
            borderTop: "1px solid oklch(0.78 0.15 175 / 0.08)",
            paddingTop: "2rem",
          }}
        >
          This page is for educational purposes only. Claude, ChatGPT, Manus, and NotebookLM are products of their respective companies; DBR is not affiliated with or compensated by them. Income results vary. DBR training materials are provided for informational use only.
        </p>
      </div>
    </section>
  );
}
