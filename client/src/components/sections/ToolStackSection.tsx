import { useScrollReveal } from "@/hooks/useScrollReveal";

const TOOLS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663540400260/NPKEju6a8tZEcsR375b28w/hero-tools-4HWCWkUkvUfT4PVf3JxS8d.webp";

const tools = [
  {
    icon: "🧠",
    name: "Claude",
    tag: "Home Base",
    tagColor: "oklch(0.78 0.15 175)",
    tagBg: "oklch(0.78 0.15 175 / 0.1)",
    tagBorder: "oklch(0.78 0.15 175 / 0.25)",
    cardClass: "glow-card-teal",
    nameColor: "oklch(0.78 0.15 175)",
    desc: "Your thinking partner for writing, strategy, scripts, and research.",
    features: [
      "Projects keep your business context loaded",
      "Free to start — upgrade when you're getting results",
      "Used every single week of the program",
    ],
    week: "Start Week 1",
  },
  {
    icon: "⚙️",
    name: "Claude Cowork",
    tag: "The Doer",
    tagColor: "oklch(0.62 0.18 280)",
    tagBg: "oklch(0.62 0.18 280 / 0.1)",
    tagBorder: "oklch(0.62 0.18 280 / 0.25)",
    cardClass: "glow-card-purple",
    nameColor: "oklch(0.62 0.18 280)",
    desc: "Builds real documents, spreadsheets, and decks — and runs tasks on a schedule.",
    features: [
      "Automatic morning briefings",
      "Works with your actual files",
      "Scheduled tasks run while you sleep",
    ],
    week: "Introduced Week 8",
  },
  {
    icon: "💬",
    name: "ChatGPT",
    tag: "Second Opinion",
    tagColor: "oklch(0.68 0.15 240)",
    tagBg: "oklch(0.68 0.15 240 / 0.1)",
    tagBorder: "oklch(0.68 0.15 240 / 0.25)",
    cardClass: "glow-card-blue",
    nameColor: "oklch(0.68 0.15 240)",
    desc: "Voice mode for practicing scripts and objections out loud, plus image generation.",
    features: [
      "Role-play your toughest objection",
      "Practice phone scripts in the car",
      "Free to start",
    ],
    week: "Start Week 1",
  },
  {
    icon: "🚀",
    name: "Manus",
    tag: "The Delegator",
    tagColor: "oklch(0.78 0.14 75)",
    tagBg: "oklch(0.78 0.14 75 / 0.1)",
    tagBorder: "oklch(0.78 0.14 75 / 0.25)",
    cardClass: "glow-card-gold",
    nameColor: "oklch(0.78 0.14 75)",
    desc: "Hand it whole projects and get back finished work — reports, decks, simple pages.",
    features: [
      "Reports, decks & pages from one prompt",
      "Browses the web and delivers finished work",
      "Free credits to start",
    ],
    week: "Introduced Week 9",
  },
  {
    icon: "📚",
    name: "NotebookLM",
    tag: "Learning Engine",
    tagColor: "oklch(0.78 0.15 155)",
    tagBg: "oklch(0.78 0.15 155 / 0.1)",
    tagBorder: "oklch(0.78 0.15 155 / 0.25)",
    cardClass: "glow-card-green",
    nameColor: "oklch(0.78 0.15 155)",
    desc: "Turn your documents into podcasts, quizzes, and a personal tutor that only knows YOUR business.",
    features: [
      "Audio Overviews — learn in the car",
      "Flashcards and quizzes from your docs",
      "Free from Google",
    ],
    week: "Introduced Week 7",
  },
];

export default function ToolStackSection() {
  const ref = useScrollReveal();

  return (
    <section id="tools" className="py-24" ref={ref} style={{ background: "oklch(0.09 0.022 240)" }}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">The Tool Stack</span>
          <div className="sec-divider-line-rev" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2
              className="mb-4 reveal"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                fontWeight: 800,
                color: "oklch(0.93 0.02 175)",
                lineHeight: 1.15,
              }}
            >
              Five Tools.{" "}
              <span style={{ color: "oklch(0.78 0.15 175)", textShadow: "0 0 30px oklch(0.78 0.15 175 / 0.4)" }}>
                All Start Free.
              </span>
            </h2>
            <p
              className="mb-6 text-base leading-relaxed reveal"
              style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Students need only free accounts for Weeks 1–6. Paid upgrades are introduced only when you're already getting results and know exactly what you're paying for.
            </p>
            <div
              className="p-4 rounded-xl reveal"
              style={{
                background: "oklch(0.78 0.14 75 / 0.06)",
                border: "1px solid oklch(0.78 0.14 75 / 0.2)",
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                💡 No tool overwhelm. We introduce each tool only when you're ready for it — and only when it will immediately make you money.
              </p>
            </div>
          </div>
          <div className="reveal rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px oklch(0.78 0.15 175 / 0.15)" }}>
            <img
              src={TOOLS_IMAGE}
              alt="AI Tool Stack"
              className="w-full h-64 object-cover"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool, i) => (
            <div
              key={i}
              className={`${tool.cardClass} reveal rounded-2xl p-6`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{
                    background: tool.tagBg,
                    boxShadow: `0 0 14px ${tool.tagBorder}`,
                  }}
                >
                  {tool.icon}
                </div>
                <div>
                  <div
                    className="text-lg font-black"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: tool.nameColor }}
                  >
                    {tool.name}
                  </div>
                  <div
                    className="text-xs px-2 py-0.5 rounded-full inline-block mt-0.5"
                    style={{
                      background: tool.tagBg,
                      color: tool.tagColor,
                      border: `1px solid ${tool.tagBorder}`,
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {tool.tag}
                  </div>
                </div>
              </div>
              <p
                className="text-sm mb-4 leading-relaxed"
                style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {tool.desc}
              </p>
              <ul className="space-y-2 mb-4">
                {tool.features.map((f, fi) => (
                  <li key={fi} className="flex items-start gap-2 text-xs" style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: tool.nameColor, boxShadow: `0 0 6px ${tool.tagBorder}` }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <div
                className="text-xs font-semibold"
                style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tool.week}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
