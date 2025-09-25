'use client'
import Image from 'next/image'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Project } from '../../../data/projects'
import { AnimatedThemeToggler } from '@/components/ThemeToggler'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import ContentPlaceholder from '@/components/ContentPlaceholder'

interface ExtendedImageContent {
  type?: 'image' | 'iframe'
  src?: string
  title?: string
  alt?: string
}

interface ProjectContent {
  baseUrl: string
  images: (string | ExtendedImageContent)[]
  spacing?: string
}

interface Props {
  slug: string
  project: Project
  projectContent?: ProjectContent
}

export default function ProjectDetailClient({
  slug,
  project,
  projectContent,
}: Props) {
  const [overlayOpacity, setOverlayOpacity] = useState(0.1)
  const [scale, setScale] = useState(1)
  const [isSticky, setIsSticky] = useState(false)
  // 信息区块 ref
  const infoSectionRef = useRef<HTMLDivElement>(null)
  // 控制首图显示
  const [showHero, setShowHero] = useState(true)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)
  // 强制加载动画
  const [isLoading, setIsLoading] = useState(true)
  // 视频和容器 refs 及 intersection 状态
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const containerRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isIntersectingList, setIsIntersectingList] = useState<boolean[]>([])

  // 横向滚动区块 ref
  const scrollContainer = useRef<HTMLDivElement>(null)
  // 横向滚动按钮状态
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  // 横向滚动容器监听，更新左右按钮状态
  useEffect(() => {
    const container = scrollContainer.current
    if (!container) return

    const updateButtons = () => {
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft + container.clientWidth < container.scrollWidth - 1
      )
    }

    updateButtons()
    container.addEventListener('scroll', updateButtons)
    window.addEventListener('resize', updateButtons)

    return () => {
      container.removeEventListener('scroll', updateButtons)
      window.removeEventListener('resize', updateButtons)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // 统一 IntersectionObserver 处理所有视频容器
  useEffect(() => {
    const observers: IntersectionObserver[] = []

    containerRefs.current.forEach((container, index) => {
      if (!container) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersectingList((prev) => {
            const next = [...prev]
            next[index] = entry.isIntersecting
            return next
          })
        },
        { threshold: 0.25 }
      )
      observer.observe(container)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const sectionHeight = window.innerHeight * 0.5625 // 首图高度

      // 限制 scrollTop 最大为 sectionHeight
      const clampedScroll = Math.min(scrollTop, sectionHeight)

      // 根据首图滚动比例计算透明度
      let opacity = 0.1 + (clampedScroll / sectionHeight) * 0.65
      if (opacity > 1) opacity = 1
      setOverlayOpacity(opacity)

      const scrollRatio = clampedScroll / sectionHeight
      const startRatio = 0.05 // 5%高度开始缩放
      const maxShrink = 0.02 // 最大缩小比例

      let newScale = 1
      if (scrollRatio > startRatio) {
        const effectiveRatio = (scrollRatio - startRatio) / (1 - startRatio)
        newScale = 1 - effectiveRatio * maxShrink
      }
      setScale(newScale)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const target = sentinelRef.current
    if (!target) return
    const observer = new IntersectionObserver(([entry]) => {
      setIsSticky(!entry.isIntersecting)
    })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // 监听信息区块距离顶部，控制首图显示
  useEffect(() => {
    const infoRef = infoSectionRef.current
    if (!infoRef) return
    const handleScroll = () => {
      const rect = infoRef.getBoundingClientRect()
      setShowHero(rect.top > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    // 初始执行一次
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // 需要项目列表用于“其他作品”区块
  // 为了客户端组件简洁，建议由父组件传入 projects，如需此处演示可用 require 导入
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const projects = require('../../../data/projects').default

  return (
    <div
      className={`w-full bg-black dark:bg-black mx-auto rounded-b-3xl ${
        isDark ? 'dark' : ''
      }`}
    >
      {/* 首图展示区（固定） */}
      <section
        className={`w-full fixed top-0 left-0 flex justify-center items-center transition-opacity duration-150 ease-in-out ${
          showHero ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!showHero}
        style={{ height: '56.25vw' }}
      >
        {project.image && (
          <motion.div
            style={{
              transformOrigin: 'center bottom',
              transition: 'transform 0.1s linear',
              width: '100%',
              height: '100%',
              position: 'relative',
            }}
            initial={{ scale: 1.1 }}
            animate={{ scale }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <Image
              src={
                typeof project.image === 'string'
                  ? project.image
                  : project.image.wide || ''
              }
              alt={project.title || 'Project cover image'}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="rounded object-contain"
              priority
            />
          </motion.div>
        )}

        {/* 黑色遮罩层 */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none"
          style={{ opacity: overlayOpacity }}
        />
      </section>

      {/* 占位高度，防止固定图片覆盖内容 */}
      <div className="w-full" style={{ height: 'calc(56.25vw - 64px)' }} />

      {/* sentinel element for sticky detection */}
      <div ref={sentinelRef} aria-hidden className="h-0" />

      {/* 信息区块 */}

      <motion.section
        ref={infoSectionRef}
        className={`project-info bg-white dark:bg-black overflow-hidden -mt-10 z-30 sticky top-0 ${
          isSticky ? '' : 'rounded-t-3xl'
        }`}
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <FadeInWhenVisible forceVisible={true} y={40} once>
          <div
            className={`max-w-screen-2xl mx-auto px-4 sm:px-8 ${
              isSticky ? 'py-4' : 'py-10'
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`font-semibold text-black dark:text-white transition-all duration-300 overflow-hidden text-ellipsis line-clamp-2 ${
                  isSticky ? 'text-2xl' : 'text-3xl'
                }`}
              >
                {project.title}
              </div>
              <div className="flex items-center space-x-2">
                <AnimatedThemeToggler isDark={isDark} setIsDark={setIsDark} />
              </div>
            </div>
            <motion.div
              initial={false}
              animate={{
                opacity: isSticky ? 0 : 1,
                maxHeight: isSticky ? 0 : 120, // 可根据文字长度调整
              }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="text-base text-zinc-400 flex items-center mt-4 mb-2">
                {project.type && (
                  <span className="text-indigo-500 dark:text-indigo-400">
                    {project.type.split('/').map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i !== arr.length - 1 && (
                          <span
                            style={{
                              fontFamily: 'Arial',
                              margin: '0 0.2em',
                              color: 'inherit',
                            }}
                          >
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </span>
                )}
                {project.type && project.date && (
                  <div className="w-[6px] h-[6px] rounded-full bg-zinc-300 dark:bg-zinc-400 mx-2" />
                )}
                <span className="text-zinc-400">{project.date}</span>
              </div>
              <p className="text-lg text-gray-700 dark:text-zinc-300 overflow-hidden text-ellipsis line-clamp-2">
                {project.description}
              </p>
            </motion.div>
          </div>
        </FadeInWhenVisible>
      </motion.section>

      {/* 内容区块 */}
      <section
        className="project-content relative bg-white dark:bg-black z-20 rounded-b-3xl"
        onContextMenu={(e) => e.preventDefault()}
      >
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-20">
          {isLoading ? (
            <FadeInWhenVisible forceVisible={true} y={40} once>
              <ContentPlaceholder type="loading" />
            </FadeInWhenVisible>
          ) : !projectContent || projectContent.images?.length === 0 ? (
            <FadeInWhenVisible forceVisible={true} y={40} once>
              <ContentPlaceholder type="failed" />
            </FadeInWhenVisible>
          ) : (
            projectContent.images.map(
              (content: string | ExtendedImageContent, index: number) => {
                const isLast =
                  index === (projectContent.images?.length || 0) - 1
                const marginClass = isLast
                  ? ''
                  : projectContent.spacing || 'mb-0'
                if (typeof content === 'string') {
                  const isVideo = content.endsWith('.mp4')
                  const isIframe = content.endsWith('.iframe') // 如果有 iframe 文件标识，可自行调整
                  if (isVideo) {
                    return (
                      <div
                        key={index}
                        className={marginClass}
                        ref={(el) => {
                          containerRefs.current[index] = el
                        }}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[index] = el
                          }}
                          loop
                          muted
                          src={projectContent.baseUrl + content}
                          className="w-full"
                          autoPlay={!!isIntersectingList[index]}
                        />
                      </div>
                    )
                  } else if (isIframe) {
                    return (
                      <div
                        key={index}
                        className={`relative pb-[56.25%] h-0 overflow-hidden ${marginClass}`}
                      >
                        <iframe
                          src={projectContent.baseUrl + content}
                          title={`iframe-${index}`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allowFullScreen
                        />
                      </div>
                    )
                  } else {
                    // 图片处理（含16:9占位比，加载后动态判断）
                    const fileName = content.replace(
                      /\.(webp|jpg|jpeg|png)$/i,
                      ''
                    )
                    return (
                      <div
                        key={index}
                        className={`image-container relative w-full overflow-hidden aspect-video ${marginClass}`}
                        ref={(el) => {
                          containerRefs.current[index] = el
                        }}
                        style={{ backgroundColor: '#f0f0f0' }}
                      >
                        <Image
                          src={`${projectContent.baseUrl}${fileName}-2880.webp`}
                          alt={`Project image ${index + 1}`}
                          fill
                          sizes="(max-width: 600px) 600px,
                               (max-width: 1440px) 1440px,
                               (max-width: 1920px) 1920px,
                               100vw"
                          priority={index < 2}
                          className="object-cover"
                          onLoad={(e) => {
                            const img = e.currentTarget
                            const ratio = img.naturalWidth / img.naturalHeight
                            const container = containerRefs.current[index]
                            if (container) {
                              if (Math.abs(ratio - 16 / 9) > 0.05) {
                                container.style.paddingBottom = ''
                                container.classList.remove('aspect-video')
                              }
                            }
                          }}
                        />
                      </div>
                    )
                  }
                } else if (typeof content === 'object') {
                  if (content.type === 'iframe') {
                    return (
                      <div
                        key={index}
                        className={`relative pb-[56.25%] h-0 overflow-hidden ${marginClass}`}
                      >
                        <iframe
                          src={content.src}
                          title={content.title || `iframe-${index}`}
                          className="absolute top-0 left-0 w-full h-full"
                          frameBorder="0"
                          allowFullScreen
                        />
                      </div>
                    )
                  } else if (content.type === 'image') {
                    return (
                      <div
                        key={index}
                        className={`image-container relative w-full overflow-hidden aspect-video ${marginClass}`}
                        ref={(el) => {
                          containerRefs.current[index] = el
                        }}
                        style={{ backgroundColor: '#f0f0f0' }}
                      >
                        <Image
                          src={
                            typeof content.src === 'string'
                              ? content.src.replace(
                                  /\.(webp|jpg|jpeg|png)$/i,
                                  ''
                                ) + '-2880.webp'
                              : content.src!
                          }
                          alt={content.alt || `Project image ${index + 1}`}
                          fill
                          sizes="(max-width: 600px) 600px,
                               (max-width: 1440px) 1440px,
                               (max-width: 1920px) 1920px,
                               100vw"
                          priority={index < 2}
                          className="object-cover"
                          onLoad={(e) => {
                            const img = e.currentTarget
                            const ratio = img.naturalWidth / img.naturalHeight
                            const container = containerRefs.current[index]
                            if (container) {
                              if (Math.abs(ratio - 16 / 9) > 0.05) {
                                container.style.paddingBottom = ''
                                container.classList.remove('aspect-video')
                              }
                            }
                          }}
                        />
                      </div>
                    )
                  } else {
                    return null
                  }
                } else {
                  return null
                }
              }
            )
          )}
        </div>
      </section>

      {/* 其他作品区块 横向滚动 */}
      <section className="relative z-20 bg-black rounded-b-3xl py-20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 relative">
          <h2 className="text-3xl font-bold text-white mb-8">其他作品</h2>
          {/* 滚动容器及按钮整体相对定位包裹，按钮相对于卡片容器垂直居中 */}
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => {
                  if (scrollContainer.current) {
                    const containerWidth = scrollContainer.current.clientWidth
                    scrollContainer.current.scrollBy({
                      left: -containerWidth * 0.8,
                      behavior: 'smooth',
                    })
                  }
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg -ml-5 p-[10px] rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-black"
                >
                  <path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z" />
                </svg>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => {
                  if (scrollContainer.current) {
                    const containerWidth = scrollContainer.current.clientWidth
                    scrollContainer.current.scrollBy({
                      left: containerWidth * 0.8,
                      behavior: 'smooth',
                    })
                  }
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg -mr-5 p-[10px] rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-black"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
                </svg>
              </button>
            )}
            <div
              ref={scrollContainer}
              className="flex space-x-5 overflow-x-auto scrollbar-hide"
            >
              {projects
                .filter((p: Project) => p.slug !== slug)
                .map((p: Project) => (
                  <a
                    key={p.slug}
                    href={`/projectdetail/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 w-[360px] aspect-[4/3] overflow-hidden rounded-lg group"
                  >
                    <Image
                      src={
                        typeof p.image === 'string'
                          ? p.image
                          : p.image?.square || p.image?.wide || ''
                      }
                      alt={p.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                          {p.title}
                        </h3>
                        <p className="text-sm text-gray-200 line-clamp-1">
                          {p.description}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
