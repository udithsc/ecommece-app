import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rateLimiter, RATE_LIMITS } from './lib/rate-limit';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https:",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  // Apply rate limiting to specific routes
  const { pathname } = request.nextUrl;
  
  let rateLimitConfig;
  if (pathname.startsWith('/api/auth/')) {
    rateLimitConfig = RATE_LIMITS.auth;
  } else if (pathname.startsWith('/api/admin/upload')) {
    rateLimitConfig = RATE_LIMITS.upload;
  } else if (pathname.includes('search')) {
    rateLimitConfig = RATE_LIMITS.search;
  } else if (pathname.startsWith('/api/')) {
    rateLimitConfig = RATE_LIMITS.api;
  }
  
  if (rateLimitConfig) {
    const result = rateLimiter.check(request, rateLimitConfig);
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', result.limit.toString());
    response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
    response.headers.set('X-RateLimit-Reset', result.reset.toString());
    
    if (!result.success) {
      return new NextResponse(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          retryAfter: Math.ceil((result.reset - Date.now()) / 1000)
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil((result.reset - Date.now()) / 1000).toString(),
            ...Object.fromEntries(response.headers.entries())
          }
        }
      );
    }
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};