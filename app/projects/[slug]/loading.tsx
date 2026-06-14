export default function Loading() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Hero skeleton */}
      <div className="relative min-h-[55vh] flex items-end pb-16 px-6 bg-off-white dark:bg-navy-soft" role="status" aria-label="Loading project details">
        <div className="max-w-7xl mx-auto w-full">
          <div className="h-3 w-48 bg-muted/20 rounded-sm mb-6" />
          <div className="flex gap-3 mb-5">
            <div className="h-5 w-20 bg-muted/20 rounded-sm" />
            <div className="h-5 w-16 bg-muted/20 rounded-sm" />
          </div>
          <div className="h-16 w-2/3 bg-muted/20 rounded-sm mb-5" />
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-muted/20 rounded-sm" />
            <div className="h-6 w-20 bg-muted/20 rounded-sm" />
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-6 py-16" aria-hidden="true">
        <div className="grid lg:grid-cols-[1fr_360px] gap-16">
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-muted/10" style={{ width: `${80 - i * 5}%` }} />
            ))}
          </div>
          <div className="h-96 bg-muted/10" />
        </div>
      </div>
    </div>
  )
}
