'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function NavbarWrapper() {
  const pathname = usePathname()
  const hideNavbar =
    pathname?.startsWith('/projectdetail') ||
    pathname?.startsWith('/blogdetail/')
  if (hideNavbar) return null
  return <Navbar />
}
