import type { Metadata } from 'next'
import './globals.css'
import '../style/lenis.css'
import NavbarWrapper from '@/components/NavbarWrapper'
import Footer from '@/components/Footer'
import GradualBlur from '@/components/GradualBlur'
import LenisProvider from '@/components/LenisProvider'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  //title: 'JIANGYU',
  description: '产品设计师与独立开发者的网站',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased bg-white relative">
        <LenisProvider>
          <NavbarWrapper />
          <ScrollToTop />
          <div className="relative z-10">{children}</div>
          <Footer />
          <GradualBlur
            target="page"
            position="bottom"
            scrollDynamicHeight={6}
            scrollStartThreshold={0.5}
            //height="1rem"
            strength={2}
            divCount={5}
            curve="bezier"
            exponential
            opacity={1}
            style={{ zIndex: 50 }}
          />
        </LenisProvider>
      </body>
    </html>
  )
}
