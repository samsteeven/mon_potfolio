import React from 'react'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import Navbar from '~/layout/Navbar'
import Footer from '~/layout/Footer'
import ScrollProgressIndicator from '@/components/ScrollProgressIndicator'
import ParticleBackground from '@/components/ParticleBackground'
import Preloader from '@/components/Preloader'
import StickyEmail from '@/components/StickyEmail'
import PageTransition from '@/components/PageTransition'
import { AuthSync } from '@/components/AuthSync'

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.4 }}>
      <AuthSync />
      <Navbar />

      <PageTransition>
        <main>{children}</main>
      </PageTransition>

      <Footer />

      <Preloader />
      <ScrollProgressIndicator />
      <ParticleBackground />
      <StickyEmail />
    </ReactLenis>
  )
}
