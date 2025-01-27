import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const res = await fetch(process.env.PROJECT_DETAILS_URL as string +`${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch project data');
    }
    const project = await res.json();

    return NextResponse.json({ name: project.name });
  } catch (error) {
    console.error('Error fetching project data:', error);
    return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 });
  }
}

