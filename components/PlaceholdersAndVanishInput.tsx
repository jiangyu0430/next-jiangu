'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'
import emailjs from '@emailjs/browser'

interface PlaceholdersAndVanishInputProps {
  placeholders: string[]
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PlaceholdersAndVanishInput: React.FC<
  PlaceholdersAndVanishInputProps
> = ({ placeholders, onChange }) => {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)

  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const startAnimation = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length)
    }, 3000)
  }
  const handleVisibilityChange = () => {
    if (document.visibilityState !== 'visible' && timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    } else if (document.visibilityState === 'visible') {
      startAnimation()
    }
  }

  useEffect(() => {
    startAnimation()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [placeholders, currentPlaceholder])

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const newDataRef = useRef<
    { x: number; y: number; r: number; color: string }[]
  >([])
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [value, setValue] = useState('')
  const [animating, setAnimating] = useState(false)

  const draw = useCallback(() => {
    if (!inputRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    canvas.width = 800
    canvas.height = 800
    ctx.clearRect(0, 0, 800, 800)
    const computedStyles = getComputedStyle(inputRef.current)

    const fontSize = parseFloat(computedStyles.getPropertyValue('font-size'))
    ctx.font = `${fontSize * 2}px ${computedStyles.fontFamily}`
    ctx.fillStyle = '#FFF'
    // Calculate offsetX so that canvas text aligns horizontally with input text
    const inputRect = inputRef.current.getBoundingClientRect()
    const formRect = inputRef.current.form!.getBoundingClientRect()
    const offsetX = inputRect.left - formRect.left
    ctx.fillText(
      value,
      offsetX,
      parseFloat(computedStyles.getPropertyValue('font-size')) * 1.74,
    )

    const imageData = ctx.getImageData(0, 0, 800, 800)
    const pixelData = imageData.data
    const newData: { x: number; y: number; color: number[] }[] = []

    for (let t = 0; t < 800; t++) {
      let i = 4 * t * 800
      for (let n = 0; n < 800; n++) {
        let e = i + 4 * n
        if (
          pixelData[e] !== 0 &&
          pixelData[e + 1] !== 0 &&
          pixelData[e + 2] !== 0
        ) {
          newData.push({
            x: n,
            y: t,
            color: [
              pixelData[e],
              pixelData[e + 1],
              pixelData[e + 2],
              pixelData[e + 3],
            ],
          })
        }
      }
    }

    newDataRef.current = newData.map(({ x, y, color }) => ({
      x,
      y,
      r: 1,
      color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
    }))
  }, [value])

  useEffect(() => {
    draw()
  }, [value, draw])

  const animate = (start: number) => {
    const animateFrame = (pos = 0) => {
      requestAnimationFrame(() => {
        const newArr: typeof newDataRef.current = []
        for (let i = 0; i < newDataRef.current.length; i++) {
          const current = newDataRef.current[i]
          if (current.x < pos) {
            newArr.push(current)
          } else {
            if (current.r <= 0) {
              current.r = 0
              continue
            }
            current.x += Math.random() > 0.5 ? 1 : -1
            current.y += Math.random() > 0.5 ? 1 : -1
            current.r -= 0.05 * Math.random()
            newArr.push(current)
          }
        }
        newDataRef.current = newArr
        const ctx = canvasRef.current?.getContext('2d')
        if (ctx) {
          ctx.clearRect(pos, 0, 800, 800)
          newDataRef.current.forEach((t) => {
            const { x: n, y: i, r: s, color: color } = t
            if (n > pos) {
              ctx.beginPath()
              ctx.rect(n, i, s, s)
              ctx.fillStyle = color
              ctx.strokeStyle = color
              ctx.stroke()
            }
          })
        }
        if (newDataRef.current.length > 0) {
          animateFrame(pos - 8)
        } else {
          setAnimating(false)
          // 修复光标丢失问题
          setTimeout(() => {
            inputRef.current?.focus()
          }, 50)
          // 动画完成后清空输入框内容和value状态
          setValue('')
        }
      })
    }
    animateFrame(start)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !animating) {
      vanishAndSubmit()
    }
  }

  const vanishAndSubmit = () => {
    if (!inputRef.current) return
    const message = inputRef.current.value || ''
    if (!message) return

    setAnimating(true)
    draw()

    const maxX = newDataRef.current.reduce(
      (prev, current) => (current.x > prev ? current.x : prev),
      0,
    )

    animate(maxX) // 优先执行动画

    // 延后发送邮件
    emailjs
      .send(
        'service_w7mvxra', // Service ID
        'template_c030xec', // Template ID
        { message },
        'aeWjgdLCNcUfQ08oQ', // Public Key
      )
      .then((result) => {
        console.log('Email successfully sent:', result.text)
      })
      .catch((error) => {
        console.error('Email send error:', error.text)
      })
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        'w-full relative max-w-full mx-auto bg-zinc-800 h-14 rounded-lg overflow-hidden  transition duration-200',
        value && 'bg-zinc-800',
      )}
    >
      <canvas
        className={cn(
          'absolute pointer-events-none text-base transform scale-50 top-[20px] left-6 origin-top-left filter invert-0 pr-20',
          !animating ? 'opacity-0' : 'opacity-100',
        )}
        ref={canvasRef}
      />
      <input
        onChange={(e) => {
          if (!animating) {
            setValue(e.target.value)
            onChange && onChange(e)
          }
        }}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        type="text"
        className={cn(
          'w-full relative text-base z-50 border-none text-white bg-transparent h-full rounded-full focus:outline-none focus:ring-0 pl-6 sm:pl-6 text-left pr-20',
          animating && 'text-transparent',
          'caret-white',
        )}
        style={{
          transition: 'opacity 0.5s linear',
          opacity: animating ? 0 : 1,
        }}
      />
      <button
        disabled={!value}
        type="button"
        onClick={vanishAndSubmit}
        className="absolute right-4 top-1/2 z-50 -translate-y-1/2 h-8 w-8 rounded-full bg-zinc-50 hover:bg-zinc-100 disabled:bg-zinc-800 transition duration-200 flex items-center justify-center cursor-pointer"
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-zinc-800 h-[18px] w-[18px]"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <motion.path
            d="M5 12l14 0"
            initial={{
              strokeDasharray: '50%',
              strokeDashoffset: '50%',
            }}
            animate={{
              strokeDashoffset: value ? 0 : '50%',
            }}
            transition={{
              duration: 0.5,
              ease: 'linear',
            }}
          />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </motion.svg>
      </button>
      <div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
        <AnimatePresence mode="wait">
          {!value && !animating && (
            <motion.p
              initial={{
                y: 3,
                opacity: 0,
              }}
              key={currentPlaceholder}
              animate={{
                y: 0,
                x: 0,
                opacity: 1,
              }}
              exit={{
                y: -3,
                x: 0,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
              className="absolute left-6 text-zinc-400 text-base font-normal text-left truncate"
            >
              {placeholders[currentPlaceholder]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
