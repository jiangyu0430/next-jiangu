import React from 'react'

interface ResponsiveImageProps {
  baseUrl: string
  fileName: string
  alt: string
  priority?: boolean
  index?: number
  className?: string
}

export default function ResponsiveImage({
  baseUrl,
  fileName,
  alt,
  priority = false,
  index = 0,
  className = '',
}: ResponsiveImageProps) {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`
          ${baseUrl}${fileName}-600.webp 600w,
          ${baseUrl}${fileName}-1440.webp 1440w,
          ${baseUrl}${fileName}-1920.webp 1920w,
          ${baseUrl}${fileName}-2880.webp 2880w
        `}
        sizes="(max-width: 600px) 600px,
               (max-width: 1440px) 1440px,
               (max-width: 1920px) 1920px,
               100vw"
      />
      <img
        src={`${baseUrl}${fileName}-1920.webp`}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`object-cover w-full h-auto ${className}`}
      />
    </picture>
  )
}
