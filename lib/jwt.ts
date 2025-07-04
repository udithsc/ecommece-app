import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-jwt-secret';

export interface TokenPayload {
  userId: string;
  email: string;
  role: 'USER' | 'MANAGER' | 'ADMIN';
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
    issuer: 'udt-store',
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function extractTokenFromRequest(request: NextRequest): string | null {
  // Try Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Try cookie
  const token = request.cookies.get('auth-token')?.value;
  if (token) {
    return token;
  }

  return null;
}

export function getUserFromRequest(request: NextRequest): TokenPayload | null {
  const token = extractTokenFromRequest(request);
  if (!token) return null;

  return verifyToken(token);
}
