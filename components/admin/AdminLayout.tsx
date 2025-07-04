'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/src/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar';
import { Badge } from '@/src/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/src/components/ui/dropdown-menu';
import {
  Home,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  Menu,
  X,
  FileBarChart,
  UserCheck,
} from 'lucide-react';
import { getAccessibleNavItems } from '@/lib/permissions';
import { Role } from '@/lib/permissions';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const allNavigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: Home,
    requiredPermission: { resource: 'dashboard', action: 'read' },
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: ShoppingBag,
    requiredPermission: { resource: 'products', action: 'read' },
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: BarChart3,
    requiredPermission: { resource: 'orders', action: 'read' },
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    requiredPermission: { resource: 'customers', action: 'read' },
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: FileBarChart,
    requiredPermission: { resource: 'reports', action: 'read' },
    adminOnly: true,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: UserCheck,
    requiredPermission: { resource: 'users', action: 'read' },
    adminOnly: true,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    requiredPermission: { resource: 'settings', action: 'read' },
    adminOnly: true,
  },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState(allNavigation);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Still loading
    
    if (!session) {
      router.push('/auth/login');
      return;
    }

    // Filter navigation based on user role
    if (session.user.role) {
      const accessibleNavItems = getAccessibleNavItems(session.user.role as Role);
      setNavigation(
        accessibleNavItems.map((item) => ({
          ...item,
          icon: getIconComponent(item.name),
        }))
      );
    }
  }, [session, status, router]);

  const getIconComponent = (name: string) => {
    const iconMap: Record<string, any> = {
      Dashboard: Home,
      Products: ShoppingBag,
      Orders: BarChart3,
      Customers: Users,
      Reports: FileBarChart,
      Users: UserCheck,
      Settings: Settings,
    };
    return iconMap[name] || Home;
  };

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: '/auth/login' });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800';
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800';
      case 'USER':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn('fixed inset-0 z-40 lg:hidden', sidebarOpen ? 'block' : 'hidden')}>
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="ml-1 flex h-10 w-10 items-center justify-center"
            >
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <div className="flex flex-shrink-0 items-center px-4">
            <h2 className="text-lg font-semibold text-gray-900">UDT Store Admin</h2>
          </div>
          <div className="mt-5 h-0 flex-1 overflow-y-auto">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="mr-4 h-6 w-6 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-grow flex-col overflow-y-auto bg-white pt-5 pb-4 border-r border-gray-200">
          <div className="flex flex-shrink-0 items-center px-4">
            <h2 className="text-lg font-semibold text-gray-900">UDT Store Admin</h2>
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top navigation */}
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-gray-200">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex flex-1 justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex flex-1">{/* Search can be added here */}</div>
            <div className="ml-4 flex items-center md:ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/udt-store-logo.png" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{session?.user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{session?.user?.email}</p>
                      {session?.user?.role && (
                        <Badge className={cn('text-xs w-fit', getRoleBadgeColor(session.user.role as Role))}>
                          {session.user.role.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/admin/profile">Profile</Link>
                  </DropdownMenuItem>
                  {session?.user?.role === 'ADMIN' && (
                    <DropdownMenuItem>
                      <Link href="/admin/settings">Settings</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
