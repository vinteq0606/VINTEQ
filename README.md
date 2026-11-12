# VINTEQ

VINTEQ is a responsive public studio website.

## Run locally

```sh
npm install
npm run dev
```

The development server runs at `http://localhost:5174/`. Open the exact URL printed by Vite and hard-refresh with `Ctrl+F5` after updates. If port 5174 is already in use, stop the old server in its terminal with `Ctrl+C` before starting this project; the configured port is strict so Vite cannot silently switch to a different URL.

Create a production build with `npm run build`, or serve the build locally with `npm run preview`.

## Contact form email

The contact form submits directly from the browser to Web3Forms using the public access key in `src/App.tsx`. The visitor's email is included as the Reply-To address, so you can reply directly to an enquiry. No Vercel API endpoint or Vercel CLI authentication is required.

The enquiry notification inbox is configured in Web3Forms for the access key; set it to `vinteq.dev@gmail.com` in the Web3Forms dashboard. The site's direct email links also use this address. The access key is intentionally client-visible, as Web3Forms access keys are designed for browser forms. Restrict its allowed domains in the Web3Forms dashboard where available. To send automatic confirmation emails to visitors, enable and customize **Autoresponder** in that dashboard. Autoresponder is a Web3Forms Pro feature and only works on production websites; it does not send from localhost or most preview environments.

## Included in this prototype

- Responsive VINTEQ site with About, six expandable service descriptions, industry contexts, an eight-stage process, a compact single-project glass-effect carousel with edge arrows and six-second timed advance, three featured insights and FAQ sections.
- Scroll-guided CSS 3D laptop that rotates from the Home hero into the blank area beside the About copy, then scrolls out with About before Services.
- Floating green, 3D-inspired programming symbols in the Home hero. When reduced motion is requested, the laptop and code symbols keep a slower, gentler float while other decorative motion is reduced.
- Animated technology orbit and pointer-responsive project cards, with scroll reveals and reduced-motion support.
- Bengaluru-focused SEO metadata and clear founder-led brand positioning.
- Portfolio project examples from the brief (FarmDirect, Digital Signature Verification System, Face Attendance System and Yogastra). Visuals are explicitly illustrative; client relationships, commercial status, technologies and outcomes are not claimed.
- Contact form that sends enquiries directly to Web3Forms, with visitor Reply-To and optional Web3Forms Pro autoresponder; planning details are collapsed by default.

## Deployment notes

The contact form validates required fields in the browser, includes a honeypot, and applies a per-page submission cooldown. Web3Forms provides additional spam filtering; configure its dashboard protections for production.
