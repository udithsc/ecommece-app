import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { generateToken } from '../../../../lib/jwt';
import bcrypt from 'bcryptjs';

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: User Registration
 *     description: Register a new user account with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *           example:
 *             name: "John Doe"
 *             email: "john@example.com"
 *             password: "password123"
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               success: true
 *               user:
 *                 id: "cm123456789"
 *                 email: "john@example.com"
 *                 name: "John Doe"
 *                 role: "USER"
 *                 image: null
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         headers:
 *           Set-Cookie:
 *             description: HTTP-only cookie with auth token
 *             schema:
 *               type: string
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               missing_fields:
 *                 value:
 *                   error: "Email, password, and name are required"
 *               invalid_email:
 *                 value:
 *                   error: "Invalid email format"
 *               weak_password:
 *                 value:
 *                   error: "Password must be at least 6 characters long"
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               error: "User with this email already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Enhanced password validation
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }
    
    // Check for password complexity
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      return NextResponse.json(
        { error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Determine user role (only allow USER for public registration)
    let userRole: 'USER' | 'MANAGER' | 'ADMIN' = 'USER';

    // Only allow MANAGER or ADMIN roles if request is authenticated and from an admin
    // For now, we'll only allow USER registration through this endpoint
    if (role && (role === 'MANAGER' || role === 'ADMIN')) {
      // TODO: Add admin check here when implementing admin user management
      userRole = 'USER'; // Force USER role for public registration
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: userRole,
        emailVerified: new Date(), // Auto-verify for simplicity
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
      },
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role as 'USER' | 'MANAGER' | 'ADMIN',
    });

    // Create response with token in cookie
    const response = NextResponse.json(
      {
        success: true,
        user,
        token,
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
