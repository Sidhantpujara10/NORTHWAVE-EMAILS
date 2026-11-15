# Northwave: Email Campaign Kit

Three responsive marketing emails for a fictional Pune music festival, plus a React showcase site to preview and test them.

**Live site:** https://sidhantpujara10.github.io/NORTHWAVE-EMAILS/

**Emails:** MJML compiled to table based HTML · **Showcase site:** React, Tailwind CSS v4, Motion, Lenis

## The emails
| # | Email | Goal | File |
|---|---|---|---|
| 1 | Lineup announcement | Launch: reveal the lineup, push early bird sales | `emails/dist/lineup.html` |
| 2 | Early bird reminder | Offer: urgency before the price goes up | `emails/dist/early-bird.html` |
| 3 | Waitlist welcome | Confirm signup and drive referrals | `emails/dist/welcome.html` |

The ready to send HTML files are in `emails/dist/`. They paste straight into Mailchimp, SendGrid, Salesforce Marketing Cloud or Adobe Campaign.

## What makes them production quality
* **Outlook safe:** MJML outputs nested tables and `<!--[if mso]>` code, so layouts hold in Outlook 2016, 2019 and 365
* **Dark mode:** custom styles for Apple Mail and iOS (`prefers-color-scheme`) and Outlook.com (`[data-ogsc]`)
* **Mobile first:** columns stack under 480px, headlines resize, buttons are thumb sized
* **Works with images off:** text only design, so nothing breaks when images are blocked
* **Under 40 KB each:** well below Gmail's 102 KB clipping limit
* **Compliant:** preheader, unsubscribe link, preferences link and postal address in every email
* **Personalised:** merge fields such as `{{first_name}}`, `{{city}}`, `{{referral_code}}` (rename them to your platform's syntax, e.g. `*|FNAME|*` in Mailchimp)

## Showcase site
* Scroll animations: pinned hero where the three emails fan out, scroll velocity marquee, progress line, parallax code card
* Live preview with Desktop / Mobile, Light / Dark and Sample data / Merge tags toggles
* Inbox view showing the subject line and preheader as a reader sees them
* Automatic pre send checks: file size, preheader, dark mode, Outlook code, unsubscribe link, merge fields
* Copy HTML and download buttons

Theme: white background, electric cobalt `#2340F5`, acid lime `#D4FF3A`, ink `#0A0A14`. Flat colors only, no gradients.

## Project structure
```
emails/
  theme.js          brand colors, dark mode rules, sample data
  partials.js       shared head, top bar and footer
  templates/        one file per email (MJML)
  dist/             compiled, ready to send HTML
scripts/build-emails.mjs   compiles MJML with strict validation
src/                React showcase site
```

## Run it
```bash
npm install
npm run emails         # compile emails only
npm run dev            # compile emails + start the showcase site
npm run build          # production build in dist/
npm run build:single   # whole site in one HTML file (dist-single/)
```

## Deploy
Every push to `main` builds the emails and the site, then publishes to GitHub Pages through `.github/workflows/deploy.yml`.

## Testing checklist before a real send
Send test emails to Gmail (web and app), Outlook desktop, Outlook.com and Apple Mail, and check light and dark mode on each. Tools like Litmus or Email on Acid show all clients at once.

## Author

**Sidhant Pujara**
[LinkedIn](https://linkedin.com/in/sidhant-pujara) · [Portfolio](https://sidhantpujara.vercel.app)

Northwave is a fictional festival made for this portfolio project.
