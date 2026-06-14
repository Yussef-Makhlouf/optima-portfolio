'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Project, getCoverImage } from '@/lib/projects'

interface Props {
  projects: Project[]
}

export function ProjectShowcase({ projects }: Props) {
  const featured = projects.filter((p) => p.featured).slice(0, 8)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const active = featured[activeIndex] ?? featured[0]

  // Auto-rotate
  useEffect(() => {
    if (!isAutoPlaying) return
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isAutoPlaying, featured.length])

  // Scroll active thumb into view
  useEffect(() => {
    if (!stripRef.current) return
    const el = stripRef.current.children[activeIndex] as HTMLElement
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [activeIndex])

  const handleSelect = (i: number) => {
    setActiveIndex(i)
    setIsAutoPlaying(false)
    // Resume auto after 10s of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  if (!active) return null

  return (
    <div className="mb-16">
      {/* ── Main showcase stage ─────────────────────────────── */}
      <div className="relative overflow-hidden bg-navy dark:bg-navy-soft border border-navy/5 dark:border-off-white/5 group">
        {/* Background image with parallax-like depth */}
        <div className="absolute inset-0">
          <Image
            key={active.slug}
            src={getCoverImage(active.slug, 1400, 800)}
            alt={active.title}
            fill
            className="object-cover opacity-20 dark:opacity-15 scale-105 transition-transform duration-[8s] ease-out group-hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/70 dark:from-navy-soft dark:via-navy-soft/95 dark:to-navy-soft/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative grid lg:grid-cols-[1fr_420px] gap-8 p-8 md:p-12 lg:p-16 min-h-[420px]">
          {/* Left: Info */}
          <div className="flex flex-col justify-end">
            {/* Sector line */}
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent">
                {active.sector}
              </span>
              <span className="font-mono text-[10px] text-off-white/30">{active.year}</span>
            </div>

            {/* Title */}
            <h3
              className="font-display font-extrabold text-off-white leading-[0.95] tracking-tight mb-4"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
            >
              {active.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-off-white/50 text-sm leading-relaxed max-w-lg mb-6 line-clamp-3">
              {active.description}
            </p>

            {/* Stack preview */}
            <div className="flex flex-wrap gap-2 mb-8">
              {active.stack.slice(0, 5).map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] text-off-white/40 border border-off-white/10 px-2.5 py-1 tracking-wide"
                >
                  {s}
                </span>
              ))}
              {active.stack.length > 5 && (
                <span className="font-mono text-[10px] text-accent/60 border border-accent/15 px-2.5 py-1">
                  +{active.stack.length - 5}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <Link
                href={`/projects/${active.slug}`}
                className="inline-flex items-center gap-2 bg-accent text-navy font-mono text-xs font-bold tracking-wider px-6 py-3 hover:bg-accent-light transition-colors"
              >
                View Case Study
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              {active.liveUrl && (
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-off-white/15 text-off-white/60 font-mono text-xs tracking-wider px-5 py-3 hover:border-accent/40 hover:text-accent transition-colors"
                >
                  Live Site
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Right: Stats panel */}
          <div className="hidden lg:flex flex-col justify-between border-l border-off-white/5 pl-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-off-white/25 mb-6">
                Project Metrics
              </p>
              <div className="space-y-6">
                {[
                  { label: 'Status', value: active.status, accent: active.status === 'Production' },
                  { label: 'Category', value: active.category },
                  { label: 'Markets', value: active.market.slice(0, 3).join(', ') },
                  { label: 'Type', value: active.type },
                ].map(({ label, value, accent }) => (
                  <div key={label}>
                    <p className="font-mono text-[9px] tracking-widest uppercase text-off-white/20 mb-1">{label}</p>
                    <p className={`font-mono text-sm ${accent ? 'text-green-400' : 'text-off-white/70'}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Project counter */}
            <div className="mt-8 pt-6 border-t border-off-white/5">
              <p className="font-mono text-off-white/20 text-[10px] tracking-widest">
                <span className="text-accent text-lg font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="mx-2">/</span>
                <span>{String(featured.length).padStart(2, '0')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-off-white/5">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out"
            style={{ width: `${((activeIndex + 1) / featured.length) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Thumbnail strip ─────────────────────────────────── */}
      <div
        ref={stripRef}
        className="flex gap-2 overflow-x-auto py-3 scrollbar-none showcase-strip"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {featured.map((p, i) => (
          <button
            key={p.slug}
            onClick={() => handleSelect(i)}
            className={`relative flex-shrink-0 w-[140px] h-[80px] overflow-hidden border transition-all duration-300 group/thumb ${
              i === activeIndex
                ? 'border-accent ring-1 ring-accent/30'
                : 'border-off-white/5 dark:border-off-white/5 hover:border-off-white/15'
            }`}
            aria-label={`Show ${p.title}`}
          >
            <Image
              src={getCoverImage(p.slug, 280, 160)}
              alt={p.title}
              fill
              sizes="140px"
              className={`object-cover transition-all duration-500 ${
                i === activeIndex ? 'opacity-90 scale-105' : 'opacity-40 group-hover/thumb:opacity-60'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <span className="absolute bottom-1.5 left-2 right-2 font-mono text-[9px] text-off-white/70 truncate">
              {p.title}
            </span>
            {/* Active indicator */}
            {i === activeIndex && (
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
