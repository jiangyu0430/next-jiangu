'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import SectionTitle from '@/components/SectionTitle'
import ScrollRevealTitle from '@/components/ScrollRevealTitle'
import {
  number,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from 'framer-motion'
import { ChangeEvent } from 'react'
import { PlaceholdersAndVanishInput } from '@/components/PlaceholdersAndVanishInput'
import FAQ from '@/components/Faq'
import { InteractiveHoverButton } from '@/components/InteractiveHoverButton'
import CountUp from '@/components/CountUp'
import { Highlighter } from '@/components/Highlighter'
import HoverLottieIcon from '@/components/HoverLottieIcon'
import behanceAnimation from '@/public/Lottie/behance.json'
import dribbbleAnimation from '@/public/Lottie/dribbble.json'
import twitterAnimation from '@/public/Lottie/twitter.json'

// 工具函数：计算从指定年月到当前日期的年份数（四舍五入取整）
function calculateYearsSinceRounded(year: number, month: number): number {
  const now = new Date()
  const yearsDiff = now.getFullYear() - year
  const monthsDiff = now.getMonth() + 1 - month
  const totalYears = yearsDiff + monthsDiff / 12
  return Math.round(totalYears)
}

export default function About() {
  const contactRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: contactRef,
    offset: ['start end', 'end start'],
  })

  const x = useTransform(scrollYProgress, [0, 0.6], [29, 0])
  const scale = useTransform(scrollYProgress, [0, 0.6], [3.3, 1])
  const rotate = useTransform(scrollYProgress, [0, 0.6], [20, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [27, 0])
  const rotateY = useTransform(scrollYProgress, [0, 0.6], [-54, 0])
  const experiences = [
    {
      id: 1,
      text: 'KENGIC',
      number: '01',
      position: 'UI designer',
      bgColor: 'bg-indigo-100',
      date: '2020.3-2023.3',
    },
    {
      id: 2,
      text: 'XSKY',
      number: '02',
      position: 'Product designer',
      bgColor: 'bg-indigo-200',
      date: '2023.3-2024.12',
    },
    {
      id: 3,
      text: 'ABCDEF',
      number: '03',
      position: 'Product designer',
      bgColor: 'bg-indigo-300',
      date: '2025.5-now',
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (index: number) =>
    setOpenIndex(openIndex === index ? null : index)

  const { scrollYProgress: workScrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  })
  const workScale = useTransform(workScrollYProgress, [0, 0.5], [1.8, 1])

  return (
    <div className="w-full bg-white rounded-b-3xl overflow-hidden">
      {/* 简介区 */}
      <section className="pt-25 pb-25 h-auto lg:h-screen lg:min-h-[1000px] bg-white  overflow-hidden rounded-b-3xl">
        <FadeInWhenVisible delay={0.1} forceVisible={true} once>
          <div className="text-6xl font-bold max-w-screen-2xl mx-auto px-8 mb-10 text-center md:text-left opacity-10">
            关于我
          </div>
        </FadeInWhenVisible>
        <FadeInWhenVisible delay={0.2} forceVisible={true} once>
          <div className="max-w-screen-2xl mx-auto px-8 flex flex-col lg:flex-row gap-8 lg:gap-20 text-lg">
            {/* 左侧文本内容 */}
            <div className="w-full lg:w-3/5 h-auto flex flex-col text-zinc-800 text-justify leading-relaxed space-y-4 opacity-10">
              <p>
                👋 Hi, 我是
                <Highlighter action="underline" color="#87CEFA">
                  姜宇
                </Highlighter>
                ，一名产品设计师和开发爱好者。
              </p>
              <p>
                1997
                年出生于山东青岛，从小就热衷于发现问题、奇思妙想，并一直以成为设计师的梦想努力。
                2020 年毕业参加工作，具有 5 年工作经验 —— 对 B
                端设计具备一定深度的认知和思考，有责任感和自驱力。
              </p>
              <p>
                I believe that great design goes beyond aesthetics—it solves
                problems, simplifies complexity, and delivers meaningful
                experiences. From concept to final execution, I ensure every
                project is strategically crafted to leave a lasting impact
              </p>
            </div>

            {/* 右侧图片 */}
            <div className="w-full lg:w-2/5 mx-auto md:mx-0 flex flex-col justify-center">
              <div className="w-full flex h-[480px] lg:h-[620px] rounded-lg overflow-hidden items-center justify-center">
                <Image
                  src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/image01.jpg"
                  alt="个人图片"
                  width={1600}
                  height={900}
                  className="object-cover w-full h-full rounded-3xl"
                />
              </div>
              <div className="mt-6 flex gap-4">
                <div className="bg-zinc-100 pt-2 p-3 rounded-lg items-center justify-center flex cursor-pointer hover:bg-zinc-200">
                  <HoverLottieIcon
                    animationData={twitterAnimation}
                    size={32}
                    //href="/404"
                  />
                </div>
                <div className="bg-zinc-100 p-3 rounded-lg items-center justify-center flex cursor-pointer hover:bg-zinc-200">
                  <HoverLottieIcon
                    animationData={dribbbleAnimation}
                    size={32}
                    //href="/404"
                  />
                </div>
                <div className="bg-zinc-100 p-3 rounded-lg items-center justify-center flex cursor-pointer hover:bg-zinc-200">
                  <HoverLottieIcon
                    animationData={behanceAnimation}
                    size={32}
                    //href="/404"
                  />
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* 工作经历区 */}
      <section className="pt-20 lg:pt-40 overflow-hidden rounded-3xl relative bg-white">
        {/* 背景图片 */}
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{ scale: workScale, y: -220 }}
        >
          <Image
            src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/WorkExperience_bg.webp"
            alt="工作经历背景"
            fill
            className="object-cover object-top w-full h-full"
          />
        </motion.div>

        <div className="relative">
          <ScrollRevealTitle>
            <SectionTitle
              title="过往经历"
              description="「每一次尝试都是新的体验，每一段经历都是成长的印记」"
              theme="dark"
            />
          </ScrollRevealTitle>

          {/* 栅格内容 */}
          <div className="mt-25 grid grid-cols-4 border-y border-white/15 h-240 gap-x-0 gap-y-0 text-white">
            {/* 1卡片 */}
            <div className="relative flex flex-col gap-12 items-start justify-end border-r-1 border-b-1 border-white/15 h-full p-16">
              <div className="flex items-baseline text-5xl">
                <CountUp
                  from={0}
                  to={calculateYearsSinceRounded(2020, 4)}
                  direction="up"
                  duration={0.1}
                  delay={0.2}
                  once={false}
                  className="count-up-text text-9xl font-Oswald"
                />
                +
              </div>
              <div className="text-zinc-300">
                <p className="text-xl font-medium text-white mb-4">
                  precision.
                </p>
                <p>
                  Across web, product, and identity — each one built with care
                  and
                </p>
              </div>
            </div>
            <div className="relative border-r-1 border-b-1 border-white/15 h-full"></div>

            {/* 3卡片 */}
            <div className="relative flex flex-col gap-12 items-start justify-end border-r-1 border-b-1 border-white/15 h-full p-16">
              <div className="flex items-baseline text-5xl">
                <CountUp
                  from={0}
                  to={calculateYearsSinceRounded(2020, 4)}
                  direction="up"
                  duration={0.1}
                  delay={0.2}
                  once={false}
                  className="count-up-text text-9xl font-Oswald"
                />
                +
              </div>
              <div className="text-zinc-300">
                <p className="text-xl font-medium text-white mb-4">
                  precision.
                </p>
                <p>
                  Across web, product, and identity — each one built with care
                  and
                </p>
              </div>
            </div>
            <div className="relative border-r-1 border-b-1 border-white/15 h-full"></div>
            <div className="relative border-r-1 border-white/15 h-full"></div>

            {/* 5卡片 */}
            <div className="relative flex flex-col gap-12 items-start justify-end border-r-1 border-white/15 h-full p-16">
              <div className="flex items-baseline text-5xl">
                <CountUp
                  from={0}
                  to={calculateYearsSinceRounded(2020, 4)}
                  direction="up"
                  duration={0.1}
                  delay={0.2}
                  once={false}
                  className="count-up-text text-9xl font-Oswald"
                />
                +
              </div>
              <div className="text-zinc-300">
                <p className="text-xl font-medium text-white mb-4">
                  precision.
                </p>
                <p>
                  Across web, product, and identity — each one built with care
                  and
                </p>
              </div>
            </div>
            <div className="relative border-r-1 border-white/15 h-full"></div>

            {/* 8卡片 */}
            <div className="relative flex flex-col gap-12 items-start justify-end border-r-1 border-white/15 h-full p-16">
              <div className="flex items-baseline text-5xl">
                <CountUp
                  from={0}
                  to={43}
                  direction="up"
                  duration={0.2}
                  delay={0.2}
                  once={false}
                  className="count-up-text text-9xl font-Oswald"
                />
                +
              </div>
              <div className="text-zinc-300">
                <p className="text-xl font-medium text-white mb-4">
                  precision.
                </p>
                <p>
                  Across web, product, and identity — each one built with care
                  and
                </p>
              </div>
            </div>
          </div>
          {/* 无限滚动区 */}
          <motion.div
            className="flex whitespace-nowrap text-white/20 text-[320px] font-Oswald will-change-transform"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 20,
            }}
          >
            <span>
              {Array.from({ length: 20 }).map((_, i) => (
                <React.Fragment key={i}>
                  JIANGYU
                  <span className="text-[150px] inline-block -translate-y-35">
                    ™
                  </span>
                  —
                </React.Fragment>
              ))}
            </span>
            <span>
              {Array.from({ length: 20 }).map((_, i) => (
                <React.Fragment key={i}>
                  JIANGYU
                  <span className="text-[150px] inline-block -translate-y-35">
                    ™
                  </span>
                  —
                </React.Fragment>
              ))}
            </span>
          </motion.div>

          {/* 经历明细 */}
          <div>
            {experiences.map(
              ({ id, text, number, position, bgColor, date }) => (
                <div
                  key={id}
                  className={`relative group ${
                    id === experiences[experiences.length - 1].id
                      ? 'rounded-b-3xl overflow-hidden'
                      : ''
                  }`}
                >
                  <div
                    className={`absolute w-screen left-1/2 -translate-x-1/2 ${bgColor} h-full top-0 bottom-0 z-0`}
                  />
                  <div className="max-w-screen-2xl mx-auto px-8 py-7 relative z-10 flex justify-between text-4xl font-medium items-center overflow-hidden">
                    <div className="flex flex-1 items-end">
                      <div className="w-1/3 text-black">{text}</div>
                      <div className="w-1/2 ">{position}</div>
                    </div>
                    <div className="absolute right-8 top-5 flex flex-col items-end overflow-hidden">
                      <span
                        className={`text-8xl font-Oswald bg-gradient-to-t from-white/0 to-white/80 bg-clip-text text-transparent transition-transform duration-500 delay-300 group-hover:-translate-y-24 ${
                          number === '01' ? 'tracking-wider' : ''
                        }`}
                      >
                        {number}
                      </span>
                      <span className="translate-y-10 opacity-0 transition-all duration-500 delay-300 group-hover:-translate-y-[86px] group-hover:opacity-100">
                        {date}
                      </span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-black">
        <div className="bg-white py-20 lg:py-40 rounded-b-3xl">
          <div className="max-w-screen-2xl mx-auto px-8 flex flex-col lg:flex-row gap-12">
            {/* 左侧标题区 */}
            <div className="w-full lg:w-1/3">
              <FadeInWhenVisible delay={0}>
                <div className="space-y-6">
                  <p className="lg:text-9xl text-7xl font-medium font-[ApfelGrotezk] ">
                    FAQ
                  </p>
                  <p className="text-lg leading-[1.5] font-normal text-zinc-700 w-full lg:max-w-[400px]">
                    这里整理了常见的问题与回答，从工作流程到设计思考，帮助你更快了解我
                  </p>
                  <InteractiveHoverButton
                    href="/contact"
                    lightTheme
                    className="inline-flex"
                  >
                    有疑问 ？
                  </InteractiveHoverButton>
                </div>
              </FadeInWhenVisible>
            </div>
            {/* 右侧内容区 */}
            <div className="w-full lg:w-2/3">
              <FAQ
                items={[
                  {
                    question: '该网站是你自己搭建的吗 ？',
                    answer: (
                      <>
                        <p>
                          是的，该网站完全由我自主搭建，过程中以 ChatGPT
                          作为辅助工具。使用 Next.js 提供服务端渲染能力，搭配
                          React 组件化和 Tailwind 样式。
                        </p>
                        如果你也对此感兴趣，可以参考我的文章 —{' '}
                        <a
                          href="/blogdetail/my-first-personal-website"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-700 hover:underline"
                        >
                          AI时代，设计师也能独立建站
                        </a>
                      </>
                    ),
                  },
                  {
                    question: '工作以来一直从事 ToB 行业吗 ？',
                    answer: (
                      <>
                        是的，我一直在从事 B
                        端设计工作，因为它更强调思维的系统性和分析能力。B
                        端产品涉及复杂业务和数据，我喜欢在设计中梳理清晰的逻辑、分析用户行为和业务流程，并通过界面和交互让操作高效可控。
                      </>
                    ),
                  },
                  {
                    question: '你是怎么看待用户体验的 ？',
                    answer:
                      '对我来说，用户体验就是让用户顺利完成任务、感到操作自然和高效。工作当中，会尤其关注信息清晰、操作逻辑合理和流程可控，通过分析用户行为、优化界面和不断迭代，让复杂业务变得更易用。',
                  },
                  {
                    question: '在团队中的工作流程是怎样的 ？',
                    answer: (
                      <>
                        <p>
                          需求讨论 -&gt; PRD 澄清 -&gt; 设计产出（设计定义 &amp;
                          设计输出） -&gt; 设计自查与评审 -&gt; 设计澄清 -&gt;
                          开发软设 &amp; 测试策略澄清 -&gt; 开发后走查验收 -&gt;
                          版本末复盘。
                        </p>
                        <div className="mt-4 space-y-2">
                          <p>
                            <strong>设计定义：</strong> 根据实际需要产出 user
                            story、概念理解、设计边界、竞品调研、原型图、流程图、框架图等，用于建立对问题和方案的整体认知。
                          </p>
                          <p>
                            <strong>设计输出：</strong>{' '}
                            交付带有交互说明的视觉稿，确保开发和测试能够准确理解设计细节。
                          </p>
                        </div>
                      </>
                    ),
                  },
                  {
                    question: '在工作中该如何提效 ？',
                    answer:
                      '我觉得提效不仅是做事快，更是通过系统化方法减少重复和浪费。比如，先梳理业务流程和设计目标，明确优先级；同时利用设计体系和可复用组件库减少重复劳动；在协作上，通过早期评审、清晰的文档和跨团队沟通，降低返工成本；整个过程中，也需要结合数据和用户行为不断迭代，让设计既高效又精准。',
                  },
                ]}
              />
            </div>
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
