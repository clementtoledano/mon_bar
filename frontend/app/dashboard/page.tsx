'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // TODO: Connect to Socket.io
    setIsConnected(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              🍺 Mon Bar
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    isConnected ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {isConnected ? 'Connecté' : 'Déconnecté'}
                </span>
              </div>
              <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                Accueil
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Trésorerie
            </h3>
            <p className="text-2xl font-bold text-gray-900">10 000 €</p>
            <p className="text-xs text-green-600 mt-1">+5% aujourd'hui</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">CA du jour</h3>
            <p className="text-2xl font-bold text-gray-900">0 €</p>
            <p className="text-xs text-gray-500 mt-1">Bar fermé</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Clients servis
            </h3>
            <p className="text-2xl font-bold text-gray-900">0</p>
            <p className="text-xs text-gray-500 mt-1">Bar fermé</p>
          </div>
          <div className="card">
            <h3 className="text-sm font-medium text-gray-600 mb-1">
              Satisfaction
            </h3>
            <p className="text-2xl font-bold text-gray-900">50%</p>
            <p className="text-xs text-gray-500 mt-1">Moyenne</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button className="px-6 py-3 text-sm font-medium text-primary-600 border-b-2 border-primary-600">
                📊 Ventes
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                📦 Stocks
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                💰 Finance
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">
                Tableau de bord en construction
              </p>
              <p className="text-sm text-gray-400">
                Les données en temps réel seront affichées ici
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-2">📦 Commander des stocks</h3>
            <p className="text-sm text-gray-600 mb-4">
              Passez commande auprès de vos fournisseurs
            </p>
            <button className="btn-primary w-full" disabled>
              Prochainement
            </button>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">💵 Ajuster les prix</h3>
            <p className="text-sm text-gray-600 mb-4">
              Optimisez vos marges produit par produit
            </p>
            <button className="btn-primary w-full" disabled>
              Prochainement
            </button>
          </div>
          <div className="card">
            <h3 className="font-semibold mb-2">👥 Gérer les employés</h3>
            <p className="text-sm text-gray-600 mb-4">
              Recrutez et organisez votre équipe
            </p>
            <button className="btn-primary w-full" disabled>
              Prochainement
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
