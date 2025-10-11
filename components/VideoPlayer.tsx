// VideoPlayer.tsx
'use client'

import { useRef, useEffect } from 'react'

interface VideoPlayerProps {
  src: string
}

export default function VideoPlayer({ src }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!videoRef.current) return
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {})
          } else {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 }
    )

    observer.observe(videoRef.current)

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current)
    }
  }, [])

  return (
    <span className="my-6 block w-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        controls={false}
        className="w-full rounded"
      />
    </span>
  )
}
