import { Prisma } from '@prisma/client';

// User types
export type User = Prisma.UserGetPayload<{
  include: {
    addresses: true;
    _count: {
      select: {
        orders: true;
        reviews: true;
        wishlist: true;
      };
    };
  };
}>;

// Product types
export type Product = Prisma.ProductGetPayload<{
  include: {
    category: true;
    images: true;
    reviews: {
      select: {
        rating: true;
      };
    };
  };
}>;

export type ProductWithRating = Product & {
  averageRating: number;
  reviewCount: number;
};

// Order types
export type Order = Prisma.OrderGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
      };
    };
    items: {
      include: {
        product: {
          include: {
            images: true;
          };
        };
      };
    };
    shippingAddress: true;
  };
}>;

export type OrderItem = Prisma.OrderItemGetPayload<{
  include: {
    product: {
      include: {
        images: true;
      };
    };
  };
}>;

// Cart types
export type CartItem = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        images: true;
      };
    };
  };
}>;

// Address types
export type Address = Prisma.AddressGetPayload<{}>;

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Dashboard types
export interface DashboardStats {
  overview: {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalProducts: number;
    revenueGrowth: number;
    orderGrowth: number;
  };
  recentOrders: Order[];
  topProducts: (Product & {
    totalSold: number;
    orderCount: number;
  })[];
  lowStockProducts: {
    id: string;
    name: string;
    inventory: number;
    lowStockThreshold: number;
  }[];
  alerts: {
    lowStockCount: number;
    pendingOrders: number;
  };
}

// Form types
export interface ProductFormData {
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  sku?: string;
  price: number;
  comparePrice?: number;
  costPrice?: number;
  categoryId: string;
  inventory: number;
  trackInventory: boolean;
  lowStockThreshold: number;
  weight?: number;
  dimensions?: string;
  metaTitle?: string;
  metaDescription?: string;
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED';
  featured: boolean;
  images: {
    url: string;
    altText?: string;
  }[];
}

export interface AddressFormData {
  type: 'SHIPPING' | 'BILLING';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface UserProfileFormData {
  name?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

// Stripe types
export interface StripeCheckoutSession {
  sessionId: string;
  url: string;
}

export interface CartItemData {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
}

// Filter types
export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  featured?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface OrderFilters {
  page?: number;
  limit?: number;
  status?: string;
  paymentStatus?: string;
  fulfillmentStatus?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}
