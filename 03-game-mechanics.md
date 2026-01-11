# 03 - Mécaniques de Jeu & Simulation

## 1. Boucle de Simulation

### 1.1 Fréquence de Tick

**Intervalle** : Toutes les 60 secondes (1 tick/minute)

**Justification** :
- Équilibre entre réalisme et performance
- Permet simulation fluide de l'affluence
- Réduit charge serveur vs tick/seconde

### 1.2 Processus à Chaque Tick

```typescript
async function simulationTick() {
  const now = new Date();
  const bars = await getAllActiveBars();
  
  for (const bar of bars) {
    // 1. Vérifier si le bar est ouvert
    const isOpen = isBarOpen(now); // 18h-1h
    
    if (isOpen) {
      // 2. Calculer affluence actuelle
      const affluence = calculateAffluence(bar, now);
      
      // 3. Générer nouveaux groupes clients
      await generateNewCustomers(bar, affluence);
      
      // 4. Faire consommer les clients présents
      await processCustomerConsumption(bar);
      
      // 5. Faire partir clients (probabilité basée durée séjour)
      await processCustomerDepartures(bar);
      
      // 6. Calculer satisfaction
      await calculateSatisfaction(bar);
    }
    
    // 7. Traiter livraisons en attente (même si fermé)
    await processDeliveries(bar, now);
    
    // 8. Calculer charges périodiques
    await processPeriodicExpenses(bar, now);
    
    // 9. Mettre à jour trésorerie
    await updateCashFlow(bar);
    
    // 10. Enregistrer dans historique
    await saveHistorySnapshot(bar);
    
    // 11. Pusher état via Socket.io (si clients connectés)
    io.to(`bar-${bar.id}`).emit('barUpdate', bar.state);
  }
}

// Lancement
setInterval(simulationTick, 60000); // Chaque minute
```

---

## 2. Calcul de l'Affluence

### 2.1 Formule Globale

```typescript
function calculateAffluence(bar: Bar, now: Date): number {
  const baseAffluence = 10; // groupes/heure moyenne
  
  const timeMultiplier = getTimeMultiplier(now.getHours());
  const dayMultiplier = getDayMultiplier(now.getDay());
  const reputationMultiplier = getReputationMultiplier(bar.reputation);
  const eventsMultiplier = getEventsMultiplier(now);
  const weatherMultiplier = getWeatherMultiplier(now);
  
  const affluence = baseAffluence 
    * timeMultiplier 
    * dayMultiplier 
    * reputationMultiplier 
    * eventsMultiplier 
    * weatherMultiplier;
  
  // Randomisation ±20%
  return affluence * (0.8 + Math.random() * 0.4);
}
```

### 2.2 Multiplicateurs Détaillés

**Time Multiplier (par heure)** :
```typescript
function getTimeMultiplier(hour: number): number {
  const multipliers = {
    18: 0.5,  // Début calme
    19: 0.8,  // Montée
    20: 1.3,  // Pic soirée
    21: 1.5,  // Pic maximal
    22: 1.5,  // Pic maintenu
    23: 1.2,  // Descente
    0: 0.7,   // Fin de soirée
    1: 0.3    // Derniers clients (bar ferme à 1h)
  };
  return multipliers[hour] || 0;
}
```

**Day Multiplier** :
```typescript
function getDayMultiplier(day: number): number {
  // 0 = Dimanche, 6 = Samedi
  const multipliers = {
    0: 1.0,   // Dimanche
    1: 0.8,   // Lundi
    2: 0.8,   // Mardi
    3: 0.8,   // Mercredi
    4: 0.9,   // Jeudi
    5: 1.3,   // Vendredi
    6: 1.5    // Samedi
  };
  return multipliers[day];
}
```

**Reputation Multiplier** :
```typescript
function getReputationMultiplier(reputation: number): number {
  // Reputation: 0-100
  // Multiplier: 0.5x (rep=0) à 1.5x (rep=100)
  return 0.5 + (reputation / 100);
}
```

**Events Multiplier** :
```typescript
function getEventsMultiplier(now: Date): number {
  let multiplier = 1.0;
  const events = getActiveEvents(now);
  
  for (const event of events) {
    switch(event.type) {
      case 'sports_match':
        multiplier += 0.3;
        break;
      case 'concert':
        multiplier += 0.2;
        break;
      case 'local_festival':
        multiplier += 0.4;
        break;
      case 'holiday':
        multiplier += 0.1;
        break;
      case 'new_year':
        multiplier += 0.8;
        break;
      case 'july_14':
        multiplier += 0.6;
        break;
    }
  }
  
  return multiplier;
}
```

**Weather Multiplier** :
```typescript
function getWeatherMultiplier(now: Date): number {
  const weather = getCurrentWeather(now);
  
  const multipliers = {
    'sunny': 1.1,
    'heatwave': 1.2,
    'rain': 0.9,
    'storm': 0.7,
    'snow': 0.7,
    'cloudy': 1.0
  };
  
  return multipliers[weather] || 1.0;
}
```

### 2.3 Exemple de Calcul

**Scénario** :
- Samedi soir, 22h
- Réputation : 75/100
- Match de foot important
- Beau temps

**Calcul** :
```
baseAffluence = 10
timeMultiplier = 1.5        (22h)
dayMultiplier = 1.5         (Samedi)
reputationMultiplier = 1.25 (75/100)
eventsMultiplier = 1.3      (match)
weatherMultiplier = 1.1     (sunny)

Affluence = 10 × 1.5 × 1.5 × 1.25 × 1.3 × 1.1
         = 10 × 4.03
         = 40.3 groupes/heure

Avec randomisation (±20%) : 32-48 groupes/heure
```

---

## 3. Génération de Clients

### 3.1 Nombre de Groupes par Tick

```typescript
async function generateNewCustomers(bar: Bar, affluence: number) {
  // affluence = groupes/heure
  // tick = chaque minute
  // Probabilité = affluence / 60
  
  const probability = affluence / 60;
  const shouldGenerate = Math.random() < probability;
  
  if (shouldGenerate) {
    const group = createCustomerGroup();
    await saveCustomerGroup(bar.id, group);
  }
}
```

### 3.2 Création d'un Groupe

```typescript
function createCustomerGroup(): CustomerGroup {
  const type = randomGroupType();
  const size = getGroupSize(type);
  const budgetPerPerson = getBudgetRange(type);
  const stayDuration = getStayDuration(type);
  
  return {
    type,
    size,
    budgetPerPerson,
    arrivalTime: new Date(),
    estimatedDepartureTime: new Date(Date.now() + stayDuration * 60000),
    totalSpent: 0,
    satisfaction: {
      service: null,
      price: null,
      ambiance: null,
      quality: null
    }
  };
}
```

### 3.3 Pondération des Types

```typescript
function randomGroupType(): CustomerGroupType {
  const weights = {
    'students': 25,
    'couples': 30,
    'afterwork': 20,
    'regulars': 15,
    'tourists': 5,
    'solo': 5
  };
  
  return weightedRandom(weights);
}

function getGroupSize(type: CustomerGroupType): number {
  const ranges = {
    'students': [3, 6],
    'couples': [2, 2],
    'afterwork': [4, 8],
    'regulars': [1, 2],
    'tourists': [2, 4],
    'solo': [1, 1]
  };
  
  const [min, max] = ranges[type];
  return randomInt(min, max);
}

function getBudgetRange(type: CustomerGroupType): number {
  const ranges = {
    'students': [8, 15],
    'couples': [20, 40],
    'afterwork': [15, 30],
    'regulars': [12, 25],
    'tourists': [25, 50],
    'solo': [10, 20]
  };
  
  const [min, max] = ranges[type];
  return randomFloat(min, max);
}

function getStayDuration(type: CustomerGroupType): number {
  // Retourne durée en minutes
  const ranges = {
    'students': [90, 180],
    'couples': [60, 120],
    'afterwork': [90, 150],
    'regulars': [120, 240],
    'tourists': [45, 90],
    'solo': [60, 180]
  };
  
  const [min, max] = ranges[type];
  return randomInt(min, max);
}
```

---

## 4. Consommation des Clients

### 4.1 Processus de Consommation

```typescript
async function processCustomerConsumption(bar: Bar) {
  const activeGroups = await getActiveCustomerGroups(bar.id);
  
  for (const group of activeGroups) {
    // Consomment toutes les X minutes
    const minutesSinceLastOrder = getMinutesSince(group.lastOrderTime);
    
    if (minutesSinceLastOrder >= 20) { // Nouvelle commande toutes les 20min
      await placeGroupOrder(bar, group);
    }
  }
}
```

### 4.2 Sélection de Produits

```typescript
async function placeGroupOrder(bar: Bar, group: CustomerGroup) {
  const totalBudget = group.size * group.budgetPerPerson;
  const remainingBudget = totalBudget - group.totalSpent;
  
  if (remainingBudget < 5) return; // Plus assez de budget
  
  const products = selectProducts(group.type, remainingBudget);
  const sales: Sale[] = [];
  
  for (const product of products) {
    const quantity = randomInt(1, Math.min(3, group.size));
    const price = product.currentPrice;
    
    // Vérifier stock
    const stock = await getStock(bar.id, product.id);
    if (stock.quantity < quantity) {
      // Rupture de stock, client mécontent
      group.satisfaction.service -= 10;
      continue;
    }
    
    // Enregistrer vente
    const sale = {
      barId: bar.id,
      productId: product.id,
      quantity,
      unitPrice: price,
      totalAmount: quantity * price,
      saleTimestamp: new Date(),
      customerGroupType: group.type
    };
    
    sales.push(sale);
    
    // Déduire stock
    await updateStock(bar.id, product.id, -quantity);
    
    // Mettre à jour dépense groupe
    group.totalSpent += sale.totalAmount;
  }
  
  await saveSales(sales);
  await updateCustomerGroup(group);
}
```

### 4.3 Préférences par Type de Groupe

```typescript
function selectProducts(
  groupType: CustomerGroupType, 
  budget: number
): Product[] {
  const preferences = {
    'students': ['beer_cheap', 'soft'],
    'couples': ['wine', 'cocktails'],
    'afterwork': ['beer', 'cocktails', 'snacks'],
    'regulars': ['beer', 'spirits'],
    'tourists': ['wine', 'beer_premium', 'snacks'],
    'solo': ['beer', 'soft']
  };
  
  const categories = preferences[groupType];
  const products = getProductsByCategories(categories);
  
  // Sélectionner produits jusqu'à épuiser 80% du budget
  const selectedProducts = [];
  let totalCost = 0;
  
  while (totalCost < budget * 0.8 && selectedProducts.length < 5) {
    const product = weightedRandomProduct(products, groupType);
    selectedProducts.push(product);
    totalCost += product.currentPrice;
  }
  
  return selectedProducts;
}
```

---

## 5. Départ des Clients

### 5.1 Probabilité de Départ

```typescript
async function processCustomerDepartures(bar: Bar) {
  const activeGroups = await getActiveCustomerGroups(bar.id);
  
  for (const group of activeGroups) {
    const minutesSinceArrival = getMinutesSince(group.arrivalTime);
    const estimatedDuration = getStayDuration(group.type);
    
    // Probabilité augmente après durée estimée
    const overdue = minutesSinceArrival - estimatedDuration;
    let leaveProbability = 0;
    
    if (overdue > 0) {
      // 5% par minute de dépassement
      leaveProbability = Math.min(0.05 * overdue, 0.95);
    }
    
    if (Math.random() < leaveProbability) {
      await customerGroupLeaves(bar, group);
    }
  }
}
```

### 5.2 Calcul Satisfaction au Départ

```typescript
async function customerGroupLeaves(bar: Bar, group: CustomerGroup) {
  // Calculer satisfaction finale
  const satisfaction = calculateGroupSatisfaction(bar, group);
  
  group.satisfaction = satisfaction;
  group.departureTime = new Date();
  
  await updateCustomerGroup(group);
  
  // Impact sur réputation
  await updateBarReputation(bar, satisfaction.overall);
  
  // Log dans historique
  await saveSatisfactionHistory(bar.id, satisfaction);
}
```

---

## 6. Calcul de Satisfaction

### 6.1 Satisfaction Service

```typescript
function calculateServiceSatisfaction(bar: Bar, group: CustomerGroup): number {
  const employeesWorking = getEmployeesWorking(bar);
  const customersInBar = getCurrentCustomersCount(bar);
  const employeeRatio = employeesWorking / customersInBar;
  
  let score = 70; // Base
  
  // Bonus si bon ratio
  if (employeeRatio > 0.15) score += 20;
  if (employeeRatio > 0.20) score += 10;
  
  // Pénalité si sous-staffing
  if (employeeRatio < 0.08) score -= 30;
  if (employeeRatio < 0.05) score -= 20;
  
  // Pénalité temps d'attente (simulé)
  const waitTime = calculateWaitTime(employeeRatio);
  if (waitTime > 15) score -= (waitTime - 15) * 2;
  
  return clamp(score, 0, 100);
}

function calculateWaitTime(ratio: number): number {
  // Plus le ratio est bas, plus l'attente est longue
  if (ratio > 0.15) return randomInt(3, 8);
  if (ratio > 0.10) return randomInt(8, 15);
  if (ratio > 0.05) return randomInt(15, 25);
  return randomInt(25, 45);
}
```

### 6.2 Satisfaction Prix

```typescript
function calculatePriceSatisfaction(group: CustomerGroup): number {
  const avgSpent = group.totalSpent / group.size;
  const expectedBudget = group.budgetPerPerson;
  
  let score = 70; // Base
  
  // Parfait si dépense proche du budget
  const ratio = avgSpent / expectedBudget;
  
  if (ratio > 0.8 && ratio < 1.1) {
    score += 20; // Dépense conforme
  } else if (ratio < 0.5) {
    score += 10; // Pas assez dépensé (frustration produits indispos?)
  } else if (ratio > 1.3) {
    score -= 20; // Trop cher par rapport à l'attente
  }
  
  // Bonus si groupe peu sensible au prix
  if (group.type === 'afterwork' || group.type === 'tourists') {
    score += 10;
  }
  
  // Pénalité si très sensible
  if (group.type === 'students') {
    if (ratio > 1.1) score -= 15;
  }
  
  return clamp(score, 0, 100);
}
```

### 6.3 Satisfaction Ambiance

```typescript
function calculateAmbianceSatisfaction(bar: Bar): number {
  let score = 75; // Base correcte
  
  const customersCount = getCurrentCustomersCount(bar);
  
  // Bonus si bar animé mais pas bondé
  if (customersCount > 20 && customersCount < 50) score += 15;
  
  // Pénalité si trop vide
  if (customersCount < 10) score -= 10;
  
  // Pénalité si bondé
  if (customersCount > 60) score -= 20;
  if (customersCount > 80) score -= 10;
  
  // Facteurs fixes (alpha)
  // Propreté: assume toujours bon (future: dégradation)
  // Musique: assume toujours correcte
  // Décoration: fixe
  
  return clamp(score, 0, 100);
}
```

### 6.4 Satisfaction Qualité

```typescript
function calculateQualitySatisfaction(): number {
  // Alpha: qualité toujours bonne
  // Future: dépendra de fraîcheur stocks, température, etc.
  
  let score = 80; // Base très correcte
  
  // Randomisation mineure (±10%)
  score += randomInt(-8, 8);
  
  return clamp(score, 0, 100);
}
```

### 6.5 Satisfaction Globale

```typescript
function calculateGroupSatisfaction(
  bar: Bar, 
  group: CustomerGroup
): SatisfactionMetrics {
  const service = calculateServiceSatisfaction(bar, group);
  const price = calculatePriceSatisfaction(group);
  const ambiance = calculateAmbianceSatisfaction(bar);
  const quality = calculateQualitySatisfaction();
  
  const overall = Math.round((service + price + ambiance + quality) / 4);
  
  return { service, price, ambiance, quality, overall };
}
```

---

## 7. Mise à Jour Réputation

### 7.1 Impact Satisfaction

```typescript
async function updateBarReputation(
  bar: Bar, 
  satisfactionScore: number
) {
  let change = 0;
  
  if (satisfactionScore >= 80) {
    change = +1; // Excellente satisfaction
  } else if (satisfactionScore >= 70) {
    change = +0.5; // Bonne satisfaction
  } else if (satisfactionScore >= 60) {
    change = 0; // Satisfaction correcte, pas de changement
  } else if (satisfactionScore >= 50) {
    change = -0.5; // Satisfaction moyenne
  } else {
    change = -1; // Mauvaise satisfaction
  }
  
  // Agrégation journalière
  await addDailyReputationChange(bar.id, change);
}

async function processDailyReputation() {
  // Appelé une fois par jour à minuit
  const bars = await getAllBars();
  
  for (const bar of bars) {
    const avgChange = await getAverageDailyReputationChange(bar.id);
    bar.reputation = clamp(bar.reputation + avgChange, 0, 100);
    await updateBar(bar);
  }
}
```

---

## 8. Gestion des Livraisons

```typescript
async function processDeliveries(bar: Bar, now: Date) {
  const pendingOrders = await getPendingOrders(bar.id);
  
  for (const order of pendingOrders) {
    if (now >= order.deliveryDate) {
      // Livraison arrivée
      for (const item of order.items) {
        await addStock(bar.id, item.productId, item.quantity);
      }
      
      order.status = 'delivered';
      await updateOrder(order);
      
      // Notification si joueur connecté
      io.to(`bar-${bar.id}`).emit('deliveryArrived', {
        orderId: order.id,
        items: order.items
      });
    }
  }
}
```

---

## 9. Charges Périodiques

```typescript
async function processPeriodicExpenses(bar: Bar, now: Date) {
  // Vérifier charges fixes
  const dueExpenses = await getDueExpenses(bar.id, now);
  
  for (const expense of dueExpenses) {
    // Déduire de la trésorerie
    bar.cashBalance -= expense.amount;
    
    // Enregistrer transaction
    await saveTransaction({
      barId: bar.id,
      type: 'expense',
      category: expense.type,
      amount: -expense.amount,
      description: `Paiement ${expense.type}`,
      timestamp: now
    });
    
    // Planifier prochaine échéance
    expense.nextDueDate = calculateNextDueDate(expense);
    await updateExpense(expense);
  }
  
  // Salaires (1er du mois)
  if (now.getDate() === 1) {
    await processMonthlySalaries(bar);
  }
  
  await updateBar(bar);
}

async function processMonthlySalaries(bar: Bar) {
  const employees = await getActiveEmployees(bar.id);
  const totalSalaries = employees.reduce((sum, e) => sum + e.monthlySalary, 0);
  
  bar.cashBalance -= totalSalaries;
  
  await saveTransaction({
    barId: bar.id,
    type: 'expense',
    category: 'salaries',
    amount: -totalSalaries,
    description: `Salaires ${employees.length} employés`,
    timestamp: new Date()
  });
  
  await updateBar(bar);
}
```

---

## 10. Historique & Snapshots

```typescript
async function saveHistorySnapshot(bar: Bar) {
  const now = new Date();
  
  // Sauvegarder toutes les heures
  if (now.getMinutes() === 0) {
    await saveSnapshot({
      barId: bar.id,
      timestamp: now,
      cashBalance: bar.cashBalance,
      reputation: bar.reputation,
      customersCount: await getCurrentCustomersCount(bar),
      salesLastHour: await getSalesLastHour(bar.id),
      averageSatisfaction: await getAverageSatisfaction(bar.id)
    });
  }
}
```

---

## Prochaine Lecture

👉 [04-architecture.md](04-architecture.md) - Architecture technique du système
