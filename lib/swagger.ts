import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UDT Store API',
      version: '1.0.0',
      description: 'Complete e-commerce API with authentication, product management, and admin features',
      contact: {
        name: 'UDT Store',
        email: 'admin@udthz.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://your-production-domain.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token for API authentication',
        },
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'auth-token',
          description: 'HTTP-only cookie authentication',
        },
      },
      schemas: {
        // User schemas
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique user identifier' },
            email: { type: 'string', format: 'email', description: 'User email address' },
            name: { type: 'string', description: 'User full name' },
            role: { 
              type: 'string', 
              enum: ['USER', 'MANAGER', 'ADMIN'],
              description: 'User role for access control'
            },
            image: { type: 'string', nullable: true, description: 'User profile image URL' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'email', 'name', 'role'],
        },
        
        // Product schemas
        Product: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Unique product identifier' },
            name: { type: 'string', description: 'Product name' },
            slug: { type: 'string', description: 'URL-friendly product identifier' },
            description: { type: 'string', description: 'Product description' },
            shortDescription: { type: 'string', description: 'Brief product description' },
            sku: { type: 'string', description: 'Stock keeping unit' },
            price: { type: 'string', description: 'Product price' },
            comparePrice: { type: 'string', nullable: true, description: 'Compare at price' },
            inventory: { type: 'integer', description: 'Available stock quantity' },
            status: { 
              type: 'string',
              enum: ['ACTIVE', 'DRAFT', 'ARCHIVED'],
              description: 'Product status'
            },
            featured: { type: 'boolean', description: 'Whether product is featured' },
            category: { $ref: '#/components/schemas/Category' },
            images: {
              type: 'array',
              items: { $ref: '#/components/schemas/ProductImage' }
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
          required: ['id', 'name', 'slug', 'price', 'status'],
        },
        
        ProductImage: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            url: { type: 'string', description: 'Image URL' },
            altText: { type: 'string', description: 'Alt text for accessibility' },
            sortOrder: { type: 'integer', description: 'Display order' },
          },
        },
        
        Category: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string', description: 'Category name' },
            slug: { type: 'string', description: 'URL-friendly category identifier' },
            description: { type: 'string', description: 'Category description' },
            sortOrder: { type: 'integer', description: 'Display order' },
          },
        },
        
        // Order schemas
        Order: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            orderNumber: { type: 'string', description: 'Human-readable order number' },
            email: { type: 'string', format: 'email' },
            total: { type: 'string', description: 'Order total amount' },
            status: {
              type: 'string',
              enum: ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
              description: 'Order status'
            },
            paymentStatus: {
              type: 'string',
              enum: ['PENDING', 'PAID', 'FAILED', 'REFUNDED'],
              description: 'Payment status'
            },
            fulfillmentStatus: {
              type: 'string',
              enum: ['UNFULFILLED', 'PARTIALLY_FULFILLED', 'FULFILLED', 'SHIPPED', 'DELIVERED'],
              description: 'Fulfillment status'
            },
            user: { $ref: '#/components/schemas/User', nullable: true },
            items: {
              type: 'array',
              items: { $ref: '#/components/schemas/OrderItem' }
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        
        OrderItem: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            quantity: { type: 'integer', minimum: 1 },
            price: { type: 'string', description: 'Item price at time of order' },
            product: { $ref: '#/components/schemas/Product' },
          },
        },
        
        // Response schemas
        ApiResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', description: 'Whether the request was successful' },
            message: { type: 'string', description: 'Response message' },
            data: { type: 'object', description: 'Response data' },
          },
        },
        
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', description: 'Error message' },
            status: { type: 'integer', description: 'HTTP status code' },
            timestamp: { type: 'string', format: 'date-time' },
          },
          required: ['error'],
        },
        
        // Auth schemas
        LoginRequest: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email', description: 'User email' },
            password: { type: 'string', minLength: 6, description: 'User password' },
          },
          required: ['email', 'password'],
        },
        
        LoginResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            user: { $ref: '#/components/schemas/User' },
            token: { type: 'string', description: 'JWT access token' },
          },
        },
        
        RegisterRequest: {
          type: 'object',
          properties: {
            name: { type: 'string', minLength: 2, description: 'User full name' },
            email: { type: 'string', format: 'email', description: 'User email' },
            password: { type: 'string', minLength: 6, description: 'User password' },
            role: { 
              type: 'string', 
              enum: ['USER'],
              description: 'User role (only USER allowed for public registration)'
            },
          },
          required: ['name', 'email', 'password'],
        },
        
        // Pagination
        PaginationMeta: {
          type: 'object',
          properties: {
            page: { type: 'integer', minimum: 1, description: 'Current page number' },
            limit: { type: 'integer', minimum: 1, description: 'Items per page' },
            total: { type: 'integer', minimum: 0, description: 'Total number of items' },
            totalPages: { type: 'integer', minimum: 1, description: 'Total number of pages' },
            hasNextPage: { type: 'boolean', description: 'Whether there is a next page' },
            hasPreviousPage: { type: 'boolean', description: 'Whether there is a previous page' },
          },
        },
      },
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints',
      },
      {
        name: 'Products',
        description: 'Product catalog management',
      },
      {
        name: 'Orders',
        description: 'Order management and tracking',
      },
      {
        name: 'Admin',
        description: 'Administrative endpoints (requires ADMIN or MANAGER role)',
      },
      {
        name: 'Health',
        description: 'System health and monitoring',
      },
    ],
  },
  apis: [
    './app/api/**/*.ts', // Include all API route files
    './lib/swagger.ts',   // Include this file for additional schemas
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;