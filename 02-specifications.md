# 02 - Spécifications Fonctionnelles

## 1. Paramètres de Jeu

### 1.1 Temps
- **Échelle** : 1:1 (1 heure réelle = 1 heure dans le jeu)
- **Horaires d'ouverture** : 18h00 - 01h00 (7 heures/jour)
- **Simulation** : Continue 24h/24, 7j/7 (même joueur déconnecté)
- **Jour de référence** : Temps serveur (UTC ou heure locale configurable)

### 1.2 Établissement
- **Type** : Petit bar (version alpha)
- **Capacité** : 1-3 employés maximum
- **Personnalisation** : Aucune (alpha) - bar pré-configuré
- **Localisation** : Non spécifiée (alpha)

---

## 2. Scénario de Démarrage

### 2.1 Situation Initiale

Le joueur démarre avec :

**Bar Pré-configuré**
- Local équipé et opérationnel
- Nom générique : "Le Comptoir" (non modifiable en alpha)
- Thème standard

**Budget de Départ**
- Trésorerie : 10 000€
- À utiliser pour :
  - Achats de stocks
  - Paiement des premières charges
  - Réserve de sécurité

**Personnel**
- 2 employés déjà embauchés
- Salaire : 1 800€/mois chacun
- Polyvalents (pas de spécialisation)

**Stock Initial**
- Assortiment basique de chaque catégorie
- Équivalent à ~3 jours de vente
- Valeur totale : ~2 000€

**Réputation**
- Score initial : 50/100
- Quelques clients réguliers déjà acquis

### 2.2 Premier Objectif (Implicite)

Bien qu'il n'y ait pas d'objectifs imposés (mode bac à sable), le joueur doit naturellement :
- Maintenir la trésorerie positive
- Réapprovisionner les stocks avant rupture
- Développer progressivement son CA

---

## 3. Gestion des Employés

### 3.1 Caractéristiques

**Nombre**
- Minimum : 1 employé
- Maximum : 3 employés (alpha)
- Recommandé pour démarrage : 2 employés

**Rôles**
- Pas de spécialisation (alpha)
- Tous polyvalents : service, bar, caisse
- Attribution automatique des tâches

**Compétences**
- Pas de système de compétences (alpha)
- Tous identiques en performance
- Pas de progression/XP

### 3.2 Gestion

**Planning**
- Géré automatiquement par le jeu
- Répartition équitable des heures d'ouverture
- Présence garantie pendant les heures de service

**Salaires**
- Fixe mensuel : 1 800€/employé
- Paiement automatique le 1er du mois
- Déduction directe de la trésorerie

**Embauche/Licenciement**
- Possible via interface dédiée (future)
- Alpha : fonctionnalité non implémentée
- Personnel initial non modifiable

### 3.3 Impact sur le Jeu

**Ratio Employés/Clients**
- 1 employé : gère ~15-20 clients simultanés
- 2 employés : gère ~30-40 clients simultanés
- 3 employés : gère ~45-60 clients simultanés

**Sous-staffing**
- Temps d'attente augmente
- Satisfaction Service diminue
- Impact négatif sur réputation

**Over-staffing**
- Coût salaire élevé vs CA
- Pas d'autre inconvénient (alpha)

---

## 4. Produits & Catalogue

### 4.1 Niveau de Détail

**Type** : Références précises réelles (marques)

**Catégories** :

**Bières** (15-20 références)
- Pression : Heineken, 1664, Grimbergen, Stella Artois
- Bouteilles : Corona, Desperados, Leffe, Hoegaarden

**Vins** (10-15 références)
- Rouge : Bordeaux, Côtes du Rhône, Bourgogne
- Blanc : Chardonnay, Sauvignon, Muscadet
- Rosé : Provence, Pays d'Oc

**Spiritueux** (15-20 références)
- Whisky : Jack Daniel's, Chivas, Johnnie Walker
- Vodka : Absolut, Grey Goose, Smirnoff
- Rhum : Havana Club, Bacardi, Diplomatico
- Gin : Bombay, Hendrick's, Tanqueray

**Softs** (8-10 références)
- Coca-Cola, Coca-Cola Zero, Sprite
- Orangina, Schweppes (Tonic, Citron)
- Perrier, Badoit
- Jus (Orange, Pomme, Tomate)

**Snacks** (5-8 références)
- Chips (Lay's nature, barbecue)
- Cacahuètes
- Olives
- Saucisson
- Fromage (portions)

### 4.2 Attributs Produits

Chaque produit a :

```typescript
interface Product {
  id: number;
  name: string;
  brand: string;
  category: 'beer' | 'wine' | 'spirits' | 'soft' | 'snacks';
  basePrice: number;        // Prix de vente conseillé
  currentPrice: number;     // Prix réel dans le bar (modifiable)
  costPrice: number;        // Prix de revient moyen
  volume?: number;          // ml (pour boissons)
  weight?: number;          // g (pour snacks)
  alcoholDegree?: number;   // % vol (pour alcools)
}
```

**Exemples** :
```
Heineken (25cl pression)
- basePrice: 5.00€
- costPrice: 1.50€
- marge: 70%

Coca-Cola (33cl)
- basePrice: 4.00€
- costPrice: 1.00€
- marge: 75%

Chips Lay's
- basePrice: 3.00€
- costPrice: 0.80€
- marge: 73%
```

---

## 5. Gestion des Stocks

### 5.1 Système de Stocks

**Unité de mesure**
- Bières pression : litres (fûts de 20L, 30L, 50L)
- Bouteilles : unités
- Softs : unités (bouteilles/canettes)
- Snacks : unités (sachets/portions)

**Stockage**
- Capacité illimitée (alpha)
- Pas de notion de péremption (alpha)
- Valeur totale du stock visible

### 5.2 Réapprovisionnement

**Mode** : Manuel uniquement

**Processus** :
1. Joueur consulte dashboard Stocks
2. Identifie produits à commander
3. Sélectionne fournisseur
4. Compose panier
5. Valide commande
6. Attend livraison

**Pas de système automatique** (alpha)
- Pas de seuil d'alerte
- Pas de commande automatique
- Responsabilité 100% joueur

### 5.3 Rupture de Stock

**Conséquences** :
- Produit non disponible pour vente
- Clients peuvent partir insatisfaits
- Impact négatif sur satisfaction
- Perte de CA potentiel

**Affichage** :
- Stock = 0 → Icône ⚠️ dans dashboard
- Produit grisé dans liste

---

## 6. Système de Fournisseurs

### 6.1 Fonctionnement Complet

**Plusieurs fournisseurs disponibles** :
- Choix stratégique selon besoins
- Prix différents pour mêmes produits
- Délais de livraison variables
- Conditions de remise

### 6.2 Exemples de Fournisseurs

**Fournisseur A : Brasserie Premium**
```
Spécialisation : Bières craft et premium
Prix : +15% vs marché
Délai livraison : 24h
Remise : 5% si commande >500€
Catalogue : 30 références bières
```

**Fournisseur B : Grossiste Généraliste**
```
Spécialisation : Tout assortiment
Prix : Standard marché
Délai livraison : 48h
Remise : 10% si commande >1000€
Catalogue : 80 références (toutes catégories)
```

**Fournisseur C : Discount**
```
Spécialisation : Produits entrée de gamme
Prix : -20% vs marché
Délai livraison : 72h
Remise : Pas de remise
Catalogue : 40 références basiques
```

**Fournisseur D : Caviste Spécialisé**
```
Spécialisation : Vins et spiritueux premium
Prix : +25% vs marché
Délai livraison : 24h
Remise : 8% si commande >800€
Catalogue : 50 références vins/spirits haut de gamme
```

### 6.3 Négociation & Relations

**Système de remises** :
- Basé sur montant commande
- Calcul automatique à la validation
- Affiché en temps réel dans panier

**Relations commerciales** (future) :
- Alpha : pas de système de fidélité
- Future : remises croissantes selon historique

### 6.4 Interface Commande

**Workflow** :
1. Sélection fournisseur
2. Parcours catalogue (filtres par catégorie)
3. Ajout produits au panier
4. Affichage :
   - Sous-total
   - Remise applicable
   - Total TTC
   - Date livraison estimée
5. Validation
6. Déduction trésorerie immédiate
7. Livraison à la date prévue

---

## 7. Clients & Affluence

### 7.1 Représentation

**Format** : Groupes de clients avec caractéristiques

**Pas de clients individuels** (alpha) :
- Optimisation performance
- Simplification gameplay
- Focus sur macro-gestion

### 7.2 Types de Groupes

| Type | Taille | Budget/pers | Durée (min) | Fréquence |
|------|--------|-------------|-------------|-----------|
| **Étudiants** | 3-6 | 8-15€ | 90-180 | 25% |
| **Couples** | 2 | 20-40€ | 60-120 | 30% |
| **Afterwork** | 4-8 | 15-30€ | 90-150 | 20% |
| **Habitués** | 1-2 | 12-25€ | 120-240 | 15% |
| **Touristes** | 2-4 | 25-50€ | 45-90 | 5% |
| **Solo** | 1 | 10-20€ | 60-180 | 5% |

### 7.3 Caractéristiques par Type

**Étudiants**
- Sensibilité prix : Élevée
- Préférences : Bières pas chères, softs
- Comportement : Bruyants, longue durée
- Impact ambiance : Peut déranger autres groupes

**Couples**
- Sensibilité prix : Moyenne
- Préférences : Vins, cocktails
- Comportement : Calmes, romantiques
- Impact ambiance : Positif

**Afterwork**
- Sensibilité prix : Faible
- Préférences : Bières, cocktails, snacks
- Comportement : Animés, dépensiers
- Impact ambiance : Très positif

**Habitués**
- Sensibilité prix : Moyenne
- Préférences : Leurs boissons favorites
- Comportement : Fidèles, constants
- Impact ambiance : Stabilisant

**Touristes**
- Sensibilité prix : Faible
- Préférences : Produits locaux, découverte
- Comportement : Curieux, photos
- Impact ambiance : Neutre

**Solo**
- Sensibilité prix : Moyenne
- Préférences : Variable
- Comportement : Calme, lecture/smartphone
- Impact ambiance : Neutre

### 7.4 Facteurs d'Affluence

**Tous ces facteurs sont pris en compte** :

**1. Temporels**
- Heure de la journée (voir formule dans 03-game-mechanics.md)
- Jour de la semaine (weekend > semaine)
- Saison (été > hiver pour terrasse)
- Période de l'année (vacances, fêtes)

**2. Réputation**
- Score 0-100
- Impact multiplicateur sur affluence
- Basé sur satisfaction historique

**3. Événements Sportifs**
- Match de foot important : +30% affluence
- Finale/événement majeur : +50% affluence
- Type de clientèle : Groupes afterwork, habitués

**4. Événements Culturels**
- Concert dans le quartier : +20% affluence
- Festival : +40% affluence
- Type clientèle : Touristes, couples

**5. Fêtes & Jours Spéciaux**
- Saint-Sylvestre : +80% affluence
- 14 juillet : +60% affluence
- Halloween, Noël : +30-40% affluence

**6. Météo**
- Beau temps : +10% affluence (terrasse)
- Canicule : +20% affluence
- Pluie : -10% affluence
- Neige/froid : -30% affluence

---

## 8. Satisfaction Client

### 8.1 Critères Multiples

**4 critères évalués** (0-100% chacun) :

**Service**
- Temps d'attente
- Amabilité (simulée)
- Rapidité du service
- Ratio employés/clients

**Prix**
- Rapport qualité/prix perçu
- Comparaison vs concurrence (baseline)
- Adéquation avec type de clientèle

**Ambiance**
- Niveau sonore
- Propreté (simulée)
- Décoration (fixe en alpha)
- Musique (simulée)

**Qualité**
- Fraîcheur des produits (simulée)
- Température boissons (simulée)
- Présentation (fixe)

### 8.2 Calcul & Impact

**Note globale** :
```
Satisfaction Globale = (Service + Prix + Ambiance + Qualité) / 4
```

**Impact sur Réputation** :
- Satisfaction > 80% : Réputation +1/jour
- Satisfaction 60-80% : Réputation stable
- Satisfaction < 60% : Réputation -1/jour

**Impact sur Affluence** :
- Réputation directement dans formule affluence
- Bouche-à-oreille (futur)

---

## 9. Économie & Finances

### 9.1 Difficulté

**Niveau** : Équilibré

**Caractéristiques** :
- Objectifs atteignables avec bonne gestion
- Possibilité d'erreurs récupérables
- Pas de game over brutal (alpha)
- Courbe d'apprentissage douce

### 9.2 Revenus

**Sources** :
- Ventes de boissons (80% CA)
- Ventes de snacks (20% CA)

**Tarification** :
- Prix par défaut suggérés
- Modifiables par le joueur (future)
- Alpha : prix fixes

**Marges moyennes** :
- Bières : 60-70%
- Vins : 50-60%
- Spiritueux : 65-75%
- Softs : 70-75%
- Snacks : 70-75%

### 9.3 Charges

**Fixes Mensuelles** :

```
Loyer : 2 000€/mois
Assurances : 300€/mois
Électricité : 250€/mois
Eau : 100€/mois
Internet/Tel : 80€/mois
SACEM : 150€/mois

Salaires (2 employés) : 3 600€/mois

Total Fixes : ~6 480€/mois
```

**Variables** :
- Achats de stocks (selon ventes)
- Livraisons (inclus dans prix fournisseur)
- Maintenance (future)
- Marketing (future)

### 9.4 Monnaie

**Devise** : Euro (€)
**Précision** : Centimes (2 décimales)
**Affichage** : 1 234,56€ (format français)

---

## 10. Sauvegarde & Persistance

### 10.1 Type de Sauvegarde

**Auto-save continue en temps réel**
- Sauvegarde automatique à chaque changement significatif
- Pas de bouton "Sauvegarder"
- Pas de risque de perte de données

### 10.2 Données Sauvegardées

**État du bar** :
- Trésorerie
- Stocks (quantité par produit)
- Employés actifs
- Réputation

**Historique** :
- Ventes (30 jours minimum)
- Satisfaction (30 jours minimum)
- Commandes (30 jours minimum)
- Transactions financières (30 jours minimum)

**Groupes clients** :
- Clients actuellement dans le bar
- Timestamp arrivée/départ

### 10.3 Gestion des Comptes

**1 compte = 1 bar unique** (alpha)
- Pas de multi-bars
- Pas de multi-comptes par utilisateur
- Authentification simple (email + password)

---

## Prochaine Lecture

👉 [03-game-mechanics.md](03-game-mechanics.md) - Détails des mécaniques et formules de simulation
