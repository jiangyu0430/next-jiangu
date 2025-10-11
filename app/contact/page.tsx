'use client'
import LaserFlow from '@/components/LaserFlow'
import { useForm, ValidationError } from '@formspree/react'
import { AnimatedSubscribeButton } from '@/components/AnimatedSubscribeButton'
import { triggerConfetti, triggerFireworks } from '@/components/Confetti'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'

import { useEffect, useState, FormEvent, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import usePageTitle from '@/hooks/usePageTitle'

export default function ContactPage() {
  usePageTitle('联系我丨JIANGYU')
  const [state, handleSubmit] = useForm('mvgbjrqk')
  const [isFormValid, setIsFormValid] = useState(false)
  const [isEmailInvalid, setIsEmailInvalid] = useState(false)
  const [email, setEmail] = useState('')

  const [isVerticalLayout, setIsVerticalLayout] = useState(false)
  const [sectionMinHeight, setSectionMinHeight] = useState('min-h-[900px]')

  const [showFormContainer, setShowFormContainer] = useState(false)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const revealImgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setShowFormContainer(true), 600)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setSectionMinHeight(
        window.innerHeight > 900 ? 'min-h-[1080px]' : 'min-h-[900px]'
      )
      setIsVerticalLayout(window.innerHeight > 900)
    }

    handleResize() // 初始化
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const inputClass =
    'px-4 py-3 rounded-md border border-transparent bg-zinc-800 text-white hover:bg-zinc-700 focus:bg-zinc-900 focus:outline-none focus:ring-0 focus:border-indigo-400 transition-colors duration-200 ease-in-out'

  useEffect(() => {
    const checkFormValid = () => {
      const messageInput = document.getElementById(
        'message'
      ) as HTMLTextAreaElement | null
      const emailInput = document.getElementById(
        'email'
      ) as HTMLInputElement | null

      const emailValue = emailInput?.value.trim() || ''
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
      const isEmailValid = emailValue === '' || emailRegex.test(emailValue)

      setIsEmailInvalid(emailValue !== '' && !isEmailValid)

      // 留言必填，且邮箱为空或格式正确才能提交
      const valid = !!messageInput?.value && isEmailValid
      setIsFormValid(valid)
    }
    checkFormValid()
    const nameInput = document.getElementById('name') as HTMLInputElement | null
    const emailInput = document.getElementById(
      'email'
    ) as HTMLInputElement | null
    const phoneInput = document.getElementById(
      'phone'
    ) as HTMLInputElement | null
    const messageInput = document.getElementById(
      'message'
    ) as HTMLTextAreaElement | null
    nameInput?.addEventListener('input', checkFormValid)
    emailInput?.addEventListener('input', checkFormValid)
    phoneInput?.addEventListener('input', checkFormValid)
    messageInput?.addEventListener('input', checkFormValid)
    return () => {
      nameInput?.removeEventListener('input', checkFormValid)
      emailInput?.removeEventListener('input', checkFormValid)
      phoneInput?.removeEventListener('input', checkFormValid)
      messageInput?.removeEventListener('input', checkFormValid)
    }
  }, [])

  useEffect(() => {
    if (state.succeeded) {
      triggerConfetti()
      triggerFireworks()
      const form = document.querySelector('form') as HTMLFormElement | null
      form?.reset()
      setIsFormValid(false) // 提交后重置按钮禁用状态
    }
  }, [state.succeeded])

  return (
    <section
      className={`h-screen ${sectionMinHeight} rounded-b-3xl w-full flex overflow-hidden relative items-center justify-center bg-black`}
    >
      <div
        className="relative w-full h-full"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          const el = revealImgRef.current
          if (el) {
            el.style.setProperty('--mx', `${x}px`)
            el.style.setProperty('--my', `${y + rect.height * 0.5}px`)
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current
          if (el) {
            el.style.setProperty('--mx', '-9999px')
            el.style.setProperty('--my', '-9999px')
          }
        }}
      >
        <div className="absolute top-30 left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl px-8 z-50 text-white">
          <FadeInWhenVisible forceVisible={true} delay={0.2} once>
            <h1 className="text-6xl font-bold">联系我</h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible forceVisible={true} delay={0.3} once>
            <p className="mt-6 mb-4 text-white/80 text-base">
              不喜欢填写表单？添加我的微信进一步沟通
            </p>

            <div className="relative inline-block">
              <button
                className="px-5 py-2 bg-zinc-700 text-white rounded-md font-medium cursor-pointer hover:bg-zinc-600 transition-colors duration-200 flex items-center gap-2 text-sm"
                onMouseEnter={() => setIsPopoverOpen(true)}
                onMouseLeave={() => setIsPopoverOpen(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M5.45777 18.1847C3.359 16.677 2.00098 14.4001 2.00098 11.9078C2.00098 7.32317 6.47628 3.6001 12.001 3.6001C17.5257 3.6001 22.001 7.32317 22.001 11.9078C22.001 16.4924 17.5257 20.2155 12.001 20.2155C10.859 20.2155 9.74789 20.0616 8.72937 19.7539C8.63678 19.7232 8.51332 19.7232 8.42073 19.7232C8.23554 19.7232 8.05036 19.7847 7.89604 19.877L5.70468 21.1386C5.64295 21.1693 5.58122 21.2001 5.5195 21.2001C5.33431 21.2001 5.17999 21.0463 5.17999 20.8616C5.17999 20.7693 5.21085 20.7078 5.24172 20.6155C5.27258 20.5847 5.55036 19.5693 5.70468 18.9539C5.70468 18.8924 5.73554 18.8001 5.73554 18.7386C5.73554 18.4924 5.64295 18.3078 5.45777 18.1847ZM8.66764 10.5115C9.38493 10.5115 9.95278 9.94335 9.95278 9.22567C9.95278 8.50799 9.38493 7.93982 8.66764 7.93982C7.95036 7.93982 7.3825 8.50799 7.3825 9.22567C7.3825 9.94335 7.95036 10.5115 8.66764 10.5115ZM15.3343 10.5115C16.0516 10.5115 16.6194 9.94335 16.6194 9.22567C16.6194 8.50799 16.0516 7.93982 15.3343 7.93982C14.617 7.93982 14.0492 8.50799 14.0492 9.22567C14.0492 9.94335 14.617 10.5115 15.3343 10.5115Z"></path>
                </svg>
                获取微信
              </button>
              <AnimatePresence>
                {isPopoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 left-0 w-[200px] bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-400 shadow-lg rounded-md overflow-hidden z-50"
                  >
                    <img
                      src="/QRCode.svg"
                      alt="微信二维码"
                      className="w-full h-auto"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInWhenVisible>
        </div>

        <LaserFlow
          horizontalBeamOffset={0.2}
          verticalBeamOffset={0.12}
          horizontalSizing={0.45}
          wispIntensity={7}
          flowSpeed={0.5}
          fogScale={0.2}
          color="#7c86ff"
        />

        <img
          ref={revealImgRef}
          src="https://cdn.dribbble.com/userupload/15325964/file/original-25ae735b5d9255a4a31d3471fd1c346a.png?resize=1024x768&vertical=center" // 替换为实际图片路径
          alt="Reveal effect"
          style={{
            position: 'absolute',
            width: '100%',
            top: '-50%',
            zIndex: 5,
            mixBlendMode: 'lighten',
            opacity: 0.3,
            pointerEvents: 'none',
            WebkitMaskImage:
              'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            maskImage:
              'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            ...({ '--mx': '-9999px', '--my': '-9999px' } as any),
          }}
        />
      </div>

      <div
        className={`absolute top-[38%] inset-x-8 h-[80%] bg-black rounded-2xl border-2 border-indigo-400 flex py-16 px-8 items-start justify-center text-white text-base z-10 transition-opacity duration-800 ease-in mx-auto ${
          showFormContainer ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ maxWidth: 'calc(1440px - 64px)' }}
      >
        <form
          className="flex flex-col gap-6 w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="mb-1 text-zinc-200 text-base">
              名字
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="怎么称呼您？"
              className={inputClass}
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
          </div>
          <div
            className={`flex gap-4 ${
              isVerticalLayout ? 'flex-col' : 'xl:flex-row'
            }`}
          >
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="phone" className="mb-1 text-zinc-200 text-base">
                联系方式
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                placeholder="可填写手机号或微信号"
                className={inputClass}
              />
              <ValidationError
                prefix="Phone"
                field="phone"
                errors={state.errors}
              />
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="email" className="mb-1 text-zinc-200 text-base">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="用于接收回复"
                className={`${inputClass} ${
                  isEmailInvalid ? 'border-red-500 bg-red-100 text-red-900' : ''
                }`}
                onBlur={() => {
                  const emailTrimmed = email.trim()
                  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i
                  setIsEmailInvalid(
                    emailTrimmed !== '' && !emailRegex.test(emailTrimmed)
                  )
                }}
                onChange={(e) => setEmail(e.target.value.trimStart())}
              />
              {isEmailInvalid && email && (
                <p className="text-red-400 text-sm mt-1">
                  邮箱格式不正确，请输入正确的邮箱
                </p>
              )}
              <ValidationError
                prefix="Email"
                field="email"
                errors={state.errors}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="mb-1 text-zinc-200 text-base">
              留言
              <span className="text-red-400 font-medium ml-1">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="请写下您的想法、建议或需求，我会尽快回复～"
              rows={4}
              required
              className={inputClass}
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <AnimatedSubscribeButton
            className="w-full group mt-4 text-lg"
            disabled={!isFormValid}
          >
            <span className="flex flex-row items-center justify-center gap-1">
              发送留言
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-6 h-6 transition-transform duration-200 ${
                  isFormValid ? 'group-hover:rotate-45' : ''
                }`}
              >
                <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z"></path>
              </svg>
            </span>
            <span className="flex flex-row items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6 text-gray-900"
              >
                <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
              </svg>
              发送成功
            </span>
          </AnimatedSubscribeButton>
        </form>
      </div>
    </section>
  )
}
