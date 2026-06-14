import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-off-white dark:bg-navy transition-colors duration-300">
      {/* Crosshair */}
      <svg width="48" height="48" viewBox="0 0 64 64" fill="none" className="mb-8 text-accent/40">
        <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="0" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
        <line x1="32" y1="46" x2="32" y2="64" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
        <line x1="46" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <p className="section-label mb-4 flex items-center justify-center gap-3">
        <span className="w-6 h-px bg-accent" />
        404
        <span className="w-6 h-px bg-accent" />
      </p>
      <h1
        className="font-display font-extrabold text-navy dark:text-off-white leading-none mb-5 tracking-tight"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
      >
        Project Not Found
      </h1>
      <div className="flex gap-1 h-1 w-32 mb-8 mx-auto">
        <div className="h-full w-1/3 bg-accent" />
        <div className="h-full w-1/3 bg-primary" />
        <div className="h-full w-1/3 bg-accent/50" />
      </div>
      <p className="text-muted dark:text-muted text-lg mb-10 max-w-md">
        This project doesn&apos;t exist or may have been moved. Browse all projects below.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/projects" className="btn-accent">
          View All Projects
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </Link>
        <Link href="/" className="btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
