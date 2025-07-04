#!/usr/bin/env ts-node

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedProducts() {
  console.log('🌱 Starting product seed...');

  // First, let's check if categories exist
  const categories = await prisma.category.findMany();
  console.log(`Found ${categories.length} categories`);

  if (categories.length === 0) {
    console.log('⚠️  No categories found. Running full seed first...');
    await prisma.$disconnect();
    process.exit(1);
  }

  // Map categories by slug for easier reference
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.slug] = category;
    return acc;
  }, {} as Record<string, any>);

  // Update existing products with new image paths
  const products = await prisma.product.findMany({
    include: {
      images: true
    }
  });

  console.log(`Found ${products.length} existing products`);

  // Update each product's images
  for (const product of products) {
    const slug = product.slug;
    let newImages: any[] = [];

    switch (slug) {
      case 'gaming-laptop-x1':
        newImages = [
          { url: '/api/admin/upload/gaming-laptop-x1/main.webp', altText: 'Gaming Laptop X1 - Front View', sortOrder: 0 },
          { url: '/api/admin/upload/gaming-laptop-x1/side.webp', altText: 'Gaming Laptop X1 - Side View', sortOrder: 1 },
          { url: '/api/admin/upload/gaming-laptop-x1/detail1.webp', altText: 'Gaming Laptop X1 - Detail 1', sortOrder: 2 },
          { url: '/api/admin/upload/gaming-laptop-x1/detail2.webp', altText: 'Gaming Laptop X1 - Detail 2', sortOrder: 3 },
        ];
        break;
      case 'smartphone-pro-max':
        newImages = [
          { url: '/api/admin/upload/smartphone-pro-max/main.webp', altText: 'Smartphone Pro Max - Front', sortOrder: 0 },
          { url: '/api/admin/upload/smartphone-pro-max/side.webp', altText: 'Smartphone Pro Max - Side', sortOrder: 1 },
          { url: '/api/admin/upload/smartphone-pro-max/detail.webp', altText: 'Smartphone Pro Max - Detail', sortOrder: 2 },
        ];
        break;
      case 'wireless-earbuds-pro':
        newImages = [
          { url: '/api/admin/upload/wireless-earbuds-pro/main.webp', altText: 'Wireless Earbuds Pro', sortOrder: 0 },
          { url: '/api/admin/upload/wireless-earbuds-pro/detail.webp', altText: 'Wireless Earbuds Pro - Detail', sortOrder: 1 },
          { url: '/api/admin/upload/wireless-earbuds-pro/case.webp', altText: 'Wireless Earbuds Pro - Case', sortOrder: 2 },
        ];
        break;
      case 'mechanical-keyboard-rgb':
        newImages = [
          { url: '/api/admin/upload/mechanical-keyboard-rgb/main.webp', altText: 'Mechanical Keyboard RGB', sortOrder: 0 },
          { url: '/api/admin/upload/mechanical-keyboard-rgb/detail.webp', altText: 'Mechanical Keyboard RGB - Detail', sortOrder: 1 },
        ];
        break;
      case 'smartwatch-series-8':
        newImages = [
          { url: '/api/admin/upload/smartwatch-series-8/main.webp', altText: 'Smartwatch Series 8', sortOrder: 0 },
          { url: '/api/admin/upload/smartwatch-series-8/detail.webp', altText: 'Smartwatch Series 8 - Detail', sortOrder: 1 },
        ];
        break;
      case 'external-ssd-1tb':
        newImages = [
          { url: '/api/admin/upload/external-ssd-1tb/main.webp', altText: 'External SSD 1TB', sortOrder: 0 },
          { url: '/api/admin/upload/external-ssd-1tb/detail.webp', altText: 'External SSD 1TB - Detail', sortOrder: 1 },
        ];
        break;
      default:
        continue;
    }

    // Delete existing images
    await prisma.productImage.deleteMany({
      where: { productId: product.id }
    });

    // Create new images
    await prisma.productImage.createMany({
      data: newImages.map(image => ({
        ...image,
        productId: product.id
      }))
    });

    console.log(`✅ Updated images for ${product.name}`);
  }

  console.log('🎉 Product seed completed successfully!');
}

seedProducts()
  .catch((e) => {
    console.error('❌ Product seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });