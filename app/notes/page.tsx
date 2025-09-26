'use client'

import React, { useState, useEffect, useMemo, useRef } from 'react'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import Masonry from 'react-masonry-css'
import { notesImages } from '@/data/notes'
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'
import 'lightgallery/css/lg-video.css'
import lgZoom from 'lightgallery/plugins/zoom'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgVideo from 'lightgallery/plugins/video'

type GalleryItem = {
  src?: string
  thumb: string
  video?: {
    source: { src: string; type: string }[]
    tracks: any[]
    attributes: { [key: string]: string | boolean }
    poster?: string
  }
}

export default function Notes() {
  const [columnCount, setColumnCount] = useState<number>(4)
  const [visibleCount, setVisibleCount] = useState(20)
  const lightGalleryRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notesColumnCount')
      if (saved) setColumnCount(Number(saved))
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notesColumnCount', columnCount.toString())
    }
  }, [columnCount])

  const breakpointColumnsObj = useMemo(
    () => ({
      default: columnCount,
      640: 2,
    }),
    [columnCount]
  )

  useEffect(() => {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }, [])

  useEffect(() => {
    let ticking = false
    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop
          const windowHeight =
            window.innerHeight || document.documentElement.clientHeight
          const fullHeight = document.documentElement.scrollHeight
          const offset = 940
          if (fullHeight - (scrollTop + windowHeight) <= offset) {
            setVisibleCount((prev) => Math.min(prev + 20, notesImages.length))
          }
          ticking = false
        })
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getFullSrc = (src: string) =>
    src.endsWith('.jpg') ? src.replace('.jpg', '-full.jpg') : src

  const handleThumbnailClick = (index: number) => {
    if (lightGalleryRef.current) {
      lightGalleryRef.current.openGallery(index)
    }
  }

  const renderNoteItem = (src: string, i: number) => {
    const isVideo = src.endsWith('.mp4') || src.endsWith('.gif')
    return (
      <div
        key={i}
        className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded"
        onClick={() => handleThumbnailClick(i)}
      >
        {isVideo ? (
          <video
            src={src}
            className="w-full transition-transform duration-300 ease-in-out hover:scale-105 rounded"
            preload="metadata"
            muted
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => {
              e.currentTarget.pause()
              e.currentTarget.currentTime = 0
            }}
            style={{ objectFit: 'contain' }}
          />
        ) : (
          <img
            src={src}
            alt="note"
            loading={i < 4 ? 'eager' : 'lazy'}
            className="w-full h-auto block transition-transform duration-300 ease-in-out hover:scale-110 rounded cursor-zoom-in"
          />
        )}
      </div>
    )
  }

  const filteredNotesImages = notesImages.filter(
    (src) => src && src.trim() !== ''
  )

  const placeholderThumb =
    'https://my-image-assets-1310694312.cos.ap-guangzhou.myqcloud.com/notes/thumb.png'

  const dynamicItems: GalleryItem[] = filteredNotesImages
    .slice(0, visibleCount)
    .map((src) => {
      const isVideo = src.endsWith('.mp4')
      if (isVideo) {
        return {
          thumb: placeholderThumb,
          video: {
            source: [{ src, type: 'video/mp4' }],
            tracks: [],
            attributes: {
              preload: 'metadata',
              controls: true,
              playsInline: true,
            },
            poster: placeholderThumb,
          },
        }
      } else {
        return {
          src: getFullSrc(src),
          thumb: src,
        }
      }
    })

  return (
    <div className="min-h-screen w-full bg-black rounded-b-3xl">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-25">
        <FadeInWhenVisible forceVisible={true} delay={0.1} once>
          <div className="flex justify-between items-center mb-12">
            <div className="max-[1440px] text-6xl font-bold text-white">
              生活片段
            </div>
            <div className="hidden sm:block">
              <input
                type="range"
                min="3"
                max="6"
                step="1"
                value={columnCount}
                onChange={(e) => setColumnCount(Number(e.target.value))}
                className="w-32 h-0.5 rounded-lg cursor-pointer bg-zinc-400 dark:bg-zinc-500 appearance-none"
              />
              <style>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  height: 20px;
                  width: 20px;
                  border-radius: 9999px;
                  border: 2px solid white;
                  background-color: black;
                  box-shadow: none;
                }
                .dark input[type='range']::-webkit-slider-thumb {
                  border: 2px solid black;
                  background-color: white;
                }
                input[type='range']:focus { outline: none; }
                input[type='range']:focus::-webkit-slider-thumb,
                input[type='range']::-webkit-slider-thumb:active {
                  box-shadow: none;
                  filter: none;
                }
              `}</style>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible forceVisible={true} delay={0.2} once>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex -ml-4"
            columnClassName="pl-4"
          >
            {filteredNotesImages
              .slice(0, visibleCount)
              .map((item, i) => renderNoteItem(item, i))}
          </Masonry>
        </FadeInWhenVisible>
      </div>

      <LightGallery
        onInit={(ref) => {
          lightGalleryRef.current = ref.instance
        }}
        dynamic
        dynamicEl={dynamicItems as any}
        plugins={[lgZoom, lgThumbnail, lgVideo]}
        speed={500}
        download={false}
        counter={false}
        hideScrollbar={true}
        videoMaxSize="1440-810" // 最大宽高
        resetScrollPosition={true}
      />
      <style jsx global>{`
        .lg-outer .lg-thumb-outer .lg-thumb-item {
          border-color: rgba(255, 255, 255, 0.2) !important; /* 未选中白色20% */
        }
        .lg-outer .lg-thumb-outer .lg-thumb-item.active {
          border-color: #ffffff !important; /* 选中纯白 */
        }
      `}</style>
    </div>
  )
}
