/* Electric Blueprint × Quantum Bolt: compact live-class telemetry with DST-safe Pacific scheduling and calendar actions that preserve the deployed homepage capability. */
import { useEffect, useMemo, useState } from "react";
import { CalendarPlus, Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CLASS_SCHEDULE = {
  ianaZone: "America/Los_Angeles",
  tzLabel: "PT",
  weekday: 5,
  hour: 13,
  minute: 0,
  durationMinutes: 60,
} as const;

const EVENT_TITLE = "AI Leverage Lab — Weekly Live Class";
const EVENT_DETAILS = "Live AI Leverage Lab training for independent producers. Bring your questions and follow along with the working demonstrations.";
const EVENT_LOCATION = "https://zoom.dreamsresources.com";

function getZonedParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CLASS_SCHEDULE.ianaZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
    second: Number(values.second),
  };
}

function timeZoneOffsetMs(date: Date) {
  const parts = getZonedParts(date);
  return Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second) - date.getTime();
}

function zonedTimeToUtc(year: number, month: number, day: number, hour: number, minute: number) {
  const wallClockUtc = Date.UTC(year, month - 1, day, hour, minute, 0);
  let candidate = wallClockUtc;
  for (let pass = 0; pass < 3; pass += 1) {
    candidate = wallClockUtc - timeZoneOffsetMs(new Date(candidate));
  }
  return candidate;
}

function getNextClass(nowMs: number) {
  const local = getZonedParts(new Date(nowMs));
  const localMidnight = Date.UTC(local.year, local.month - 1, local.day);
  const localWeekday = new Date(localMidnight).getUTCDay();
  const daysUntilFriday = (CLASS_SCHEDULE.weekday - localWeekday + 7) % 7;
  const targetDate = new Date(localMidnight + daysUntilFriday * 86_400_000);
  let start = zonedTimeToUtc(
    targetDate.getUTCFullYear(),
    targetDate.getUTCMonth() + 1,
    targetDate.getUTCDate(),
    CLASS_SCHEDULE.hour,
    CLASS_SCHEDULE.minute,
  );
  const durationMs = CLASS_SCHEDULE.durationMinutes * 60_000;
  if (start + durationMs <= nowMs) {
    const followingFriday = new Date(targetDate.getTime() + 7 * 86_400_000);
    start = zonedTimeToUtc(
      followingFriday.getUTCFullYear(),
      followingFriday.getUTCMonth() + 1,
      followingFriday.getUTCDate(),
      CLASS_SCHEDULE.hour,
      CLASS_SCHEDULE.minute,
    );
  }
  return { start, live: nowMs >= start && nowMs < start + durationMs };
}

function pad(value: number) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function googleDate(ms: number) {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: "38px" }}>
      <span
        className="font-black leading-none tabular-nums"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.95 0.02 175)", fontSize: "clamp(1.05rem, 2vw, 1.5rem)" }}
      >
        {value}
      </span>
      <span
        className="mt-0.5 uppercase tracking-widest"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.5 0.06 175)", fontSize: "8px" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span
      className="pb-2.5 font-black leading-none"
      style={{ color: "oklch(0.78 0.15 175)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1rem, 1.8vw, 1.35rem)", opacity: 0.5 }}
    >
      :
    </span>
  );
}

export default function ClassCountdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const { start, live } = useMemo(() => getNextClass(now), [now]);
  const dateLabel = useMemo(() => {
    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: CLASS_SCHEDULE.ianaZone,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(new Date(start));
    const time = new Intl.DateTimeFormat("en-US", {
      timeZone: CLASS_SCHEDULE.ianaZone,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(start));
    return `${day} · ${time} ${CLASS_SCHEDULE.tzLabel}`;
  }, [start]);

  const end = start + CLASS_SCHEDULE.durationMinutes * 60_000;
  const calendarLinks = useMemo(() => {
    const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(EVENT_TITLE)}&dates=${googleDate(start)}/${googleDate(end)}&details=${encodeURIComponent(EVENT_DETAILS)}&location=${encodeURIComponent(EVENT_LOCATION)}&recur=${encodeURIComponent("RRULE:FREQ=WEEKLY;BYDAY=FR")}`;
    const outlook = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(EVENT_TITLE)}&startdt=${encodeURIComponent(new Date(start).toISOString())}&enddt=${encodeURIComponent(new Date(end).toISOString())}&body=${encodeURIComponent(EVENT_DETAILS)}&location=${encodeURIComponent(EVENT_LOCATION)}`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//AI Leverage Lab//Weekly Live Class//EN",
      "BEGIN:VEVENT",
      `DTSTART:${googleDate(start)}`,
      `DTEND:${googleDate(end)}`,
      "RRULE:FREQ=WEEKLY;BYDAY=FR",
      `SUMMARY:${EVENT_TITLE}`,
      `DESCRIPTION:${EVENT_DETAILS}`,
      `LOCATION:${EVENT_LOCATION}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    return { google, outlook, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` };
  }, [end, start]);

  const remaining = Math.max(0, start - now);
  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <div
      className="inline-flex flex-col gap-2 rounded-xl px-4 py-3"
      style={{
        background: "oklch(0.1 0.025 240 / 0.92)",
        border: "1px solid oklch(0.78 0.15 175 / 0.25)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 0 24px oklch(0.78 0.15 175 / 0.14)",
      }}
    >
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: "oklch(0.78 0.15 175)", boxShadow: "0 0 8px oklch(0.78 0.15 175)", animation: "pulse-anim 1.6s infinite" }}
        />
        <span
          className="font-bold uppercase tracking-widest"
          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.78 0.15 175)", fontSize: "9px" }}
        >
          {live ? "Class Is Live" : "Next Live Class"}
        </span>
        <span className="font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.03 175)", fontSize: "11px" }}>
          {dateLabel}
        </span>
      </div>
      <div className="flex items-end gap-1.5" aria-label={live ? "Class is live now" : `${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds until class`}>
        <CountdownUnit value={pad(days)} label="Days" />
        <Separator />
        <CountdownUnit value={pad(hours)} label="Hrs" />
        <Separator />
        <CountdownUnit value={pad(minutes)} label="Min" />
        <Separator />
        <CountdownUnit value={pad(seconds)} label="Sec" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="mt-0.5 inline-flex cursor-pointer items-center gap-1.5 self-start transition-all duration-200"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.6 0.08 175)", fontSize: "10px", letterSpacing: "0.04em", background: "transparent", border: "none", padding: 0 }}
            onMouseEnter={(event) => { event.currentTarget.style.color = "oklch(0.85 0.13 175)"; }}
            onMouseLeave={(event) => { event.currentTarget.style.color = "oklch(0.6 0.08 175)"; }}
          >
            <CalendarPlus size={12} />
            <span className="font-bold uppercase tracking-widest">Add to Calendar</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          sideOffset={8}
          className="w-52 p-1.5"
          style={{ background: "oklch(0.12 0.03 240 / 0.98)", border: "1px solid oklch(0.78 0.15 175 / 0.25)", backdropFilter: "blur(10px)", boxShadow: "0 12px 40px oklch(0.05 0.02 240 / 0.6)" }}
        >
          <div className="px-2 pb-1.5 pt-1 text-[8px] font-bold uppercase tracking-widest" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#00E7E0", opacity: 0.85 }}>
            Weekly · {CLASS_SCHEDULE.tzLabel} · pick your calendar
          </div>
          {[
            { label: "Google Calendar", href: calendarLinks.google, external: true },
            { label: "Outlook.com", href: calendarLinks.outlook, external: true },
            { label: "Apple / Other (.ics)", href: calendarLinks.ics, external: false },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : { download: "ai-leverage-lab-class.ics" })}
              className="flex items-center gap-2 rounded-md px-2 py-2 transition-colors duration-150"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "11px", fontWeight: 600, color: "oklch(0.9 0.02 175)" }}
              onMouseEnter={(event) => { event.currentTarget.style.background = "oklch(0.78 0.15 175 / 0.12)"; }}
              onMouseLeave={(event) => { event.currentTarget.style.background = "transparent"; }}
            >
              {item.external ? <CalendarPlus size={13} style={{ color: "#00E7E0" }} /> : <Download size={13} style={{ color: "#00E7E0" }} />}
              {item.label}
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
