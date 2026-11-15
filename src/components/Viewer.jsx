import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Reveal from './Reveal'
import { EMAILS, renderEmail, audit, fill } from '../lib'

function Segmented({ label, value, options, onChange }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-full bg-mist p-1">
      {options.map(([v, text]) => (
        <button key={v} role="radio" aria-checked={value === v} onClick={() => onChange(v)} className="relative rounded-full px-4 py-2 text-sm font-bold">
          {value === v && <motion.span layoutId={`seg-${label}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }} />}
          <span className={`relative ${value === v ? 'text-white' : 'text-ink-soft'}`}>{text}</span>
        </button>
      ))}
    </div>
  )
}

export default function Viewer() {
  const [idx, setIdx] = useState(0)
  const [device, setDevice] = useState('desktop')
  const [theme, setTheme] = useState('light')
  const [data, setData] = useState('sample')
  const [height, setHeight] = useState(900)
  const [toast, setToast] = useState('')
  const frame = useRef(null)
  const email = EMAILS[idx]
  const sample = data === 'sample'
  const srcDoc = renderEmail(email.html, { sample, dark: theme === 'dark' })
  const checks = audit(email)

  // Grow the iframe to fit the email so the page scrolls, not the frame.
  const fit = () => {
    try { setHeight(frame.current.contentDocument.documentElement.scrollHeight) } catch { setHeight(1200) }
  }
  useEffect(() => { const t = setTimeout(fit, 450); return () => clearTimeout(t) }, [srcDoc, device])

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 1800) }
  const copy = async () => {
    try { await navigator.clipboard.writeText(email.html); flash('HTML copied') }
    catch {
      const ta = document.createElement('textarea'); ta.value = email.html; document.body.appendChild(ta); ta.select()
      try { document.execCommand('copy'); flash('HTML copied') } catch { flash('Copy blocked here') }
      ta.remove()
    }
  }
  const download = () => {
    try {
      const a = document.createElement('a')
      a.href = URL.createObjectURL(new Blob([email.html], { type: 'text/html' }))
      a.download = `northwave-${email.id}.html`; a.click()
      setTimeout(() => URL.revokeObjectURL(a.href), 1000); flash('Download started')
    } catch { flash('Download blocked here') }
  }

  const darkUi = theme === 'dark'
  return (
    <section id="preview" className="scroll-mt-16 overflow-x-clip bg-mist px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-cobalt">Live preview</p>
          <h2 className="mt-3 max-w-3xl font-display text-5xl leading-none tracking-tight md:text-7xl">See every email in every mode.</h2>
        </Reveal>

        {/* email tabs */}
        <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
          {EMAILS.map((e, i) => (
            <button key={e.id} onClick={() => setIdx(i)} aria-pressed={i === idx} className="relative rounded-2xl border-2 border-ink px-5 py-3 text-left">
              {i === idx && <motion.span layoutId="email-tab" className="absolute inset-0 rounded-[14px] bg-cobalt" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />}
              <span className={`relative block text-xs font-bold uppercase tracking-widest ${i === idx ? 'text-lime' : 'text-cobalt'}`}>0{i + 1}</span>
              <span className={`relative block font-bold ${i === idx ? 'text-white' : 'text-ink'}`}>{e.name}</span>
            </button>
          ))}
        </Reveal>

        {/* toolbar */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Segmented label="Device" value={device} onChange={setDevice} options={[['desktop', 'Desktop'], ['mobile', 'Mobile']]} />
          <Segmented label="Theme" value={theme} onChange={setTheme} options={[['light', 'Light'], ['dark', 'Dark']]} />
          <Segmented label="Data" value={data} onChange={setData} options={[['sample', 'Sample data'], ['tags', 'Merge tags']]} />
          <div className="flex gap-2 md:ml-auto">
            <button onClick={copy} className="rounded-full border-2 border-ink px-4 py-2 text-sm font-bold hover:bg-ink hover:text-white">Copy HTML</button>
            <button onClick={download} className="rounded-full bg-cobalt px-4 py-2 text-sm font-bold text-white hover:bg-ink">Download .html</button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="flex min-w-0 flex-col items-center">
            {/* inbox row: how subject and preheader look before opening */}
            <motion.div layout className={`w-full rounded-2xl border-2 p-4 ${darkUi ? 'border-ink bg-ink text-white' : 'border-ink/10 bg-white'}`} style={{ maxWidth: device === 'mobile' ? 390 : 680 }}>
              <p className="text-xs font-bold uppercase tracking-widest text-cobalt">Inbox view</p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="shrink-0 font-bold">Northwave</span>
                <span className="min-w-0 truncate"><strong>{sample ? fill(email.subject) : email.subject}</strong> <span className={darkUi ? 'text-white/60' : 'text-ink-soft'}>· {sample ? fill(email.preheader) : email.preheader}</span></span>
              </div>
            </motion.div>

            <motion.div
              layout
              transition={{ type: 'spring', bounce: 0.15, duration: 0.6 }}
              className={`mt-4 w-full overflow-hidden border-ink bg-white ${device === 'mobile' ? 'rounded-[2.5rem] border-[10px]' : 'rounded-2xl border-2'}`}
              style={{ maxWidth: device === 'mobile' ? 395 : 680 }}
            >
              <AnimatePresence mode="wait">
                <motion.iframe
                  key={email.id + theme + data}
                  ref={frame}
                  title={`${email.name} preview`}
                  srcDoc={srcDoc}
                  sandbox="allow-same-origin"
                  onLoad={fit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="block w-full border-0"
                  style={{ height }}
                />
              </AnimatePresence>
            </motion.div>
          </div>

          {/* QA panel */}
          <aside className="rounded-3xl bg-white p-6 lg:sticky lg:top-24">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-cobalt">Pre send checks</p>
            <p className="mt-1 text-sm text-ink-soft">{email.goal}</p>
            <ul className="mt-5 space-y-3">
              {checks.map((c, i) => (
                <motion.li key={email.id + c.label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className="flex gap-3">
                  <span className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full ${c.ok ? 'bg-lime' : 'bg-ink'}`}>
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5"><path d={c.ok ? 'm5 10 3 3 7-7' : 'M6 6l8 8M14 6l-8 8'} stroke={c.ok ? '#0A0A14' : '#fff'} strokeWidth="3" fill="none" strokeLinecap="round" /></svg>
                  </span>
                  <div>
                    <p className="font-semibold leading-tight">{c.label}</p>
                    <p className="text-sm text-ink-soft">{c.detail}</p>
                    {c.tags && <p className="mt-2 flex flex-wrap gap-1.5">{c.tags.map((t) => <code key={t} className="rounded-md bg-cobalt-soft px-2 py-0.5 text-xs font-semibold text-cobalt-deep">{`{{${t}}}`}</code>)}</p>}
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="flex justify-between text-sm font-semibold"><span>File size</span><span>{email.kb} / 102 KB</span></div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-mist">
                <motion.div key={email.id} initial={{ width: 0 }} animate={{ width: `${(email.kb / 102) * 100}%` }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="h-full rounded-full bg-cobalt" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.p role="status" initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-ink px-5 py-3 font-bold text-lime">
            {toast}
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
