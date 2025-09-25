'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import type { ReactNode } from 'react'

interface FAQItem {
  question: string
  answer: ReactNode
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>([])
  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div>
      {items.map((item, idx) => {
        const isOpen = openIndexes.includes(idx)
        return (
          <motion.div
            key={idx}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
              delay: 0.3 + idx * 0.02,
            }}
            className="border-b border-gray-200 cursor-pointer group"
            onClick={() => toggle(idx)}
          >
            <div className="flex justify-between w-full py-8 text-left text-lg font-medium">
              <span>{item.question}</span>
              <span className="text-zinc-300 group-hover:text-zinc-800 transition-colors duration-200 font-Oswald text-xl">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeIn' }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 text-gray-700 max-w-[520px] w-full leading-relaxed text-justify">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
