'use client'
import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Project, getCategoryCounts, getProjectCategories, getCoverImage } from '@/lib/projects'

interface Props {
  projects: Project[]
}

type SortOption = 'default' | 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc'
type ViewMode = 'grid' | 'list'

const ITEMS_PER_PAGE = 12

export function ProjectsFilter({ projects }: Props) {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [view, setView] = useState<ViewMode>('grid')
  const [currentPage, setCurrentPage] = useState(1)

  const counts = useMemo(() => getCategoryCounts(), [])
  const categories = useMemo(() => getProjectCategories(), [])

  const filtered = useMemo(() => {
    let list = projects
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q)) ||
          p.market.some((m) => m.toLowerCase().includes(q))
      )
    }

    const sorted = [...list]
    switch (sortBy) {
      case 'year-desc':
        sorted.sort((a, b) => Number(b.year) - Number(a.year))
        break
      case 'year-asc':
        sorted.sort((a, b) => Number(a.year) - Number(b.year))
        break
      case 'name-asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'name-desc':
        sorted.sort((a, b) => b.title.localeCompare(a.title))
        break
    }
    return sorted
  }, [projects, activeCategory, search, sortBy])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeCategory, search, sortBy])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginatedProjects = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Generate visible page numbers with ellipsis
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages: (number | 'ellipsis')[] = [1]
    if (currentPage > 3) pages.push('ellipsis')
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i)
    }
    if (currentPage < totalPages - 2) pages.push('ellipsis')
    pages.push(totalPages)
    return pages
  }

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-8">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by technology, market, or project name..."
          aria-label="Search projects"
          className="w-full bg-white dark:bg-navy-soft border border-navy/8 dark:border-off-white/8 text-navy dark:text-off-white font-mono text-sm px-5 py-3.5 pl-12 pr-36 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 dark:focus:ring-primary/20 transition-all placeholder:text-muted/50 dark:placeholder:text-muted/30"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/50 dark:text-muted/30"
          viewBox="0 0 20 20" fill="none"
          aria-hidden="true"
        >
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M13 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* View toggle + sort inside search bar */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {/* Sort select */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            aria-label="Sort projects"
            className="bg-transparent border-none text-navy dark:text-off-white font-mono text-[10px] tracking-wider uppercase cursor-pointer focus:outline-none pr-1"
          >
            <option value="default">Default</option>
            <option value="year-desc">Newest</option>
            <option value="year-asc">Oldest</option>
            <option value="name-asc">A &rarr; Z</option>
            <option value="name-desc">Z &rarr; A</option>
          </select>

          <div className="w-px h-4 bg-navy/10 dark:bg-off-white/10" />

          {/* View toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setView('grid')}
              aria-label="Grid view"
              className={`p-1.5 transition-colors ${view === 'grid' ? 'text-accent' : 'text-muted/40 hover:text-muted'}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="0" width="7" height="7" rx="1" />
                <rect x="9" y="0" width="7" height="7" rx="1" />
                <rect x="0" y="9" width="7" height="7" rx="1" />
                <rect x="9" y="9" width="7" height="7" rx="1" />
              </svg>
            </button>
            <button
              onClick={() => setView('list')}
              aria-label="List view"
              className={`p-1.5 transition-colors ${view === 'list' ? 'text-accent' : 'text-muted/40 hover:text-muted'}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <rect x="0" y="1" width="16" height="3" rx="1" />
                <rect x="0" y="6.5" width="16" height="3" rx="1" />
                <rect x="0" y="12" width="16" height="3" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Project categories">
        {categories.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat === 'All' ? `All (${counts.All})` : `${cat} (${counts[cat] ?? 0})`}
          </button>
        ))}
      </div>

      {/* Results count + page indicator */}
      <div className="flex items-center justify-between mb-6">
        <p className="font-mono text-xs text-muted tracking-wide">
          {filtered.length === 0
            ? 'No projects found'
            : `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} of ${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`}
        </p>
        {(activeCategory !== 'All' || search || sortBy !== 'default') && (
          <button
            onClick={() => { setActiveCategory('All'); setSearch(''); setSortBy('default') }}
            className="font-mono text-xs text-accent dark:text-accent hover:text-accent-dark dark:hover:text-accent-light transition-colors"
          >
            Clear filters &times;
          </button>
        )}
      </div>

      {/* Project grid / list */}
      {paginatedProjects.length === 0 ? (
        <div className="text-center py-24 border border-navy/5 dark:border-off-white/5 bg-white dark:bg-navy-soft">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted/30 mx-auto mb-4">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <p className="font-display text-2xl text-muted mb-2">No results</p>
          <p className="font-mono text-xs text-muted/60">Try a different category or search term</p>
        </div>
      ) : view === 'grid' ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {paginatedProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-card block group stagger-item"
              style={{ animationDelay: `${Math.min(i, 12) * 50}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-navy/[0.03] dark:bg-off-white/[0.02]">
                <Image
                  src={getCoverImage(project.slug)}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Sector badge */}
                <div className="absolute top-3 left-3 section-label text-[10px] bg-white/80 dark:bg-navy/80 backdrop-blur px-2 py-1">
                  {project.sector}
                </div>
                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className={`status-badge ${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                </div>
                {/* Live indicator */}
                {project.liveUrl && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-off-white/80 dark:bg-navy/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-navy dark:text-off-white tracking-wider">LIVE</span>
                  </div>
                )}
                {/* Featured badge */}
                {project.featured && (
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-primary/90 text-white font-mono text-[9px] font-bold tracking-wider">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-navy dark:text-off-white text-sm leading-snug group-hover:text-accent dark:group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <span className="font-mono text-[10px] text-muted/60 dark:text-muted/40 flex-shrink-0">{project.year}</span>
                </div>

                <p className="text-muted dark:text-muted text-xs leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.stack.slice(0, 4).map((s) => (
                    <span key={s} className="stack-tag text-[10px] py-0.5">{s}</span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="stack-tag text-[10px] py-0.5">+{project.stack.length - 4}</span>
                  )}
                </div>

                <div className="flex items-center justify-between border-t border-navy/5 dark:border-off-white/5 pt-3">
                  <div className="flex gap-2">
                    {project.market.slice(0, 2).map((m) => (
                      <span key={m} className="font-mono text-[9px] text-muted/50 dark:text-muted/30">{m}</span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    View
                    <span className="inline-block transition-transform group-hover:translate-x-0.5">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* List view */
        <div className="space-y-3">
          {paginatedProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="project-card flex items-center gap-5 p-4 group stagger-item"
              style={{ animationDelay: `${Math.min(i, 20) * 30}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-14 flex-shrink-0 overflow-hidden bg-navy/[0.03] dark:bg-off-white/[0.02]">
                <Image
                  src={getCoverImage(project.slug)}
                  alt={project.title}
                  fill
                  sizes="80px"
                  className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display font-bold text-navy dark:text-off-white text-sm leading-snug group-hover:text-accent dark:group-hover:text-accent transition-colors truncate">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="shrink-0 px-1.5 py-0.5 bg-primary/90 text-white font-mono text-[8px] font-bold tracking-wider">
                      FEATURED
                    </span>
                  )}
                  {project.liveUrl && (
                    <span className="shrink-0 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </span>
                  )}
                </div>
                <p className="text-muted dark:text-muted text-xs leading-relaxed line-clamp-1 hidden sm:block">
                  {project.description}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden md:flex items-center gap-4 flex-shrink-0">
                <span className="section-label text-[10px]">{project.sector}</span>
                <div className="flex gap-1.5">
                  {project.stack.slice(0, 2).map((s) => (
                    <span key={s} className="stack-tag text-[9px] py-0.5 px-2">{s}</span>
                  ))}
                </div>
                <span className="font-mono text-[10px] text-muted/60 dark:text-muted/40 w-10 text-right">{project.year}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/30 group-hover:text-accent transition-colors">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* ── Pagination ────────────────────────────────────── */}
      {totalPages > 1 && (
        <nav
          aria-label="Projects pagination"
          className="mt-14 flex items-center justify-between gap-4 border-t border-navy/5 dark:border-off-white/5 pt-8"
        >
          {/* Prev */}
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Prev
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1.5">
            {getPageNumbers().map((page, i) =>
              page === 'ellipsis' ? (
                <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center font-mono text-xs text-muted/40">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  aria-current={currentPage === page ? 'page' : undefined}
                  className={`pagination-btn w-8 h-8 flex items-center justify-center font-mono text-xs transition-all ${
                    currentPage === page
                      ? 'bg-primary text-white border border-primary'
                      : 'border border-navy/8 dark:border-off-white/8 text-muted hover:border-primary/40 hover:text-primary dark:hover:text-primary-light'
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </nav>
      )}

      {/* Page jump (when many pages) */}
      {totalPages > 5 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="font-mono text-[10px] text-muted/50">Jump to</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const v = parseInt(e.target.value)
              if (!isNaN(v) && v >= 1 && v <= totalPages) setCurrentPage(v)
            }}
            className="w-12 bg-transparent border border-navy/8 dark:border-off-white/8 text-center font-mono text-xs text-navy dark:text-off-white py-1 focus:outline-none focus:border-primary transition-colors"
            aria-label="Jump to page"
          />
          <span className="font-mono text-[10px] text-muted/50">of {totalPages}</span>
        </div>
      )}
    </div>
  )
}
