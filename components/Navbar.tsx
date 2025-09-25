'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import StaggeredMenu from './StaggeredMenu'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const navRef = useRef(null)
  const { scrollY } = useScroll({ target: navRef })

  const gridRef = useRef(null)
  const logoRef = useRef(null)
  const TRAVEL = 600 // 像素滚动距离对应完整过渡，用于控制 logo 状态切换动画触发阈值
  const HOME_NAV_HIDE_THRESHOLD = 2000 // 首页导航隐藏的滚动阈值
  const OTHER_NAV_HIDE_THRESHOLD = 40 // 其他页面导航隐藏的滚动阈值

  const [logoState, setLogoState] = useState(isHome ? 'centered' : 'scrolled') // 'centered' 或 'scrolled'

  // 新增：首页进入时为 false，其他页面为 true
  const [logoMotionDone, setLogoMotionDone] = useState(!isHome)
  useEffect(() => {
    setLogoMotionDone(!isHome)
  }, [isHome])

  // 监听 pathname 初始化 logoState
  useEffect(() => {
    if (isHome) {
      setLogoState('centered') // 首页初始化动画前状态
    } else {
      setLogoState('scrolled') // 其他页面直接显示动画后状态
    }
  }, [pathname, isHome])

  // 滚动监听切换 logo 状态（仅首页）
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (isHome) {
      setLogoState(latest > TRAVEL ? 'scrolled' : 'centered')
    }
  })

  const [visible, setVisible] = useState(true)

  const lastScrollY = useRef(0)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setVisible(true)
    lastScrollY.current = latest
  })

  const matchProjects = pathname === '/projects'
  const matchNotes = pathname === '/notes'
  const matchAbout = pathname === '/about'

  const navItems = [
    { to: '/', label: '首页', isActive: pathname === '/' },
    { to: '/projects', label: '项目集', isActive: matchProjects },
    { to: '/notes', label: '随手记', isActive: matchNotes },
    { to: '/about', label: '关于我', isActive: matchAbout },
    { to: '/contact', label: '联系', isActive: pathname === '/contact' },
  ]

  return (
    <>
      <motion.header
        ref={navRef}
        className="fixed top-0 z-50 w-full"
        style={{
          mixBlendMode: 'difference',
        }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <div className="relative">
          {/* 导航内容 */}
          <div
            ref={gridRef}
            className={`w-full relative transition-all duration-300 grid gap-6 ${
              visible
                ? 'grid-cols-[auto_1fr_auto] grid-rows-1 items-center py-4 px-8'
                : 'grid-cols-[1fr] grid-rows-[auto_auto] items-center py-4 px-8'
            }`}
          >
            {/* 区块 A: Logo（状态驱动动画） */}
            <motion.div
              key={pathname}
              layout
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 50,
                mass: 1,
              }}
              ref={logoRef}
              onLayoutAnimationComplete={() => setLogoMotionDone(true)}
              className={`flex items-center ${
                logoState === 'scrolled' || !isHome
                  ? 'col-[1] row-[1] justify-self-start'
                  : 'col-span-1 row-[2] justify-self-center justify-center'
              }`}
            >
              {/* 文本 SVG */}
              {logoState === 'scrolled' || !isHome ? (
                <Link href="/" className="block">
                  <svg
                    className="w-auto transition-all ease-in-out"
                    style={{
                      width:
                        !isHome || logoState === 'scrolled' ? 'auto' : '95vw',
                      height:
                        !isHome || logoState === 'scrolled' ? '2rem' : 'auto',
                      //transition: 'width 10s ease, height 10s ease',
                    }}
                    viewBox="0 0 92 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.18772 19.6382C4.18246 19.6382 3.29926 19.451 2.53813 19.0766C1.777 18.6878 1.18102 18.119 0.750192 17.3702C0.333722 16.6214 0.125488 15.707 0.125488 14.627H3.33517C3.33517 15.0734 3.39979 15.455 3.52904 15.7718C3.67265 16.0886 3.8737 16.3334 4.1322 16.5062C4.3907 16.6646 4.7138 16.7438 5.10155 16.7438C5.47493 16.7438 5.7837 16.6718 6.02783 16.5278C6.27197 16.3694 6.45148 16.1462 6.56637 15.8582C6.68126 15.5702 6.7387 15.2246 6.7387 14.8214V4.25903H9.96992V14.8214C9.96992 16.391 9.53191 17.5862 8.65589 18.407C7.79423 19.2278 6.63817 19.6382 5.18772 19.6382Z" />
                    <path d="M12.6357 19.379V4.25903H15.867V19.379H12.6357Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.2207 19.3791H28.7957L27.6597 16.0744H22.0473L20.9114 19.3791H17.5293L23.0225 4.25928H26.7275L32.2207 19.3791ZM22.9085 13.5687H26.7985L24.8535 7.90938L22.9085 13.5687Z"
                    />
                    <path d="M33.8726 19.379V4.25903H37.1038L43.717 14.195V4.25903H46.948V19.379H43.717L37.1038 9.48623V19.379H33.8726Z" />
                    <path d="M56.2801 19.6384C54.844 19.6384 53.5874 19.3216 52.5104 18.688C51.4477 18.04 50.6219 17.14 50.0331 15.988C49.4443 14.836 49.1499 13.4896 49.1499 11.9488C49.1499 10.3936 49.4515 9.0184 50.0546 7.8232C50.6722 6.628 51.5554 5.692 52.7042 5.0152C53.8531 4.3384 55.2246 4 56.8187 4C58.6138 4 60.1001 4.432 61.2777 5.296C62.4697 6.16 63.238 7.3552 63.5827 8.8816H59.9853C59.7698 8.2768 59.3893 7.8088 58.8436 7.4776C58.3122 7.1464 57.6301 6.9808 56.7971 6.9808C55.8493 6.9808 55.0523 7.1896 54.406 7.6072C53.7598 8.0104 53.2715 8.5864 52.9412 9.3352C52.6109 10.0696 52.4457 10.9408 52.4457 11.9488C52.4457 12.9856 52.6109 13.864 52.9412 14.584C53.2715 15.304 53.7526 15.8512 54.3845 16.2256C55.0164 16.5856 55.7631 16.7656 56.6248 16.7656C57.8598 16.7656 58.7933 16.4416 59.4252 15.7936C60.0714 15.1456 60.4664 14.332 60.61 13.3528H57.0987V10.9336H63.8412V19.3792H60.8685L60.61 17.6296C60.3084 18.0616 59.9494 18.4288 59.5329 18.7312C59.1308 19.0336 58.6569 19.2568 58.1112 19.4008C57.5798 19.5592 56.9695 19.6384 56.2801 19.6384Z" />
                    <path d="M71.0162 10.8757L74.1196 4.25928H77.7383L72.6115 14.1953V19.3791H69.3802V14.1953L64.2319 4.25928H67.8941L71.0162 10.8757Z" />
                    <path d="M85.2002 19.6382C84.0657 19.6382 83.0317 19.415 82.0983 18.9686C81.1792 18.5078 80.4467 17.8238 79.901 16.9166C79.3697 16.0094 79.104 14.8646 79.104 13.4822V4.25903H82.3352V13.5038C82.3352 14.1806 82.4429 14.7566 82.6583 15.2318C82.8881 15.707 83.2184 16.067 83.6492 16.3118C84.0944 16.5422 84.6258 16.6574 85.2433 16.6574C85.8752 16.6574 86.4066 16.5422 86.8374 16.3118C87.2826 16.067 87.6201 15.707 87.8498 15.2318C88.0796 14.7566 88.1945 14.1806 88.1945 13.5038V4.25903H91.4257V13.4822C91.4257 14.8646 91.1385 16.0094 90.5641 16.9166C90.004 17.8238 89.25 18.5078 88.3022 18.9686C87.3687 19.415 86.3348 19.6382 85.2002 19.6382Z" />
                  </svg>
                </Link>
              ) : (
                <div className="pointer-events-none">
                  <svg
                    className="w-auto transition-all ease-in-out"
                    style={{
                      width:
                        !isHome || logoState === 'scrolled' ? 'auto' : '95vw',
                      height:
                        !isHome || logoState === 'scrolled' ? '2rem' : 'auto',
                      //transition: 'width 10s ease, height 10s ease',
                    }}
                    viewBox="0 0 92 24"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.18772 19.6382C4.18246 19.6382 3.29926 19.451 2.53813 19.0766C1.777 18.6878 1.18102 18.119 0.750192 17.3702C0.333722 16.6214 0.125488 15.707 0.125488 14.627H3.33517C3.33517 15.0734 3.39979 15.455 3.52904 15.7718C3.67265 16.0886 3.8737 16.3334 4.1322 16.5062C4.3907 16.6646 4.7138 16.7438 5.10155 16.7438C5.47493 16.7438 5.7837 16.6718 6.02783 16.5278C6.27197 16.3694 6.45148 16.1462 6.56637 15.8582C6.68126 15.5702 6.7387 15.2246 6.7387 14.8214V4.25903H9.96992V14.8214C9.96992 16.391 9.53191 17.5862 8.65589 18.407C7.79423 19.2278 6.63817 19.6382 5.18772 19.6382Z" />
                    <path d="M12.6357 19.379V4.25903H15.867V19.379H12.6357Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M32.2207 19.3791H28.7957L27.6597 16.0744H22.0473L20.9114 19.3791H17.5293L23.0225 4.25928H26.7275L32.2207 19.3791ZM22.9085 13.5687H26.7985L24.8535 7.90938L22.9085 13.5687Z"
                    />
                    <path d="M33.8726 19.379V4.25903H37.1038L43.717 14.195V4.25903H46.948V19.379H43.717L37.1038 9.48623V19.379H33.8726Z" />
                    <path d="M56.2801 19.6384C54.844 19.6384 53.5874 19.3216 52.5104 18.688C51.4477 18.04 50.6219 17.14 50.0331 15.988C49.4443 14.836 49.1499 13.4896 49.1499 11.9488C49.1499 10.3936 49.4515 9.0184 50.0546 7.8232C50.6722 6.628 51.5554 5.692 52.7042 5.0152C53.8531 4.3384 55.2246 4 56.8187 4C58.6138 4 60.1001 4.432 61.2777 5.296C62.4697 6.16 63.238 7.3552 63.5827 8.8816H59.9853C59.7698 8.2768 59.3893 7.8088 58.8436 7.4776C58.3122 7.1464 57.6301 6.9808 56.7971 6.9808C55.8493 6.9808 55.0523 7.1896 54.406 7.6072C53.7598 8.0104 53.2715 8.5864 52.9412 9.3352C52.6109 10.0696 52.4457 10.9408 52.4457 11.9488C52.4457 12.9856 52.6109 13.864 52.9412 14.584C53.2715 15.304 53.7526 15.8512 54.3845 16.2256C55.0164 16.5856 55.7631 16.7656 56.6248 16.7656C57.8598 16.7656 58.7933 16.4416 59.4252 15.7936C60.0714 15.1456 60.4664 14.332 60.61 13.3528H57.0987V10.9336H63.8412V19.3792H60.8685L60.61 17.6296C60.3084 18.0616 59.9494 18.4288 59.5329 18.7312C59.1308 19.0336 58.6569 19.2568 58.1112 19.4008C57.5798 19.5592 56.9695 19.6384 56.2801 19.6384Z" />
                    <path d="M71.0162 10.8757L74.1196 4.25928H77.7383L72.6115 14.1953V19.3791H69.3802V14.1953L64.2319 4.25928H67.8941L71.0162 10.8757Z" />
                    <path d="M85.2002 19.6382C84.0657 19.6382 83.0317 19.415 82.0983 18.9686C81.1792 18.5078 80.4467 17.8238 79.901 16.9166C79.3697 16.0094 79.104 14.8646 79.104 13.4822V4.25903H82.3352V13.5038C82.3352 14.1806 82.4429 14.7566 82.6583 15.2318C82.8881 15.707 83.2184 16.067 83.6492 16.3118C84.0944 16.5422 84.6258 16.6574 85.2433 16.6574C85.8752 16.6574 86.4066 16.5422 86.8374 16.3118C87.2826 16.067 87.6201 15.707 87.8498 15.2318C88.0796 14.7566 88.1945 14.1806 88.1945 13.5038V4.25903H91.4257V13.4822C91.4257 14.8646 91.1385 16.0094 90.5641 16.9166C90.004 17.8238 89.25 18.5078 88.3022 18.9686C87.3687 19.415 86.3348 19.6382 85.2002 19.6382Z" />
                  </svg>
                </div>
              )}
            </motion.div>

            {/* 中间导航（大屏） 和 主题切换合并 */}
            <motion.nav
              className="absolute top-4 hidden lg:flex items-center text-sm right-8"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '0',
              }}
              initial={false}
              animate={{
                width: isHome
                  ? logoState === 'centered'
                    ? '95%'
                    : '360px'
                  : '360px',
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 30 }}
            >
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.to}
                  className={`nav-item px-1 py-[6px] font-medium text-white ${
                    item.isActive ? 'active' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </motion.nav>
          </div>
        </div>
      </motion.header>
    </>
  )
}
