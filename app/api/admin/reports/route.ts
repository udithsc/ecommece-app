import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '../../../../lib/prisma';
import { hasPermission } from '@/lib/permissions';

/**
 * @swagger
 * /api/admin/reports:
 *   get:
 *     summary: Get Business Reports (Admin Only)
 *     description: Retrieve comprehensive business analytics and reports
 *     tags: [Admin - Reports]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: range
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 90d, 1y]
 *           default: 30d
 *         description: Date range for the report
 *     responses:
 *       200:
 *         description: Reports retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 overview:
 *                   type: object
 *                   properties:
 *                     totalRevenue:
 *                       type: number
 *                     totalOrders:
 *                       type: integer
 *                     totalCustomers:
 *                       type: integer
 *                     averageOrderValue:
 *                       type: number
 *                     revenueGrowth:
 *                       type: number
 *                     orderGrowth:
 *                       type: number
 *                     customerGrowth:
 *                       type: number
 *                 salesByMonth:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                       revenue:
 *                         type: number
 *                       orders:
 *                         type: integer
 *                 topProducts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       sales:
 *                         type: integer
 *                       revenue:
 *                         type: number
 *                       category:
 *                         type: string
 *                 topCustomers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       totalSpent:
 *                         type: number
 *                       orderCount:
 *                         type: integer
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions (Admin only)
 *       500:
 *         description: Internal server error
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin permissions
    if (!hasPermission(session.user.role, 'reports', 'read')) {
      return NextResponse.json({ error: 'Insufficient permissions. Admin access required.' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const now = new Date();
    const daysMap: { [key: string]: number } = {
      '7d': 7,
      '30d': 30,
      '90d': 90,
      '1y': 365,
    };
    const days = daysMap[range] || 30;
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    const previousPeriodStart = new Date(startDate.getTime() - days * 24 * 60 * 60 * 1000);

    // Get current period data
    const [
      currentOrders,
      previousOrders,
      currentCustomers,
      previousCustomers,
      topProducts,
      topCustomers,
      salesByMonth
    ] = await Promise.all([
      // Current period orders
      prisma.order.findMany({
        where: {
          createdAt: { gte: startDate },
          status: { not: 'CANCELLED' },
        },
        select: {
          id: true,
          total: true,
          createdAt: true,
          items: {
            select: {
              quantity: true,
              price: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      }),

      // Previous period orders
      prisma.order.findMany({
        where: {
          createdAt: { gte: previousPeriodStart, lt: startDate },
          status: { not: 'CANCELLED' },
        },
        select: {
          total: true,
        },
      }),

      // Current period customers
      prisma.user.count({
        where: {
          createdAt: { gte: startDate },
        },
      }),

      // Previous period customers
      prisma.user.count({
        where: {
          createdAt: { gte: previousPeriodStart, lt: startDate },
        },
      }),

      // Top products
      prisma.product.findMany({
        select: {
          id: true,
          name: true,
          category: {
            select: {
              name: true,
            },
          },
          orderItems: {
            where: {
              order: {
                createdAt: { gte: startDate },
                status: { not: 'CANCELLED' },
              },
            },
            select: {
              quantity: true,
              price: true,
            },
          },
        },
        orderBy: {
          orderItems: {
            _count: 'desc',
          },
        },
        take: 10,
      }),

      // Top customers
      prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          orders: {
            where: {
              createdAt: { gte: startDate },
              status: { not: 'CANCELLED' },
            },
            select: {
              total: true,
            },
          },
        },
        orderBy: {
          orders: {
            _count: 'desc',
          },
        },
        take: 10,
      }),

      // Sales by month (last 12 months)
      prisma.$queryRaw<Array<{ month: string; revenue: number; orders: number }>>`
        SELECT 
          TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') as month,
          SUM("total")::float as revenue,
          COUNT(*)::int as orders
        FROM "Order" 
        WHERE "createdAt" >= ${new Date(now.getFullYear() - 1, now.getMonth(), 1)}
          AND "status" != 'CANCELLED'
        GROUP BY DATE_TRUNC('month', "createdAt")
        ORDER BY DATE_TRUNC('month', "createdAt") DESC
        LIMIT 12
      `,
    ]);

    // Calculate overview metrics
    const currentRevenue = currentOrders.reduce((sum, order) => sum + order.total, 0);
    const previousRevenue = previousOrders.reduce((sum, order) => sum + order.total, 0);
    
    const revenueGrowth = previousRevenue > 0 
      ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 
      : 0;
    
    const orderGrowth = previousOrders.length > 0 
      ? ((currentOrders.length - previousOrders.length) / previousOrders.length) * 100 
      : 0;
    
    const customerGrowth = previousCustomers > 0 
      ? ((currentCustomers - previousCustomers) / previousCustomers) * 100 
      : 0;

    const averageOrderValue = currentOrders.length > 0 
      ? currentRevenue / currentOrders.length 
      : 0;

    // Process top products
    const processedTopProducts = topProducts
      .map(product => {
        const sales = product.orderItems.reduce((sum, item) => sum + item.quantity, 0);
        const revenue = product.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        return {
          id: product.id,
          name: product.name,
          sales,
          revenue,
          category: product.category?.name || 'Uncategorized',
        };
      })
      .filter(product => product.sales > 0)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Process top customers
    const processedTopCustomers = topCustomers
      .map(customer => {
        const totalSpent = customer.orders.reduce((sum, order) => sum + order.total, 0);
        return {
          id: customer.id,
          name: customer.name || 'Unknown',
          email: customer.email,
          totalSpent,
          orderCount: customer.orders.length,
        };
      })
      .filter(customer => customer.totalSpent > 0)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 5);

    // Recent activity (last 10 activities)
    const recentActivity = [
      ...currentOrders.slice(0, 5).map(order => ({
        date: order.createdAt.toISOString().split('T')[0],
        type: 'Order',
        description: `New order #${order.id.slice(-8)}`,
        amount: order.total,
      })),
      // Add more activity types as needed
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const overview = {
      totalRevenue: currentRevenue,
      totalOrders: currentOrders.length,
      totalCustomers: await prisma.user.count(),
      averageOrderValue,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      orderGrowth: Math.round(orderGrowth * 10) / 10,
      customerGrowth: Math.round(customerGrowth * 10) / 10,
    };

    return NextResponse.json({
      overview,
      salesByMonth: salesByMonth.reverse(),
      topProducts: processedTopProducts,
      topCustomers: processedTopCustomers,
      recentActivity,
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}