import Link from 'next/link'
import Image from 'next/image'
import { getFeaturedProjects, getPortfolioStats, getCoverImage, getAllProjects } from '@/lib/projects'
import { RevealSection } from '@/components/ui/RevealSection'

export default function HomePage() {
  const featured = getFeaturedProjects()
  const stats = getPortfolioStats()
  const allProjects = getAllProjects()
  const topProjects = allProjects.slice(0, 6)

  return (
    <div className="noise">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-16 overflow-hidden">

        {/* Crosshair grid background */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(43, 95, 165, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43, 95, 165, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(210, 140, 100, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(210, 140, 100, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Radial focus overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg)_70%)]" />

        {/* Blue glow */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[80px] pointer-events-none opacity-[0.08] dark:opacity-[0.12] bg-primary" />

        {/* Gold glow */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none opacity-[0.06] dark:opacity-[0.1] bg-accent" />

        <div className="relative max-w-7xl mx-auto w-full">

          {/* Brand label */}
          <div className="section-label mb-6 animate-fade-in flex items-center gap-3">
            <span className="w-8 h-px bg-accent" />
            Yussef Makhlouf Ali &middot; OPTIMA Digital Transformations
          </div>

          {/* Crosshair logo */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="text-accent dark:text-accent">
              <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" />
              <line x1="32" y1="0" x2="32" y2="18" stroke="currentColor" strokeWidth="1.5" />
              <line x1="32" y1="46" x2="32" y2="64" stroke="currentColor" strokeWidth="1.5" />
              <line x1="0" y1="32" x2="18" y2="32" stroke="currentColor" strokeWidth="1.5" />
              <line x1="46" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="32" cy="32" r="4" fill="currentColor" opacity="0.3" />
            </svg>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[0.95] mb-8 tracking-tight"
            style={{ fontSize: 'clamp(3rem, 9vw, 7.5rem)' }}
          >
            <span className="block text-navy dark:text-off-white">WE BUILD</span>
            <span className="block text-navy/80 dark:text-off-white/80 mt-1">DIGITAL</span>
            <span className="block mt-2 text-gradient">EXCELLENCE</span>
          </h1>

          {/* Gold + Blue underline */}
          <div className="flex gap-1 h-1 w-64 mb-8">
            <div className="h-full w-1/3 bg-accent" />
            <div className="h-full w-1/3 bg-primary" />
            <div className="h-full w-1/3 bg-accent/50" />
          </div>

          {/* Arabic tagline */}
          <div className="arabic-tagline mb-6">
            نُبنى معك، لا لك فقط
          </div>

          {/* Subheading */}
          <p className="text-muted dark:text-muted text-lg max-w-2xl leading-relaxed mb-12">
            Full-stack development &amp; UX design for Gulf-market enterprises.
            {stats.total} production projects across UAE, Kuwait, Saudi Arabia, Jordan &amp; Egypt.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <Link href="/projects" className="btn-primary">
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </Link>
            <Link href="/contact" className="btn-outline">
              Start a Project
            </Link>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-12 left-6 flex items-center gap-3 font-mono text-[10px] text-muted/50 dark:text-muted/50 tracking-widest">
            <span className="w-8 h-px bg-muted/30" />
            SCROLL TO EXPLORE
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────── */}
      <RevealSection>
        <section className="border-y border-navy/5 dark:border-off-white/5 bg-off-white dark:bg-navy-soft py-20 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { n: stats.total, label: 'Projects Delivered' },
                { n: '5+', label: 'Gulf Markets' },
                { n: stats.sectors, label: 'Industry Sectors' },
                { n: '100%', label: 'Client Retention' },
              ].map(({ n, label }) => (
                <div key={label} className="text-center">
                  <div className="stat-num mb-3">{n}</div>
                  <div className="w-6 h-px bg-accent/40 mx-auto mb-3" />
                  <p className="font-mono text-[10px] text-muted dark:text-muted tracking-widest uppercase">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Featured Projects ─────────────────────────────── */}
      <RevealSection>
        <section className="py-28 px-6">
          <div className="max-w-7xl mx-auto">

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <div className="section-label mb-4 flex items-center gap-3">
                  <span className="w-6 h-px bg-accent" />
                  001
                </div>
                <h2 className="font-display font-bold text-4xl md:text-5xl text-navy dark:text-off-white tracking-tight">
                  Featured<br />
                  <span className="text-accent">Projects</span>
                </h2>
              </div>
              <Link href="/projects" className="btn-outline text-xs hidden md:inline-flex">
                All {stats.total} Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>

            {/* Featured hero (first project - large card) */}
            {featured.length > 0 && (
              <div className="mb-8">
                <Link
                  href={`/projects/${featured[0].slug}`}
                  className="project-card block group"
                >
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden bg-off-white dark:bg-navy-mid">
                      <Image
                        src={getCoverImage(featured[0].slug)}
                        alt={featured[0].title}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                      <div className="absolute top-4 left-4 px-2 py-1 bg-primary/90 text-white font-mono text-[10px] font-bold tracking-wider">
                        FEATURED
                      </div>
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="section-label text-[10px] mb-3">{featured[0].sector} &middot; {featured[0].year}</div>
                      <h3 className="font-display font-bold text-navy dark:text-off-white text-2xl md:text-3xl leading-snug mb-4 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                        {featured[0].title}
                      </h3>
                      <p className="text-muted dark:text-muted text-sm leading-relaxed mb-6 line-clamp-3">
                        {featured[0].description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featured[0].stack.slice(0, 5).map((s) => (
                          <span key={s} className="stack-tag">{s}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-accent flex items-center gap-1">
                          View Case Study
                          <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
                        </span>
                        {featured[0].liveUrl && (
                          <span className="font-mono text-[10px] text-muted/50 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                            Live
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Grid of remaining featured */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.slice(1, 7).map((project, i) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="project-card block group"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {/* Cover image */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-off-white dark:bg-navy-mid">
                    <Image
                      src={getCoverImage(project.slug)}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent" />
                    <div className="absolute top-4 left-4 section-label text-[10px] bg-off-white/80 dark:bg-navy/80 backdrop-blur px-2 py-1">
                      {project.sector}
                    </div>
                    {project.liveUrl && (
                      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 bg-off-white/80 dark:bg-navy/80 backdrop-blur">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="font-mono text-[9px] text-muted tracking-wider">LIVE</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-display font-bold text-navy dark:text-off-white text-base leading-snug group-hover:text-accent dark:group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] text-muted/60 dark:text-muted/50 flex-shrink-0 mt-0.5">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-muted dark:text-muted text-sm leading-relaxed line-clamp-2 mb-5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.slice(0, 3).map((s) => (
                        <span key={s} className="stack-tag">{s}</span>
                      ))}
                      {project.stack.length > 3 && (
                        <span className="stack-tag">+{project.stack.length - 3}</span>
                      )}
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="px-6 pb-5 flex items-center justify-between">
                    <div className="flex gap-2">
                      {project.market.slice(0, 2).map((m) => (
                        <span key={m} className="font-mono text-[10px] text-muted/40 dark:text-muted/30">{m}</span>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      View
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link href="/projects" className="btn-outline text-xs">
                View All {stats.total} Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Tech Stack Marquee ───────────────────────────── */}
      <RevealSection>
        <section className="py-16 border-y border-navy/5 dark:border-off-white/5 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-8">
            <div className="section-label flex items-center gap-3">
              <span className="w-6 h-px bg-accent" />
              Technologies We Master
            </div>
          </div>
          <div className="flex gap-6 animate-scroll-x">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-4 shrink-0">
                {[
                  'Next.js 15', 'React 19', 'TypeScript', 'Node.js',
                  'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Firebase',
                  'Framer Motion', 'GSAP', 'Claude AI', 'OpenAI',
                  '.NET', 'Express.js', 'Prisma', 'Redis',
                ].map((tech) => (
                  <span
                    key={`${dup}-${tech}`}
                    className="shrink-0 px-5 py-2.5 border border-navy/8 dark:border-off-white/8 font-mono text-xs text-muted tracking-wide hover:border-accent hover:text-accent transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── Services ──────────────────────────────────────── */}
      <RevealSection>
        <section className="py-28 px-6 bg-off-white dark:bg-navy-soft transition-colors duration-300">
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <div className="section-label mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-accent" />
                002
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-navy dark:text-off-white tracking-tight">
                Core<br />
                <span className="text-accent">Services</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-navy/5 dark:border-off-white/5">
              {[
                { num: '01', title: 'Full-Stack Development', desc: 'Next.js, React, Node.js, .NET \u2014 production-grade from day one. RTL Arabic & bilingual built-in.', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' },
                { num: '02', title: 'UX & Interface Design', desc: 'From Figma systems to pixel-perfect code. Design tokens, component libraries, GSAP animations.', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
                { num: '03', title: 'AI Solutions & SaaS', desc: 'Claude API, Groq, custom LLM integrations. Content tools, automation, and AI-native product features.', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' },
                { num: '04', title: 'E-Commerce Platforms', desc: 'Arabic-first stores with Tabby, Tamara, Stripe. Saudi ZATCA compliance. Gulf-market UX patterns.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z' },
                { num: '05', title: 'Enterprise Portals', desc: 'Multi-tenant SaaS, ERPs, dashboards, secure portals. Built for Gulf enterprise scale and compliance.', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
                { num: '06', title: 'Gulf Market Strategy', desc: 'Deep UAE/KSA/Kuwait market expertise. Bilingual positioning, local payment gateways, cultural UX.', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              ].map(({ num, title, desc, icon }) => (
                <div
                  key={num}
                  className="p-8 bg-off-white dark:bg-navy group hover:bg-primary/[0.02] dark:hover:bg-primary/[0.04] transition-colors relative"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent/60 dark:text-accent/60 mb-4 group-hover:text-accent transition-colors">
                    <path d={icon} />
                  </svg>
                  <div className="font-mono text-[11px] text-accent/70 dark:text-accent/70 mb-5 tracking-wider">{num}</div>
                  <h3 className="font-display font-bold text-navy dark:text-off-white text-lg mb-3 group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted dark:text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── Design philosophy / about strip ────────────────── */}
      <RevealSection>
        <section className="py-28 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="section-label mb-6 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-accent" />
              003
              <span className="w-6 h-px bg-accent" />
            </div>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-navy/80 dark:text-off-white/80 leading-relaxed italic">
              &ldquo;نُبنى معك، لا لك فقط&rdquo;
            </p>
            <p className="font-display text-sm text-muted dark:text-muted tracking-widest uppercase mt-4">
              Built with you &mdash; not just for you
            </p>
          </div>
        </section>
      </RevealSection>

      {/* ── CTA ───────────────────────────────────────────── */}
      <RevealSection>
        <section className="py-28 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-navy/[0.02] dark:bg-off-white/[0.01]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <div className="relative max-w-3xl mx-auto text-center">
            <div className="section-label mb-6 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-accent" />
              Let&apos;s Build
              <span className="w-6 h-px bg-accent" />
            </div>
            <h2 className="font-display font-extrabold text-navy dark:text-off-white mb-8 tracking-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Ready to Transform<br />
              Your Digital Presence?
            </h2>
            <p className="text-muted dark:text-muted text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              From concept to production. Gulf-market expertise. Bilingual by default.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-accent">
                Start a Conversation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
              <a
                href="https://github.com/YussefMakhlouf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                View GitHub Portfolio
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
              </a>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'OPTIMA Digital Transformations',
            description: 'Full-stack development & UX design for Gulf-market enterprises',
            url: 'https://optima.dev',
            founder: {
              '@type': 'Person',
              name: 'Yussef Makhlouf Ali',
              jobTitle: 'Full Stack Developer & UX Designer',
            },
            areaServed: ['UAE', 'Saudi Arabia', 'Kuwait', 'Jordan', 'Egypt'],
            serviceType: ['Web Development', 'UX Design', 'AI Solutions', 'E-Commerce'],
            numberOfEmployees: '1-10',
          }),
        }}
      />
    </div>
  )
}
