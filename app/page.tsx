'use client'
import { useEffect, useState, useRef, ChangeEvent } from 'react'
import Navbar2 from '@/components/Navbar2'

// Components
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import dynamic from 'next/dynamic'
import WorkCard from '@/components/WorkCard'
import CircularGallery from '@/components/CircularGallery'
import { BlogSnippet } from '@/components/BlogSnippet'
import { InteractiveHoverButton } from '@/components/InteractiveHoverButton'
import { PlaceholdersAndVanishInput } from '@/components/PlaceholdersAndVanishInput'
import SectionTitle from '@/components/SectionTitle'
import ScrollRevealTitle from '@/components/ScrollRevealTitle'
import { ResponsiveCardLayout } from '@/components/CardLayout'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { TextAnimate } from '@/components/TextAnimate'

// Data
import { notesItems } from '@/data/notes'
import projects from '@/data/projects'
import blogs from '@/data/blogs'
import usePageTitle from '@/hooks/usePageTitle'

function Home() {
  usePageTitle('JIANGYU')
  const videoRef = useRef<HTMLVideoElement>(null)
  const [svgOffset, setSvgOffset] = useState(0)
  const svgRef = useRef<HTMLImageElement>(null)

  const contactRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 0.6], [29, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [3.3, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.6], [20, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [27, 0])
  const rotateY = useTransform(scrollYProgress, [0, 0.6], [-54, 0])

  const { scrollY } = useScroll()
  // For hero section text: start effect only after 640px scroll
  const bottom = useTransform(scrollY, [640, 1600], [96, -200])

  useEffect(() => {
    const videoEl = videoRef.current
    if (!videoEl) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) videoEl.play().catch(() => {})
        else videoEl.pause()
      },
      { threshold: 0 } // 改为 0，无阈值，进入视窗立即播放
    )
    observer.observe(videoEl)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const svgEl = svgRef.current
    if (!svgEl) return

    let handleScroll: () => void
    let scrollListenerAttached = false

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!scrollListenerAttached) {
              handleScroll = () => {
                const scrollTop = window.scrollY
                setSvgOffset(scrollTop * 0.1) // 偏移速度可调
              }
              window.addEventListener('scroll', handleScroll)
              scrollListenerAttached = true
              // Trigger initial scroll position
              handleScroll()
            }
          } else {
            if (scrollListenerAttached) {
              window.removeEventListener('scroll', handleScroll)
              scrollListenerAttached = false
            }
          }
        })
      },
      { threshold: 0 }
    )

    intersectionObserver.observe(svgEl)

    return () => {
      intersectionObserver.disconnect()
      if (scrollListenerAttached) {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <div className="w-full mx-auto bg-black rounded-b-3xl">
      <div>
        <Navbar2 />
      </div>
      {/* Hero Section */}
      <section className="h-screen min-h-[720px] w-full flex items-center px-4 sm:px-8 text-left overflow-hidden relative cursor-default">
        <div
          className="absolute inset-0 z-0"
          style={{
            height: '100%',
            width: '100%',
            opacity: 1,
          }}
        >
          <div
            className="relative w-full h-full cursor-default"
            style={{
              transform: 'scale(1.2) rotate(27deg)',
              opacity: 1,
              right: '-247px',
            }}
          >
            <video
              ref={videoRef}
              src="/lanyard/hero.mp4"
              loop
              autoPlay
              muted
              playsInline
              preload="auto"
              style={{
                position: 'absolute',
                top: 0,
                width: 'calc(100% + 247px)',
                height: '100%',
                borderRadius: '0px',
                display: 'block',
                objectFit: 'fill',
                objectPosition: '50% 50%',
                pointerEvents: 'none',
                cursor: 'url(/cursor-black.png), auto', // 🔑 直接在视频上设置光标
                willChange: 'transform, opacity',
              }}
            />
          </div>
          <motion.div
            className="absolute inset-x-0 z-10 flex flex-col items-start lg:flex-row lg:justify-between lg:items-start max-w-screen-2xl mx-auto px-4 sm:px-8 text-zinc-200 text-lg sm:text-xl"
            style={{ bottom, mixBlendMode: 'difference' }}
          >
            {/* 左侧文本 */}
            <div className="w-full lg:w-160 leading-8">
              <TextAnimate animation="slideLeft" by="character" delay={0.3}>
                —
                从概念到原型，从视觉到交互，将复杂的产品问题拆解为清晰、可操作的设计方案；创造愉悦的用户体验，让每一次点击都充满意义。
              </TextAnimate>
            </div>

            {/* 右侧列文本 */}
            <div className="flex flex-col gap-2 text-left lg:text-right mt-8 lg:ml-8 lg:mt-0">
              <TextAnimate animation="fadeIn" by="line" as="p" delay={0.2}>
                {`UX/UI Design\n\nWeb Development\n\nMotion Animation\n\n3D Prototyping`}
              </TextAnimate>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 个人信息 */}
      <section className="bg-zinc-100 py-20 lg:py-40 rounded-3xl relative overflow-hidden">
        {/* 顶部 SVG */}
        <img
          ref={svgRef}
          src="/Measure.svg"
          alt="Measure"
          className="absolute top-4 left-0"
          style={{
            width: 'auto',
            height: 'auto',
            scale: '1.15',
            transform: `translateX(${200 - svgOffset}px)`, // 200 是初始偏移量
            transition: 'transform 0.1s linear',
          }}
        />
        {/* 引入卡片布局 */}
        <ResponsiveCardLayout />
      </section>

      {/* Featured Works */}
      <section className="py-20 lg:pt-40 bg-white rounded-3xl overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              title="精选作品"
              //subtitle="作品"
              description="「每一个作品，都是一次思考的具象化。从概念到落地，记录设计如何转化为真实的用户体验」"
            />
          </ScrollRevealTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-y-8 gap-y-4">
            {(() => {
              // 只显示这四个特定项目（请替换为实际slug）
              const featuredSlugs = [
                'networkRevision',
                'designSystem',
                'visualRedesign',
                'arcoDesign',
              ]
              return featuredSlugs.map((slug, index) => {
                const project = projects.find((p) => p.slug === slug)
                if (!project) return null
                return (
                  <div key={slug}>
                    <FadeInWhenVisible delay={index * 0.15} y={50}>
                      <WorkCard slug={slug} />
                    </FadeInWhenVisible>
                  </div>
                )
              })
            })()}
          </div>
          <div className="flex sm:hidden justify-center mt-4">
            <InteractiveHoverButton href="/projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
          <div className="hidden sm:flex items-center gap-10">
            {/* 左侧文本 */}
            <span className="text-2xl text-zinc-400">⊹</span>

            {/* 中间自适应分割线 */}
            <div className="flex-1 h-[1px] bg-zinc-200"></div>

            {/* 右侧按钮 */}
            <InteractiveHoverButton href="/projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* Handwritten notes */}
      <section className="py-20 lg:py-40 bg-black rounded-3xl overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              theme="dark"
              title="生活片段"
              description="「生活中零散的片段，简单却真实，悄悄记录着每一个温暖的瞬间」"
            />
          </ScrollRevealTitle>
          <div
            style={{ height: '550px', position: 'relative' }}
            className="mt-4"
          >
            <CircularGallery bend={0} borderRadius={0.04} />
          </div>
        </div>
      </section>

      {/* Blog Summary */}
      <section className="pt-20 lg:pt-40 pb-20 bg-zinc-50 rounded-3xl text-white overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 space-y-20">
          <ScrollRevealTitle>
            <SectionTitle
              title="最近写下"
              description="「关于设计的思考、工具的探索、以及行业的见闻。这里记录着我的持续理解与表达」"
            />
          </ScrollRevealTitle>
          {(() => {
            // Manual featured blog selection by slug
            const featuredBlogSlugs = [
              'design-system1',
              'my-first-personal-website',
              'figma-component-library',
            ]
            const featuredBlogs = featuredBlogSlugs
              .map((slug) => blogs.find((b) => b.slug === slug))
              .filter(Boolean) as typeof blogs
            return (
              <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:gap-4">
                <div className="w-full lg:w-1/2">
                  <FadeInWhenVisible
                    key={featuredBlogs[0]?.slug}
                    delay={0.2}
                    y={50}
                  >
                    <BlogSnippet
                      slug={featuredBlogs[0]?.slug ?? ''}
                      layout="vertical"
                      size="large"
                      imgHeight="h-[240px] sm:h-[320px] lg:h-[480px]"
                    />
                  </FadeInWhenVisible>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col lg:flex-row gap-4">
                  {featuredBlogs.slice(1).map((blog, idx) => (
                    <div className="w-full lg:w-1/2" key={blog?.slug}>
                      <FadeInWhenVisible delay={0.3 + idx * 0.1} y={50}>
                        <BlogSnippet
                          slug={blog?.slug ?? ''}
                          layout="vertical"
                          size="large"
                          imgHeight="h-[240px] sm:h-[320px] lg:h-[320px]"
                        />
                      </FadeInWhenVisible>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
          <div className="flex sm:hidden justify-center mt-4">
            <InteractiveHoverButton href="/projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
          <div className="hidden sm:flex items-center gap-10">
            {/* 左侧文本 */}
            <span className="text-2xl text-zinc-400">⊹</span>

            {/* 中间自适应分割线 */}
            <div className="flex-1 h-[1px] bg-zinc-200"></div>

            {/* 右侧按钮 */}
            <InteractiveHoverButton href="/projects" lightTheme>
              查看全部
            </InteractiveHoverButton>
          </div>
        </div>
      </section>

      {/* 订阅 */}
      <section
        ref={contactRef}
        className="relative w-full text-white py-30 sm:py-40"
      >
        <div className="absolute bg-black rounded-b-3xl overflow-hidden inset-0">
          <motion.div
            style={{ x, scale, rotate, rotateX, rotateY }}
            className="w-full h-full relative will-change-transform"
          >
            <Image
              src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/Contact.webp"
              alt="bg"
              fill
              className="object-cover opacity-40"
            />
          </motion.div>
        </div>

        <div className="max-w-lg mx-auto gap-8 px-8 space-y-8 flex-row items-center h-full relative z-10">
          <FadeInWhenVisible delay={0.1} y={50} once={false}>
            <p className="text-5xl sm:text-6xl font-bold text-center">
              订阅我的网站
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.2} y={50} once={false}>
            <PlaceholdersAndVanishInput
              placeholders={[
                '请在这里留下您的邮箱',
                '有更新会第一时间收到通知',
              ]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                console.log(e.target.value)
              }
            />
          </FadeInWhenVisible>
        </div>
      </section>
    </div>
  )
}

export default Home
