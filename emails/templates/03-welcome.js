import { C } from '../theme.js'
import { email } from '../partials.js'

export const meta = {
  id: 'welcome',
  name: 'Waitlist welcome',
  goal: 'Welcome email: confirm signup and drive referrals',
  subject: "You're on the list, {{first_name}} 🎧",
  preheader: "You're #{{waitlist_position}} on the Northwave waitlist. Share your link to move up.",
}

const step = (n, title, text) => `
<mj-section css-class="dm-light" padding="0 0 22px">
 <mj-group>
  <mj-column width="20%">
    <mj-text mj-class="display" font-size="40px" color="${C.cobalt}" css-class="dm-link" padding="0 0 0 32px">${n}</mj-text>
  </mj-column>
  <mj-column width="80%">
    <mj-text css-class="dm-ink" font-size="17px" padding="4px 32px 0 0"><strong>${title}</strong></mj-text>
    <mj-text css-class="dm-soft" color="${C.inkSoft}" font-size="15px" padding="4px 32px 0 0">${text}</mj-text>
  </mj-column>
 </mj-group>
</mj-section>`

export default email({
  title: meta.subject,
  preheader: meta.preheader,
  tag: 'Welcome',
  body: `
<mj-section css-class="dm-light" padding="36px 0 0">
  <mj-column>
    <mj-text mj-class="eyebrow" color="${C.cobalt}" css-class="dm-link">WAITLIST CONFIRMED</mj-text>
    <mj-text mj-class="display" css-class="dm-ink mob-display" padding="12px 32px 0">You're in, {{first_name}}.</mj-text>
    <mj-text css-class="dm-soft" color="${C.inkSoft}" padding="16px 32px 0">Thanks for joining the Northwave waitlist from {{city}}. Waitlist members get tickets before anyone else.</mj-text>
  </mj-column>
</mj-section>

<mj-section css-class="dm-light" padding="28px 32px">
  <mj-column background-color="${C.cobalt}" border-radius="20px" padding="26px 0">
    <mj-text mj-class="eyebrow" color="${C.lime}" padding="0 26px">YOUR SPOT</mj-text>
    <mj-text mj-class="display" font-size="64px" color="${C.white}" padding="6px 26px 0" letter-spacing="-2px">#{{waitlist_position}}</mj-text>
    <mj-text color="#C9D0FF" font-size="14px" padding="4px 26px 0">Every friend who joins with your link moves you up 50 places.</mj-text>
  </mj-column>
</mj-section>

<mj-section css-class="dm-light" padding="0 0 30px">
  <mj-column>
    <mj-text mj-class="eyebrow" css-class="dm-ink">YOUR REFERRAL CODE</mj-text>
    <mj-text css-class="dm-ink" padding="10px 32px 0"><span class="code" style="display:inline-block;border:2px dashed ${C.ink};border-radius:10px;padding:12px 18px;font-family:'Courier New',monospace;font-size:20px;font-weight:700;letter-spacing:2px;">{{referral_code}}</span></mj-text>
    <mj-button href="{{share_url}}" align="left" padding="20px 32px 0">Share my link →</mj-button>
  </mj-column>
</mj-section>

<mj-section css-class="dm-light" padding="0 0 10px"><mj-column><mj-text mj-class="eyebrow" css-class="dm-ink">WHAT HAPPENS NEXT</mj-text></mj-column></mj-section>
${step('1', 'Lineup drops', 'You get the full lineup by email 24 hours before it goes public.')}
${step('2', 'Your private ticket window', 'Waitlist members get a 48 hour window at early bird prices.')}
${step('3', 'See you in February', 'Three days of music at Mahalakshmi Lawns, Pune.')}

<mj-section background-color="${C.lime}" padding="28px 0">
  <mj-column>
    <mj-text color="${C.ink}" font-size="15px"><strong>Add us to your contacts</strong> so the ticket email lands in your inbox, not in spam.</mj-text>
  </mj-column>
</mj-section>`,
})
