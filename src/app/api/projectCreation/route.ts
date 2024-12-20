import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// Function to check if an organisation exists
async function organisationExists(orgId: number): Promise<boolean> {
  const checkQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM public.organisation
      WHERE id = $1
    );
  `;
  try {
    const result = await query({ query: checkQuery, values: [orgId] });
    return result.rows[0]?.exists; // Access rows correctly
  } catch (error) {
    console.error('Error checking organisation existence:', error);
    return false;
  }
}

// Function to insert a new project
async function insertProject(
  name: string,
  description: string,
  orgId: number,
  active: string
) {
  const insertQuery = `
    INSERT INTO public.project (name, description, org_id, active)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  try {
    const result = await query({
      query: insertQuery,
      values: [name, description, orgId, active],
    });
    return result.rows[0]; // Access rows correctly
  } catch (error) {
    console.error('Error inserting project:', error);
    throw error;
  }
}

// POST /api/projects - Create new project
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, description, orgId, active } = body;

    // Validate the active status
    if (!['Active', 'Inactive'].includes(active)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid active status. Must be "Active" or "Inactive".',
        },
        { status: 400 }
      );
    }

    // Check if the organisation exists
    const orgExists = await organisationExists(orgId);
    if (!orgExists) {
      return NextResponse.json(
        {
          success: false,
          error: `Organisation with ID ${orgId} does not exist`,
        },
        { status: 404 }
      );
    }

    // Insert the project
    const newProject = await insertProject(name, description, orgId, active);
    return NextResponse.json(
      { success: true, data: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST /api/projects:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
