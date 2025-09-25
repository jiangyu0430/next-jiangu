'use client'

import { cn } from '@/lib/utils'
import { HTMLMotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

interface AnimatedSubscribeButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref'> {
  subscribeStatus?: boolean
  children: React.ReactNode
  className?: string
  disabledTooltip?: string
}

export const AnimatedSubscribeButton = React.forwardRef<
  HTMLButtonElement,
  AnimatedSubscribeButtonProps
>(
  (
    {
      subscribeStatus,
      onClick,
      className,
      children,
      disabledTooltip,
      ...props
    },
    ref
  ) => {
    const isControlled = subscribeStatus !== undefined // controlled vs uncontrolled check
    const [isSubscribed, setIsSubscribed] = useState<boolean>(
      subscribeStatus ?? false
    )
    const [hover, setHover] = useState(false)

    useEffect(() => {
      if (isControlled) {
        setIsSubscribed(subscribeStatus!)
      }
    }, [subscribeStatus, isControlled])

    useEffect(() => {
      if (isSubscribed) {
        const timer = setTimeout(() => {
          if (!isControlled) {
            setIsSubscribed(false)
          }
        }, 3000)
        return () => clearTimeout(timer)
      }
    }, [isSubscribed, isControlled])

    if (
      React.Children.count(children) !== 2 ||
      !React.Children.toArray(children).every(
        (child) => React.isValidElement(child) && child.type === 'span'
      )
    ) {
      throw new Error(
        'AnimatedSubscribeButton expects two children, both of which must be <span> elements.'
      )
    }

    const childrenArray = React.Children.toArray(children)
    const initialChild = childrenArray[0]
    const changeChild = childrenArray[1]

    return (
      <div
        className="relative inline-block"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <AnimatePresence mode="wait">
          {isSubscribed ? (
            <motion.button
              ref={ref}
              className={cn(
                'relative flex h-13 w-fit items-center justify-center overflow-hidden rounded-md bg-white px-6',
                props.disabled || props['aria-disabled']
                  ? 'cursor-not-allowed text-zinc-400'
                  : 'cursor-pointer text-black',
                className
              )}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                if (!isControlled) {
                  setIsSubscribed(false) // Only toggle manually if uncontrolled
                }
                onClick?.(e)
              }}
              disabled={props.disabled}
              {...props}
            >
              <motion.span
                key="action"
                className="relative flex h-full w-full items-center justify-center font-semibold"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
              >
                {changeChild} {/* Use children for subscribed state */}
              </motion.span>
            </motion.button>
          ) : (
            <motion.button
              ref={ref}
              className={cn(
                'relative flex h-13 w-fit rounded-md border-none bg-white px-6 items-center justify-center',
                props.disabled || props['aria-disabled']
                  ? 'cursor-not-allowed text-zinc-400'
                  : 'cursor-pointer text-black',
                className
              )}
              onClick={(e) => {
                if (!isControlled) {
                  setIsSubscribed(true) // Only toggle manually if uncontrolled
                }
                onClick?.(e)
              }}
              disabled={props.disabled}
              {...props}
            >
              <motion.span
                key="reaction"
                className="relative flex items-center justify-center font-semibold"
                initial={{ x: 0 }}
                exit={{ x: 50, transition: { duration: 0.1 } }}
              >
                {initialChild} {/* Use children for unsubscribed state */}
              </motion.span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* 自定义 Popover tooltip */}
        <AnimatePresence>
          {props.disabled && hover && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 flex flex-col items-center z-10"
            >
              {/* 箭头放在 tooltip 下方 */}
              <div className="bg-zinc-900 text-white text-base rounded-lg px-4 py-2 shadow-lg whitespace-nowrap relative z-10">
                {disabledTooltip ?? '请输入必填项'}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-zinc-900"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

AnimatedSubscribeButton.displayName = 'AnimatedSubscribeButton'
