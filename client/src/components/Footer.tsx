/* Electric Blueprint × Quantum Bolt footer: official brand lockup, restrained cyan accents, and clear DBR parent-company attribution. */
import brandLogo from "@/assets/brand/ai-leverage-lab-logo-dark.svg";

const footerLinks = [
  { label: "Fast Start", href: "https://dreamsfaststart.com" },
  { label: "Renewals For Life", href: "https://renewalsforlife.com/" },
  { label: "AI Genie Database", href: "https://dreamsaiagents.pro/mike-portal.html" },
  { label: "B2B Income Calculator", href: "https://dreamsincal-lifetime.manus.space/#quantum" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.06 0.018 240)",
        borderTop: "1px solid oklch(0.78 0.15 175 / 0.12)",
      }}
    >
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Quantum Bolt brand */}
          <div className="text-center md:text-left">
            <a
              href="/"
              aria-label="AI Leverage Lab home"
              className="inline-block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E7E0]/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#03090D]"
            >
              <img
                src={brandLogo}
                alt="AI Leverage Lab — While You Sleep"
                className="h-auto w-[280px] max-w-full"
              />
            </a>
            <div
              className="mt-1 text-xs"
              style={{ color: "oklch(0.45 0.04 175)", fontFamily: "'DM Sans', sans-serif" }}
            >
              A Dreams Business Resources innovation · dreamsfaststart.com
            </div>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold transition-opacity duration-150"
                style={{ color: "oklch(0.78 0.15 175)", fontFamily: "'DM Sans', sans-serif" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="mt-6 pt-6 text-center text-xs leading-relaxed"
          style={{
            color: "oklch(0.35 0.03 175)",
            borderTop: "1px solid oklch(0.78 0.15 175 / 0.08)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          © 2026 Dreams Business Resources · Mike Hinsvark, Senior Agency Partner ·{" "}
          <a
            href="mailto:mikeceo@gmail.com"
            style={{ color: "oklch(0.78 0.15 175)" }}
          >
            mikeceo@gmail.com
          </a>
          <br />
          All rights reserved. Income results vary. This training material is for educational purposes only.
        </div>
      </div>
    </footer>
  );
}
