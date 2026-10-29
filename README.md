# Prodesk IT — Corporate Landing Page

A responsive landing page concept for Prodesk IT, built with semantic HTML5, raw CSS (Flexbox and Grid), and vanilla JavaScript.

## Features

- Responsive navigation with a mobile hamburger menu
- Hero section with primary call to action
- Three service cards: Web Development, SEO Optimization, and Digital Marketing
- About section and contact form
- Light/dark theme toggle saved in local storage
- Sticky, frosted-glass navigation
- Button hover states and service-card lift effects
- Client-side form validation with visible error messages
- Contact form prepares an email draft to `info@prodesk.in`
- Reduced-motion support and keyboard focus styles
- No Bootstrap, Tailwind, React, or other UI frameworks used in Phases 1 and 2

## Run locally

1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use Live Server.
3. Check desktop and mobile layouts by resizing the browser.
4. Test the theme toggle, navigation menu, hover effects, and contact form validation.

## Deployment

Deploy this folder as a static site using Netlify or Vercel. After deployment, add the real public URL below and include a screenshot of the deployed page in this README as required by the sprint.

* **Live URL:** https://cheery-kheer-b0cf92.netlify.app/
* **Screenshot:** See [screenshot.png](screenshot.png) for the deployed landing page.

## QA checklist

- [ ] Verify the page at desktop, tablet, and mobile widths
- [ ] Test the mobile menu with mouse and keyboard
- [ ] Test light/dark mode and refresh to verify the preference persists
- [ ] Test empty and invalid contact-form fields
- [ ] Verify the email draft opens and the fallback contact details are visible
- [ ] Run Lighthouse in Chrome DevTools and address any reported issues
- [ ] Deploy to Netlify or Vercel and update the Live URL
- [ ] Capture and add a screenshot of the deployed page
- [ ] Record the required two-minute desktop/mobile/code-structure demo
- [ ] Push the project to a public GitHub repository

## Important notes

The contact form is a front-end demo and does not submit to a backend or send/store form data itself. It opens the visitor's default email application using a `mailto:` link. Replace this with an approved backend or form service only if the assignment requires actual server-side submission.

A Lighthouse score of 100 is a target, not guaranteed by the source code alone. Run the audit on the deployed page and address the specific findings.
