// Compiles the MJML templates into client safe HTML.
// Output: emails/dist/<id>.html (ready for Mailchimp, SendGrid, Outlook)
//         src/generated/emails.json (used by the preview site)
import mjml2html from 'mjml'
import { mkdirSync, writeFileSync } from 'node:fs'
import * as lineup from '../emails/templates/01-lineup.js'
import * as earlyBird from '../emails/templates/02-early-bird.js'
import * as welcome from '../emails/templates/03-welcome.js'

mkdirSync('emails/dist', { recursive: true })
mkdirSync('src/generated', { recursive: true })

const out = []
for (const t of [lineup, earlyBird, welcome]) {
  const res = await mjml2html(t.default, { validationLevel: 'strict', minify: false, keepComments: false })
  if (res.errors?.length) {
    console.error(`✖ ${t.meta.id}`, res.errors.map((e) => e.formattedMessage).join('\n'))
    process.exit(1)
  }
  writeFileSync(`emails/dist/${t.meta.id}.html`, res.html)
  const kb = Buffer.byteLength(res.html) / 1024
  // Stored as base64 so the bundled site never contains raw <head>/<body> tags,
  // which some HTML viewers rewrite (that broke the single file preview).
  out.push({ ...t.meta, html64: Buffer.from(res.html, 'utf8').toString('base64'), kb: Math.round(kb * 10) / 10 })
  console.log(`✔ ${t.meta.id}.html  ${kb.toFixed(1)} KB`)
}
writeFileSync('src/generated/emails.json', JSON.stringify(out))
