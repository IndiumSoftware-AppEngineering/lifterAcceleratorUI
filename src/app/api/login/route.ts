import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { LoginPayload } from '../../dashboard/_constants/type';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as LoginPayload;
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Query the database to check if the user exists
    const userResults = await query({
      query: 'SELECT * FROM users WHERE email_id = $1 AND password = $2',
      values: [email, password],
    });

    if (userResults.rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Extract user details
    const user = {
      id: userResults.rows[0].id,
      username: userResults.rows[0].username,
      name: userResults.rows[0].name, // Assuming you have a "name" column
      email: userResults.rows[0].email_id, // Use email_id here
      org_id: userResults.rows[0].org_id, // Assuming you have an "org_id" column
    };

    return NextResponse.json(
      {
        message: 'Logged in successfully',
        user: user,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
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