'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true, // 自动 requestAnimationFrame
      smoothWheel: true, // 平滑滚轮
      lerp: 0.085, // 插值，数值越大，滚动越平滑
      wheelMultiplier: 1.04, // 滚轮速度
    })

    // 监听滚动事件（调试可用）
    lenis.on('scroll', (e: any) => {
      // console.log(e);
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
