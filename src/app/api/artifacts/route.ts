import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projid = searchParams.get('projid');

  if (!projid) {
    return NextResponse.json(
      { error: 'Project ID (projid) is required' },
      { status: 400 }
    );
  }

  try {
    // Query to fetch artifact details based on the project ID
    const sqlQuery = `
      SELECT 
        name AS artifact_name, 
        artifact_type, 
        created_by, 
        created_on 
      FROM artifact 
      WHERE project_id = $1
    `;
    const result = await query({ query: sqlQuery, values: [projid] });

    // Check if no artifacts are found
    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: 'No artifacts found for the given project ID' },
        { status: 404 }
      );
    }

    // Respond with the retrieved artifact data
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Error fetching artifacts:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}