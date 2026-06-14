'use client'

import { useState } from 'react'

interface Metric {
  label: string
  value: string
  unit?: string
  color?: 'cyber' | 'accent' | 'primary' | 'green'
}

interface Props {
  projectTitle: string
  stack: string[]
  metrics?: Metric[]
  category: string
  type: string
  year: string
  status: string
}

const defaultMetrics: Metric[] = [
  { label: 'PERFORMANCE', value: '98', unit: '/100', color: 'cyber' },
  { label: 'ACCESSIBILITY', value: '96', unit: '/100', color: 'green' },
  { label: 'SEO', value: '100', unit: '/100', color: 'accent' },
  { label: 'BEST PRACTICES', value: '95', unit: '/100', color: 'primary' },
]

export function TechRadar({ projectTitle, stack, metrics, category, type, year, status }: Props) {
  const [hoveredStack, setHoveredStack] = useState<string | null>(null)
  const displayMetrics = metrics ?? defaultMetrics

  const colorMap = {
    cyber:   { text: 'text-primary dark:text-cyber',   bg: 'bg-primary dark:bg-cyber',   border: 'border-primary dark:border-cyber' },
    accent:  { text: 'text-accent',  bg: 'bg-accent',  border: 'border-accent' },
    primary: { text: 'text-primary-light', bg: 'bg-primary-light', border: 'border-primary-light' },
    green:   { text: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500 dark:bg-emerald-400', border: 'border-emerald-500 dark:border-emerald-400' },
  }

  return (
    <div className="space-y-6">
      {/* ── Metric Scores ─────────────────────────────── */}
      <div className="border border-primary/15 dark:border-cyber/15 bg-white dark:bg-navy-mid/40 p-6 relative">
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50 dark:border-cyber/50" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/50 dark:border-cyber/50" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary/50 dark:border-cyber/50" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50 dark:border-cyber/50" />

        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 bg-primary dark:bg-cyber rounded-full animate-pulse" />
          <p className="font-mono text-[9px] tracking-[0.2em] text-primary dark:text-cyber uppercase">[QUALITY_METRICS]</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {displayMetrics.map((metric) => {
            const col = colorMap[metric.color ?? 'cyber']
            const pct = parseInt(metric.value)
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-end justify-between">
                  <span className="font-mono text-[8px] tracking-[0.15em] text-muted-dark/60 dark:text-muted-light/60 uppercase">{metric.label}</span>
                  <span className={`font-hud text-sm font-bold ${col.text}`}>
                    {metric.value}<span className="text-[8px] font-normal opacity-60">{metric.unit}</span>
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1 bg-gray-100 dark:bg-navy/60 border border-primary/10 dark:border-cyber/10 overflow-hidden">
                  <div
                    className={`h-full ${col.bg} transition-all duration-1000`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Tech Stack Tags (interactive) ─────────────── */}
      <div className="border border-primary/15 dark:border-cyber/15 bg-white dark:bg-navy-mid/40 p-6 relative">
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/30 dark:border-cyber/30" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/30 dark:border-cyber/30" />

        <div className="flex items-center gap-2 mb-5">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <p className="font-mono text-[9px] tracking-[0.2em] text-primary dark:text-cyber uppercase">[STACK_COMPOSITION]</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <button
              key={tech}
              onMouseEnter={() => setHoveredStack(tech)}
              onMouseLeave={() => setHoveredStack(null)}
              className={`
                font-mono text-[9px] tracking-wider px-2.5 py-1.5 border transition-all duration-200
                ${hoveredStack === tech
                  ? 'border-primary bg-primary/15 text-primary shadow-sm dark:border-cyber dark:bg-cyber/15 dark:text-cyber dark:shadow-cyber'
                  : 'border-primary/15 text-muted-dark/80 hover:border-primary/30 dark:border-cyber/15 dark:text-muted-light/80 dark:hover:border-cyber/30'}
              `}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      {/* ── Project Classification ─────────────────────── */}
      <div className="border border-primary/10 dark:border-cyber/10 bg-off-white dark:bg-navy-mid/20 p-5 relative">
        <p className="font-mono text-[8px] tracking-[0.2em] text-primary/50 dark:text-cyber/50 uppercase mb-4">[CLASSIFICATION_NODE]</p>
        <dl className="space-y-3">
          {[
            { k: 'CATEGORY', v: category },
            { k: 'TYPE', v: type },
            { k: 'YEAR', v: year },
            { k: 'STATUS', v: status },
          ].map(({ k, v }) => (
            <div key={k} className="flex items-center justify-between">
              <dt className="font-mono text-[8px] text-muted-dark/40 dark:text-muted-light/40 tracking-widest">{k}</dt>
              <dd className="font-hud text-[10px] text-primary dark:text-cyber font-bold tracking-wider uppercase">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
