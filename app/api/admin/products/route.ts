import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { withPermission } from '@/lib/auth';

/**
 * @swagger
 * /api/admin/products:
 *   get:
 *     summary: Get Products (Admin)
 *     description: Retrieve paginated list of products with search and filter options (requires MANAGER or ADMIN role)
 *     tags: [Admin, Products]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
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
 *           maximum: 100
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for product name or description
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [ACTIVE, DRAFT, ARCHIVED]
 *         description: Filter by product status
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category ID
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
 *                     $ref: '#/components/schemas/Product'
 *                 pagination:
 *                   $ref: '#/components/schemas/PaginationMeta'
 *             example:
 *               products:
 *                 - id: "cm123456789"
 *                   name: "Gaming Laptop X1"
 *                   slug: "gaming-laptop-x1"
 *                   price: "2499.99"
 *                   status: "ACTIVE"
 *                   inventory: 25
 *                   featured: true
 *               pagination:
 *                 page: 1
 *                 limit: 10
 *                 total: 6
 *                 totalPages: 1
 *                 hasNextPage: false
 *                 hasPreviousPage: false
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Insufficient permissions (requires MANAGER or ADMIN)
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create Product (Admin)
 *     description: Create a new product (requires MANAGER or ADMIN role)
 *     tags: [Admin, Products]
 *     security:
 *       - BearerAuth: []
 *       - CookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, slug, price, categoryId]
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 description: Product name
 *               slug:
 *                 type: string
 *                 pattern: '^[a-z0-9-]+$'
 *                 description: URL-friendly identifier
 *               description:
 *                 type: string
 *                 description: Product description
 *               shortDescription:
 *                 type: string
 *                 description: Brief product description
 *               sku:
 *                 type: string
 *                 description: Stock keeping unit
 *               price:
 *                 type: string
 *                 pattern: '^\d+(\.\d{1,2})?$'
 *                 description: Product price
 *               comparePrice:
 *                 type: string
 *                 pattern: '^\d+(\.\d{1,2})?$'
 *                 description: Compare at price
 *               categoryId:
 *                 type: string
 *                 description: Category ID
 *               inventory:
 *                 type: integer
 *                 minimum: 0
 *                 description: Stock quantity
 *               featured:
 *                 type: boolean
 *                 description: Whether product is featured
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, DRAFT, ARCHIVED]
 *                 default: DRAFT
 *           example:
 *             name: "Gaming Laptop Pro"
 *             slug: "gaming-laptop-pro"
 *             description: "High-performance gaming laptop with RTX 4080"
 *             shortDescription: "Gaming laptop with RTX 4080"
 *             price: "2999.99"
 *             categoryId: "cm123456789"
 *             inventory: 50
 *             featured: true
 *             status: "ACTIVE"
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Insufficient permissions
 *       409:
 *         description: Product slug already exists
 *       500:
 *         description: Internal server error
 */
async function handleGET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (status) {
      where.status = status;
    }

    if (category) {
      where.categoryId = category;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1,
          },
          _count: {
            select: {
              reviews: true,
              orderItems: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
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

async function handlePOST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      slug,
      description,
      shortDescription,
      sku,
      price,
      comparePrice,
      costPrice,
      categoryId,
      inventory,
      trackInventory,
      lowStockThreshold,
      weight,
      dimensions,
      metaTitle,
      metaDescription,
      status,
      featured,
      images,
    } = body;

    // Check if slug is unique
    const existingProduct = await prisma.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        sku,
        price,
        comparePrice,
        costPrice,
        categoryId,
        inventory: inventory || 0,
        trackInventory: trackInventory ?? true,
        lowStockThreshold: lowStockThreshold || 5,
        weight,
        dimensions,
        metaTitle,
        metaDescription,
        status: status || 'DRAFT',
        featured: featured || false,
        publishedAt: status === 'ACTIVE' ? new Date() : null,
        images: images
          ? {
              create: images.map((image: any, index: number) => ({
                url: image.url,
                altText: image.altText,
                sortOrder: index,
              })),
            }
          : undefined,
      },
      include: {
        category: true,
        images: true,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export const GET = withPermission('products', 'read')(handleGET);
export const POST = withPermission('products', 'create')(handlePOST);
