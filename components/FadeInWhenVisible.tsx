'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInWhenVisibleProps {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
  threshold?: number
  className?: string
  forceVisible?: boolean
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  y = 80,
  once = true,
  threshold = 0.1,
  className = '',
  forceVisible,
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y }}
      animate={forceVisible ? { opacity: 1, y: 0 } : undefined}
      whileInView={forceVisible ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      viewport={forceVisible ? undefined : { once, amount: threshold }}
    >
      {children}
    </motion.div>
  )
}

export default FadeInWhenVisible
