# 04 - Architecture Technique

## 1. Vue d'Ensemble

### 1.1 Architecture Globale

```
┌─────────────────────────────────────────────────────────┐
│                    Serveur Dédié                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              Docker Compose                       │  │
│  │                                                   │  │
│  │  ┌──────────────┐  ┌──────────────┐             │  │
│  │  │  PostgreSQL  │  │   Backend    │             │  │
│  │  │   Database   │◄─┤   Node.js    │             │  │
│  │  └──────────────┘  │  + Express   │             │  │
│  │                    │  + Socket.io │             │  │
│  │                    │  + Cron Jobs │             │  │
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

### 1.2 Flux de Données

```
┌──────────┐                    ┌──────────┐
│  Client  │◄──── WebSocket ────┤ Socket.io│
│ (Browser)│                    │  Server  │
└────┬─────┘                    └────┬─────┘
     │                               │
     │ HTTP/REST                     │
     │                               │
     ▼                               ▼
┌──────────┐                    ┌──────────┐
│  Nginx   │─────────────────►  │ Express  │
│  Proxy   │                    │   API    │
└──────────┘                    └────┬─────┘
                                     │
                                     ▼
                              ┌──────────────┐
                              │  PostgreSQL  │
                              │   Database   │
                              └──────────────┘
                                     ▲
                                     │
                              ┌──────┴─────┐
                              │ Simulation │
                              │   Worker   │
                              └────────────┘
```

---

## 2. Architecture Backend

### 2.1 Structure du Projet

```
backend/
├── src/
│   ├── config/          # Configuration
│   │   ├── database.ts
│   │   ├── env.ts
│   │   └── socket.ts
│   │
│   ├── models/          # Modèles Prisma/TypeORM
│   │   ├── bar.model.ts
│   │   ├── employee.model.ts
│   │   ├── product.model.ts
│   │   ├── sale.model.ts
│   │   └── ...
│   │
│   ├── routes/          # Routes API
│   │   ├── auth.routes.ts
│   │   ├── bar.routes.ts
│   │   ├── inventory.routes.ts
│   │   ├── orders.routes.ts
│   │   └── dashboard.routes.ts
│   │
│   ├── controllers/     # Contrôleurs
│   │   ├── auth.controller.ts
│   │   ├── bar.controller.ts
│   │   ├── inventory.controller.ts
│   │   └── ...
│   │
│   ├── services/        # Logique métier
│   │   ├── bar.service.ts
│   │   ├── simulation.service.ts
│   │   ├── affluence.service.ts
│   │   ├── customer.service.ts
│   │   ├── satisfaction.service.ts
│   │   └── ...
│   │
│   ├── repositories/    # Accès données
│   │   ├── bar.repository.ts
│   │   ├── sale.repository.ts
│   │   └── ...
│   │
│   ├── middlewares/     # Middlewares Express
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── utils/           # Utilitaires
│   │   ├── logger.ts
│   │   ├── helpers.ts
│   │   └── validators.ts
│   │
│   ├── types/           # Types TypeScript
│   │   └── index.ts
│   │
│   ├── jobs/            # Tâches planifiées
│   │   ├── simulation.job.ts
│   │   └── cleanup.job.ts
│   │
│   ├── socket/          # Socket.io handlers
│   │   ├── connection.handler.ts
│   │   └── bar.handler.ts
│   │
│   ├── app.ts           # Configuration Express
│   └── server.ts        # Point d'entrée
│
├── prisma/              # Si Prisma
│   ├── schema.prisma
│   └── migrations/
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### 2.2 Composants Principaux

#### Express API Server

```typescript
// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Error handling
app.use(errorHandler);

export default app;
```

#### Socket.io Server

```typescript
// src/server.ts
import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { setupSocketHandlers } from './socket';
import { startSimulation } from './jobs/simulation.job';

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST']
  }
});

// Setup Socket.io handlers
setupSocketHandlers(io);

// Start simulation worker
startSimulation(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

#### Simulation Worker

```typescript
// src/jobs/simulation.job.ts
import { Server } from 'socket.io';
import { SimulationService } from '../services/simulation.service';

export function startSimulation(io: Server) {
  const simulationService = new SimulationService(io);
  
  // Tick every minute
  setInterval(async () => {
    await simulationService.tick();
  }, 60000);
  
  console.log('Simulation worker started');
}
```

---

## 3. Architecture Frontend

### 3.1 Structure Next.js

```
frontend/
├── app/
│   ├── (auth)/              # Routes auth
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/         # Routes dashboard
│   │   ├── layout.tsx       # Layout avec nav
│   │   ├── page.tsx         # Redirect vers /sales
│   │   ├── sales/           # Dashboard ventes
│   │   │   └── page.tsx
│   │   ├── inventory/       # Dashboard stocks
│   │   │   └── page.tsx
│   │   └── finance/         # Dashboard finance
│   │       └── page.tsx
│   │
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
│
├── components/
│   ├── ui/                  # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   │
│   ├── dashboards/
│   │   ├── sales/
│   │   │   ├── RevenueCard.tsx
│   │   │   ├── SalesChart.tsx
│   │   │   ├── TopProducts.tsx
│   │   │   └── SatisfactionMetrics.tsx
│   │   │
│   │   ├── inventory/
│   │   │   ├── StockTable.tsx
│   │   │   ├── CriticalStocks.tsx
│   │   │   ├── PendingOrders.tsx
│   │   │   └── OrderForm.tsx
│   │   │
│   │   └── finance/
│   │       ├── CashBalance.tsx
│   │       ├── RevenueChart.tsx
│   │       ├── ExpensesBreakdown.tsx
│   │       └── MarginsTable.tsx
│   │
│   └── shared/
│       ├── LoadingSpinner.tsx
│       ├── ErrorBoundary.tsx
│       └── EmptyState.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts        # Axios instance
│   │   ├── auth.ts
│   │   ├── bar.ts
│   │   ├── inventory.ts
│   │   └── dashboard.ts
│   │
│   ├── socket/
│   │   └── client.ts        # Socket.io client
│   │
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useBar.ts
│   │   ├── useRealtime.ts
│   │   └── useDashboard.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   └── utils/
│       ├── format.ts
│       └── helpers.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── styles/
│   └── globals.css
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── .env.local.example
```

### 3.2 Communication Temps Réel

```typescript
// lib/socket/client.ts
import { io, Socket } from 'socket.io-client';

class SocketClient {
  private socket: Socket | null = null;
  
  connect(barId: number) {
    this.socket = io(process.env.NEXT_PUBLIC_API_URL!, {
      auth: {
        token: localStorage.getItem('token')
      }
    });
    
    this.socket.emit('join-bar', barId);
    
    return this.socket;
  }
  
  disconnect() {
    this.socket?.disconnect();
  }
  
  on(event: string, callback: Function) {
    this.socket?.on(event, callback);
  }
}

export const socketClient = new SocketClient();
```

```typescript
// lib/hooks/useRealtime.ts
import { useEffect, useState } from 'react';
import { socketClient } from '../socket/client';
import type { BarState } from '../types';

export function useRealtime(barId: number) {
  const [barState, setBarState] = useState<BarState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    const socket = socketClient.connect(barId);
    
    socket.on('connect', () => {
      setIsConnected(true);
    });
    
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    
    socket.on('barUpdate', (data: BarState) => {
      setBarState(data);
    });
    
    return () => {
      socketClient.disconnect();
    };
  }, [barId]);
  
  return { barState, isConnected };
}
```

---

## 4. Base de Données

### 4.1 Choix ORM

**Option 1 : Prisma** (Recommandé)
- ✅ TypeScript-first
- ✅ Migrations automatiques
- ✅ Client typé auto-généré
- ✅ Excellent DX

**Option 2 : TypeORM**
- ✅ Mature et stable
- ✅ Decorators (si préféré)
- ✅ Similar à NHibernate/EF

### 4.2 Schema Prisma (Exemple)

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Bar {
  id              Int       @id @default(autoincrement())
  userId          Int
  name            String    @db.VarChar(100)
  cashBalance     Decimal   @db.Decimal(10, 2)
  reputation      Int       @default(50)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  employees       Employee[]
  inventory       Inventory[]
  sales           Sale[]
  orders          Order[]
  
  @@map("bars")
}

model Employee {
  id            Int      @id @default(autoincrement())
  barId         Int
  name          String   @db.VarChar(100)
  monthlySalary Decimal  @db.Decimal(8, 2)
  hireDate      DateTime @db.Date
  isActive      Boolean  @default(true)
  
  bar           Bar      @relation(fields: [barId], references: [id])
  
  @@map("employees")
}

// ... autres modèles (voir 06-database.md)
```

---

## 5. Sécurité

### 5.1 Authentification

**JWT (JSON Web Tokens)**

```typescript
// src/services/auth.service.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class AuthService {
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });
    
    const token = this.generateToken(user.id);
    return { user, token };
  }
  
  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');
    
    const token = this.generateToken(user.id);
    return { user, token };
  }
  
  private generateToken(userId: number): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }
}
```

### 5.2 Middleware Auth

```typescript
// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

## 6. Performance

### 6.1 Caching

**Redis** (future optimisation) :
```typescript
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Cache dashboard data (5 min)
export async function getDashboardData(barId: number) {
  const cacheKey = `dashboard:${barId}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) return JSON.parse(cached);
  
  const data = await fetchDashboardData(barId);
  await redis.setex(cacheKey, 300, JSON.stringify(data));
  
  return data;
}
```

### 6.2 Database Indexing

Voir [06-database.md](06-database.md) pour indexes complets.

### 6.3 Query Optimization

```typescript
// ✅ Bon: Sélection spécifique + pagination
const sales = await prisma.sale.findMany({
  where: { barId },
  select: {
    id: true,
    productId: true,
    quantity: true,
    totalAmount: true,
    saleTimestamp: true
  },
  take: 100,
  orderBy: { saleTimestamp: 'desc' }
});

// ❌ Mauvais: Select *, pas de limite
const sales = await prisma.sale.findMany({
  where: { barId }
});
```

---

## 7. Logging & Monitoring

### 7.1 Winston Logger

```typescript
// src/utils/logger.ts
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

export default logger;
```

### 7.2 Error Handling

```typescript
// src/middlewares/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method
  });
  
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}
```

---

## 8. Testing

### 8.1 Structure Tests

```
tests/
├── unit/
│   ├── services/
│   │   ├── affluence.service.test.ts
│   │   └── satisfaction.service.test.ts
│   └── utils/
│       └── helpers.test.ts
│
└── integration/
    ├── api/
    │   ├── auth.test.ts
    │   └── bar.test.ts
    └── simulation/
        └── tick.test.ts
```

### 8.2 Exemple Test

```typescript
// tests/unit/services/affluence.service.test.ts
import { AffluenceService } from '../../../src/services/affluence.service';

describe('AffluenceService', () => {
  let service: AffluenceService;
  
  beforeEach(() => {
    service = new AffluenceService();
  });
  
  describe('calculateAffluence', () => {
    it('should return higher affluence on Saturday evening', () => {
      const saturday22h = new Date('2026-01-17T22:00:00Z');
      const bar = { reputation: 75 };
      
      const affluence = service.calculateAffluence(bar, saturday22h);
      
      expect(affluence).toBeGreaterThan(30);
    });
    
    it('should return lower affluence on Monday morning', () => {
      const monday10h = new Date('2026-01-12T10:00:00Z');
      const bar = { reputation: 75 };
      
      const affluence = service.calculateAffluence(bar, monday10h);
      
      expect(affluence).toBe(0); // Bar fermé
    });
  });
});
```

---

## Prochaine Lecture

👉 [05-stack-tech.md](05-stack-tech.md) - Stack technologique détaillée
