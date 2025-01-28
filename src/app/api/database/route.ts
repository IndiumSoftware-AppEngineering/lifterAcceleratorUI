import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db'; // Assuming you have a helper for database queries

export interface DatabaseConnectionPayload {
    connectionType: 'jdbc' | 'advanced';
    database: string;
    host?: string;
    dbName?: string;
    port?: string;
    username: string;
    password: string;
    url?: string;
  }
  
export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as DatabaseConnectionPayload;
    const {
      connectionType,
      database,
      host,
      dbName,
      port,
      username,
      password,
      url,
    } = body;

    if (!connectionType || !database || !username || !password) {
      return NextResponse.json(
        { message: 'Required fields are missing' },
        { status: 400 }
      );
    }

    // Check if the connection already exists
    const existingConnection = await query({
      query: `
        SELECT * FROM database_connections 
        WHERE connection_type = $1 AND username = $2 AND database_type = $3
      `,
      values: [connectionType, username, database],
    });

    if (existingConnection.rows.length > 0) {
      return NextResponse.json(
        { message: 'Database connection already exists' },
        { status: 409 }
      );
    }

    // Insert the new database connection
    await query({
      query: `
        INSERT INTO database_connections 
          (connection_type, database_type, host, db_name, port, jdbc_url, username, password)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      values: [
        connectionType,
        database,
        connectionType === 'advanced' ? host : null,
        connectionType === 'advanced' ? dbName : null,
        connectionType === 'advanced' ? (port ? parseInt(port) : null) : null,
        connectionType === 'jdbc' ? url : null,
        username,
        password,
      ],
    });

    return NextResponse.json(
      { message: 'Database connection saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving database connection:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
