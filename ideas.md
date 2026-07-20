# While You Sleep — Design Direction

## Three Directions Considered

### Theme Name: Nocturne Command Deck
**Very Brief Intro:** A premium nighttime operations center where autonomous agents feel active, tangible, and trustworthy. It extends AI Leverage Lab’s Electric Blueprint identity with deeper midnight space, luminous status signals, and editorial pacing.

**Probability:** 0.037

### Theme Name: Dawn Shift Editorial
**Very Brief Intro:** A sophisticated magazine-like story that travels from night to morning, using oversized typography, warm sunrise accents, and photographic moments to make automation feel human and aspirational.

**Probability:** 0.082

### Theme Name: Precision Field Manual
**Very Brief Intro:** A focused training interface inspired by aerospace checklists and high-performance playbooks, emphasizing exact steps, progress, and copy-ready execution without visual clutter.

**Probability:** 0.019

## Chosen Approach: Nocturne Command Deck

### Design Movement
**Neo-futurist mission control blended with International Typographic Style.** The page should feel like a live operations deck, but information remains disciplined, legible, and editorial rather than cinematic for its own sake.

### Core Principles
1. **Operational, not ornamental:** Every glowing signal communicates status, sequence, progress, or action.
2. **Night-to-dawn narrative:** Deep midnight surfaces dominate early sections; warm gold appears as the user moves toward leverage and scale.
3. **Asymmetric authority:** Important content uses split compositions, side rails, stepped timelines, and offset cards rather than centered stacks.
4. **Human clarity:** Complex automation is explained in direct language, with copy-ready prompts and obvious next actions.

### Color Philosophy
The page inherits AI Leverage Lab’s Electric Blueprint palette so it feels native to the parent site. **Midnight navy** creates focus and conveys work happening after hours. **Electric teal** represents active systems and connected intelligence. **Signal gold** marks moments of leverage, completion, and human opportunity. A restrained **violet** distinguishes recruiting systems without turning the page into a generic gradient-heavy AI aesthetic.

### Layout Paradigm
The hero is an asymmetric two-column command deck: a bold editorial promise on the left and a live agent-orchestration visualization on the right. The journey becomes a vertical mission rail on desktop and a horizontal progress strip on mobile. Session content alternates between a narrow instruction column and wider interactive execution panels, creating a deliberate left-right rhythm. Full-width centered sections are reserved only for the final commitment moment.

### Signature Elements
1. **Dawnline:** A thin, luminous horizon line that travels through the page and shifts from teal to gold as the system progresses.
2. **Agent Pips:** Small pulsing status markers paired with concise operational labels such as ACTIVE, SCHEDULED, and READY.
3. **Prompt Capsules:** Dark, high-contrast copy panels with a tactile copy control and a subtle scan-line texture.

### Interaction Philosophy
Interactions should feel immediate and competent. Copy buttons confirm success in place, session tabs deep-link to stable hashes, and the journey rail reflects the reader’s position. Hover effects add lift and luminance without changing layout. Every interactive element has a visible keyboard focus state and a clear result.

### Animation
Entrance motion uses short opacity and translate transitions with 40–70 ms staggering. Agent signals pulse gently, the dawnline glides slowly, and the command visualization has restrained orbital drift. Buttons compress to 97% on press. All decorative motion is disabled under `prefers-reduced-motion`; navigation and copy actions remain instant.

### Typography System
**Space Grotesk** remains the display face for continuity with AI Leverage Lab, using 700 for decisive headings and 500 for interface labels. **DM Sans** is the body face for instructional clarity, using 400–600. Hero typography is large and tightly tracked; section numbers use tabular figures; prompts use **IBM Plex Mono** for a precise operational feel. Labels are uppercase with controlled tracking, never used for long passages.

### Brand Essence
**The practical command center for B2B leaders who want a trained AI workforce producing real sales and recruiting leverage around the clock.** Personality: **decisive, capable, energizing.**

### Brand Voice
Headlines sound like a confident operator, not a software vendor. CTAs name the exact action and microcopy explains what happens next. Avoid hype without proof and avoid generic phrases.

Example headline: **“Build the team that clocks in when you clock out.”**

Example CTA: **“Launch Session 1 — Hire Your First Agent”**

### Wordmark & Logo
The route uses the existing AI Leverage Lab wordmark for parent-brand trust plus a distinctive **Eclipse Bolt** submark: a dark circular horizon crossed by a sharp teal-to-gold energy stroke, symbolizing work moving from night into dawn. The mark is graphic-only, scalable, and used at a visibly intentional size in the page badge and favicon where appropriate.

### Signature Brand Color
**Dawn Current — `oklch(0.82 0.18 155)`**: a bright green-teal signal that reads as “systems active” against the midnight canvas and is reserved for status, progress, and primary action feedback.

## Style Decisions
- Maintain the parent site’s Electric Blueprint navy, teal, gold, Space Grotesk, and DM Sans foundation.
- Use asymmetric layouts and avoid excessive centered card grids.
- Give each session a deep-linkable hash and persistent navigation state.
- Provide a back-to-top/scroll control for the long-form training experience.
- Do not use fabricated reviews, ratings, or testimonials.
- Make the Dawnline a visible structural progress horizon across every major long-form page, using Dawn Current teal for active sectors and signal gold only at leverage or completion moments.
- Replace casual emoji decoration in primary navigation and route states with a fixed operations vocabulary: Agent Pips, tabular sector numbers, concise status labels, and restrained system glyphs.
- Treat centered card grids as supporting content; use asymmetric command panels, recovery consoles, side rails, and stepped sector transitions for primary page structure.
- Keep invalid and fallback routes inside the full Quantum Bolt brand world with operational language, clear recovery actions, and the same premium command-deck surfaces as successful routes.

## Save My Seat Reference Specification — 2026-07-20

The user-supplied 1920×1080 screenshot is the **ground-truth composition** for the `/savemyseat/` navigation and hero. Fidelity to its hierarchy overrides alternative concept exploration. The page must use the official horizontal AI Leverage Lab Quantum Bolt lockup in a slim dark header, compact uppercase anchor navigation, and a restrained outlined Save My Seat action.

The hero must become an asymmetric cinematic command deck: a left editorial column with an active-training status capsule, the exact promise “You Don’t Need to Learn AI. You Need to Put It to Work.,” a practical audience paragraph, primary and secondary actions, and a concise no-coding/no-tech/guided-training proof line; the right side must feature a custom no-text futuristic AI orchestration hub with transparent glass interface panels, orbital network energy, cyan/azure light, a small signal-gold accent, and deep midnight negative space. A wide four-stat rail anchors the composition beneath both columns. The custom visual must contain no generated words, logos, faces, or product UI copy; all exact copy remains accessible HTML.

On mobile, the editorial content must remain first, the visual must crop deliberately rather than create horizontal overflow, the full AI Leverage Lab lockup must remain legible, and the four stats must reorganize without becoming a dense card grid. The registration embed, `#register` and `#weeks` targets, downstream curriculum/content, and existing JavaScript counters must remain behaviorally intact.
- On Save My Seat, treat the 12-week curriculum as the page’s signature mission artifact: encode Foundations → Grow → Automate → Scale as an explicit operational phase rail while preserving the existing week copy and accordion behavior.
- Use one HUD/status-badge icon vocabulary throughout Save My Seat; replace playful emoji decoration with indexed system glyphs, operational pips, or blueprint line symbols.
- Reserve Dawn Current teal for active state, progress, and primary actions; reserve signal gold for leverage or completion; use violet only when it identifies a defined category rather than as general decoration.
- Continue the Eclipse Bolt/Dawnline motif from the hero into section transitions and the final commitment panel so the standalone campaign remains unmistakably part of AI Leverage Lab.
