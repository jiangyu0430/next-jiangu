//悬停时播放js动画

'use client'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useRef, useEffect } from 'react'

interface HoverLottieIconProps {
  animationData: object // 传入的 Lottie JSON
  size?: number // 尺寸（宽高相等）
  loop?: boolean // 是否循环播放，默认 false
  href?: string // 点击跳转链接（新标签）
  autoplay?: boolean // 是否自动播放
}

export default function HoverLottieIcon({
  animationData,
  size = 64,
  loop = false,
  href,
  autoplay = false,
}: HoverLottieIconProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (autoplay) {
      lottieRef.current?.play()
    }
  }, [autoplay])

  const handleClick = () => {
    if (href) {
      window.open(href, '_blank')
    }
  }

  return (
    <div
      className="cursor-pointer"
      style={{ width: size, height: size }}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      onClick={handleClick}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={loop}
        autoplay={false}
      />
    </div>
  )
}
