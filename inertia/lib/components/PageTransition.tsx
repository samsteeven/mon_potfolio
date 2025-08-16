import React, { useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Enregistre le plugin seulement côté client (SSR safe)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP)
}

type Props = {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const [shouldShowTransition, setShouldShowTransition] = useState(false)

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà visité le site
    const visited = localStorage.getItem('portfolio-visited')

    if (!visited) {
      // Première visite - afficher la transition
      setShouldShowTransition(true)
    }
  }, [])

  useGSAP(
    () => {
      if (!shouldShowTransition) return

      const tl = gsap.timeline()
      tl.to('.page-transition--inner', {
        yPercent: 0,
        duration: 0.2,
      })
        .to('.page-transition--inner', {
          yPercent: -100,
          duration: 0.2,
        })
        .to('.page-transition', {
          yPercent: -100,
        })
    },
    { dependencies: [shouldShowTransition] }
  )

  return (
    <div>
      {shouldShowTransition && (
        <div className="page-transition w-screen h-screen fixed top-0 left-0 bg-background-light z-[5]">
          <div className="page-transition--inner w-screen h-screen fixed top-0 left-0 bg-primary z-[5] translate-y-full" />
        </div>
      )}

      {children}
    </div>
  )
}
