# 🗄️ Database Setup Guide

Complete guide for setting up PostgreSQL database, Prisma ORM, and initial data for UDT Store.

## 🎯 Overview

The UDT Store uses PostgreSQL with Prisma ORM for database management. This guide covers:

- Database setup for local development and production
- Prisma schema and migrations
- Initial data seeding
- Database management commands

## 📋 Prerequisites

- **Node.js** 18+
- **Docker** (for local development)
- **PostgreSQL** (for production, if not using managed service)

## 🏠 Local Development Database

### 1. Docker Setup (Recommended)

The project includes Docker configuration for local PostgreSQL:

```bash
# Start PostgreSQL container
docker-compose up postgres -d

# Check if running
docker ps

# Stop when done
docker-compose down
```

**Services Included:**

- **PostgreSQL 15**: Main database (port 5432)
- **Adminer**: Database administration UI (port 8080)

### 2. Database Connection

Local development uses these connection details:

```env
# .env (Local Development)
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/udt_store_dev"

# Docker compose creates:
# - Database: udt_store_dev
# - User: postgres
# - Password: postgres123
# - Port: 5432
```

### 3. Adminer Access

Access database admin interface:

- **URL**: http://localhost:8080
- **System**: PostgreSQL
- **Server**: postgres
- **Username**: postgres
- **Password**: postgres123
- **Database**: udt_store_dev

## 🔧 Prisma Setup

### 1. Install Prisma

```bash
# Install Prisma CLI
npm install -g prisma

# Generate Prisma client
npm run db:generate
```

### 2. Database Schema

The schema is defined in `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  orders    Order[]
}

model Product {
  id          String         @id @default(cuid())
  name        String
  slug        String         @unique
  description String?
  price       Decimal        @db.Decimal(10, 2)
  categoryId  String
  inventory   Int            @default(0)
  status      ProductStatus  @default(ACTIVE)
  featured    Boolean        @default(false)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  category    Category       @relation(fields: [categoryId], references: [id])
  images      ProductImage[]
  orderItems  OrderItem[]
}

model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  products    Product[]
}

model ProductImage {
  id        String   @id @default(cuid())
  productId String
  url       String
  altText   String?
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
}

model Order {
  id            String      @id @default(cuid())
  userId        String
  total         Decimal     @db.Decimal(10, 2)
  status        OrderStatus @default(PENDING)
  paymentIntent String?
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  user       User        @relation(fields: [userId], references: [id])
  orderItems OrderItem[]
}

model OrderItem {
  id        String   @id @default(cuid())
  orderId   String
  productId String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
  createdAt DateTime @default(now())

  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id])
}

enum Role {
  USER
  MANAGER
  ADMIN
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  DRAFT
}

enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

### 3. Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (development)
npm run db:push

# Create migration
npm run db:migrate

# Reset database (⚠️ Destructive)
npm run db:reset

# Open Prisma Studio
npm run db:studio
```

## 🌱 Database Seeding

### 1. Seed Script

The seed script creates initial data in `prisma/seed.ts`:


### 2. Running Seeds

```bash
# Seed database with initial data
npm run db:seed

# Reset and reseed (⚠️ Destructive)
npm run db:reset
```

### 3. Seed Data Includes

- **4 Categories**: Laptops, Smartphones, Headphones, Accessories
- **30 Products**: Variety of electronics with realistic pricing
- **3 Users**: Admin, Manager, Regular user with different roles
- **Sample Orders**: For dashboard demonstration

## 🏗️ Production Database Setup

### 1. Vercel Postgres (Recommended for Vercel deployment)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Create Postgres database
vercel postgres create udt-store-db

# Get connection string from Vercel dashboard
```

### 2. Alternative Production Databases

#### Supabase

```bash
# Create project at supabase.com
# Get connection string from project settings
DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
```

### 3. Production Environment Variables

```env
# Production .env
DATABASE_URL="your_production_database_url"
NEXTAUTH_SECRET="your_production_secret_32_chars_min"
NEXTAUTH_URL="https://your-domain.com"
```

### 4. Production Database Setup

```bash
# Deploy schema to production
npx prisma migrate deploy

# Seed production database (run once)
npx prisma db seed
```

## 🔧 Database Management

### 1. Prisma Studio

Visual database editor:

```bash
# Start Prisma Studio
npm run db:studio

# Access at: http://localhost:5555
```

### 2. Database Migrations

```bash
# Create migration (development)
npx prisma migrate dev --name add_new_feature

# Deploy migration (production)
npx prisma migrate deploy

# Reset migrations (⚠️ Destructive)
npx prisma migrate reset
```

### 3. Direct Database Access

```bash
# Local database (Docker)
docker exec -it udt-store-dev-db psql -U postgres -d udt_store_dev

# Production database
psql "your_production_database_url"
```

### 4. Backup and Restore

#### Local Backup

```bash
# Create backup
docker exec udt-store-dev-db pg_dump -U postgres udt_store_dev > backup.sql

# Restore backup
docker exec -i udt-store-dev-db psql -U postgres -d udt_store_dev < backup.sql
```

#### Production Backup

```bash
# Create backup
pg_dump "your_production_database_url" > production_backup.sql

# Restore backup
psql "your_production_database_url" < production_backup.sql
```

## 🔍 Troubleshooting

### 1. Connection Issues

#### Database Connection Refused

```bash
# Check if PostgreSQL is running
docker ps

# Start PostgreSQL
docker-compose up postgres -d

# Check connection
npm run db:push
```

#### Wrong Database URL

```bash
# Check environment variable
echo $DATABASE_URL

# Update .env file
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/udt_store_dev"
```

### 2. Migration Issues

#### Migration Failed

```bash
# Check migration status
npx prisma migrate status

# Resolve failed migration
npx prisma migrate resolve --rolled-back migration_name

# Apply migrations
npx prisma migrate deploy
```

#### Schema Drift

```bash
# Check for schema differences
npx prisma db push --preview-feature

# Or create migration
npx prisma migrate dev
```

### 3. Seed Issues

#### Seed Failed

```bash
# Check for existing data conflicts
npx prisma studio

# Reset and reseed
npm run db:reset
```

#### Unique Constraint Violations

```bash
# Clear existing data
npx prisma migrate reset

# Or update seed script to handle existing data
```

### 4. Performance Issues

#### Slow Queries

```bash
# Enable query logging in Prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
  log      = ["query", "info", "warn", "error"]
}
```

#### Connection Pool Issues

```bash
# Increase connection pool size
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20"
```

## 📊 Database Monitoring

### 1. Health Checks

```typescript
// Check database connection
export async function checkDatabaseHealth() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date() };
  } catch (error) {
    return { status: 'unhealthy', error: error.message };
  }
}
```

### 2. Query Monitoring

```typescript
// Enable query logging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### 3. Connection Monitoring

```bash
# Check active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = 'udt_store_dev';

# Check connection limits
SELECT * FROM pg_settings WHERE name = 'max_connections';
```

## 🔒 Security

### 1. Database Security

```bash
# Use environment variables for sensitive data
DATABASE_URL="postgresql://user:password@host:5432/db"

# Never commit database credentials
echo "*.env" >> .gitignore
```

### 2. Connection Security

```bash
# Use SSL in production
DATABASE_URL="postgresql://user:password@host:5432/db?sslmode=require"

# Connection pooling
DATABASE_URL="postgresql://user:password@host:5432/db?connection_limit=10"
```

### 3. Data Validation

```typescript
// Use Prisma validation
model User {
  email    String @unique
  password String // Hash before storing
}

// Application-level validation
const user = await prisma.user.create({
  data: {
    email: email.toLowerCase(),
    password: await bcrypt.hash(password, 10),
  },
});
```

## 📚 Package.json Scripts

```json
{
  "scripts": {
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:migrate:prod": "prisma migrate deploy",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio",
    "db:reset": "prisma migrate reset"
  }
}
```

## 🎯 Best Practices

### 1. Development

- Use `db:push` for rapid prototyping
- Create migrations for production changes
- Always seed fresh databases
- Use Prisma Studio for data inspection

### 2. Production

- Use `migrate deploy` for production
- Set up database backups
- Monitor database performance
- Use connection pooling

### 3. Security

- Hash passwords before storing
- Use environment variables
- Validate all inputs
- Enable SSL for production

---

## Portfolio & Demo Data

- Seed script includes demo users (admin, manager, user) and sample products for portfolio/interview use
- For portfolio customization, edit prisma/seed.ts to use your own email domains and demo data
- See LOCAL_DEVELOPMENT.md for local seeding and troubleshooting
- See PRODUCTION_DEPLOYMENT.md for production database setup and migration

**Your database is now ready for development and production! 🚀**

For local development setup, see [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
For production deployment, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
