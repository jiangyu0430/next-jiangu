//文本划线
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { annotate } from 'rough-notation'
import type React from 'react'
import { useInView } from 'react-intersection-observer'

type AnnotationAction =
  | 'highlight'
  | 'underline'
  | 'box'
  | 'circle'
  | 'strike-through'
  | 'crossed-off'
  | 'bracket'

interface HighlighterProps {
  children: React.ReactNode
  action?: AnnotationAction
  color?: string
  strokeWidth?: number
  animationDuration?: number
  iterations?: number
  padding?: number
  multiline?: boolean
  isView?: boolean
  animationDelay?: number // 新增
}

export function Highlighter({
  children,
  action = 'highlight',
  color = '#ffd1dc',
  strokeWidth = 1.5,
  animationDuration = 600,
  iterations = 2,
  padding = 2,
  multiline = true,
  isView = false,
  animationDelay = 0, // 默认0毫秒
}: HighlighterProps) {
  const [element, setElement] = useState<HTMLElement | null>(null)
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    //threshold: 0.5, // 元素 50% 可见时触发
    //rootMargin: '0px 0px -50% 0px', // 元素滚动到中心偏下 50% 时触发
  })

  // Combine refs: assign element to state and pass to useInView
  const ref = (node: HTMLElement | null) => {
    setElement(node)
    inViewRef(node)
  }

  // If isView is false, always show. If isView is true, wait for inView
  const shouldShow = !isView || inView

  useEffect(() => {
    if (!shouldShow) return
    if (!element) return

    const annotation = annotate(element, {
      type: action,
      color,
      strokeWidth,
      animationDuration,
      iterations,
      padding,
      multiline,
    })

    const timer = setTimeout(() => {
      annotation.show()
    }, animationDelay)

    return () => {
      clearTimeout(timer)
      if (element) {
        annotate(element, { type: action }).remove()
      }
    }
  }, [
    shouldShow,
    action,
    color,
    strokeWidth,
    animationDuration,
    iterations,
    padding,
    multiline,
    element,
    animationDelay,
  ])

  return (
    <motion.span
      ref={ref}
      className="relative inline-block bg-transparent"
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.span>
  )
}
