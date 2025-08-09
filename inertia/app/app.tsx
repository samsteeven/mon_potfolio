import React from 'react'
import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import RootLayout from '~/layout/RootLayout'
import "~/css/app.css";

createInertiaApp({
  resolve: (name) => {
    // Chargement dynamique de tes pages
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    const page: any = pages[`../pages/${name}.tsx`]
    // Applique le layout par défaut si la page n’en a pas
    page.default.layout = page.default.layout || ((page: React.ReactNode) => <RootLayout>{page}</RootLayout>)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },
})
