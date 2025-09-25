//博客卡片
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import blogs from '../data/blogs'
import Image from 'next/image'

interface BlogSnippetProps {
  slug?: string
  image?: string
  title?: string
  date?: string
  description?: string
  layout?: 'horizontal' | 'vertical'
  size?: 'small' | 'large'
  imgWidth?: string
  imgHeight?: string
}

export const BlogSnippet: React.FC<BlogSnippetProps> = ({
  slug,
  image,
  title,
  date,
  description,
  layout = 'horizontal',
  size = 'small',
  imgWidth,
  imgHeight,
}) => {
  const router = useRouter()
  const blog = slug
    ? (blogs.find((b) => b.slug === slug) as
        | {
            image?: string
            title?: string
            date?: string
            description?: string
          }
        | undefined)
    : undefined

  const finalImage = image ?? blog?.image
  const finalTitle = title ?? blog?.title
  const finalDate = date ?? blog?.date
  const finalDescription = description ?? blog?.description

  const isVertical = layout === 'vertical'
  const isLarge = size === 'large'
  const Wrapper = 'div'

  // Handler for navigating to the blog post
  const handleClick = React.useCallback(
    (e?: React.MouseEvent | React.KeyboardEvent) => {
      if (!slug) return
      // Only handle left click or keyboard "activation"
      if (
        !e ||
        e.type === 'click' ||
        (e.type === 'keydown' &&
          'key' in e &&
          (e.key === 'Enter' || e.key === ' '))
      ) {
        window.open(`/blogdetail/${slug}`, '_blank')
      }
    },
    [slug]
  )

  const [showCursor, setShowCursor] = React.useState(false)
  const cursorRef = React.useRef<HTMLDivElement | null>(null)
  const cursorX = React.useRef<number>(0)
  const cursorY = React.useRef<number>(0)
  const targetX = React.useRef<number>(0)
  const targetY = React.useRef<number>(0)
  const animationFrameId = React.useRef<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    targetX.current = e.clientX
    targetY.current = e.clientY
  }

  React.useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      // Compute distance to target
      const dx = targetX.current - cursorX.current
      const dy = targetY.current - cursorY.current
      const dist = Math.sqrt(dx * dx + dy * dy)

      // Adaptive lerp factor: smaller jumps use higher factor, larger jumps use smaller factor
      // Clamp factor between 0.05 and 0.3 for smoothness
      const factor = Math.min(0.3, Math.max(0.05, 1 / (dist / 10 + 1)))

      cursorX.current = lerp(cursorX.current, targetX.current, factor)
      cursorY.current = lerp(cursorY.current, targetY.current, factor)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX.current + 20}px`
        cursorRef.current.style.top = `${cursorY.current + 20}px`
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    if (showCursor) {
      animationFrameId.current = requestAnimationFrame(animate)
    } else if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current)
      animationFrameId.current = null
    }

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current)
    }
  }, [showCursor])

  return (
    <Wrapper
      onClick={handleClick}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick(e)
        }
      }}
      tabIndex={0}
      role="button"
      className={`cursor-pointer transition ${
        isVertical
          ? 'flex flex-col hover:bg-gray-100 p-2 rounded-2xl'
          : 'flex gap-4 items-start'
      }`}
    >
      <div
        className={`relative overflow-hidden group ${
          isVertical
            ? `${imgHeight ?? (isLarge ? 'h-60' : 'h-40')} ${
                imgWidth ?? 'w-full'
              } ${isLarge ? 'rounded-xl' : 'rounded-lg'}`
            : 'w-32 h-[72px] rounded-md flex-shrink-0'
        }`}
        onMouseEnter={(e) => {
          if (isVertical) {
            cursorX.current = e.clientX
            cursorY.current = e.clientY
            targetX.current = e.clientX
            targetY.current = e.clientY
            setShowCursor(true)
          }
        }}
        onMouseLeave={() => isVertical && setShowCursor(false)}
        onMouseMove={isVertical ? handleMouseMove : undefined}
      >
        <Image
          src={finalImage!}
          alt={finalTitle!}
          fill
          sizes={isVertical ? '(max-width: 768px) 100vw, 50vw' : '128px'}
          className="object-cover transition-transform duration-200 ease-out hover:scale-105"
          style={{ objectFit: 'cover' }}
        />
      </div>
      {isVertical && showCursor && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9999] bg-white/30 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
          </svg>
        </div>
      )}
      <div
        className={`${
          isVertical
            ? 'text-left p-5'
            : 'flex-1 self-start flex flex-col justify-between overflow-hidden'
        }`}
      >
        {!(isVertical && isLarge) && (
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {finalDate}
          </p>
        )}
        <h4
          className={`${
            isVertical
              ? 'text-xl text-zinc-950 font-medium mt-2 line-clamp-1 sm:line-clamp-2'
              : 'text-base font-medium mt-1 line-clamp-2'
          }`}
        >
          {finalTitle}
        </h4>
        {isVertical && finalDescription && (
          <p className="text-base text-gray-500 mt-2 line-clamp-1 sm:line-clamp-2">
            {finalDescription}
          </p>
        )}
      </div>
    </Wrapper>
  )
}
