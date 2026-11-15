import { useEffect } from 'react'
import Lenis from 'lenis'
import { DARK_RULES, SAMPLE } from '../emails/theme.js'
import RAW from './generated/emails.json'

const decode = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)))
export const EMAILS = RAW.map(({ html64, ...e }) => ({ ...e, html: decode(html64) }))
export { SAMPLE }

let lenis = null
export const getLenis = () => lenis
export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ duration: 1.15 })
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenis = null }
  }, [])
}
export const scrollToId = (id) => {
  const el = document.getElementById(id)
  lenis ? lenis.scrollTo(el, { offset: -70 }) : el?.scrollIntoView({ behavior: 'smooth' })
}

// Swap {{merge_fields}} for sample data, and optionally force dark mode for the preview.
export function renderEmail(html, { sample = true, dark = false } = {}) {
  let out = sample ? html.replace(/\{\{(\w+)\}\}/g, (m, k) => SAMPLE[k] ?? m) : html
  out = out.replace(/<\/head>/i, (m) => `<style>body{margin:0}</style>${dark ? `<style>${DARK_RULES}</style>` : ''}${m}`)
  return out
}

export const fill = (text) => text.replace(/\{\{(\w+)\}\}/g, (m, k) => SAMPLE[k] ?? m)

// Quality checks a real email team runs before sending.
export function audit(e) {
  const tags = [...new Set([...e.html.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]))]
  const imgs = (e.html.match(/<img\b[^>]*>/g) || [])
  return [
    { label: 'Under Gmail 102 KB clip limit', ok: e.kb < 102, detail: `${e.kb} KB` },
    { label: 'Preheader text set', ok: !!e.preheader, detail: `${e.preheader.length} chars` },
    { label: 'Dark mode styles', ok: /prefers-color-scheme/.test(e.html) && /data-ogsc/.test(e.html), detail: 'Apple Mail, Outlook.com' },
    { label: 'Outlook safe table layout', ok: /<!--\[if mso/.test(e.html), detail: `${(e.html.match(/<table/g) || []).length} tables` },
    { label: 'Readable with images off', ok: imgs.every((i) => /alt=/.test(i)), detail: imgs.length ? `${imgs.length} images, all with alt` : 'Text only design' },
    { label: 'Unsubscribe link', ok: /unsubscribe_url/.test(e.html), detail: 'Required by law' },
  ].concat([{ label: 'Merge fields', ok: true, detail: tags.length + ' used', tags }])
}
