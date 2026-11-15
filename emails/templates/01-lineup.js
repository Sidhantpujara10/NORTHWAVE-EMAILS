import { C } from '../theme.js'
import { email } from '../partials.js'

export const meta = {
  id: 'lineup',
  name: 'Lineup announcement',
  goal: 'Launch email: reveal the lineup and push early bird sales',
  subject: '{{first_name}}, the Northwave 2027 lineup is here',
  preheader: '24 artists, 3 days, 1 field in Pune. Early bird tickets end Friday.',
}

const days = [
  ['FRI 20', ['Saffron Static', 'Kiara Vale', 'Night Chai', 'Echo Bazaar']],
  ['SAT 21', ['The Monsoon Club', 'Velvet Rickshaw', 'Paper Moons', 'DJ Rhea K']],
  ['SUN 22', ['Neon Ghats', 'Hollow Tide', 'Mira & The Wires', 'Sundown Set']],
]

export default email({
  title: meta.subject,
  preheader: meta.preheader,
  tag: 'Lineup',
  body: `
<mj-section css-class="dm-light" padding="36px 0 0">
  <mj-column>
    <mj-text mj-class="eyebrow" color="${C.cobalt}" css-class="dm-link">NORTHWAVE 2027 · PUNE</mj-text>
    <mj-text mj-class="display" css-class="dm-ink mob-display" padding="12px 32px 0">The lineup is here, {{first_name}}.</mj-text>
    <mj-text css-class="dm-soft" color="${C.inkSoft}" padding="16px 32px 0">Three days. Twenty four artists. One open field under the February sky. Here's who's playing.</mj-text>
  </mj-column>
</mj-section>

<mj-section background-color="${C.lime}" padding="36px 0 30px" css-class="">
  <mj-column>
    <mj-text mj-class="eyebrow" color="${C.ink}">HEADLINERS</mj-text>
    <mj-text mj-class="display" color="${C.ink}" font-size="40px" padding="14px 32px 0" css-class="mob-display">SAFFRON STATIC<br />THE MONSOON CLUB<br />NEON GHATS</mj-text>
  </mj-column>
</mj-section>

<mj-section css-class="dm-light" padding="28px 16px 8px">
  ${days.map(([d, acts]) => `
  <mj-column width="33.33%" padding="0 0 20px">
    <mj-text mj-class="eyebrow" color="${C.cobalt}" padding="0 16px" css-class="dm-link">${d}</mj-text>
    <mj-text css-class="dm-ink" font-size="15px" line-height="1.9" padding="8px 16px 0"><strong>${acts[0]}</strong><br />${acts.slice(1).join('<br />')}</mj-text>
  </mj-column>`).join('')}
</mj-section>

<mj-section css-class="dm-light" padding="0 0 36px">
  <mj-column><mj-button href="{{lineup_url}}" background-color="${C.ink}" align="left">See the full lineup →</mj-button></mj-column>
</mj-section>

<mj-section background-color="${C.cobalt}" padding="36px 0">
  <mj-column width="62%">
    <mj-text mj-class="eyebrow" color="${C.lime}">EARLY BIRD · ENDS FRIDAY</mj-text>
    <mj-text mj-class="display" color="${C.white}" font-size="34px" padding="10px 32px 0">3 day pass<br />₹2,499 <span style="font-family:Arial,sans-serif;font-size:16px;font-weight:400;text-decoration:line-through;color:#C9D0FF;">₹3,499</span></mj-text>
  </mj-column>
  <mj-column width="38%" vertical-align="bottom">
    <mj-button href="{{ticket_url}}" background-color="${C.lime}" color="${C.ink}" padding="20px 32px 0" align="left">Get tickets</mj-button>
  </mj-column>
</mj-section>`,
})
