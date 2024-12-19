import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { SignupPayload } from '../dashboard/_constants/type';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as SignupPayload;
    const { username, surname, email, phone, password } = body;

    if (!username || !surname || !email || !phone || !password) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email exists
    const emailExists = await query({
      query: 'SELECT * FROM registration WHERE email = $1',
      values: [email],
    });

    // Check if username exists
    const usernameExists = await query({
      query: 'SELECT * FROM registration WHERE username = $1',
      values: [username],
    });

    if (emailExists.rows.length > 0) {
      return NextResponse.json(
        { message: 'Email already exists' },
        { status: 409 }
      );
    }

    if (usernameExists.rows.length > 0) {
      return NextResponse.json(
        { message: 'Username already exists' },
        { status: 409 }
      );
    }

    // Insert new user
    await query({
      query: `
        INSERT INTO registration (username, surname, email, password, phone)
        VALUES ($1, $2, $3, $4, $5)
      `,
      values: [username, surname, email, password, phone],
    });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
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