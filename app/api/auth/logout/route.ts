import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User Logout
 *     description: Logout user by clearing authentication cookie
 *     tags: [Authentication]
 *     security:
 *       - CookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *         headers:
 *           Set-Cookie:
 *             description: Clears the auth token cookie
 *             schema:
 *               type: string
 *               example: "auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear the auth token cookie
    response.cookies.delete('auth-token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
