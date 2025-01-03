import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Await the params object
  const { id } = await params;

  try {
    const getProjectByIdQuery = 'SELECT * FROM public.project WHERE id = $1';
    const result = await query({ query: getProjectByIdQuery, values: [id] });

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const project = result.rows[0];
    return NextResponse.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}