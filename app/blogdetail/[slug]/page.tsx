'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import blogs, { Blog } from '../../../data/blogs'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { AnimatedThemeToggler } from '@/components/ThemeToggler'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import ReactMarkdown from 'react-markdown'
import ContentPlaceholder from '@/components/ContentPlaceholder'
import { notFound } from 'next/navigation'

export default function ProjectDetailPage() {
  const router = useRouter()
  const [isSticky, setIsSticky] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isDark, setIsDark] = useState(false)

  const scrollContainer = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY
          const sectionHeight = window.innerHeight * 0.5625 // 首图高度

          // 限制 scrollTop 最大为 sectionHeight
          const clampedScroll = Math.min(scrollTop, sectionHeight)

          // 根据首图滚动比例计算透明度
          let opacity = 0.15 + (clampedScroll / sectionHeight) * 0.65
          if (opacity > 1) opacity = 1

          const scrollRatio = clampedScroll / sectionHeight
          const startRatio = 0.05 // 5%高度开始缩放
          const maxShrink = 0.02 // 最大缩小比例

          let newScale = 1
          if (scrollRatio > startRatio) {
            const effectiveRatio = (scrollRatio - startRatio) / (1 - startRatio)
            newScale = 1 - effectiveRatio * maxShrink
          }

          document.documentElement.style.setProperty(
            '--overlay-opacity',
            opacity.toString()
          )
          document.documentElement.style.setProperty(
            '--scale',
            newScale.toString()
          )

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Initialize values on mount
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const target = sentinelRef.current
    if (!target) return

    // 修改逻辑：只有当信息区块吸顶(!entry.isIntersecting)且顶部距离小于200px时才隐藏首图
    const observer = new IntersectionObserver(([entry]) => {
      // 页面滚动到顶部时，强制显示首图
      if (window.scrollY === 0) {
        setIsSticky(false)
      } else {
        // 获取信息区块顶部距离视窗顶部
        const top = entry.target.getBoundingClientRect().top
        // 只有信息区块吸顶且距离顶部小于200px时才隐藏首图
        if (!entry.isIntersecting && top < 200) {
          setIsSticky(true)
        } else {
          setIsSticky(false)
        }
      }
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [])

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

  const params = useParams()
  const slug = Array.isArray(params?.slug) ? params?.slug[0] : params?.slug
  // 首图加载完成后进行动画
  const [imageLoaded, setImageLoaded] = useState(false)

  const project: Blog | undefined = blogs.find((p) => p.slug === slug)

  // 读取 markdown 内容
  const [markdownContent, setMarkdownContent] = useState<string | null>(null)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    if (!slug) return
    // 通过 fetch API 调用服务器端 API 路径读取文件
    fetch(`/api/content/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('内容未找到')
        return res.json() // 改为解析 JSON
      })
      .then((data) => {
        setMarkdownContent(data.content || '# 内容为空') // 取 content 字段
        setTimeout(() => setShowContent(true), 1000) // 延迟1秒显示
      })
      .catch(() => {
        setMarkdownContent('# 内容未找到')
        setTimeout(() => setShowContent(true), 2000)
      })
  }, [slug])

  if (!project) {
    notFound()
  }

  return (
    <div
      className={`w-full bg-black mx-auto rounded-b-3xl ${
        isDark ? 'dark' : ''
      }`}
    >
      {/* 首图展示区（固定） */}
      <section
        className={`w-full fixed top-0 left-0 flex justify-center items-center transition-opacity duration-150 ease-in-out ${
          isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-hidden={isSticky}
        style={{ height: '56.25vw' }}
      >
        <motion.div
          style={{
            transformOrigin: 'center bottom',
            width: '100%',
            position: 'relative',
          }}
          initial={{ scale: 1.1 }} // 初始放大
          animate={{ scale: 1 }} // 进入时缩小到 1
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <div
            style={{
              transform: 'scale(var(--scale, 1))', // 滚动时由 CSS 变量控制
              transformOrigin: 'center bottom',
            }}
          >
            <Image
              src={project.image}
              alt={project.title || 'Project cover image'}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="rounded object-contain"
              priority
              onLoadingComplete={() => setImageLoaded(true)} // 图片加载完成
            />

            {/* 黑色遮罩层 */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-black pointer-events-none"
              style={{ opacity: 'var(--overlay-opacity, 0.2)' }}
            />
          </div>
        </motion.div>
      </section>

      {/* 占位高度，防止固定图片覆盖内容 */}
      <div className="w-full" style={{ height: 'calc(56.25vw - 64px)' }} />

      {/* sentinel element for sticky detection */}
      <div ref={sentinelRef} aria-hidden className="h-0" />

      {/* 信息区块 */}
      <motion.section
        className={`project-info bg-white dark:bg-black overflow-hidden -mt-4 z-30 sticky top-0 ${
          isSticky ? '' : 'rounded-t-3xl'
        }`}
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <FadeInWhenVisible forceVisible={true} y={40} once>
          <div
            className={`${
              isSticky ? 'max-w-screen-2xl' : 'max-w-screen-xl'
            }  mx-auto px-4 sm:px-8 ${isSticky ? 'py-4' : 'py-10'}`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`font-semibold text-black dark:text-white transition-all duration-300 ${
                  isSticky ? 'text-2xl' : 'text-3xl'
                } line-clamp-2 overflow-hidden text-ellipsis`}
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
                {project.date && (
                  <span className="text-zinc-400">{project.date}</span>
                )}
              </div>
              <p className="text-lg text-gray-700 dark:text-zinc-400 line-clamp-2 overflow-hidden text-ellipsis">
                {project.description}
              </p>
            </motion.div>
          </div>
        </FadeInWhenVisible>
      </motion.section>

      {/* 内容区块 */}
      <section className="project-content relative bg-white dark:bg-black z-20 rounded-b-3xl">
        <div className="max-w-screen-xl mx-auto py-20 px-4 sm:px-8 w-full">
          {showContent && markdownContent ? (
            markdownContent === '# 内容未找到' ||
            markdownContent === '# 内容空空如也' ? (
              <FadeInWhenVisible forceVisible={true} y={40} once>
                <ContentPlaceholder type="failed" />
              </FadeInWhenVisible>
            ) : (
              <div className="prose prose-lg dark:prose-invert w-full max-w-full">
                <ReactMarkdown
                  components={{
                    p: ({ node, children, ...props }) => {
                      if (
                        node?.children &&
                        node.children.length === 1 &&
                        node.children[0].type === 'element' &&
                        node.children[0].tagName === 'img'
                      ) {
                        const imgNode = node.children[0]
                        const src = imgNode.properties.src as string
                        const alt = imgNode.properties.alt as string | undefined
                        return (
                          <div className="my-6 w-full">
                            <Image
                              src={src}
                              alt={alt || ''}
                              width={0}
                              height={0}
                              sizes="100vw"
                              style={{ width: '100%', height: 'auto' }}
                              className="rounded"
                              loading="lazy"
                            />
                          </div>
                        )
                      }
                      return <p {...props}>{children}</p>
                    },
                  }}
                >
                  {markdownContent}
                </ReactMarkdown>
              </div>
            )
          ) : (
            <FadeInWhenVisible forceVisible={true} y={40} once>
              <ContentPlaceholder type="loading" />
            </FadeInWhenVisible>
          )}
        </div>
      </section>

      {/* 其他作品区块 横向滚动 */}
      <section className="bg-black rounded-b-3xl py-20 relative z-20">
        <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 relative">
          <h2 className="text-3xl font-bold text-white mb-8">其他文章</h2>
          <div className="relative">
            {/* 滚动按钮 */}
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
              className="absolute top-1/2 -translate-y-1/2 left-0 -ml-5 z-10 bg-white shadow-lg p-[10px] rounded-full hover:bg-gray-100 cursor-pointer"
              style={{ display: canScrollLeft ? 'flex' : 'none' }}
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
              className="absolute top-1/2 -translate-y-1/2 right-0 -mr-5 z-10 bg-white shadow-lg p-[10px] rounded-full hover:bg-gray-100 cursor-pointer"
              style={{ display: canScrollRight ? 'flex' : 'none' }}
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

            <div
              ref={scrollContainer}
              className="flex space-x-5 overflow-x-auto scrollbar-hide"
            >
              {blogs
                .filter((b) => b.slug !== slug)
                .map((b) => (
                  <a
                    key={b.slug}
                    href={`/blogdetail/${b.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex-shrink-0 w-[320px] aspect-[4/3] overflow-hidden rounded-lg group"
                  >
                    <Image
                      src={b.image}
                      alt={b.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-full bg-gradient-to-t from-black/80 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                          {b.title}
                        </h3>
                        <p className="text-sm text-gray-200 line-clamp-1">
                          {b.description}
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
