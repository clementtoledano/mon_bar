'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Vérifier l'authentification
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                🍺 Bar Management
              </h1>
              <p className="text-sm text-gray-600">
                Bienvenue !
              </p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Vue d'ensemble de votre activité
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Trésorerie
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  10,000 €
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Réputation
                </p>
                <p className="text-2xl font-bold text-gray-900">50/100</p>
              </div>
              <div className="text-3xl">⭐</div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Clients aujourd'hui
                </p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="text-3xl">👥</div>
            </div>
          </Card>

          <Card padding="md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  CA du jour
                </p>
                <p className="text-2xl font-bold text-gray-900">0 €</p>
              </div>
              <div className="text-3xl">📊</div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card title="Actions rapides" padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="primary" className="w-full">
              📦 Gérer les stocks
            </Button>
            <Button variant="primary" className="w-full">
              👥 Gérer le personnel
            </Button>
            <Button variant="primary" className="w-full">
              📊 Voir les statistiques
            </Button>
          </div>
        </Card>

        {/* Info */}
        <Card title="Informations" padding="lg" className="mt-6">
          <div className="space-y-2">
            <div>
              <span className="font-medium text-gray-700">Session:</span>{' '}
              <span className="text-gray-600">Active</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Mode:</span>{' '}
              <span className="text-gray-600">Gestion</span>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
