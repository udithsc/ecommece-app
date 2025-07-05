import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get Products (Public)
 *     description: Retrieve paginated list of active products for public viewing
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 50
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category slug
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for product name or description
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *         description: Filter for featured products only
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt]
 *           default: createdAt
 *         description: Sort products by field
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     allOf:
 *                       - $ref: '#/components/schemas/Product'
 *                       - type: object
 *                         properties:
 *                           password:
 *                             not: {}
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *             example:
 *               products:
 *                 - id: "cm123456789"
 *                   name: "Gaming Laptop X1"
 *                   slug: "gaming-laptop-x1"
 *                   price: "2499.99"
 *                   shortDescription: "High-performance gaming laptop"
 *                   inventory: 25
 *                   featured: true
 *                   category:
 *                     name: "Laptops"
 *                     slug: "laptops"
 *                   images:
 *                     - url: "/api/admin/upload/gaming-laptop-x1/main.webp"
 *                       altText: "Gaming Laptop Front View"
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 6
 *                 totalPages: 1
 *                 hasNextPage: false
 *                 hasPreviousPage: false
 *       400:
 *         description: Invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Input validation and sanitization
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');
    const page = Math.max(1, Math.min(parseInt(pageParam || '1') || 1, 1000)); // Cap at 1000 pages
    const limit = Math.max(1, Math.min(parseInt(limitParam || '10') || 10, 100)); // Cap at 100 items per page
    
    const category = searchParams.get('category')?.slice(0, 100) || null; // Limit length
    const search = searchParams.get('search')?.slice(0, 100) || null; // Limit search length
    const featured = searchParams.get('featured');
    
    // Whitelist allowed sort fields to prevent injection
    const allowedSortFields = ['name', 'price', 'createdAt', 'updatedAt'];
    const sortBy = allowedSortFields.includes(searchParams.get('sortBy') || '') 
      ? searchParams.get('sortBy')! 
      : 'createdAt';
    
    // Validate sort order
    const sortOrder = ['asc', 'desc'].includes(searchParams.get('sortOrder') || '') 
      ? searchParams.get('sortOrder')! as 'asc' | 'desc'
      : 'desc';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      status: 'ACTIVE',
    };

    if (category) {
      where.category = {
        slug: category,
      };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { shortDescription: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (featured === 'true') {
      where.featured = true;
    }

    // Get products with pagination
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
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
          [sortBy]: sortOrder as 'asc' | 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Calculate average ratings
    const productsWithRatings = products.map((product) => {
      const ratings = product.reviews.map((review) => review.rating);
      const averageRating =
        ratings.length > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length : 0;

      return {
        ...product,
        averageRating: Math.round(averageRating * 10) / 10,
        reviewCount: ratings.length,
        reviews: undefined, // Remove reviews from response
      };
    });

    return NextResponse.json({
      products: productsWithRatings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
