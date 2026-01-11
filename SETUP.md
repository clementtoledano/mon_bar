# 🍺 Bar Management Game - Guide de démarrage

## ✅ Ce qui a été fait

### Étape A - Base de données
- ✅ Configuration Docker avec PostgreSQL, Backend et Frontend
- ✅ Schéma Prisma avec tous les modèles (User, Bar, Product, Inventory, etc.)
- ✅ Migration initiale créée et appliquée
- ✅ Seed data avec 17 produits et 3 fournisseurs

### Étape B - Authentification
- ✅ Routes d'authentification (register, login) avec validation
- ✅ Middleware JWT pour les routes protégées
- ✅ Système de mot de passe journalier (format: JJMMAAAA)
- ✅ API Client avec intercepteurs Axios
- ✅ Context React pour la gestion de l'authentification

### Système de composants réutilisables
- ✅ Button (primary, secondary, danger, success)
- ✅ Input (avec label, error, helperText)
- ✅ Card (avec title, subtitle, padding personnalisable)
- ✅ Alert (info, success, warning, error)

### Pages
- ✅ Page d'accueil / Connexion avec tabs (Login/Register)
- ✅ Dashboard protégé avec statistiques et informations utilisateur

## 🚀 Comment tester l'application

### 1. Accéder à l'application
Ouvrez votre navigateur sur : **http://localhost:3000**

### 2. Se connecter

#### Option 1 : Mot de passe journalier (pour n'importe quel compte)
- Email : `test@bar.com`
- Mot de passe : `11012026` (format: JJMMAAAA - aujourd'hui)

#### Option 2 : Mot de passe classique
- Email : `test@bar.com`
- Mot de passe : `password123`

#### Option 3 : Créer un nouveau compte
1. Cliquez sur l'onglet "Inscription"
2. Remplissez les champs
3. Créez votre compte

### 3. Tester le mot de passe journalier

Le système accepte toujours le mot de passe du jour au format **JJMMAAAA** :
- Aujourd'hui (11 janvier 2026) : `11012026`
- Demain : `12012026`
- Etc.

Ce mot de passe fonctionne pour **tous les comptes** existants !

## 🔧 Commandes utiles

### Docker
```bash
# Voir les logs
docker-compose logs -f

# Redémarrer les services
docker-compose restart

# Arrêter tout
docker-compose down

# Rebuild complet
docker-compose up -d --build
```

### Base de données
```bash
# Accéder à Prisma Studio (interface graphique pour la BDD)
docker-compose exec backend npm run prisma:studio

# Créer une nouvelle migration
docker-compose exec backend npx prisma migrate dev --name nom_migration

# Réinitialiser la BDD
docker-compose exec backend npx prisma migrate reset
```

### Backend
```bash
# Logs du backend
docker-compose logs backend -f

# Accéder au conteneur
docker-compose exec backend sh
```

### Frontend
```bash
# Logs du frontend
docker-compose logs frontend -f

# Accéder au conteneur
docker-compose exec frontend sh
```

## 📊 Services disponibles

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Interface Next.js |
| Backend API | http://localhost:5000 | API Express + Socket.io |
| PostgreSQL | localhost:5432 | Base de données |

## 🎯 Prochaines étapes suggérées

1. **Système de création de bar**
   - Formulaire pour créer son premier bar
   - Choisir le nom, le budget initial

2. **Gestion des stocks**
   - Interface pour voir l'inventaire
   - Commander auprès des fournisseurs
   - Alertes stock faible

3. **Simulation temps réel**
   - Moteur de génération de clients
   - Ventes automatiques
   - Événements aléatoires (météo, fêtes)

4. **Gestion du personnel**
   - Recruter des employés
   - Gérer les salaires
   - Impact sur l'efficacité

5. **Dashboard avancé**
   - Graphiques de ventes
   - Statistiques détaillées
   - Prédictions

## 🐛 Troubleshooting

### Le frontend ne se charge pas
```bash
docker-compose restart frontend
docker-compose logs frontend
```

### Erreur de connexion à la BDD
```bash
docker-compose restart postgres backend
```

### Erreur "Cannot find module"
```bash
docker-compose down
docker-compose up -d --build
```

## 📝 Structure du projet

```
mon_bar/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── api.ts
│   └── package.json
└── docker-compose.yml
```

## 🔐 Sécurité

- Les mots de passe sont hashés avec bcrypt
- JWT pour l'authentification
- Variables d'environnement pour les secrets
- Validation des inputs côté backend

**Note:** Le mot de passe journalier est une fonctionnalité de développement. En production, il faudrait le désactiver !
