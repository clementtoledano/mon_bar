import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🍺 Bar Management Game
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Gérez votre bar à distance comme un pro
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">📊 Analytics</h3>
            <p className="text-gray-600">
              Consultez vos dashboards en temps réel
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">📦 Stocks</h3>
            <p className="text-gray-600">
              Gérez votre inventaire et vos commandes
            </p>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">💰 Finance</h3>
            <p className="text-gray-600">
              Suivez votre trésorerie et rentabilité
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/dashboard" className="btn-primary">
            Accéder au Dashboard
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Documentation
          </a>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>🚀 Version Alpha 1.0.0</p>
          <p className="mt-2">
            Simulation temps réel • Node.js + React + PostgreSQL
          </p>
        </div>
      </div>
    </main>
  );
}
