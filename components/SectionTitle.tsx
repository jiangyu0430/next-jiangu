'use client'

import React from 'react'

interface SectionTitleProps {
  title: string
  subtitle?: string
  description?: string
  leftAlign?: boolean
  theme?: 'light' | 'dark'
}

/**
 * SectionTitle 组件
 * @param {string} title - 模块大标题文本
 * @param {string} subtitle - 模块副标题文本
 * @param {string} description - 模块描述文本
 * @param {boolean} leftAlign - 是否左对齐，默认居中
 * @param {string} theme - 主题，"light" 或 "dark"，默认 "light"
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  description,
  leftAlign = false,
  theme = 'light',
}) => {
  return (
    <div
      className={`flex flex-col justify-center ${
        leftAlign ? 'items-start text-left' : 'items-center text-center'
      }`}
    >
      <div>
        <h2
          className={`lg:text-8xl text-6xl font-medium m-0 leading-[1] ${
            theme === 'light' ? 'text-zinc-950' : 'text-white'
          }`}
        >
          {title}
        </h2>
        {subtitle && (
          <h3
            className={`mt-2 lg:text-8xl text-6xl font-medium m-0 leading-[1] ${
              theme === 'light' ? 'text-zinc-950' : 'text-white'
            }`}
          >
            {subtitle}
          </h3>
        )}
      </div>
      {description && (
        <p
          className={`w-[460px] lg:text-xl text-base mt-6 leading-[1.5] ${
            theme === 'light' ? 'text-zinc-700' : 'text-white/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
