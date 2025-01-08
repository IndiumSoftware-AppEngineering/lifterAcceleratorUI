import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate required fields
    const {
      name,
      artifact_config,
      org_id,
      project_id,
      created_by,
      created_on,
      status, 
      artifact_type_id
    } = body;

    if (
      !name ||
      !artifact_config ||
      !org_id ||
      !project_id ||
      !created_by ||
      !created_on ||
      !status ||
      !artifact_type_id
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
        artifact_config, 
        org_id, 
        project_id, 
        status, 
        active, 
        created_by, 
        created_on, 
        modified_by, 
        modified_on,
        artifact_type_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *;
    `;

    const values = [
      name,
      JSON.stringify(artifact_config), // Convert artifact_config to JSON string
      org_id,
      project_id,
      status, // Include status in the values array
      true, // Default value for 'active'
      created_by,
      new Date(created_on), // Convert to a valid timestamp
      body.modified_by || null,
      body.modified_on ? new Date(body.modified_on) : null,
      artifact_type_id
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