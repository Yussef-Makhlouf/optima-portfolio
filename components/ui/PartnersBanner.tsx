import Image from 'next/image'

const PARTNERS = [
  { name: 'Al Qemma', img: '/partners/al-qemma.png' },
  { name: 'Artat', img: '/partners/artat.png' },
  { name: 'Digital Events', img: '/partners/digital-events.png' },
  { name: 'Emmar', img: '/partners/emmar-logo.png' },
  { name: 'Ghbary', img: '/partners/ghbary.avif' },
  { name: 'Golden Moon', img: '/partners/golden-moon.webp' },
  { name: 'Goory', img: '/partners/goory.png' },
  { name: 'Habsi', img: '/partners/habsi.png' },
  { name: 'Logixi', img: '/partners/logixi.png' },
  { name: 'Macc', img: '/partners/macc.svg' },
  { name: 'Raf', img: '/partners/raf.png' },
  { name: 'Tarmez', img: '/partners/tarmezmain.svg' },
  { name: 'Technova', img: '/partners/technova.svg' },
  { name: 'UAEmma', img: '/partners/uaemmaf.svg' },
  { name: 'White Dream', img: '/partners/white-dream-logo.webp' },
]

export function PartnersBanner() {
  return (
    <section className="py-10 bg-off-white dark:bg-navy transition-colors duration-300 overflow-hidden">
      {/* Label */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-accent/40" />
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted/60 dark:text-muted/60">
            Trusted by Gulf-Market Leaders
          </span>
          <span className="flex-1 h-px bg-navy/5 dark:bg-off-white/5" />
        </div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-off-white dark:from-navy to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-off-white dark:from-navy to-transparent z-10 pointer-events-none" />

        <div className="flex gap-10 banner-marquee">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex gap-8 shrink-0 items-center">
              {PARTNERS.map((partner) => (
                <div
                  key={`${dup}-${partner.name}`}
                  className="shrink-0 flex items-center justify-center w-28 h-14 px-4 opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale dark:grayscale-0 hover:grayscale-0"
                >
                  <Image
                    src={partner.img}
                    alt={partner.name}
                    width={100}
                    height={40}
                    className="object-contain max-h-10 max-w-full"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
