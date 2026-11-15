export default function Logo({ dark = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#2340F5" />
        <path d="M5 19c4-6 7-6 11 0s7 6 11 0" stroke="#D4FF3A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>
      <span className={`font-display text-xl tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
        NORTH<span className={dark ? 'text-lime' : 'text-cobalt'}>WAVE</span>
      </span>
    </span>
  )
}
