# 🛒 UDT Store - Complete E-commerce Platform

A modern, full-stack e-commerce platform built with Next.js 15, featuring comprehensive admin dashboard, role-based authentication, Stripe integration, and professional API documentation.

![UDT Store](public/udt-store-logo.png)

## 📖 Documentation

| Document | Description |
|----------|-------------|
| **[🛠️ Local Development](docs/LOCAL_DEVELOPMENT.md)** | Complete setup guide for local development |
| **[🚀 Production Deployment](docs/PRODUCTION_DEPLOYMENT.md)** | Deployment guide for Vercel and Docker |
| **[🐳 Docker Guide](docs/DOCKER.md)** | Docker-specific setup and commands |
| **[📸 Image Upload System](docs/IMAGE_UPLOAD_SYSTEM.md)** | Image upload implementation details |

## 🌟 Features

### 🎯 **Core E-commerce**
- **Product Catalog** - Search, filtering, and pagination
- **Shopping Cart** - Persistent cart with Zustand state management
- **User Authentication** - NextAuth.js v5 with Google/GitHub OAuth + credentials
- **Order Management** - Complete order lifecycle with status tracking
- **Payment Integration** - Stripe checkout with webhook processing
- **PWA Support** - Progressive Web App with service worker

### 🔐 **Authentication & Authorization**
- **Three-tier Role System**: USER → MANAGER → ADMIN
- **NextAuth.js v5** with JWT sessions
- **OAuth Providers**: Google, GitHub + email/password
- **Role-based Access Control** with granular permissions

### 📊 **Admin Dashboard**
- **Analytics Dashboard** - Sales, revenue, and customer metrics
- **Product Management** - CRUD operations with image upload
- **Order Management** - Status updates and order tracking
- **User Management** - Role assignment and customer management
- **Inventory Tracking** - Stock levels and low stock alerts

### 📸 **Image Upload System**
- **Drag & Drop Interface** - Modern file upload with preview
- **Image Processing** - Sharp for WebP conversion and optimization
- **Storage Options** - Local storage and Cloudinary integration
- **Thumbnail Generation** - Automatic thumbnail creation
- **File Validation** - Type, size, and security validation
- **Multiple Images** - Support for multiple product images

### 🚀 **Developer Experience**
- **API Documentation** - Swagger/OpenAPI 3.0 with interactive testing
- **TypeScript** - Full type safety throughout the application
- **Prisma ORM** - Type-safe database operations with PostgreSQL
- **Docker Support** - Development and production containers
- **Hot Reload** - Next.js development server with fast refresh

## 📋 Quick Start

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Docker Desktop** ([Download](https://docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

### 🚀 Local Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd udt-store
   npm install
   ```

2. **Environment Setup**
   ```bash
   # Copy environment file
   cp .env.example .env
   
   # Defaults work fine, or customize values
   nano .env
   ```

3. **Start Database**
   ```bash
   # Start PostgreSQL with Docker
   ./scripts/docker-dev.sh start
   ```

4. **Initialize Database**
   ```bash
   # Push database schema
   npm run db:push
   
   # Seed with sample data (6 products, admin accounts)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - **Main Store**: http://localhost:3000
   - **Admin Dashboard**: http://localhost:3000/admin
   - **API Documentation**: http://localhost:3000/api/docs
   - **Database Admin**: http://localhost:8080 (Adminer)

### 🔑 Default Login Credentials

**Admin Account (Full Access)**
- Email: `admin@udthz.com`
- Password: `admin123`

**Manager Account (Products & Orders)**
- Email: `manager@udthz.com`
- Password: `manager123`

## 🐳 Docker Development

### Local Development with Docker
```bash
# Start local PostgreSQL (recommended)
npm run docker:dev

# Stop local PostgreSQL  
npm run docker:dev:stop

# View logs
npm run docker:dev:logs
```

### Production Deployment
**Recommended**: Use Vercel deployment (see below)

For self-hosting:
```bash
# Build and start production containers
docker-compose up -d
```

## 🏗️ Architecture

### **Tech Stack**
- **Frontend**: Next.js 15, React 19, TailwindCSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL 15
- **State Management**: Zustand (cart, wishlist)
- **Authentication**: NextAuth.js v5 (OAuth + credentials)
- **Payments**: Stripe API with webhooks
- **Image Processing**: Sharp, Cloudinary
- **Documentation**: Swagger/OpenAPI 3.0
- **Deployment**: Docker containers, Vercel support

### **Project Structure**
```
udt-store/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   │   ├── admin/         # Admin APIs (role-protected)
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── cart/          # Shopping cart
│   │   ├── docs/          # API documentation
│   │   ├── health/        # Health check
│   │   ├── orders/        # Order management
│   │   ├── products/      # Product catalog
│   │   ├── stripe/        # Payment processing
│   │   └── users/         # User management
│   ├── cart/              # Cart pages
│   ├── products/          # Product pages
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── admin/             # Admin dashboard components
│   └── ui/                # Reusable UI components (shadcn/ui)
├── lib/                   # Utility libraries
│   ├── auth.ts            # NextAuth configuration
│   ├── client.js          # Mock data (legacy)
│   ├── cloudinary.ts      # Image storage
│   ├── permissions.ts     # Role-based access control
│   ├── prisma.ts          # Database client
│   └── utils.ts           # Common utilities
├── prisma/                # Database configuration
│   ├── schema.prisma      # Database schema (full e-commerce)
│   └── seed.ts            # Sample data seeder
├── public/                # Static assets
│   └── uploads/           # Image upload storage
├── scripts/               # Docker scripts
│   ├── docker-dev.sh      # Development environment
│   └── docker-prod.sh     # Production environment
├── auth.ts                # NextAuth configuration
└── docker-compose*.yml    # Docker configurations
```

## 📚 API Documentation

### **Interactive Documentation**
Visit [http://localhost:3000/api/docs](http://localhost:3000/api/docs) for full interactive API documentation with:
- **Live API Testing** - Try endpoints directly in the browser
- **Authentication Examples** - JWT and cookie-based auth
- **Request/Response Schemas** - Complete data models
- **Error Code Reference** - Detailed error handling

### **Key API Endpoints**

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/health` | GET | Public | System health check |
| `/api/products` | GET | Public | Product catalog with search/filter |
| `/api/products/[id]` | GET | Public | Single product details |
| `/api/auth/*` | ALL | Public | NextAuth authentication |
| `/api/cart` | GET/POST | User | Shopping cart management |
| `/api/orders` | GET/POST | User | Order management |
| `/api/stripe` | POST | User | Stripe checkout session |
| `/api/admin/dashboard` | GET | ADMIN | Dashboard analytics |
| `/api/admin/products` | CRUD | MANAGER+ | Product management |
| `/api/admin/upload` | POST/DELETE | MANAGER+ | Image uploads |

### **Authentication Examples**
```bash
# Login and get token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@udthz.com","password":"admin123"}'

# Use token for authenticated requests
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/admin/products
```

## 🛠️ Development Commands

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run lint               # Run ESLint
npm run type-check         # TypeScript checking

# Database
npm run db:push            # Push schema to database
npm run db:seed            # Seed with sample data
npm run db:studio          # Open Prisma Studio
npm run db:migrate         # Create migrations

# Docker
./scripts/docker-dev.sh start    # Start development environment
./scripts/docker-dev.sh stop     # Stop development environment
./scripts/docker-prod.sh deploy  # Deploy production
```

## 🌐 Production Deployment (Vercel + Vercel Postgres)

### **Quick Vercel Deployment**

1. **Create Vercel Postgres Database**
   ```bash
   npm i -g vercel
   vercel login
   vercel postgres create udt-store-db
   ```

2. **Deploy to Vercel**
   ```bash
   # Push to GitHub and connect to Vercel
   git push origin main
   
   # Or deploy directly
   vercel --prod
   ```

3. **Set Environment Variables in Vercel Dashboard**
   ```bash
   DATABASE_URL="postgres://default:xxx@xxx.vercel-storage.com/udt-store-db"
   NEXTAUTH_SECRET="your-32-character-secret-key"
   NEXTAUTH_URL="https://your-domain.vercel.app"
   STRIPE_PUBLISHABLE_KEY="pk_test_..."
   STRIPE_SECRET_KEY="sk_test_..."
   
   # Image Upload (Recommended for Vercel)
   CLOUDINARY_CLOUD_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_API_SECRET="your_api_secret"
   
   NODE_ENV="production"
   ```

4. **Initialize Production Database**
   ```bash
   # Push schema to production database
   npx prisma db push
   
   # Seed with sample data (run once)
   npx prisma db seed
   ```

## 🔒 Security Features

- **Role-Based Access Control** - USER/MANAGER/ADMIN permissions
- **NextAuth.js Security** - Secure session management with JWT
- **Input Validation** - Prisma type validation
- **SQL Injection Protection** - Prisma ORM parameterized queries
- **Authentication** - OAuth + credentials with secure storage
- **File Upload Security** - Type and size validation
- **Environment Variables** - Secure secret management

## 📊 Monitoring & Analytics

- **Health Checks** - `/api/health` endpoint with database connectivity
- **Admin Dashboard** - Sales, revenue, and customer analytics
- **API Documentation** - Interactive Swagger documentation
- **Database Monitoring** - Prisma query optimization

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [API Docs](http://localhost:3000/api/docs)
- **Health Check**: [System Status](http://localhost:3000/api/health)
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **Email**: admin@udthz.com

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies.**