'use client'

// ================================
// 工具函数：计算从指定年月到当前日期的年份数（四舍五入取整）
// ================================
function calculateYearsSinceRounded(year: number, month: number): number {
  const now = new Date()
  const yearsDiff = now.getFullYear() - year
  const monthsDiff = now.getMonth() + 1 - month
  const totalYears = yearsDiff + monthsDiff / 12
  return Math.round(totalYears)
}

import React from 'react'
import Image from 'next/image' // 引入 next/image 组件
import Lottie from 'lottie-react'
import loadingAnimation from '@/public/Lottie/loading.json'
import CountUp from './CountUp'

// ================================
// 卡片组件：统一样式
// ================================
export const Card = ({
  children,
  className,
  noPadding = false, // 控制是否去掉内边距
}: {
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}) => (
  <div
    className={`bg-white text-gray-900 rounded-2xl overflow-hidden relative ${
      noPadding ? '' : 'p-12'
    } ${className ?? ''}`}
  >
    {children}
  </div>
)

// ================================
// 响应式布局组件
// ================================
export const ResponsiveCardLayout = () => {
  return (
    <>
      {/* 桌面端布局（xl及以上） */}
      <div className="hidden xl:grid xl:grid-cols-3 xl:grid-rows-2 gap-5 px-8 max-w-screen-2xl mx-auto">
        {/* A卡片 */}
        <Card className="h-[400px]">
          <div className="absolute -bottom-15 -right-14 ">
            <Image src="/Quote.svg" alt="Quote" width={280} height={280} />
          </div>
          <div className="text-[22px] font-medium">
            <p>People don’t know what they want until you show it to them.</p>
            <div className="flex items-center mt-8 gap-3">
              <Image
                src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/steveJobs.jpg"
                alt="Steve Jobs"
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <div className="font-medium text-lg">Steve Jobs</div>
                <div className="text-sm text-zinc-500">Founder of Apple</div>
              </div>
            </div>
          </div>
        </Card>

        {/* B卡片 */}
        <Card className="h-[400px] flex flex-col justify-between">
          <div className="flex justify-between items-center gap-2">
            <div className="text-lg font-medium">工作经验</div>
            <div className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5" // 控制大小
              >
                <path d="M4 5V16H20V5H4ZM2 4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V18H2V4.00748ZM1 19H23V21H1V19Z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline text-5xl mb-4">
              {/* 使用工具函数 calculateYearsSinceRounded */}
              <CountUp
                from={0}
                to={calculateYearsSinceRounded(2020, 4)}
                direction="up"
                duration={0.2}
                delay={0.4}
                className="count-up-text text-9xl font-Oswald"
              />
              +
            </div>
            <div className="text-zinc-500 text-base leading-relaxed text-justify">
              2020 年毕业参加工作，主导过智能制造、云计算存储等 B
              端产品设计工作，覆盖设计全流程
            </div>
          </div>
        </Card>

        {/* C卡片 */}
        <Card className="h-[400px]" noPadding>
          <Image
            src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/image01.jpg"
            alt="C"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-2xl"
            priority
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: 'linear-gradient(180deg, #2f313000, #17171733 146%)',
            }}
          ></div>
        </Card>

        {/* D 占两列宽度 */}
        <Card className="col-span-2 h-[400px]">D</Card>

        {/* E卡片 */}
        <Card className="h-[400px] flex flex-col justify-between">
          <div className="flex justify-between items-center gap-2">
            <div className="text-lg font-medium">累积项目</div>
            <div className="bg-zinc-100 text-zinc-800 px-4 py-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5" // 控制大小
              >
                <path d="M12.4142 5H21C21.5523 5 22 5.44772 22 6V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5ZM20 11H4V19H20V11ZM20 9V7H11.5858L9.58579 5H4V9H20Z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline text-5xl mb-4">
              <CountUp
                from={0}
                to={25}
                direction="up"
                duration={0.3}
                delay={0.4}
                className="count-up-text text-9xl font-Oswald"
              />
              +
            </div>
            <div className="text-zinc-500 text-base leading-relaxed text-justify">
              深度参与多款核心产品设计项目，统筹设计落地与跨团队协同，把控项目设计交付节奏
            </div>
          </div>
        </Card>
      </div>

      {/* Pad端布局（md ~ xl） */}
      <div className="hidden md:flex xl:hidden flex-col gap-5 px-8 max-w-screen-2xl mx-auto">
        {/* 第一行：C 独占 */}
        <Card className="h-[400px]" noPadding>
          <Image
            src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/image01.jpg"
            alt="C"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-2xl"
            priority
          />
        </Card>

        {/* 第二行：左 B+E 垂直排列，右 A */}
        <div className="flex gap-5 h-[400px]">
          {/* 左列：B+E 垂直排列 */}
          <div className="flex flex-col gap-4 flex-1">
            <Card className="flex-1">B</Card>
            <Card className="flex-1">E</Card>
          </div>
          {/* 右列：A，高度等于左列 */}
          <Card className="flex-1">
            <div>
              <p>Thoughtful design that moves the needle</p>
            </div>
            <div className="absolute -bottom-14 -right-14 ">
              <Image src="/Quote.svg" alt="Quote" width={280} height={280} />
            </div>
          </Card>
        </div>

        {/* 第三行：D 独占 */}
        <Card className="h-[400px]">D</Card>
      </div>

      {/* 移动端布局（< md） */}
      <div className="flex flex-col gap-4 md:hidden px-4 max-w-screen-2xl mx-auto">
        <Card className="h-[320px]">A</Card>
        <Card className="h-[320px]">B</Card>
        <Card className="h-[320px]" noPadding>
          <Image
            src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/image01.jpg"
            alt="C"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-2xl"
            priority
          />
        </Card>
        <Card className="h-[320px]">D</Card>
        <Card className="h-[320px]">E</Card>
      </div>
    </>
  )
}
