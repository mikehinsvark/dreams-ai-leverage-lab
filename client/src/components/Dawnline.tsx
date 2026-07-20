/* Nocturne Command Deck: the Dawnline is the site-wide operational horizon; cyan marks active systems and gold is reserved for leverage/completion sectors. */
type DawnlineProps = {
  index: string;
  label: string;
  state?: "ACTIVE" | "READY" | "SCHEDULED" | "COMPLETE";
  warm?: boolean;
};

export default function Dawnline({ index, label, state = "READY", warm = false }: DawnlineProps) {
  const signal = warm ? "#F4C542" : "#00E7E0";
  const fade = warm ? "rgba(244,197,66,0.05)" : "rgba(0,231,224,0.05)";

  return (
    <div
      className="relative z-20 flex items-center gap-3 px-[clamp(18px,4vw,48px)] py-3"
      style={{
        background: `linear-gradient(90deg, transparent, ${fade} 32%, transparent 82%)`,
        borderTop: `1px solid ${warm ? "rgba(244,197,66,0.11)" : "rgba(0,231,224,0.11)"}`,
      }}
      aria-label={`${label} sector ${state.toLowerCase()}`}
    >
      <div className="flex shrink-0 items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: signal, boxShadow: `0 0 8px ${signal}` }} aria-hidden="true" />
        <span
          className="font-bold uppercase tracking-[0.2em]"
          style={{ color: signal, fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px" }}
        >
          {state}
        </span>
      </div>
      <span
        className="shrink-0 tabular-nums"
        style={{ color: "rgba(159,195,202,0.62)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}
      >
        {index}
      </span>
      <span
        className="hidden shrink-0 font-bold uppercase tracking-[0.18em] sm:inline"
        style={{ color: "rgba(234,251,255,0.62)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "8px" }}
      >
        {label}
      </span>
      <div className="relative h-px min-w-0 flex-1 overflow-visible" style={{ background: `linear-gradient(90deg, ${signal}, rgba(42,140,255,0.3) 55%, transparent)` }}>
        <span className="absolute -top-[2px] left-[38%] h-[5px] w-[5px] rounded-full" style={{ background: signal, boxShadow: `0 0 10px ${signal}` }} aria-hidden="true" />
        <span className="absolute -top-[1px] left-[71%] h-[3px] w-[3px] rounded-full" style={{ background: warm ? signal : "#2A8CFF" }} aria-hidden="true" />
      </div>
    </div>
  );
}
