import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const {
      name,
      artifact_type,
      artifact_config,
      org_id,
      project_id,
      created_by,
      created_on,
    } = body;

    if (
      !name ||
      !artifact_type ||
      !artifact_config ||
      !org_id ||
      !project_id ||
      !created_by ||
      !created_on
    ) {
      return NextResponse.json(
        { error: "All required fields must be provided." },
        { status: 400 }
      );
    }

    // SQL Query to insert data
    const insertQuery = `
      INSERT INTO artifact (
        name, 
        artifact_type, 
        artifact_config, 
        org_id, 
        project_id, 
        active, 
        created_by, 
        created_on, 
        modified_by, 
        modified_on
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [
      name,
      artifact_type,
      JSON.stringify(artifact_config), // Convert artifact_config to JSON string
      org_id,
      project_id,
      true, // Default value for 'active'
      created_by,
      new Date(created_on), // Convert to a valid timestamp
      body.modified_by || null,
      body.modified_on ? new Date(body.modified_on) : null,
    ];

    // Execute the query
    const result = await query({ query: insertQuery, values });

    // Return the newly created artifact
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting artifact:", error);
    return NextResponse.json(
      { error: "An error occurred while saving the artifact." },
      { status: 500 }
    );
  }
}