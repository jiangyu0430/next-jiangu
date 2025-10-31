'use client'

import React from 'react'
import Lottie from 'lottie-react'
import loadingAnimation from '@/public/Lottie/loading.json'
import failedAnimation from '@/public/Lottie/flipbook.json'

interface ContentPlaceholderProps {
  type: 'loading' | 'failed'
}

const ContentPlaceholder: React.FC<ContentPlaceholderProps> = ({ type }) => {
  const animation = type === 'loading' ? loadingAnimation : failedAnimation
  const message = type === 'loading' ? '加载中...' : '内容还在准备中，敬请期待'

  return (
    <div className="text-center py-20 flex flex-col items-center">
      <div className="w-40 h-30  flex items-center justify-center">
        <Lottie animationData={animation} loop={true} />
      </div>
      <div className="text-gray-700 dark:text-zinc-300 text-lg">{message}</div>
    </div>
  )
}

export default ContentPlaceholder
