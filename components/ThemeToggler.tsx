'use client'

import { Moon, SunDim } from 'lucide-react'
import { useState, useRef } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
  isDark?: boolean
  setIsDark?: (value: boolean) => void
}

export const AnimatedThemeToggler = ({
  className,
  isDark,
  setIsDark,
}: Props) => {
  const [internalDark, setInternalDark] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const currentDark = isDark ?? internalDark
  const changeTheme = async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        // const dark = document.documentElement.classList.toggle('dark')
        const dark = !currentDark
        if (setIsDark) {
          setIsDark(dark)
        } else {
          setInternalDark(dark)
        }
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 800,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={changeTheme}
      className={cn(
        className,
        'bg-gray-100 dark:bg-white/20 rounded-md p-[10px] flex items-center justify-center text-black dark:text-white',
        'hover:bg-gray-200 dark:hover:bg-white/30 active:bg-gray-300 dark:active:bg-white/40 cursor-pointer select-none'
      )}
    >
      {currentDark ? <SunDim size={20} /> : <Moon size={20} />}
    </button>
  )
}
