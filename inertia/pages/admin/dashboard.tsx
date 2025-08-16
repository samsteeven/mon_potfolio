import { HeadLayout } from '~/layout/HeadLayout'
import { InertiaProps } from '~/types'
import { usePage } from '@inertiajs/react'

export default function Dashboard() {
  const { auth } = usePage<InertiaProps>().props

  return (
    <>
      <HeadLayout title="Dashboard - Portfolio" description="Administration du portfolio." />

      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Administrateur</h1>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Bienvenue, {auth?.user?.username} !
              </h2>
              <p className="text-blue-700">Vous êtes connecté en tant qu'administrateur.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Projets</h3>
                <p className="text-gray-600">Gérez vos projets portfolio</p>
                <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Voir les projets
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Compétences</h3>
                <p className="text-gray-600">Modifiez vos compétences</p>
                <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                  Gérer les compétences
                </button>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Messages</h3>
                <p className="text-gray-600">Consultez les messages reçus</p>
                <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
                  Voir les messages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
