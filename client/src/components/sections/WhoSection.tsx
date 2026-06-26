import { useScrollReveal } from "@/hooks/useScrollReveal";

const industries = [
  {
    emoji: "🛡️",
    title: "Life Insurance Agents",
    desc: "Follow-up that converts, policy explanations, client reviews, and recruiting — all on autopilot.",
    color: "teal",
    cardClass: "glow-card-teal",
    titleColor: "oklch(0.78 0.15 175)",
  },
  {
    emoji: "🏠",
    title: "Real Estate Agents",
    desc: "Listing descriptions, buyer/seller nurture sequences, market reports, and open-house follow-up.",
    color: "purple",
    cardClass: "glow-card-purple",
    titleColor: "oklch(0.62 0.18 280)",
  },
  {
    emoji: "💵",
    title: "Loan Officers",
    desc: "Pre-approval follow-up, program comparisons, and referral partner outreach that gets responses.",
    color: "gold",
    cardClass: "glow-card-gold",
    titleColor: "oklch(0.78 0.14 75)",
  },
  {
    emoji: "🚀",
    title: "Entrepreneurs",
    desc: "Content creation, customer communication, admin automation, and business development at scale.",
    color: "blue",
    cardClass: "glow-card-blue",
    titleColor: "oklch(0.68 0.15 240)",
  },
  {
    emoji: "🤝",
    title: "DBR B2B Agents",
    desc: "Everything above, plus AI-powered prospecting of business owners for B2B group sales at scale.",
    color: "green",
    cardClass: "glow-card-green",
    titleColor: "oklch(0.78 0.15 155)",
  },
];

export default function WhoSection() {
  const ref = useScrollReveal();

  return (
    <section id="who" className="py-24" ref={ref} style={{ background: "oklch(0.09 0.022 240)" }}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">Built For Producers</span>
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
            Who This Is For
          </h2>
          <p
            className="text-base max-w-xl mx-auto reveal"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            If you're a working producer who wants more business — not a coding career — this is your program.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {industries.map((ind, i) => (
            <div
              key={i}
              className={`${ind.cardClass} reveal rounded-2xl p-6`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="text-4xl mb-4">{ind.emoji}</div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: ind.titleColor }}
              >
                {ind.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {ind.desc}
              </p>
            </div>
          ))}

          {/* Tagline card */}
          <div
            className="reveal rounded-2xl p-6 flex flex-col justify-center"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.15 175 / 0.08), oklch(0.62 0.18 280 / 0.08))",
              border: "1px solid oklch(0.78 0.15 175 / 0.2)",
            }}
          >
            <div className="text-3xl mb-3">✅</div>
            <div
              className="text-base font-bold mb-2"
              style={{ color: "oklch(0.93 0.02 175)", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Practical · Actionable · No Coding · Real Results
            </div>
            <div
              className="text-sm italic"
              style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'DM Sans', sans-serif" }}
            >
              "Built for entrepreneurs, not developers."
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
