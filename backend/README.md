# Backend - Bar Management Game

Backend API pour le jeu de gestion de bar.

## Stack

- **Node.js** 20 LTS
- **TypeScript** 5.x
- **Express** 5.x
- **Prisma** ORM
- **PostgreSQL** 16+
- **Socket.io** pour temps réel

## Installation

```bash
# Installer les dépendances
npm install

# Copier le fichier .env.example
cp .env.example .env

# Configurer la base de données dans .env
# Puis exécuter les migrations Prisma
npm run prisma:migrate

# Générer le client Prisma
npm run prisma:generate
```

## Développement

```bash
# Lancer en mode développement
npm run dev

# Le serveur démarre sur http://localhost:5000
```

## Scripts disponibles

- `npm run dev` - Lance le serveur en mode développement avec nodemon
- `npm run build` - Compile le TypeScript en JavaScript
- `npm start` - Lance le serveur en mode production
- `npm run prisma:migrate` - Exécute les migrations de base de données
- `npm run prisma:generate` - Génère le client Prisma
- `npm run prisma:studio` - Ouvre Prisma Studio
- `npm run lint` - Vérifie le code avec ESLint
- `npm run format` - Formate le code avec Prettier

## Structure

```
src/
├── config/         # Configuration (database, env)
├── controllers/    # Contrôleurs de routes
├── models/         # Modèles Prisma
├── routes/         # Définition des routes
├── services/       # Logique métier
├── types/          # Types TypeScript
├── utils/          # Utilitaires
└── index.ts        # Point d'entrée
```

## API Endpoints

- `GET /health` - Health check
- `GET /api` - Informations sur l'API

Plus de routes à venir...
