import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // Parse the request body to extract group_name
    const body = await req.json();
    const { group_name } = body;

    // Validate if group_name is provided
    if (!group_name) {
      return NextResponse.json(
        { error: 'Group name (group_name) is required' },
        { status: 400 }
      );
    }

    // Query to fetch the names based on the group name
    const sqlQuery = `
      SELECT name 
      FROM artifact_types 
      WHERE group_name = $1
    `;
    const result = await query({ query: sqlQuery, values: [group_name] });

    // Check if no records are found
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'No artifact types found for the given group name' },
        { status: 404 }
      );
    }

    // Respond with all the retrieved names
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching artifact types:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}