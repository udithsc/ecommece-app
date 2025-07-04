'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Badge } from '@/src/components/ui/badge';
import { Button } from '@/src/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  DollarSign,
  Users,
  BarChart3,
  AlertTriangle,
} from 'lucide-react';
import { hasPermission, Role } from '@/lib/permissions';

interface DashboardStats {
  overview: {
    totalOrders: number;
    totalRevenue: number;
    totalCustomers: number;
    totalProducts: number;
    revenueGrowth: number;
    orderGrowth: number;
  };
  recentOrders: any[];
  topProducts: any[];
  lowStockProducts: any[];
  alerts: {
    lowStockCount: number;
    pendingOrders: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else if (response.status === 403) {
        // Handle permission denied
        console.warn('Permission denied for dashboard stats');
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Access Limited
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              {session?.user?.role === 'MANAGER'
                ? 'Welcome! You have access to product and order management. Full analytics are available to administrators.'
                : 'You have limited access to this dashboard. Contact an administrator for more permissions.'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!stats) {
    return <div>Error loading dashboard data</div>;
  }

  // Filter stats based on user role
  const canViewReports = session?.user?.role === 'ADMIN';
  const canViewFullAnalytics = hasPermission(session?.user?.role || 'USER', 'analytics', 'read');

  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.overview.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: canViewFullAnalytics ? stats.overview.revenueGrowth : undefined,
      changeLabel: '7-day change',
      adminOnly: false,
    },
    {
      title: 'Orders',
      value: stats.overview.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      change: canViewFullAnalytics ? stats.overview.orderGrowth : undefined,
      changeLabel: '7-day change',
      adminOnly: false,
    },
    {
      title: 'Customers',
      value: stats.overview.totalCustomers.toLocaleString(),
      icon: Users,
      adminOnly: canViewReports ? false : true, // Only admins can see customer data
    },
    {
      title: 'Products',
      value: stats.overview.totalProducts.toLocaleString(),
      icon: BarChart3,
      adminOnly: false,
    },
  ].filter((stat) => !stat.adminOnly || canViewReports);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button onClick={fetchDashboardStats}>Refresh</Button>
      </div>

      {/* Alerts */}
      {(stats.alerts.lowStockCount > 0 || stats.alerts.pendingOrders > 0) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention Required</h3>
              <div className="mt-2 text-sm text-yellow-700 space-y-1">
                {stats.alerts.lowStockCount > 0 && (
                  <p>• {stats.alerts.lowStockCount} products are low in stock</p>
                )}
                {stats.alerts.pendingOrders > 0 && (
                  <p>• {stats.alerts.pendingOrders} orders are pending</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change !== undefined && (
                <div className="flex items-center text-xs text-muted-foreground">
                  {stat.change > 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  )}
                  <span className={stat.change > 0 ? 'text-green-500' : 'text-red-500'}>
                    {Math.abs(stat.change).toFixed(1)}%
                  </span>
                  <span className="ml-1">{stat.changeLabel}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">#{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.user?.name || order.email} • {order._count.items} items
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${order.total}</p>
                    <Badge
                      variant={
                        order.status === 'CONFIRMED'
                          ? 'default'
                          : order.status === 'PENDING'
                            ? 'secondary'
                            : order.status === 'SHIPPED'
                              ? 'outline'
                              : 'destructive'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {product.images?.[0] && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                      </>
                    )}
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.totalSold} sold</p>
                    <p className="text-xs text-muted-foreground">{product.orderCount} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Alert */}
      {stats.lowStockProducts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>Products that need restocking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Threshold: {product.lowStockThreshold}
                    </p>
                  </div>
                  <Badge variant="destructive">{product.inventory} left</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
