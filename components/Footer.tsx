'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useScrollToTop } from '@/components/ScrollToTop'

const Footer = () => {
  // 平滑滚动到顶部
  const scrollToTop = useScrollToTop()

  // 提取左侧 A 区域的链接为数组，方便维护和渲染
  const links = [
    { href: '/', label: '首页' },
    { href: '/projects', label: '项目集' },
    { href: '/notes', label: '随手记' },
    { href: '/about', label: '关于我' },
    { href: '/contact', label: '联系我' },
    { href: '/404', label: '404' },
    { href: 'https://www.figma.com/@wittyu', label: 'Figma' },
  ]

  return (
    <footer className="sticky bottom-0 bg-black flex flex-col items-center">
      <div className="w-full relative bg-gray-50">
        {/* 主信息区：左右等分布局 */}
        <div className="max-w-screen-2xl mx-auto flex justify-between items-stretch relative py-20 px-4 sm:px-8">
          {/* 左侧：A/B 两块 */}
          <div className="flex flex-1">
            {/* A 区域：Link */}
            <div className="flex-1 flex-col">
              <div className="text-base mb-6 text-gray-600">链接</div>
              <nav className="flex flex-col gap-3 text-gray-950 font-medium text-lg">
                {links.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 group w-max hover:text-indigo-600"
                  >
                    {label}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 transform transition-transform duration-0 group-hover:animate-spin-once"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                    </svg>
                  </a>
                ))}
              </nav>
            </div>
            {/* B 区域：Get in touch */}
            <div className="flex-1 flex-col">
              <div className="text-base mb-6 text-gray-600">通讯</div>
              <div className="flex flex-col gap-3 text-gray-950 font-medium text-lg">
                <a
                  href="mailto:shijiangyua@gmail.com"
                  className="hover:ml-1 hover:text-indigo-600 duration-200 ease-in w-max"
                >
                  shijiangyua@gmail.com
                </a>{' '}
                <span>中国 · 深圳</span>
              </div>
            </div>
          </div>
          {/* 右侧：返回顶部按钮 */}
          <div className="flex items-start justify-end flex-1">
            <button
              onClick={scrollToTop}
              className="text-base text-gray-950 hover:text-indigo-600 transition flex items-center gap-1 cursor-pointer group"
            >
              返回顶部
              <span className="relative h-5 w-5 overflow-hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute top-0 left-0 transition-transform duration-300 group-hover:-translate-y-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 absolute top-5 left-0 transition-transform duration-300 group-hover:-translate-y-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
        {/* 剪刀视频区，绝对定位 */}
        <div className="flex items-center justify-center absolute bottom-[-8px] h-[16px] left-0 w-full overflow-hidden bg-[#CED6DB]">
          <div
            style={{
              backgroundImage: "url('/scissors_bg.png')",
              backgroundRepeat: 'repeat-x',
              backgroundSize: '8px 16px',
              width: '100%',
              height: '16px',
              display: 'block',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              animation: 'move-video-x 36s linear infinite',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
            }}
          >
            <video
              src="/scissors.mp4"
              loop
              preload="auto"
              muted
              playsInline
              autoPlay
              style={{
                cursor: 'auto',
                width: '28px',
                borderRadius: '0px',
                display: 'block',
                objectFit: 'cover',
                backgroundColor: 'rgba(0,0,0,0)',
                objectPosition: '50% 50%',
                height: '15px',
              }}
            />
          </div>
          {/* Keyframes for video movement */}
          <style>
            {`
              @keyframes move-video-x {
                0% { left: -28px; }
                100% { left: 100%; }
              }
            `}
          </style>
        </div>
      </div>

      <div className="w-full h-auto">
        <div className="bg-indigo-100 h-3"></div>
        <div className="bg-indigo-300 h-3"></div>
        <div className="bg-indigo-400 h-3"></div>
        <div className="bg-indigo-500 h-3"></div>
      </div>

      {/* 主体版权与备案信息 */}
      <div className="w-full px-8 h-10 flex items-end justify-between text-white relative overflow-hidden">
        {/* 左侧版权信息 */}
        <div className="text-sm text-white/60">
          © {new Date().getFullYear()} Jiangyu. All rights reserved.
        </div>
        {/* 右侧备案信息 */}
        <div className="flex items-center gap-1 text-sm text-white/60">
          <div className="flex items-center gap-2 hover:text-white">
            <Image
              src="https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/record.png"
              alt="备案"
              width={16}
              height={16}
              className="h-4"
            />
            <a
              href="https://beian.mps.gov.cn/#/query/webSearch?code=37028302000916"
              target="_blank"
              rel="noreferrer"
            >
              鲁公网安备37028302000916号
            </a>
          </div>
          ｜
          <div className="hover:text-white">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noreferrer"
            >
              鲁ICP备2025178340号-1
            </a>
          </div>
        </div>
      </div>

      {/* 动态等宽文本，使用 SVG text 实现 */}
      <div className="w-full relative px-8" style={{ position: 'relative' }}>
        <Image
          src="/JIANGYU.svg"
          alt="JIANGYU"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </footer>
  )
}

export default Footer
