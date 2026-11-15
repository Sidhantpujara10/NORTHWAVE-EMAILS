import Logo from './Logo'
export default function Footer() {
  return (
    <footer className="bg-ink px-5 py-14 text-white md:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-6">
        <div>
          <Logo dark />
          <p className="mt-3 max-w-sm text-white/70">Email campaign kit for a fictional music festival. Built with MJML, React and Tailwind CSS.</p>
        </div>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} Demo project by Sidhant Pujara</p>
      </div>
    </footer>
  )
}
