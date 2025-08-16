import { useForm, usePage } from '@inertiajs/react'
import React from 'react'
import { HeadLayout } from '~/layout/HeadLayout'
import { Label } from '@/components/ui/label'
import { cn } from '@/utils'
import { InertiaProps } from '~/types'

export default function Login() {
  const { errors } = usePage<InertiaProps>().props

  const { data, setData, post, processing } = useForm({
    email: '',
    password: '',
    rememberMe: false as boolean,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/auth/login', {
      replace: true,
    })
  }

  return (
    <>
      <HeadLayout title="Login - Portfolio" description="Connecter vous pour administrer." />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Connexion Admin
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">Accédez à votre dashboard</p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={cn(
                    'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                    errors?.email ? 'border-red-300' : 'border-gray-300'
                  )}
                  placeholder="Adresse email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
              </div>
              {errors?.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}

              <div>
                <label htmlFor="password" className="sr-only">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={cn(
                    'appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm',
                    errors?.password ? 'border-red-300' : 'border-gray-300'
                  )}
                  placeholder="Mot de passe"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
              </div>
              {errors?.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  checked={data.rememberMe}
                  onChange={(e) => setData('rememberMe', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Se souvenir de moi
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={processing}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Connexion...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
