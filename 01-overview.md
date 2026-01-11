# 01 - Vue d'Ensemble

## 1. Pitch du Projet

Un jeu de gestion de bar/pub où le joueur incarne un gérant qui supervise son établissement à distance, similaire à Football Manager. Le joueur se connecte pour consulter l'état en temps réel de son bar (ventes, stocks, affluence, trésorerie) via des dashboards analytiques et prend des décisions stratégiques pour développer son business.

### Concept Clé
**"Manager à distance"** : Le joueur ne sert pas directement les clients, il analyse les données et prend des décisions stratégiques pendant que son bar tourne en continu.

---

## 2. Objectifs du Projet

### Alpha (MVP)
- Simuler le fonctionnement d'un petit bar en temps réel
- Offrir une expérience de gestion analytique avec dashboards
- Permettre des sessions courtes (5-10 minutes) de consultation/décision
- Valider le concept et les mécaniques principales

### Versions Futures
- Expansion multi-établissements
- Événements spéciaux et marketing
- Personnalisation avancée
- Recrutement et formation du personnel
- Gestion fine des marges et rentabilité

---

## 3. Public Cible

- Joueurs intéressés par les jeux de gestion/simulation
- Professionnels de la restauration/bar curieux
- Amateurs de jeux analytiques type "manager"
- Joueurs recherchant une expérience "idle" sophistiquée

---

## 4. Positionnement

### Type de Jeu
- **Genre** : Gestion/Simulation
- **Style** : Manager à distance
- **Rythme** : Idle/Incrémental avec profondeur stratégique

### Inspirations
- **Football Manager** : Approche manager, dashboards analytiques
- **AdVenture Capitalist** : Idle game avec progression continue
- **Game Dev Tycoon** : Gestion business avec croissance

### Différenciation
- Focus sur l'analyse de données temps réel
- Simulation réaliste avec facteurs multiples (météo, événements, réputation)
- Pas de micro-management, pure stratégie

---

## 5. Boucle de Gameplay

```
┌──────────────┐
│  CONNEXION   │ → Le joueur se connecte
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   ANALYSE    │ → Lecture des dashboards
│              │   - CA, clients, satisfaction
│              │   - Stocks critiques
│              │   - Trésorerie, dépenses
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   DÉCISION   │ → Actions stratégiques
│              │   - Commander stocks
│              │   - Ajuster prix
│              │   - (Future: recruter, événements)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ DÉCONNEXION  │ → Le bar continue en arrière-plan
└──────┬───────┘
       │
       ▼
┌──────────────┐
│    RETOUR    │ → Découverte évolution
│              │   - Qu'est-ce qui s'est passé ?
│              │   - Bénéfices/pertes
│              │   - Nouveaux défis
└──────────────┘
```

### Durée de Session Typique
**5-10 minutes** par connexion :
- 2 min : Consultation dashboards
- 3 min : Analyse tendances
- 3 min : Prise de décisions (commandes, ajustements)
- 2 min : Vérification impact des changements

---

## 6. Motivation Principale du Joueur

### Focus : Gérer la Croissance

Le joueur cherche à :
- ✅ **Augmenter le CA** : Vendre plus, optimiser les prix
- ✅ **Optimiser la rentabilité** : Meilleurs marges, réduction coûts
- ✅ **Développer la réputation** : Satisfaction client élevée
- ✅ **Accumuler de la trésorerie** : Investir dans la croissance

### Plaisir de Jeu

**Court terme** (chaque session) :
- Voir l'impact de ses décisions
- Résoudre les problèmes (rupture stock, clients insatisfaits)
- Optimiser les marges produit par produit

**Moyen terme** (semaine) :
- Augmentation progressive du CA
- Amélioration de la réputation
- Déblocage de nouvelles possibilités (futures versions)

**Long terme** (mois) :
- Croissance significative du business
- Expansion (multi-bars dans futures versions)
- Maîtrise totale de la gestion

---

## 7. Spécificités Techniques Clés

### Temps Réel
- **Échelle** : 1:1 (1 heure réelle = 1 heure de jeu)
- **Simulation** : Continue 24/7, même joueur déconnecté
- **Horaires** : Bar ouvert 18h-1h (7h/jour)

### Gestion
- **Établissement** : 1 petit bar par compte (alpha)
- **Employés** : 1-3 maximum (alpha)
- **Produits** : Références réelles (marques)
- **Fournisseurs** : Multiples avec prix/délais différents

### Interface
- **Type** : Dashboards analytiques (pas de vue 2D/3D)
- **Dashboards** : 3 principaux (Ventes, Stocks, Finance)
- **Mise à jour** : Temps réel via Socket.io
- **Pas d'alertes** : Consultation manuelle (alpha)

---

## 8. Valeur Ajoutée

### Pour les Joueurs
- **Accessible** : Sessions courtes, peut se jouer au travail
- **Profond** : Mécaniques riches malgré simplicité apparente
- **Réaliste** : Simulation crédible d'un vrai bar
- **Gratifiant** : Progression visible et mesurable

### Pour le Développeur
- **Prototype rapide** : MVP en 3-4 mois solo
- **Scalable** : Architecture pensée pour évolution
- **Cross-platform** : Web-first, déployable partout
- **Moddable** : Structure permettant ajouts faciles

---

## 9. Contraintes Acceptées (Alpha)

Pour valider le concept rapidement, l'alpha aura :

❌ **Pas de** :
- Personnalisation du bar (nom, déco, thème)
- Compétences employés (tous identiques)
- Événements spéciaux
- Marketing / Communication
- Multi-bars
- Application mobile native

✅ **Focus sur** :
- Simulation robuste et réaliste
- Dashboards clairs et utiles
- Boucle de gameplay addictive
- Performance et stabilité

---

## 10. Métriques de Succès (Alpha)

### Techniques
- ✅ Simulation tourne 24/7 sans crash
- ✅ Temps de réponse API < 200ms
- ✅ Mise à jour temps réel < 1s de latence
- ✅ Support 100 utilisateurs simultanés

### Gameplay
- ✅ Taux de rétention J+1 > 40%
- ✅ Taux de rétention J+7 > 20%
- ✅ Session moyenne > 8 minutes
- ✅ Satisfaction utilisateur > 4/5

### Développement
- ✅ MVP livré en 16 semaines max
- ✅ Code maintenable (tests, doc)
- ✅ Déploiement < 30 min
- ✅ 0 régression sur fonctionnalités core

---

## Prochaines Étapes

1. Lire [02-specifications.md](02-specifications.md) pour détails fonctionnels
2. Consulter [04-architecture.md](04-architecture.md) pour vue technique
3. Explorer [05-stack-tech.md](05-stack-tech.md) pour technologies

---

**Note** : Cette vue d'ensemble présente la vision globale. Les détails d'implémentation sont dans les autres fichiers de documentation.
