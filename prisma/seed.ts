import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'laptops' },
      update: {},
      create: {
        name: 'Laptops',
        slug: 'laptops',
        description: 'High-performance laptops for work and gaming',
        sortOrder: 1,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'smartphones' },
      update: {},
      create: {
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Latest smartphones with cutting-edge technology',
        sortOrder: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'audio' },
      update: {},
      create: {
        name: 'Audio',
        slug: 'audio',
        description: 'Premium headphones, earbuds, and speakers',
        sortOrder: 3,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'accessories' },
      update: {},
      create: {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Tech accessories and peripherals',
        sortOrder: 4,
      },
    }),
    prisma.category.upsert({
      where: { slug: 'wearables' },
      update: {},
      create: {
        name: 'Wearables',
        slug: 'wearables',
        description: 'Smartwatches and fitness trackers',
        sortOrder: 5,
      },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Create admin user
  const hashedAdminPassword = await bcrypt.hash('admin123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@udthz.com' },
    update: {},
    create: {
      email: 'admin@udthz.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Create shop manager user
  const hashedManagerPassword = await bcrypt.hash('manager123', 12);
  const managerUser = await prisma.user.upsert({
    where: { email: 'manager@udthz.com' },
    update: {},
    create: {
      email: 'manager@udthz.com',
      name: 'Manager',
      password: hashedManagerPassword,
      role: 'MANAGER',
      emailVerified: new Date(),
    },
  });

  console.log('✅ Created admin and manager users');

  // Create sample products
  const products = [
    {
      name: 'Gaming Laptop X1',
      slug: 'gaming-laptop-x1',
      description:
        'High-performance gaming laptop with RTX 4080 and Intel i9 processor. Perfect for gaming and content creation.',
      shortDescription: 'High-performance gaming laptop with RTX 4080',
      sku: 'LAPTOP-X1-001',
      price: 2499.99,
      comparePrice: 2999.99,
      costPrice: 1800.0,
      categoryId: categories[0].id, // Laptops
      inventory: 25,
      weight: 2.5,
      status: 'ACTIVE' as const,
      featured: true,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/gaming-laptop-x1/main.webp', altText: 'Gaming Laptop X1 - Front View', sortOrder: 0 },
        { url: '/api/admin/upload/gaming-laptop-x1/side.webp', altText: 'Gaming Laptop X1 - Side View', sortOrder: 1 },
        { url: '/api/admin/upload/gaming-laptop-x1/detail1.webp', altText: 'Gaming Laptop X1 - Detail 1', sortOrder: 2 },
        { url: '/api/admin/upload/gaming-laptop-x1/detail2.webp', altText: 'Gaming Laptop X1 - Detail 2', sortOrder: 3 },
      ],
    },
    {
      name: 'Smartphone Pro Max',
      slug: 'smartphone-pro-max',
      description: 'Latest flagship smartphone with advanced camera system and 5G connectivity.',
      shortDescription: 'Flagship smartphone with advanced camera',
      sku: 'PHONE-PM-001',
      price: 1299.99,
      comparePrice: 1399.99,
      costPrice: 900.0,
      categoryId: categories[1].id, // Smartphones
      inventory: 50,
      weight: 0.2,
      status: 'ACTIVE' as const,
      featured: true,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/smartphone-pro-max/main.webp', altText: 'Smartphone Pro Max - Front', sortOrder: 0 },
        { url: '/api/admin/upload/smartphone-pro-max/side.webp', altText: 'Smartphone Pro Max - Side', sortOrder: 1 },
        { url: '/api/admin/upload/smartphone-pro-max/detail.webp', altText: 'Smartphone Pro Max - Detail', sortOrder: 2 },
      ],
    },
    {
      name: 'Wireless Earbuds Pro',
      slug: 'wireless-earbuds-pro',
      description:
        'Premium wireless earbuds with active noise cancellation and 30-hour battery life.',
      shortDescription: 'Premium wireless earbuds with ANC',
      sku: 'AUDIO-WE-001',
      price: 249.99,
      comparePrice: 299.99,
      costPrice: 150.0,
      categoryId: categories[2].id, // Audio
      inventory: 100,
      weight: 0.05,
      status: 'ACTIVE' as const,
      featured: true,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/wireless-earbuds-pro/main.webp', altText: 'Wireless Earbuds Pro', sortOrder: 0 },
        { url: '/api/admin/upload/wireless-earbuds-pro/detail.webp', altText: 'Wireless Earbuds Pro - Detail', sortOrder: 1 },
        { url: '/api/admin/upload/wireless-earbuds-pro/case.webp', altText: 'Wireless Earbuds Pro - Case', sortOrder: 2 },
      ],
    },
    {
      name: 'Mechanical Keyboard RGB',
      slug: 'mechanical-keyboard-rgb',
      description: 'Professional mechanical keyboard with RGB backlighting and Cherry MX switches.',
      shortDescription: 'Professional mechanical keyboard with RGB',
      sku: 'ACC-KB-001',
      price: 159.99,
      comparePrice: 199.99,
      costPrice: 80.0,
      categoryId: categories[3].id, // Accessories
      inventory: 75,
      weight: 1.2,
      status: 'ACTIVE' as const,
      featured: false,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/mechanical-keyboard-rgb/main.webp', altText: 'Mechanical Keyboard RGB', sortOrder: 0 },
        { url: '/api/admin/upload/mechanical-keyboard-rgb/detail.webp', altText: 'Mechanical Keyboard RGB - Detail', sortOrder: 1 },
      ],
    },
    {
      name: 'Smartwatch Series 8',
      slug: 'smartwatch-series-8',
      description: 'Advanced smartwatch with health monitoring, GPS, and 7-day battery life.',
      shortDescription: 'Advanced smartwatch with health monitoring',
      sku: 'WEAR-SW-001',
      price: 399.99,
      comparePrice: 449.99,
      costPrice: 250.0,
      categoryId: categories[4].id, // Wearables
      inventory: 40,
      weight: 0.05,
      status: 'ACTIVE' as const,
      featured: true,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/smartwatch-series-8/main.webp', altText: 'Smartwatch Series 8', sortOrder: 0 },
        { url: '/api/admin/upload/smartwatch-series-8/detail.webp', altText: 'Smartwatch Series 8 - Detail', sortOrder: 1 },
      ],
    },
    {
      name: 'External SSD 1TB',
      slug: 'external-ssd-1tb',
      description: 'High-speed external SSD with USB-C connectivity and 1TB storage capacity.',
      shortDescription: 'High-speed external SSD with USB-C',
      sku: 'ACC-SSD-001',
      price: 129.99,
      comparePrice: 159.99,
      costPrice: 70.0,
      categoryId: categories[3].id, // Accessories
      inventory: 60,
      weight: 0.1,
      status: 'ACTIVE' as const,
      featured: false,
      publishedAt: new Date(),
      images: [
        { url: '/api/admin/upload/external-ssd-1tb/main.webp', altText: 'External SSD 1TB', sortOrder: 0 },
        { url: '/api/admin/upload/external-ssd-1tb/detail.webp', altText: 'External SSD 1TB - Detail', sortOrder: 1 },
      ],
    },
  ];

  for (const productData of products) {
    const { images, ...product } = productData;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
        images: {
          create: images,
        },
      },
    });
  }

  console.log(`✅ Created ${products.length} products`);

  // Create sample reviews
  const sampleUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Sample User',
      emailVerified: new Date(),
    },
  });

  const allProducts = await prisma.product.findMany();

  for (const product of allProducts.slice(0, 3)) {
    await prisma.review.upsert({
      where: {
        userId_productId: {
          userId: sampleUser.id,
          productId: product.id,
        },
      },
      update: {},
      create: {
        userId: sampleUser.id,
        productId: product.id,
        rating: 5,
        title: 'Great product!',
        comment: 'Really happy with this purchase. Excellent quality and fast shipping.',
        isVerified: true,
      },
    });
  }

  console.log('✅ Created sample reviews');

  console.log('🎉 Database seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
