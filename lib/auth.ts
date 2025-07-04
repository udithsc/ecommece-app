import { auth } from '@/auth';
import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest, TokenPayload } from './jwt';
import { hasPermission, hasRoleOrHigher, Role } from './permissions';

export async function requireAuth() {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }

  return session;
}

export async function requireManagerOrAdmin() {
  const session = await requireAuth();

  if (session.user.role !== 'MANAGER' && session.user.role !== 'ADMIN') {
    throw new Error('Manager or admin access required');
  }

  return session;
}

export async function requirePermission(resource: string, action: string) {
  const session = await requireAuth();

  if (!hasPermission(session.user.role as Role, resource, action)) {
    throw new Error(`Permission denied: ${action} on ${resource}`);
  }

  return session;
}

export async function requireRole(requiredRole: Role) {
  const session = await requireAuth();

  if (!hasRoleOrHigher(session.user.role as Role, requiredRole)) {
    throw new Error(`Role ${requiredRole} or higher required`);
  }

  return session;
}

// Enhanced middleware functions with JWT support
export function withAuth(handler: Function) {
  return async (request: NextRequest, context: any) => {
    try {
      // Try NextAuth session first
      const session = await auth();
      if (session?.user) {
        return handler(request, context);
      }

      // Try JWT token
      const user = getUserFromRequest(request);
      if (user) {
        // Add user to request context
        (request as any).user = user;
        return handler(request, context);
      }

      throw new Error('No valid authentication found');
    } catch (error) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  };
}

export function withPermission(resource: string, action: string) {
  return function (handler: Function) {
    return async (request: NextRequest, context: any) => {
      try {
        // Try NextAuth session first
        const session = await auth();
        if (session?.user) {
          if (!hasPermission(session.user.role as Role, resource, action)) {
            throw new Error(`Permission denied: ${action} on ${resource}`);
          }
          return handler(request, context);
        }

        // Try JWT token
        const user = getUserFromRequest(request);
        if (user) {
          if (!hasPermission(user.role, resource, action)) {
            throw new Error(`Permission denied: ${action} on ${resource}`);
          }
          (request as any).user = user;
          return handler(request, context);
        }

        throw new Error('No valid authentication found');
      } catch (error: any) {
        const status = error.message === 'No valid authentication found' ? 401 : 403;
        return NextResponse.json({ error: error.message }, { status });
      }
    };
  };
}

export function withRole(requiredRole: Role) {
  return function (handler: Function) {
    return async (request: NextRequest, context: any) => {
      try {
        // Try NextAuth session first
        const session = await auth();
        if (session?.user) {
          if (!hasRoleOrHigher(session.user.role as Role, requiredRole)) {
            throw new Error(`Role ${requiredRole} or higher required`);
          }
          return handler(request, context);
        }

        // Try JWT token
        const user = getUserFromRequest(request);
        if (user) {
          if (!hasRoleOrHigher(user.role, requiredRole)) {
            throw new Error(`Role ${requiredRole} or higher required`);
          }
          (request as any).user = user;
          return handler(request, context);
        }

        throw new Error('No valid authentication found');
      } catch (error: any) {
        const status = error.message === 'No valid authentication found' ? 401 : 403;
        return NextResponse.json({ error: error.message }, { status });
      }
    };
  };
}

export function withAdmin(handler: Function) {
  return withRole('ADMIN')(handler);
}

export function withManagerOrAdmin(handler: Function) {
  return withRole('MANAGER')(handler);
}
