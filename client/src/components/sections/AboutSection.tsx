import { useScrollReveal } from "@/hooks/useScrollReveal";

const differentiators = [
  {
    icon: "🚫",
    wrong: "Learn to code or 'vibe code'",
    right: "Prospect more people, with AI research",
  },
  {
    icon: "🚫",
    wrong: "Build apps or AI tools to sell",
    right: "Follow up until it pays — automatically",
  },
  {
    icon: "🚫",
    wrong: "Start an 'AI agency' selling software",
    right: "Automate the busywork, reclaim your time",
  },
  {
    icon: "🚫",
    wrong: "Chase every new shiny tool",
    right: "Become more efficient AND more profitable",
  },
];

export default function AboutSection() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="py-24" ref={ref}>
      <div className="container">
        {/* Section header */}
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">Program Philosophy</span>
          <div className="sec-divider-line-rev" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="mb-6 reveal"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 800,
                color: "oklch(0.93 0.02 175)",
                lineHeight: 1.15,
              }}
            >
              This Class Is{" "}
              <span style={{ color: "oklch(0.78 0.15 175)", textShadow: "0 0 30px oklch(0.78 0.15 175 / 0.4)" }}>
                Different
              </span>
            </h2>
            <p
              className="mb-6 text-base leading-relaxed reveal"
              style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Most AI training online teaches people to build tools, write code, or start AI agencies.
              This program does the opposite. It teaches working producers how to{" "}
              <strong style={{ color: "oklch(0.93 0.02 175)" }}>USE AI</strong> to do the three things
              that actually pay: prospect more people, follow up better, and get hours back every week
              through automation.
            </p>
            <p
              className="mb-8 text-base leading-relaxed reveal"
              style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Nobody graduates as a programmer. Everybody graduates with{" "}
              <strong style={{ color: "oklch(0.78 0.14 75)" }}>working systems running inside their own business.</strong>
            </p>
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-xl reveal"
              style={{
                background: "oklch(0.78 0.14 75 / 0.08)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <span style={{ fontSize: "1.5rem" }}>🎯</span>
              <span
                className="text-sm font-semibold"
                style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                One skill per week · Live demos · Homework that makes you money
              </span>
            </div>
          </div>

          {/* Right: comparison cards */}
          <div className="space-y-3">
            {differentiators.map((d, i) => (
              <div
                key={i}
                className="reveal rounded-xl overflow-hidden"
                style={{
                  background: "oklch(0.11 0.025 240)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.1)",
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <div className="flex">
                  {/* Wrong side */}
                  <div
                    className="flex-1 px-4 py-3 flex items-center gap-3"
                    style={{ borderRight: "1px solid oklch(0.78 0.15 175 / 0.1)" }}
                  >
                    <span className="text-base flex-shrink-0">❌</span>
                    <span
                      className="text-xs line-through"
                      style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {d.wrong}
                    </span>
                  </div>
                  {/* Right side */}
                  <div className="flex-1 px-4 py-3 flex items-center gap-3">
                    <span className="text-base flex-shrink-0">✅</span>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "oklch(0.78 0.15 175)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {d.right}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Now stats */}
        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 reveal"
          style={{ marginTop: "4rem" }}
        >
          {[
            { num: "5–10", label: "Hours saved weekly", sub: "by producers who use AI daily" },
            { num: "80%", label: "of sales need 5+ follow-ups", sub: "most agents stop at 2" },
            { num: "95%", label: "of your competitors", sub: "still aren't using AI seriously" },
          ].map((s, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl"
              style={{
                background: "oklch(0.11 0.025 240)",
                border: "1px solid oklch(0.78 0.15 175 / 0.15)",
                boxShadow: "0 0 20px oklch(0.78 0.15 175 / 0.05)",
              }}
            >
              <div
                className="text-4xl font-black mb-2"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.78 0.15 175)",
                  textShadow: "0 0 24px oklch(0.78 0.15 175 / 0.4)",
                }}
              >
                {s.num}
              </div>
              <div
                className="text-sm font-bold mb-1"
                style={{ color: "oklch(0.93 0.02 175)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.label}
              </div>
              <div
                className="text-xs"
                style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-6 text-sm font-semibold reveal"
          style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          The producers who learn this FIRST win the next five years.
        </p>
      </div>
    </section>
  );
}
