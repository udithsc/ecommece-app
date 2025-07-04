# 🚀 Production Deployment Guide

Complete guide for deploying UDT Store to production environments with the implemented features.

## 🎯 Deployment Options

### 1. **Vercel (Recommended)**

- ✅ Serverless deployment
- ✅ Automatic scaling
- ✅ Built-in CDN
- ✅ Easy domain management
- ✅ Environment variables management

### 2. **Self-Hosted Docker**

- ✅ Full control
- ✅ Custom infrastructure
- ✅ Cost optimization
- ✅ Private cloud deployment

---

## 🌐 Vercel Deployment (Recommended)

### Prerequisites

- Vercel account
- GitHub repository
- PostgreSQL database (Vercel Postgres or external)
- Cloudinary account (for images)
- Stripe account (for payments)

### 1. Database Setup

#### Option A: Vercel Postgres (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Create Postgres database
vercel postgres create udt-store-db

# Get connection string from Vercel dashboard
```

#### Option B: External PostgreSQL

Use services like:

- **Neon** (serverless PostgreSQL)
- **Supabase** (open source)
- **Railway** (simple setup)
- **PlanetScale** (MySQL alternative)

### 2. Environment Variables

Set these in Vercel dashboard (Settings → Environment Variables):

```env
# Database
DATABASE_URL="postgres://username:password@host:5432/database"

# Authentication (Required)
NEXTAUTH_SECRET="secure-32-character-secret-for-production"
NEXTAUTH_URL="https://your-domain.com"

# Stripe (Production Keys)
STRIPE_PUBLISHABLE_KEY="pk_live_your_live_publishable_key"
STRIPE_SECRET_KEY="sk_live_your_live_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_live_webhook_secret"

# Cloudinary (Required for Vercel - no persistent file storage)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

# Application
NODE_ENV="production"
MAX_FILE_SIZE=5242880
```

### 3. Deploy to Vercel

#### Via Vercel Dashboard

1. Connect your GitHub repository
2. Import project to Vercel
3. Configure environment variables
4. Deploy

#### Via CLI

```bash
# Install and configure
npm i -g vercel
vercel login

# Deploy
vercel --prod

# Set environment variables
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET
vercel env add STRIPE_SECRET_KEY
# ... repeat for all variables
```

### 4. Database Migration

```bash
# Run schema push to production database
npx prisma db push

# Seed production database (optional)
npx prisma db seed
```

### 5. Domain Configuration

1. Add custom domain in Vercel dashboard
2. Configure DNS records
3. SSL certificates are automatic

### 6. Stripe Webhook Setup

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-domain.com/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
4. Copy webhook secret to environment variables

---

## 🐳 Self-Hosted Docker Deployment

### Prerequisites

- Linux server (Ubuntu/CentOS)
- Docker & Docker Compose
- Domain name
- SSL certificates

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Add user to docker group
sudo usermod -aG docker $USER
```

### 2. Environment Configuration

```bash
# Clone repository
git clone <your-repo>
cd udt-store

# Copy production environment
cp .env.docker.example .env.docker

# Edit environment variables
nano .env.docker
```

Required variables:

```env
# Database
POSTGRES_DB=udt-store-db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
DATABASE_URL=postgresql://postgres:your_secure_password@postgres:5432/udt-store-db

# Authentication
NEXTAUTH_SECRET=your-super-secure-production-secret-min-32-chars
NEXTAUTH_URL=https://your-domain.com

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook

# Image Upload (Optional - can use local storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Application
NODE_ENV=production
MAX_FILE_SIZE=5242880
```

### 3. SSL Configuration

#### Using Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt install certbot

# Get SSL certificate
sudo certbot certonly --standalone -d your-domain.com

# Certificates will be in /etc/letsencrypt/live/your-domain.com/
```

### 4. Deploy with Docker

```bash
# Build and start services
./scripts/docker-prod.sh deploy

# Run database schema push
docker-compose -f docker-compose.prod.yml exec web npx prisma db push

# Check service health
./scripts/docker-prod.sh health
```

### 5. Monitoring and Maintenance

```bash
# View logs
./scripts/docker-prod.sh logs

# Monitor resource usage
./scripts/docker-prod.sh stats

# Backup database
./scripts/docker-prod.sh backup

# Update application
git pull origin main
./scripts/docker-prod.sh update
```

---

## 🔧 Performance Optimization

### 1. Next.js Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### 2. Database Optimization

```bash
# Use connection pooling for production
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=10&pool_timeout=20"
```

### 3. Image Optimization

#### Cloudinary Settings

```js
// lib/cloudinary.ts
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Force HTTPS
});

// Optimization settings
const optimizeImage = (publicId: string) => {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: 'auto:good',
    crop: 'fill',
    dpr: 'auto',
  });
};
```

---

## 🔒 Security Configuration

### 1. Environment Security

```bash
# Generate secure secrets
openssl rand -base64 32  # For NEXTAUTH_SECRET

# Use environment-specific variables
# Never commit production secrets to git
```

### 2. API Security

```ts
// Rate limiting example (would need implementation)
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Basic rate limiting check
  const ip = request.ip || 'unknown';

  // Your API logic here
  return NextResponse.json({ success: true });
}
```

### 3. Database Security

```sql
-- Create app user with limited permissions
CREATE USER app_user WITH PASSWORD 'secure_app_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO app_user;
```

---

## 📊 Monitoring and Health Checks

### 1. Health Endpoint

Your system includes a health check at `/api/health`:

```js
// app/api/health/route.ts
export async function GET() {
  try {
    // Database health check
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
```

### 2. Basic Monitoring

```bash
# Check application health
curl https://your-domain.com/api/health

# Monitor Docker containers (self-hosted)
docker stats

# Check database connections
docker-compose logs postgres
```

---

## 🔄 Backup and Recovery

### 1. Database Backups

#### Automated Backups (Docker)

```bash
# Create backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="udt-store-db"

# Create backup
docker-compose exec postgres pg_dump -U postgres $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

#### Schedule with Cron

```bash
# Add to crontab
crontab -e

# Run backup daily at 2 AM
0 2 * * * /path/to/backup.sh
```

### 2. File Backups

```bash
# Backup uploaded files (if using local storage)
rsync -av /path/to/uploads/ /backup/uploads/

# Or use cloud storage (Cloudinary handles this automatically)
```

### 3. Recovery Procedures

```bash
# Restore database from backup
gunzip -c backup_20231201_020000.sql.gz | docker-compose exec -T postgres psql -U postgres udt-store-db

# Restore files
rsync -av /backup/uploads/ /path/to/uploads/
```

---

## 🎯 Go-Live Checklist

### Pre-Launch

- [ ] **Environment Setup**

  - [ ] Production database configured
  - [ ] Environment variables set
  - [ ] SSL certificates installed (if self-hosting)
  - [ ] Domain configured

- [ ] **Security**

  - [ ] Secrets rotated for production
  - [ ] NextAuth.js configured with production URL
  - [ ] Stripe live keys configured
  - [ ] File upload limits set

- [ ] **Performance**
  - [ ] CDN configured (Cloudinary)
  - [ ] Database optimized
  - [ ] Images optimized

### Launch Day

- [ ] **Deploy to Production**

  - [ ] Code deployed
  - [ ] Database schema pushed
  - [ ] DNS updated
  - [ ] SSL verified

- [ ] **Verification**
  - [ ] All pages load correctly
  - [ ] User registration works
  - [ ] Payment processing works
  - [ ] Image uploads work
  - [ ] Admin panel accessible

### Post-Launch

- [ ] **Monitoring**
  - [ ] Check health endpoint
  - [ ] Monitor application logs
  - [ ] Verify backups working

---

## 🚨 Troubleshooting

### Common Issues

**Build Failures:**

```bash
# Clear cache and rebuild
rm -rf .next
npm run build

# Check for TypeScript errors
npm run type-check
```

**Database Connection Issues:**

```bash
# Test connection
npx prisma studio

# Check environment variables
echo $DATABASE_URL

# Verify database is running (Docker)
docker-compose ps
```

**SSL Certificate Issues (Self-hosted):**

```bash
# Renew Let's Encrypt certificates
sudo certbot renew

# Test SSL configuration
openssl s_client -connect your-domain.com:443
```

**Image Upload Issues:**

```bash
# Check Cloudinary configuration
echo $CLOUDINARY_CLOUD_NAME

# Test local uploads directory (Docker)
docker-compose exec web ls -la /app/uploads
```

---

## 🎨 Portfolio & Interview Highlights

- Emphasize full-stack skills: Next.js, PostgreSQL, Stripe, Docker, role-based access, admin dashboard, API docs
- Demo script: show admin dashboard, analytics, role-based access, API docs, responsive design, code quality
- Example portfolio URLs: main store, admin dashboard, API docs, health check
- Usage monitoring: Vercel dashboard for storage, compute, bandwidth, function executions
- Optimization: use optimized images, limit order history, regular database cleanup
- Next steps: add features, scale up, custom domain, analytics, performance optimization

---

## Pro Tips & Security

- Use environment variables for all secrets
- Enable Vercel Security Headers
- Regular dependency updates
- Monitor for vulnerabilities
- See LOCAL_DEVELOPMENT.md for troubleshooting and dev workflow
- See DATABASE_SETUP.md for database management and backup

---

## 📞 Support and Maintenance

### Regular Maintenance Tasks

**Weekly:**

- Review application logs
- Check backup integrity
- Monitor health endpoint
- Update dependencies (security patches)

**Monthly:**

- Review and rotate secrets
- Update documentation
- Test disaster recovery procedures

**Quarterly:**

- Security audit
- Performance optimization review
- Infrastructure cost analysis

### Getting Help

1. **Check health endpoint first**: `/api/health`
2. **Review application logs**
3. **Check environment configuration**
4. **Test in staging/development environment**

---

**Your UDT Store is ready for production! 🚀**

For local development, see [LOCAL_DEVELOPMENT.md](./LOCAL_DEVELOPMENT.md)
For Docker specifics, see [DOCKER.md](./DOCKER.md)
