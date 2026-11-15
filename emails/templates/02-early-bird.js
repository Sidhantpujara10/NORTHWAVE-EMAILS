import { C } from '../theme.js'
import { email } from '../partials.js'

export const meta = {
  id: 'early-bird',
  name: 'Early bird reminder',
  goal: 'Offer email: urgency before the price goes up',
  subject: '48 hours left: save ₹1,000 on Northwave',
  preheader: 'Early bird prices end Friday at midnight, {{first_name}}. After that, passes go up.',
}

const box = (n, label) => `
  <mj-column width="33.33%" padding="0 6px">
    <mj-text align="center" container-background-color="${C.ink}" padding="18px 0 4px" mj-class="display" font-size="42px" color="${C.lime}">${n}</mj-text>
    <mj-text align="center" container-background-color="${C.ink}" padding="0 0 16px" mj-class="eyebrow" font-size="10px" color="${C.white}">${label}</mj-text>
  </mj-column>`

const tier = ({ name, price, was, perks, hot }) => `
  <mj-column width="33.33%" padding="0 6px 12px">
    <mj-text css-class="${hot ? '' : 'dm-card dm-ink'}" container-background-color="${hot ? C.cobalt : '#F3F4F7'}" color="${hot ? C.white : C.ink}" padding="22px 18px 4px" mj-class="eyebrow">${hot ? 'MOST POPULAR' : '&nbsp;'}</mj-text>
    <mj-text css-class="${hot ? '' : 'dm-card dm-ink'}" container-background-color="${hot ? C.cobalt : '#F3F4F7'}" color="${hot ? C.white : C.ink}" padding="4px 18px 0" mj-class="display" font-size="22px" letter-spacing="0px">${name}</mj-text>
    <mj-text css-class="${hot ? '' : 'dm-card dm-ink'}" container-background-color="${hot ? C.cobalt : '#F3F4F7'}" color="${hot ? C.lime : C.cobalt}" padding="10px 18px 0" mj-class="display" font-size="28px" letter-spacing="0px">${price}</mj-text>
    <mj-text css-class="${hot ? '' : 'dm-card dm-soft'}" container-background-color="${hot ? C.cobalt : '#F3F4F7'}" color="${hot ? '#C9D0FF' : C.inkSoft}" padding="2px 18px 0" font-size="13px"><s>${was}</s></mj-text>
    <mj-text css-class="${hot ? '' : 'dm-card dm-ink'}" container-background-color="${hot ? C.cobalt : '#F3F4F7'}" color="${hot ? C.white : C.ink}" padding="12px 18px 22px" font-size="13px" line-height="1.8">${perks.join('<br />')}</mj-text>
  </mj-column>`

export default email({
  title: meta.subject,
  preheader: meta.preheader,
  tag: 'Tickets',
  body: `
<mj-section css-class="dm-light" padding="36px 0 0">
  <mj-column>
    <mj-text mj-class="eyebrow" color="${C.cobalt}" css-class="dm-link">EARLY BIRD ENDS FRIDAY, 11:59 PM</mj-text>
    <mj-text mj-class="display" css-class="dm-ink mob-display" padding="12px 32px 0">Last call for the lowest price, {{first_name}}.</mj-text>
    <mj-text css-class="dm-soft" color="${C.inkSoft}" padding="16px 32px 0">After Friday, every pass goes up by ₹1,000. Lock yours in now and pay the early bird price.</mj-text>
  </mj-column>
</mj-section>

<mj-section css-class="dm-light" padding="28px 26px">
  ${box('02', 'DAYS')}${box('07', 'HOURS')}${box('42', 'MINUTES')}
</mj-section>

<mj-section css-class="dm-light" padding="0 26px 8px">
  ${tier({ name: 'Day pass', price: '₹1,199', was: '₹1,699', perks: ['Any one day', 'General entry', 'Free water refills'] })}
  ${tier({ name: '3 day pass', price: '₹2,499', was: '₹3,499', perks: ['All three days', 'Fast lane entry', 'Free locker'], hot: true })}
  ${tier({ name: 'VIP', price: '₹5,999', was: '₹6,999', perks: ['All three days', 'Front deck view', 'Lounge and bar'] })}
</mj-section>

<mj-section css-class="dm-light" padding="16px 0 36px">
  <mj-column><mj-button href="{{ticket_url}}" align="left">Lock in early bird →</mj-button></mj-column>
</mj-section>

<mj-section background-color="${C.lime}" padding="30px 0">
  <mj-column>
    <mj-text mj-class="eyebrow" color="${C.ink}">GOOD TO KNOW</mj-text>
    <mj-text color="${C.ink}" padding="10px 32px 0" font-size="15px">
      <strong>Can I pay in parts?</strong> Yes. Pay 50% now and the rest by 31 January.<br /><br />
      <strong>Is there parking?</strong> Free shuttle buses run from Pune Station and Hinjewadi every 20 minutes.
    </mj-text>
  </mj-column>
</mj-section>`,
})
