import { renderEmail } from '../lib'

// A scaled down, non interactive render of an email.
export default function EmailThumb({ email, dark = false, className = '' }) {
  return (
    <div className={`relative h-[400px] w-[280px] overflow-hidden rounded-2xl border-2 border-ink bg-white ${className}`}>
      <iframe
        title={`${email.name} thumbnail`}
        srcDoc={renderEmail(email.html, { dark })}
        sandbox="allow-same-origin"
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
        style={{ width: 600, height: 860, transform: 'scale(0.4667)' }}
      />
    </div>
  )
}
