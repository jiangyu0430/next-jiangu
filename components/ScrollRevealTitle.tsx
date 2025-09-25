import { motion, useMotionValue } from 'framer-motion'
import { useRef, useEffect } from 'react'

interface ScrollRevealTitleProps {
  /** 需要进行滚动显示的子元素 */
  children: React.ReactNode
  /** 元素初始的垂直位移，负值表示向上偏移 */
  offsetY?: number
  /** 元素初始缩放值 */
  initialScale?: number
  /** 元素完成动画所需的滚动距离（单位：px） */
  scrollDistance?: number
  /** 是否启用缩放效果 */
  enableScale?: boolean
}

export default function ScrollRevealTitle({
  children, // 需要进行滚动显示的子元素
  offsetY = -500, // 元素初始的垂直位移，负值表示向上偏移
  initialScale = 1.3, // 元素初始缩放值
  scrollDistance = 180, // 元素完成动画所需的滚动距离（单位：px）
  enableScale = true, // 是否启用缩放效果
}: ScrollRevealTitleProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const y = useMotionValue(offsetY)
  const scale = useMotionValue(initialScale)

  const lerp = (current: number, target: number, t: number) =>
    current + (target - current) * t

  const round = (value: number, precision = 3) =>
    Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision)

  useEffect(() => {
    if (!containerRef.current) return

    let rafId: number

    const update = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const progress = Math.min(
        Math.max((viewportHeight - rect.top) / scrollDistance, 0),
        1
      )

      const targetY = offsetY * (1 - progress)
      const roundedTargetY = round(targetY)
      const roundedY = round(y.get())

      if (Math.abs(roundedY - roundedTargetY) < 0.5) {
        y.set(roundedTargetY)
      } else {
        y.set(lerp(y.get(), roundedTargetY, 0.2))
      }
      if (enableScale) {
        const targetScale = initialScale - (initialScale - 1) * progress
        const roundedTargetScale = round(targetScale)
        const roundedScale = round(scale.get())
        scale.set(lerp(roundedScale, roundedTargetScale, 0.2))
      } else {
        scale.set(1)
      }

      rafId = requestAnimationFrame(update)
    }

    update() // start RAF loop

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [offsetY, initialScale, scrollDistance, enableScale])

  return (
    <motion.div ref={containerRef} style={{ y, scale }}>
      {children}
    </motion.div>
  )
}
