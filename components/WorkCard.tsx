//首页作品卡片
import React, { useEffect, useState, useRef } from 'react'
import projects from '../data/projects'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface WorkCardProps {
  slug?: string
  image?:
    | string
    | { light?: string; dark?: string; square?: string; wide?: string }
  title?: string
  subtitle?: string
}

const WorkCard: React.FC<WorkCardProps> = ({
  slug,
  image,
  title,
  subtitle,
}) => {
  const router = useRouter()

  const project:
    | {
        image?:
          | string
          | { light?: string; dark?: string; square?: string; wide?: string }
        title?: string
        description?: string
      }
    | undefined = slug ? projects.find((p) => p.slug === slug) : undefined

  const finalImage = image ?? project?.image
  const finalTitle = title ?? project?.title
  const finalSubtitle = subtitle ?? project?.description

  const [isDark, setIsDark] = useState<boolean>(false)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    updateTheme()

    return () => observer.disconnect()
  }, [])

  // 响应式图片选择逻辑
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const hasSquare = typeof finalImage === 'object' && finalImage.square
  const hasWide = typeof finalImage === 'object' && finalImage.wide

  const resolvedImage =
    typeof finalImage === 'string'
      ? finalImage
      : hasSquare && !isMobile
      ? finalImage.square
      : hasWide
      ? finalImage.wide
      : isDark
      ? finalImage?.dark ?? finalImage?.light
      : finalImage?.light ?? finalImage?.dark

  const [showCursor, setShowCursor] = useState<boolean>(false)
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const cursorX = useRef<number>(0)
  const cursorY = useRef<number>(0)
  const targetX = useRef<number>(0)
  const targetY = useRef<number>(0)
  const animationFrameId = useRef<number | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    targetX.current = e.clientX
    targetY.current = e.clientY
  }

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      cursorX.current = lerp(cursorX.current, targetX.current, 0.2)
      cursorY.current = lerp(cursorY.current, targetY.current, 0.2)

      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorX.current + 20}px`
        cursorRef.current.style.top = `${cursorY.current + 20}px`
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    if (showCursor) {
      animationFrameId.current = requestAnimationFrame(animate)
    } else {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
        animationFrameId.current = null
      }
    }

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [showCursor])

  // 修改为新标签页打开
  const handleClick = () => {
    if (slug) {
      window.open(`/projectdetail/${slug}`, '_blank')
    }
  }

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className="cursor-pointer block rounded-2xl p-2 hover:bg-gray-100"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      {/* 图片部分 */}
      <div
        className="relative h-[240px] sm:h-[420px] lg:h-[620px] rounded-2xl overflow-hidden group bg-zinc-100"
        onMouseEnter={(e) => {
          targetX.current = e.clientX
          targetY.current = e.clientY
          cursorX.current = e.clientX
          cursorY.current = e.clientY
          setShowCursor(true)
        }}
        onMouseLeave={() => setShowCursor(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={resolvedImage!}
          alt={finalTitle!}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: '1rem',
          }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* 文字部分 */}
      <div className="sm:p-5 p-2 flex flex-col justify-center space-y-2">
        <div
          className="text-xl sm:text-[22px] font-medium text-zinc-950 truncate"
          title={finalTitle}
        >
          {finalTitle}
        </div>
        <div
          className="text-[13px] sm:text-base text-gray-500 leading-tight truncate whitespace-nowrap overflow-hidden"
          title={finalSubtitle}
        >
          {finalSubtitle}
        </div>
      </div>

      {showCursor && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[9999] bg-white/30 backdrop-blur-sm -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export default WorkCard
