'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { BlogSnippet } from '@/components/BlogSnippet'
import { motion } from 'framer-motion'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import { useRouter, usePathname } from 'next/navigation'

import blogs from '@/data/blogs'
import projects from '@/data/projects'

interface Project {
  slug: string
  type: string
  // add other project properties if needed
}

interface Blog {
  slug: string
  // add other blog properties if needed
}

export default function Projects(): JSX.Element {
  const [activeType, setActiveType] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setActiveType(null)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  const allTypes: string[] = [
    '全部',
    ...Array.from(new Set((projects as Project[]).map((p) => p.type))),
  ]

  // 右侧动画variants不变
  const containerVariants = {
    hiddenRight: { opacity: 0, x: 40 },
    visibleRight: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="bg-white rounded-b-3xl">
      <div className="flex flex-col py-25 px-4 sm:px-8 w-full max-w-screen-2xl mx-auto text-left lg:flex-row gap-16">
        <div className="w-full lg:w-[70%] order-1 lg:order-1">
          <FadeInWhenVisible forceVisible={true} once>
            <h2 className="text-6xl font-bold text-black dark:text-white mb-10">
              项目精选
            </h2>
          </FadeInWhenVisible>

          <FadeInWhenVisible forceVisible={true} delay={0.1} once>
            <div className="flex flex-wrap gap-3 justify-start mb-8">
              {allTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type === '全部' ? null : type)}
                  className={`px-5 py-2 rounded-full border text-sm transition
${
  activeType === type || (type === '全部' && activeType === null)
    ? 'bg-zinc-950 font-medium border-zinc-950 dark:border-white text-white'
    : 'border-zinc-300 text-zinc-900 dark:border-neutral-600 dark:text-zinc-300 hover:border-zinc-600 hover:font-medium dark:hover:border-zinc-300 dark:hover:bg-zinc-700'
}
cursor-pointer
`}
                >
                  {type.split('/').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i !== arr.length - 1 && (
                        <span
                          style={{
                            fontFamily: 'Arial',
                            color: 'inherit',
                            margin: '0 0.2em',
                          }}
                        >
                          /
                        </span>
                      )}
                    </span>
                  ))}
                </button>
              ))}
            </div>
          </FadeInWhenVisible>

          <div className="space-y-6">
            {(projects as Project[])
              .filter((p) => !activeType || p.type === activeType)
              .map((project, index) => (
                <FadeInWhenVisible
                  key={index}
                  delay={0.2}
                  once
                  forceVisible={index === 0}
                  threshold={0.02} // 这里设置阈值，0.01表示元素只要1%进入视口就触发动画
                >
                  <ProjectCard slug={project.slug} type={project.type} />
                </FadeInWhenVisible>
              ))}
          </div>
        </div>

        <motion.aside
          className="w-full lg:w-[30%] order-2 lg:order-2"
          initial="hiddenRight"
          animate="visibleRight"
          variants={containerVariants}
        >
          <h3 className="text-2xl font-semibold text-black dark:text-white mb-6">
            最近写下
          </h3>

          <div className="space-y-4">
            {(blogs as Blog[]).map((blog, index) => (
              <React.Fragment key={blog.slug || index}>
                {index > 0 && (
                  <motion.hr
                    className="border-t border-zinc-200 dark:border-zinc-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                  />
                )}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
                >
                  <BlogSnippet slug={blog.slug} />
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  )
}
