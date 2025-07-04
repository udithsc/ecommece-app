import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Get Current User Profile
 *     description: Retrieve the current user's profile information
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                     gender:
 *                       type: string
 *                       enum: [MALE, FEMALE, OTHER]
 *                     role:
 *                       type: string
 *                       enum: [USER, MANAGER, ADMIN]
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     emailVerified:
 *                       type: string
 *                       format: date-time
 *                       nullable: true
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 *   patch:
 *     summary: Update User Profile
 *     description: Update the current user's profile information
 *     tags: [Profile]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *                 enum: [MALE, FEMALE, OTHER]
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     dateOfBirth:
 *                       type: string
 *                       format: date-time
 *                     gender:
 *                       type: string
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        gender: true,
        role: true,
        createdAt: true,
        emailVerified: true,
        _count: {
          select: {
            orders: true,
            reviews: true,
            wishlist: true,
          },
        },
        orders: {
          select: {
            total: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate total spent
    const totalSpent = user.orders.reduce((sum, order) => sum + order.total, 0);

    return NextResponse.json({
      user: {
        ...user,
        totalSpent,
        orders: user._count.orders,
        reviews: user._count.reviews,
        wishlistItems: user._count.wishlist,
      },
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, phone, dateOfBirth, gender } = body;

    // Validate input
    const updateData: any = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json({ error: 'Name is required' }, { status: 400 });
      }
      updateData.name = name.trim();
    }

    if (phone !== undefined) {
      updateData.phone = phone || null;
    }

    if (dateOfBirth !== undefined) {
      if (dateOfBirth) {
        const date = new Date(dateOfBirth);
        if (isNaN(date.getTime())) {
          return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
        }
        updateData.dateOfBirth = date;
      } else {
        updateData.dateOfBirth = null;
      }
    }

    if (gender !== undefined) {
      if (gender && !['MALE', 'FEMALE', 'OTHER'].includes(gender)) {
        return NextResponse.json({ error: 'Invalid gender value' }, { status: 400 });
      }
      updateData.gender = gender || null;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        gender: true,
        role: true,
        createdAt: true,
        emailVerified: true,
      },
    });

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}