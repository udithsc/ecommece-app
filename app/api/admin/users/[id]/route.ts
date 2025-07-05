import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '../../../../../lib/prisma';
import { hasPermission } from '@/lib/permissions';

/**
 * @swagger
 * /api/admin/users/{id}:
 *   patch:
 *     summary: Update User Role (Admin Only)
 *     description: Update a user's role (Admin cannot change other admin roles)
 *     tags: [Admin - Users]
 *     security:
 *       - cookieAuth: []
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [USER, MANAGER, ADMIN]
 *                 description: New role for the user
 *     responses:
 *       200:
 *         description: User role updated successfully
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
 *                     role:
 *                       type: string
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Insufficient permissions or cannot modify admin users
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has admin permissions
    if (!hasPermission(session.user.role, 'users', 'update')) {
      return NextResponse.json({ error: 'Insufficient permissions. Admin access required.' }, { status: 403 });
    }

    const { id: userId } = await params;
    const body = await request.json();
    const { role } = body;

    // Validate role
    if (!role || !['USER', 'MANAGER', 'ADMIN'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    // Get the target user
    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, role: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent modifying admin users (security measure)
    if (targetUser.role === 'ADMIN') {
      return NextResponse.json({ 
        error: 'Cannot modify admin user roles' 
      }, { status: 403 });
    }

    // Prevent users from modifying their own role
    if (targetUser.id === session.user.id) {
      return NextResponse.json({ 
        error: 'Cannot modify your own role' 
      }, { status: 403 });
    }

    // Update the user's role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      message: 'User role updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role' },
      { status: 500 }
    );
  }
}