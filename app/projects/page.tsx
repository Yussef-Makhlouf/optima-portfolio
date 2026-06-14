import type { Metadata } from 'next'
import { getAllProjects, getPortfolioStats } from '@/lib/projects'
import { ProjectsFilter } from '@/components/projects/ProjectsFilter'
import { ProjectShowcase } from '@/components/projects/ProjectShowcase'

export const metadata: Metadata = {
  title: 'All Projects',
  description:
    '54 production-grade projects across enterprise, e-commerce, real estate, healthcare, EdTech and more — Gulf market expertise from OPTIMA Digital Transformations.',
  openGraph: {
    title: 'All Projects | OPTIMA Digital Transformations',
    description: '54 production projects across 5+ Gulf markets. Full-stack development, UX design, AI solutions.',
  },
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const stats = getPortfolioStats()

  return (
    <div className="pt-28 pb-24 px-6 min-h-screen bg-off-white dark:bg-navy transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div className="section-label mb-4 flex items-center gap-3">
            <span className="w-6 h-px bg-accent" />
            Complete Portfolio
          </div>
          <h1
            className="font-display font-extrabold text-navy dark:text-off-white leading-none mb-5 tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            All Projects
          </h1>
          <div className="flex gap-1 h-1 w-32 mb-6">
            <div className="h-full w-1/3 bg-accent" />
            <div className="h-full w-1/3 bg-primary" />
            <div className="h-full w-1/3 bg-accent/50" />
          </div>
          <p className="text-muted dark:text-muted text-lg max-w-2xl leading-relaxed">
            {stats.total} production-grade projects across {stats.sectors} industry sectors &mdash;
            enterprise platforms, e-commerce stores, healthcare systems, real estate tools,
            and AI solutions for Gulf-market clients.
          </p>
        </div>

        {/* Featured Showcase (cinematic stage) */}
        <ProjectShowcase projects={projects} />

        {/* Filter + Grid */}
        <ProjectsFilter projects={projects} />
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Projects | OPTIMA Digital Transformations',
            description: `${stats.total} production-grade projects across Gulf markets`,
            url: 'https://optima.dev/projects',
            numberOfItems: stats.total,
            isPartOf: { '@type': 'WebSite', url: 'https://optima.dev' },
          }),
        }}
      />
    </div>
  )
}
