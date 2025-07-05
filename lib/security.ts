import { NextRequest } from 'next/server';

/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize HTML input to prevent XSS attacks
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize SQL input (additional layer, Prisma ORM already prevents SQL injection)
 */
export function sanitizeSqlInput(input: string): string {
  if (!input) return '';
  
  return input
    .replace(/'/g, "''")
    .replace(/;/g, '')
    .replace(/--/g, '')
    .replace(/\/\*/g, '')
    .replace(/\*\//g, '');
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common patterns
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password should not contain repeated characters');
  }
  
  const commonPasswords = ['password', '123456', 'admin', 'qwerty', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    errors.push('Password should not contain common words');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Extract and validate IP address from request
 */
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const remoteAddr = request.ip;
  
  if (forwarded) {
    // Handle multiple IPs in X-Forwarded-For header
    const ips = forwarded.split(',');
    return ips[0].trim();
  }
  
  return realIp || remoteAddr || 'unknown';
}

/**
 * Validate file upload security
 */
export function validateFileUpload(file: File): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  
  // Check file size
  if (file.size > maxSize) {
    errors.push(`File size exceeds maximum allowed size of ${maxSize / (1024 * 1024)}MB`);
  }
  
  // Check MIME type
  if (!allowedTypes.includes(file.type)) {
    errors.push(`Invalid file type: ${file.type}. Allowed types: ${allowedTypes.join(', ')}`);
  }
  
  // Check file extension
  const extension = file.name.split('.').pop()?.toLowerCase();
  if (!extension || !allowedExtensions.includes(extension)) {
    errors.push(`Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`);
  }
  
  // Check for suspicious filenames
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    errors.push('Invalid filename: contains path traversal characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate secure headers for API responses
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  };
}

/**
 * Validate UUID format
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}