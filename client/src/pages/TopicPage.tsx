import { useEffect } from "react";
import { useRoute } from "wouter";
import { ArrowLeft, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TOPIC_PAGES, PDF_URLS } from "@/lib/constants";
import quantumBolt from "@/assets/brand/ai-leverage-lab-icon.svg";
import Dawnline from "@/components/Dawnline";

// ── Per-topic content ──────────────────────────────────────────────────────────
const topicContent: Record<string, {
  headline: string;
  sub: string;
  sections: { title: string; body: string; bullets?: string[] }[];
  cta: string;
  relatedPdf?: "starterGuide" | "week1Deck";
}> = {
  prospecting: {
    headline: "AI Prospecting Systems",
    sub: "Find more prospects, faster and smarter — with AI doing the research for you.",
    relatedPdf: "starterGuide",
    cta: "Save My Seat",
    sections: [
      {
        title: "Why AI Changes Prospecting Forever",
        body: "Most producers spend 80% of their time on the wrong people. AI flips that ratio. In 10 minutes you can research a prospect's business, understand their pain points, and craft outreach that sounds like you've known them for years.",
        bullets: [
          "Research any market or niche in minutes, not hours",
          "Identify ideal clients by life events, industry, or geography",
          "Write personalized outreach that actually gets replies",
          "Build a prospect list from scratch with AI assistance",
        ],
      },
      {
        title: "The Ideal Client Profile (ICP)",
        body: "Before you can automate prospecting, you need to describe your perfect client in detail. AI helps you build and refine your ICP — then uses it to find more people just like them.",
      },
      {
        title: "Week 3 & 4 of the Program",
        body: "Weeks 3 and 4 are dedicated entirely to prospecting. You'll build your ICP, research 10 real prospects live, and send AI-personalized outreach before the next class. The homework: track your replies.",
      },
    ],
  },
  followup: {
    headline: "AI Follow-Up Systems",
    sub: "80% of sales require 5+ follow-ups. Most producers stop at 2. AI fixes that — permanently.",
    relatedPdf: "starterGuide",
    cta: "Save My Seat",
    sections: [
      {
        title: "The Fortune Is In the Follow-Up",
        body: "The single biggest income leak in most businesses isn't bad leads — it's leads that never got followed up. AI lets you build a 30-day follow-up system once and reuse it forever.",
        bullets: [
          "30-day, 8-touch follow-up sequences built in one session",
          "Objection-handling library: 10 objections × 3 responses each",
          "Personalized follow-up that sounds human, not automated",
          "Never lose a lead to silence again",
        ],
      },
      {
        title: "The Objection Library",
        body: "Every producer hears the same 10 objections. In Week 5, you'll build an objection library — AI drafts three responses to each in your voice. You'll never be caught off-guard again.",
      },
      {
        title: "Week 5 of the Program",
        body: "Week 5 is dedicated to follow-up machines. You'll build your 30-day sequence live, create your objection library, and put 5 stalled prospects into the sequence before the next class.",
      },
    ],
  },
  automation: {
    headline: "Task Automation",
    sub: "Automate the busywork. Reclaim 5–10 hours every week. Wake up to a briefing that runs your day.",
    relatedPdf: "week1Deck",
    cta: "Save My Seat",
    sections: [
      {
        title: "What AI Can Do For You While You Sleep",
        body: "Claude Cowork and Manus can run scheduled tasks, generate documents, build spreadsheets, and deliver a morning briefing — all automatically. You delegate the job, AI delivers the finished product.",
        bullets: [
          "Automatic morning briefing: calendar + priority emails every day",
          "Document generation: proposals, reports, and decks from notes",
          "Pipeline tracking spreadsheets built and maintained by AI",
          "Whole projects delegated to Manus — browse, research, deliver",
        ],
      },
      {
        title: "Weeks 7–9: The Automation Phase",
        body: "The middle third of the program is dedicated to automation. NotebookLM (Week 7), Claude Cowork (Week 8), and Manus AI Agents (Week 9) — each week you delegate more and get more back.",
      },
    ],
  },
  content: {
    headline: "AI Content at Scale",
    sub: "Turn one hour of work into 30 days of content that attracts your ideal clients while you sleep.",
    relatedPdf: "starterGuide",
    cta: "Save My Seat",
    sections: [
      {
        title: "Content Is Prospecting That Never Stops",
        body: "Every post, email, and video you publish is a salesperson working 24/7. AI makes creating that content fast, consistent, and on-brand — without writing everything from scratch.",
        bullets: [
          "30-day content calendar from your Business Brief in one session",
          "One idea becomes a post, email, video script, and 3 engagement hooks",
          "Repurpose yesterday's client question into today's viral post",
          "Build a content library that compounds over time",
        ],
      },
      {
        title: "Week 6: Content at Scale",
        body: "Week 6 teaches the pillar method — one idea becomes 5 pieces of content. You'll generate a 30-day calendar live and publish 5 AI-assisted posts before the next class.",
      },
    ],
  },
  tools: {
    headline: "The AI Tool Stack",
    sub: "Five tools. All start free. Introduced only when you're ready — and when they'll immediately make you money.",
    relatedPdf: "week1Deck",
    cta: "Download the Starter Guide",
    sections: [
      {
        title: "The Five Tools You'll Master",
        body: "No tool overwhelm. Each tool is introduced at the right moment in the 12-week journey — when you're ready for it and when it will immediately pay off.",
        bullets: [
          "Claude — your thinking partner for writing, strategy, and research (Week 1)",
          "ChatGPT — voice mode for practicing scripts and objections (Week 1)",
          "NotebookLM — turn your documents into podcasts and quizzes (Week 7)",
          "Claude Cowork — scheduled tasks and document generation (Week 8)",
          "Manus — delegate whole projects to an AI agent (Week 9)",
        ],
      },
      {
        title: "Free to Start, Paid When It Pays",
        body: "All five tools have free tiers. Paid upgrades are only introduced after you're already getting results — so you know exactly what you're paying for before you spend a dollar.",
      },
    ],
  },
  b2b: {
    headline: "The B2B Opportunity",
    sub: "The skills you build here position you to have a very different conversation with business owners — one that creates income for life.",
    relatedPdf: "week1Deck",
    cta: "Save My Seat",
    sections: [
      {
        title: "A Bigger Vision",
        body: "Most producers think of AI training as a personal productivity tool. The bigger vision: it's a door-opener for the most powerful income opportunity in the DBR model — B2B group sales.",
        bullets: [
          "Research any business owner in your market with AI in 10 minutes",
          "Lead with value: offer AI training that genuinely helps their business",
          "Build trust before introducing the B2B partnership opportunity",
          "One B2B relationship can be worth more than dozens of individual clients",
        ],
      },
      {
        title: "Week 12: The Reveal",
        body: "Week 12 is where it all comes together. Your 90-day growth plan, the B2B division opportunity, and the strategic partnership conversation — taught after you've built the skills to back it up.",
      },
      {
        title: "Income For Life",
        body: "Group sales income compounds over time. Help one business owner say yes and earn residual income on their entire team. The AI prospecting skills you build in this program make finding and approaching those owners effortless.",
      },
    ],
  },
  curriculum: {
    headline: "The 12-Week Curriculum",
    sub: "Four phases. Twelve weeks. One complete AI-powered operating system running inside your business.",
    relatedPdf: "week1Deck",
    cta: "Save My Seat",
    sections: [
      {
        title: "Phase 1: Foundations (Weeks 1–2)",
        body: "Tools set up, prompting like a pro, and your personal Business Brief that makes every AI answer sound like YOU.",
        bullets: ["Week 1: AI Foundations & Mindset Reset", "Week 2: Prompting Like a Pro & Your Business Brief"],
      },
      {
        title: "Phase 2: Grow (Weeks 3–6)",
        body: "Ideal client research, outreach that gets replies, 30-day follow-up machines, and a month of content from one hour of work.",
        bullets: [
          "Week 3: Prospecting I — Ideal Clients & Market Research",
          "Week 4: Prospecting II — Outreach That Gets Replies",
          "Week 5: Follow-Up Machines",
          "Week 6: Content & Social Media at Scale",
        ],
      },
      {
        title: "Phase 3: Automate (Weeks 7–9)",
        body: "NotebookLM, Claude Cowork, and Manus AI Agents — each week you delegate more and get more back.",
        bullets: [
          "Week 7: NotebookLM — Become the Expert Faster",
          "Week 8: Claude Cowork — Your AI Office Assistant",
          "Week 9: Manus & AI Agents — Delegate Whole Projects",
        ],
      },
      {
        title: "Phase 4: Scale (Weeks 10–12)",
        body: "5-star client experience, your AI-powered weekly rhythm, and a 90-day growth plan — plus the B2B opportunity.",
        bullets: [
          "Week 10: Client Experience — Meetings, Proposals, Reviews",
          "Week 11: Your AI-Powered Week",
          "Week 12: Scale — New Income From What You Now Know",
        ],
      },
    ],
  },
  leadership: {
    headline: "AI Leadership Systems",
    sub: "Lead better, build stronger teams, and grow faster — with AI as your management partner.",
    relatedPdf: "starterGuide",
    cta: "Save My Seat",
    sections: [
      {
        title: "AI for Team Leaders",
        body: "The same AI tools that make individual producers more effective make team leaders exponentially more powerful. AI helps you recruit, train, recognize, and retain your team at scale.",
        bullets: [
          "AI-powered recruiting outreach and follow-up",
          "Training content generation for your team",
          "Recognition and communication at scale",
          "Performance tracking and coaching prompts",
        ],
      },
      {
        title: "The DBR Leadership Edge",
        body: "With 11,000+ producers in the network, the leaders who adopt AI first will build the strongest teams. This program gives you the tools and the language to lead the AI transition in your organization.",
      },
    ],
  },
};

export default function TopicPage() {
  const [, params] = useRoute("/topics/:id");
  const topicId = params?.id ?? "";

  const topic = TOPIC_PAGES.find((t) => t.id === topicId);
  const content = topicContent[topicId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  if (!topic || !content) {
    return (
      <div className="min-h-screen" style={{ background: "oklch(0.045 0.015 240)" }}>
        <div className="blueprint-grid relative mx-auto min-h-screen w-full overflow-hidden" style={{ maxWidth: "1100px", background: "#03090D", boxShadow: "0 0 0 1px rgba(0,231,224,0.08), 0 0 80px rgba(3,9,13,0.85)" }}>
          <Navbar />
          <main className="relative overflow-hidden px-[clamp(22px,5vw,64px)] py-[clamp(56px,8vw,96px)]">
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(60% 65% at 82% 34%, rgba(42,140,255,0.11), transparent 68%)" }} />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_330px]">
              <section>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ border: "1px solid rgba(244,197,66,0.28)", background: "rgba(244,197,66,0.07)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#F4C542", boxShadow: "0 0 8px #F4C542" }} />
                  <span className="font-bold uppercase tracking-[0.22em]" style={{ color: "#F4C542", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>Route 404 · Signal Interrupted</span>
                </div>
                <h1 className="max-w-2xl" style={{ color: "#EAFBFF", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.8rem, 6vw, 5.6rem)", fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 0.92 }}>
                  Signal lost.<br /><span style={{ color: "#00E7E0" }}>Choose a live sector.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed" style={{ color: "rgba(159,195,202,0.78)", fontFamily: "'DM Sans', sans-serif" }}>
                  This topic coordinate is not active. Return to the main command deck or route directly into one of the eight operating systems below.
                </p>
                <a href="/" className="mt-7 inline-flex rounded-full px-6 py-3 font-bold transition-all duration-200" style={{ background: "#00E7E0", color: "#03090D", boxShadow: "0 0 24px rgba(0,231,224,0.22)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  Return to AI Leverage Lab →
                </a>
              </section>
              <aside className="relative overflow-hidden rounded-2xl p-6" style={{ background: "linear-gradient(160deg, rgba(7,27,42,0.95), rgba(3,9,13,0.95))", border: "1px solid rgba(0,231,224,0.18)", boxShadow: "0 24px 70px rgba(0,0,0,0.36)" }}>
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, #00E7E0, #2A8CFF 62%, transparent)" }} />
                <img src={quantumBolt} alt="" aria-hidden="true" className="mb-5 h-20 w-20" />
                <div className="font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(159,195,202,0.56)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>Recovery Console</div>
                <div className="mt-3 flex items-end justify-between border-b pb-3" style={{ borderColor: "rgba(0,231,224,0.1)" }}>
                  <span style={{ color: "#EAFBFF", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>Valid sectors</span>
                  <span className="tabular-nums" style={{ color: "#00E7E0", fontFamily: "'IBM Plex Mono', monospace", fontSize: "1.4rem", fontWeight: 700 }}>{String(TOPIC_PAGES.length).padStart(2, "0")}</span>
                </div>
                <div className="mt-4 space-y-2">
                  {["NAVIGATION", "BRAND LINK", "TOPIC INDEX"].map((label, index) => (
                    <div key={label} className="flex items-center justify-between">
                      <span style={{ color: "rgba(159,195,202,0.62)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>{label}</span>
                      <span className="flex items-center gap-1.5" style={{ color: "#00E7E0", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: index === 0 ? "#F4C542" : "#00E7E0" }} />READY</span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>

            <div className="relative mt-14 flex items-center gap-3" aria-hidden="true">
              <span style={{ color: "#F4C542", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>RECOVERY PATH</span>
              <div className="h-px flex-1" style={{ background: "linear-gradient(90deg, #00E7E0, #2A8CFF 55%, #F4C542)" }} />
            </div>
            <div className="relative mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
              {TOPIC_PAGES.map((item, index) => (
                <a key={item.id} href={`${item.path}/`} className="flex items-center gap-2 rounded-lg px-3 py-3 text-left transition-all duration-200" style={{ background: "rgba(7,27,42,0.78)", border: "1px solid rgba(0,231,224,0.12)" }}>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: item.color, boxShadow: `0 0 7px ${item.color}` }} />
                  <span className="min-w-0"><span className="block tabular-nums" style={{ color: "rgba(159,195,202,0.48)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "7px" }}>{String(index + 1).padStart(2, "0")}</span><span className="block truncate font-bold" style={{ color: "#EAFBFF", fontFamily: "'Space Grotesk', sans-serif", fontSize: "10px" }}>{item.label}</span></span>
                </a>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  const pdfUrl = content.relatedPdf ? PDF_URLS[content.relatedPdf] : null;
  const pdfLabel = content.relatedPdf === "starterGuide" ? "AI Starter Guide" : "Week 1 Deck";

  return (
    <div className="min-h-screen" style={{ background: "oklch(0.045 0.015 240)" }}>
    <div className="mx-auto w-full relative blueprint-grid" style={{ maxWidth: "1100px", background: "oklch(0.08 0.02 240)", boxShadow: "0 0 0 1px oklch(0.78 0.15 175 / 0.08), 0 0 80px oklch(0.07 0.02 240 / 0.8)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-12 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, oklch(0.08 0.02 240) 0%, color-mix(in oklch, ${topic.color} 5%, oklch(0.08 0.02 240)) 100%)`,
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 50% 60% at 80% 50%, color-mix(in oklch, ${topic.color} 8%, transparent) 0%, transparent 70%)`,
          }}
        />
        <div className="container relative z-10">
          {/* Back nav */}
          <a
            href="/"
            className="flex items-center gap-2 mb-8 text-sm font-semibold transition-opacity duration-150"
            style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.7")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
          >
            <ArrowLeft size={16} />
            Back to AI Leverage Lab
          </a>

          {/* Topic badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5 text-xs font-bold tracking-widest uppercase"
            style={{
              background: `color-mix(in oklch, ${topic.color} 10%, transparent)`,
              border: `1px solid color-mix(in oklch, ${topic.color} 30%, transparent)`,
              color: topic.color,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: topic.color, boxShadow: `0 0 7px ${topic.color}` }} aria-hidden="true" />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>{topic.id.toUpperCase()} · ACTIVE</span>
          </div>

          <h1
            className="mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "oklch(0.93 0.02 175)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {content.headline}
          </h1>
          <p
            className="text-lg max-w-2xl mb-8"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}
          >
            {content.sub}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="/savemyseat/"
              className="px-7 py-3 rounded-full font-bold text-sm transition-all duration-200"
              style={{
                background: topic.color,
                color: "oklch(0.08 0.02 240)",
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: `0 0 28px color-mix(in oklch, ${topic.color} 45%, transparent)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              }}
            >
              {content.cta} →
            </a>
            {pdfUrl && (
              <a
                href={pdfUrl}
                download
                className="flex items-center gap-2 px-7 py-3 rounded-full font-bold text-sm transition-all duration-200"
                style={{
                  background: "transparent",
                  color: topic.color,
                  border: `1px solid color-mix(in oklch, ${topic.color} 35%, transparent)`,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = `color-mix(in oklch, ${topic.color} 10%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                <Download size={14} />
                Download {pdfLabel}
              </a>
            )}
          </div>
        </div>
      </section>

      <Dawnline index="TOPIC / 01" label="Capability Brief" state="ACTIVE" />

      {/* Content sections */}
      <section className="py-16">
        <div className="container max-w-3xl">
          <div className="space-y-10">
            {content.sections.map((sec, i) => (
              <div
                key={i}
                className="rounded-2xl p-8"
                style={{
                  background: "oklch(0.11 0.025 240)",
                  border: `1px solid color-mix(in oklch, ${topic.color} 15%, transparent)`,
                  boxShadow: `0 0 24px color-mix(in oklch, ${topic.color} 5%, transparent)`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-1 h-6 rounded-full"
                    style={{ background: topic.color }}
                  />
                  <h2
                    className="text-xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: topic.color }}
                  >
                    {sec.title}
                  </h2>
                </div>
                <p
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {sec.body}
                </p>
                {sec.bullets && (
                  <ul className="space-y-2">
                    {sec.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                          style={{ background: topic.color, boxShadow: `0 0 6px color-mix(in oklch, ${topic.color} 50%, transparent)` }}
                        />
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: "oklch(0.72 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
                        >
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{
              background: `linear-gradient(135deg, color-mix(in oklch, ${topic.color} 7%, oklch(0.11 0.025 240)), oklch(0.11 0.025 240))`,
              border: `1px solid color-mix(in oklch, ${topic.color} 25%, transparent)`,
            }}
          >
            <div className="mb-4 flex items-center justify-center gap-2" aria-hidden="true">
              <img src={quantumBolt} alt="" className="h-12 w-12" />
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: topic.color, boxShadow: `0 0 8px ${topic.color}` }} />
              <span className="font-bold uppercase tracking-[0.2em]" style={{ color: topic.color, fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>Capability Ready</span>
            </div>
            <h3
              className="text-xl font-bold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.93 0.02 175)" }}
            >
              Ready to master {topic.label}?
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Join AI Leverage Lab — live weekly training, real demos, and practical homework designed to help you build more business.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="/savemyseat/"
                className="px-8 py-3 rounded-full font-bold text-sm"
                style={{
                  background: topic.color,
                  color: "oklch(0.08 0.02 240)",
                  fontFamily: "'Space Grotesk', sans-serif",
                  boxShadow: `0 0 28px color-mix(in oklch, ${topic.color} 40%, transparent)`,
                }}
              >
                Save My Seat — Free to Start →
              </a>
              <a
                href="/"
                className="px-8 py-3 rounded-full font-bold text-sm"
                style={{
                  background: "transparent",
                  color: topic.color,
                  border: `1px solid color-mix(in oklch, ${topic.color} 30%, transparent)`,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                ← Explore All Topics
              </a>
            </div>
          </div>
        </div>
      </section>

      <Dawnline index="TOPIC / 02" label="Action Protocol" state="COMPLETE" warm />

      {/* Other topics nav */}
      <section className="py-12" style={{ background: "oklch(0.09 0.022 240)" }}>
        <div className="container">
          <div
            className="text-center mb-6 text-xs tracking-widest uppercase font-bold"
            style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Explore Other Topics
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {TOPIC_PAGES.filter((t) => t.id !== topicId).map((t, index) => (
              <a
                key={t.id}
                href={`${t.path}/`}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl text-center transition-all duration-200"
                style={{
                  background: "oklch(0.11 0.025 240)",
                  border: `1px solid color-mix(in oklch, ${t.color} 18%, transparent)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `color-mix(in oklch, ${t.color} 8%, oklch(0.11 0.025 240))`;
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "oklch(0.11 0.025 240)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.color, boxShadow: `0 0 7px ${t.color}` }} />
                  <span className="tabular-nums" style={{ color: "rgba(159,195,202,0.56)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span className="text-xs font-bold" style={{ color: t.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {t.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
    </div>
  );
}
