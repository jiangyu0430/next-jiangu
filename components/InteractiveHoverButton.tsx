'use client'
//小球按钮
import React from 'react'
import Link from 'next/link'

// 简易 className 合并函数
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ')
}

interface InteractiveHoverButtonProps {
  children: React.ReactNode
  className?: string
  fixedTheme?: boolean
  lightTheme?: boolean
  href?: string
  onClick?: () => void
  target?: string // 新增
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLAnchorElement,
  InteractiveHoverButtonProps
>(
  (
    {
      children,
      className,
      fixedTheme,
      lightTheme,
      href,
      onClick,
      target,
      ...restProps
    },
    ref
  ) => {
    return (
      <Link
        href={href || '#'}
        target={target}
        className={cn(
          fixedTheme
            ? 'group relative w-auto h-10 cursor-pointer overflow-hidden whitespace-nowrap text-center font-medium flex-shrink-0 rounded-lg bg-neutral-900 border border-neutral-600 text-white hover:bg-neutral-700 transition-colors p-2 px-6'
            : lightTheme
            ? 'group relative w-auto h-10 cursor-pointer overflow-hidden whitespace-nowrap flex-shrink-0 rounded-lg bg-gray-100 border border-gray-200 p-2 px-6 text-center font-medium text-black transition-colors hover:text-white hover:bg-black'
            : 'group relative w-auto h-10 cursor-pointer overflow-hidden whitespace-nowrap flex-shrink-0 rounded-lg bg-gray-100 border border-gray-200 p-2 px-6 text-center font-medium text-primary-foreground transition-colors dark:bg-transparent dark:border dark:border-neutral-600 dark:text-white',
          className
        )}
        onClick={onClick}
        ref={ref}
        {...restProps}
      >
        {/* 默认内容：文字 + 彩球 */}
        <div className="h-full items-center flex gap-2">
          <div
            className={
              fixedTheme
                ? 'h-[6px] w-[6px] rounded-full bg-white transition-all duration-300 group-hover:scale-[100.8]'
                : lightTheme
                ? 'h-[6px] w-[6px] rounded-full bg-black transition-all duration-300 group-hover:scale-[100.8]'
                : 'h-[6px] w-[6px] rounded-full bg-black dark:bg-white transition-all duration-300 group-hover:scale-[100.8]'
            }
          ></div>
          <span className="inline-block text-sm transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
            {children}
          </span>
        </div>

        {/* Hover 状态下浮现的文字 + 图标 */}
        <div
          className={
            fixedTheme
              ? 'absolute top-0 z-10 flex h-full items-center w-full translate-x-12 justify-center gap-1 group-hover:text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'
              : lightTheme
              ? 'absolute top-0 z-10 flex h-full items-center w-full translate-x-12 justify-center gap-1 text-primary-foreground group-hover:text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'
              : 'absolute top-0 z-10 flex h-full items-center w-full translate-x-12 justify-center gap-1 text-primary-foreground group-hover:text-white dark:group-hover:text-black opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100'
          }
        >
          <span className="text-sm">{children}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </div>
      </Link>
    )
  }
)

InteractiveHoverButton.displayName = 'InteractiveHoverButton'
