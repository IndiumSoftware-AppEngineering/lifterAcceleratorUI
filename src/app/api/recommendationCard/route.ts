import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Make sure this imports your database query function

// Named export for GET method
export async function GET() {
  try {
    // Query to get all recommendation cards from the 'recommendationcard' table
    const result = await query({
      query: 'SELECT * FROM card',
    });

    // Return the data as JSON
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching recommendation cards:', error);

    // Return error response
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
