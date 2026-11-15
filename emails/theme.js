// Shared brand tokens for the emails and the preview site.
export const C = {
  white: '#FFFFFF',
  cobalt: '#2340F5',     // main brand color: buttons, links, feature blocks
  lime: '#D4FF3A',       // third color: highlight blocks with dark text
  ink: '#0A0A14',        // body text
  inkSoft: '#4A4A5C',
  line: '#E6E7EE',
  darkBg: '#0A0A14',
  darkText: '#F2F2F5',
}

// Dark mode overrides. Wrapped in a media query (Apple Mail, iOS, Outlook app)
// and [data-ogsc] selectors (Outlook.com) at build time.
// The preview site injects the same rules to simulate dark mode.
export const DARK_RULES = `
.dm-body, .dm-body > div { background:${C.darkBg} !important; background-color:${C.darkBg} !important; }
.dm-light, .dm-light > table, .dm-light > table > tbody > tr > td { background:${C.darkBg} !important; background-color:${C.darkBg} !important; }
.dm-ink div, .dm-ink span { color:${C.darkText} !important; }
.dm-ink span.wave { color:#8C9BFF !important; }
.dm-ink span.code { border-color:#F2F2F5 !important; }
.dm-soft div { color:#B4B4C4 !important; }
.dm-line p { border-color:#2A2A3A !important; }
td.dm-card { background:#16162A !important; background-color:#16162A !important; }
.dm-link a, .dm-link div { color:#8C9BFF !important; }
`

export const darkCss = () =>
  `@media (prefers-color-scheme: dark) {${DARK_RULES}}\n` +
  DARK_RULES.trim().split('\n').map((rule) => {
    const [sel, body] = rule.split('{')
    return sel.split(',').map((s) => `[data-ogsc] ${s.trim()}`).join(', ') + ' {' + body
  }).join('\n')

// Sample values used in the preview when "sample data" is on.
export const SAMPLE = {
  first_name: 'Aarav',
  city: 'Pune',
  ticket_url: '#tickets',
  lineup_url: '#lineup',
  share_url: '#share',
  referral_code: 'AARAV-NW27',
  waitlist_position: '1,284',
  unsubscribe_url: '#unsubscribe',
  preferences_url: '#preferences',
  view_online_url: '#online',
}
