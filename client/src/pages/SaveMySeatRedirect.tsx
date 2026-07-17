/* Electric Blueprint registration handoff: preserve the premium standalone page while supporting clean-path preview routing. */
import { useEffect } from "react";

export default function SaveMySeatRedirect() {
  useEffect(() => {
    window.location.replace("/savemyseat/index.html");
  }, []);

  return (
    <main
      className="min-h-screen grid place-items-center bg-[#020817] text-[#F8FAFC]"
      aria-live="polite"
    >
      <p className="font-semibold tracking-wide">Opening registration…</p>
    </main>
  );
}
