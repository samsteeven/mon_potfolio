/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Routes publiques avec silent_auth pour avoir accès à l'utilisateur connecté
router.on('/').renderInertia('home').as('home')
router.get('test', (ctx) => ctx.auth.user)
// Routes d'authentification
router
  .group(() => {
    router.get('auth/login', '#controllers/auth_controller.showLogin')
    router.post('auth/login', '#controllers/auth_controller.login')
  })
  .middleware(middleware.guest())

// Routes protégées (exemple)
router
  .group(() => {
    router.get('auth/logout', '#controllers/auth_controller.logout')
    router.get('/dashboard', '#controllers/dashboard_controller.index').as('dashboard')
  })
  .use(middleware.auth())
