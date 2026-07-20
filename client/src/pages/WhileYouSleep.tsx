/*
 * NOCTURNE COMMAND DECK
 * Electric Blueprint foundation, asymmetric mission-control layouts, night-to-dawn narrative,
 * operational status signals, deep-linked sessions, and direct action-oriented copy.
 */
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronUp,
  Clipboard,
  Clock3,
  Copy,
  ExternalLink,
  FileSearch,
  MailCheck,
  Network,
  RefreshCw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  Users,
  WandSparkles,
  Workflow,
  Zap,
} from "lucide-react";
import heroArt from "@/assets/while-you-sleep/while-you-sleep-hero.webp";
import nightShiftArt from "@/assets/while-you-sleep/while-you-sleep-night-shift.webp";
import duplicateArt from "@/assets/while-you-sleep/while-you-sleep-duplicate.webp";
import quantumBolt from "@/assets/brand/ai-leverage-lab-icon.svg";
import "./while-you-sleep.css";

const CLAUDE_REFERRAL_URL = "https://claude.ai/referral/UhFq2KPTiQ?s=cowork&v=apps";
const AI_LEVERAGE_LAB_HOME_URL = "https://aileveragelab.pro/";

const sessions = [
  { id: "journey", short: "Overview", label: "The 3-Week Journey", number: "00" },
  { id: "session1", short: "Session 1", label: "Meet Your Team", number: "01" },
  { id: "session2", short: "Session 2", label: "Put It On Autopilot", number: "02" },
  { id: "session3", short: "Session 3", label: "Scale & Duplicate", number: "03" },
];

const agents = [
  {
    name: "Sales Genie",
    role: "Outbound revenue",
    description: "Researches prospects, drafts openers and follow-up, and helps you book more conversations.",
    icon: Target,
    tone: "teal",
    status: "ACTIVE",
  },
  {
    name: "Recruiting Genie",
    role: "Talent pipeline",
    description: "Sources, engages, and follows up with the people who could strengthen your team.",
    icon: Users,
    tone: "violet",
    status: "ACTIVE",
  },
  {
    name: "Morning Briefing",
    role: "Executive readiness",
    description: "Turns your calendar, inbox, and priorities into one focused start-of-day briefing.",
    icon: Sparkles,
    tone: "gold",
    status: "SCHEDULED",
  },
  {
    name: "Workflow Automator",
    role: "Execution control",
    description: "Keeps recurring tasks, follow-through, and operating rhythms moving without reminders.",
    icon: Workflow,
    tone: "green",
    status: "ACTIVE",
  },
  {
    name: "Dreams Cowork OS",
    role: "Unified command",
    description: "Brings your pipeline, priorities, scorecard, and agent team into one command center.",
    icon: Network,
    tone: "blue",
    status: "READY",
  },
];

const installSteps = [
  ["Open the Claude desktop app", "Use any Claude Desktop referral button on this page. You need a computer for this experience—not only a phone."],
  ["Sign in with your business email", "Use the Google account you want connected to your business inbox and calendar."],
  ["Switch to Cowork mode", "Cowork is where your agents live. If you do not see it, update the desktop app and restart."],
  ["Install the DBR AI Agent Team plugin", "Use the exact install link from your trainer or team channel to add the Genies and Dreams OS."],
  ["Connect Gmail", "Approve the requested permissions so your assistant can identify urgent messages and prepare replies."],
  ["Connect Google Calendar", "Approve the calendar permissions so your briefing can see your schedule and meeting context."],
  ["Confirm your team is ready", "Look for Sales Genie, Recruiting Genie, and Dreams OS in Cowork. If they appear, you are installed."],
];

const taskPrompts = [
  {
    label: "Task 1 · 6:00 AM Morning Briefing",
    icon: Sparkles,
    text: "Every weekday at 6am [my timezone], review my calendar for today and scan my inbox for anything urgent or from a prospect. Give me a briefing with: (1) my schedule, (2) my top 3 priorities for the day, and (3) any email I need to answer first, with a suggested reply.",
  },
  {
    label: "Task 2 · Nightly Prospect Research",
    icon: FileSearch,
    text: "Every night at 9pm, take the next name on my prospect list [location of your list] and use the Sales Genie to research their company and draft my cold-call opener and first email for tomorrow morning. Save the draft where I will see it in my morning briefing.",
  },
  {
    label: "Task 3 · Friday Weekly Review",
    icon: CalendarCheck,
    text: "Every Friday at 4pm, review my week—meetings held, prospects contacted, and follow-ups sent—and score it against my 12-Week Game Plan targets. Tell me what worked, what slipped, and the single most important fix for next week.",
  },
];

const bonusPrompts = [
  {
    label: "Follow-Up Sweeper",
    text: "Every night at 8pm, check for prospects I have contacted who have not replied in 3 or more days, and draft a short, friendly follow-up nudge for each. Queue the drafts for my review in the morning.",
  },
  {
    label: "Meeting Prep",
    text: "One hour before any external meeting on my calendar, brief me: who I am meeting, what their company does, our history together, and the three most useful talking points.",
  },
  {
    label: "Sunday Planner",
    text: "Every Sunday at 6pm, look at my calendar for the coming week and my Game Plan priorities, then build my week plan: time blocks, top priorities per day, and anything I should prepare in advance.",
  },
];

function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id);
  if (!element) return;
  const offset = 118;
  const top = element.getBoundingClientRect().top + window.scrollY - offset;
  window.history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top, behavior });
}

function CopyPrompt({ label, text, compact = false }: { label: string; text: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <article className={`wys-prompt ${compact ? "wys-prompt--compact" : ""}`}>
      <div className="wys-prompt__bar">
        <span>{label}</span>
        <button type="button" onClick={copy} aria-label={`Copy ${label}`}>
          {copied ? <Check size={15} /> : <Copy size={15} />}
          {copied ? "Copied" : "Copy prompt"}
        </button>
      </div>
      <p>“{text}”</p>
    </article>
  );
}

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <header className="wys-section-heading wys-reveal">
      <p>{kicker}</p>
      <h2>{title}</h2>
      {intro && <div>{intro}</div>}
    </header>
  );
}

export default function WhileYouSleep() {
  const [activeSection, setActiveSection] = useState("journey");
  const [scrollProgress, setScrollProgress] = useState(0);
  const sessionIds = useMemo(() => sessions.map((session) => session.id), []);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const previousDescription = description?.getAttribute("content") || "";
    document.title = "Your Agents Work While You Sleep | AI Leverage Lab";
    description?.setAttribute(
      "content",
      "A three-session DBR training experience for installing, scheduling, and duplicating an AI agent team for sales, recruiting, follow-up, and daily execution.",
    );

    const hash = window.location.hash.replace("#", "");
    if (sessionIds.includes(hash)) window.setTimeout(() => scrollToSection(hash, "auto"), 100);
    else window.scrollTo(0, 0);

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);

      let current = "journey";
      sessionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 170) current = id;
      });
      setActiveSection(current);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".wys-reveal").forEach((element) => revealObserver.observe(element));
    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      document.title = previousTitle;
      description?.setAttribute("content", previousDescription);
      revealObserver.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, [sessionIds]);

  return (
    <div className="wys-page" id="top">
      <div className="wys-progress" aria-hidden="true">
        <span style={{ width: `${scrollProgress}%` }} />
      </div>

      <header className="wys-topbar">
        <div className="wys-shell wys-topbar__inner">
          <a className="wys-brand" href={AI_LEVERAGE_LAB_HOME_URL} aria-label="Return to the live AI Leverage Lab homepage">
            <span className="wys-brand__mark"><img src={quantumBolt} alt="" /></span>
            <span>
              <strong>AI Leverage Lab™</strong>
              <small>While You Sleep</small>
            </span>
          </a>
          <nav aria-label="While You Sleep sections">
            <a className="wys-home-link" href={AI_LEVERAGE_LAB_HOME_URL}><ArrowLeft size={15} /> Main Lab</a>
            <a href={CLAUDE_REFERRAL_URL} target="_blank" rel="noreferrer" className="wys-button wys-button--small">
              Get Claude Desktop <ExternalLink size={14} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="wys-hero">
          <div className="wys-hero__image" style={{ backgroundImage: `url(${heroArt})` }} />
          <div className="wys-hero__veil" />
          <div className="wys-hero__grid" />
          <div className="wys-shell wys-hero__content">
            <div className="wys-hero__copy wys-reveal">
              <div className="wys-eyebrow"><span className="wys-live-dot" /> DBR AI Agent Team · 3-Session Training</div>
              <h1>Build the team that clocks in <em>when you clock out.</em></h1>
              <p>Launch a practical AI agent team for recruiting, follow-up, prospect research, and daily execution—without needing a technical background.</p>
              <div className="wys-hero__actions">
                <button type="button" className="wys-button" onClick={() => scrollToSection("session1")}>Launch Session 1 <ArrowRight size={17} /></button>
                <button type="button" className="wys-button wys-button--ghost" onClick={() => scrollToSection("session2")}><Clipboard size={17} /> View Task Templates</button>
              </div>
              <div className="wys-proofline">
                <span><strong>3</strong> guided sessions</span>
                <span><strong>60</strong> minutes each</span>
                <span><strong>24/7</strong> operating rhythm</span>
              </div>
            </div>

            <aside className="wys-command wys-reveal" aria-label="AI agent command center">
              <div className="wys-command__header">
                <span>Agent Command Center</span>
                <small><span className="wys-live-dot" /> ALL SYSTEMS ACTIVE</small>
              </div>
              <div className="wys-command__core">
                <div className="wys-command__orbit wys-command__orbit--one" />
                <div className="wys-command__orbit wys-command__orbit--two" />
                <div className="wys-command__hub"><img src={quantumBolt} alt="" /></div>
                {agents.slice(0, 4).map((agent, index) => {
                  const Icon = agent.icon;
                  return <span key={agent.name} className={`wys-command__node wys-command__node--${index + 1}`}><Icon size={16} /></span>;
                })}
              </div>
              <div className="wys-command__feed">
                {agents.slice(0, 4).map((agent) => (
                  <div key={agent.name}>
                    <span className={`wys-agent-pip wys-agent-pip--${agent.tone}`} />
                    <p><strong>{agent.name}</strong><small>{agent.role}</small></p>
                    <em>{agent.status}</em>
                  </div>
                ))}
              </div>
              <div className="wys-command__footer">
                <span>Overnight queue</span>
                <strong>4 workflows ready</strong>
              </div>
            </aside>
          </div>
          <button className="wys-scroll-cue" type="button" onClick={() => scrollToSection("journey")} aria-label="Scroll to the training journey">
            <span>See the system</span><ArrowDown size={17} />
          </button>
        </section>

        <nav className="wys-session-nav" aria-label="Training session navigation">
          <div className="wys-shell">
            {sessions.map((session) => (
              <button key={session.id} type="button" className={activeSection === session.id ? "is-active" : ""} onClick={() => scrollToSection(session.id)}>
                <span>{session.number}</span><strong>{session.short}</strong><small>{session.label}</small>
              </button>
            ))}
          </div>
        </nav>

        <section className="wys-section wys-journey" id="journey">
          <div className="wys-shell">
            <SectionHeading kicker="The operating model" title="Prove it tonight. Automate it this week. Duplicate it next." intro="This is not another list of AI ideas. It is a guided three-week operating system that turns one useful result into an always-on team advantage." />
            <div className="wys-journey__rail wys-reveal">
              {[
                ["01", "Prove It", "Install your agent team and create a real prospecting win before the day ends."],
                ["02", "Automate It", "Schedule three focused workflows that return useful work without another reminder."],
                ["03", "Duplicate It", "Hand the same proven system to each new person you recruit and lead."],
              ].map(([number, title, description]) => (
                <article key={number}>
                  <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><CheckCircle2 size={20} />
                </article>
              ))}
            </div>
            <div className="wys-agent-grid">
              {agents.map((agent) => {
                const Icon = agent.icon;
                return (
                  <article className={`wys-agent-card wys-agent-card--${agent.tone} wys-reveal`} key={agent.name}>
                    <div className="wys-agent-card__top"><span><Icon size={22} /></span><em><i />{agent.status}</em></div>
                    <small>{agent.role}</small><h3>{agent.name}</h3><p>{agent.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="wys-section wys-session wys-session--one" id="session1">
          <div className="wys-shell">
            <div className="wys-session__mast wys-reveal"><span>SESSION / 01</span><div><small>Prove it</small><h2>Meet your team.<br />Hire your first agent.</h2></div><p>By the end of this session, your team is installed, connected, and producing work for a real prospect.</p></div>
            <div className="wys-install-layout">
              <aside className="wys-install-aside wys-reveal">
                <span>Guided install</span><h3>Seven steps from download to first win.</h3><p>Complete these in order. Your trainer can resolve most issues in minutes when everyone stays on the same checkpoint.</p>
                <a href={CLAUDE_REFERRAL_URL} target="_blank" rel="noreferrer">Download Claude Desktop <ExternalLink size={15} /></a>
              </aside>
              <div className="wys-install-list">
                {installSteps.map(([title, description], index) => (
                  <article className="wys-reveal" key={title}>
                    <span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{description}</p></div>{index === installSteps.length - 1 ? <CheckCircle2 size={22} /> : <ArrowRight size={18} />}
                  </article>
                ))}
              </div>
            </div>

            <div className="wys-fixes">
              <SectionHeading kicker="Fast recovery" title="Stuck? Start here." />
              <div className="wys-fixes__grid">
                {[
                  [RefreshCw, "Cannot find Cowork?", "Confirm you are using the desktop app, update it, then restart."],
                  [ShieldCheck, "Google sign-in loops?", "Disconnect and deliberately reconnect the correct business Google account."],
                  [MailCheck, "Agent cannot see email?", "Wait two minutes, then reconnect and approve every requested permission."],
                  [WandSparkles, "Responses look generic?", "Check the skills list. You may be in plain Claude without the DBR plugin loaded."],
                ].map(([Icon, title, copy]) => {
                  const FixIcon = Icon as typeof RefreshCw;
                  return <article className="wys-reveal" key={String(title)}><FixIcon size={21} /><h3>{String(title)}</h3><p>{String(copy)}</p></article>;
                })}
              </div>
            </div>

            <div className="wys-first-win wys-reveal">
              <div><span>Tonight’s proof</span><h3>Create your first real output in 90 seconds.</h3><p>Replace the brackets, press Enter, and watch your first employee work on an actual prospect.</p></div>
              <CopyPrompt label="Your first Sales Genie assignment" text="Use the Sales Genie to draft a cold-call opener and follow-up email for [prospect name] at [company]." />
              <CopyPrompt label="Build the command center" text="Build my Dreams Cowork OS." compact />
            </div>
          </div>
        </section>

        <section className="wys-section wys-session wys-session--two" id="session2">
          <div className="wys-shell">
            <div className="wys-session__mast wys-reveal"><span>SESSION / 02</span><div><small>Automate it</small><h2>Put the work<br />on autopilot.</h2></div><p>The difference between a chatbot and an employee is a schedule. Ask once; let the system return ready-to-use work.</p></div>
            <div className="wys-night-shift wys-reveal">
              <img src={nightShiftArt} alt="Abstract nighttime AI workflows preparing sales research and morning priorities" />
              <div><span><Clock3 size={15} /> THE NIGHT SHIFT</span><h3>Your next day starts the night before.</h3><p>Three small, specific tasks create an operating rhythm: prepare the day, advance the pipeline, and coach the week.</p></div>
            </div>
            <div className="wys-task-grid">
              {taskPrompts.map((task) => {
                const Icon = task.icon;
                return <div className="wys-task-wrap wys-reveal" key={task.label}><span><Icon size={19} /></span><CopyPrompt label={task.label} text={task.text} /></div>;
              })}
            </div>
            <div className="wys-rules">
              <SectionHeading kicker="Prompt discipline" title="The three rules of scheduled work." />
              <div>
                {[
                  [Target, "Be specific", "“Check my email” is vague. Name the messages, urgency, and result you want."],
                  [BriefcaseBusiness, "One job per task", "Three focused tasks are easier to trust, coach, and improve than one giant request."],
                  [MailCheck, "Name the destination", "A briefing, draft, or dashboard update needs an obvious place to arrive."],
                ].map(([Icon, title, copy], index) => {
                  const RuleIcon = Icon as typeof Target;
                  return <article className="wys-reveal" key={String(title)}><span>0{index + 1}</span><RuleIcon size={22} /><h3>{String(title)}</h3><p>{String(copy)}</p></article>;
                })}
              </div>
            </div>
            <div className="wys-homework wys-reveal"><TimerReset size={28} /><div><small>Week 2 field assignment</small><h3>Let all three tasks run for a full week.</h3><p>Do not delete an imperfect output. Bring Wednesday’s briefing to Session 3—that is the proof that showed up while you slept.</p></div></div>
          </div>
        </section>

        <section className="wys-section wys-session wys-session--three" id="session3">
          <div className="wys-shell">
            <div className="wys-session__mast wys-reveal"><span>SESSION / 03</span><div><small>Duplicate it</small><h2>Scale the system.<br />Lead the leverage.</h2></div><p>Connect more of your operating stack, then give every new team member the same three-week path to capability.</p></div>
            <div className="wys-scale-layout">
              <div className="wys-scale-copy wys-reveal">
                <span>THE DUPLICATION ADVANTAGE</span><h3>You do not have to teach the technology. You bring the belief and the page teaches the system.</h3>
                <p>Invite a new recruit to the next live training or guide them through Session 1 using this page. The experience stays consistent as your team grows.</p>
                <blockquote>“Join my team, and in your first three weeks I’ll help you install an AI agent team that briefs you every morning, researches prospects every night, and drafts outreach before you wake up.”</blockquote>
              </div>
              <figure className="wys-scale-art wys-reveal"><img src={duplicateArt} alt="A central AI operations system duplicating into a network of team systems" /><figcaption><Network size={16} /> One operating system. Every new teammate.</figcaption></figure>
            </div>
            <div className="wys-stack-grid">
              <article className="wys-stack-card wys-reveal"><span><Zap size={22} /></span><small>Stack it</small><h3>Connect more. Automate more.</h3><ul><li>Connect Calendly and your CRM or prospect list.</li><li>Add a nightly follow-up sweeper.</li><li>Prepare every external meeting one hour in advance.</li><li>Build the coming week every Sunday evening.</li></ul></article>
              <article className="wys-stack-card wys-stack-card--gold wys-reveal"><span><Users size={22} /></span><small>Duplicate it</small><h3>Turn capability into culture.</h3><ul><li>Invite your recruit to the next training run.</li><li>Use this page for a focused one-to-one install.</li><li>Share the same task templates and checkpoints.</li><li>Book their Session 1 within 14 days.</li></ul></article>
            </div>
            <div className="wys-bonus">
              <SectionHeading kicker="Expansion pack" title="Three bonus workflows for the next level." />
              <div>{bonusPrompts.map((prompt) => <CopyPrompt key={prompt.label} label={prompt.label} text={prompt.text} compact />)}</div>
            </div>
          </div>
        </section>

        <section className="wys-final">
          <div className="wys-final__horizon" />
          <div className="wys-shell wys-final__content wys-reveal">
            <span className="wys-final__icon"><Rocket size={28} /></span>
            <p>YOUR NEXT SHIFT STARTS NOW</p>
            <h2>Same 24 hours.<br /><em>Different leverage.</em></h2>
            <div>Twelve weeks from now, one version of you is still doing everything manually. The other wakes up to a briefing, researched prospects, and prepared outreach.</div>
            <div className="wys-final__actions">
              <a href={CLAUDE_REFERRAL_URL} target="_blank" rel="noreferrer" className="wys-button">Download Claude Desktop <ExternalLink size={16} /></a>
              <button type="button" className="wys-button wys-button--ghost" onClick={() => scrollToSection("session1")}>Restart Session 1 <ArrowRight size={16} /></button>
            </div>
            <small>3 sessions · 60 minutes each · No technical background required · Weekly support</small>
          </div>
        </section>
      </main>

      <footer className="wys-footer">
        <div className="wys-shell">
          <div><a className="wys-brand" href={AI_LEVERAGE_LAB_HOME_URL} aria-label="Return to the live AI Leverage Lab homepage"><span className="wys-brand__mark"><img src={quantumBolt} alt="" /></span><span><strong>AI Leverage Lab™</strong><small>Dreams Business Resources</small></span></a><p>Practical AI leverage for leaders building sales, recruiting, and B2B distribution teams.</p></div>
          <nav><a href={AI_LEVERAGE_LAB_HOME_URL}>AI Leverage Lab Home</a><a href="https://dreams.ceo">Dreams Business Resources</a><a href="mailto:mikeceo@gmail.com">Contact Mike</a></nav>
        </div>
        <div className="wys-shell wys-footer__legal">© 2026 Dreams Business Resources · Mike Hinsvark, Senior Agency Partner. Educational use only. Claude, Cowork, Gmail, Google Calendar, and Calendly are trademarks of their respective owners; DBR is not affiliated with or endorsed by them. Income results vary.</div>
      </footer>

      <button type="button" className={`wys-to-top ${scrollProgress > 12 ? "is-visible" : ""}`} onClick={() => scrollToSection("top")} aria-label="Back to top"><ChevronUp size={20} /></button>
    </div>
  );
}
