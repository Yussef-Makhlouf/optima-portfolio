import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-navy/5 dark:border-off-white/5 bg-off-white dark:bg-navy mt-24 transition-colors duration-300" dir="ltr">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* Top row: Brand + 3 equal columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Brand column (wider) */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="relative w-6 h-6 transition-transform duration-300 group-hover:rotate-45">
                <Image
                  src="/logos/optima-05-symbol-light.svg"
                  alt="Optima"
                  fill
                  className="object-contain dark:block hidden"
                />
                <Image
                  src="/logos/optima-04-symbol-dark.svg"
                  alt="Optima"
                  fill
                  className="object-contain dark:hidden block"
                />
              </div>
              <span className="font-display font-bold text-sm tracking-widest uppercase text-navy dark:text-off-white">
                OPTIMA
              </span>
            </Link>
            <p className="font-serif text-lg text-navy/70 dark:text-off-white/70 mb-1" dir="rtl">
              &#1606;&#1615;&#1576;&#1606;&#1609; &#1605;&#1593;&#1603;&#1548; &#1604;&#1575; &#1604;&#1603; &#1601;&#1602;&#1591;
            </p>
            <p className="font-mono text-xs text-muted dark:text-muted mb-4">
              Digital Transformations
            </p>
            <div className="space-y-1">
              <p className="font-mono text-xs text-muted/60 dark:text-muted/60">
                Yussef Makhlouf Ali
              </p>
              <p className="font-mono text-[11px] text-muted/50 dark:text-muted/50">
                Full Stack Developer &amp; UX Designer
              </p>
            </div>

            {/* Social icons row */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com/Yussef-Makhlouf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-navy/8 dark:border-off-white/8 text-muted hover:text-accent hover:border-accent/30 transition-all"
                aria-label="GitHub"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a
                href="https://www.linkedin.com/in/yussef-makhlof-ali/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-navy/8 dark:border-off-white/8 text-muted hover:text-accent hover:border-accent/30 transition-all"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <Link
                href="/contact"
                className="w-9 h-9 flex items-center justify-center border border-accent/20 text-accent hover:bg-accent hover:text-navy transition-all"
                aria-label="Email"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/60 mb-5">Navigate</p>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'All Projects', href: '/projects' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-mono text-sm text-muted dark:text-muted hover:text-accent dark:hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/60 mb-5">Services</p>
            <div className="flex flex-col gap-3">
              {[
                'Full-Stack Development',
                'UX & Interface Design',
                'AI Solutions & SaaS',
                'E-Commerce Platforms',
                'Enterprise Portals',
                'Gulf Market Strategy',
              ].map((service) => (
                <Link
                  key={service}
                  href="/projects"
                  className="font-mono text-sm text-muted dark:text-muted hover:text-accent dark:hover:text-accent transition-colors"
                >
                  {service}
                </Link>
              ))}
            </div>
          </div>

          {/* Markets + CTA */}
          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/60 mb-5">Markets</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {['UAE', 'KSA', 'Kuwait', 'Jordan', 'Egypt'].map((m) => (
                <span key={m} className="font-mono text-[10px] text-muted/50 dark:text-muted/40 border border-navy/5 dark:border-off-white/5 px-2 py-1">
                  {m}
                </span>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent text-navy font-mono text-xs font-bold tracking-wider px-5 py-2.5 hover:bg-accent-light transition-colors"
            >
              Start a Project
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="mt-14 h-px w-full bg-gradient-to-r from-accent/40 via-primary/20 to-accent/10" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-muted/50 dark:text-muted/50">
            &copy; {new Date().getFullYear()} OPTIMA Digital Transformations. All rights reserved.
          </p>
          <p className="font-mono text-[11px] text-muted/40 dark:text-muted/40">
            Built with purpose. Gulf-market expertise.
          </p>
        </div>
      </div>
    </footer>
  )
}
