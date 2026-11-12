# VINTEQ

VINTEQ is a responsive public studio website.

## Run locally

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:5174/`. Open the exact URL printed by Vite and hard-refresh with `Ctrl+F5` after updates. If port 5174 is already in use, stop the old server in its terminal with `Ctrl+C` before starting this project; the configured port is strict so Vite cannot silently switch to a different URL.

Create a production build with `npm run build`, or serve the build locally with `npm run preview`.

## Quality checks

- `npm test` runs the contact form, navigation and carousel component tests.
- `npm run test:e2e` runs Playwright keyboard-navigation and axe-core accessibility checks against the local site.
- `npm run lint` checks the TypeScript/React code and test files with ESLint.
- `npm run format:check` verifies formatting; run `npm run format` to apply it.
- `npm run build` type-checks and creates the production build.

Playwright uses Chromium; install its browser once with `npx playwright install chromium` before running the end-to-end checks in a fresh environment. If the download is unavailable but Google Chrome is already installed, set `$env:PLAYWRIGHT_USE_SYSTEM_CHROME = '1'` in PowerShell before `npm run test:e2e`. The automated axe scan covers selected WCAG 2.1 A/AA rules and does not replace manual keyboard or screen-reader review.

## Images and error monitoring

Run `npm run images:optimize` after changing the logo/mark source PNGs or `public/og-image.png`. The script generates responsive WebP logo/mark sizes and recompresses the social preview. The app serves WebP brand variants with PNG fallbacks and lazy-loads below-the-fold brand images.

Production error reporting is optional until `VITE_SENTRY_DSN` is configured in the deployment environment. Set it in Vercel and redeploy to enable Sentry; reporting is disabled when it is absent. Collection of user information, cookies, headers, request bodies, URL query parameters, and stack-frame variables is disabled in the SDK configuration. Review Sentry project access and retention settings before enabling it.

## Contact form

The contact form sends project enquiries to VINTEQ through Web3Forms. The visitor's email is included as Reply-To so VINTEQ can respond directly. This website does not send an automatic acknowledgement or confirmation email. If an autoresponder is enabled for the Web3Forms access key, disable it in the Web3Forms dashboard. Configure the notification inbox and domain restrictions there as well; Web3Forms provides spam filtering.

The privacy policy at `/privacy` describes the information submitted and the service provider that processes it. The form also offers direct email and WhatsApp contact options.

## Included in this prototype

- Responsive VINTEQ site with About, six expandable service descriptions, industry contexts, an eight-stage process, a compact single-project glass-effect carousel with edge arrows and six-second timed advance, three featured insights and FAQ sections.
- Scroll-guided CSS 3D laptop that rotates from the Home hero into the blank area beside the About copy, then scrolls out with About before Services.
- Floating green, 3D-inspired programming symbols in the Home hero. When reduced motion is requested, the laptop and code symbols keep a slower, gentler float while other decorative motion is reduced.
- Animated technology orbit and pointer-responsive project cards, with scroll reveals and reduced-motion support.
- Bengaluru-focused SEO metadata and clear founder-led brand positioning.
- Portfolio project examples from the brief (FarmDirect, Digital Signature Verification System, Face Attendance System and Yogastra). Visuals are explicitly illustrative; client relationships, commercial status, technologies and outcomes are not claimed.
- Contact form that sends enquiries through Web3Forms with visitor Reply-To, privacy notice and consent, a clear success state, and WhatsApp as an alternative contact channel. The website code does not send an automatic acknowledgement.
- Privacy policy at `/privacy`, describing enquiry handling by Web3Forms.

## Deployment notes

The static website can be deployed to Vercel. Configure the Web3Forms notification inbox and allowed domains for production in the Web3Forms dashboard.
