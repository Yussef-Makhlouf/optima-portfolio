import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  getProjectBySlug,
  getAllSlugs,
  getAllProjects,
  getRelatedProjects,
  projectMetadata,
  getCoverImage,
  getProjectImage,
} from '@/lib/projects'
import { RevealSection } from '@/components/ui/RevealSection'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { HudPanel } from '@/components/ui/HudPanel'
import { GlitchButton } from '@/components/ui/GlitchButton'
import { DeviceShowcase } from '@/components/ui/DeviceShowcase'
import { ScreenshotViewer } from '@/components/ui/ScreenshotViewer'
import { TechRadar } from '@/components/ui/TechRadar'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = projectMetadata(params.slug)
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      url: `https://optima.dev/projects/${params.slug}`,
      type: 'article',
    },
    alternates: { canonical: `https://optima.dev/projects/${params.slug}` },
  } as Metadata
}

export default function ProjectPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)
  if (!project) notFound()

  const allProjects = getAllProjects()
  const related = getRelatedProjects(params.slug, 3)
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  const screenshots = Array.from({ length: 5 }, (_, i) => ({
    src: getProjectImage(params.slug, i, 1400, 900),
    alt: `${project.title} — screenshot ${i + 1}`,
    label: ['HOME PAGE', 'DASHBOARD', 'FEATURES', 'MOBILE VIEW', 'ABOUT'][i],
  }))

  const coverUrl = getCoverImage(params.slug, 1400, 900)

  return (
    <article className="min-h-screen bg-off-white dark:bg-navy text-navy dark:text-off-white overflow-x-hidden relative transition-colors duration-300">

      {/* ── Cybernetic background grid ─────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 hud-grid opacity-20" />
        <div className="absolute inset-0 hud-grid-dots opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-off-white/80 dark:to-navy/80" />
      </div>

      {/* ── Floating HUD nav bar ────────────────────────── */}
      <div className="fixed top-20 left-0 right-0 z-30 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative flex items-center justify-between bg-white/90 dark:bg-navy/90 backdrop-blur-xl border border-primary/20 dark:border-cyber/20 px-6 py-2.5 shadow-sm dark:shadow-none">
            <span className="absolute top-0 left-0 w-2.5 h-1 border-t border-l border-primary dark:border-cyber" />
            <span className="absolute top-0 right-0 w-2.5 h-1 border-t border-r border-primary dark:border-cyber" />
            <span className="absolute bottom-0 left-0 w-2.5 h-1 border-b border-l border-primary dark:border-cyber" />
            <span className="absolute bottom-0 right-0 w-2.5 h-1 border-b border-r border-primary dark:border-cyber" />

            <div className="flex items-center gap-3 min-w-0">
              <Link href="/projects" className="flex-shrink-0 font-mono text-[10px] text-primary dark:text-cyber hover:text-primary-light dark:hover:text-white flex items-center gap-1.5 uppercase tracking-wider transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                [ALL_PROJECTS]
              </Link>
              <span className="text-primary/20 dark:text-cyber/20">|</span>
              <span className="font-mono text-[10px] text-muted-dark/60 dark:text-muted-light/60 tracking-widest truncate uppercase">
                {project.title}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {prevProject && (
                <Link href={`/projects/${prevProject.slug}`} className="font-mono text-[9px] text-muted-dark/60 dark:text-muted-light/60 hover:text-primary dark:hover:text-cyber flex items-center gap-1 uppercase tracking-wider transition-colors">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  [PREV]
                </Link>
              )}
              <span className="font-mono text-[10px] text-primary dark:text-cyber font-bold tracking-widest">
                {`${String(currentIndex + 1).padStart(2, '0')} / ${String(allProjects.length).padStart(2, '0')}`}
              </span>
              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`} className="font-mono text-[9px] text-muted-dark/60 dark:text-muted-light/60 hover:text-primary dark:hover:text-cyber flex items-center gap-1 uppercase tracking-wider transition-colors">
                  [NEXT]
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          §1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative min-h-[75vh] flex items-end pb-16 px-6 overflow-hidden border-b border-primary/10 dark:border-cyber/10 z-10">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image src={coverUrl} alt={project.title} fill className="object-cover opacity-10 dark:opacity-15 grayscale contrast-125" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-off-white via-off-white/85 dark:from-navy dark:via-navy/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-off-white/60 dark:from-navy/60 via-transparent to-off-white/60 dark:to-navy/60" />
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 dark:via-cyber/50 to-transparent animate-scan pointer-events-none" />
        </div>

        {/* HUD border overlay */}
        <div className="absolute inset-4 border border-primary/5 dark:border-cyber/5 pointer-events-none hidden sm:block">
          <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/25 dark:border-cyber/30" />
          <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/25 dark:border-cyber/30" />
          <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary/25 dark:border-cyber/30" />
          <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/25 dark:border-cyber/30" />
        </div>

        {/* Telemetry labels */}
        <div className="absolute top-28 left-8 font-mono text-[8px] tracking-[0.2em] text-primary/30 dark:text-cyber/40 hidden sm:block">
          LOC // 25.2048° N · 55.2708° E
        </div>
        <div className="absolute top-28 right-8 font-mono text-[8px] tracking-[0.2em] text-primary/30 dark:text-cyber/40 hidden sm:block">
          REF // {`NC-${project.id.padStart(3,'0')}`}
        </div>

        <div className="relative max-w-7xl mx-auto w-full z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-muted-dark/60 dark:text-muted-light/60 mb-6 uppercase tracking-wider">
            <Link href="/projects" className="hover:text-primary dark:hover:text-cyber transition-colors">[PROJECTS]</Link>
            <span className="text-primary/30 dark:text-cyber/30">›</span>
            <span>{project.category}</span>
            <span className="text-primary/30 dark:text-cyber/30">›</span>
            <span className="text-primary dark:text-cyber">{project.title}</span>
          </div>

          {/* Status + badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="inline-flex items-center gap-1.5 font-mono text-[9px] tracking-[0.15em] px-2.5 py-1 border border-primary/30 dark:border-cyber/30 bg-primary/10 dark:bg-cyber/10 text-primary dark:text-cyber uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyber animate-ping" />
              {project.status}
            </span>
            {project.featured && (
              <span className="font-mono text-[9px] tracking-[0.15em] px-2 py-1 border border-accent/40 bg-accent/10 text-accent-dark dark:text-accent uppercase">
                ★ FEATURED
              </span>
            )}
            <span className="font-mono text-[9px] text-muted-dark/50 dark:text-muted-light/50 tracking-widest">{project.year}</span>
          </div>

          {/* Giant title */}
          <h1
            className="font-hud font-black text-navy dark:text-white uppercase leading-[0.9] mb-6 tracking-[0.06em]"
            style={{ fontSize: 'clamp(2.4rem, 7vw, 5.5rem)' }}
          >
            {project.title}
          </h1>

          {/* Telemetry row */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-cyber" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-dark/70 dark:text-muted-light/70 uppercase">{`TYPE // ${project.type}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-muted-dark/70 dark:text-muted-light/70 uppercase">{`CLASS // ${project.category}`}</span>
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                LIVE SITE ↗
              </a>
            )}
          </div>

          {/* Market tags */}
          <div className="flex flex-wrap gap-2">
            {project.market.slice(0, 8).map((m) => (
              <span key={m} className="font-mono text-[9px] tracking-wider text-primary/70 dark:text-cyber/70 border border-primary/15 dark:border-cyber/15 px-2 py-0.5 bg-primary/5 dark:bg-cyber/5 hover:bg-primary/10 dark:hover:bg-cyber/10 hover:border-primary/40 dark:hover:border-cyber/40 hover:text-primary dark:hover:text-cyber transition-all duration-200">
                {`#${m}`}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          §2 — DEVICE SHOWCASE
      ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-white dark:bg-navy-soft border-b border-primary/10 dark:border-cyber/10 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 hud-grid opacity-5 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-primary dark:bg-cyber" />
              <p className="font-mono text-[10px] text-primary dark:text-cyber uppercase tracking-[0.25em]">[DEVICE_PREVIEW]</p>
            </div>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-hud font-bold text-navy dark:text-white text-2xl md:text-3xl uppercase tracking-[0.12em]">
                RESPONSIVE<br />
                <span className="text-primary dark:text-cyber">DESIGN PREVIEW</span>
              </h2>
              <p className="font-mono text-[9px] text-muted-dark/40 dark:text-muted-light/40 tracking-wider hidden md:block">
                SWITCH BETWEEN VIEWPORT TARGETS
              </p>
            </div>
            <DeviceShowcase
              imageSrc={coverUrl}
              projectTitle={project.title}
              liveUrl={project.liveUrl}
            />
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          §3 — SCREENSHOT VIEWER
      ═══════════════════════════════════════════════════ */}
      <section className="relative z-10 bg-off-white dark:bg-navy border-b border-primary/10 dark:border-cyber/10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-[1px] bg-primary dark:bg-cyber" />
              <p className="font-mono text-[10px] text-primary dark:text-cyber uppercase tracking-[0.25em]">[SCREENSHOT_MATRIX]</p>
            </div>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-hud font-bold text-navy dark:text-white text-2xl md:text-3xl uppercase tracking-[0.12em]">
                FULL INTERFACE<br />
                <span className="text-primary dark:text-cyber">SCREENSHOT GALLERY</span>
              </h2>
              <p className="font-mono text-[9px] text-muted-dark/40 dark:text-muted-light/40 tracking-wider hidden md:block">
                {`FRAMES_CAPTURED: ${String(screenshots.length).padStart(2, '0')}`}
              </p>
            </div>
            <ScreenshotViewer
              screenshots={screenshots}
              projectTitle={project.title}
              liveUrl={project.liveUrl}
            />
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          §4 — MAIN CONTENT GRID
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16">

          {/* ── Left column ─────────────────────────────── */}
          <div className="space-y-14">

            {/* Overview */}
            <RevealSection>
              <HudPanel title="PROJECT OVERVIEW" sectionCode="PROJ.01" status="STABLE">
                <p className="text-muted-dark dark:text-muted-light text-base leading-relaxed">
                  {project.description}
                </p>
              </HudPanel>
            </RevealSection>

            {/* Key Features */}
            <RevealSection>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-4 h-[1px] bg-primary dark:bg-cyber" />
                  <h3 className="font-hud text-[10px] uppercase tracking-[0.25em] text-primary dark:text-cyber">[CORE_CAPABILITIES]</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="group relative p-5 border border-primary/10 dark:border-cyber/10 bg-white dark:bg-navy-mid/30 hover:border-primary/35 dark:hover:border-cyber/35 hover:bg-white dark:hover:bg-navy-mid/50 transition-all duration-300 shadow-sm dark:shadow-none"
                    >
                      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/25 dark:border-cyber/25 group-hover:border-primary dark:group-hover:border-cyber transition-colors" />
                      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/25 dark:border-cyber/25 group-hover:border-primary dark:group-hover:border-cyber transition-colors" />
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[9px] text-primary dark:text-cyber font-bold mt-0.5 flex-shrink-0">{`[F.${String(i+1).padStart(2,'0')}]`}</span>
                        <p className="text-muted-dark dark:text-muted-light text-sm leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RevealSection>

            {/* Business value */}
            <RevealSection>
              <HudPanel title="BUSINESS VALUE & IMPACT" sectionCode="VAL.02" status="ACTIVE">
                <div className="space-y-3">
                  {project.value.map((v, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 border-l-2 border-primary/40 dark:border-cyber/40 bg-primary/5 dark:bg-cyber/5 hover:bg-primary/10 dark:hover:bg-cyber/10 hover:border-primary dark:hover:border-cyber transition-all duration-200">
                      <span className="font-mono text-[10px] text-primary dark:text-cyber font-bold mt-0.5 flex-shrink-0">
                        {`> ${String(i+1).padStart(2,'0')}`}
                      </span>
                      <p className="text-muted-dark dark:text-muted-light text-sm leading-relaxed">{v}</p>
                    </div>
                  ))}
                </div>
              </HudPanel>
            </RevealSection>

            {/* Tech highlights terminal */}
            <RevealSection>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-4 h-[1px] bg-primary dark:bg-cyber" />
                  <h3 className="font-hud text-[10px] uppercase tracking-[0.25em] text-primary dark:text-cyber">[TECH_HIGHLIGHTS]</h3>
                </div>
                <div className="bg-white dark:bg-navy-mid/50 border border-primary/10 dark:border-cyber/10 overflow-hidden shadow-sm dark:shadow-none">
                  {/* Terminal title bar */}
                  <div className="bg-gray-50 dark:bg-navy-soft flex items-center gap-2 px-4 py-2 border-b border-primary/10 dark:border-cyber/10">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                      <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                    </div>
                    <span className="font-mono text-[9px] text-primary/50 dark:text-cyber/50 tracking-wider ml-2">
                      optima@project ~ tech-highlights
                    </span>
                  </div>
                  <div className="p-5 space-y-2.5">
                    {project.techHighlights.map((t, i) => (
                      <div key={i} className="flex items-start gap-3 group">
                        <span className="text-primary dark:text-cyber font-mono text-[10px] font-bold mt-0.5 flex-shrink-0">$</span>
                        <p className="font-mono text-xs text-muted-dark dark:text-muted-light group-hover:text-primary dark:group-hover:text-cyber transition-colors duration-200">{t}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-primary/5 dark:border-cyber/5">
                      <span className="text-primary dark:text-cyber font-mono text-[10px] font-bold">$</span>
                      <span className="font-mono text-[10px] text-primary/40 dark:text-cyber/40 animate-pulse">_</span>
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Before / After */}
            <RevealSection>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-4 h-[1px] bg-primary dark:bg-cyber" />
                  <h3 className="font-hud text-[10px] uppercase tracking-[0.25em] text-primary dark:text-cyber">[BEFORE_AFTER_COMPARISON]</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {Array.from({ length: 2 }, (_, i) => {
                    const seed1 = (parseInt(project.id) * 10) + i * 10
                    const seed2 = seed1 + 1
                    return (
                      <div key={i} className="relative border border-primary/10 dark:border-cyber/10 bg-white dark:bg-navy/70 hover:border-primary/30 dark:hover:border-cyber/30 transition-all duration-300 p-1 shadow-sm dark:shadow-none">
                        <span className="absolute top-1.5 left-1.5 font-mono text-[8px] text-primary dark:text-cyber tracking-widest z-10 bg-white/95 dark:bg-navy/90 px-1.5 py-0.5">
                          {`COMPARISON #${String(i+1).padStart(2,'0')}`}
                        </span>
                        <BeforeAfterSlider
                          beforeSrc={`https://picsum.photos/seed/${seed1}/1400/900`}
                          afterSrc={`https://picsum.photos/seed/${seed2}/1400/900`}
                          beforeLabel="LEGACY"
                          afterLabel="REDESIGNED"
                          alt={`${project.title} comparison ${i + 1}`}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </RevealSection>
          </div>

          {/* ── Right sidebar ──────────────────────────────── */}
          <aside className="space-y-6">

            {/* Sticky project info card */}
            <div className="relative border border-primary/20 dark:border-cyber/20 bg-white dark:bg-navy-mid/60 p-6 sticky top-28 hover:border-primary/40 dark:hover:border-cyber/40 transition-all duration-300 shadow-sm dark:shadow-none">
              <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary dark:border-cyber" />
              <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary dark:border-cyber" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary dark:border-cyber" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary dark:border-cyber" />

              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/10 dark:border-cyber/10">
                <span className="w-1.5 h-1.5 bg-primary dark:bg-cyber rounded-full animate-ping" />
                <p className="font-hud text-[10px] uppercase tracking-[0.2em] text-navy dark:text-white">PROJECT_INTEL</p>
              </div>

              <dl className="space-y-4 mb-6">
                {[
                  { label: 'CLIENT', value: project.client },
                  { label: 'YEAR', value: project.year },
                  { label: 'SECTOR', value: project.sector },
                  { label: 'STATUS', value: project.status },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-primary/5 dark:border-cyber/5 pb-3">
                    <dt className="font-mono text-[8px] tracking-[0.2em] text-primary/50 dark:text-cyber/50 mb-1">{label}</dt>
                    <dd className="font-hud text-[11px] text-navy dark:text-white uppercase font-bold tracking-wider truncate">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Markets */}
              <div className="mb-6">
                <p className="font-mono text-[8px] tracking-[0.2em] text-primary/50 dark:text-cyber/50 mb-3">MARKETS</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.market.slice(0, 6).map((m) => (
                    <span key={m} className="font-mono text-[8px] tracking-wide text-muted-dark dark:text-muted-light/80 border border-primary/15 dark:border-cyber/15 px-2 py-0.5 bg-off-white dark:bg-navy/60 uppercase hover:border-primary/40 dark:hover:border-cyber/40 hover:text-primary dark:hover:text-cyber transition-all duration-200">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <Link href="/contact" className="block">
                  <GlitchButton label="DISCUSS PROJECT" className="w-full justify-center" variant="cyber" />
                </Link>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <GlitchButton label="VIEW LIVE SITE ↗" className="w-full justify-center" variant="primary" />
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <GlitchButton label="SOURCE CODE ↗" className="w-full justify-center" variant="outline" />
                  </a>
                )}
              </div>
            </div>

            {/* TechRadar */}
            <TechRadar
              projectTitle={project.title}
              stack={project.stack}
              category={project.category}
              type={project.type}
              year={project.year}
              status={project.status}
            />
          </aside>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          §5 — RELATED PROJECTS
      ═══════════════════════════════════════════════════ */}
      {related.length > 0 && (
        <RevealSection>
          <section className="relative z-10 border-t border-primary/10 dark:border-cyber/10 bg-white dark:bg-navy-soft py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 hud-grid opacity-5 pointer-events-none" />
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-[1px] bg-primary dark:bg-cyber" />
                <p className="font-mono text-[10px] text-primary dark:text-cyber uppercase tracking-[0.25em]">
                  {`MORE // ${project.category}`}
                </p>
              </div>
              <h2 className="font-hud font-bold text-navy dark:text-white text-2xl uppercase tracking-[0.15em] mb-12">
                RELATED SYSTEM NODES
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rp) => (
                  <Link
                    key={rp.id}
                    href={`/projects/${rp.slug}`}
                    className="group relative border border-primary/10 dark:border-cyber/10 bg-off-white dark:bg-navy/80 hover:border-primary/40 dark:hover:border-cyber/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden block shadow-sm dark:shadow-none"
                  >
                    <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30 dark:border-cyber/30 group-hover:border-primary dark:group-hover:border-cyber transition-colors z-10" />
                    <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/30 dark:border-cyber/30 group-hover:border-primary dark:group-hover:border-cyber transition-colors z-10" />
                    <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/30 dark:border-cyber/30 group-hover:border-primary dark:group-hover:border-cyber transition-colors z-10" />
                    <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30 dark:border-cyber/30 group-hover:border-primary dark:group-hover:border-cyber transition-colors z-10" />

                    {/* Browser chrome strip */}
                    <div className="bg-gray-50 dark:bg-navy-mid border-b border-primary/10 dark:border-cyber/10 px-3 py-1.5 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400/40" />
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/40" />
                      </div>
                      <div className="flex-1 bg-white/60 dark:bg-navy/60 border border-primary/10 dark:border-cyber/10 rounded-sm px-2 py-0.5">
                        <span className="font-mono text-[7px] text-primary/40 dark:text-cyber/40 truncate block">
                          {`https://${rp.slug}.vercel.app`}
                        </span>
                      </div>
                    </div>

                    <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-navy-soft">
                      <Image
                        src={getCoverImage(rp.slug)}
                        alt={rp.title}
                        fill
                        className="object-cover opacity-70 dark:opacity-55 group-hover:opacity-90 dark:group-hover:opacity-80 transition-all duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 top-0 h-[1px] bg-primary dark:bg-cyber -translate-y-full group-hover:animate-scan z-10 pointer-events-none" />
                    </div>

                    <div className="p-4 border-t border-primary/5 dark:border-cyber/5">
                      <h3 className="font-hud font-semibold text-navy dark:text-white text-[10px] tracking-wider group-hover:text-primary dark:group-hover:text-cyber transition-colors mb-1.5 uppercase">
                        {rp.title}
                      </h3>
                      <p className="font-mono text-[8px] text-muted-dark/50 dark:text-muted-light/50 tracking-wider uppercase">
                        {`${rp.year} · ${rp.category}`}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* ═══════════════════════════════════════════════════
          §6 — PREV / NEXT NAV
      ═══════════════════════════════════════════════════ */}
      <div className="relative z-10 border-t border-primary/10 dark:border-cyber/10 bg-off-white dark:bg-navy py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            <div>
              {prevProject && (
                <Link
                  href={`/projects/${prevProject.slug}`}
                  className="group flex items-center gap-4 p-4 border border-primary/10 dark:border-cyber/10 bg-white dark:bg-navy-soft/40 hover:border-primary/30 dark:hover:border-cyber/30 hover:bg-white dark:hover:bg-navy-soft/80 transition-all duration-300 shadow-sm dark:shadow-none"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/50 dark:text-cyber/50 group-hover:text-primary dark:group-hover:text-cyber transition-colors flex-shrink-0">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <div className="min-w-0">
                    <p className="font-mono text-[8px] tracking-[0.2em] text-muted-dark/35 dark:text-muted-light/35 mb-1 uppercase">PREVIOUS</p>
                    <p className="font-hud text-[10px] text-navy dark:text-white group-hover:text-primary dark:group-hover:text-cyber transition-colors truncate uppercase tracking-widest">{prevProject.title}</p>
                  </div>
                </Link>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">
              <Link href="/projects" className="font-mono text-[10px] tracking-[0.2em] text-primary dark:text-cyber hover:text-primary-light dark:hover:text-white transition-colors uppercase flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                ALL PROJECTS
              </Link>
            </div>
            <div>
              {nextProject && (
                <Link
                  href={`/projects/${nextProject.slug}`}
                  className="group flex items-center justify-end gap-4 p-4 border border-primary/10 dark:border-cyber/10 bg-white dark:bg-navy-soft/40 hover:border-primary/30 dark:hover:border-cyber/30 hover:bg-white dark:hover:bg-navy-soft/80 transition-all duration-300 text-right shadow-sm dark:shadow-none"
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[8px] tracking-[0.2em] text-muted-dark/35 dark:text-muted-light/35 mb-1 uppercase">NEXT</p>
                    <p className="font-hud text-[10px] text-navy dark:text-white group-hover:text-primary dark:group-hover:text-cyber transition-colors truncate uppercase tracking-widest">{nextProject.title}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary/50 dark:text-cyber/50 group-hover:text-primary dark:group-hover:text-cyber transition-colors flex-shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: `https://optima.dev/projects/${project.slug}`,
            image: coverUrl,
            dateCreated: project.year,
            author: { '@type': 'Person', name: 'Yussef Makhlouf Ali' },
            publisher: { '@type': 'Organization', name: 'OPTIMA Digital Transformations' },
            keywords: [...project.stack, ...project.market].join(', '),
            ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
          }),
        }}
      />
    </article>
  )
}
