import { useScrollReveal } from "@/hooks/useScrollReveal";

const B2B_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663540400260/NPKEju6a8tZEcsR375b28w/b2b-partnership-SKHKKjE4xJjHzqxsgoxYa9.webp";

const benefits = [
  {
    icon: "💰",
    title: "Income For Life",
    desc: "Group sales income compounds over time. Help one business owner say yes and earn residual income on their entire team.",
    color: "oklch(0.78 0.14 75)",
  },
  {
    icon: "🤝",
    title: "Strategic Partnerships",
    desc: "Business owners who learn AI through you become natural partners for the B2B division — they already trust you.",
    color: "oklch(0.78 0.15 175)",
  },
  {
    icon: "📈",
    title: "Scale Without Limits",
    desc: "One B2B relationship can be worth more than dozens of individual clients. AI makes finding and approaching them effortless.",
    color: "oklch(0.62 0.18 280)",
  },
  {
    icon: "🎯",
    title: "Warm Positioning",
    desc: "When you lead with AI training that helps their business, you're not selling — you're serving. The B2B conversation opens naturally.",
    color: "oklch(0.68 0.15 240)",
  },
];

const targetOwners = [
  "Insurance Agency Owners",
  "Real Estate Brokers",
  "Mortgage Companies",
  "CPAs & Accountants",
  "Financial Advisors",
  "Consultants & Coaches",
  "Small Business Owners",
  "Entrepreneurs",
];

export default function B2BSection() {
  const ref = useScrollReveal();

  return (
    <section id="b2b" className="py-24" ref={ref}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">The Bigger Vision</span>
          <div className="sec-divider-line-rev" />
        </div>

        {/* Hero block */}
        <div
          className="relative rounded-3xl overflow-hidden mb-16 reveal"
          style={{ minHeight: "360px" }}
        >
          <img
            src={B2B_IMAGE}
            alt="B2B Partnership Opportunity"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.3 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, oklch(0.08 0.02 240 / 0.95) 0%, oklch(0.08 0.02 240 / 0.8) 60%, oklch(0.08 0.02 240 / 0.9) 100%)",
            }}
          />
          <div className="relative z-10 p-8 md:p-12 max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-bold tracking-widest uppercase"
              style={{
                background: "oklch(0.78 0.14 75 / 0.1)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                color: "oklch(0.78 0.14 75)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              ⭐ Week 12 Reveal
            </div>
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
              A Bigger Vision:{" "}
              <span style={{ color: "oklch(0.78 0.14 75)", textShadow: "0 0 30px oklch(0.78 0.14 75 / 0.4)" }}>
                Business Growth Through AI
              </span>
            </h2>
            <p
              className="text-base leading-relaxed mb-6"
              style={{ color: "oklch(0.75 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              By Week 12, you won't just be a better producer — you'll be an AI-powered business advisor. That positions you to have a very different conversation with business owners: not "buy my product," but "let me show you how AI can transform your business." And that conversation opens the door to the most powerful income opportunity in the DBR model.
            </p>
            <div
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl"
              style={{
                background: "oklch(0.78 0.14 75 / 0.08)",
                border: "1px solid oklch(0.78 0.14 75 / 0.3)",
              }}
            >
              <span className="text-xl">💡</span>
              <span
                className="text-sm font-semibold italic"
                style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'DM Sans', sans-serif" }}
              >
                "Help them see the light — and earn income for life on group sales."
              </span>
            </div>
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="reveal rounded-2xl p-6 text-center"
              style={{
                background: "oklch(0.11 0.025 240)",
                border: `1px solid color-mix(in oklch, ${b.color} 25%, transparent)`,
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div className="text-4xl mb-4">{b.icon}</div>
              <h3
                className="text-base font-bold mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: b.color }}
              >
                {b.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Target business owners */}
        <div
          className="p-8 rounded-2xl reveal"
          style={{
            background: "oklch(0.11 0.025 240)",
            border: "1px solid oklch(0.78 0.15 175 / 0.15)",
          }}
        >
          <h3
            className="text-lg font-bold mb-2 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.93 0.02 175)" }}
          >
            Who You Can Now Approach
          </h3>
          <p
            className="text-sm text-center mb-6"
            style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Every business owner you help with AI becomes a potential strategic partner for the B2B division.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {targetOwners.map((owner, i) => (
              <div
                key={i}
                className="px-4 py-2 rounded-full text-sm font-medium"
                style={{
                  background: "oklch(0.78 0.15 175 / 0.06)",
                  border: "1px solid oklch(0.78 0.15 175 / 0.2)",
                  color: "oklch(0.78 0.15 175)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {owner}
              </div>
            ))}
          </div>
        </div>

        {/* Prospecting section */}
        <div className="mt-12">
          <div
            className="p-8 rounded-2xl reveal"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.14 75 / 0.05), oklch(0.62 0.18 280 / 0.05))",
              border: "1px solid oklch(0.78 0.14 75 / 0.2)",
            }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.93 0.02 175)" }}
                >
                  The AI Prospecting Advantage for B2B
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  With the skills from this program, you can research any business owner in your market, understand their challenges, and craft outreach that speaks directly to their pain points — before you ever pick up the phone.
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  AI turns cold prospecting into warm conversations. And warm conversations with business owners are where the biggest income opportunities live.
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { step: "1", text: "Research the business owner with AI — understand their industry, challenges, and goals" },
                  { step: "2", text: "Craft personalized outreach that leads with value, not a pitch" },
                  { step: "3", text: "Offer AI training that genuinely helps their business" },
                  { step: "4", text: "Build trust, then introduce the B2B partnership opportunity" },
                ].map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0"
                      style={{
                        background: "oklch(0.78 0.14 75 / 0.12)",
                        border: "1px solid oklch(0.78 0.14 75 / 0.3)",
                        color: "oklch(0.78 0.14 75)",
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {s.step}
                    </div>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
