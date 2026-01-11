# Frontend - Bar Management Game

Interface web pour le jeu de gestion de bar.

## Stack

- **Next.js** 16.x (App Router)
- **React** 19.x
- **TypeScript** 5.x
- **Tailwind CSS** 4.x
- **Socket.io Client** pour temps réel
- **Recharts** pour les graphiques
- **Axios** pour les appels API

## Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier .env.local.example
cp .env.local.example .env.local

# Configurer l'URL de l'API dans .env.local
```

## Développement

```bash
# Lancer en mode développement
npm run dev

# L'application démarre sur http://localhost:3000
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement Next.js
- `npm run build` - Compile l'application pour la production
- `npm start` - Lance le serveur en mode production
- `npm run lint` - Vérifie le code avec ESLint

## Structure

```
app/
├── dashboard/      # Pages du dashboard
├── api/            # Routes API Next.js
├── layout.tsx      # Layout principal
├── page.tsx        # Page d'accueil
└── globals.css     # Styles globaux

components/
├── ui/             # Composants UI réutilisables
└── dashboard/      # Composants spécifiques au dashboard

lib/
├── services/       # Services API
├── hooks/          # React hooks personnalisés
├── utils/          # Fonctions utilitaires
└── types/          # Types TypeScript
```

## Dashboards

L'application comprend 3 dashboards principaux :

1. **📊 Ventes** - Vue d'ensemble des ventes et clients
2. **📦 Stocks** - Gestion de l'inventaire et commandes
3. **💰 Finance** - Trésorerie et rentabilité

## Développement

Le projet utilise :
- **App Router** de Next.js 13+
- **Client Components** pour l'interactivité
- **Tailwind CSS** pour le styling
- **Socket.io** pour les mises à jour temps réel
