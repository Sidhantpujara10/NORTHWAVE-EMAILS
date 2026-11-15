import { C, darkCss } from './theme.js'

// Head shared by every email: fonts, defaults, dark mode, preheader.
export const head = ({ title, preheader }) => `
<mj-head>
  <mj-title>${title}</mj-title>
  <mj-preview>${preheader}</mj-preview>
  <mj-font name="Archivo Black" href="https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap" />
  <mj-attributes>
    <mj-all font-family="Helvetica, Arial, sans-serif" />
    <mj-body background-color="${C.white}" width="600px" />
    <mj-section padding="0" />
    <mj-column padding="0" />
    <mj-text font-size="16px" line-height="1.6" color="${C.ink}" padding="0 32px" />
    <mj-button background-color="${C.cobalt}" color="${C.white}" font-size="16px" font-weight="700"
      border-radius="999px" inner-padding="16px 34px" padding="0 32px" />
    <mj-class name="display" font-family="'Archivo Black', 'Arial Black', Arial, sans-serif" font-size="44px" line-height="1.02" letter-spacing="-1px" />
    <mj-class name="eyebrow" font-size="12px" font-weight="700" letter-spacing="3px" />
  </mj-attributes>
  <mj-style>${darkCss()}</mj-style>
  <mj-style inline="inline">a { color:${C.cobalt}; font-weight:700; }</mj-style>
  <mj-style>
    @media only screen and (max-width:480px) {
      .mob-display div { font-size:34px !important; line-height:1.05 !important; }
      .mob-pad div { padding-left:20px !important; padding-right:20px !important; }
    }
  </mj-style>
  <mj-raw><meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"></mj-raw>
</mj-head>`

export const topBar = (tag) => `
<mj-section css-class="dm-light" padding="20px 0 0">
  <mj-column width="60%">
    <mj-text css-class="dm-ink" mj-class="display" font-size="22px" letter-spacing="0px">NORTH<span class="wave" style="color:${C.cobalt}">WAVE</span></mj-text>
  </mj-column>
  <mj-column width="40%">
    <mj-text css-class="dm-soft" align="right" font-size="12px" color="${C.inkSoft}" padding="6px 32px 0">
      ${tag} · <a href="{{view_online_url}}" style="color:${C.inkSoft};font-weight:400;">View online</a>
    </mj-text>
  </mj-column>
</mj-section>
<mj-section css-class="dm-light" padding="16px 0 0"><mj-column><mj-divider css-class="dm-line" border-color="${C.line}" border-width="1px" padding="0 32px" /></mj-column></mj-section>`

export const footer = `
<mj-section background-color="${C.ink}" padding="40px 0 36px">
  <mj-column>
    <mj-text mj-class="display" font-size="28px" color="${C.white}" letter-spacing="0px">NORTH<span style="color:${C.lime}">WAVE</span></mj-text>
    <mj-text color="#B4B4C4" font-size="14px" padding="10px 32px 0">20 to 22 February 2027 · Mahalakshmi Lawns, Pune</mj-text>
    <mj-text color="#B4B4C4" font-size="12px" line-height="1.7" padding="24px 32px 0">
      You're getting this because you signed up at northwave.example.<br />
      <a href="{{preferences_url}}" style="color:${C.lime};">Email preferences</a> &nbsp;·&nbsp;
      <a href="{{unsubscribe_url}}" style="color:${C.lime};">Unsubscribe</a><br />
      Northwave Live Pvt Ltd (fictional), Koregaon Park, Pune 411001
    </mj-text>
  </mj-column>
</mj-section>`

export const email = ({ title, preheader, tag, body }) =>
  `<mjml>${head({ title, preheader })}<mj-body css-class="dm-body">${topBar(tag)}${body}${footer}</mj-body></mjml>`
