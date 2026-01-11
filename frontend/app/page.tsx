'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Alert } from '@/components/ui';

export default function Home() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const getTodayPassword = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    return `${day}${month}${year}`;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Vérifier si le mot de passe est correct
      if (password === getTodayPassword()) {
        // Stocker dans le localStorage pour garder la session
        localStorage.setItem('isAuthenticated', 'true');
        router.push('/dashboard');
      } else {
        setError('Mot de passe incorrect');
      }
    } catch (err: any) {
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🍺 Bar Management
          </h1>
          <p className="text-gray-600">Gérez votre bar comme un pro</p>
        </div>

        <Card>
          {/* Error Messages */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
              className="mb-4"
            />
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              helperText={`Indice: Le mot de passe est au format JJMMAAAA`}
              required
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              Se connecter
            </Button>
          </form>
        </Card>

        {/* Info Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">🔐 Connexion sécurisée</p>
          <p>💡 Utilisez la date du jour comme mot de passe</p>
          <p className="mt-2 text-xs text-gray-500">
            Exemple: {getTodayPassword()}
          </p>
        </div>
      </div>
    </main>
  );
}
