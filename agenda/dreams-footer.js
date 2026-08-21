/* Dreams Business Resources footer — injected after the independent React agenda mounts. */
(function () {
  const home = "https://aileveragelab.pro/";
  const insertChrome = () => {
    if (document.querySelector(".dreams-footer-shell")) return;
    const topLink = document.createElement("a");
    topLink.className = "dreams-return-top";
    topLink.href = home;
    topLink.setAttribute("aria-label", "Return to AI Leverage Lab homepage");
    topLink.innerHTML = "← <span>AI Leverage Lab</span>";
    document.body.appendChild(topLink);

    const footer = document.createElement("footer");
    footer.className = "dreams-footer-shell";
    footer.innerHTML = `
      <div class="dreams-footer">
        <div class="dreams-footer-main">
          <a class="dreams-brand" href="${home}" aria-label="Return to AI Leverage Lab homepage">
            <span class="dreams-mark" aria-hidden="true">ϟ</span>
            <span class="dreams-brand-copy"><strong><span>AI</span> Leverage <span>Lab</span></strong><small>While you sleep</small></span>
          </a>
          <nav class="dreams-network" aria-label="Dreams Business Resources network">
            <a href="https://dreamsfaststart.com/">Fast Start</a>
            <a href="https://renewalsforlife.com/">Renewals For Life</a>
            <a class="dreams-network-gold" href="${home}">AI Genie Bundle</a>
            <a href="${home}">B2B Income Calculator</a>
          </nav>
        </div>
        <p class="dreams-footer-subline">A Dreams Business Resources innovation · <a href="https://dreamsfaststart.com/">dreamsfaststart.com</a></p>
        <div class="dreams-footer-bottom">
          <p>© 2026 Dreams Business Resources · Mike Hinsvark, Senior Agency Partner · <a href="mailto:mikeceo@gmail.com">mikeceo@gmail.com</a><br>All rights reserved. Income results vary. This training material is for educational purposes only.</p>
          <a class="dreams-return-bottom" href="${home}">← RETURN TO AI LEVERAGE LAB</a>
        </div>
      </div>`;
    document.body.appendChild(footer);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(insertChrome, 0));
  else setTimeout(insertChrome, 0);
})();
