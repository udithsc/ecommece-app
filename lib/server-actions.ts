import { prisma } from './prisma';
import type { Product } from '../stores/cartStore';

// Server-side data fetching functions
export async function getProductsServer(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average ratings and transform to match Product interface
    return products.map((product) => {
      const ratings = product.reviews.map((review) => review.rating);
      const averageRating =
        ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;

      return {
        _id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.price.toString()),
        originalPrice: product.comparePrice ? parseFloat(product.comparePrice.toString()) : undefined,
        image: product.images.map((img: any) => img.url),
        details: product.description,
        featured: product.featured,
        category: product.category.name,
        rating: Math.round(averageRating * 10) / 10,
        reviews: ratings.length,
        inStock: product.inventory > 0,
        badges: product.comparePrice ? ['SALE'] : [],
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductServer(slug: string): Promise<Product | undefined> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug,
        status: 'ACTIVE',
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    });

    if (!product) {
      return undefined;
    }

    // Calculate average rating
    const ratings = product.reviews.map((review) => review.rating);
    const averageRating =
      ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;
    
    // Transform to match Product interface
    return {
      _id: product.id,
      name: product.name,
      slug: product.slug,
      price: parseFloat(product.price.toString()),
      originalPrice: product.comparePrice ? parseFloat(product.comparePrice.toString()) : undefined,
      image: product.images.map((img: any) => img.url),
      details: product.description,
      featured: product.featured,
      category: product.category.name,
      rating: Math.round(averageRating * 10) / 10,
      reviews: ratings.length,
      inStock: product.inventory > 0,
      badges: product.comparePrice ? ['SALE'] : [],
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}

export async function getFeaturedProductsServer(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        featured: true,
      },
      include: {
        category: true,
        images: {
          orderBy: { sortOrder: 'asc' },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Calculate average ratings and transform to match Product interface
    return products.map((product) => {
      const ratings = product.reviews.map((review) => review.rating);
      const averageRating =
        ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;

      return {
        _id: product.id,
        name: product.name,
        slug: product.slug,
        price: parseFloat(product.price.toString()),
        originalPrice: product.comparePrice ? parseFloat(product.comparePrice.toString()) : undefined,
        image: product.images.map((img: any) => img.url),
        details: product.description,
        featured: product.featured,
        category: product.category.name,
        rating: Math.round(averageRating * 10) / 10,
        reviews: ratings.length,
        inStock: product.inventory > 0,
        badges: product.comparePrice ? ['SALE'] : [],
      };
    });
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}