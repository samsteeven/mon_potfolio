import { useEffect } from 'react'
import { router, usePage } from '@inertiajs/react'
import { InertiaProps } from '~/types'

/**
 * Composant qui synchronise l'état d'authentification
 * Se déclenche lors du montage et lors des changements de route
 */
export const AuthSync = () => {
  const { auth } = usePage<InertiaProps>().props

  useEffect(() => {
    // Fonction de synchronisation
    const syncAuth = () => {
      const hasSessionCookie = document.cookie.includes('samen-session')
      const hasUser = auth?.user

      if (hasSessionCookie && !hasUser) {
        console.log('Session détectée mais utilisateur manquant, synchronisation...')
        router.reload({ only: ['auth'] })
      }
    }

    // Synchroniser immédiatement
    syncAuth()

    // Écouter les événements de navigation (bouton retour/précédent)
    const handlePopState = () => {
      // Attendre un peu que la page soit chargée puis synchroniser
      setTimeout(syncAuth, 100)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [auth?.user])

  // Ce composant ne rend rien visuellement
  return null
}
