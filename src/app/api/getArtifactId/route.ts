import { NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Adjust the import path based on your project structure

export async function POST(request: Request) {
  try {
    const { fileName, projectId } = await request.json();

    // Insert the file name into the artifact table
    const result = await query({
      query: `
        INSERT INTO artifact (name, artifact_type_id, artifact_config, org_id, project_id, status, active, created_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `,
      values: [fileName, 2, '{}', 1, projectId, 'SUBMITTED', true, 'user'], // Replace placeholders with actual values
    });

    const artifactId = result.rows[0].id;
    return NextResponse.json({ artifactId }, { status: 200 });
  } catch (error) {
    console.error('Error inserting artifact:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}