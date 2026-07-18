# While You Sleep Deployment Checklist

- [x] Confirm the current live homepage carousel files and hero layout are preserved byte-for-byte in the deployment source.
- [x] Reconcile the new route and navigation link onto the current live source without replacing the homepage.
- [x] Build the reconciled site and verify the homepage and `/whileyousleep` locally.
- [x] Deploy the static build to GitHub Pages using the temporary credential.
- [x] Verify `https://aileveragelab.pro/` still shows the carousel hero.
- [x] Verify `https://aileveragelab.pro/whileyousleep` loads directly and all assets resolve.
- [x] Ask the user to revoke the temporary GitHub credential immediately after verification in the final handoff.

## Claude Desktop Referral Link Update

- [x] Find every `claude.ai/download` link in the While You Sleep source and compiled route.
- [x] Replace all Claude Desktop CTA destinations with `https://claude.ai/referral/UhFq2KPTiQ?s=cowork&v=apps`.
- [x] Rebuild the source branch and regenerate the carousel-preserving add-on release.
- [x] Deploy the update without replacing or rebuilding the original homepage carousel.
- [x] Verify every live Claude Desktop CTA resolves to the referral URL.
- [x] Confirm the original homepage carousel remains operational after deployment.

## Save My Seat Registration Page

- [x] Inspect the supplied registration-page HTML, its final signup destination, and responsive behavior.
- [x] Add the supplied design as a dedicated `/savemyseat` page without altering the existing homepage hero or carousel.
- [x] Resize the upper-right Save My Seat CTA to a compact single-line proportion on desktop and mobile.
- [x] Point the homepage Save My Seat CTA to `/savemyseat`.
- [x] Build and verify the homepage, carousel, CTA, and registration page locally.
- [x] Deploy the carousel-preserving update and verify both live routes.

## AI Genie Team Hero Link

- [x] Inspect the current homepage hero action-row markup and capture its desktop/mobile height baseline.
- [x] Add a compact `AI Genie Team` button beside `Zoom Link` without adding another row.
- [x] Add `https://aileveragelab.pro/genies` as a clean route to `https://aigenieblue-dreams.manus.space/#integrations`.
- [x] Extend the carousel-preserving release assembler to inject the button and publish the clean route.
- [x] Build and verify desktop/mobile hero dimensions and carousel behavior locally.
- [x] Deploy and verify the live button, `/genies` destination, and unchanged hero height.

## Button Hover Animation Gallery

- [x] Create a self-contained interactive gallery with several distinct hover and tap animations.
- [x] Match the gallery’s colors and typography to AI Leverage Lab for realistic comparison.
- [x] Include clear labels and concise guidance for each animation style.
- [x] Verify the gallery in a browser and deliver it for selection.

## AI Genie Icon Launch and Hero Landing Fix

- [x] Inspect the live AI Genie Team button injection and `/genies` wrapper scroll behavior.
- [x] Add a visible bolt icon and the selected Icon Launch hover/tap animation without changing the action-row height.
- [x] Remove the integrations auto-scroll behavior and force the embedded AI Genie page to open at its top hero.
- [x] Update the editable source and carousel-preserving release assembler together.
- [x] Verify desktop/mobile animation behavior, top-of-page landing, and carousel locally.
- [x] Deploy and verify the corrected live button and `/genies` landing behavior.

## Persistent Back to AI Leverage Lab Navigation

- [x] Review the current `/genies` wrapper layout and embedded-frame stacking behavior.
- [x] Add a persistent, accessible Back to AI Leverage Lab control without covering key Genie content.
- [x] Verify desktop, mobile, keyboard, and reduced-motion behavior locally.
- [x] Sync and checkpoint the managed preview project.
- [ ] Publish through the carousel-preserving release workflow and verify the live route.
