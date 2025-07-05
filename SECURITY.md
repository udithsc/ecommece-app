# Security Policy

## Overview
This document outlines the security measures implemented in the UDT Store application and provides guidance for secure development practices.

## Security Measures Implemented

### 1. Authentication & Authorization ✅
- **NextAuth.js** integration with multiple providers (Credentials, Google, GitHub)
- **Password hashing** using bcrypt with salt rounds of 12
- **JWT tokens** with secure configuration
- **Role-based access control** (USER, MANAGER, ADMIN)
- **Session management** with HTTP-only cookies

### 2. Input Validation & Sanitization ✅
- **Enhanced password validation** (8+ chars, uppercase, lowercase, numbers)
- **Email format validation** with regex
- **SQL injection prevention** via Prisma ORM parameterized queries
- **XSS protection** through input sanitization
- **Path traversal protection** in file operations
- **File upload validation** (type, size, extension checks)

### 3. API Security ✅
- **Rate limiting** implemented per endpoint type:
  - General API: 100 requests/minute
  - Auth endpoints: 5 requests/15 minutes  
  - Upload endpoints: 10 requests/minute
  - Search endpoints: 50 requests/minute
- **CORS headers** properly configured
- **Security headers** (CSP, X-Frame-Options, etc.)
- **Input length limits** to prevent DoS attacks

### 4. File Upload Security ✅
- **File type validation** (whitelist approach)
- **File size limits** (5MB maximum)
- **Filename sanitization** and UUID generation
- **Path traversal prevention**
- **Image processing** with Sharp for additional security
- **Admin authentication** required for uploads

### 5. Data Protection ✅
- **Sensitive data redacted** from example files
- **Environment variable** security guidelines
- **Database credentials** properly protected
- **API keys** not exposed in client code

## Security Headers Implemented

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Content-Security-Policy: [Comprehensive CSP policy]
Strict-Transport-Security: max-age=31536000; includeSubDomains
```

## Rate Limiting Configuration

| Endpoint Type | Limit | Window |
|---------------|-------|--------|
| General API | 100 requests | 1 minute |
| Authentication | 5 requests | 15 minutes |
| File Upload | 10 requests | 1 minute |
| Search | 50 requests | 1 minute |

## Password Requirements

- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter  
- At least one number
- At least one special character
- No common passwords or repeated patterns

## File Upload Restrictions

- **Allowed types**: JPEG, PNG, WebP, GIF
- **Maximum size**: 5MB
- **Processing**: Auto-conversion to WebP format
- **Authentication**: Admin access required
- **Storage**: Secure file naming with UUIDs

## Environment Security

### Required Environment Variables
```bash
NEXTAUTH_SECRET=<secure-32-char-string>
DATABASE_URL=<secure-database-connection>
STRIPE_SECRET_KEY=<stripe-secret-key>
```

### Security Guidelines
1. Never commit `.env` files to version control
2. Use different secrets for each environment
3. Rotate secrets regularly
4. Use secure random generators for secrets

## Monitoring & Logging

- **Error logging** without sensitive data exposure
- **Failed authentication** attempt tracking
- **Rate limit** violation monitoring
- **File upload** activity logging

## Vulnerability Reporting

If you discover a security vulnerability, please report it responsibly:

1. **DO NOT** open a public issue
2. Email security issues to: [security@udtstore.com](mailto:security@udtstore.com)
3. Include detailed steps to reproduce
4. Allow reasonable time for fixes before disclosure

## Security Checklist for Developers

- [ ] Validate all user inputs
- [ ] Use parameterized queries (Prisma handles this)
- [ ] Implement proper authentication checks
- [ ] Follow rate limiting guidelines
- [ ] Sanitize file uploads
- [ ] Never log sensitive information
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Regular security audits

## Compliance

This application implements security best practices aligned with:
- **OWASP Top 10** security risks mitigation
- **GDPR** data protection principles
- **PCI DSS** for payment processing (via Stripe)

## Regular Security Tasks

1. **Weekly**: Review logs for suspicious activity
2. **Monthly**: Update dependencies (`npm audit fix`)
3. **Quarterly**: Security penetration testing
4. **Annually**: Complete security audit and policy review

---

Last Updated: 2025-01-05
Security Version: 1.0