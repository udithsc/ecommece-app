# 🛠️ Local Development Guide

Complete guide for setting up and running UDT Store locally with all implemented features.

## 📋 Prerequisites

Ensure you have the following installed:

- **Node.js** v18+ (LTS recommended)
- **npm** v8+ or **yarn** v1.22+
- **Docker** v20.10+ and **Docker Compose** v2.0+
- **Git** for version control

### Check Prerequisites

```bash
node --version    # Should be v18+
npm --version     # Should be v8+
docker --version  # Should be v20.10+
git --version     # Any recent version
```

## 🚀 Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd udt-store

# Install dependencies
npm install

# Make scripts executable
chmod +x scripts/docker-dev.sh
chmod +x scripts/docker-prod.sh
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
nano .env  # or use your preferred editor
```

### 3. Start Development Environment

```bash
# Start database and services
./scripts/docker-dev.sh start

# Push database schema
npm run db:push

# Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

### 4. Access Your Application

- **Main App**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Database Admin**: http://localhost:8080
- **API Docs**: http://localhost:3000/api/docs

## ⚙️ Environment Configuration

### Required Environment Variables

```env
# Database Configuration
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/udt-store-db"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-min-32-characters"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Payment (Development)
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_stripe_webhook_secret"

# File Upload Settings
MAX_FILE_SIZE=5242880  # 5MB
UPLOAD_DIR="/app/uploads"

# Application Settings
NODE_ENV="development"
NEXT_TELEMETRY_DISABLED=1
```

### Optional: Cloudinary Configuration

For cloud image storage:

```env
# Cloudinary (Optional - for cloud image storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

## 🗄️ Database Setup

### Using Docker (Recommended)

The project includes Docker setup for local development:

```bash
# Start PostgreSQL and Adminer
./scripts/docker-dev.sh start

# Check service status
./scripts/docker-dev.sh logs

# Stop services
./scripts/docker-dev.sh stop
```

**Services Included:**

- **PostgreSQL 15**: Main database
- **Adminer**: Database administration UI

### Database Operations

```bash
# Push schema changes to database
npm run db:push

# Seed database with sample data
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Create and run migrations
npm run db:migrate

# Reset database (⚠️ Destructive)
npm run db:reset
```

## 📂 Project Structure

```
udt-store/
├── app/                           # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin dashboard
│   ├── api/                      # API routes
│   │   ├── admin/                # Admin APIs (role-protected)
│   │   ├── auth/                 # NextAuth endpoints
│   │   ├── cart/                 # Shopping cart API
│   │   ├── docs/                 # API documentation
│   │   ├── health/               # Health check
│   │   ├── orders/               # Order management
│   │   ├── products/             # Product catalog
│   │   ├── stripe/               # Payment processing
│   │   └── users/                # User management
│   ├── cart/                     # Shopping cart pages
│   ├── products/                 # Product pages
│   └── page.tsx                  # Homepage
├── components/                    # React components
│   ├── admin/                    # Admin components
│   └── ui/                       # UI components (shadcn/ui)
├── lib/                          # Utilities and configurations
│   ├── auth.ts                   # NextAuth config
│   ├── client.js                 # Legacy mock data
│   ├── cloudinary.ts             # Image storage
│   ├── permissions.ts            # Role-based access
│   ├── prisma.ts                 # Database client
│   └── utils.ts                  # Common utilities
├── prisma/                       # Database schema
│   ├── schema.prisma             # Database models
│   └── seed.ts                   # Sample data
├── public/                       # Static assets
│   └── uploads/                  # Local image uploads
├── scripts/                      # Development scripts
└── auth.ts                       # NextAuth configuration
```

## 🎯 Development Workflow

### 1. Feature Development

```bash
# Create new branch
git checkout -b feature/your-feature-name

# Start development servers
./scripts/docker-dev.sh start
npm run dev

# Make your changes...

# Test your changes
npm run lint           # Check code style
npm run type-check     # TypeScript validation

# Commit changes
git add .
git commit -m "feat: your feature description"
```

### 2. Database Changes

```bash
# Modify prisma/schema.prisma

# Push changes to development database
npm run db:push

# Create migration for production
npm run db:migrate
```

### 3. API Development

All APIs are in the `app/api/` directory:

```bash
# Public APIs
app/api/[endpoint]/route.ts

# Admin APIs (protected)
app/api/admin/[endpoint]/route.ts

# Authentication required APIs use NextAuth
```

## 🔍 Debugging

### Development Tools

1. **Next.js DevTools**

   - Automatic hot reload
   - Error overlay
   - Build optimization hints

2. **Database Debugging**

   - Prisma Studio: `npm run db:studio`
   - Adminer: http://localhost:8080
   - Database logs: `./scripts/docker-dev.sh logs postgres`

3. **API Debugging**
   - API documentation: http://localhost:3000/api/docs
   - Network tab in browser DevTools
   - Server logs in terminal

### Common Development Issues

**Port Already in Use:**

```bash
# Find process using port
lsof -i :3000

# Kill process
kill -9 <PID>

# Or use different port
npm run dev -- -p 3001
```

**Database Connection Issues:**

```bash
# Check Docker services
./scripts/docker-dev.sh logs

# Restart database
./scripts/docker-dev.sh restart

# Reset database
npm run db:reset
```

**Image Upload Issues:**

```bash
# Check uploads directory
ls -la app/uploads/

# Check permissions
chmod 755 app/uploads/

# Check logs in terminal
```

## 🎨 Styling and UI

### Tailwind CSS

The project uses Tailwind CSS for styling:

```bash
# Styles are built automatically in dev mode
npm run dev

# Build CSS for production
npm run build
```

### UI Components

Built with shadcn/ui components:

```bash
# Components are already included
# Located in components/ui/
```

## 📦 Package Management

### Current Dependencies

**Main Dependencies:**

- Next.js 15 with App Router
- React 19
- Prisma 6 with PostgreSQL
- NextAuth.js v5 (beta)
- Stripe for payments
- Tailwind CSS + shadcn/ui
- Zustand for state management
- Sharp for image processing

### Adding Dependencies

```bash
# Add runtime dependency
npm install package-name

# Add development dependency
npm install -D package-name
```

## 🚀 Performance Features

### Built-in Optimizations

1. **Next.js Image Optimization**

   ```jsx
   import Image from 'next/image';

   <Image
     src="/image.jpg"
     alt="Description"
     width={500}
     height={300}
     priority // For above-the-fold images
   />;
   ```

2. **Database Query Optimization**

   ```ts
   // Prisma includes/selects are optimized
   const products = await prisma.product.findMany({
     include: {
       images: true,
       category: true,
     },
   });
   ```

3. **State Management with Zustand**
   - Cart state persisted to localStorage
   - Optimistic updates for better UX

## 🔒 Security Implementation

### Current Security Features

- **Role-based access control** with USER/MANAGER/ADMIN
- **NextAuth.js** with secure session management
- **Input validation** through Prisma types
- **File upload validation** (type and size)
- **Environment variable protection**

### Security Best Practices

```ts
// Always validate API inputs
const { searchParams } = new URL(request.url);
const page = parseInt(searchParams.get('page') || '1');

// Use role-based permissions
const session = await auth();
if (!session?.user?.email) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
```

## 📚 Key Features Implemented

### E-commerce Core

- ✅ Product catalog with search/filtering
- ✅ Shopping cart (Zustand + localStorage)
- ✅ Checkout with Stripe
- ✅ Order management
- ✅ User authentication (OAuth + credentials)
- ✅ Wishlist functionality
- ✅ Product reviews

### Admin Panel

- ✅ Dashboard with analytics
- ✅ Product management with image upload
- ✅ Order management
- ✅ User/customer management
- ✅ Role-based access control

### Technical Features

- ✅ PWA support
- ✅ API documentation (Swagger)
- ✅ Health monitoring
- ✅ Image optimization
- ✅ Docker development environment

## 🆘 Getting Help

### Troubleshooting Steps

1. **Check the logs**:

   ```bash
   # Application logs
   npm run dev

   # Database logs
   ./scripts/docker-dev.sh logs postgres
   ```

2. **Verify environment**:

   ```bash
   # Check environment variables
   cat .env

   # Check database connection
   npx prisma studio
   ```

3. **Reset everything**:

   ```bash
   # Clean install
   rm -rf node_modules package-lock.json
   npm install

   # Reset database
   npm run db:reset

   # Restart services
   ./scripts/docker-dev.sh restart
   ```

### Common Solutions

- **Build Errors**: Clear `.next` folder and rebuild
- **Database Issues**: Check Docker services and environment variables
- **Package Conflicts**: Clear `node_modules` and reinstall
- **Port Conflicts**: Use different ports or kill existing processes

---

## 🎨 Portfolio & Demo Tips

**Perfect for showcasing full-stack development skills to potential employers!**

- 20-30 products, 10+ users, role-based access demo
- Free hosting (Vercel), professional appearance
- Demo script for interviews: show admin dashboard, role-based access, API docs, responsive design, code quality
- Example demo accounts: admin@yourportfolio.com (ADMIN), manager@yourportfolio.com (MANAGER), customer@yourportfolio.com (USER)
- See PRODUCTION_DEPLOYMENT.md for deployment and scaling tips

---

## Troubleshooting & Optimization

- See PRODUCTION_DEPLOYMENT.md for advanced troubleshooting, scaling, and monitoring
- See DATABASE_SETUP.md for database-specific troubleshooting and backup
- See IMAGE_UPLOAD_SYSTEM.md for image upload troubleshooting

---

**Happy Development! 🎉**

For production deployment, see [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)
For Docker-specific instructions, see [DOCKER.md](./DOCKER.md)
