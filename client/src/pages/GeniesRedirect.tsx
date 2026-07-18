/* Electric Blueprint route bridge: keep /genies clean while loading the standalone full-viewport AI Genie Team experience. */
import { useEffect } from "react";

export default function GeniesRedirect() {
  useEffect(() => {
    window.location.replace("/genies/index.html");
  }, []);

  return (
    <main
      className="min-h-screen grid place-items-center bg-[#04070f] text-[#8ff5df] uppercase tracking-[0.16em] text-sm"
      aria-live="polite"
    >
      Opening AI Genie Team…
    </main>
  );
}
