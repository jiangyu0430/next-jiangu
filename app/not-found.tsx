'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Lottie from 'lottie-react'
import animationData from '../public/Lottie/404.json'
import { InteractiveHoverButton } from '@/components/InteractiveHoverButton'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white rounded-b-3xl text-black px-4">
      <Lottie animationData={animationData} loop className="w-64 h-64 " />
      <p className="text-lg -mt-4 mb-4">抱歉，您访问的内容还未落地</p>
      <InteractiveHoverButton href="/">返回首页</InteractiveHoverButton>
    </div>
  )
}
