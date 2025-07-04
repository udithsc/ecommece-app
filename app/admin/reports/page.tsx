'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/src/components/ui/card';
import { Button } from '@/src/components/ui/button';
import { Badge } from '@/src/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/src/components/ui/table';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';

interface ReportData {
  overview: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    averageOrderValue: number;
    revenueGrowth: number;
    orderGrowth: number;
    customerGrowth: number;
  };
  salesByMonth: {
    month: string;
    revenue: number;
    orders: number;
  }[];
  topProducts: {
    id: string;
    name: string;
    sales: number;
    revenue: number;
    category: string;
  }[];
  topCustomers: {
    id: string;
    name: string;
    email: string;
    totalSpent: number;
    orderCount: number;
  }[];
  recentActivity: {
    date: string;
    type: string;
    description: string;
    amount?: number;
  }[];
}

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30d');
  const { data: session } = useSession();

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/reports?range=${dateRange}`);
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'ADMIN') {
      fetchReports();
    }
  }, [session, dateRange]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    const formatted = Math.abs(value).toFixed(1);
    return `${value >= 0 ? '+' : '-'}${formatted}%`;
  };

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  if (session?.user?.role !== 'ADMIN') {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Access Restricted</h3>
          <p className="text-muted-foreground">
            Reports are only available to administrators.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid gap-4 md:grid-cols-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 border rounded-md text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm" onClick={fetchReports}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      {reportData && (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(reportData.overview.totalRevenue)}
                </div>
                <div className={`flex items-center text-xs ${getGrowthColor(reportData.overview.revenueGrowth)}`}>
                  {getGrowthIcon(reportData.overview.revenueGrowth)}
                  <span className="ml-1">{formatPercentage(reportData.overview.revenueGrowth)} from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.overview.totalOrders.toLocaleString()}</div>
                <div className={`flex items-center text-xs ${getGrowthColor(reportData.overview.orderGrowth)}`}>
                  {getGrowthIcon(reportData.overview.orderGrowth)}
                  <span className="ml-1">{formatPercentage(reportData.overview.orderGrowth)} from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.overview.totalCustomers.toLocaleString()}</div>
                <div className={`flex items-center text-xs ${getGrowthColor(reportData.overview.customerGrowth)}`}>
                  {getGrowthIcon(reportData.overview.customerGrowth)}
                  <span className="ml-1">{formatPercentage(reportData.overview.customerGrowth)} from last period</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(reportData.overview.averageOrderValue)}
                </div>
                <p className="text-xs text-muted-foreground">
                  Average value per order
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Tables */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Products</CardTitle>
                <CardDescription>Best performing products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Sales</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.topProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">{product.category}</div>
                          </div>
                        </TableCell>
                        <TableCell>{product.sales}</TableCell>
                        <TableCell>{formatCurrency(product.revenue)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Customers */}
            <Card>
              <CardHeader>
                <CardTitle>Top Customers</CardTitle>
                <CardDescription>Highest value customers</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Total Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.topCustomers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.orderCount}</TableCell>
                        <TableCell>{formatCurrency(customer.totalSpent)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sales by Month */}
          <Card>
            <CardHeader>
              <CardTitle>Sales by Month</CardTitle>
              <CardDescription>Monthly revenue and order trends</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Month</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Order Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.salesByMonth.map((month) => (
                    <TableRow key={month.month}>
                      <TableCell className="font-medium">{month.month}</TableCell>
                      <TableCell>{month.orders}</TableCell>
                      <TableCell>{formatCurrency(month.revenue)}</TableCell>
                      <TableCell>
                        {formatCurrency(month.orders > 0 ? month.revenue / month.orders : 0)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest business activities and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.description}
                        </p>
                        {activity.amount && (
                          <p className="text-sm text-green-600">
                            {formatCurrency(activity.amount)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{activity.type}</Badge>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}