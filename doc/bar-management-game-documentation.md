# Documentation Complète - Jeu de Gestion de Bar/Pub

**Version** : 1.0 (Alpha)  
**Date** : 11 janvier 2026  
**Auteur** : Clément

---

## Table des Matières

1. [Vue d'Ensemble](#1-vue-densemble)
2. [Concept du Jeu](#2-concept-du-jeu)
3. [Spécifications Fonctionnelles](#3-spécifications-fonctionnelles)
4. [Architecture Technique](#4-architecture-technique)
5. [Stack Technologique](#5-stack-technologique)
6. [Modèle de Données](#6-modèle-de-données)
7. [Interfaces & Dashboards](#7-interfaces--dashboards)
8. [Simulation & Mécaniques](#8-simulation--mécaniques)
9. [Déploiement](#9-déploiement)
10. [Roadmap](#10-roadmap)

---

## 1. Vue d'Ensemble

### 1.1 Pitch du Projet

Un jeu de gestion de bar/pub où le joueur incarne un gérant qui supervise son établissement à distance, similaire à Football Manager. Le joueur se connecte pour consulter l'état en temps réel de son bar (ventes, stocks, affluence, trésorerie) via des dashboards analytiques et prend des décisions stratégiques pour développer son business.

### 1.2 Objectifs du Projet

**Alpha (MVP)**
- Simuler le fonctionnement d'un petit bar en temps réel
- Offrir une expérience de gestion analytique avec dashboards
- Permettre des sessions courtes (5-10 minutes) de consultation/décision
- Valider le concept et les mécaniques principales

**Versions Futures**
- Expansion multi-établissements
- Événements spéciaux et marketing
- Personnalisation avancée
- Recrutement et formation du personnel
- Gestion fine des marges et rentabilité

### 1.3 Public Cible

- Joueurs intéressés par les jeux de gestion/simulation
- Professionnels de la restauration/bar curieux
- Amateurs de jeux analytiques type "manager"
- Joueurs recherchant une expérience "idle" sophistiquée

---

## 2. Concept du Jeu

### 2.1 Positionnement

**Type** : Jeu de gestion/simulation avec approche "manager à distance"

**Gameplay** :
- Le joueur ne contrôle pas directement les actions (pas de "servir un client")
- Vision stratégique et analytique via dashboards
- Prise de décision basée sur les données en temps réel
- Simulation continue même hors connexion

**Inspirations** :
- Football Manager (approche manager, dashboards)
- AdVenture Capitalist (idle game avec progression)
- Game Dev Tycoon (gestion business avec croissance)

### 2.2 Boucle de Gameplay

1. **Connexion** : Le joueur se connecte et consulte l'état actuel
2. **Analyse** : Lecture des dashboards (ventes, stocks, finance)
3. **Décision** : Passe commandes, ajuste stratégie
4. **Déconnexion** : Le bar continue à tourner
5. **Retour** : Découverte de l'évolution depuis la dernière connexion

### 2.3 Motivation Principale

**Focus : Gérer la croissance du business**

Le joueur cherche à :
- Augmenter le chiffre d'affaires
- Optimiser la rentabilité
- Développer la réputation
- Accumuler de la trésorerie pour investir

---

## 3. Spécifications Fonctionnelles

### 3.1 Paramètres de Jeu

#### Temps
- **Échelle** : 1:1 (1 heure réelle = 1 heure de jeu)
- **Horaires d'ouverture** : 18h-1h (7 heures d'ouverture/jour)
- **Simulation** : Continue 24/7, même joueur déconnecté

#### Établissement
- **Type** : Petit bar (version alpha)
- **Capacité** : 1-3 employés maximum
- **Personnalisation** : Aucune (alpha) - bar pré-configuré

### 3.2 Scénario de Démarrage

**Situation initiale** :
- Le joueur hérite/rachète un bar déjà configuré
- Budget de départ fourni (ex: 10 000€)
- Bar opérationnel avec :
  - Local équipé
  - Stock initial
  - 1-2 employés déjà recrutés
  - Quelques clients réguliers

**Objectif** : Pas d'objectif imposé - mode bac à sable avec focus croissance

### 3.3 Gestion des Employés

#### Caractéristiques
- **Nombre** : 1 à 3 employés maximum (alpha)
- **Rôles** : Polyvalents (pas de spécialisation)
- **Compétences** : Aucun système de compétences (alpha)
- **Planning** : Géré automatiquement par le jeu

#### Fonctionnement
- Les employés travaillent pendant les heures d'ouverture
- Attribution automatique des tâches (service, bar, caisse)
- Pas de gestion de fatigue/moral (alpha)
- Salaire fixe mensuel

### 3.4 Produits & Stocks

#### Catalogue
- **Niveau de détail** : Références réelles (marques)
- **Catégories** :
  - Bières (Heineken, Corona, 1664, Grimbergen, etc.)
  - Vins (Rouge, Blanc, Rosé par références)
  - Spiritueux (Whisky, Vodka, Rhum, Gin par marques)
  - Softs (Coca-Cola, Orangina, Perrier, etc.)
  - Snacks (Chips, Cacahuètes, Olives, etc.)

#### Gestion des Stocks
- **Réapprovisionnement** : Manuel (joueur passe commande)
- **Système de fournisseurs** :
  - Plusieurs fournisseurs disponibles
  - Prix différents selon fournisseur
  - Délais de livraison variables
  - Possibilité de négociation selon volumes
  - Relations commerciales à développer

#### Exemple de Fournisseurs
```
Fournisseur A - Brasserie Premium
- Spécialisé bières craft/premium
- Prix +15% vs marché
- Livraison 24h
- Remise 5% si >500€/commande

Fournisseur B - Grossiste Généraliste  
- Large catalogue
- Prix marché standard
- Livraison 48h
- Remise 10% si >1000€/commande

Fournisseur C - Discount
- Produits entrée de gamme
- Prix -20% vs marché
- Livraison 72h
- Pas de remise
```

### 3.5 Clients & Affluence

#### Représentation
- **Format** : Groupes de clients avec caractéristiques
- **Exemples** :
  - Groupe de 4 étudiants (budget limité, longue durée)
  - Couple trentenaire (budget moyen, consommation modérée)
  - Afterwork collègues (5-8 personnes, budget élevé)
  - Habitués solo (fidèles, consommation régulière)

#### Facteurs d'Affluence

**Tous ces facteurs sont pris en compte** :

1. **Temporels**
   - Heure de la journée (pic 20h-23h)
   - Jour de la semaine (weekend > semaine)
   - Saison

2. **Réputation**
   - Note globale du bar
   - Bouche-à-oreille
   - Historique de satisfaction

3. **Événements**
   - Événements organisés par le bar (future version)
   - Événements sportifs (match important)
   - Concerts/spectacles dans le quartier
   - Fêtes/événements locaux

4. **Contextuels**
   - Météo (terrasse si beau temps)
   - Vacances scolaires
   - Événements exceptionnels

#### Satisfaction Client

**Critères multiples** :
- **Service** : Temps d'attente, amabilité
- **Prix** : Rapport qualité/prix perçu
- **Ambiance** : Musique, propreté, confort
- **Qualité** : Fraîcheur produits, température, présentation

**Mesure** :
- Note par critère (0-100%)
- Note globale calculée
- Impact direct sur affluence et réputation

### 3.6 Économie & Finances

#### Difficulté
- **Niveau** : Équilibré
- **Caractéristiques** :
  - Objectifs atteignables avec bonne gestion
  - Risque de difficultés si mauvaises décisions
  - Possibilité de récupération après erreurs
  - Pas de game over brutal (alpha)

#### Revenus
- Ventes de boissons et snacks
- Marges variables selon produit
- Prix ajustables par le joueur

#### Charges
- **Fixes** :
  - Loyer mensuel
  - Salaires employés
  - Charges (électricité, eau, etc.)
  - Assurances

- **Variables** :
  - Achats stocks
  - Livraisons
  - Maintenance/réparations

#### Monnaie
- **Devise** : Euro (€)
- **Précision** : Centimes

### 3.7 Sauvegarde & Persistance

- **Type** : Auto-save continue en temps réel
- **Fréquence** : Toutes les modifications importantes
- **Historique** : Conservation 30 jours minimum
- **Format** : Base de données relationnelle
- **Compte** : 1 compte = 1 bar unique

---

## 4. Architecture Technique

### 4.1 Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────┐
│                    Serveur Dédié                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Docker Compose                       │  │
│  │                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │  PostgreSQL  │  │  Backend     │             │  │
│  │  │  Database    │◄─┤  .NET Core   │             │  │
│  │  └──────────────┘  │  + SignalR   │             │  │
│  │                    │  + Worker    │             │  │
│  │                    └──────┬───────┘             │  │
│  │                           │                      │  │
│  │                    ┌──────▼───────┐             │  │
│  │                    │   Frontend   │             │  │
│  │                    │   Next.js    │             │  │
│  │                    └──────────────┘             │  │
│  │                                                   │  │
│  │  ┌──────────────────────────────────────────┐   │  │
│  │  │            Nginx Reverse Proxy           │   │  │
│  │  └──────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Internet   │
                    │    Users     │
                    └──────────────┘
```

### 4.2 Architecture Backend

#### Composants Principaux

**1. API REST (ASP.NET Core)**
- Endpoints pour opérations CRUD
- Authentification JWT
- Validation des données
- Gestion des erreurs

**2. SignalR Hub**
- Communication temps réel
- Push des mises à jour aux clients
- Groupes par utilisateur
- Reconnexion automatique

**3. Background Worker (IHostedService)**
- Simulation continue du bar
- Exécution toutes les X secondes (à définir)
- Gestion de l'état global
- Calculs d'affluence, ventes, satisfaction

**4. Services**
```
BarSimulationService
├── CustomerFlowService (affluence)
├── SalesService (ventes)
├── StockService (inventaire)
├── EmployeeService (gestion employés)
├── SupplierService (commandes)
└── FinanceService (comptabilité)
```

#### Patterns & Architecture

**CQRS avec MediatR**
```csharp
// Commands
public class PlaceOrderCommand : IRequest<OrderResult>
{
    public int SupplierId { get; set; }
    public List<OrderItem> Items { get; set; }
}

// Queries
public class GetDashboardDataQuery : IRequest<DashboardDto>
{
    public int BarId { get; set; }
    public DateTime? From { get; set; }
}

// Handlers
public class PlaceOrderCommandHandler : 
    IRequestHandler<PlaceOrderCommand, OrderResult>
{
    // Logic here
}
```

**Repository Pattern**
```csharp
public interface IBarRepository
{
    Task<Bar> GetByIdAsync(int id);
    Task<IEnumerable<Sale>> GetSalesHistoryAsync(int barId, DateTime from, DateTime to);
    Task UpdateStockAsync(Stock stock);
}
```

### 4.3 Architecture Frontend

#### Structure Next.js

```
/app
  /(auth)
    /login
    /register
  /(dashboard)
    /layout.tsx          # Layout principal avec nav
    /page.tsx            # Redirection vers /sales
    /sales               # Dashboard ventes
    /inventory           # Dashboard stocks
    /finance             # Dashboard finance
  /api
    /auth               # API routes si besoin
  
/components
  /ui                   # shadcn/ui components
  /dashboards
    /SalesChart.tsx
    /InventoryTable.tsx
    /FinanceMetrics.tsx
  /shared
    /Header.tsx
    /Sidebar.tsx

/lib
  /api-client.ts        # Client pour appeler backend
  /signalr-client.ts    # Configuration SignalR
  /types.ts             # Types TypeScript

/hooks
  /useRealTimeData.ts   # Hook SignalR
  /useBarData.ts        # Hook données bar
```

#### Communication Temps Réel

**SignalR Client**
```typescript
// lib/signalr-client.ts
import * as signalR from "@microsoft/signalr";

export const createConnection = (barId: number) => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${process.env.NEXT_PUBLIC_API_URL}/hubs/bar`)
    .withAutomaticReconnect()
    .build();

  return connection;
};

// hooks/useRealTimeData.ts
export function useRealTimeData(barId: number) {
  const [data, setData] = useState<BarState | null>(null);

  useEffect(() => {
    const connection = createConnection(barId);
    
    connection.on("BarStateUpdate", (update: BarState) => {
      setData(update);
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, [barId]);

  return data;
}
```

### 4.4 Base de Données

#### Schéma Principal (PostgreSQL)

**Tables Core**

```sql
-- Bar principal
CREATE TABLE bars (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    cash_balance DECIMAL(10, 2) NOT NULL,
    reputation_score INTEGER DEFAULT 50,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Employés
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    name VARCHAR(100) NOT NULL,
    monthly_salary DECIMAL(8, 2) NOT NULL,
    hire_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- Produits (catalogue)
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    brand VARCHAR(50),
    base_price DECIMAL(6, 2) NOT NULL
);

-- Stocks
CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    last_restocked_at TIMESTAMP,
    UNIQUE(bar_id, product_id)
);

-- Fournisseurs
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    delivery_delay_hours INTEGER NOT NULL,
    discount_threshold DECIMAL(8, 2),
    discount_percentage DECIMAL(5, 2)
);

-- Relations Produits-Fournisseurs
CREATE TABLE supplier_products (
    id SERIAL PRIMARY KEY,
    supplier_id INTEGER REFERENCES suppliers(id),
    product_id INTEGER REFERENCES products(id),
    price DECIMAL(6, 2) NOT NULL,
    UNIQUE(supplier_id, product_id)
);

-- Commandes
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    order_date TIMESTAMP NOT NULL,
    delivery_date TIMESTAMP NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL, -- pending, delivered, cancelled
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(6, 2) NOT NULL
);

-- Ventes
CREATE TABLE sales (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(6, 2) NOT NULL,
    total_amount DECIMAL(8, 2) NOT NULL,
    sale_timestamp TIMESTAMP NOT NULL,
    customer_group_type VARCHAR(50) -- 'students', 'couples', 'afterwork', 'regulars'
);

-- Groupes de clients (en cours dans le bar)
CREATE TABLE customer_groups (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    group_type VARCHAR(50) NOT NULL,
    size INTEGER NOT NULL,
    arrival_time TIMESTAMP NOT NULL,
    departure_time TIMESTAMP,
    total_spent DECIMAL(8, 2) DEFAULT 0,
    satisfaction_service INTEGER,
    satisfaction_price INTEGER,
    satisfaction_ambiance INTEGER,
    satisfaction_quality INTEGER
);

-- Métriques satisfaction (historique)
CREATE TABLE satisfaction_history (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    recorded_at TIMESTAMP NOT NULL,
    avg_service INTEGER,
    avg_price INTEGER,
    avg_ambiance INTEGER,
    avg_quality INTEGER,
    avg_overall INTEGER
);

-- Charges fixes
CREATE TABLE fixed_expenses (
    id SERIAL PRIMARY KEY,
    bar_id INTEGER REFERENCES bars(id),
    expense_type VARCHAR(50) NOT NULL, -- 'rent', 'insurance', 'utilities'
    amount DECIMAL(8, 2) NOT NULL,
    frequency VARCHAR(20) NOT NULL, -- 'monthly', 'quarterly'
    next_due_date DATE NOT NULL
);

-- Événements externes (facteurs affluence)
CREATE TABLE external_events (
    id SERIAL PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL, -- 'sports', 'concert', 'holiday', 'weather'
    event_name VARCHAR(100),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    impact_factor DECIMAL(3, 2) NOT NULL, -- multiplicateur affluence (0.5 à 2.0)
    geographic_zone VARCHAR(50)
);
```

#### Indexes pour Performance

```sql
CREATE INDEX idx_sales_bar_timestamp ON sales(bar_id, sale_timestamp DESC);
CREATE INDEX idx_inventory_bar_product ON inventory(bar_id, product_id);
CREATE INDEX idx_customer_groups_bar_active ON customer_groups(bar_id) WHERE departure_time IS NULL;
CREATE INDEX idx_orders_bar_status ON orders(bar_id, status);
CREATE INDEX idx_external_events_time ON external_events(start_time, end_time);
```

---

## 5. Stack Technologique

### 5.1 Backend

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Runtime** | .NET Core | 8/9 LTS | Maîtrise développeur, performance, LTS |
| **API Framework** | ASP.NET Core | - | Standard pour APIs REST .NET |
| **Temps Réel** | SignalR | - | Intégré .NET, WebSocket natif |
| **ORM** | Entity Framework Core | - | Familiarité développeur, ou NHibernate |
| **CQRS** | MediatR | - | Séparation commands/queries claire |
| **Validation** | FluentValidation | - | Validation expressive |
| **Logging** | Serilog | - | Logs structurés, multiples sinks |
| **Background Jobs** | IHostedService | - | Natif .NET, pas de dépendance externe |

### 5.2 Base de Données

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **SGBD** | PostgreSQL | 16+ | Gratuit, performant, moins gourmand que SQL Server |
| **Client .NET** | Npgsql | - | Provider PostgreSQL pour EF Core |
| **Migrations** | FluentMigrator ou EF Migrations | - | Gestion schéma versionné |

### 5.3 Frontend

| Composant | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| **Framework** | Next.js | 15 | SSR, App Router, optimisations |
| **UI Library** | React | 18+ | Standard moderne |
| **UI Components** | shadcn/ui | - | Components accessibles, customisables |
| **Styling** | Tailwind CSS | - | Utilitaire, rapide |
| **Charts** | Recharts | - | Charts React natifs, responsive |
| **SignalR Client** | @microsoft/signalr | - | Client officiel SignalR |
| **HTTP Client** | Fetch API / Axios | - | Requêtes API REST |
| **State Management** | React Context / Zustand | - | État global léger |
| **Forms** | React Hook Form | - | Validation performante |

### 5.4 Infrastructure & DevOps

| Composant | Technologie | Justification |
|-----------|-------------|---------------|
| **OS Serveur** | Ubuntu Server 24.04 LTS | Gratuit, stable, excellente doc |
| **Conteneurisation** | Docker + Docker Compose | Isolation, reproductibilité |
| **Reverse Proxy** | Nginx | Performance, SSL, load balancing |
| **SSL** | Let's Encrypt (Certbot) | Gratuit, automatisé |
| **Monitoring** | Serilog → fichiers/console | Simple pour alpha |
| **CI/CD** | GitHub Actions | Gratuit, intégré GitHub |

### 5.5 Spécifications Serveur (Alpha)

**Configuration Minimale** :
- **CPU** : 2 vCPU
- **RAM** : 4 GB
- **Stockage** : 40 GB SSD
- **Bande passante** : 1 TB/mois
- **Coût estimé** : 15-20€/mois (Hetzner, OVH, Scaleway)

**Hébergeurs Recommandés** :
1. **Hetzner Cloud** : Excellent rapport qualité/prix
2. **OVH VPS** : Support français
3. **Scaleway** : Flexible, européen

---

## 6. Modèle de Données

### 6.1 Entités Principales

#### Bar
```csharp
public class Bar
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Name { get; set; }
    public decimal CashBalance { get; set; }
    public int ReputationScore { get; set; } // 0-100
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    // Navigation
    public ICollection<Employee> Employees { get; set; }
    public ICollection<Inventory> Inventory { get; set; }
    public ICollection<Sale> Sales { get; set; }
}
```

#### Employee
```csharp
public class Employee
{
    public int Id { get; set; }
    public int BarId { get; set; }
    public string Name { get; set; }
    public decimal MonthlySalary { get; set; }
    public DateTime HireDate { get; set; }
    public bool IsActive { get; set; }
    
    // Navigation
    public Bar Bar { get; set; }
}
```

#### Product
```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ProductCategory Category { get; set; }
    public string Brand { get; set; }
    public decimal BasePrice { get; set; }
    
    // Navigation
    public ICollection<SupplierProduct> SupplierProducts { get; set; }
}

public enum ProductCategory
{
    Beer,
    Wine,
    Spirits,
    Soft,
    Snacks
}
```

#### Supplier
```csharp
public class Supplier
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int DeliveryDelayHours { get; set; }
    public decimal? DiscountThreshold { get; set; }
    public decimal? DiscountPercentage { get; set; }
    
    // Navigation
    public ICollection<SupplierProduct> Products { get; set; }
    public ICollection<Order> Orders { get; set; }
}
```

#### Sale
```csharp
public class Sale
{
    public int Id { get; set; }
    public int BarId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime SaleTimestamp { get; set; }
    public CustomerGroupType CustomerGroupType { get; set; }
    
    // Navigation
    public Bar Bar { get; set; }
    public Product Product { get; set; }
}

public enum CustomerGroupType
{
    Students,
    Couples,
    Afterwork,
    Regulars,
    Tourists,
    Solo
}
```

#### CustomerGroup
```csharp
public class CustomerGroup
{
    public int Id { get; set; }
    public int BarId { get; set; }
    public CustomerGroupType GroupType { get; set; }
    public int Size { get; set; }
    public DateTime ArrivalTime { get; set; }
    public DateTime? DepartureTime { get; set; }
    public decimal TotalSpent { get; set; }
    
    // Satisfaction (0-100 per criteria)
    public int? SatisfactionService { get; set; }
    public int? SatisfactionPrice { get; set; }
    public int? SatisfactionAmbiance { get; set; }
    public int? SatisfactionQuality { get; set; }
    
    public int? SatisfactionOverall => 
        (SatisfactionService + SatisfactionPrice + 
         SatisfactionAmbiance + SatisfactionQuality) / 4;
    
    // Navigation
    public Bar Bar { get; set; }
}
```

### 6.2 DTOs (Data Transfer Objects)

#### DashboardDto
```csharp
public class DashboardSalesDto
{
    public decimal TodayRevenue { get; set; }
    public decimal TodayTarget { get; set; }
    public int CustomersServed { get; set; }
    public int CustomersWaiting { get; set; }
    public List<TopProductDto> TopProducts { get; set; }
    public List<SalesChartDataDto> HourlySales { get; set; }
    public SatisfactionMetricsDto Satisfaction { get; set; }
}

public class DashboardInventoryDto
{
    public List<StockItemDto> CriticalStocks { get; set; }
    public List<StockItemDto> AllStocks { get; set; }
    public List<PendingOrderDto> PendingOrders { get; set; }
    public decimal TotalInventoryValue { get; set; }
}

public class DashboardFinanceDto
{
    public decimal CashBalance { get; set; }
    public decimal MonthlyRevenue { get; set; }
    public decimal MonthlyExpenses { get; set; }
    public decimal MonthlyProfit { get; set; }
    public List<ExpenseBreakdownDto> ExpenseBreakdown { get; set; }
    public List<RevenueChartDataDto> DailyRevenue { get; set; }
}
```

---

## 7. Interfaces & Dashboards

### 7.1 Dashboard Analyse Ventes

**Objectif** : Vue temps réel des performances commerciales

**Métriques Principales**
- CA du jour vs objectif (jauge circulaire)
- Nombre de clients servis
- Nombre de clients actuellement dans le bar
- Nombre de clients en attente

**Graphiques**
1. **Évolution CA par heure** (ligne)
   - X: Heures (18h-1h)
   - Y: CA en €
   - Comparaison J-1, J-7

2. **Top 10 Produits** (barres horizontales)
   - Produits les plus vendus
   - Quantité + CA généré
   - Filtrable par catégorie

3. **Répartition CA par Catégorie** (donut)
   - Bières, Vins, Spiritueux, Softs, Snacks
   - Pourcentage du CA total

**Satisfaction Client**
- Jauge par critère (Service, Prix, Ambiance, Qualité)
- Évolution tendance (↑↓→)
- Note globale

**Maquette ASCII**
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard Ventes                           🔄 Temps réel   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ CA Jour    │  │ Clients    │  │ En attente │            │
│  │ 1,250€ ●75%│  │ 87         │  │ 5          │            │
│  │ /1,650€    │  │ servis     │  │ clients    │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                               │
│  ┌──────────────── CA par Heure ────────────────────────┐   │
│  │                                                        │   │
│  │  500€ ┤                            ●────●             │   │
│  │  400€ ┤                       ●────┘                  │   │
│  │  300€ ┤                 ●────┘                        │   │
│  │  200€ ┤           ●────┘                              │   │
│  │  100€ ┤     ●────┘                                    │   │
│  │    0€ └────┴────┴────┴────┴────┴────┴────┴────┴──   │   │
│  │       18h  19h  20h  21h  22h  23h  00h  01h         │   │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌─────── Top Produits ───────┐  ┌── Satisfaction ─────┐   │
│  │ 1. Heineken      45  220€  │  │ Service    ████░ 82%│   │
│  │ 2. Coca-Cola     38  76€   │  │ Prix       ███░░ 68%│   │
│  │ 3. Corona        22  132€  │  │ Ambiance   █████ 91%│   │
│  │ 4. Perrier       18  54€   │  │ Qualité    ████░ 76%│   │
│  │ 5. Chips         15  45€   │  │                      │   │
│  └────────────────────────────┘  │ Global     ████░ 79%│   │
│                                    └──────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Dashboard Stocks & Fournisseurs

**Objectif** : Gestion des approvisionnements

**Sections**

1. **Alertes Stocks Critiques**
   - Liste produits < seuil
   - Niveau actuel vs seuil
   - Action rapide "Commander"

2. **Vue d'ensemble Stocks**
   - Tableau tous produits
   - Colonnes: Produit, Stock actuel, Valeur, Dernière commande
   - Tri/filtres par catégorie
   - Recherche

3. **Commandes en Cours**
   - Liste commandes non livrées
   - Fournisseur, Montant, Livraison prévue
   - Statut (en préparation, en route, livrée)

4. **Passer Commande**
   - Sélection fournisseur
   - Panier avec produits disponibles
   - Calcul remise automatique
   - Date livraison estimée
   - Validation

**Maquette ASCII**
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard Stocks & Fournisseurs                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ⚠️ STOCKS CRITIQUES (3)                                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Heineken            12 / 50   [Commander ➜]            │ │
│  │ Corona               8 / 30   [Commander ➜]            │ │
│  │ Chips               15 / 40   [Commander ➜]            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  📦 COMMANDES EN COURS (2)                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ #1247 Brasserie Premium    685€  Livraison: Demain 10h│ │
│  │ #1248 Grossiste Généraliste 1,240€  Livraison: 13/01  │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  📋 TOUS LES STOCKS                [🔍 Rechercher] [+ Cmd]  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Produit        | Stock | Valeur |  Dernière Cmd        │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Heineken       |  12   |  18€   |  08/01               │ │
│  │ Corona         |   8   |  16€   |  08/01               │ │
│  │ 1664           |  45   |  63€   |  05/01               │ │
│  │ Coca-Cola      |  38   |  38€   |  09/01               │ │
│  │ ...                                                     │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  Valeur totale stock: 2,350€                                │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Dashboard Finance

**Objectif** : Santé financière et comptabilité

**Métriques Principales**
- Trésorerie actuelle
- CA du mois
- Dépenses du mois
- Bénéfice net du mois

**Graphiques**

1. **Évolution Trésorerie** (ligne)
   - 30 derniers jours
   - Visualisation tendance

2. **Revenus vs Dépenses** (barres empilées)
   - Par semaine/mois
   - Identification périodes déficitaires

3. **Répartition Dépenses** (donut)
   - Stocks
   - Salaires
   - Loyer/charges
   - Autres

4. **Marges par Catégorie** (tableau)
   - Catégorie produit
   - CA, Coût, Marge brute, Marge %

**Maquette ASCII**
```
┌─────────────────────────────────────────────────────────────┐
│  Dashboard Finance                                          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ Trésorerie │  │ CA Mois    │  │ Bénéfice   │            │
│  │ 8,450€     │  │ 18,200€    │  │ +3,150€    │            │
│  │            │  │            │  │ +20.9%     │            │
│  └────────────┘  └────────────┘  └────────────┘            │
│                                                               │
│  ┌──────────── Évolution Trésorerie (30j) ──────────────┐  │
│  │                                                         │  │
│  │ 10k€ ┤                                    ●            │  │
│  │  9k€ ┤                               ●────┘            │  │
│  │  8k€ ┤                          ●────┘                 │  │
│  │  7k€ ┤                     ●────┘                      │  │
│  │  6k€ ┤                ●────┘                           │  │
│  │  5k€ └────┴────┴────┴────┴────┴────┴────┴────┴────   │  │
│  │      11/12  18/12  25/12  01/01  08/01  15/01        │  │
│  └─────────────────────────────────────────────────────────┘│
│                                                               │
│  ┌─── Dépenses Mois ───┐  ┌──── Marges Catégorie ──────┐  │
│  │ Stocks      8,200€  │  │ Bières    CA: 8,500€  52%  │  │
│  │ Salaires    4,500€  │  │ Vins      CA: 3,200€  48%  │  │
│  │ Loyer       2,000€  │  │ Spirits   CA: 4,100€  65%  │  │
│  │ Charges       350€  │  │ Softs     CA: 1,800€  45%  │  │
│  │                     │  │ Snacks    CA:   600€  58%  │  │
│  │ Total      15,050€  │  └────────────────────────────┘  │
│  └─────────────────────┘                                    │
└─────────────────────────────────────────────────────────────┘
```

### 7.4 Navigation & Layout

**Header Global**
- Logo/Nom du bar
- Indicateur temps réel (●)
- Trésorerie actuelle (toujours visible)
- Menu utilisateur (profil, déconnexion)

**Sidebar**
- Dashboard Ventes (icône 📊)
- Dashboard Stocks (icône 📦)
- Dashboard Finance (icône 💰)
- Paramètres (alpha: minimal)

---

## 8. Simulation & Mécaniques

### 8.1 Boucle de Simulation

**Fréquence** : Toutes les 60 secondes (ajustable)

**Processus à chaque tick** :

```
1. Vérifier si bar ouvert (18h-1h)
2. Si ouvert:
   a. Calculer affluence actuelle
   b. Générer nouveaux groupes clients
   c. Faire consommer clients présents
   d. Faire partir clients (probabilité basée durée)
   e. Calculer satisfaction
   f. Enregistrer ventes
   g. Déduire stocks
3. Traiter livraisons en attente
4. Calculer charges périodiques
5. Mettre à jour trésorerie
6. Enregistrer historique
7. Pusher état via SignalR
```

### 8.2 Calcul de l'Affluence

**Formule de base** :

```
Affluence = BaseAffluence × TimeMultiplier × DayMultiplier × 
            ReputationMultiplier × EventsMultiplier × WeatherMultiplier
```

**Paramètres** :

```csharp
// Base
int BaseAffluence = 10; // groupes/heure moyenne

// Heure (18h-1h)
TimeMultiplier:
  18h-19h: 0.5
  19h-20h: 0.8
  20h-21h: 1.3
  21h-22h: 1.5
  22h-23h: 1.5
  23h-00h: 1.2
  00h-01h: 0.7

// Jour
DayMultiplier:
  Lundi-Jeudi: 0.8
  Vendredi: 1.3
  Samedi: 1.5
  Dimanche: 1.0

// Réputation (0-100)
ReputationMultiplier = 0.5 + (Reputation / 100)
  Reputation 0:   0.5×
  Reputation 50:  1.0×
  Reputation 100: 1.5×

// Événements (cumulatif)
EventsMultiplier:
  Match important: +0.3
  Concert quartier: +0.2
  Fête locale: +0.4
  Vacances: +0.1
  
// Météo
WeatherMultiplier:
  Pluie: 0.9
  Beau temps: 1.1
  Canicule: 1.2
  Neige: 0.7
```

**Exemple calcul** :

```
Samedi 22h, Réputation 75, Match de foot, Beau temps

BaseAffluence = 10
TimeMultiplier = 1.5
DayMultiplier = 1.5
ReputationMultiplier = 0.5 + 0.75 = 1.25
EventsMultiplier = 1.3
WeatherMultiplier = 1.1

Affluence = 10 × 1.5 × 1.5 × 1.25 × 1.3 × 1.1
          ≈ 40 groupes/heure
```

### 8.3 Comportement Clients

**Arrivée**

```csharp
public class CustomerGroupGenerator
{
    public CustomerGroup GenerateGroup()
    {
        var type = RandomGroupType(); // pondéré
        var size = GetGroupSize(type);
        
        return new CustomerGroup
        {
            GroupType = type,
            Size = size,
            ArrivalTime = DateTime.Now,
            BudgetPerPerson = GetBudget(type),
            StayDurationMinutes = GetStayDuration(type)
        };
    }
    
    private CustomerGroupType RandomGroupType()
    {
        // Pondération par type
        var weights = new Dictionary<CustomerGroupType, int>
        {
            [CustomerGroupType.Students] = 25,
            [CustomerGroupType.Couples] = 30,
            [CustomerGroupType.Afterwork] = 20,
            [CustomerGroupType.Regulars] = 15,
            [CustomerGroupType.Tourists] = 5,
            [CustomerGroupType.Solo] = 5
        };
        
        return WeightedRandom(weights);
    }
}
```

**Caractéristiques par Type**

| Type | Taille | Budget/pers | Durée (min) | Sensibilité Prix |
|------|--------|-------------|-------------|------------------|
| Students | 3-6 | 8-15€ | 90-180 | Élevée |
| Couples | 2 | 20-40€ | 60-120 | Moyenne |
| Afterwork | 4-8 | 15-30€ | 90-150 | Faible |
| Regulars | 1-2 | 12-25€ | 120-240 | Moyenne |
| Tourists | 2-4 | 25-50€ | 45-90 | Faible |
| Solo | 1 | 10-20€ | 60-180 | Moyenne |

**Consommation**

```csharp
public class ConsumptionSimulator
{
    public List<Sale> SimulateConsumption(CustomerGroup group)
    {
        var sales = new List<Sale>();
        var totalBudget = group.Size * group.BudgetPerPerson;
        var spent = 0m;
        
        while (spent < totalBudget * 0.8m) // dépensent 80%+ du budget
        {
            var product = SelectProduct(group.GroupType);
            var quantity = Random.Next(1, 3);
            var price = GetPrice(product);
            
            spent += price * quantity;
            
            sales.Add(new Sale
            {
                ProductId = product.Id,
                Quantity = quantity,
                UnitPrice = price,
                SaleTimestamp = DateTime.Now
            });
        }
        
        return sales;
    }
    
    private Product SelectProduct(CustomerGroupType groupType)
    {
        // Préférences par type de groupe
        // Students → Bières pas chères
        // Couples → Vins
        // Afterwork → Bières + Cocktails
        // etc.
    }
}
```

**Départ & Satisfaction**

```csharp
public class SatisfactionCalculator
{
    public SatisfactionMetrics Calculate(CustomerGroup group)
    {
        // Service: basé sur temps attente, ratio clients/employés
        var service = CalculateServiceScore(group);
        
        // Prix: comparaison prix payés vs budget
        var price = CalculatePriceScore(group);
        
        // Ambiance: basé sur affluence, musique, propreté
        var ambiance = CalculateAmbianceScore(group);
        
        // Qualité: température boissons, fraîcheur
        var quality = CalculateQualityScore(group);
        
        return new SatisfactionMetrics
        {
            Service = service,
            Price = price,
            Ambiance = ambiance,
            Quality = quality,
            Overall = (service + price + ambiance + quality) / 4
        };
    }
    
    private int CalculateServiceScore(CustomerGroup group)
    {
        var employeeRatio = GetEmployeesWorking() / GetCustomersInBar();
        
        int baseScore = 70;
        
        if (employeeRatio > 0.15) baseScore += 20; // bon ratio
        if (employeeRatio < 0.08) baseScore -= 30; // sous-staffé
        
        // Pénalité si attente longue
        var waitTime = group.WaitTimeMinutes;
        if (waitTime > 15) baseScore -= (waitTime - 15) * 2;
        
        return Math.Clamp(baseScore, 0, 100);
    }
}
```

### 8.4 Gestion Stocks

**Déduction automatique**

```csharp
public async Task ProcessSale(Sale sale)
{
    var inventory = await _inventoryRepo.GetByProductAsync(
        sale.BarId, sale.ProductId);
    
    inventory.Quantity -= sale.Quantity;
    
    if (inventory.Quantity < 0)
    {
        // Stock négatif = rupture
        // Vente refusée ou produit indisponible
        throw new OutOfStockException();
    }
    
    await _inventoryRepo.UpdateAsync(inventory);
}
```

**Livraison commandes**

```csharp
public async Task ProcessPendingDeliveries()
{
    var now = DateTime.Now;
    var readyOrders = await _orderRepo.GetReadyForDeliveryAsync(now);
    
    foreach (var order in readyOrders)
    {
        foreach (var item in order.Items)
        {
            var inventory = await _inventoryRepo.GetByProductAsync(
                order.BarId, item.ProductId);
            
            inventory.Quantity += item.Quantity;
            inventory.LastRestockedAt = now;
            
            await _inventoryRepo.UpdateAsync(inventory);
        }
        
        order.Status = OrderStatus.Delivered;
        await _orderRepo.UpdateAsync(order);
    }
}
```

### 8.5 Calcul Charges

**Charges fixes**

```csharp
public async Task ProcessMonthlyExpenses()
{
    var now = DateTime.Now;
    var dueExpenses = await _expenseRepo.GetDueExpensesAsync(now);
    
    foreach (var expense in dueExpenses)
    {
        var bar = await _barRepo.GetByIdAsync(expense.BarId);
        bar.CashBalance -= expense.Amount;
        
        // Enregistrer transaction
        await _transactionRepo.AddAsync(new Transaction
        {
            BarId = bar.Id,
            Type = TransactionType.Expense,
            Amount = -expense.Amount,
            Category = expense.ExpenseType,
            Description = $"Paiement {expense.ExpenseType}",
            Timestamp = now
        });
        
        // Planifier prochaine échéance
        expense.NextDueDate = CalculateNextDueDate(
            expense.NextDueDate, expense.Frequency);
        
        await _expenseRepo.UpdateAsync(expense);
        await _barRepo.UpdateAsync(bar);
    }
}
```

**Salaires**

```csharp
public async Task ProcessMonthlySalaries()
{
    var now = DateTime.Now;
    
    if (now.Day != 1) return; // paye le 1er du mois
    
    var bars = await _barRepo.GetAllAsync();
    
    foreach (var bar in bars)
    {
        var employees = await _employeeRepo.GetActiveByBarAsync(bar.Id);
        var totalSalaries = employees.Sum(e => e.MonthlySalary);
        
        bar.CashBalance -= totalSalaries;
        
        await _transactionRepo.AddAsync(new Transaction
        {
            BarId = bar.Id,
            Type = TransactionType.Expense,
            Amount = -totalSalaries,
            Category = "Salaries",
            Description = $"Salaires {employees.Count} employés",
            Timestamp = now
        });
        
        await _barRepo.UpdateAsync(bar);
    }
}
```

---

## 9. Déploiement

### 9.1 Configuration Docker Compose

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: bar_game_db
    restart: always
    environment:
      POSTGRES_DB: bargame
      POSTGRES_USER: bargame_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - bar_network

  backend:
    image: bar_game_backend:latest
    container_name: bar_game_api
    restart: always
    depends_on:
      - postgres
    environment:
      ConnectionStrings__DefaultConnection: "Host=postgres;Database=bargame;Username=bargame_user;Password=${DB_PASSWORD}"
      JwtSettings__SecretKey: ${JWT_SECRET}
      SignalR__ClientUrl: ${CLIENT_URL}
    ports:
      - "5000:8080"
    networks:
      - bar_network

  frontend:
    image: bar_game_frontend:latest
    container_name: bar_game_web
    restart: always
    environment:
      NEXT_PUBLIC_API_URL: ${API_URL}
    ports:
      - "3000:3000"
    networks:
      - bar_network

  nginx:
    image: nginx:alpine
    container_name: bar_game_nginx
    restart: always
    depends_on:
      - backend
      - frontend
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - certbot_data:/var/www/certbot
    networks:
      - bar_network

volumes:
  postgres_data:
  certbot_data:

networks:
  bar_network:
    driver: bridge
```

### 9.2 Configuration Nginx

```nginx
# /nginx/nginx.conf

upstream backend_api {
    server backend:8080;
}

upstream frontend_app {
    server frontend:3000;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name bargame.example.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS
server {
    listen 443 ssl http2;
    server_name bargame.example.com;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    # API Backend
    location /api/ {
        proxy_pass http://backend_api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # SignalR Hub
    location /hubs/ {
        proxy_pass http://backend_api/hubs/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts for long-polling
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }
    
    # Frontend
    location / {
        proxy_pass http://frontend_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 9.3 Scripts de Déploiement

**build.sh**
```bash
#!/bin/bash

# Build Backend
cd backend
dotnet publish -c Release -o ./publish
docker build -t bar_game_backend:latest .
cd ..

# Build Frontend
cd frontend
npm run build
docker build -t bar_game_frontend:latest .
cd ..

echo "Build completed successfully"
```

**deploy.sh**
```bash
#!/bin/bash

# Load environment variables
source .env

# Stop existing containers
docker-compose down

# Pull latest images (if using registry)
# docker-compose pull

# Start services
docker-compose up -d

# Wait for DB
echo "Waiting for database..."
sleep 10

# Run migrations
docker exec bar_game_api dotnet ef database update

echo "Deployment completed"
echo "Application available at https://bargame.example.com"
```

### 9.4 Variables d'Environnement

**.env**
```bash
# Database
DB_PASSWORD=your_secure_password_here

# JWT
JWT_SECRET=your_jwt_secret_key_minimum_32_chars

# URLs
API_URL=https://bargame.example.com/api
CLIENT_URL=https://bargame.example.com

# Environment
ASPNETCORE_ENVIRONMENT=Production
NODE_ENV=production
```

### 9.5 SSL avec Let's Encrypt

```bash
# Installation Certbot
sudo apt install certbot

# Obtenir certificat
sudo certbot certonly --webroot \
  -w /var/www/certbot \
  -d bargame.example.com

# Copier certificats
sudo cp /etc/letsencrypt/live/bargame.example.com/fullchain.pem ./nginx/ssl/
sudo cp /etc/letsencrypt/live/bargame.example.com/privkey.pem ./nginx/ssl/

# Auto-renouvellement (cron)
0 0 1 * * certbot renew --quiet && docker-compose restart nginx
```

---

## 10. Roadmap

### 10.1 Phase Alpha (MVP) - 3-4 mois

**Objectifs** :
- Valider le concept
- Tester les mécaniques principales
- Obtenir premiers feedbacks

**Fonctionnalités** :
✅ Simulation temps réel 1:1
✅ Bar pré-configuré avec budget
✅ 1-3 employés polyvalents
✅ Catalogue produits avec références réelles
✅ Système fournisseurs complet
✅ Groupes de clients avec caractéristiques
✅ Affluence multi-facteurs
✅ Satisfaction multi-critères
✅ 3 dashboards (Ventes, Stocks, Finance)
✅ Historique 30 jours
✅ Déploiement serveur dédié

**Limitations assumées** :
- Pas de personnalisation bar
- Pas de compétences employés
- Pas d'événements spéciaux
- Pas de marketing
- 1 compte = 1 bar

### 10.2 Phase Bêta - 2-3 mois

**Objectifs** :
- Enrichir le gameplay
- Ajouter progression
- Améliorer rétention

**Nouvelles fonctionnalités** :
- 🎯 Événements spéciaux (soirées thème, matchs, concerts)
- 📊 Système de progression (débloquer recettes, équipements)
- 👥 Compétences employés basiques (formation)
- 🎨 Personnalisation bar (nom, logo, thème)
- 📢 Marketing basique (réseaux sociaux, promotions)
- 🏆 Objectifs optionnels (challenges)
- 📧 Notifications email (alertes importantes)

### 10.3 Phase 1.0 (Release) - 2-3 mois

**Objectifs** :
- Expérience complète
- Multi-établissements
- Monétisation

**Nouvelles fonctionnalités** :
- 🏢 Expansion multi-bars
- 🎓 Système de recrutement avancé
- 📈 Analytics avancées (marges détaillées, prévisions)
- 🎨 Personnalisation avancée (déco, rénovation, agrandissement)
- 🌐 Système de concurrence (autres bars du quartier)
- 💳 Système premium (optionnel)
- 📱 Application mobile (PWA)

### 10.4 Post-1.0 (Évolutions futures)

**Idées à explorer** :
- Système de licences/réglementations
- Événements aléatoires (pannes, inspections)
- Mode coopératif (gérer un bar à plusieurs)
- Saisons avec événements spéciaux
- Système de réputation régional
- Intégration réseaux sociaux réels
- Leaderboards

---

## Annexes

### A. Glossaire

| Terme | Définition |
|-------|------------|
| **Affluence** | Nombre de groupes de clients entrant par heure |
| **Bac à sable** | Mode de jeu sans objectifs imposés |
| **Dashboard** | Tableau de bord analytique |
| **Idle game** | Jeu continuant en arrière-plan |
| **SignalR** | Technologie temps réel Microsoft |
| **CQRS** | Command Query Responsibility Segregation |

### B. Conventions de Nommage

**Base de données** :
- Tables : `snake_case` pluriel (ex: `customer_groups`)
- Colonnes : `snake_case` (ex: `arrival_time`)

**Backend C#** :
- Classes : `PascalCase` (ex: `CustomerGroup`)
- Méthodes : `PascalCase` (ex: `CalculateAffluence`)
- Variables : `camelCase` (ex: `groupType`)

**Frontend TypeScript** :
- Composants : `PascalCase` (ex: `SalesChart`)
- Fichiers : `kebab-case` (ex: `sales-chart.tsx`)
- Fonctions : `camelCase` (ex: `fetchBarData`)

### C. Références Techniques

**Documentation** :
- ASP.NET Core : https://docs.microsoft.com/aspnet/core
- SignalR : https://docs.microsoft.com/aspnet/core/signalr
- Next.js : https://nextjs.org/docs
- PostgreSQL : https://www.postgresql.org/docs/
- Docker : https://docs.docker.com/

**Librairies** :
- MediatR : https://github.com/jbogard/MediatR
- EF Core : https://docs.microsoft.com/ef/core/
- shadcn/ui : https://ui.shadcn.com/
- Recharts : https://recharts.org/

---

## Document Version

- **Version** : 1.0
- **Dernière mise à jour** : 11 janvier 2026
- **Auteur** : Clément
- **Status** : Documentation Alpha - Prête pour développement

---

**Prochaines étapes suggérées** :

1. Valider cette documentation
2. Créer repo Git avec structure initiale
3. Setup environnement de développement local
4. Provisionner serveur dédié
5. Développer MVP Backend (simulation basique)
6. Développer MVP Frontend (1 dashboard)
7. Itérer et tester

**Durée estimée MVP Alpha** : 12-16 semaines en solo
