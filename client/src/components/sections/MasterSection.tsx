import { useScrollReveal } from "@/hooks/useScrollReveal";

const skills = [
  {
    icon: "🎯",
    title: "Prospecting With AI",
    desc: "Define your ideal client, research any market or business in minutes, and write outreach that actually gets replies.",
    cardClass: "glow-card-teal",
    titleColor: "oklch(0.78 0.15 175)",
  },
  {
    icon: "🔁",
    title: "Follow-Up Machines",
    desc: "Build a 30-day follow-up system and an objection-handling library once — then reuse it forever. The fortune is in the follow-up.",
    cardClass: "glow-card-purple",
    titleColor: "oklch(0.62 0.18 280)",
  },
  {
    icon: "⚙️",
    title: "Task Automation",
    desc: "Let AI build your documents, spreadsheets, and proposals — and wake up to an automatic morning briefing of your day.",
    cardClass: "glow-card-gold",
    titleColor: "oklch(0.78 0.14 75)",
  },
  {
    icon: "📱",
    title: "Content At Scale",
    desc: "Turn one hour of work into 30 days of social content that attracts your ideal clients while you sleep.",
    cardClass: "glow-card-blue",
    titleColor: "oklch(0.68 0.15 240)",
  },
  {
    icon: "🎧",
    title: "Learn Faster",
    desc: "Turn carrier guides, contracts, and training recordings into podcasts, flashcards, and a personal tutor with NotebookLM.",
    cardClass: "glow-card-green",
    titleColor: "oklch(0.78 0.15 155)",
  },
  {
    icon: "💼",
    title: "5-Star Client Experience",
    desc: "10-minute meeting prep, same-day proposals, and follow-up that makes you look like you have a full-time staff.",
    cardClass: "glow-card-coral",
    titleColor: "oklch(0.68 0.18 25)",
  },
];

export default function MasterSection() {
  const ref = useScrollReveal();

  return (
    <section id="master" className="py-24" ref={ref}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">What You'll Master</span>
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
            Six Skills That Pay
          </h2>
          <p
            className="text-base max-w-xl mx-auto reveal"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Every skill is taught live, demonstrated in your industry, and assigned as homework that makes you money before the next class.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => (
            <div
              key={i}
              className={`${skill.cardClass} reveal rounded-2xl p-6 flex gap-4`}
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="text-3xl flex-shrink-0 mt-0.5">{skill.icon}</div>
              <div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: skill.titleColor }}
                >
                  {skill.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {skill.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
