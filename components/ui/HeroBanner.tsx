import Link from 'next/link'

const CAPABILITIES = [
  { label: 'Next.js', code: '01' },
  { label: 'TypeScript', code: '02' },
  { label: 'UX Design', code: '03' },
  { label: 'E-Commerce', code: '04' },
  { label: 'AI Solutions', code: '05' },
  { label: 'Arabic RTL', code: '06' },
  { label: 'Enterprise', code: '07' },
  { label: 'SaaS', code: '08' },
]

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden border-y border-navy/5 dark:border-off-white/5 bg-off-white dark:bg-navy transition-colors duration-300">
      {/* Diagonal accent stripe */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] opacity-[0.03] dark:opacity-[0.05]"
          style={{
            background: 'conic-gradient(from 45deg, transparent 0deg, var(--accent) 45deg, transparent 90deg)',
            borderRadius: '50%',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 relative">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left: statement */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <CrosshairMini />
              <span className="section-label">Why Optima</span>
            </div>
            <h2 className="font-display font-bold text-2xl md:text-3xl text-navy dark:text-off-white leading-snug tracking-tight mb-4">
              Gulf-Market Native.<br />
              <span className="text-accent">Production-Grade.</span>
            </h2>
            <p className="text-muted dark:text-muted text-sm leading-relaxed max-w-md">
              We don&apos;t just build websites. We engineer digital products that
              perform in real Gulf-market conditions — bilingual, fast, conversion-optimized.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-accent tracking-wider group"
            >
              See the proof
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Right: capability grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-navy/5 dark:border-off-white/5">
              {CAPABILITIES.map(({ label, code }, i) => (
                <div
                  key={code}
                  className="group relative p-5 bg-off-white dark:bg-navy hover:bg-primary/[0.03] dark:hover:bg-primary/[0.05] transition-colors border-navy/5 dark:border-off-white/5 border"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  {/* Corner crosshair on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CrosshairMini size={10} />
                  </div>
                  <span className="font-mono text-[9px] text-accent/50 dark:text-accent/50 tracking-wider block mb-2">
                    {code}
                  </span>
                  <span className="font-display text-sm font-semibold text-navy dark:text-off-white group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CrosshairMini({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14" fill="none"
      className="text-accent crosshair-spin flex-shrink-0"
    >
      <circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="0" x2="7" y2="3" stroke="currentColor" strokeWidth="1" />
      <line x1="7" y1="11" x2="7" y2="14" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7" x2="3" y2="7" stroke="currentColor" strokeWidth="1" />
      <line x1="11" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
