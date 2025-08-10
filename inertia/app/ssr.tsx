import ReactDOMServer from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import React from "react";
import RootLayout from "~/layout/RootLayout";

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      const page: any = pages[`../pages/${name}.tsx`]
      // Applique le layout par défaut si la page n’en a pas
      page.default.layout = page.default.layout || ((page: React.ReactNode) => <RootLayout>{page}</RootLayout>)
      return page
    },
    setup: ({ App, props }) => <App {...props} />,
  })
}
