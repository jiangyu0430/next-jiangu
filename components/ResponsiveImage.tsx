import React, { useMemo, useRef, useState, useEffect } from 'react'

interface ResponsiveImageProps {
  baseUrl: string
  fileName: string
  alt: string
  priority?: boolean
  className?: string
}

export default function ResponsiveImage({
  baseUrl,
  fileName,
  alt,
  priority = false,
  className = '',
}: ResponsiveImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(priority)

  useEffect(() => {
    if (priority) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '200px', // ✅ 提前200px加载，滚动更平滑
      }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [priority])

  const selectedSize = useMemo(() => {
    if (typeof window === 'undefined') return 1920 // SSR fallback
    const deviceWidth = window.innerWidth * window.devicePixelRatio
    const sizes = [600, 1440, 1920, 2880]
    return sizes.find((w) => w >= deviceWidth) || sizes[sizes.length - 1]
  }, [])

  return (
    <div ref={ref} className="w-full h-auto">
      {isVisible && (
        <picture>
          <source
            type="image/webp"
            srcSet={`${baseUrl}${fileName}-${selectedSize}.webp`}
            sizes="100vw"
          />
          <img
            src={`${baseUrl}${fileName}-${selectedSize}.webp`}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={`object-cover w-full h-auto ${className}`}
          />
        </picture>
      )}
    </div>
  )
}
