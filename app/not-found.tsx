import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-off-white dark:bg-navy transition-colors duration-300">
      {/* Crosshair logo */}
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="mb-8 text-accent opacity-60">
        <circle cx="30" cy="30" r="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="30" y1="0" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" />
        <line x1="30" y1="44" x2="30" y2="60" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="30" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="44" y1="30" x2="60" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="30" cy="30" r="4" fill="currentColor" opacity="0.3" />
      </svg>

      <p className="section-label mb-4 flex items-center justify-center gap-3">
        <span className="w-6 h-px bg-accent" />
        404 Error
        <span className="w-6 h-px bg-accent" />
      </p>
      <h1
        className="font-display font-extrabold text-navy dark:text-off-white leading-none mb-5 tracking-tight"
        style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
      >
        Page Not Found
      </h1>
      <div className="flex gap-1 h-1 w-32 mb-8 mx-auto">
        <div className="h-full w-1/3 bg-accent" />
        <div className="h-full w-1/3 bg-primary" />
        <div className="h-full w-1/3 bg-accent/50" />
      </div>
      <p className="text-muted dark:text-muted text-lg mb-10 max-w-md">
        This page doesn&apos;t exist. Let&apos;s get you back to the portfolio.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/" className="btn-accent">← Back to Home</Link>
        <Link href="/projects" className="btn-outline">View Projects</Link>
      </div>
    </div>
  )
}
