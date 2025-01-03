import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ForgotPasswordPayload } from '../../dashboard/_constants/type';



export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as ForgotPasswordPayload;
    const { email, newPassword, confirmPassword } = body;

    // Validate required fields
    if (!email || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { message: 'Email and new password are required' },
        { status: 400 }
      );
    }

    // Validate password match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { message: 'New password and confirm password do not match' },
        { status: 400 }
      );
    }

    // Validate password length and complexity
    if (newPassword.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userResults = await query({
      query: 'SELECT * FROM users WHERE email_id = $1',
      values: [email],
    });

    if (userResults.rows.length === 0) {
      return NextResponse.json(
        { message: 'Email not found' },
        { status: 404 }
      );
    }

    // Update password
    await query({
      query: `
        UPDATE users 
        SET 
          password = $1, 
          modified_by = 'PASSWORD_RESET',
          modified_on = CURRENT_TIMESTAMP
        WHERE email_id = $2
      `,
      values: [newPassword, email],
    });

    return NextResponse.json(
      { message: 'Password updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Password update error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}