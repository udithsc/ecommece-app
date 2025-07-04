export type Role = 'USER' | 'MANAGER' | 'ADMIN';

export interface Permission {
  resource: string;
  action: string;
}

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  USER: [
    // Customer permissions
    { resource: 'profile', action: 'read' },
    { resource: 'profile', action: 'update' },
    { resource: 'orders', action: 'read' },
    { resource: 'cart', action: 'manage' },
    { resource: 'wishlist', action: 'manage' },
    { resource: 'addresses', action: 'manage' },
    { resource: 'reviews', action: 'create' },
    { resource: 'reviews', action: 'update' },
  ],

  MANAGER: [
    // Manager permissions (product and order management, no reports)
    { resource: 'products', action: 'read' },
    { resource: 'products', action: 'create' },
    { resource: 'products', action: 'update' },
    { resource: 'products', action: 'delete' },
    { resource: 'categories', action: 'read' },
    { resource: 'categories', action: 'create' },
    { resource: 'categories', action: 'update' },
    { resource: 'orders', action: 'read' },
    { resource: 'orders', action: 'update' },
    { resource: 'customers', action: 'read' },
    { resource: 'inventory', action: 'manage' },
    { resource: 'dashboard', action: 'read' }, // Basic dashboard without reports
  ],

  ADMIN: [
    // Admin permissions (full access including reports and user management)
    { resource: 'products', action: 'read' },
    { resource: 'products', action: 'create' },
    { resource: 'products', action: 'update' },
    { resource: 'products', action: 'delete' },
    { resource: 'categories', action: 'read' },
    { resource: 'categories', action: 'create' },
    { resource: 'categories', action: 'update' },
    { resource: 'categories', action: 'delete' },
    { resource: 'orders', action: 'read' },
    { resource: 'orders', action: 'update' },
    { resource: 'orders', action: 'delete' },
    { resource: 'customers', action: 'read' },
    { resource: 'customers', action: 'update' },
    { resource: 'customers', action: 'delete' },
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'update' },
    { resource: 'users', action: 'delete' },
    { resource: 'reports', action: 'read' },
    { resource: 'analytics', action: 'read' },
    { resource: 'dashboard', action: 'read' },
    { resource: 'settings', action: 'read' },
    { resource: 'settings', action: 'update' },
    { resource: 'inventory', action: 'manage' },
    { resource: 'roles', action: 'manage' },
  ],
};

// Navigation items with role-based access
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: 'HomeIcon',
    requiredPermission: { resource: 'dashboard', action: 'read' },
  },
  {
    name: 'Products',
    href: '/admin/products',
    icon: 'ShoppingBagIcon',
    requiredPermission: { resource: 'products', action: 'read' },
  },
  {
    name: 'Orders',
    href: '/admin/orders',
    icon: 'ChartBarIcon',
    requiredPermission: { resource: 'orders', action: 'read' },
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: 'UserGroupIcon',
    requiredPermission: { resource: 'customers', action: 'read' },
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: 'DocumentChartBarIcon',
    requiredPermission: { resource: 'reports', action: 'read' },
    adminOnly: true,
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: 'UsersIcon',
    requiredPermission: { resource: 'users', action: 'read' },
    adminOnly: true,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: 'CogIcon',
    requiredPermission: { resource: 'settings', action: 'read' },
    adminOnly: true,
  },
];

// Check if user has specific permission
export function hasPermission(userRole: Role, resource: string, action: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.some((p) => p.resource === resource && p.action === action);
}

// Check if user can access a navigation item
export function canAccessNavItem(userRole: Role, navItem: any): boolean {
  // Check if admin-only and user is not admin
  if (navItem.adminOnly && userRole !== 'ADMIN') {
    return false;
  }

  // Check required permission
  if (navItem.requiredPermission) {
    return hasPermission(
      userRole,
      navItem.requiredPermission.resource,
      navItem.requiredPermission.action
    );
  }

  return true;
}

// Get accessible navigation items for a role
export function getAccessibleNavItems(userRole: Role) {
  return NAVIGATION_ITEMS.filter((item) => canAccessNavItem(userRole, item));
}

// Role hierarchy check
export function hasRoleOrHigher(userRole: Role, requiredRole: Role): boolean {
  const roleHierarchy: Record<Role, number> = {
    USER: 1,
    MANAGER: 2,
    ADMIN: 3,
  };

  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Permission middleware helpers
export function requirePermission(resource: string, action: string) {
  return (userRole: Role) => hasPermission(userRole, resource, action);
}

export function requireRole(requiredRole: Role) {
  return (userRole: Role) => hasRoleOrHigher(userRole, requiredRole);
}

export function requireAdmin() {
  return (userRole: Role) => userRole === 'ADMIN';
}

export function requireManagerOrAdmin() {
  return (userRole: Role) => userRole === 'MANAGER' || userRole === 'ADMIN';
}
