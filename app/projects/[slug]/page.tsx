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
  getGalleryImages,
  getBeforeAfterImages,
} from '@/lib/projects'
import { RevealSection } from '@/components/ui/RevealSection'
import { ImageGallery } from '@/components/ui/ImageGallery'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'

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

  const related = getRelatedProjects(params.slug, 3)
  const coverUrl = getCoverImage(params.slug, 1200, 700)
  const galleryImages = getGalleryImages(params.slug)
  const liveUrl = project.liveUrl ?? null

  // Prev/next navigation
  const allProjects = getAllProjects()
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug)
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null

  return (
    <article className="min-h-screen bg-off-white dark:bg-navy transition-colors duration-300">

      {/* ── Floating project nav bar (desktop) ───────────── */}
      <div className="fixed top-20 left-0 right-0 z-30 hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between bg-white/80 dark:bg-navy-soft/80 backdrop-blur-md border border-navy/5 dark:border-off-white/5 px-4 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/projects" className="flex-shrink-0 font-mono text-[10px] text-muted hover:text-accent transition-colors flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                All Projects
              </Link>
              <span className="text-navy/10 dark:text-off-white/10">|</span>
              <span className="font-mono text-[10px] text-muted/60 truncate">{project.title}</span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {prevProject && (
                <Link href={`/projects/${prevProject.slug}`} className="font-mono text-[10px] text-muted/50 hover:text-accent transition-colors flex items-center gap-1 px-2 py-1 border border-transparent hover:border-navy/5 dark:hover:border-off-white/5" title={prevProject.title}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  Prev
                </Link>
              )}
              <span className="font-mono text-[10px] text-accent">{currentIndex + 1}/{allProjects.length}</span>
              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`} className="font-mono text-[10px] text-muted/50 hover:text-accent transition-colors flex items-center gap-1 px-2 py-1 border border-transparent hover:border-navy/5 dark:hover:border-off-white/5" title={nextProject.title}>
                  Next
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-navy">
          <Image
            src={coverUrl}
            alt={project.title}
            fill
            className="object-cover opacity-30 dark:opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-off-white via-off-white/80 to-transparent dark:from-navy dark:via-navy/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-off-white/30 via-transparent to-off-white/10 dark:from-navy/30 dark:via-transparent dark:to-navy/10" />
          {/* Decorative vertical lines */}
          <div className="absolute top-1/4 right-[15%] w-px h-32 bg-gradient-to-b from-transparent via-accent/20 to-transparent hidden lg:block" />
          <div className="absolute top-1/3 right-[25%] w-px h-20 bg-gradient-to-b from-transparent via-primary/15 to-transparent hidden lg:block" />
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-xs text-muted mb-6">
            <Link href="/projects" className="hover:text-accent transition-colors">Projects</Link>
            <span className="text-muted/40">/</span>
            <span className="text-muted">{project.category}</span>
            <span className="text-muted/40">/</span>
            <span className="text-navy/60 dark:text-off-white/60 font-medium">{project.title}</span>
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className={`status-badge ${project.status.toLowerCase()}`}>
              {project.status}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 bg-primary/90 text-white font-mono text-[10px] font-bold tracking-wider">
                FEATURED
              </span>
            )}
            <span className="font-mono text-xs text-muted">{project.year}</span>
            <span className="font-mono text-xs text-muted/40">&middot;</span>
            <span className="font-mono text-xs text-muted">{project.sector}</span>
          </div>

          {/* Title */}
          <h1
            className="font-display font-extrabold text-navy dark:text-off-white leading-[0.95] mb-5 tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            {project.title}
          </h1>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent/60" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted/70">{project.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary/60" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted/70">{project.category}</span>
            </div>
          </div>

          {/* Markets */}
          <div className="flex flex-wrap gap-2">
            {project.market.map((m) => (
              <span
                key={m}
                className="font-mono text-[10px] tracking-widest uppercase text-muted border border-navy/10 dark:border-off-white/10 px-2.5 py-1"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blue divider ───────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-primary via-primary/30 to-transparent" />

      {/* ── Full Website Showcase ─────────────────────────── */}
      <section className="bg-navy dark:bg-navy transition-colors duration-300">
        <RevealSection>
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent" />
              <p className="section-label">Full Website Showcase</p>
            </div>
            <h2 className="font-display font-extrabold text-off-white text-4xl md:text-5xl tracking-tight mb-4">
              Experience the<br />
              <span className="text-accent">Full Interface</span>
            </h2>
            <p className="font-mono text-xs text-off-white/40 tracking-wide max-w-xl">
              Interactive gallery — hover to preview, click to expand. {project.title} shown in its entirety.
            </p>
          </div>
        </RevealSection>
        <RevealSection>
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <ImageGallery
              images={galleryImages}
              projectTitle={project.title}
              projectUrl={liveUrl ?? undefined}
            />
          </div>
        </RevealSection>
      </section>

      {/* ── Before / After Comparison ─────────────────────── */}
      <section className="bg-off-white dark:bg-navy-soft transition-colors duration-300">
        <RevealSection>
          <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-6 h-px bg-accent" />
              <p className="section-label">Transformation</p>
            </div>
            <h2 className="font-display font-extrabold text-navy dark:text-off-white text-4xl md:text-5xl tracking-tight mb-4">
              See the<br />
              <span className="text-accent">Difference</span>
            </h2>
            <p className="font-mono text-xs text-muted/60 dark:text-muted/40 tracking-wide max-w-xl">
              Drag the slider to compare before and after versions of this project.
            </p>
          </div>
        </RevealSection>
        <RevealSection>
          <div className="max-w-7xl mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-6">
              {getBeforeAfterImages(params.slug).map((pair, i) => (
                <BeforeAfterSlider
                  key={i}
                  beforeSrc={pair.before}
                  afterSrc={pair.after}
                  beforeLabel="Legacy"
                  afterLabel="Redesigned"
                  alt={`${project.title} comparison ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ── Content divider ────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-navy/10 dark:via-off-white/10 to-transparent" />

      {/* ── Main content ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16">

          {/* Left column */}
          <div>
            <RevealSection>
              <section className="mb-16">
                <p className="section-label mb-4">Project Overview</p>
                <p className="text-muted dark:text-muted text-lg leading-relaxed">{project.description}</p>
              </section>
            </RevealSection>

            <RevealSection>
              <section className="mb-16">
                <p className="section-label mb-6">Key Features</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 border border-navy/5 dark:border-off-white/5 bg-white dark:bg-navy-soft hover:border-primary/20 dark:hover:border-primary/30 transition-colors"
                    >
                      <span className="text-accent mt-0.5 flex-shrink-0">&#9670;</span>
                      <p className="text-muted dark:text-muted text-sm leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>
              </section>
            </RevealSection>

            <RevealSection>
              <section className="mb-16 border border-accent/15 bg-accent/[0.03] dark:bg-accent/[0.05] p-8">
                <p className="section-label mb-6">Business Value</p>
                <div className="space-y-4">
                  {project.value.map((v, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <span className="font-mono text-xs text-accent font-bold mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-muted dark:text-muted text-sm leading-relaxed">{v}</p>
                    </div>
                  ))}
                </div>
              </section>
            </RevealSection>

            <RevealSection>
              <section className="mb-16">
                <p className="section-label mb-6">Technical Highlights</p>
                <div className="space-y-3">
                  {project.techHighlights.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 border-b border-navy/5 dark:border-off-white/5 pb-3">
                      <span className="text-accent font-mono text-xs mt-0.5">&rsaquo;</span>
                      <p className="font-mono text-sm text-muted dark:text-muted">{t}</p>
                    </div>
                  ))}
                </div>
              </section>
            </RevealSection>
          </div>

          {/* Right sidebar */}
          <aside className="space-y-8">
            <div className="border border-navy/8 dark:border-off-white/8 bg-white dark:bg-navy-soft p-6 sticky top-24 transition-colors duration-300">
              <p className="section-label mb-5">Project Info</p>
              <dl className="space-y-4">
                {[
                  { label: 'Client', value: project.client },
                  { label: 'Year', value: project.year },
                  { label: 'Category', value: project.category },
                  { label: 'Sector', value: project.sector },
                  { label: 'Type', value: project.type },
                  { label: 'Status', value: project.status },
                ].map(({ label, value }) => (
                  <div key={label} className="border-b border-navy/5 dark:border-off-white/5 pb-4">
                    <dt className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/50 mb-1">{label}</dt>
                    <dd className="font-mono text-sm text-navy dark:text-off-white">{value}</dd>
                  </div>
                ))}
              </dl>

              {/* Markets */}
              <div className="mt-5 mb-6">
                <p className="font-mono text-[10px] tracking-widest uppercase text-muted/60 dark:text-muted/50 mb-2">Markets</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.market.map((m) => (
                    <span key={m} className="stack-tag">{m}</span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2">
                <Link href="/contact" className="btn-accent w-full justify-center text-xs">
                  Discuss a Similar Project &rarr;
                </Link>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-outline w-full justify-center text-xs">
                    View Live Site &#8599;
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="btn-outline w-full justify-center text-xs">
                    View Source &#8599;
                  </a>
                )}
              </div>
            </div>

            {/* Tech stack */}
            <div className="border border-navy/8 dark:border-off-white/8 bg-white dark:bg-navy-soft p-6 transition-colors duration-300">
              <p className="section-label mb-4">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span key={s} className="stack-tag">{s}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Related projects ──────────────────────────────── */}
      {related.length > 0 && (
        <RevealSection>
          <section className="border-t border-navy/5 dark:border-off-white/5 py-16 px-6 bg-off-white dark:bg-navy-soft transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
              <div className="section-label mb-4 flex items-center gap-3">
                <span className="w-6 h-px bg-accent" />
                More in {project.category}
              </div>
              <h2 className="font-display font-bold text-2xl text-navy dark:text-off-white mb-10">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-5">
                {related.map((rp) => (
                  <Link key={rp.id} href={`/projects/${rp.slug}`} className="project-card block group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-navy/[0.03] dark:bg-off-white/[0.02]">
                      <Image
                        src={getCoverImage(rp.slug)}
                        alt={rp.title}
                        fill
                        className="object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-navy dark:text-off-white text-sm group-hover:text-accent dark:group-hover:text-accent transition-colors mb-1">
                        {rp.title}
                      </h3>
                      <p className="font-mono text-[10px] text-muted/60 dark:text-muted/50">{rp.year} &middot; {rp.sector}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </RevealSection>
      )}

      {/* ── Prev / Next project navigation ───────────────── */}
      <div className="border-t border-navy/5 dark:border-off-white/5 bg-off-white dark:bg-navy transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
            {/* Prev */}
            <div>
              {prevProject && (
                <Link href={`/projects/${prevProject.slug}`} className="group flex items-center gap-4 p-4 border border-navy/5 dark:border-off-white/5 hover:border-primary/20 dark:hover:border-primary/30 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted/40 group-hover:text-accent transition-colors flex-shrink-0"><polyline points="15 18 9 12 15 6" /></svg>
                  <div>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-muted/40 mb-0.5">Previous</p>
                    <p className="font-display text-sm text-navy dark:text-off-white group-hover:text-accent transition-colors truncate">{prevProject.title}</p>
                  </div>
                </Link>
              )}
            </div>

            {/* Center: back + CTA */}
            <div className="flex flex-col items-center gap-3">
              <Link href="/projects" className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                All Projects
              </Link>
              <Link href="/contact" className="btn-accent text-xs">
                Start Your Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </Link>
            </div>

            {/* Next */}
            <div>
              {nextProject && (
                <Link href={`/projects/${nextProject.slug}`} className="group flex items-center justify-end gap-4 p-4 border border-navy/5 dark:border-off-white/5 hover:border-primary/20 dark:hover:border-primary/30 transition-colors text-right">
                  <div>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-muted/40 mb-0.5">Next</p>
                    <p className="font-display text-sm text-navy dark:text-off-white group-hover:text-accent transition-colors truncate">{nextProject.title}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted/40 group-hover:text-accent transition-colors flex-shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.description,
            url: `https://optima.dev/projects/${project.slug}`,
            image: getCoverImage(params.slug),
            dateCreated: project.year,
            author: { '@type': 'Person', name: 'Yussef Makhlouf Ali' },
            publisher: { '@type': 'Organization', name: 'OPTIMA Digital Transformations' },
            keywords: [...project.stack, ...project.market].join(', '),
            ...(project.liveUrl ? { url: project.liveUrl } : {}),
          }),
        }}
      />
    </article>
  )
}
