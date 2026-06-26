import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ChevronDown, ExternalLink, Gift } from "lucide-react";

// Referral banners shown inside specific expanded week cards
const REFERRAL_BANNERS: Record<number, { icon: string; label: string; offer: string; cta: string; url: string; color: string; bg: string }> = {
  8: {
    icon: "🎁",
    label: "Claude Cowork Referral",
    offer: "Gift a friend one FREE week of Claude Cowork Pro. If they subscribe, you get $10 in usage credits per referral.",
    cta: "Get Your Claude Cowork Guest Pass →",
    url: "https://claude.ai/referral/UhFq2KPTiQ?s=cowork&v=apps",
    color: "oklch(0.78 0.14 75)",
    bg: "oklch(0.78 0.14 75 / 0.07)",
  },
  9: {
    icon: "⚡",
    label: "Manus AI Referral",
    offer: "Enroll in Manus.ai through Mike's link and get 500 FREE credits to start delegating your first real project.",
    cta: "Claim 500 Free Manus Credits →",
    url: "https://manus.im/invitation/JBXFSN7KDYKZ?utm_source=invitation&utm_medium=social&utm_campaign=copy_link",
    color: "oklch(0.62 0.18 280)",
    bg: "oklch(0.62 0.18 280 / 0.07)",
  },
};

const phases = [
  {
    phase: "Weeks 1–2",
    label: "Foundations",
    color: "oklch(0.78 0.15 175)",
    desc: "Tools set up, prompting like a pro, and your personal Business Brief that makes every AI answer sound like YOU.",
    weeks: [
      {
        num: 1,
        title: "AI Foundations: Your New Unfair Advantage",
        tools: "Claude + ChatGPT",
        outcome: "Accounts set up, first real prompts, mindset reset",
        detail: "What AI actually is (a brilliant assistant, not a robot). Chatbots vs. agents. Why top producers are quietly adopting this now. Live demo: rewrite a follow-up text, write a listing description, draft a loan program comparison, summarize an email thread.",
        homework: "Use AI for ONE real task every day this week (7 tasks). Bring your best result to share.",
      },
      {
        num: 2,
        title: "Prompting Like a Pro & Your Business Brief",
        tools: "Claude Projects",
        outcome: "Reusable Business Brief that supercharges every prompt",
        detail: "The 4-part formula: ROLE + CONTEXT + TASK + FORMAT. Build a Business Brief live — a one-page document describing your business, market, services, and voice. Save it in a Claude Project. Run the same prompt with and without the brief — the difference sells itself.",
        homework: "Write your Business Brief, load it into a Claude Project, and use it in 5 prompts.",
      },
    ],
  },
  {
    phase: "Weeks 3–6",
    label: "Grow",
    color: "oklch(0.62 0.18 280)",
    desc: "Ideal client research, outreach that gets replies, 30-day follow-up machines, and a month of content from one hour of work.",
    weeks: [
      {
        num: 3,
        title: "Prospecting I: Ideal Clients & Market Research",
        tools: "Claude, ChatGPT (web search)",
        outcome: "Written ICP + niche list + research workflow",
        detail: "You can't automate prospecting until you can describe your prospect. The Ideal Client Profile. Using AI for market research: neighborhoods, niches, industries, life events that trigger buying. How 10 minutes of AI research turns a cold call warm.",
        homework: "Write your ICP, then research 10 real prospects with AI and save notes on each.",
      },
      {
        num: 4,
        title: "Prospecting II: Outreach That Gets Replies",
        tools: "Claude, ChatGPT",
        outcome: "Personal outreach library (email, DM, phone)",
        detail: "Why personalization beats volume. Anatomy of outreach that gets replies: relevance, brevity, one clear next step. Build a personal outreach library: cold email, warm email, social DM, text, and phone opener — in your voice, for your ICP.",
        homework: "Send 10 pieces of AI-personalized outreach to real prospects. Track replies.",
      },
      {
        num: 5,
        title: "Follow-Up Machines",
        tools: "Claude + first look at Cowork",
        outcome: "30-day follow-up system + objection library",
        detail: "80% of sales take 5+ touches; most producers stop at 2. Build a 30-day, 8-touch follow-up sequence live. Then build an objection library: list the 10 objections you hear most, have AI draft three responses to each in your voice.",
        homework: "Build your 30-day sequence + objection library. Put 5 stalled prospects into the sequence.",
      },
      {
        num: 6,
        title: "Content & Social Media at Scale",
        tools: "Claude + ChatGPT (images)",
        outcome: "30 days of content from one hour of work",
        detail: "Content is prospecting that works while you sleep. The pillar method: one idea becomes a post, an email, a video script, and three comment-bait questions. Generate a 30-day content calendar from your Business Brief. Show repurposing: yesterday's client question becomes today's post.",
        homework: "Publish 5 AI-assisted posts this week. Bring engagement numbers and your best performer.",
      },
    ],
  },
  {
    phase: "Weeks 7–9",
    label: "Automate",
    color: "oklch(0.78 0.14 75)",
    desc: "NotebookLM for learning on the go, Claude Cowork for real documents and scheduled briefings, and delegating whole projects to AI agents.",
    weeks: [
      {
        num: 7,
        title: "NotebookLM: Become the Expert Faster",
        tools: "NotebookLM",
        outcome: "Personal knowledge base + audio learning habit",
        detail: "NotebookLM only answers from documents YOU give it — carrier guides, contracts, listing data, training recordings. Audio Overviews turn any document into a podcast-style conversation. Flashcards and quizzes for licensing exams and product knowledge.",
        homework: "Build one notebook with 5+ documents. Listen to one Audio Overview during a commute. Quiz yourself once.",
      },
      {
        num: 8,
        title: "Claude Cowork: Your AI Office Assistant",
        tools: "Claude Cowork",
        outcome: "Documents, spreadsheets, and a scheduled daily briefing",
        detail: "The difference between asking AI questions and giving AI jobs. Three live jobs: (1) turn messy client notes into a clean proposal, (2) build a pipeline-tracking spreadsheet, (3) set up a scheduled daily briefing — every morning AI summarizes your calendar and flags priority emails.",
        homework: "Complete one real Cowork job: a document, a spreadsheet, or your own morning briefing.",
      },
      {
        num: 9,
        title: "Manus & AI Agents: Delegate Whole Projects",
        tools: "Manus",
        outcome: "First delegated project (report, deck, or page)",
        detail: "What an autonomous agent is: it plans the steps, browses the web, and delivers a finished product. The delegation skill: writing a project brief instead of a prompt. Delegate live: a market report, a landing page, a contact strategy spreadsheet.",
        homework: "Delegate one real project to Manus. Bring the result to share.",
      },
    ],
  },
  {
    phase: "Weeks 10–12",
    label: "Scale",
    color: "oklch(0.68 0.18 25)",
    desc: "A 5-star client experience system, your AI-powered weekly rhythm, and a 90-day growth plan — plus new income streams most producers never see.",
    weeks: [
      {
        num: 10,
        title: "Client Experience: Meetings, Proposals, Reviews",
        tools: "All tools",
        outcome: "Meeting-prep + follow-up workflow",
        detail: "The 5-star client experience: 10-minute meeting prep, same-day proposals, and follow-up that makes you look like you have a full-time staff. Build your pre-meeting research template, proposal generator, and post-meeting follow-up sequence.",
        homework: "Use the full workflow for your next 3 client meetings.",
      },
      {
        num: 11,
        title: "Your AI-Powered Week",
        tools: "All tools",
        outcome: "Personal operating system + time audit",
        detail: "Design your complete AI-powered weekly rhythm. Time audit: where are you spending hours that AI could handle? Build your personal operating system: morning briefing, content batch day, prospecting block, follow-up automation.",
        homework: "Run your AI-powered week. Track time saved. Bring your numbers.",
      },
      {
        num: 12,
        title: "Scale: New Income From What You Now Know",
        tools: "All tools",
        outcome: "Growth plan + the B2B division opportunity",
        detail: "Your 90-day growth plan. The B2B division opportunity: how the skills you've built position you to help business owners — and why that creates income for life through group sales. The strategic partnership conversation.",
        homework: "Write your 90-day plan. Identify 3 business owners to have the B2B conversation with.",
      },
    ],
  },
];

function WeekRow({ week, phaseColor }: { week: typeof phases[0]["weeks"][0]; phaseColor: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200"
      style={{
        background: "oklch(0.11 0.025 240)",
        border: `1px solid ${open ? phaseColor + " / 0.3" : "oklch(0.78 0.15 175 / 0.1)"}`,
        boxShadow: open ? `0 0 20px ${phaseColor} / 0.08` : "none",
      }}
    >
      <button
        className="w-full flex items-center gap-4 p-4 text-left"
        onClick={() => setOpen(!open)}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
          style={{
            background: phaseColor + " / 0.12",
            border: `1px solid ${phaseColor} / 0.3`,
            color: phaseColor,
            fontFamily: "'Space Grotesk', sans-serif",
            backgroundColor: `color-mix(in oklch, ${phaseColor} 12%, transparent)`,
            borderColor: `color-mix(in oklch, ${phaseColor} 30%, transparent)`,
          }}
        >
          {week.num}
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="text-sm font-bold"
            style={{ color: "oklch(0.93 0.02 175)", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {week.title}
          </div>
          <div
            className="text-xs mt-0.5"
            style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Tool focus: {week.tools}
          </div>
        </div>
        <div
          className="text-xs px-2 py-1 rounded-full flex-shrink-0 hidden sm:block"
          style={{
            background: `color-mix(in oklch, ${phaseColor} 10%, transparent)`,
            color: phaseColor,
            border: `1px solid color-mix(in oklch, ${phaseColor} 25%, transparent)`,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {week.outcome}
        </div>
        <ChevronDown
          size={16}
          style={{
            color: "oklch(0.55 0.06 175)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        />
      </button>
      {open && (
        <div
          className="px-4 pb-4 pt-0"
          style={{ borderTop: "1px solid oklch(0.78 0.15 175 / 0.08)" }}
        >
          <p
            className="text-sm leading-relaxed mb-3 pt-3"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            {week.detail}
          </p>
          <div
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{ background: "oklch(0.78 0.14 75 / 0.06)", border: "1px solid oklch(0.78 0.14 75 / 0.2)" }}
          >
            <span className="text-base flex-shrink-0">📋</span>
            <div>
              <span
                className="text-xs font-bold"
                style={{ color: "oklch(0.78 0.14 75)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Homework:{" "}
              </span>
              <span
                className="text-xs"
                style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {week.homework}
              </span>
            </div>
          </div>

          {/* Referral Banner — shown only for Week 8 and Week 9 */}
          {REFERRAL_BANNERS[week.num] && (() => {
            const r = REFERRAL_BANNERS[week.num];
            return (
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl mt-3 group transition-all duration-200 no-underline"
                style={{
                  background: r.bg,
                  border: `1px solid color-mix(in oklch, ${r.color} 30%, transparent)`,
                  boxShadow: `0 0 0 0 ${r.color}`,
                  transition: "box-shadow 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 16px color-mix(in oklch, ${r.color} 25%, transparent)`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <span className="text-xl flex-shrink-0">{r.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-bold mb-0.5"
                    style={{ color: r.color, fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {r.offer}
                  </div>
                </div>
                <div
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg flex-shrink-0 text-xs font-bold whitespace-nowrap"
                  style={{
                    background: `color-mix(in oklch, ${r.color} 18%, transparent)`,
                    color: r.color,
                    border: `1px solid color-mix(in oklch, ${r.color} 35%, transparent)`,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  <Gift size={11} />
                  <span className="hidden sm:inline">Click Here</span>
                  <ExternalLink size={10} />
                </div>
              </a>
            );
          })()}
        </div>
      )}
    </div>
  );
}

export default function CurriculumSection() {
  const ref = useScrollReveal();

  return (
    <section id="curriculum" className="py-24" ref={ref}>
      <div className="container">
        <div className="sec-divider reveal">
          <div className="sec-divider-line" />
          <span className="sec-divider-label">The 12-Week Journey</span>
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
            The Complete Curriculum
          </h2>
          <p
            className="text-base max-w-xl mx-auto reveal"
            style={{ color: "oklch(0.65 0.05 175)", fontFamily: "'DM Sans', sans-serif" }}
          >
            By Week 12, you'll have a complete AI-powered operating system running inside your business. Click any week to see the full plan.
          </p>
        </div>

        {/* Phase progress bar */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 rounded-xl overflow-hidden mb-10 reveal"
          style={{ border: "1px solid oklch(0.78 0.15 175 / 0.15)" }}
        >
          {phases.map((p, i) => (
            <div
              key={i}
              className="p-4 text-center"
              style={{
                background: "oklch(0.11 0.025 240)",
                borderRight: i < phases.length - 1 ? "1px solid oklch(0.78 0.15 175 / 0.1)" : "none",
              }}
            >
              <div
                className="text-xs font-bold mb-1"
                style={{ color: p.color, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {p.phase}
              </div>
              <div
                className="text-sm font-black"
                style={{ color: "oklch(0.93 0.02 175)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {p.label}
              </div>
            </div>
          ))}
        </div>

        {/* Phases with expandable weeks */}
        <div className="space-y-8">
          {phases.map((phase, pi) => (
            <div key={pi} className="reveal" style={{ transitionDelay: `${pi * 80}ms` }}>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="h-0.5 w-6"
                  style={{ background: phase.color }}
                />
                <h3
                  className="text-base font-bold"
                  style={{ color: phase.color, fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {phase.phase} · {phase.label}
                </h3>
                <div
                  className="flex-1 h-px"
                  style={{ background: `color-mix(in oklch, ${phase.color} 20%, transparent)` }}
                />
              </div>
              <p
                className="text-sm mb-4"
                style={{ color: "oklch(0.55 0.06 175)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {phase.desc}
              </p>
              <div className="space-y-2">
                {phase.weeks.map((week) => (
                  <WeekRow key={week.num} week={week} phaseColor={phase.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
