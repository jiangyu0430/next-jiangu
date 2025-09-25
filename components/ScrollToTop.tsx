'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// 公共 hook：封装滚动到顶部
export function useScrollToTop() {
  return () => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, behavior: 'smooth' }) // 平滑滚动
  }
}

// 自动监听 pathname 的组件
export default function ScrollToTop(): JSX.Element | null {
  const pathname = usePathname()
  const scrollToTop = useScrollToTop()

  useEffect(() => {
    scrollToTop()
  }, [pathname])

  return null
}
