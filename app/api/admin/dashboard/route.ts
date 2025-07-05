import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { withPermission } from '@/lib/auth';

async function handleGET() {
  try {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Get overview stats
    const [
      totalOrders,
      totalRevenue,
      totalCustomers,
      totalProducts,
      recentOrders,
      topProducts,
      lowStockProducts,
      revenueStats,
    ] = await Promise.all([
      // Total orders
      prisma.order.count(),

      // Total revenue
      prisma.order.aggregate({
        _sum: { total: true },
        where: { paymentStatus: 'PAID' },
      }),

      // Total customers
      prisma.user.count({
        where: { role: 'USER' },
      }),

      // Total products
      prisma.product.count(),

      // Recent orders
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: { name: true, email: true },
          },
          _count: { select: { items: true } },
        },
      }),

      // Top selling products
      prisma.orderItem.groupBy({
        by: ['productId'],
        _sum: { quantity: true },
        _count: { productId: true },
        orderBy: { _sum: { quantity: 'desc' } },
        take: 5,
      }),

      // Low stock products
      prisma.product.findMany({
        where: {
          trackInventory: true,
          inventory: { lte: prisma.product.fields.lowStockThreshold },
        },
        select: {
          id: true,
          name: true,
          inventory: true,
          lowStockThreshold: true,
        },
        take: 10,
      }),

      // Revenue over time (last 30 days)
      prisma.order.groupBy({
        by: ['createdAt'],
        where: {
          paymentStatus: 'PAID',
          createdAt: { gte: thirtyDaysAgo },
        },
        _sum: { total: true },
        _count: true,
      }),
    ]);

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            price: true,
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' },
            },
          },
        });
        return {
          ...product,
          totalSold: item._sum.quantity,
          orderCount: item._count.productId,
        };
      })
    );

    // Calculate period comparisons
    const [currentPeriodStats, previousPeriodStats] = await Promise.all([
      prisma.order.aggregate({
        _sum: { total: true },
        _count: true,
        where: {
          paymentStatus: 'PAID',
          createdAt: { gte: sevenDaysAgo },
        },
      }),
      prisma.order.aggregate({
        _sum: { total: true },
        _count: true,
        where: {
          paymentStatus: 'PAID',
          createdAt: {
            gte: new Date(sevenDaysAgo.getTime() - 7 * 24 * 60 * 60 * 1000),
            lt: sevenDaysAgo,
          },
        },
      }),
    ]);

    const revenueGrowth = previousPeriodStats._sum.total
      ? ((Number(currentPeriodStats._sum.total || 0) - Number(previousPeriodStats._sum.total)) /
          Number(previousPeriodStats._sum.total)) *
        100
      : 0;

    const orderGrowth = previousPeriodStats._count
      ? ((currentPeriodStats._count - previousPeriodStats._count) / previousPeriodStats._count) *
        100
      : 0;

    return NextResponse.json({
      overview: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalCustomers,
        totalProducts,
        revenueGrowth: Math.round(revenueGrowth * 100) / 100,
        orderGrowth: Math.round(orderGrowth * 100) / 100,
      },
      recentOrders,
      topProducts: topProductsWithDetails,
      lowStockProducts,
      alerts: {
        lowStockCount: lowStockProducts.length,
        pendingOrders: await prisma.order.count({
          where: { status: 'PENDING' },
        }),
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}

export const GET = withPermission('dashboard', 'read')(handleGET);
