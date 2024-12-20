import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// Global variable to store the max value
let storedMaxId: number | null = null;

// Function to get the next project ID
async function getNextProjectId(): Promise<number> {
  const maxIdQuery = `
    SELECT MAX(id) as maxid
    FROM public.project;
  `;

  try {
    const result = await query({ query: maxIdQuery });
    console.log(result); // Debugging

    // Ensure the key matches the query result (lowercase 'maxid')
    const fetchedMaxId = result.rows[0]?.maxid
      ? Number(result.rows[0].maxid)
      : null;

    // Update the storedMaxId only if the fetchedMaxId is greater
    if (
      fetchedMaxId !== null &&
      (storedMaxId === null || fetchedMaxId > storedMaxId)
    ) {
      storedMaxId = fetchedMaxId;
    }

    // Calculate the nextProjectId
    const nextProjectId = storedMaxId !== null ? storedMaxId + 1 : 1;
    console.log('Next Project ID:', nextProjectId); // Debugging
    return nextProjectId;
  } catch (error) {
    console.error('Error fetching project count:', error);
    throw new Error('Failed to fetch the next project ID');
  }
}

export async function GET() {
  try {
    const nextProjectId = await getNextProjectId();
    return NextResponse.json({ success: true, nextProjectId }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/projects/count:', error);
    return NextResponse.json(
      {
        success: false,
        error: error || 'Failed to fetch project count',
      },
      { status: 500 }
    );
  }
}
