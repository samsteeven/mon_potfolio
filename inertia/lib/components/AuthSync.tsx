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
    // Écouter UNIQUEMENT les événements de navigation (bouton retour/précédent)
    const AuthSync = () => {
      // Vérifier si on a perdu l'utilisateur lors de la navigation
      const hasUser = auth?.user

      if (!hasUser) {
        //Navigation par bouton retour détectée, utilisateur manquant, synchronisation...
        router.reload({ only: ['auth'] })
      }
    }
    // Attendre un peu que la page soit chargée puis synchroniser
    setTimeout(AuthSync, 100)

    window.addEventListener('popstate', AuthSync)

    return () => {
      window.removeEventListener('popstate', AuthSync)
    }
  }, [auth?.user])

  // Ce composant ne rend rien visuellement
  return null
}
