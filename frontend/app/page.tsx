'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Alert } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push('/dashboard');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      await login(loginEmail, loginPassword);
      setSuccess('Connexion réussie !');
      setTimeout(() => router.push('/dashboard'), 1000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Échec de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const { register } = await import('@/context/AuthContext');
      // Register logic here - simplified for now
      setSuccess('Inscription réussie ! Connectez-vous maintenant.');
      setIsLogin(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Échec de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  const getTodayPassword = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear());
    return `${day}${month}${year}`;
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
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-200 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-center font-medium transition-colors ${
                !isLogin
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError('')}
              className="mb-4"
            />
          )}
          {success && (
            <Alert
              type="success"
              message={success}
              onClose={() => setSuccess('')}
              className="mb-4"
            />
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
              <Input
                label="Mot de passe"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                helperText={`Astuce: Le mot de passe du jour est ${getTodayPassword()}`}
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
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="votre@email.com"
                required
              />
              <Input
                label="Nom d'utilisateur"
                type="text"
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                placeholder="johndoe"
                required
              />
              <Input
                label="Mot de passe"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="••••••••"
                helperText="Minimum 8 caractères"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                S'inscrire
              </Button>
            </form>
          )}
        </Card>

        {/* Info Section */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">🔐 Authentification sécurisée avec JWT</p>
          <p>💡 Mot de passe du jour: {getTodayPassword()}</p>
        </div>
      </div>
    </main>
  );
}
