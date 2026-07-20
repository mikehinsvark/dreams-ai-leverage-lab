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
- [x] Publish through the carousel-preserving release workflow and verify the live route.

## While You Sleep Hero Type Scale

- [x] Inspect the live hero typography and locate the exact source styles.
- [x] Reduce the desktop and responsive headline scale to align with the reference sites.
- [x] Verify line balance, supporting copy, artwork, and CTA layout on desktop and mobile.
- [x] Sync and checkpoint the managed preview project.
- [x] Publish the update and verify the live custom-domain route.

## While You Sleep Section Heading System

- [x] Audit every major section heading and its current desktop/mobile computed size.
- [x] Define and apply one reduced responsive scale for overview, sessions, recovery, bonus, and closing headings.
- [x] Verify line balance, supporting copy, section spacing, and cards across the full page on desktop and mobile.
- [x] Sync and checkpoint the managed preview project.
- [x] Publish the route-only release and verify the live custom-domain page and homepage carousel.

## While You Sleep Compact Section Rhythm

- [x] Audit desktop and mobile section padding, inter-section gaps, and large internal margins.
- [x] Define and apply a tighter shared spacing system without compressing cards or body-copy readability.
- [x] Verify section transitions, sticky elements, headings, and calls to action on desktop and mobile.
- [x] Sync and checkpoint the managed preview project.
- [x] Publish the route-only release and verify the live custom-domain page and homepage carousel.

## While You Sleep Strong Visual Compaction

- [x] Audit the user screenshot against current hero height, first-fold composition, and live section spacing.
- [x] Reduce the hero footprint and apply a materially tighter section and subsection spacing scale.
- [x] Verify the change is immediately visible on desktop while preserving mobile readability and sticky navigation.
- [x] Sync and checkpoint the managed preview project.
- [x] Publish the route-only release and verify the live custom-domain page and homepage carousel.

## Reusable While You Sleep Maintenance Skill

- [x] Extract the proven maintenance, QA, release, and credential-handling workflow from the completed project.
- [x] Initialize a dedicated reusable skill package with concise progressive disclosure.
- [x] Add deterministic release/verification resources and project-specific references without duplicating existing guidance.
- [x] Validate the skill package and test its reusable scripts or commands.
- [x] Deliver the packaged skill for installation through My Skills.

## Install While You Sleep Skill in My Skills

- [x] Reconfirm the packaged skill ZIP is valid and available for upload.
- [x] Open the authenticated Manus My Skills settings.
- [x] Upload `while-you-sleep-maintenance.skill.zip` and confirm the account accepts it.
- [x] Verify `while-you-sleep-maintenance` appears in My Skills.
- [x] Use the verified user-side Skills page after the browser connection card did not appear.
- [x] Determine whether a supported direct account API or authenticated settings URL can install a custom skill without the missing browser card.
- [x] Deliver the shortest verified manual upload flow with the validated ZIP attached when no upload API was available.

## AI Leverage Lab Homepage Rebrand and Navigation Repair

- [x] Audit the supplied logo package, canonical source branch, live homepage bundle, managed preview divergence, and While You Sleep back-link destination.
- [x] Replace “The DBR AI Leverage Lab” with “AI Leverage Lab” in the homepage hero and supporting metadata where appropriate.
- [x] Integrate the new primary logo and brand icon into the header, hero, and favicon treatment while preserving contrast and responsiveness.
- [x] Repair the While You Sleep “Back to AI Leverage Lab” action so it opens the current live homepage rather than a stale local route.
- [x] Validate the refreshed homepage and While You Sleep route on desktop and mobile, including navigation, assets, downloads, and carousel behavior.
- [x] Synchronize the managed preview where appropriate, checkpoint the work, and publish the canonical GitHub-backed release without overwriting preserved routes.
- [x] Complete all live-site auditing and verification through public URLs and repository access; do not request Manus browser authorization for this website update.
- [x] Add GitHub Pages-compatible direct entrypoints for dynamic `/topics/*` routes without overwriting the preserved `/whileyousleep`, `/savemyseat`, or `/genies` route artifacts.
- [x] Republish and verify direct route loads, Quantum Bolt branding, carousel controls, canonical return links, and both bundled PDF downloads on the custom domain.

## Save My Seat Quantum Bolt Hero Redesign

- [x] Audit the current `/savemyseat/` source, live registration flow, supplied reference composition, and official Quantum Bolt brand assets.
- [x] Replace the Dreams Business Resources logo treatment with the official AI Leverage Lab lockup at an accessible responsive size.
- [x] Rebuild the hero as a premium asymmetric command-center composition inspired by the supplied sample, including strong typography, operational status details, primary/secondary CTAs, and a custom visual focal point.
- [x] Preserve the existing registration destination, downstream content, and all unrelated homepage, While You Sleep, topic, Genie, and PDF routes.
- [x] Synchronize the managed preview and validate desktop/mobile layout, navigation, CTA behavior, asset loading, and overflow.
- [x] Checkpoint the reviewed managed project, publish the canonical GitHub Pages release, and verify the live custom-domain page.

## Save My Seat Compact Hero Scale

- [x] Audit the current desktop and responsive hero type, control, artwork, and metric-band dimensions against the supplied AI Leverage Lab reference screenshots.
- [x] Reduce the hero headline, body copy, status capsule, CTA controls, visual frame, and metric rail to the established compact site proportions without changing copy or destinations.
- [x] Preserve mobile readability, registration behavior, downstream sections, and unrelated routes.
- [x] Synchronize the managed preview and validate desktop/mobile first-fold balance, image crop, anchors, and overflow.
- [x] Checkpoint the reviewed revision, publish the canonical GitHub Pages update, and verify the compact hero on the live custom domain.

## Save My Seat Boxed Large-Monitor Canvas

- [x] Audit the current full-width page shell against the supplied boxed AI Genie and AI Leverage Lab examples.
- [x] Constrain the complete Save My Seat page to a centered desktop canvas with substantial dark side gutters on large monitors.
- [x] Preserve fluid tablet/mobile behavior, registration controls, anchors, imagery, and all downstream content.
- [x] Synchronize the managed preview and validate the boxed composition at wide desktop, standard desktop, and mobile widths.
- [ ] Checkpoint, publish the canonical GitHub Pages update, and verify the live custom-domain page and preserved routes.
