import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "📅",
    title: "Show Up Weekly",
    desc: "One live 45–60 min class, same day and time every week",
    color: "oklch(0.75 0.04 175)",
  },
  {
    num: "👀",
    title: "Watch It Built Live",
    desc: "Real demos for YOUR industry — no theory-only slides",
    color: "oklch(0.62 0.18 280)",
  },
  {
    num: "✅",
    title: "Apply It That Week",
    desc: "One homework assignment that makes you money before next class",
    color: "oklch(0.78 0.15 175)",
  },
  {
    num: "🏆",
    title: "Share Your Win",
    desc: "We open every class with recognition — celebrate every result",
    color: "oklch(0.78 0.14 75)",
  },
];

export default function HowItWorksSection() {
  const ref = useScrollReveal();

  return (
    <section id="how" className="py-24" ref={ref} style={{ background: "oklch(0.09 0.022 240)" }}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">How It Works</span>
          <div className="sec-divider-line-rev" />
        </div>

        <div className="text-center mb-12">
          <h2
            className="mb-4 reveal"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 800,
              color: "oklch(0.93 0.02 175)",
            }}
          >
            The Weekly Rhythm
          </h2>
          <p
            className="text-base max-w-xl mx-auto reveal"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Simple. Consistent. Results-driven. Every week builds on the last.
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 rounded-2xl overflow-hidden reveal"
          style={{ border: "1px solid oklch(0.78 0.15 175 / 0.2)", boxShadow: "0 0 40px oklch(0.78 0.15 175 / 0.07)" }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              className="p-8 text-center transition-colors duration-200"
              style={{
                background: "oklch(0.11 0.025 240)",
                borderRight: i < steps.length - 1 ? "1px solid oklch(0.78 0.15 175 / 0.12)" : "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.13 0.028 240)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "oklch(0.11 0.025 240)";
              }}
            >
              <div className="text-4xl mb-4">{step.num}</div>
              <div
                className="text-sm font-bold mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: step.color }}
              >
                {step.title}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Class format breakdown */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { time: "5 min", label: "Wins & Recognition", desc: "Students share results. Celebrate every win publicly.", color: "oklch(0.78 0.14 75)" },
            { time: "10–15 min", label: "Teach", desc: "One concept, plain English, with industry examples.", color: "oklch(0.78 0.15 175)" },
            { time: "20–25 min", label: "Live Demo", desc: "Mike builds it live on screen. No slides-only theory.", color: "oklch(0.62 0.18 280)" },
            { time: "10 min", label: "Homework + Q&A", desc: "One specific assignment due before next class.", color: "oklch(0.68 0.15 240)" },
          ].map((item, i) => (
            <div
              key={i}
              className="reveal rounded-xl p-5"
              style={{
                background: "oklch(0.11 0.025 240)",
                border: "1px solid oklch(0.78 0.15 175 / 0.1)",
                transitionDelay: `${i * 60}ms`,
              }}
            >
              <div
                className="text-2xl font-black mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: item.color }}
              >
                {item.time}
              </div>
              <div
                className="text-sm font-bold mb-1"
                style={{ color: "oklch(0.93 0.02 175)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.label}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
