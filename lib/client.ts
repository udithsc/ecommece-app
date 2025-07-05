// Import the Product type from store for consistency
import type { Product } from '../stores/cartStore';

// Banner interface
interface Banner {
  _id: string;
  title: string;
  subtitle: string;
  smallText: string;
  midText: string;
  largeText1: string;
  desc: string;
  buttonText: string;
  image: string;
  link: string;
  product: string;
  discount: string;
  largeText2: string;
  saleTime: string;
}

// API data store functions (for client-side use)
export const getProducts = async (): Promise<Product[]> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    
    // Transform API response to match Product interface
    return data.products.map((product: any) => ({
      _id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      originalPrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
      image: product.images.map((img: any) => img.url),
      details: product.description,
      featured: product.featured,
      category: product.category.name,
      rating: product.averageRating || 0,
      reviews: product.reviewCount || 0,
      inStock: product.inventory > 0,
      badges: product.comparePrice ? ['SALE'] : [],
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProduct = async (slug: string): Promise<Product | undefined> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/products/${slug}`);
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error('Failed to fetch product');
    }
    const product = await response.json();
    
    // Transform API response to match Product interface
    return {
      _id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      originalPrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
      image: product.images.map((img: any) => img.url),
      details: product.description,
      featured: product.featured,
      category: product.category.name,
      rating: product.averageRating || 0,
      reviews: product.reviewCount || 0,
      inStock: product.inventory > 0,
      badges: product.comparePrice ? ['SALE'] : [],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : process.env.NEXTAUTH_URL || 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/api/products?featured=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }
    const data = await response.json();
    
    // Transform API response to match Product interface
    return data.products.map((product: any) => ({
      _id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price),
      originalPrice: product.comparePrice ? parseFloat(product.comparePrice) : undefined,
      image: product.images.map((img: any) => img.url),
      details: product.description,
      featured: product.featured,
      category: product.category.name,
      rating: product.averageRating || 0,
      reviews: product.reviewCount || 0,
      inStock: product.inventory > 0,
      badges: product.comparePrice ? ['SALE'] : [],
    }));
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
};

export const getBanners = async (): Promise<Banner[]> => {
  // TODO: Replace with actual banner API when available
  // For now, return mock data until banner API is implemented
  return mockBanners;
};

// Mock banner data (temporary until banner API is implemented)
const mockBanners: Banner[] = [
  {
    _id: 'banner1',
    title: 'Latest Tech Gadgets',
    subtitle: 'Laptops, Smartphones, Wearables, and more!',
    smallText: 'New Arrivals',
    midText: 'Explore Our Collection',
    largeText1: 'ELECTRONICS',
    desc: 'Discover the best in computers and mobile technology.',
    buttonText: 'Shop Tech',
    image: '/api/admin/upload/banners/hero-banner.webp',
    link: '/shop',
    product: 'gaming-laptop-x1',
    discount: 'Up to 50% OFF',
    largeText2: 'GADGETS',
    saleTime: 'Limited Time Offer',
  },
];


// Export types for use elsewhere
export type { Banner };