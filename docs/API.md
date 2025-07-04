# UDT Store API Documentation

Welcome to the UDT Store API documentation. This API provides comprehensive e-commerce functionality including authentication, product management, order processing, and administrative features.

## 🚀 Quick Start

### Base URLs

- **Development**: `http://localhost:3000`
- **Production**: `https://your-production-domain.com`

### Interactive Documentation

- **Swagger UI**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **OpenAPI Spec**: [http://localhost:3000/api/docs/spec](http://localhost:3000/api/docs/spec)

## 🔐 Authentication

The API supports two authentication methods:

### 1. JWT Bearer Token

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:3000/api/admin/products
```

### 2. HTTP-Only Cookies

Automatically set when logging in via the web interface or `/api/auth/login` endpoint.

### Getting a Token

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@udthz.com","password":"admin123"}'
```

## 👥 User Roles

| Role      | Permissions                | Description                                           |
| --------- | -------------------------- | ----------------------------------------------------- |
| `USER`    | Basic customer access      | Can browse products, manage cart, place orders        |
| `MANAGER` | Product & Order management | Can manage products, categories, and orders           |
| `ADMIN`   | Full access                | All permissions including user management and reports |

## 📚 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

### Products (Public)

- `GET /api/products` - List products with filtering and pagination
- `GET /api/products/{id}` - Get single product details

### Admin - Products (MANAGER+)

- `GET /api/admin/products` - Admin product listing with advanced filters
- `POST /api/admin/products` - Create new product
- `PUT /api/admin/products/{id}` - Update product
- `DELETE /api/admin/products/{id}` - Delete product

### Admin - Orders (MANAGER+)

- `GET /api/admin/orders` - List orders with filtering
- `GET /api/admin/orders/{id}` - Get order details
- `PUT /api/admin/orders/{id}` - Update order status

### Admin - Dashboard (ADMIN)

- `GET /api/admin/dashboard` - Get dashboard statistics and metrics

### System

- `GET /api/health` - Health check endpoint

## 🔍 Query Parameters

### Pagination

All list endpoints support pagination:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

### Filtering

- `search` - Search term for name/description
- `category` - Filter by category
- `status` - Filter by status (products/orders)
- `featured` - Filter featured products only

### Sorting

- `sortBy` - Field to sort by
- `sortOrder` - `asc` or `desc`

## 📝 Example Requests

### Get Products

```bash
curl "http://localhost:3000/api/products?page=1&limit=5&featured=true"
```

### Create Product (Admin)

```bash
curl -X POST http://localhost:3000/api/admin/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Gaming Laptop",
    "slug": "new-gaming-laptop",
    "price": "1999.99",
    "description": "Latest gaming laptop with RTX 4070",
    "categoryId": "cm123456789",
    "inventory": 10,
    "status": "ACTIVE"
  }'
```

### Search Products

```bash
curl "http://localhost:3000/api/products?search=laptop&category=laptops"
```

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### Error Response

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2025-07-02T15:10:09.034Z"
}
```

## 🔗 Rate Limiting

- **Public endpoints**: 100 requests per minute
- **Authenticated endpoints**: 500 requests per minute
- **Admin endpoints**: 1000 requests per minute

## 📞 Support

- **Documentation**: [Swagger UI](http://localhost:3000/api/docs)
- **Health Check**: [/api/health](http://localhost:3000/api/health)
- **Contact**: admin@udthz.com

---

For more detailed information and interactive testing, visit the [Swagger UI Documentation](http://localhost:3000/api/docs).
