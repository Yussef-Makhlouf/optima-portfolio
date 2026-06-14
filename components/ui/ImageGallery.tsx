'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { BrowserFrame } from '@/components/ui/BrowserFrame'

interface ImageItem {
  src: string
  alt: string
  caption?: string
}

interface Props {
  images: ImageItem[]
  projectTitle: string
  projectUrl?: string
}

export function ImageGallery({ images, projectTitle, projectUrl }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const goTo = (index: number) => {
    setCurrentIndex(index)
  }

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          goNext()
          break
        case 'ArrowLeft':
          goPrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index))
  }

  if (images.length === 0) return null

  return (
    <>
      {/* ── Gallery Grid ─────────────────────────────────── */}
      <div className="space-y-6">
        {/* Hero image - browser frame with cinematic screenshot */}
        {images.length > 0 && projectUrl ? (
          <BrowserFrame
            title={projectTitle}
            url={projectUrl}
            imageSrc={images[0].src}
            imageAlt={images[0].alt}
          />
        ) : (
          <div
            className="relative group cursor-pointer overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <div className="aspect-[21/9] w-full overflow-hidden">
              <ImageWithFallback
                src={images[0].src}
                alt={images[0].alt}
                index={0}
                loadedImages={loadedImages}
                onLoad={handleImageLoad}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-off-white/90 dark:bg-navy/90 backdrop-blur px-4 py-2">
                <span className="font-mono text-xs text-navy dark:text-off-white tracking-widest uppercase">
                  View Gallery
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-accent/0 group-hover:border-accent/60 transition-colors duration-300" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-accent/0 group-hover:border-accent/60 transition-colors duration-300" />
          </div>
        )}

        {/* Masonry-style secondary grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {images.slice(1).map((img, i) => {
              const actualIndex = i + 1
              const aspectClasses = [
                'aspect-[4/3]',
                'aspect-[3/4]',
                'aspect-square',
                'aspect-[4/3]',
                'aspect-[3/4]',
                'aspect-square',
              ]
              const aspectClass = aspectClasses[i % aspectClasses.length]

              return (
                <div
                  key={actualIndex}
                  className="relative group cursor-pointer overflow-hidden"
                  onClick={() => openLightbox(actualIndex)}
                  style={{ animationDelay: `${actualIndex * 0.1}s` }}
                >
                  <div className={`${aspectClass} w-full overflow-hidden bg-navy/[0.02] dark:bg-off-white/[0.02]`}>
                    <ImageWithFallback
                      src={img.src}
                      alt={img.alt}
                      index={actualIndex}
                      loadedImages={loadedImages}
                      onLoad={handleImageLoad}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                  {img.caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="font-mono text-[10px] text-off-white tracking-wide line-clamp-1">
                        {img.caption}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* Image count indicator */}
        <div className="flex items-center gap-3 pt-2">
          <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
          <span className="font-mono text-[10px] text-muted/60 dark:text-muted/40 tracking-widest">
            {images.length} IMAGE{images.length !== 1 ? 'S' : ''}
          </span>
          <div className="h-px w-12 bg-accent/20" />
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-navy/95 dark:bg-navy/98 backdrop-blur-md flex items-center justify-center"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} gallery - image ${currentIndex + 1} of ${images.length}`}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            aria-label="Close gallery"
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center border border-off-white/10 hover:border-accent/50 text-off-white hover:text-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Navigation arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Previous image"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-off-white/10 hover:border-accent/50 text-off-white hover:text-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Next image"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-off-white/10 hover:border-accent/50 text-off-white hover:text-accent transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image container */}
          <div
            className="relative max-w-6xl max-h-[85vh] mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageWithFallback
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              index={currentIndex}
              loadedImages={loadedImages}
              onLoad={handleImageLoad}
              className="max-w-full max-h-[85vh] object-contain"
              priority
            />

            {/* Caption */}
            {images[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 to-transparent">
                <p className="font-mono text-xs text-off-white/80 tracking-wide">
                  {images[currentIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
            <div className="h-px w-8 bg-accent/40" />
            <span className="font-mono text-xs text-off-white/60 tracking-widest">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <div className="h-px w-8 bg-accent/40" />
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-6 right-6 hidden lg:flex items-center gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i) }}
                aria-label={`Go to image ${i + 1}`}
                className={`w-10 h-10 overflow-hidden border transition-all duration-200 ${
                  i === currentIndex
                    ? 'border-accent opacity-100'
                    : 'border-off-white/10 opacity-40 hover:opacity-70'
                }`}
              >
                <ImageWithFallback
                  src={img.src}
                  alt=""
                  index={i}
                  loadedImages={loadedImages}
                  onLoad={handleImageLoad}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function ImageWithFallback({
  src,
  alt,
  index,
  loadedImages,
  onLoad,
  className,
  priority,
}: {
  src: string
  alt: string
  index: number
  loadedImages: Set<number>
  onLoad: (index: number) => void
  className: string
  priority?: boolean
}) {
  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (loadedImages.has(index)) {
      setIsLoading(false)
    }
  }, [index, loadedImages])

  if (error) {
    return (
      <div className={`${className} bg-navy/5 dark:bg-off-white/5 flex items-center justify-center`}>
        <div className="text-center p-8">
          <svg width="32" height="32" viewBox="0 0 64 64" fill="none" className="text-accent/40 mx-auto mb-3">
            <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="32" y1="0" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
            <line x1="32" y1="48" x2="32" y2="64" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="32" x2="16" y2="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="48" y1="32" x2="64" y2="32" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <p className="font-mono text-[10px] text-muted/40 tracking-widest uppercase">
            {alt}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      {isLoading && (
        <div className={`${className} bg-navy/5 dark:bg-off-white/5 animate-pulse`} />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        onLoad={() => {
          setIsLoading(false)
          onLoad(index)
        }}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
      />
    </>
  )
}
