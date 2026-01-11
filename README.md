# Documentation - Jeu de Gestion de Bar/Pub

**Version** : 1.0 (Alpha)  
**Date** : 11 janvier 2026  
**Stack** : Node.js + TypeScript + React + PostgreSQL

---

## 📚 Structure de la Documentation

### 1. Vue d'Ensemble
- **[01-overview.md](01-overview.md)** - Pitch, objectifs, concept du jeu

### 2. Spécifications
- **[02-specifications.md](02-specifications.md)** - Spécifications fonctionnelles détaillées
- **[03-game-mechanics.md](03-game-mechanics.md)** - Mécaniques de jeu et simulation

### 3. Architecture & Technique
- **[04-architecture.md](04-architecture.md)** - Architecture globale et composants
- **[05-stack-tech.md](05-stack-tech.md)** - Stack technologique détaillée
- **[06-database.md](06-database.md)** - Modèle de données et schéma BDD

### 4. Frontend
- **[07-frontend.md](07-frontend.md)** - Structure Next.js et composants
- **[08-dashboards.md](08-dashboards.md)** - Design des 3 dashboards principaux

### 5. Backend
- **[09-backend-api.md](09-backend-api.md)** - API REST et endpoints
- **[10-realtime.md](10-realtime.md)** - Système temps réel (Socket.io)
- **[11-simulation.md](11-simulation.md)** - Logique de simulation continue

### 6. Déploiement & Ops
- **[12-deployment.md](12-deployment.md)** - Configuration serveur et déploiement
- **[13-docker.md](13-docker.md)** - Docker Compose et conteneurisation

### 7. Roadmap
- **[14-roadmap.md](14-roadmap.md)** - Phases de développement et évolutions

---

## 🚀 Quick Start

### Prérequis
- Node.js 20 LTS
- PostgreSQL 16+
- Docker & Docker Compose (optionnel mais recommandé)

### Installation Locale

```bash
# Clone
git clone <repo-url>
cd bar-game

# Backend
cd backend
npm install
cp .env.example .env
npm run prisma:migrate
npm run dev

# Frontend (nouveau terminal)
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

### Accès
- Frontend : http://localhost:3000
- API : http://localhost:5000
- Docs API : http://localhost:5000/api-docs

---

## 📖 Lectures Prioritaires

**Pour démarrer le développement** :
1. [01-overview.md](01-overview.md) - Comprendre le concept
2. [04-architecture.md](04-architecture.md) - Vue architecture
3. [05-stack-tech.md](05-stack-tech.md) - Technologies utilisées
4. [06-database.md](06-database.md) - Structure données

**Pour développer le frontend** :
5. [07-frontend.md](07-frontend.md) - Structure React/Next.js
6. [08-dashboards.md](08-dashboards.md) - Design dashboards

**Pour développer le backend** :
7. [09-backend-api.md](09-backend-api.md) - API endpoints
8. [11-simulation.md](11-simulation.md) - Logique simulation

---

## 🎯 Objectif Alpha (MVP)

Créer un jeu de gestion de bar fonctionnel avec :
- ✅ Simulation temps réel 24/7
- ✅ 3 dashboards (Ventes, Stocks, Finance)
- ✅ Système complet fournisseurs
- ✅ Clients avec groupes et satisfaction
- ✅ Historique 30 jours

**Durée estimée** : 12-16 semaines solo

---

## 📝 Conventions

### Git
- Branches : `feature/nom-feature`, `fix/nom-bug`
- Commits : Format conventionnel (feat, fix, docs, etc.)

### Code
- **Backend** : TypeScript strict, ESLint + Prettier
- **Frontend** : TypeScript strict, ESLint + Prettier
- **BDD** : snake_case pour tables et colonnes
- **API** : camelCase pour JSON

### Documentation
- README par dossier important
- Commentaires JSDoc pour fonctions publiques
- Types TypeScript documentés

---

## 🛠️ Outils de Développement

- **IDE** : VSCode (recommandé)
- **Extensions VSCode** :
  - Prisma
  - ESLint
  - Prettier
  - TypeScript
  - Tailwind CSS IntelliSense
- **DB Client** : TablePlus, DBeaver, ou pgAdmin

---

## 📞 Support & Contribution

Pour toute question sur la documentation :
- Lire d'abord les fichiers de doc appropriés
- Vérifier les exemples de code
- Consulter les références techniques en fin de chaque doc

---

**Status** : Documentation Alpha - Prête pour développement
