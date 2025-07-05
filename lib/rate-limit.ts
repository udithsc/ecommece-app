import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Number of requests allowed per interval
}

class RateLimiter {
  private cache = new Map<string, { count: number; resetTime: number }>();

  check(request: NextRequest, config: RateLimitConfig): { success: boolean; limit: number; remaining: number; reset: number } {
    const ip = request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const now = Date.now();
    const windowStart = now - config.interval;
    
    // Clean expired entries
    for (const [key, value] of this.cache.entries()) {
      if (value.resetTime <= now) {
        this.cache.delete(key);
      }
    }
    
    const current = this.cache.get(ip);
    
    if (!current || current.resetTime <= now) {
      // First request or window expired
      this.cache.set(ip, {
        count: 1,
        resetTime: now + config.interval
      });
      
      return {
        success: true,
        limit: config.uniqueTokenPerInterval,
        remaining: config.uniqueTokenPerInterval - 1,
        reset: now + config.interval
      };
    }
    
    if (current.count >= config.uniqueTokenPerInterval) {
      // Rate limit exceeded
      return {
        success: false,
        limit: config.uniqueTokenPerInterval,
        remaining: 0,
        reset: current.resetTime
      };
    }
    
    // Increment counter
    current.count++;
    this.cache.set(ip, current);
    
    return {
      success: true,
      limit: config.uniqueTokenPerInterval,
      remaining: config.uniqueTokenPerInterval - current.count,
      reset: current.resetTime
    };
  }
}

export const rateLimiter = new RateLimiter();

// Predefined rate limit configurations
export const RATE_LIMITS = {
  // General API endpoints
  api: { interval: 60 * 1000, uniqueTokenPerInterval: 100 }, // 100 requests per minute
  
  // Authentication endpoints
  auth: { interval: 15 * 60 * 1000, uniqueTokenPerInterval: 5 }, // 5 requests per 15 minutes
  
  // Upload endpoints
  upload: { interval: 60 * 1000, uniqueTokenPerInterval: 10 }, // 10 uploads per minute
  
  // Search endpoints
  search: { interval: 60 * 1000, uniqueTokenPerInterval: 50 }, // 50 searches per minute
} as const;