import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

// Function to fetch project details by project ID
async function fetchProjectById(project_id: number) {
  const selectQuery = `
    SELECT *
    FROM public.project
    WHERE id = $1;
  `;
  try {
    const result = await query({ query: selectQuery, values: [project_id] });
    return result.rows[0]; // Return the first matching row
  } catch (error) {
    console.error('Error fetching project by ID:', error);
    throw error;
  }
}

// GET /api/projectCard?project_id=<project_id> - Fetch project details by project ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const project_id = parseInt(searchParams.get('project_id') || '', 10);

    // Validate the project_id
    if (isNaN(project_id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project ID. Must be an integer.',
        },
        { status: 400 }
      );
    }

    // Fetch the project details
    const project = await fetchProjectById(project_id);

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: `Project with ID ${project_id} does not exist.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project }, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/projectCard', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project details' },
      { status: 500 }
    );
  }
}

// import { query } from '@/lib/db';
// import { NextResponse } from 'next/server';

// // Function to fetch project details by project ID
// async function fetchProjectById(project_id: number) {
//   const selectQuery = `
//     SELECT *
//     FROM public.project
//     WHERE id = $1;
//   `;
//   try {
//     const result = await query({ query: selectQuery, values: [project_id] });
//     return result.rows[0]; // Return the first matching row
//   } catch (error) {
//     console.error('Error fetching project by ID:', error);
//     throw error;
//   }
// }

// // POST /api/projectCard - Fetch project details by project ID
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { project_id } = body;

//     // Validate the project_id
//     if (!Number.isInteger(project_id)) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Invalid project ID. Must be an integer.',
//         },
//         { status: 400 }
//       );
//     }

//     // Fetch the project details
//     const project = await fetchProjectById(project_id);

//     if (!project) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: `Project with ID ${project_id} does not exist.`,
//         },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ success: true, data: project }, { status: 200 });
//   } catch (error) {
//     console.error('Error in POST /api/projectCard', error);
//     return NextResponse.json(
//       { success: false, error: 'Failed to fetch project details' },
//       { status: 500 }
//     );
//   }
// }
